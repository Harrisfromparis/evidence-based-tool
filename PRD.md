# Planning Guide

A professional tool for Irish educators to access evidence-based practices for neuro-affirming autism support, presented with the calm authority of a policy document.

**Experience Qualities**:
1. **Professional** - Feels like a well-crafted government resource, not a consumer app; conveys expertise and institutional trust
2. **Calming** - Reduces cognitive load through generous whitespace, clear hierarchy, and absence of decorative elements; respects the user's attention
3. **Accessible** - High contrast, dyslexia-friendly typography, offline capability, and no barriers to entry (no login, no tracking)

**Complexity Level**: Light Application (multiple features with basic state)
The app provides structured navigation through educational content with search, filtering, and bookmarking capabilities. State management focuses on user preferences (bookmarks, recently viewed) and navigation context rather than complex data transformations.

## Essential Features

**EBP Library Browser**
- Functionality: Browse and search 28 evidence-based practices with plain-English definitions, Irish examples, quick-start guides, and ethical considerations
- Purpose: Rapid access to practical, contextualized guidance for classroom implementation
- Trigger: User opens app or taps "EBP Library" navigation
- Progression: Landing view with search bar and categorized list → Select EBP card → Full detail view with tabs (Overview, Quick Start, Ethics, Examples) → Option to bookmark or return to list
- Success criteria: User can find and understand any EBP within 30 seconds; ethical considerations are never hidden

**Case Study Explorer**
- Functionality: Search and filter real-world Irish case studies by age, setting, challenge type, or theme
- Purpose: Bridge theory to practice with contextual examples that reflect Irish educational settings
- Trigger: User navigates to "Case Studies" section
- Progression: Filter panel + case study grid → Apply filters → Results update → Select case study card → Full case study view with EBPs used, context, approach, outcome → Option to bookmark
- Success criteria: User can identify relevant case studies for their specific context; each case study explicitly names the EBPs employed

**Rights & Ethics Hub**
- Functionality: Access UNCRPD Article 24, Irish legal framework, masking awareness content, and ethical red flags checklist
- Purpose: Ground all practice in rights-based, ethically sound approaches; prevent harm
- Trigger: User navigates to "Rights & Ethics" or taps ethics link within an EBP
- Progression: Hub view with four cards (UNCRPD, Irish Law, Masking, Red Flags) → Select card → Full content view with references and practical implications → Option to bookmark key sections
- Success criteria: Legal and ethical information is clear, actionable, and never more than two taps away from any EBP

**Quick-Access Tools**
- Functionality: Practical planning tools including "Choose 3 EBPs" planner, sensory checklist, behavior analyzer, co-regulation strategies, transition supports, and lesson script generator
- Purpose: Move from information to action with structured decision-making supports
- Trigger: User navigates to "Tools" section
- Progression: Tools grid → Select tool → Interactive form or checklist → Complete fields → View guidance or export summary → Save progress locally
- Success criteria: Each tool can be completed in under 5 minutes; results provide actionable next steps

**Lesson Script Generator** [IMPLEMENTED]
- Functionality: AI-powered tool that generates complete, classroom-ready lesson scripts based on teacher's lesson title and selected teaching approaches from the 28 EBPs. Includes ability to save scripts for later access, view previously generated scripts, and export scripts.
- Purpose: Enable teachers to quickly create pedagogically sound, neuro-affirming lesson plans that integrate evidence-based practices
- Trigger: User selects "Lesson Script Generator" from Tools section
- Progression: Enter lesson title → Select one or more of 28 teaching approaches → Generate script → View structured lesson with objectives, activities, timing, differentiation, assessment → Save script to collection → Export for classroom use OR View saved scripts → Select script from saved collection → View/export saved script → Delete script if no longer needed
- Success criteria: Teachers can generate a comprehensive lesson script within 3 minutes; output includes all essential lesson components; scripts are immediately usable without modification; saved scripts persist across sessions and can be accessed at any time

**Choose 3 EBPs Planner** [PLACEHOLDER]
- Functionality: Guided multi-step process to help teachers select three evidence-based practices for a specific student or situation
- Purpose: Structured decision-making framework that prevents overwhelming teachers while ensuring appropriate EBP selection
- Trigger: User selects "Choose 3 EBPs Planner" from Tools section
- Progression: Define student/situation → Identify key needs (communication, environment, engagement, emotional safety) → System suggests relevant EBPs from library → Teacher selects 3 EBPs → Plan next steps (who, when, how, review schedule) → Export or save plan
- Success criteria: Clear step-by-step interface; EBP suggestions are contextually relevant; output provides actionable implementation plan; data structure ready for future interactive implementation

**Sensory Needs Checklist** [PLACEHOLDER]
- Functionality: Structured observation tool with categories for all sensory domains
- Purpose: Systematic identification of sensory preferences and sensitivities to inform accommodations
- Trigger: User selects "Sensory Needs Checklist" from Tools section
- Progression: Review intro → Work through categories (Visual, Auditory, Tactile, Proprioceptive, Vestibular, Olfactory/Gustatory) → For each, mark "seeks", "avoids", "neutral" and add notes → View summary → Save observations locally → Export if needed
- Success criteria: All sensory domains covered; interface supports observation notes; data stored locally; ready for future interactive implementation

**Behaviour = Communication Analyser** [PLACEHOLDER]
- Functionality: ABC (Antecedent-Behavior-Consequence) framework with neuro-affirming interpretation guidance
- Purpose: Shift perspective from "problem behavior" to understanding communication and unmet needs
- Trigger: User selects "Behaviour = Communication Analyser" from Tools section
- Progression: Describe what happened before (antecedent) → Describe what student did (behavior) → Describe what happened after (consequence) → Reflect on possible communication message → Identify possible unmet need → System suggests relevant EBPs to consider → Save analysis → Export if needed
- Success criteria: Interface reinforces communication framework; no punitive language; suggests EBPs based on analysis; data structure ready for future implementation

**Co-Regulation Strategies** [PLACEHOLDER]
- Functionality: Categorized collection of regulation support strategies
- Purpose: Provide practical, immediate strategies for supporting student regulation through adult co-regulation
- Trigger: User selects "Co-Regulation Strategies" from Tools section
- Progression: View intro → Browse categories (Environment, Adult Presence, Sensory Supports, Predictability/Pacing, Language Scripts) → Select strategies relevant to situation → Save selected strategies → Export if needed
- Success criteria: Strategies organized by category; emphasis on adult role in regulation; calm, validating language scripts provided; ready for future interactive implementation

**Transition Support Builder** [IMPLEMENTED]
- Functionality: Step-by-step planning guide for transitions (activity-to-activity, class-to-class, school-to-school) with interactive 5-step process. Save plans locally, view saved plans, and export plans for sharing.
- Purpose: Proactive transition planning to reduce anxiety and increase success through structured guidance
- Trigger: User selects "Transition Support Builder" from Tools section
- Progression: Define transition (what/when/where/who) → Identify potential stress points (checklist + custom) → Choose supports (checklist + custom) → Plan communication with student, family, and staff → Set review schedule, monitoring person, success/adjustment signs → Save plan OR Export plan → Access saved plans from main screen
- Success criteria: All transition types covered; structured but flexible; emphasizes student and family communication; plans persist across sessions; export functionality provides shareable text format

**Parent/Caregiver EBP Assessment** [IMPLEMENTED]
- Functionality: Comprehensive assessment tool allowing parents and caregivers to rate all 28 evidence-based practices based on their effectiveness at home and in other settings. Multi-step guided process with progress tracking and local storage of completed assessments.
- Purpose: Capture valuable parent insights about what strategies work (or don't work) for their child to inform school-based planning and create collaborative, family-centered support
- Trigger: User selects "Parent/Caregiver EBP Assessment" from Tools section
- Progression: Enter child and parent information → Work through 6 categories of EBPs → For each EBP, rate effectiveness (very effective, somewhat effective, not effective, never tried) → Add context notes and tips → Review summary → Save assessment → View saved assessments with detailed breakdown by category
- Success criteria: Complete coverage of all 28 EBPs; intuitive rating system; optional but valuable context fields; clear progress indicators; assessments persist across sessions; assessments are accessible to school staff for planning purposes

**School Daily Planner** [IMPLEMENTED]
- Functionality: Dual-access planning tool for teachers, SNAs, and school liaison staff to create personalized daily schedules based on parent/caregiver assessment insights. Select a student's parent assessment, view effective strategies, build activity-by-activity schedules incorporating parent-recommended EBPs.
- Purpose: Bridge home-school collaboration by enabling school staff to create evidence-informed daily plans that reflect what parents know works for their child
- Trigger: User selects "School Daily Planner" from Tools section
- Progression: View available parent assessments → Select student → Review parent's effective strategies summary → Enter plan details (date, staff name/role) → Add scheduled activities (time, duration, activity name) → For each activity, select relevant EBPs from parent's effective strategies list → Add accommodations, materials, and staff notes → Save complete daily plan → Access saved plans → View detailed plan with all activities and strategies
- Success criteria: Seamless access to parent assessment data; clear presentation of effective strategies with parent context notes; flexible activity builder; plans persist across sessions; school staff can create multiple plans for same student over time; clear connection between parent insights and daily implementation

**Bookmark & Search System**
- Functionality: Bookmark any EBP, case study, or tool; full-text search across all content
- Purpose: Enable personalized resource curation and rapid information retrieval
- Trigger: User taps bookmark icon (anywhere) or enters search query
- Progression: Bookmark: Tap icon → Visual confirmation → Item saved to "Saved" collection | Search: Type query → Results appear (EBPs, cases, tools) → Select result → Navigate to full content
- Success criteria: Bookmarks persist across sessions; search returns relevant results within 1 second

## Edge Case Handling

- **Empty Search Results**: Display "No results found" with suggestions to broaden search or browse by category — never a dead end
- **Missing Bookmarks**: If user has no saved items, show helpful prompt explaining bookmark feature with visual example
- **Offline Access**: All core content loads locally; no network errors disrupt usage — graceful message if external links unavailable
- **Long Content**: Implement scroll progress indicators on lengthy articles; provide "Back to Top" functionality
- **Filter Overuse**: If case study filters return zero results, show which filters are limiting and suggest loosening constraints
- **Tool Partial Completion**: Save tool progress automatically; allow user to resume later without data loss

## Design Direction

The design should evoke the feeling of opening a well-organized, professionally printed policy document from the Department of Education — calm, authoritative, trustworthy, and free from commercial distraction. Every element should serve clarity and accessibility. No element should compete for attention. The interface recedes to let the content lead.

## Color Selection

A restrained palette that feels institutional yet warm, accessible yet professional.

- **Primary Color**: Deep Navy (oklch(0.22 0.04 250)) — Conveys authority, professionalism, and seriousness appropriate for educational policy content; used for headings and primary navigation
- **Secondary Colors**: Slate Grey (oklch(0.45 0.01 250)) for body text; Soft White (oklch(0.98 0 0)) for backgrounds — Creates hierarchy without contrast harshness
- **Accent Color**: Muted Teal (oklch(0.55 0.08 200)) — A calm, focused highlight for interactive elements and important callouts; non-playful and grounded
- **Supporting Colors**: Warm Sand (oklch(0.88 0.03 80)) for subtle section backgrounds and hover states; creates warmth without brightness
- **Foreground/Background Pairings**: 
  - Background White (oklch(0.98 0 0)): Deep Navy text (oklch(0.22 0.04 250)) - Ratio 11.2:1 ✓
  - Muted Teal accent (oklch(0.55 0.08 200)): White text (oklch(0.98 0 0)) - Ratio 5.1:1 ✓
  - Warm Sand background (oklch(0.88 0.03 80)): Deep Navy text (oklch(0.22 0.04 250)) - Ratio 9.8:1 ✓
  - Slate Grey text (oklch(0.45 0.01 250)): White background - Ratio 7.2:1 ✓

## Font Selection

Typography should convey scholarly credibility while maintaining high readability for extended reading sessions, suitable for users with dyslexia.

- **Display/Headings**: Merriweather (serif) - Brings editorial authority and traditional publishing credibility; distinguished without being decorative
- **Body Text**: Inter (sans-serif) - Exceptional readability, dyslexia-friendly letterforms, neutral professionalism
- **Typographic Hierarchy**: 
  - H1 (Section Titles): Merriweather Bold / 32px / letter-spacing -0.02em / line-height 1.2
  - H2 (Subsection Titles): Merriweather Bold / 24px / letter-spacing -0.01em / line-height 1.3
  - H3 (Card Titles): Inter SemiBold / 18px / letter-spacing 0 / line-height 1.4
  - Body (Primary Content): Inter Regular / 16px / letter-spacing 0.01em / line-height 1.6
  - Caption (Metadata): Inter Regular / 14px / letter-spacing 0.01em / line-height 1.5 / Slate Grey

## Animations

Motion should be minimal and purposeful — a subtle acknowledgment of interaction rather than entertainment. Use only for feedback (button press acknowledgment), navigation context (content sliding in from logical direction), and focus management (smooth scroll to content). All transitions: 200-250ms with ease-out curves. No bouncing, no elastic effects, no decorative animation.

## Component Selection

- **Components**: 
  - Navigation: Tabs component for main sections (flat, rectangular, clear active state)
  - Content Cards: Card component for EBPs and case studies (flat, bordered, generous padding)
  - Search: Input with search icon (functional, no decorative styling)
  - Filters: Checkbox and Select components for case study filtering (standard form controls)
  - Dialogs: Dialog component for full EBP details and tools (overlay with clear close action)
  - Lists: Accordion component for collapsible content sections within EBPs
  - Bookmarks: Simple star/bookmark icon toggle (functional indicator only)
  - Buttons: Button component - flat, rectangular, high contrast, clear labels
  
- **Customizations**: 
  - Remove all border-radius except minimal 2px for anti-aliasing
  - Increase padding throughout (24px standard, 32px for cards)
  - Custom bookmark icon (simple outline star, no fill animation)
  - Breadcrumb component for navigation context
  
- **States**: 
  - Buttons: Navy background → Darker navy on hover (no shadow, no transform)
  - Cards: Flat with border → Subtle sand background on hover (no elevation)
  - Inputs: Border only → Border + subtle sand background on focus
  - Bookmarks: Outline star → Filled star (instant, no animation)
  
- **Icon Selection**: 
  - Phosphor icons (regular weight) used sparingly: MagnifyingGlass (search), BookmarkSimple (saved items), Funnel (filters), X (close), CaretLeft (back navigation), House (home)
  - No decorative icons; icons supplement labels, never replace them
  
- **Spacing**: 
  - Base unit: 8px
  - Card padding: 24px (3 units)
  - Section spacing: 48px (6 units)
  - List item gap: 16px (2 units)
  - Content max-width: 720px (optimal reading line length)
  
- **Mobile**: 
  - Navigation tabs become bottom navigation bar with icons + labels
  - Filters move to slide-up sheet rather than sidebar
  - Card padding reduces to 16px
  - Font sizes remain same (accessibility priority)
  - Touch targets minimum 44x44px
  - Single column layout throughout
