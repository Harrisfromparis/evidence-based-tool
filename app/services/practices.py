"""
Service layer for Evidence-Based Practices (EBPs).

Provides read access to the built-in EBP catalogue and helpers for
searching / filtering practices.  The catalogue mirrors the data used
by the React front-end (src/lib/data.ts).
"""

from __future__ import annotations

from typing import Any

# ---------------------------------------------------------------------------
# Seed data – a representative subset of the 29+ EBPs used in the front-end.
# Each entry mirrors the EBP interface defined in src/lib/types.ts.
# ---------------------------------------------------------------------------

_CATALOGUE: list[dict[str, Any]] = [
    {
        "id": "antecedent-based-intervention",
        "title": "Antecedent-Based Intervention",
        "category": "Environmental Support",
        "description": (
            "Modifying the environment or activity before behaviour occurs "
            "to prevent challenges and promote engagement."
        ),
        "whenToUse": (
            "Use when patterns show specific triggers or when prevention is "
            "more appropriate than responding after difficulties occur."
        ),
        "relatedEBPs": ["visual-supports", "self-management", "structured-work-systems"],
    },
    {
        "id": "cognitive-behavioral-intervention",
        "title": "Cognitive Behavioral Intervention",
        "category": "Social-Emotional",
        "description": (
            "Teaching students to recognise thoughts, feelings, and behaviours, "
            "and develop coping strategies."
        ),
        "whenToUse": (
            "Use for anxiety, emotional regulation challenges, or when the student "
            "can benefit from understanding thought-feeling-behaviour connections."
        ),
        "relatedEBPs": ["self-management", "social-narratives", "social-skills-training"],
    },
    {
        "id": "differential-reinforcement",
        "title": "Differential Reinforcement",
        "category": "Behavioural Support",
        "description": (
            "Reinforcing desired behaviours while withholding reinforcement "
            "for unwanted behaviours."
        ),
        "whenToUse": (
            "Use when unwanted behaviour is reinforced by predictable consequences "
            "and a clear alternative exists."
        ),
        "relatedEBPs": [
            "functional-behavior-assessment",
            "functional-communication-training",
            "reinforcement",
        ],
    },
    {
        "id": "discrete-trial-training",
        "title": "Discrete Trial Training",
        "category": "Instructional Strategy",
        "description": (
            "Structured teaching method breaking skills into small steps with "
            "clear instruction, response, and feedback."
        ),
        "whenToUse": (
            "Use for teaching foundational skills that require repetition and "
            "are difficult to teach naturally."
        ),
        "relatedEBPs": ["prompting", "reinforcement", "task-analysis"],
    },
    {
        "id": "exercise-movement",
        "title": "Exercise and Movement",
        "category": "Regulation & Wellness",
        "description": (
            "Using physical activity to support regulation, focus, and overall wellbeing."
        ),
        "whenToUse": (
            "Use to support regulation, reduce anxiety, improve focus, or meet "
            "sensory movement needs."
        ),
        "relatedEBPs": [
            "antecedent-based-intervention",
            "self-management",
            "sensory-integration",
        ],
    },
    {
        "id": "functional-behavior-assessment",
        "title": "Functional Behaviour Assessment",
        "category": "Assessment & Planning",
        "description": (
            "Systematic process to understand why a behaviour occurs by identifying "
            "its function or purpose."
        ),
        "whenToUse": (
            "Use when behaviour is persistent, distressing, or when previous "
            "interventions have not worked."
        ),
        "relatedEBPs": [
            "functional-communication-training",
            "antecedent-based-intervention",
            "differential-reinforcement",
        ],
    },
    {
        "id": "functional-communication-training",
        "title": "Functional Communication Training",
        "category": "Communication",
        "description": (
            "Teaching an appropriate communication method to replace challenging "
            "behaviour that serves a communicative function."
        ),
        "whenToUse": (
            "Use when challenging behaviour serves a clear communicative function "
            "and the student needs a better way to express needs."
        ),
        "relatedEBPs": [
            "functional-behavior-assessment",
            "augmentative-alternative-communication",
            "differential-reinforcement",
        ],
    },
    {
        "id": "modeling",
        "title": "Modeling",
        "category": "Instructional Strategy",
        "description": (
            "Demonstrating a skill or behaviour for the student to observe and imitate."
        ),
        "whenToUse": (
            "Use when teaching new skills, clarifying expectations, or showing "
            "what successful performance looks like."
        ),
        "relatedEBPs": ["video-modeling", "peer-mediated-instruction", "prompting"],
    },
    {
        "id": "naturalistic-intervention",
        "title": "Naturalistic Intervention",
        "category": "Social & Communication",
        "description": (
            "Teaching that occurs in everyday contexts, using natural interests "
            "and interactions rather than structured drills."
        ),
        "whenToUse": (
            "Use to support communication, social interaction, and skill generalisation "
            "in contexts that matter to the student."
        ),
        "relatedEBPs": ["peer-mediated-instruction", "prompting", "reinforcement"],
    },
    {
        "id": "parent-implemented-intervention",
        "title": "Parent-Implemented Intervention",
        "category": "Collaboration",
        "description": (
            "Teaching parents and caregivers to use evidence-based strategies "
            "in home and community settings."
        ),
        "whenToUse": (
            "Use to extend learning beyond school, support consistency, and empower "
            "families as key partners."
        ),
        "relatedEBPs": ["naturalistic-intervention", "visual-supports", "reinforcement"],
    },
    {
        "id": "peer-mediated-instruction",
        "title": "Peer-Mediated Instruction and Intervention",
        "category": "Social & Communication",
        "description": (
            "Structured approaches where classmates are taught to support social, "
            "communication, or learning goals."
        ),
        "whenToUse": (
            "Use to increase authentic social opportunities, build inclusive classroom "
            "culture, and support generalisation of social skills."
        ),
        "relatedEBPs": ["naturalistic-intervention", "social-skills-training", "reinforcement"],
    },
    {
        "id": "prompting",
        "title": "Prompting",
        "category": "Instructional Strategy",
        "description": (
            "Providing assistance to help a student perform a skill, with the goal "
            "of fading support over time."
        ),
        "whenToUse": (
            "Use when a student is learning a new skill and needs systematic support "
            "that can be gradually reduced."
        ),
        "relatedEBPs": ["modeling", "task-analysis", "reinforcement"],
    },
    {
        "id": "reinforcement",
        "title": "Reinforcement",
        "category": "Behavioural Support",
        "description": (
            "Using positive consequences to increase the likelihood of a desired "
            "behaviour occurring again."
        ),
        "whenToUse": (
            "Use to build new skills, increase engagement, or maintain appropriate "
            "behaviour across settings."
        ),
        "relatedEBPs": [
            "differential-reinforcement",
            "discrete-trial-training",
            "naturalistic-intervention",
        ],
    },
    {
        "id": "self-management",
        "title": "Self-Management",
        "category": "Independence & Regulation",
        "description": (
            "Teaching students to monitor and manage their own behaviour, emotions, "
            "or task completion."
        ),
        "whenToUse": (
            "Use to increase independence, reduce reliance on adult prompting, "
            "and build self-regulation skills."
        ),
        "relatedEBPs": [
            "cognitive-behavioral-intervention",
            "visual-supports",
            "structured-work-systems",
        ],
    },
    {
        "id": "social-narratives",
        "title": "Social Narratives",
        "category": "Social & Communication",
        "description": (
            "Short, personalised stories that describe a social situation and "
            "appropriate responses to prepare students for specific events."
        ),
        "whenToUse": (
            "Use before a new or challenging social situation to provide context, "
            "reduce anxiety, and clarify expectations."
        ),
        "relatedEBPs": ["visual-supports", "social-skills-training", "modeling"],
    },
    {
        "id": "social-skills-training",
        "title": "Social Skills Training",
        "category": "Social & Communication",
        "description": (
            "Explicit teaching of social behaviours, conversation skills, and "
            "interpersonal strategies."
        ),
        "whenToUse": (
            "Use when a student would benefit from structured teaching of specific "
            "social interactions in a safe, supportive environment."
        ),
        "relatedEBPs": [
            "peer-mediated-instruction",
            "social-narratives",
            "video-modeling",
        ],
    },
    {
        "id": "task-analysis",
        "title": "Task Analysis",
        "category": "Instructional Strategy",
        "description": (
            "Breaking a complex skill into small, teachable steps and teaching "
            "each step systematically."
        ),
        "whenToUse": (
            "Use for multi-step skills such as self-care routines, academic tasks, "
            "or vocational skills."
        ),
        "relatedEBPs": ["prompting", "visual-supports", "discrete-trial-training"],
    },
    {
        "id": "visual-supports",
        "title": "Visual Supports",
        "category": "Environmental Support",
        "description": (
            "Using visual materials such as schedules, cue cards, or organisers "
            "to support understanding and independence."
        ),
        "whenToUse": (
            "Use to support transitions, routine completion, communication, "
            "and comprehension of expectations."
        ),
        "relatedEBPs": [
            "structured-work-systems",
            "social-narratives",
            "self-management",
        ],
    },
]

# Index by id for fast lookup
_INDEX: dict[str, dict[str, Any]] = {p["id"]: p for p in _CATALOGUE}


# ---------------------------------------------------------------------------
# Public helpers
# ---------------------------------------------------------------------------


def list_practices(category: str | None = None) -> list[dict[str, Any]]:
    """Return all practices, optionally filtered by *category*."""
    if category is None:
        return list(_CATALOGUE)
    needle = category.lower()
    return [p for p in _CATALOGUE if p["category"].lower() == needle]


def get_practice(practice_id: str) -> dict[str, Any] | None:
    """Return a single practice by *practice_id*, or *None* if not found."""
    return _INDEX.get(practice_id)


def search_practices(query: str) -> list[dict[str, Any]]:
    """Return practices whose title, description, or category match *query*."""
    needle = query.lower()
    return [
        p
        for p in _CATALOGUE
        if needle in p["title"].lower()
        or needle in p["description"].lower()
        or needle in p["category"].lower()
    ]


def list_categories() -> list[str]:
    """Return the sorted, de-duplicated list of practice categories."""
    return sorted({p["category"] for p in _CATALOGUE})


def get_related(practice_id: str) -> list[dict[str, Any]]:
    """Return the practices listed as related to *practice_id*."""
    practice = get_practice(practice_id)
    if practice is None:
        return []
    return [_INDEX[rid] for rid in practice.get("relatedEBPs", []) if rid in _INDEX]
