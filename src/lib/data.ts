import type { EBP, CaseStudy, Tool, RightsContent } from './types'

export const ebps: EBP[] = [
  {
    id: 'visual-supports',
    title: 'Visual Supports',
    category: 'Communication',
    description: 'Visual tools that support understanding, communication, and independence through images, symbols, text, or objects.',
    overview: 'Visual supports include schedules, choice boards, task lists, social stories, and environmental labels. They reduce reliance on verbal processing, support memory, and provide predictable structure. Visual supports are among the most versatile and widely applicable EBPs.',
    quickStart: [
      'Identify one routine or expectation that currently relies on verbal instruction',
      'Create a simple visual representation (photo, symbol, or written list)',
      'Introduce the visual with the student, explaining its purpose',
      'Use the visual consistently in context',
      'Review with student after several uses to confirm understanding'
    ],
    irishExamples: [
      'Primary school classroom: Visual timetable showing subjects using Boardmaker symbols, placed on each student\'s desk',
      'Secondary school: First-Then board for homework completion (First: Maths worksheet, Then: Break with preferred activity)',
      'SEN setting: Photo sequence showing steps for washing hands, laminated and placed beside sink',
      'Whole school: Visual map of building showing "quiet zones" and "busy zones" for breaks'
    ],
    ethicalConsiderations: [
      'Ensure visuals are age-appropriate and dignified; avoid infantilizing imagery for older students',
      'Include student input in design where possible',
      'Avoid visuals that mark student as "different" in stigmatizing ways',
      'Regularly review whether visual is still needed or can be faded'
    ],
    whenToUse: 'Use when verbal instructions alone are insufficient, when predictability would reduce anxiety, or when promoting independence in routines.',
    relatedEBPs: ['structured-work-systems', 'social-narratives', 'visual-activity-schedules']
  },
  {
    id: 'structured-work-systems',
    title: 'Structured Work Systems',
    category: 'Organization',
    description: 'Organized systems that answer four key questions: What work? How much? When finished? What next?',
    overview: 'Structured work systems provide clarity about tasks through visual organization. They reduce uncertainty, support independence, and help students self-manage their work without constant adult direction. Systems can be as simple as a numbered task list or as detailed as left-to-right work trays.',
    quickStart: [
      'Choose one activity or work period to structure',
      'Visually clarify: what tasks, how many, completion signal, what happens after',
      'Set up materials in a consistent, predictable location',
      'Teach the system explicitly with guided practice',
      'Observe and adjust based on student\'s response'
    ],
    irishExamples: [
      'Junior Infants: Three work trays (left to right) with completion box; when all trays done, student gets book corner time',
      'Fifth class: Morning work folder with numbered dividers (1. Spellings, 2. Mental maths, 3. Reading log); checklist on front',
      'Post-primary: Science practical with step-by-step photo card system and "finished" envelope for completed steps',
      'ASD unit: Independent work station with visual timer showing remaining work time'
    ],
    ethicalConsiderations: [
      'Balance structure with opportunities for choice and self-direction',
      'Avoid over-structuring to the point of rigidity',
      'Include breaks and flexibility within the system',
      'Ensure system supports, rather than isolates, the student'
    ],
    whenToUse: 'Use when students struggle with task initiation, understanding expectations, or working independently.',
    relatedEBPs: ['visual-supports', 'self-management', 'task-analysis']
  },
  {
    id: 'naturalistic-intervention',
    title: 'Naturalistic Intervention',
    category: 'Social & Communication',
    description: 'Teaching that occurs in everyday contexts, using natural interests and interactions rather than structured drills.',
    overview: 'Naturalistic intervention follows the student\'s lead, embedding learning in play, routines, and meaningful activities. It prioritizes intrinsic motivation and generalization. This approach contrasts with adult-directed discrete trial methods.',
    quickStart: [
      'Observe what the student is interested in or engaged with',
      'Join their activity without redirecting',
      'Create opportunities for communication or skill use within that activity',
      'Respond to student\'s attempts naturally and meaningfully',
      'Build on interactions rather than controlling them'
    ],
    irishExamples: [
      'Infant class play: Student is lining up toy cars; teacher joins, comments on colors, waits for student to request more cars',
      'Break time: Student prefers solitary play with sand; SNA plays alongside, models language (e.g., "filling," "pouring"), waits for engagement',
      'Home economics: Student chooses to make scones; teacher uses naturally occurring steps to prompt communication ("What do we need next?")',
      'PE: Student enjoys basketball; coach builds turn-taking and cooperation into preferred game rather than separate social skills lesson'
    ],
    ethicalConsiderations: [
      'Respect when student prefers solitary activity; do not force interaction',
      'Prioritize authentic communication over scripted responses',
      'Avoid manipulating access to preferred items as "motivation"',
      'Ensure learning goals are meaningful to the student, not just convenient for adults'
    ],
    whenToUse: 'Use to support communication, social interaction, and skill generalization in contexts that matter to the student.',
    relatedEBPs: ['peer-mediated-instruction', 'prompting', 'reinforcement']
  },
  {
    id: 'social-narratives',
    title: 'Social Narratives',
    category: 'Social & Communication',
    description: 'Short stories that describe social situations, expectations, or perspectives to support understanding.',
    overview: 'Social narratives (including Social Stories™) provide context and clarity about situations that may be confusing, anxiety-provoking, or new. They are written from the student\'s perspective and include descriptive, perspective, and coaching sentences. Effective narratives are individualized and introduced proactively.',
    quickStart: [
      'Identify a specific situation causing difficulty',
      'Write a brief narrative (5-10 sentences) using "I" statements',
      'Include what happens, why it happens, and what the student can do',
      'Read narrative with student several times before the situation occurs',
      'Review and revise based on effectiveness'
    ],
    irishExamples: [
      'Transition to secondary school: "When I start in first year, I will have different teachers for different subjects. This is normal in secondary school. If I feel confused, I can check my timetable or ask my year head."',
      'Assembly: "Sometimes our school has assembly in the hall. It can be loud. I can bring my ear defenders. Assembly usually lasts 20 minutes. When it ends, I go back to my classroom."',
      'Substitute teacher: "Sometimes my teacher Ms. Murphy is not in school. Another teacher comes to our class. The rules are still the same. I can still ask for help."',
      'Fire drill: "A loud bell means fire drill. We walk outside quickly and quietly. We stand in our class line. When the bell rings twice, we go back inside. It is to keep us safe."'
    ],
    ethicalConsiderations: [
      'Avoid narratives that pressure conformity or mask distress ("I will be calm," "I will not mind")',
      'Include student perspective and co-create when possible',
      'Do not use narratives to enforce adult convenience over student well-being',
      'Ensure narratives are factually accurate and do not gaslight student experiences'
    ],
    whenToUse: 'Use proactively to prepare for new or challenging situations, or to clarify social expectations.',
    relatedEBPs: ['visual-supports', 'cognitive-behavioral-intervention', 'modeling']
  },
  {
    id: 'peer-mediated-instruction',
    title: 'Peer-Mediated Instruction and Intervention',
    category: 'Social & Communication',
    description: 'Structured approaches where classmates are taught to support social, communication, or learning goals.',
    overview: 'Peer-mediated strategies train neurotypical peers to initiate interactions, model skills, and provide natural opportunities for social engagement. This approach promotes inclusion, builds authentic relationships, and reduces reliance on adult facilitation. Peers require explicit teaching and ongoing support.',
    quickStart: [
      'Identify a peer or small group willing to participate',
      'Teach peers specific strategies (e.g., how to invite, how to wait, how to offer choices)',
      'Provide structured opportunities for peer interaction (e.g., partner activities, buddy systems)',
      'Monitor and support peer interactions without hovering',
      'Acknowledge and reinforce peers\' efforts'
    ],
    irishExamples: [
      'Second class: "Lunch buddy" system where peer invites autistic classmate to sit together and models conversation starters',
      'Sixth class: Peer tutoring pairs for reading; peer waits 5 seconds after asking a question, uses visual supports',
      'TY students: Trained as play facilitators during break for junior classes; use naturalistic strategies to include autistic students in games',
      'ASD unit integration: Mainstream peers attend weekly "games club" in unit; adults teach peers how to adapt rules and offer choices'
    ],
    ethicalConsiderations: [
      'Ensure autistic student is not positioned as a "project" or charity case',
      'Monitor power dynamics; avoid exploitation of autistic student\'s vulnerability',
      'Prioritize mutual relationships, not one-way helping',
      'Provide autistic student with autonomy to decline interactions'
    ],
    whenToUse: 'Use to increase authentic social opportunities, build inclusive classroom culture, and support generalization of social skills.',
    relatedEBPs: ['naturalistic-intervention', 'social-skills-training', 'reinforcement']
  }
]

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-transition-secondary',
    title: 'Smooth Transition from Primary to Secondary',
    ageGroup: '12-13 years',
    setting: 'Transitioning from primary to large secondary school',
    challenge: 'Anxiety about new routines, multiple teachers, and navigating large building',
    theme: 'Transitions',
    context: 'Student had thrived in small primary school with consistent routines and one class teacher. Student and family expressed worry about the move to secondary school with 600+ students.',
    approach: 'School team created transition plan combining: (1) Visual supports (map of school with color-coded zones, visual timetable with teacher photos), (2) Social narrative about secondary school routines, (3) Five short visits during summer to walk routes and meet key staff, (4) Assigned peer buddy from same estate, (5) "Safe person" card with photo of year head and learning support teacher.',
    ebpsUsed: ['visual-supports', 'social-narratives', 'peer-mediated-instruction', 'structured-work-systems'],
    outcome: 'Student started first year with confidence. Used visual map independently by October. Peer buddy relationship developed into genuine friendship. Family reported student was "proud" of managing secondary school.'
  },
  {
    id: 'cs-communication-aac',
    title: 'Implementing AAC in Mainstream Classroom',
    ageGroup: '8 years',
    setting: 'Mainstream third class, rural primary school',
    challenge: 'Minimally verbal student; frustration led to classroom disruption',
    theme: 'Communication',
    context: 'Student had fewer than 10 spoken words. Previous approach relied on adults guessing needs. Student\'s frustration was increasing, and teacher felt under-equipped.',
    approach: 'SLT and SET collaborated to introduce: (1) Low-tech communication book with core vocabulary and activity-specific pages, (2) Naturalistic intervention approach—adults modeled use of book throughout day, (3) Peer training so classmates knew how to interact using book, (4) Visual supports added to classroom routines (choice boards for activities, "help" card on desk), (5) Whole-class lesson on "different ways we communicate."',
    ebpsUsed: ['naturalistic-intervention', 'visual-supports', 'peer-mediated-instruction', 'augmentative-alternative-communication'],
    outcome: 'Within three weeks, student was independently using communication book for choices and requests. Frustration incidents reduced by 70%. Classmates naturally incorporated book into play and group work. Teacher reported feeling "relieved and hopeful."'
  },
  {
    id: 'cs-sensory-regulation',
    title: 'Creating Sensory-Friendly Environment',
    ageGroup: '6 years',
    setting: 'Senior Infants, urban school with open-plan layout',
    challenge: 'Frequent sensory overload; student leaving classroom without warning',
    theme: 'Self-Regulation',
    context: 'Open-plan classroom was bright and noisy. Student regularly fled to corridor or toilets. School initially responded with restrictive rules and reprimands.',
    approach: 'OT assessment identified sensory triggers. Team implemented: (1) Visual supports showing "break options" (quiet corner, sensory tools, walk with SNA), (2) Self-management system—student learned to identify "body signals" and request break independently, (3) Antecedent interventions: dimmed lights near student\'s desk, noise-canceling headphones available, designated "quiet zone" in room, (4) Structured work system with built-in movement breaks every 15 minutes.',
    ebpsUsed: ['visual-supports', 'self-management', 'antecedent-based-intervention', 'structured-work-systems'],
    outcome: 'Elopement stopped entirely within two weeks. Student began requesting breaks appropriately using visual card. Time in classroom increased from 40% to 85%. Parents reported student now "wants to go to school."'
  },
  {
    id: 'cs-whole-school-inclusion',
    title: 'Building Inclusive Whole-School Culture',
    ageGroup: 'All ages (whole school)',
    setting: '16-teacher primary school, mixed urban/rural',
    challenge: 'Autistic students isolated during unstructured times; limited staff understanding',
    theme: 'Inclusion',
    context: 'School had six autistic students across classes. Most struggled during breaks, lunch, and transitions. Staff expressed uncertainty about "what to do." Autistic students were frequently in trouble for "not following rules."',
    approach: 'Principal led 18-month inclusion initiative: (1) Whole-staff training on neurodiversity and neuro-affirming practice (3 sessions), (2) Environmental changes: visual supports throughout building, quiet break space, sensory tools available in each room, (3) Peer-mediated intervention: TY-style "inclusion ambassadors" from sixth class trained to facilitate play, (4) Parent partnership: monthly coffee mornings with families of autistic students to share strategies, (5) Curriculum integration: autism awareness embedded in SPHE using respectful, identity-first language.',
    ebpsUsed: ['visual-supports', 'peer-mediated-instruction', 'naturalistic-intervention', 'antecedent-based-intervention'],
    outcome: 'Break-time incidents reduced by 80%. Staff confidence survey scores rose from 4/10 to 8/10. Autistic students\' attendance improved. Three autistic students elected to student council. School received inclusion award from local ETB.'
  }
]

export const tools: Tool[] = [
  {
    id: 'choose-3-ebps',
    title: 'Choose 3 EBPs Planner',
    description: 'Guided process to select three evidence-based practices for a specific student or situation',
    category: 'Planning',
    icon: 'ListChecks'
  },
  {
    id: 'sensory-checklist',
    title: 'Sensory Needs Checklist',
    description: 'Structured observation tool to identify sensory preferences and sensitivities',
    category: 'Assessment',
    icon: 'Eye'
  },
  {
    id: 'behavior-communication',
    title: 'Behaviour = Communication Analyser',
    description: 'Framework for understanding behaviour as communication rather than as a problem to eliminate',
    category: 'Assessment',
    icon: 'ChatCircle'
  },
  {
    id: 'co-regulation',
    title: 'Co-Regulation Strategies',
    description: 'Practical approaches for supporting student regulation through adult presence and support',
    category: 'Support',
    icon: 'HandHeart'
  },
  {
    id: 'transition-support',
    title: 'Transition Support Builder',
    description: 'Step-by-step guide to planning successful transitions between activities, classes, or schools',
    category: 'Planning',
    icon: 'ArrowsLeftRight'
  }
]

export const rightsContent: RightsContent[] = [
  {
    id: 'uncrpd-article-24',
    title: 'UNCRPD Article 24: Right to Inclusive Education',
    category: 'uncrpd',
    content: `**UN Convention on the Rights of Persons with Disabilities, Article 24**

Ireland ratified the UNCRPD in 2018. Article 24 guarantees the right of disabled people to inclusive education without discrimination.

**Key Principles:**
- Education systems must be inclusive at all levels
- Disabled students must not be excluded from mainstream education
- Reasonable accommodations must be provided
- Support must be provided within the general education system
- Education must support full participation in society

**What This Means in Practice:**
- Autistic students have the right to attend their local mainstream school
- Schools must make reasonable adjustments to include autistic students
- Segregation must be justified, not assumed
- "Inclusion" means presence, participation, and achievement—not just physical placement
- Student and family preferences must be centered in decisions

**Irish Context:**
The Education for Persons with Special Educational Needs (EPSEN) Act 2004 aligns with Article 24 but is not fully commenced. Schools have a legal duty to provide appropriate education in the least restrictive environment.`
  },
  {
    id: 'irish-legal-framework',
    title: 'Irish Legal Framework for SEN',
    category: 'irish-law',
    content: `**Key Irish Legislation for Autistic Students**

**Education Act 1998**
- Establishes right to education for all children
- Requires schools to provide appropriate education
- Parents have right to send child to school of choice (subject to capacity)

**EPSEN Act 2004 (partially commenced)**
- Entitlement to Individual Education Plan (IEP)
- Assessment of educational needs
- Right to inclusive education unless specific reasons justify otherwise
- Requirement for collaboration between school, parents, and professionals

**Education (Admission to Schools) Act 2018**
- Prohibits schools from refusing admission based on disability
- Requires schools to admit students unless refusal is justified by school's capacity or ethos

**Disability Act 2005**
- Right to assessment of needs
- Right to service statement
- Enforcement mechanisms through Ombudsman

**Equal Status Acts 2000-2018**
- Prohibits discrimination in education on grounds of disability
- Requires reasonable accommodation
- Places duty on schools to accommodate, not on families to prove need

**What Teachers Should Know:**
- Autistic students are legally entitled to reasonable accommodations
- Schools cannot refuse admission solely based on autism diagnosis
- Parents are partners, not adversaries—collaboration is a legal requirement
- "Resources" are not a valid reason to deny supports; advocate within your school and upward to your ETB/patron body`
  },
  {
    id: 'masking-awareness',
    title: 'Understanding Masking and Camouflaging',
    category: 'masking',
    content: `**What is Masking?**

Masking (also called camouflaging) is when autistic people suppress or hide their autistic traits to fit into neurotypical environments. It is often an adaptive response to environments that do not accept neurodivergence.

**Examples of Masking:**
- Forcing eye contact despite discomfort
- Suppressing stimming behaviours
- Scripting conversations to appear "normal"
- Hiding sensory distress
- Imitating peers' social behaviours without understanding them
- Not asking for help to avoid standing out

**Why Masking Happens:**
- Fear of bullying or social rejection
- Desire to please adults
- Lack of acceptance for autistic ways of being
- Explicit teaching to "act normal"
- Punishing or correcting autistic behaviours

**The Cost of Masking:**
- Exhaustion and burnout
- Increased anxiety and depression
- Loss of sense of self
- Delayed identification of needs
- Physical and mental health consequences in adulthood

**What Schools Can Do:**
- Create neurodiversity-affirming environments where stimming, different communication styles, and sensory needs are accepted
- Never force eye contact
- Allow movement breaks and sensory supports
- Teach neurotypical peers about neurodiversity (not just "tolerance")
- Celebrate autistic identity—do not frame autism as something to overcome
- Listen when autistic students say they are struggling, even if they "seem fine"
- Recognize that "good behaviour" may be masking, not genuine comfort

**Key Message:**
If an autistic student appears to be coping well but is exhausted, withdrawn at home, or struggling emotionally, consider whether masking is occurring. The goal is authentic participation, not performance of normalcy.`
  },
  {
    id: 'ethical-red-flags',
    title: 'Ethical Red Flags: Practices to Avoid',
    category: 'red-flags',
    content: `**Warning Signs of Harmful Approaches**

Not all autism interventions are ethical or evidence-based. Be alert to the following red flags:

**🚩 Compliance-Based Goals**
- Goals focused on obedience rather than skill-building or understanding
- "Will comply with adult requests without protest"
- Emphasis on "quiet hands," forced eye contact, or suppressing stimming

**🚩 Aversive Consequences**
- Punishment for autistic behaviours (e.g., stimming, echolalia)
- Withdrawal of preferred items or activities as behaviour control
- Physical restraint except in genuine safety emergencies
- Shame, humiliation, or public correction

**🚩 Pathologizing Identity**
- Describing autism as a tragedy or burden
- "Person-first" language imposed without autistic person's preference (many prefer "autistic person")
- Interventions aimed at making student "indistinguishable from peers"
- Framing autistic traits as deficits rather than differences

**🚩 Ignoring Communication**
- Assuming behaviour is "manipulative" or "attention-seeking" rather than communicative
- Planned ignoring of distress signals
- Not providing alternative communication methods for minimally verbal students

**🚩 Intensive, Adult-Directed Approaches Without Play or Choice**
- 30-40 hours/week of structured drills for young children
- No time for self-directed play, rest, or autonomy
- Adult controls all activities and interactions

**🚩 Ignoring Sensory Needs**
- Forcing participation in sensorily painful activities ("exposure therapy" to sensory triggers)
- Not providing sensory accommodations
- Treating sensory distress as "bad behaviour"

**🚩 Family Blame or Burden**
- Suggesting parents caused autism
- Implying family is not doing enough
- Approaches that exhaust family resources (time, money, energy) without evidence of benefit

**What To Do If You Encounter These Practices:**
- Raise concerns with school leadership or SENCO
- Consult with parents and, where appropriate, the autistic student themselves
- Seek guidance from ethical frameworks (UNCRPD, neurodiversity-affirming practice standards)
- Advocate for evidence-based, respectful alternatives

**Key Principle:**
If an intervention would be considered unacceptable for a non-disabled student, it is unacceptable for an autistic student. Dignity and autonomy are non-negotiable.`
  }
]
