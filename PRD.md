# Planning Guide

Autism and Me - A professional tool for educators to access evidence-based practices for neuro-affirming autism support, presented with the calm authority of a policy document.

**Experience Qualities**:
1. **Professional** - Feels like a well-crafted government resource, not a consumer app; conveys expertise and institutional trust
2. **Calming** - Reduces cognitive load through generous whitespace, clear hierarchy, and absence of decorative elements; respects the user's attention
3. **Accessible** - High contrast, dyslexia-friendly typography, offline capability, audio narration for text-to-speech support, and no barriers to entry (no login, no tracking)

**Complexity Level**: Light Application (multiple features with basic state)
The app provides structured navigation through educational content with search, filtering, and bookmarking capabilities. State management focuses on user preferences (bookmarks, recently viewed) and navigation context rather than complex data transformations.

## Essential Features

**EBP Library Browser**
- Functionality: Browse and search 29 evidence-based practices (including Virtual Reality Learning) with plain-English definitions, Irish examples, quick-start guides, and ethical considerations
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
- Functionality: AI-powered tool that generates complete, classroom-ready lesson scripts based on teacher's lesson title and selected teaching approaches from the 29 EBPs (including VR). Includes ability to save scripts for later access, view previously generated scripts, and export scripts.
- Purpose: Enable teachers to quickly create pedagogically sound, neuro-affirming lesson plans that integrate evidence-based practices
- Trigger: User selects "Lesson Script Generator" from Tools section
- Progression: Enter lesson title → Select one or more of 29 teaching approaches → Generate script → View structured lesson with objectives, activities, timing, differentiation, assessment → Save script to collection → Export for classroom use OR View saved scripts → Select script from saved collection → View/export saved script → Delete script if no longer needed
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
- Functionality: Comprehensive assessment tool allowing parents and caregivers to rate all 29 evidence-based practices (including VR) based on their effectiveness at home and in other settings. Multi-step guided process with progress tracking and local storage of completed assessments.
- Purpose: Capture valuable parent insights about what strategies work (or don't work) for their child to inform school-based planning and create collaborative, family-centered support
- Trigger: User selects "Parent/Caregiver EBP Assessment" from Tools section
- Progression: Enter child and parent information → Work through 6 categories of EBPs → For each EBP, rate effectiveness (very effective, somewhat effective, not effective, never tried) → Add context notes and tips → Review summary → Save assessment → View saved assessments with detailed breakdown by category
- Success criteria: Complete coverage of all 29 EBPs; intuitive rating system; optional but valuable context fields; clear progress indicators; assessments persist across sessions; assessments are accessible to school staff for planning purposes

**School Daily Planner** [IMPLEMENTED]
- Functionality: Dual-access planning tool for teachers, SNAs, and school liaison staff to create personalized daily schedules based on parent/caregiver assessment insights. Select a student's parent assessment, view effective strategies, build activity-by-activity schedules incorporating parent-recommended EBPs.
- Purpose: Bridge home-school collaboration by enabling school staff to create evidence-informed daily plans that reflect what parents know works for their child
- Trigger: User selects "School Daily Planner" from Tools section
- Progression: View available parent assessments → Select student → Review parent's effective strategies summary → Enter plan details (date, staff name/role) → Add scheduled activities (time, duration, activity name) → For each activity, select relevant EBPs from parent's effective strategies list → Add accommodations, materials, and staff notes → Save complete daily plan → Access saved plans → View detailed plan with all activities and strategies
- Success criteria: Seamless access to parent assessment data; clear presentation of effective strategies with parent context notes; flexible activity builder; plans persist across sessions; school staff can create multiple plans for same student over time; clear connection between parent insights and daily implementation

**Student Voice: My Triggers & Supports** [IMPLEMENTED]
- Functionality: Interactive tool for students to share their own experiences with all 29 evidence-based practices (including VR). Students rate each teaching approach (helpful, neutral, unhelpful) and describe specific triggers, needed supports, and personal insights. Multi-step guided process with student-friendly language and visual feedback.
- Purpose: Center student voice in educational planning by capturing first-hand experience of what works and what doesn't. Enable students to express triggers and supports in their own words, creating authentic data for person-centered planning.
- Trigger: User selects "Student Voice: My Triggers & Supports" from Tools section
- Progression: Enter student information (name, age, class, completed with) → Review tool instructions → Work through all 29 EBPs → For each EBP, rate feeling (helpful/neutral/unhelpful) → Describe triggers and challenges → Describe what helps or would help → Add additional notes → Review summary → Save profile → Access saved profiles → View categorized feedback (helpful, unhelpful, neutral, or all)
- Success criteria: Student-friendly language throughout; visual rating system with emojis; optional fields to reduce pressure; progress tracking; profiles persist across sessions; clear categorization of helpful vs unhelpful strategies; supports can be completed independently or with trusted adult; creates actionable insights for teachers and parents

**Social Narrative Creator** [IMPLEMENTED WITH ENHANCEMENT]
- Functionality: AI-powered tool that generates personalised social narratives (social stories) for challenging situations. Creates TWO versions: an educator version with professional language for planning and coordination, and a student-friendly version with simplified language, emoji headers, shorter sentences, and clear structure for direct student use. Save both versions together, view saved narratives with version tabs, and export both versions.
- Purpose: Support students in understanding and preparing for challenging situations through evidence-based social narratives. Provide educators with professional planning documents whilst giving students accessible, age-appropriate narratives they can read independently.
- Trigger: User selects "Social Narrative Creator" from Tools section
- Progression: Describe situation → Enter optional student name → Generate educator version narrative → Generate student-friendly version with emoji structure (📍 What happens, ❓ Why it happens, 💪 What I can do, ✅ It will be okay) → Review and edit both versions → Save both versions together → Access saved narratives → View with version tabs (Educator/Student-Friendly) → Export both versions
- Success criteria: Generates both educator and student-friendly versions; student version uses 5-10 word sentences with concrete vocabulary; emoji headers provide clear structure; narratives follow ethical principles (dignity and autonomy are non-negotiable); both versions persist together across sessions; UK English spelling and euro currency used throughout; clear guidance on when and how to use each version

**VR Scenario Planner** [IMPLEMENTED]
- Functionality: AI-powered tool that designs comprehensive Virtual Reality learning experiences for practising social skills, managing anxiety, preparing for transitions, and building confidence. Creates detailed VR scenario plans with learning objectives, session structure, scaffolding strategies, generalisation plans, and ethical safeguards.
- Purpose: Enable educators to leverage VR technology safely and effectively for autism support. Provide structured frameworks for using VR as a practice tool while maintaining student agency and ethical standards.
- Trigger: User selects "VR Scenario Planner" from Tools section
- Progression: Enter learning goal area → Specify skill/situation → Provide student information → Add sensory considerations → Generate comprehensive VR plan → Review scenario description, objectives, session structure, scaffolding, generalisation strategies, accessibility modifications, progress monitoring, and ethical considerations → Save plan → Access saved VR scenarios
- Success criteria: Plans include detailed VR scenario descriptions; clear learning objectives; student-centered progression; emphasis on student control and comfort; explicit ethical guidelines; sensory accessibility considerations; connection to real-world application; plans persist across sessions

**VR Transition Preparation** [IMPLEMENTED]
- Functionality: AI-powered tool that creates VR-based transition preparation plans for helping students explore and familiarise themselves with new environments (schools, classrooms, buildings) before transitions occur. Reduces anxiety through safe, repeatable virtual exploration.
- Purpose: Support major transitions by allowing students to virtually explore new environments at their own pace, building familiarity and confidence before facing real-world change.
- Trigger: User selects "VR Transition Preparation" from Tools section
- Progression: Specify transition type → Describe new environment → Identify student concerns/anxieties → Add timeframe → Generate comprehensive transition plan → Review VR environment design, virtual tour structure, interactive elements, concern-addressing strategies, supporting materials, real-world connection plan, key people introduction, session structure, student agency options, and progress monitoring → Save plan → Access saved transition plans
- Success criteria: Plans address specific student anxieties; include detailed VR tour structure; connect virtual to real-world visits; incorporate key people and locations; emphasise student control of pace; include backup plans for VR discomfort; plans persist across sessions

**VR Demonstrations** [IMPLEMENTED]
- Functionality: Curated collection of 6+ embedded video demonstrations showing Virtual Reality being used for autism support in real-world educational and vocational settings. Videos cover social skills training, job interview practice, classroom familiarisation, public space navigation, school tours, and classroom behaviour skills. Each video includes context, duration, age range, category badges, and direct YouTube links.
- Purpose: Provide educators with concrete, visual examples of VR implementation for autism support. Bridge the gap between theoretical VR planning and practical application by showing real students using VR technology safely and effectively.
- Trigger: User selects "VR Demonstrations" from Tools section
- Progression: View introduction and important considerations about VR use → Browse video demonstrations organised by category → Watch embedded videos or open on YouTube → Read video descriptions and implementation context → Access links to VR planning tools (VR Scenario Planner, VR Transition Prep)
- Success criteria: All videos are embedded and playable; clear categorisation by social/transition/vocational/classroom; ethical considerations prominently displayed; videos demonstrate diverse VR applications; links connect to related planning tools; introduction emphasises student agency and comfort; UK English spelling and euro references throughout

**Bookmark & Search System**
- Functionality: Bookmark any EBP, case study, or tool; full-text search across all content
- Purpose: Enable personalized resource curation and rapid information retrieval
- Trigger: User taps bookmark icon (anywhere) or enters search query
- Progression: Bookmark: Tap icon → Visual confirmation → Item saved to "Saved" collection | Search: Type query → Results appear (EBPs, cases, tools) → Select result → Navigate to full content
- Success criteria: Bookmarks persist across sessions; search returns relevant results within 1 second

**Audio Narration for Accessibility** [IMPLEMENTED]
- Functionality: Browser-based text-to-speech narration system with customizable voice, speed, pitch, and volume settings. Users can enable audio narration globally and then play, pause, and stop narration for specific content sections throughout the application. Settings persist across sessions.
- Purpose: Improve accessibility for users with visual impairments, reading difficulties, dyslexia, or those who prefer auditory learning. Support multi-modal content consumption.
- Trigger: User opens narration settings from header → Enables audio narration → Narration controls appear next to content sections → User clicks play button to hear content read aloud
- Progression: Access settings → Toggle narration on → Adjust voice/speed/pitch/volume preferences → Test narration → Navigate to any content → Use play/pause/stop controls for section narration → Settings persist across sessions
- Success criteria: Text-to-speech works reliably across all major browsers; controls are intuitive and consistently placed; settings are saved and restored; narration can be started/stopped easily; student-friendly social narratives can be read aloud for direct student support; voice quality is clear and natural

**Email Sending via API** [IMPLEMENTED]
- Functionality: Integrated email functionality across all tools allowing users to send generated plans, assessments, scripts, and narratives via their default email client. Uses mailto: protocol with formatted subject and body content. Tracks email sends in analytics.
- Purpose: Enable seamless sharing of plans and assessments with colleagues, families, and other stakeholders. Facilitate collaboration and communication around student support.
- Trigger: User clicks "Email" button on any tool output screen
- Progression: Complete tool (lesson script, transition plan, assessment, etc.) → Click "Email" button → Default email client opens with pre-filled subject and formatted body content → User adds recipient(s) and sends → Email count tracked in analytics
- Success criteria: Email client opens reliably; content is properly formatted in email body; subject line is clear and descriptive; works across all tools; email sends are tracked for analytics

**Analytics System** [IMPLEMENTED]
- Functionality: Comprehensive usage tracking system that monitors tool interactions, EBP views, total sessions, unique users, and emails sent. Data stored locally using Spark KV API. Analytics dashboard accessible to admins shows overview statistics, top tools by usage, top EBPs by views, with detailed breakdowns and sortable tables.
- Purpose: Provide insights into which tools and EBPs are most valuable to users. Help identify usage patterns and inform future development priorities. Track engagement and adoption.
- Trigger: Automatic tracking occurs on app load (session/user), when EBP is viewed, when tool is opened, and when email is sent
- Progression: User interacts with app → Events tracked silently in background → Analytics data stored in Spark KV → Admin accesses dashboard → Views overview stats (sessions, users, emails, tool interactions) → Explores top 5 tools/EBPs → Views complete sortable tables → Can reset all analytics if needed
- Success criteria: All interactions tracked accurately; data persists across sessions; no performance impact on user experience; admin dashboard loads quickly; data visualization is clear and actionable; unique users tracked only once per device

**Admin Dashboard** [IMPLEMENTED]
- Functionality: Password-protected admin interface with three tabs (Overview, Tool Usage, EBP Views). Overview shows key metrics (total sessions, users, emails sent, tool interactions) plus top 5 tools and EBPs. Tool Usage and EBP Views tabs show complete ranked tables. Includes analytics reset functionality.
- Purpose: Provide administrators and site owners with insights into platform usage, most popular resources, and user engagement patterns. Enable data-driven decisions about content and feature development.
- Trigger: User clicks subtle "Admin" link in footer → Enters password → Accesses dashboard
- Progression: Click Admin link → View password entry screen → Enter admin password → Dashboard loads with Overview tab → View key metrics in card format → See top 5 tools and EBPs → Switch to Tool Usage or EBP Views tabs for complete data → View ranked tables with usage counts → Can reset all analytics (with confirmation) → Exit dashboard returns to home
- Success criteria: Password protection works reliably; analytics data displays accurately; tabs switch smoothly; tables are sortable and readable; reset function requires confirmation; dashboard is accessible but not prominent; password is: autismandme2024

**AI-Enhanced Case Study Generator** [NEW - AI ENHANCEMENT]
- Functionality: AI-powered tool that generates realistic, contextually relevant case studies based on user-defined parameters. Teachers can specify age range, setting (mainstream/special school/home), challenge type (communication/social/sensory/behaviour/executive function), and specific concerns. The AI generates comprehensive case studies including student background, specific challenges, EBPs used, implementation details, outcomes, and reflections - formatted exactly like the existing case studies collection.
- Purpose: Provide unlimited, tailored case study examples that match teachers' specific contexts when existing case studies don't quite fit. Supplement the curated collection with AI-generated scenarios that demonstrate EBP application in user-specified situations.
- Trigger: User navigates to "Case Studies" section → Clicks "Generate Custom Case Study" button
- Progression: View generation form → Select age range → Select setting → Select challenge type → Describe specific situation (optional) → Generate case study → Review complete case study with student background, challenges, EBPs used, implementation, outcomes, reflections → Save to custom collection → Generated studies appear alongside curated studies with "AI-Generated" badge
- Success criteria: Generated case studies match format and quality of curated examples; include realistic Irish educational context; reference appropriate EBPs from the 29-EBP library; provide actionable implementation details; saved custom case studies persist across sessions; clear visual distinction between curated and AI-generated studies

**AI-Powered EBP Recommendation Engine** [NEW - AI ENHANCEMENT]
- Functionality: Intelligent recommendation system that analyzes a teacher's description of a student situation and suggests the 3-5 most relevant evidence-based practices with detailed rationale. Takes teacher input about student needs (communication, social, sensory, behaviour, learning, environment), current challenges, and desired outcomes, then uses AI to match situation to most appropriate EBPs from the 29-practice library.
- Purpose: Help teachers navigate the 29 EBPs by providing intelligent, context-specific suggestions rather than overwhelming choice. Reduce decision paralysis and increase confidence in EBP selection by explaining why each practice is relevant to the specific situation.
- Trigger: User navigates to "Tools" section → Selects "EBP Recommendation Engine"
- Progression: Describe student situation → Select primary need areas (checkboxes) → Describe current challenges → Describe desired outcomes → Generate recommendations → View 3-5 recommended EBPs with detailed rationale for each → Each recommendation shows EBP name, confidence score, specific relevance explanation, implementation priority (immediate/short-term/long-term), and considerations → Link to full EBP details → Save recommendation report → Export recommendations
- Success criteria: Recommendations are contextually appropriate; rationales are specific and actionable; confidence scores help prioritize; links seamlessly to EBP library for full details; recommendation reports can be saved and exported; generates recommendations in under 10 seconds

**AI Writing Assistant for Documentation** [NEW - AI ENHANCEMENT]
- Functionality: Context-aware writing helper that assists teachers with professional documentation tasks. Supports multiple document types: IEP goals, progress reports, parent communication, incident reports, and accommodation plans. AI helps structure content, suggests appropriate language, ensures neuro-affirming terminology, and maintains professional tone while preserving teacher's specific details.
- Purpose: Reduce documentation burden on teachers while maintaining quality and professional standards. Ensure documentation uses respectful, neuro-affirming language. Help teachers communicate effectively with parents, administrators, and support teams.
- Trigger: User navigates to "Tools" section → Selects "AI Writing Assistant"
- Progression: Select document type (IEP Goal/Progress Report/Parent Letter/Incident Report/Accommodation Plan) → Fill relevant fields (student info, context, key points) → Choose tone (formal/friendly/concerned/celebratory) → Generate draft → Review AI-generated document → Edit as needed → Generate alternative versions if desired → Save final document → Export or email
- Success criteria: Generated documents use appropriate professional language; neuro-affirming terminology throughout; structure matches document type conventions; preserves teacher's specific details and observations; multiple alternatives can be generated; documents can be edited in-app before export; UK English spelling and Irish context maintained

**Smart Search with AI Summarization** [NEW - AI ENHANCEMENT]
- Functionality: Enhanced search that not only finds relevant content but provides AI-generated summaries and contextual connections. When users search for topics, AI analyzes query intent, retrieves relevant EBPs/case studies/tools, and generates a brief summary explaining how found resources connect to the search query. Suggests related searches and highlights key implementation steps.
- Purpose: Help users find information faster and understand relationships between concepts. Surface connections between EBPs that might not be obvious. Provide immediate value before users dive into full content.
- Trigger: User enters search query in main search bar → Selects "Smart Search" option
- Progression: Enter search query → View search results with AI-generated summary at top → Summary explains which EBPs/resources are relevant and why → Results categorized by type (EBPs/Case Studies/Tools) → Each result shows relevance score and brief context → Suggested related searches → Click result to view full content
- Success criteria: Summary generates in under 3 seconds; accurately identifies relevant resources; explains connections between results; related searches are genuinely helpful; standard search remains available as fallback; summary uses accessible language

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

A bold, distinctive palette using the brand colors of black, green, and orange that feels professional yet approachable.

- **Primary Color**: Black (oklch(0.15 0 0)) — Conveys authority, professionalism, and clarity appropriate for educational content; used for headings and primary elements
- **Secondary Color**: Forest Green (oklch(0.55 0.15 150)) — A grounding, natural color for interactive elements and secondary actions; represents growth and calm support
- **Accent Color**: Warm Orange (oklch(0.65 0.18 55)) — An energizing highlight for important callouts and attention-drawing elements; creates warmth and approachability
- **Supporting Colors**: Soft Grey (oklch(0.45 0 0)) for body text; Light Green Tint (oklch(0.92 0.01 150)) for subtle section backgrounds and hover states
- **Foreground/Background Pairings**: 
  - Background White (oklch(0.98 0 0)): Black text (oklch(0.15 0 0)) - Ratio 14.8:1 ✓
  - Forest Green (oklch(0.55 0.15 150)): White text (oklch(0.98 0 0)) - Ratio 4.9:1 ✓
  - Warm Orange accent (oklch(0.65 0.18 55)): Black text (oklch(0.15 0 0)) - Ratio 5.2:1 ✓
  - Soft Grey text (oklch(0.45 0 0)): White background - Ratio 7.5:1 ✓

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
  - Buttons: Black background → Forest Green on hover (no shadow, no transform)
  - Cards: Flat with border → Subtle light green background on hover (no elevation)
  - Inputs: Border only → Border + subtle light green background on focus
  - Bookmarks: Outline star → Filled orange star (instant, no animation)
  
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

## Content Asset System

A comprehensive content asset system has been created in the `/assets` directory containing all required branding, microcopy, content, UI specifications, templates, and documentation. See `/assets/README.md` for complete specification.

### Asset Structure
- **Branding**: Colour palette and typography standards
- **Microcopy**: UI text for buttons, tooltips, empty states, onboarding (JSON)
- **Case Studies**: 4 comprehensive Irish case studies (Aoife, Liam, Maya, Jamal)
- **EBP Content**: 29 markdown files covering all evidence-based practices
- **Tools**: 6 tool documentation files for practical planning resources
- **UI Components**: 5 component specifications (button, card, accordion, tab, input)
- **Design Tokens**: JSON files for colours, spacing, typography, shadows
- **Onboarding**: Flow documentation with 4-screen sequence
- **Audio Scripts**: Narration scripts for introduction, app usage, and EBP template
- **Templates**: 5 exportable template definitions (sensory profile, visual schedule, goal-setting sheet, behaviour support plan, home-school communication)

### Content Standards
All content follows:
- UK English spelling
- Plain language principles  
- Neuro-affirming framing
- Trauma-informed approaches
- No jargon or technical language
- Irish educational context examples
- UDL-aligned structure
- Accessibility requirements

### Implementation
Developers should reference the asset system for:
- All interface microcopy (from JSON files)
- Design implementation (from design tokens)
- Content population (from markdown files)
- Component specifications (from UI component docs)
- Template generation (from template definitions)

**Reference**: `/assets/README.md` for complete authoritative specification
