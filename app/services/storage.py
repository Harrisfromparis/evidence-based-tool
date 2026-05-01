"""
Mock in-memory storage for the Evidence-Based Practice tool.

Provides isolated, per-process storage for practices, plans, and summaries.
In production, replace with a real database backend.
"""

from __future__ import annotations

import threading
from copy import deepcopy
from typing import Any

_lock = threading.Lock()

_store: dict[str, dict[str, Any]] = {
    "practices": {},
    "plans": {},
    "summaries": {},
}


def _get_collection(collection: str) -> dict[str, Any]:
    if collection not in _store:
        raise KeyError(f"Unknown collection: {collection!r}")
    return _store[collection]


def get(collection: str, key: str) -> Any | None:
    """Return a single record by key, or *None* if not found."""
    with _lock:
        return deepcopy(_get_collection(collection).get(key))


def list_all(collection: str) -> list[Any]:
    """Return all records in *collection* as a list."""
    with _lock:
        return deepcopy(list(_get_collection(collection).values()))


def save(collection: str, key: str, value: Any) -> None:
    """Insert or overwrite a record."""
    with _lock:
        _get_collection(collection)[key] = deepcopy(value)


def delete(collection: str, key: str) -> bool:
    """Delete a record. Returns *True* if the record existed."""
    with _lock:
        return _get_collection(collection).pop(key, None) is not None


def clear(collection: str) -> None:
    """Remove all records from *collection*."""
    with _lock:
        _get_collection(collection).clear()


def exists(collection: str, key: str) -> bool:
    """Return *True* if *key* is present in *collection*."""
    with _lock:
        return key in _get_collection(collection)
