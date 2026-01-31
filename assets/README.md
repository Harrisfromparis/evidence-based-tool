# Autism & Me - Content Asset System

## Overview

This document describes the complete content asset structure for the Autism & Me / Irish EBP Navigator toolkit. All content follows UK English spelling, plain language principles, neuro-affirming framing, and trauma-informed approaches.

## Directory Structure

```
assets/
├── branding/
│   ├── colour-palette.md
│   └── typography.md
├── microcopy/
│   ├── buttons.json
│   ├── tooltips.json
│   ├── empty-states.json
│   └── onboarding.json
├── case-studies/
│   ├── aoife.json
│   ├── liam.json
│   ├── maya.json
│   └── jamal.json
├── content/
│   ├── ebps/
│   │   ├── antecedent-based-intervention.md
│   │   ├── cognitive-behavioural-intervention.md
│   │   ├── differential-reinforcement.md
│   │   ├── discrete-trial-training.md
│   │   ├── exercise-movement.md
│   │   ├── functional-behaviour-assessment.md
│   │   ├── functional-communication-training.md
│   │   ├── modelling.md
│   │   ├── naturalistic-intervention.md
│   │   ├── parent-implemented-intervention.md
│   │   ├── peer-mediated-instruction.md
│   │   ├── prompting.md
│   │   ├── reinforcement.md
│   │   ├── self-management.md
│   │   ├── social-narratives.md
│   │   ├── social-skills-training.md
│   │   ├── structured-work-systems.md
│   │   ├── task-analysis.md
│   │   ├── technology-aided-instruction.md
│   │   ├── video-modelling.md
│   │   ├── visual-supports.md
│   │   ├── augmentative-alternative-communication.md
│   │   ├── pivotal-response-training.md
│   │   ├── speech-generating-devices.md
│   │   ├── time-delay.md
│   │   ├── virtual-reality.md
│   │   ├── music-mediated-intervention.md
│   │   ├── sensory-integration.md
│   │   ├── scripting.md
│   │   ├── extinction.md
│   │   ├── response-interruption-redirection.md
│   │   ├── story-based-intervention.md
│   │   ├── picture-exchange-communication.md
│   │   ├── token-economy.md
│   │   ├── collaborative-problem-solving.md
│   │   └── self-regulation.md
│   └── tools/
│       ├── visual-schedule.md
│       ├── first-then-board.md
│       ├── sensory-profile.md
│       ├── goal-planner.md
│       ├── behaviour-reflection.md
│       └── home-school-communication-sheet.md
├── ui/
│   ├── components/
│   │   ├── button.md
│   │   ├── card.md
│   │   ├── accordion.md
│   │   ├── tab.md
│   │   └── input.md
│   └── design-tokens/
│       ├── colours.json
│       ├── spacing.json
│       ├── typography.json
│       └── shadows.json
├── onboarding/
│   ├── flow.md
│   └── screens/
│       └── (screen definitions included in flow.md)
├── audio/
│   └── narration-scripts/
│       ├── introduction.md
│       ├── how-to-use-the-app.md
│       └── ebp-template.md
└── templates/
    └── definitions/
        ├── sensory-profile.md
        ├── visual-schedule.md
        ├── goal-setting-sheet.md
        ├── behaviour-support-plan.md
        └── home-school-communication-sheet.md
```

## Content Standards

### Language and Tone
- **UK English spelling** throughout (behaviour, centre, practise, etc.)
- **Plain language**: No jargon, clear explanations
- **Neuro-affirming**: Respect autistic ways of being, avoid deficit framing
- **Trauma-informed**: Recognise impact of trauma, avoid re-traumatisation
- **Person-first and identity-first**: Use both respectfully based on context
- **No emojis, hashtags, or decorative symbols** in professional content

### Structure Requirements
- Clear headings and hierarchy
- Scannable content with bullet points and lists
- Short paragraphs (3-4 sentences maximum)
- Active voice preferred
- Concrete examples from Irish educational contexts

## Branding Assets

### Colour Palette
- **Black** (#000000): Primary text, authority
- **Green** (#2ECC71): Interactive elements, success
- **Orange** (#F39C12): Accents, attention
- **Soft Green** (#A8E6CF): Backgrounds, hover states
- **Soft Orange** (#FFD3B6): Secondary backgrounds
- **Neutral Grey** (#F2F2F2): Page backgrounds

### Typography
- **Primary font**: Inter (body, UI)
- **Display font**: Merriweather (headings)
- **Hierarchy**: H1 32px, H2 24px, H3 18px, Body 16px, Caption 14px

## Microcopy System

JSON files provide consistent interface language for:
- **Buttons**: Primary, secondary, confirmation actions
- **Tooltips**: Helpful descriptions for UI elements
- **Empty states**: Guidance when no content available
- **Onboarding**: Welcome flow text

## Case Studies

Four comprehensive case studies demonstrating EBP application:
1. **Aoife** (8, mainstream primary): Sensory overwhelm, unstructured time
2. **Liam** (14, mainstream secondary): Social skills, ambiguous assignments
3. **Maya** (11, special school): Communication, functional behaviour
4. **Jamal** (16, TY): Social anxiety, masking, transitions

Each includes:
- Student profile
- Challenges and goals
- Recommended EBPs with rationale
- Implementation details
- Outcomes and reflections
- Irish context

## Evidence-Based Practices (EBPs)

29 comprehensive EBP documents covering:

### Categories
- **Environmental Support**: Antecedent-based intervention, visual supports, structured work systems
- **Communication**: AAC, FCT, PECS, SGDs, scripting
- **Social-Emotional**: CBT, social skills training, social narratives, self-regulation
- **Behavioural**: FBA, differential reinforcement, reinforcement, extinction
- **Instructional**: DTT, modelling, prompting, task analysis, time delay
- **Technology**: Technology-aided instruction, video modelling, virtual reality
- **Collaborative**: Peer-mediated, parent-implemented, collaborative problem-solving
- **Specialised**: Sensory integration, music intervention, PRT

### EBP Structure (consistent format)
1. **What it is**: Clear definition
2. **Why it matters**: Importance and impact
3. **How to implement**: Step-by-step guidance with practical examples
4. **Good to know**: Critical considerations, ethical notes
5. **Evidence base**: Research support summary
6. **Related practices**: Connected EBPs

## Tools Documentation

Six practical tool guides:
1. Visual Schedule
2. First-Then Board
3. Sensory Profile
4. Goal Planner
5. Behaviour Reflection
6. Home-School Communication Sheet

Each includes:
- Purpose
- Who it's for
- How to use
- Practical examples
- Important notes

## UI System

### Components
Specifications for 5 core UI components:
- Button (variants, states, accessibility)
- Card (interactive and static)
- Accordion (collapsible content)
- Tab (navigation and content switching)
- Input (form fields)

### Design Tokens
JSON definitions for:
- **Colours**: Brand palette in multiple formats (hex, oklch)
- **Spacing**: 8px base unit, component-specific spacing
- **Typography**: Font families, sizes, weights, hierarchies
- **Shadows**: Minimal elevation system

## Onboarding Flow

Four-screen onboarding sequence:
1. Welcome
2. Choose Your Role
3. What Would You Like to Do Today?
4. You're All Set

Skippable at any point, brief, professional tone.

## Audio Narration Scripts

Three types of scripts for text-to-speech:
1. **Introduction**: Welcome and overview (90 seconds)
2. **How to Use**: Navigation and features guide (2 minutes)
3. **EBP Template**: Structure for narrating each EBP (90-120 seconds)

All scripts are clear, measured, professional tone with appropriate pacing.

## Template Definitions

Five exportable/printable template specifications:
1. **Sensory Profile**: Comprehensive sensory system documentation
2. **Visual Schedule**: Activity sequence support tool
3. **Goal-Setting Sheet**: Structured goal planning with action steps
4. **Behaviour Support Plan**: Positive, evidence-based behaviour support
5. **Home-School Communication**: Daily/weekly coordination tool

Each template includes:
- Purpose and sections
- Layout rules
- Accessibility notes
- Ethical considerations

## Implementation Guidelines

### For Developers
- Reference design tokens for all styling
- Use microcopy JSON for interface text
- Implement EBP and tool content from markdown files
- Follow component specifications for UI consistency
- Ensure accessibility requirements are met

### For Content Creators
- Follow language and tone standards
- Use EBP template structure for new practices
- Include Irish educational context examples
- Maintain neuro-affirming, trauma-informed framing
- Avoid jargon and technical language

### For Designers
- Apply brand colours from palette specification
- Use typography hierarchy consistently
- Follow minimal design approach (flat, functional)
- Ensure WCAG AA contrast ratios
- Maintain 44px minimum touch targets

## Quality Checklist

Content must meet ALL criteria:
- ✓ UK English spelling
- ✓ Plain language (no jargon)
- ✓ Neuro-affirming (no deficit framing)
- ✓ Trauma-informed approach
- ✓ UDL-aligned structure
- ✓ No emojis, hashtags, or decorative symbols
- ✓ No placeholders or incomplete content
- ✓ Irish educational context examples
- ✓ Accessible formatting
- ✓ Consistent with specification

## Compliance

This asset system represents the authoritative content specification for Autism & Me. All generated content, user interfaces, and application functionality must comply fully with this specification. No deviation is permitted without explicit documentation and approval.

---

**Version**: 1.0  
**Last Updated**: 2025  
**Status**: Authoritative Specification  
**Compliance**: Mandatory
