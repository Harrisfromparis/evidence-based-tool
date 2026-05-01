"""
Service layer for AI-generated summaries.

Summaries are brief plain-English explanations of EBPs or plans generated
on demand.  They are cached in the mock in-memory store so repeated
requests for the same content are served without calling the LLM again.
"""

from __future__ import annotations

import hashlib
import json
from typing import Any

from app.services import storage
from app.services.utils import now_iso

_COLLECTION = "summaries"


def _cache_key(payload: dict[str, Any]) -> str:
    """Stable hash of *payload* used as the cache key."""
    serialised = json.dumps(payload, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(serialised.encode()).hexdigest()


# ---------------------------------------------------------------------------
# Public helpers
# ---------------------------------------------------------------------------


def get_cached(payload: dict[str, Any]) -> str | None:
    """
    Return a previously cached summary for *payload*, or *None*.

    *payload* is any JSON-serialisable dict that uniquely describes
    the content being summarised (e.g. ``{"type": "ebp", "id": "prompting"}``).
    """
    key = _cache_key(payload)
    record = storage.get(_COLLECTION, key)
    if record is None:
        return None
    return record.get("text")


def cache(payload: dict[str, Any], text: str) -> None:
    """Persist *text* as the summary for *payload*."""
    key = _cache_key(payload)
    storage.save(
        _COLLECTION,
        key,
        {"key": key, "payload": payload, "text": text, "cachedAt": now_iso()},
    )


def summarise_practice(practice: dict[str, Any]) -> str:
    """
    Return a concise plain-English summary of *practice*.

    If a cached summary exists it is returned immediately.  Otherwise a
    short summary is built from the structured data and cached before
    being returned.

    In production this function would call an LLM; here it composes a
    deterministic summary from the available fields so the service works
    without any external dependencies.
    """
    payload = {"type": "practice", "id": practice.get("id", "")}
    cached = get_cached(payload)
    if cached is not None:
        return cached

    title = practice.get("title", "This practice")
    description = practice.get("description", "")
    when = practice.get("whenToUse", "")
    related = practice.get("relatedEBPs", [])

    lines = [f"{title}: {description}"]
    if when:
        lines.append(f"When to use: {when}")
    if related:
        lines.append(f"Often used alongside: {', '.join(related)}.")

    text = " ".join(lines)
    cache(payload, text)
    return text


def summarise_plan(plan: dict[str, Any]) -> str:
    """
    Return a concise plain-English summary of *plan*.

    Follows the same cache-then-generate pattern as :func:`summarise_practice`.
    """
    payload = {"type": "plan", "id": plan.get("id", "")}
    cached = get_cached(payload)
    if cached is not None:
        return cached

    title = plan.get("title", "Untitled plan")
    ebps = plan.get("selectedEBPs", [])
    notes = plan.get("notes", "")
    status = plan.get("status", "active")

    lines = [f"Plan: {title} (status: {status})."]
    if ebps:
        lines.append(f"Selected EBPs: {', '.join(ebps)}.")
    if notes:
        lines.append(f"Notes: {notes}")

    text = " ".join(lines)
    cache(payload, text)
    return text


def invalidate(payload: dict[str, Any]) -> bool:
    """Remove a cached summary for *payload*. Returns *True* if it existed."""
    key = _cache_key(payload)
    return storage.delete(_COLLECTION, key)


def list_cached() -> list[dict[str, Any]]:
    """Return all cached summary records (useful for inspection / debugging)."""
    return storage.list_all(_COLLECTION)
