# Onboarding Flow

## Overview

The onboarding experience introduces new users to the Autism & Me toolkit, establishes context, and helps users begin engaging with content that matches their needs. The flow is brief, optional, and can be skipped at any point.

## Flow Structure

### Screen 1: Welcome
**Purpose**: Establish trust and set expectations

**Content**:
- Title: "Welcome to Autism & Me"
- Subtitle: "Evidence-based practices for neuro-affirming autism support"
- Brief description: "This toolkit provides educators with practical, rights-based approaches grounded in research and Irish educational contexts."
- Visual: Simple, professional illustration or icon
- Action: "Get started" button

**Design notes**:
- Generous whitespace
- Professional, calm tone
- No decorative elements
- Clear call to action

---

### Screen 2: Choose Your Role
**Purpose**: Personalise experience based on user context

**Content**:
- Title: "Who are you?"
- Options:
  1. **Teacher** - "Primary, secondary, or special school educator"
  2. **Special Needs Assistant** - "Supporting students in educational settings"
  3. **Parent or Caregiver** - "Supporting an autistic child or young person"
  4. **Other Professional** - "Therapist, counsellor, or education specialist"
- "Skip this step" link (subtle, bottom)

**Design notes**:
- Large, clear option cards
- Each option equally prominent
- Tap entire card to select
- No judgement or hierarchy

---

### Screen 3: What Would You Like to Do Today?
**Purpose**: Direct users to relevant content based on immediate needs

**Content**:
- Title: "What would you like to do today?"
- Options:
  1. **Learn about evidence-based practices** - "Explore the 29 EBPs with plain-English guidance"
  2. **See real-world examples** - "Browse case studies from Irish educational settings"
  3. **Create a support plan** - "Use planning tools to design targeted interventions"
  4. **Understand rights and ethics** - "Review legal frameworks and ethical considerations"

**Design notes**:
- Option cards with icons
- Clear descriptions
- Multiple selections allowed (optional)
- Progress indicator showing screen 3 of 4

---

### Screen 4: You're All Set
**Purpose**: Confirm completion and provide entry points

**Content**:
- Title: "You're all set"
- Message: "You can change these preferences at any time in settings."
- Primary action: "Explore EBPs" button
- Secondary action: "Browse Tools" button
- Helpful tips (rotating or random):
  - "All content works offline once loaded"
  - "Bookmark items you want to return to quickly"
  - "Use audio narration for accessible content consumption"
  - "Search works across all EBPs, case studies, and tools"
  - "No account needed - your data stays on your device"

**Design notes**:
- Celebratory but subdued tone
- Clear next steps
- Emphasise key app benefits

---

## Implementation Notes

- **Optional throughout**: Users can skip at any screen
- **Quick completion**: Entire flow takes less than 60 seconds
- **No account required**: Emphasise privacy and local data storage
- **Accessible**: Full keyboard navigation, screen reader support
- **Persistent state**: Remember if user has completed onboarding
- **Re-accessible**: Allow users to restart onboarding from settings
- **Mobile-optimised**: Works seamlessly on all screen sizes

## When to Show

- First time user visits application
- Can be re-triggered from settings menu
- Can be dismissed and will not reappear unless explicitly requested
- Skip option available on every screen

## Data Collected

- User role (optional, stored locally)
- Initial interest areas (optional, stored locally)
- No personal information collected
- All data remains on user's device
