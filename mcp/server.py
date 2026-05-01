"""
FastMCP server for the Evidence-Based Practice (EBP) tool.

Exposes tools that allow an LLM to:
  - browse and search the EBP catalogue
  - manage intervention plans (CRUD)
  - generate and retrieve plain-English summaries

Authentication uses a single API key supplied via the ``MCP_API_KEY``
environment variable (deployment-level auth).  Requests without the
correct key are rejected with a 401 response.

Run locally:
    uvicorn mcp.server:app --reload

Or via the FastMCP CLI:
    fastmcp run mcp/server.py
"""

from __future__ import annotations

import logging
import os
from typing import Annotated, Any

from fastmcp import FastMCP
from fastmcp.exceptions import ToolError

from app.services import practices as practice_svc
from app.services import plans as plan_svc
from app.services import summaries as summary_svc

# ---------------------------------------------------------------------------
# Server initialisation
# ---------------------------------------------------------------------------

_logger = logging.getLogger(__name__)

_API_KEY = os.environ.get("MCP_API_KEY", "")
if not _API_KEY:
    _logger.warning(
        "MCP_API_KEY is not set. The server is running without authentication. "
        "Set the MCP_API_KEY environment variable before deploying."
    )

mcp = FastMCP(
    name="evidence-based-tool",
    instructions=(
        "You are an assistant for the Autism and Me evidence-based practice platform. "
        "Use the available tools to look up evidence-based practices, manage intervention "
        "plans, and generate plain-English summaries for educators."
    ),
)


def _check_api_key(api_key: str) -> None:
    """Raise :class:`ToolError` if *api_key* does not match the server key."""
    if _API_KEY and api_key != _API_KEY:
        raise ToolError("Invalid API key.")


# ---------------------------------------------------------------------------
# Practice tools
# ---------------------------------------------------------------------------


@mcp.tool()
def list_practices(
    api_key: Annotated[str, "Deployment API key"],
    category: Annotated[str | None, "Filter by category (optional)"] = None,
) -> list[dict[str, Any]]:
    """List evidence-based practices, optionally filtered by category."""
    _check_api_key(api_key)
    return practice_svc.list_practices(category=category)


@mcp.tool()
def search_practices(
    api_key: Annotated[str, "Deployment API key"],
    query: Annotated[str, "Search term to match against title, description, or category"],
) -> list[dict[str, Any]]:
    """Search the EBP catalogue by keyword."""
    _check_api_key(api_key)
    return practice_svc.search_practices(query)


@mcp.tool()
def get_practice(
    api_key: Annotated[str, "Deployment API key"],
    practice_id: Annotated[str, "EBP identifier, e.g. 'prompting'"],
) -> dict[str, Any]:
    """Retrieve full details for a single evidence-based practice."""
    _check_api_key(api_key)
    practice = practice_svc.get_practice(practice_id)
    if practice is None:
        raise ToolError(f"Practice not found: {practice_id!r}")
    return practice


@mcp.tool()
def list_practice_categories(
    api_key: Annotated[str, "Deployment API key"],
) -> list[str]:
    """Return the sorted list of available EBP categories."""
    _check_api_key(api_key)
    return practice_svc.list_categories()


@mcp.tool()
def get_related_practices(
    api_key: Annotated[str, "Deployment API key"],
    practice_id: Annotated[str, "EBP identifier"],
) -> list[dict[str, Any]]:
    """Return practices that are related to *practice_id*."""
    _check_api_key(api_key)
    return practice_svc.get_related(practice_id)


# ---------------------------------------------------------------------------
# Plan tools
# ---------------------------------------------------------------------------


@mcp.tool()
def create_plan(
    api_key: Annotated[str, "Deployment API key"],
    title: Annotated[str, "Short descriptive name for the plan"],
    student_description: Annotated[str, "Brief, anonymised description of the student or situation"],
    selected_ebp_ids: Annotated[list[str], "List of EBP identifiers to include in the plan"],
    notes: Annotated[str, "Optional implementation notes"] = "",
    created_by: Annotated[str, "Identifier for the requesting user"] = "anonymous",
) -> dict[str, Any]:
    """Create a new intervention plan and return it."""
    _check_api_key(api_key)
    return plan_svc.create_plan(
        title=title,
        student_description=student_description,
        selected_ebp_ids=selected_ebp_ids,
        notes=notes,
        created_by=created_by,
    )


@mcp.tool()
def get_plan(
    api_key: Annotated[str, "Deployment API key"],
    plan_id: Annotated[str, "UUID of the plan"],
) -> dict[str, Any]:
    """Retrieve a single intervention plan by its ID."""
    _check_api_key(api_key)
    plan = plan_svc.get_plan(plan_id)
    if plan is None:
        raise ToolError(f"Plan not found: {plan_id!r}")
    return plan


@mcp.tool()
def list_plans(
    api_key: Annotated[str, "Deployment API key"],
    created_by: Annotated[str | None, "Filter plans by creator (optional)"] = None,
) -> list[dict[str, Any]]:
    """List all intervention plans, newest first."""
    _check_api_key(api_key)
    return plan_svc.list_plans(created_by=created_by)


@mcp.tool()
def update_plan(
    api_key: Annotated[str, "Deployment API key"],
    plan_id: Annotated[str, "UUID of the plan to update"],
    title: Annotated[str | None, "New title (optional)"] = None,
    student_description: Annotated[str | None, "Updated student description (optional)"] = None,
    selected_ebp_ids: Annotated[list[str] | None, "Updated EBP list (optional)"] = None,
    notes: Annotated[str | None, "Updated notes (optional)"] = None,
    status: Annotated[str | None, "New status: 'active' or 'archived' (optional)"] = None,
) -> dict[str, Any]:
    """Update one or more fields of an existing intervention plan."""
    _check_api_key(api_key)
    updated = plan_svc.update_plan(
        plan_id,
        title=title,
        student_description=student_description,
        selected_ebp_ids=selected_ebp_ids,
        notes=notes,
        status=status,
    )
    if updated is None:
        raise ToolError(f"Plan not found: {plan_id!r}")
    return updated


@mcp.tool()
def delete_plan(
    api_key: Annotated[str, "Deployment API key"],
    plan_id: Annotated[str, "UUID of the plan to delete"],
) -> dict[str, str]:
    """Delete an intervention plan. Returns a confirmation message."""
    _check_api_key(api_key)
    deleted = plan_svc.delete_plan(plan_id)
    if not deleted:
        raise ToolError(f"Plan not found: {plan_id!r}")
    return {"message": f"Plan {plan_id!r} deleted."}


@mcp.tool()
def add_plan_step(
    api_key: Annotated[str, "Deployment API key"],
    plan_id: Annotated[str, "UUID of the plan"],
    step: Annotated[str, "Description of the implementation step"],
    who: Annotated[str, "Who is responsible for this step"] = "",
    when: Annotated[str, "When this step should occur"] = "",
) -> dict[str, Any]:
    """Append an implementation step to an existing plan."""
    _check_api_key(api_key)
    updated = plan_svc.add_step(plan_id, step, who=who, when=when)
    if updated is None:
        raise ToolError(f"Plan not found: {plan_id!r}")
    return updated


# ---------------------------------------------------------------------------
# Summary tools
# ---------------------------------------------------------------------------


@mcp.tool()
def summarise_practice(
    api_key: Annotated[str, "Deployment API key"],
    practice_id: Annotated[str, "EBP identifier"],
) -> str:
    """Return a concise plain-English summary of an evidence-based practice."""
    _check_api_key(api_key)
    practice = practice_svc.get_practice(practice_id)
    if practice is None:
        raise ToolError(f"Practice not found: {practice_id!r}")
    return summary_svc.summarise_practice(practice)


@mcp.tool()
def summarise_plan(
    api_key: Annotated[str, "Deployment API key"],
    plan_id: Annotated[str, "UUID of the plan"],
) -> str:
    """Return a concise plain-English summary of an intervention plan."""
    _check_api_key(api_key)
    plan = plan_svc.get_plan(plan_id)
    if plan is None:
        raise ToolError(f"Plan not found: {plan_id!r}")
    return summary_svc.summarise_plan(plan)


# ---------------------------------------------------------------------------
# Entry point (used by `fastmcp run` and `uvicorn`)
# ---------------------------------------------------------------------------

app = mcp.http_app()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", "8000")))
