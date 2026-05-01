"""
Service layer for intervention plans.

Plans are persisted in the mock in-memory store (app.services.storage).
Each plan captures a selection of EBPs for a specific student or situation,
together with implementation details.
"""

from __future__ import annotations

import uuid
from typing import Any

from app.services import storage
from app.services.utils import now_iso

_COLLECTION = "plans"


# ---------------------------------------------------------------------------
# CRUD helpers
# ---------------------------------------------------------------------------


def create_plan(
    title: str,
    student_description: str,
    selected_ebp_ids: list[str],
    *,
    notes: str = "",
    created_by: str = "anonymous",
) -> dict[str, Any]:
    """
    Create and persist a new intervention plan.

    Parameters
    ----------
    title:
        Short descriptive name for the plan.
    student_description:
        Brief, anonymised description of the student or situation.
    selected_ebp_ids:
        List of EBP identifiers chosen for this plan (e.g. ``["prompting",
        "visual-supports"]``).
    notes:
        Optional free-text notes about implementation.
    created_by:
        Identifier for the user creating the plan (defaults to ``"anonymous"``).

    Returns
    -------
    dict
        The newly created plan record.
    """
    plan_id = str(uuid.uuid4())
    plan: dict[str, Any] = {
        "id": plan_id,
        "title": title,
        "studentDescription": student_description,
        "selectedEBPs": selected_ebp_ids,
        "notes": notes,
        "createdBy": created_by,
        "createdAt": now_iso(),
        "updatedAt": now_iso(),
        "status": "active",
    }
    storage.save(_COLLECTION, plan_id, plan)
    return plan


def get_plan(plan_id: str) -> dict[str, Any] | None:
    """Return a plan by *plan_id*, or *None* if not found."""
    return storage.get(_COLLECTION, plan_id)


def list_plans(created_by: str | None = None) -> list[dict[str, Any]]:
    """
    Return all plans, optionally filtered by *created_by*.

    Plans are returned newest-first.
    """
    plans = storage.list_all(_COLLECTION)
    if created_by is not None:
        plans = [p for p in plans if p.get("createdBy") == created_by]
    return sorted(plans, key=lambda p: p.get("createdAt", ""), reverse=True)


def update_plan(
    plan_id: str,
    *,
    title: str | None = None,
    student_description: str | None = None,
    selected_ebp_ids: list[str] | None = None,
    notes: str | None = None,
    status: str | None = None,
) -> dict[str, Any] | None:
    """
    Update one or more fields of an existing plan.

    Returns the updated plan, or *None* if *plan_id* is not found.
    """
    plan = storage.get(_COLLECTION, plan_id)
    if plan is None:
        return None

    if title is not None:
        plan["title"] = title
    if student_description is not None:
        plan["studentDescription"] = student_description
    if selected_ebp_ids is not None:
        plan["selectedEBPs"] = selected_ebp_ids
    if notes is not None:
        plan["notes"] = notes
    if status is not None:
        plan["status"] = status

    plan["updatedAt"] = now_iso()
    storage.save(_COLLECTION, plan_id, plan)
    return plan


def delete_plan(plan_id: str) -> bool:
    """Delete a plan. Returns *True* if it existed."""
    return storage.delete(_COLLECTION, plan_id)


def add_step(plan_id: str, step: str, *, who: str = "", when: str = "") -> dict[str, Any] | None:
    """
    Append an implementation step to an existing plan.

    Each step is stored as a dict with ``step``, ``who``, ``when``,
    and ``addedAt`` fields.

    Returns the updated plan, or *None* if *plan_id* is not found.
    """
    plan = storage.get(_COLLECTION, plan_id)
    if plan is None:
        return None

    steps: list[dict[str, Any]] = plan.setdefault("steps", [])
    steps.append({"step": step, "who": who, "when": when, "addedAt": now_iso()})
    plan["updatedAt"] = now_iso()
    storage.save(_COLLECTION, plan_id, plan)
    return plan
