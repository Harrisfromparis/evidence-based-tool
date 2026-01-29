import type { EBP, CaseStudy, Tool, RightsContent } from './types'

export const ebps: EBP[] = [
  {
    id: 'antecedent-based-intervention',
    title: 'Antecedent-Based Intervention',
    category: 'Environmental Support',
    description: 'Modifying the environment or activity before behaviour occurs to prevent challenges and promote engagement.',
    overview: 'Antecedent-based interventions proactively adjust settings, schedules, or materials to reduce triggers and set students up for success. This includes environmental modifications, choice-making, priming, and incorporating special interests.',
    quickStart: [
      'Identify patterns: when and where does the student struggle?',
      'Analyze what happens right before difficulties occur',
      'Modify one environmental factor (lighting, noise, seating, timing)',
      'Observe whether the change reduces difficulties',
      'Adjust and refine based on student response'
    ],
    irishExamples: [
      'Primary class: Move student\'s desk away from noisy corridor door; difficulties during lessons reduce by 60%',
      'Secondary PE: Provide visual schedule of activities at start; student participates instead of refusing',
      'Assembly: Offer noise-canceling headphones and seat near exit; student attends full assembly for first time',
      'Transition time: Give 5-minute and 2-minute warnings with visual timer; meltdowns during transitions stop'
    ],
    ethicalConsiderations: [
      'Modifications should support, not segregate or stigmatize',
      'Include student input about what helps',
      'Avoid using modifications as punishment or reward',
      'Ensure changes benefit student wellbeing, not just adult convenience'
    ],
    whenToUse: 'Use when patterns show specific triggers or when prevention is more appropriate than responding after difficulties occur.',
    relatedEBPs: ['visual-supports', 'self-management', 'structured-work-systems']
  },
  {
    id: 'cognitive-behavioral-intervention',
    title: 'Cognitive Behavioral Intervention',
    category: 'Social-Emotional',
    description: 'Teaching students to recognise thoughts, feelings, and behaviours, and develop coping strategies.',
    overview: 'CBT-based approaches help students identify emotions, understand connections between thoughts and reactions, and practise alternative responses. This supports anxiety management, emotional regulation, and problem-solving.',
    quickStart: [
      'Teach basic emotion identification using visuals or scales',
      'Help student connect feelings to situations ("When X happens, I feel Y")',
      'Introduce one simple coping strategy (deep breathing, taking space, using words)',
      'Practise strategy when calm, not during distress',
      'Review and reinforce when student uses strategy'
    ],
    irishExamples: [
      'Fifth class: Student uses "feelings thermometer" to rate anxiety before tests; teacher offers breaks when rating is high',
      'First year: Counsellor teaches thought-challenging for social anxiety ("Everyone thinks I\'m weird" → "Some people are friendly to me")',
      'ASD unit: Student creates personal "calm-down plan" with drawings of strategies that work',
      'Sixth class: Student keeps mood diary; notices pattern between sleep and school mood'
    ],
    ethicalConsiderations: [
      'Do not use CBT to force conformity or suppress valid responses to harmful situations',
      'Respect that some behaviors are protective, not irrational',
      'Avoid gaslighting student experiences ("You\'re overreacting")',
      'Ensure student has genuine choice about participating'
    ],
    whenToUse: 'Use for anxiety, emotional regulation challenges, or when student can benefit from understanding thought-feeling-behavior connections.',
    relatedEBPs: ['self-management', 'social-narratives', 'social-skills-training']
  },
  {
    id: 'differential-reinforcement',
    title: 'Differential Reinforcement',
    category: 'Behavioural Support',
    description: 'Reinforcing desired behaviours while withholding reinforcement for unwanted behaviours.',
    overview: 'Differential reinforcement strategically provides attention, praise, or access to preferred activities for specific behaviours while reducing reinforcement for others. Types include DRA (alternative behaviour), DRI (incompatible behaviour), and DRO (other behaviour).',
    quickStart: [
      'Identify what currently reinforces the unwanted behaviour (attention, escape, access to items)',
      'Choose an alternative behaviour to reinforce instead',
      'Provide immediate, consistent reinforcement when alternative behaviour occurs',
      'Minimise reinforcement for unwanted behaviour',
      'Monitor and adjust based on whether alternative behaviour increases'
    ],
    irishExamples: [
      'Junior Infants: Student shouts for help; teacher reinforces hand-raising instead, ignores shouting when safe to do so',
      'Third class: Student gets break after completing 10 minutes work (DRO - reinforcing absence of off-task behaviour)',
      'TY student: Reinforced for asking for break verbally instead of leaving class without permission',
      'ASD unit: Student receives preferred sensory toy for sitting during group time, not for elopement attempts'
    ],
    ethicalConsiderations: [
      'Never ignore communication about genuine needs (pain, distress, safety)',
      'Ensure alternative behaviour is within student\'s current abilities',
      'Avoid extinction that increases distress or escalates behaviour',
      'Consider that behaviour may serve important self-regulation functions'
    ],
    whenToUse: 'Use when unwanted behaviour is reinforced by predictable consequences and a clear alternative exists.',
    relatedEBPs: ['functional-behavior-assessment', 'functional-communication-training', 'reinforcement']
  },
  {
    id: 'discrete-trial-training',
    title: 'Discrete Trial Training',
    category: 'Instructional Strategy',
    description: 'Structured teaching method breaking skills into small steps with clear instruction, response, and feedback.',
    overview: 'DTT involves repeated practice of specific skills in a controlled format: instruction → student response → consequence (reinforcement or correction). It is highly structured and adult-directed, often used for foundational skills.',
    quickStart: [
      'Break skill into smallest possible steps',
      'Give clear, consistent instruction',
      'Wait for student response',
      'Provide immediate feedback (praise for correct, gentle correction for incorrect)',
      'Repeat with multiple trials, varying examples'
    ],
    irishExamples: [
      'Early intervention: Teaching color identification using flashcards in 5-minute sessions',
      'ASD unit: Teaching student to respond to name by reinforcing turning toward speaker',
      'Primary: Teaching coin identification with real coins, 10 trials per session',
      'Speech therapy: Teaching pronunciation of target sounds with immediate modeling and reinforcement'
    ],
    ethicalConsiderations: [
      'Avoid making sessions overly long or aversive',
      'Balance structured teaching with naturalistic learning',
      'Ensure skills taught are meaningful and generalisable',
      'Respect student\'s signals of frustration or disengagement',
      'Do not use compliance training that erodes autonomy'
    ],
    whenToUse: 'Use for teaching foundational skills that require repetition and are difficult to teach naturally.',
    relatedEBPs: ['prompting', 'reinforcement', 'task-analysis']
  },
  {
    id: 'exercise-movement',
    title: 'Exercise and Movement',
    category: 'Regulation & Wellness',
    description: 'Using physical activity to support regulation, focus, and overall wellbeing.',
    overview: 'Regular exercise and movement breaks can reduce anxiety, improve attention, and support sensory regulation. Activities range from structured PE to brief movement breaks, yoga, or outdoor time.',
    quickStart: [
      'Identify a time when student struggles with focus or regulation',
      'Introduce a brief movement activity (jumping jacks, walk, stretching)',
      'Make movement a regular, predictable part of routine',
      'Observe impact on subsequent attention or mood',
      'Adjust type and timing of movement based on student preference and response'
    ],
    irishExamples: [
      'Second class: Whole class does 2-minute "brain break" movement routine before maths',
      'First year: Student has timetabled 10-minute walk around school grounds before English class',
      'ASD unit: Trampoline available as scheduled activity; student uses before group work',
      'Fifth class: Student delivers messages to office twice per day to incorporate movement'
    ],
    ethicalConsiderations: [
      'Movement should be offered as support, not used as reward/punishment',
      'Respect student preferences (some students find group PE overwhelming)',
      'Avoid forced participation or competition that causes distress',
      'Ensure activities are accessible and adapted as needed'
    ],
    whenToUse: 'Use to support regulation, reduce anxiety, improve focus, or meet sensory movement needs.',
    relatedEBPs: ['antecedent-based-intervention', 'self-management', 'sensory-integration']
  },
  {
    id: 'extinction',
    title: 'Extinction',
    category: 'Behavioural Support',
    description: 'Withdrawing reinforcement for a behaviour to reduce its occurrence over time.',
    overview: 'Extinction involves no longer providing the consequence that maintains a behaviour. It must be used carefully, consistently, and only when safe and ethical to do so. Extinction bursts (temporary increase) are common.',
    quickStart: [
      'Conduct functional assessment to confirm what reinforces the behaviour',
      'Ensure behaviour is not communicating urgent needs',
      'Consistently withhold reinforcement',
      'Prepare for extinction burst (behaviour may temporarily worsen)',
      'Simultaneously reinforce alternative appropriate behaviour'
    ],
    irishExamples: [
      'Junior Infants: Student calls out for attention; teacher attends only to hand-raising',
      'Third class: Student\'s silly noises during work no longer get peer laughter (peers taught to ignore)',
      'Secondary: Student\'s refusal to work previously resulted in removal from class; now teacher stays neutral and waits',
      'ASD class: Student\'s item-throwing for escape no longer results in leaving activity'
    ],
    ethicalConsiderations: [
      'NEVER use extinction for communication about pain, fear, or genuine distress',
      'NEVER use if behaviour serves important self-regulation function',
      'Do not ignore dangerous behaviours',
      'Must be combined with teaching and reinforcing alternative behaviours',
      'Monitor closely for distress or escalation'
    ],
    whenToUse: 'Use cautiously when behaviour is maintained by predictable reinforcement and only when safe and ethical.',
    relatedEBPs: ['functional-behavior-assessment', 'differential-reinforcement', 'functional-communication-training']
  },
  {
    id: 'functional-behavior-assessment',
    title: 'Functional Behaviour Assessment',
    category: 'Assessment & Planning',
    description: 'Systematic process to understand why a behaviour occurs by identifying its function or purpose.',
    overview: 'FBA involves observing, collecting data, and analysing patterns to determine what triggers behaviour and what consequences maintain it. This understanding guides ethical, effective intervention.',
    quickStart: [
      'Define the specific behaviour clearly',
      'Observe and record when, where, and with whom it occurs',
      'Note what happens right before (antecedent) and right after (consequence)',
      'Identify patterns and hypothesise function (escape, attention, sensory, access)',
      'Design intervention addressing the function'
    ],
    irishExamples: [
      'Primary: Student runs from classroom during maths; FBA reveals escape from overwhelming noise, not avoidance of maths content',
      'Secondary: Student argues with teachers; FBA shows pattern of seeking peer attention, not defiance',
      'ASD unit: Student tips over chairs; FBA identifies sensory-seeking (proprioceptive input), not aggression',
      'Sixth class: Student refuses group work; FBA reveals social anxiety, not laziness'
    ],
    ethicalConsiderations: [
      'View behaviour as communication, not as wilful misbehaviour',
      'Include student perspective when possible',
      'Avoid interventions that punish behaviour without addressing function',
      'Consider whether environment or expectations need to change, not just student'
    ],
    whenToUse: 'Use when behaviour is persistent, distressing, or when previous interventions have not worked.',
    relatedEBPs: ['functional-communication-training', 'antecedent-based-intervention', 'differential-reinforcement']
  },
  {
    id: 'functional-communication-training',
    title: 'Functional Communication Training',
    category: 'Communication',
    description: 'Teaching an appropriate communication method to replace challenging behaviour that serves a communicative function.',
    overview: 'FCT identifies what a behaviour is communicating (e.g., "I need a break," "I want help") and teaches a socially acceptable way to express that need. The new communication must be easier and more effective than the behaviour.',
    quickStart: [
      'Conduct FBA to identify what behaviour is communicating',
      'Choose a simple, accessible communication method (word, sign, picture card)',
      'Teach the new communication explicitly',
      'Immediately honour the communication every time',
      'Gradually reduce reinforcement for the challenging behaviour'
    ],
    irishExamples: [
      'Junior Infants: Student screams to escape loud activities; taught to hand "break card" to teacher',
      'Third class: Student hits to get peer attention; taught to tap peer\'s shoulder and say "play?"',
      'First year: Student storms out to avoid difficult work; taught to request "help, please"',
      'ASD unit: Student drops to floor to access iPad; taught to exchange picture card for iPad time'
    ],
    ethicalConsiderations: [
      'Always honour the new communication promptly and consistently',
      'Ensure new method is truly easier than the challenging behaviour',
      'Respect that the underlying need is valid',
      'Do not use FCT to suppress justified protest or communication about mistreatment'
    ],
    whenToUse: 'Use when challenging behaviour serves a clear communicative function and student needs a better way to express needs.',
    relatedEBPs: ['functional-behavior-assessment', 'augmentative-alternative-communication', 'differential-reinforcement']
  },
  {
    id: 'modeling',
    title: 'Modeling',
    category: 'Instructional Strategy',
    description: 'Demonstrating a skill or behaviour for the student to observe and imitate.',
    overview: 'Modelling involves showing the student what to do through demonstration by adults, peers, or video. It makes implicit expectations explicit and provides a clear example to follow.',
    quickStart: [
      'Identify the specific skill or behaviour to model',
      'Demonstrate clearly while student observes',
      'Think aloud to make your process visible ("I\'m checking the board for instructions")',
      'Invite student to try with support',
      'Provide feedback and model again if needed'
    ],
    irishExamples: [
      'Infants: Teacher models hand-washing routine, narrating each step',
      'Fourth class: Peer models asking to join a game during break',
      'Secondary: Teacher models organising copybook with dividers and labels',
      'ASD unit: SNA models using "I feel..." sentence strip to express emotions'
    ],
    ethicalConsiderations: [
      'Model authentic, not performative, behaviour',
      'Avoid modelling compliance that undermines autonomy',
      'Ensure models are relatable and realistic for student',
      'Respect if student chooses alternative approach that also works'
    ],
    whenToUse: 'Use when teaching new skills, clarifying expectations, or showing what successful performance looks like.',
    relatedEBPs: ['video-modeling', 'peer-mediated-instruction', 'prompting']
  },
  {
    id: 'music-mediated-intervention',
    title: 'Music-Mediated Intervention',
    category: 'Engagement & Regulation',
    description: 'Using music to support communication, social interaction, emotional regulation, or learning.',
    overview: 'Music-based strategies leverage rhythm, melody, and lyrics to engage students, support transitions, teach concepts, or promote regulation. Music can be calming, motivating, or a bridge to social connection.',
    quickStart: [
      'Identify a goal (e.g., smoother transitions, teaching sequence, emotional regulation)',
      'Choose or create simple music that supports the goal',
      'Introduce music in context consistently',
      'Observe student response and adjust',
      'Fade or maintain music based on effectiveness'
    ],
    irishExamples: [
      'Junior Infants: Clean-up song signals end of play; students respond more quickly than verbal instructions',
      'Third class: Student listens to calming playlist during independent work to support focus',
      'Secondary: Student uses preferred music as reinforcer after completing challenging task',
      'ASD unit: Drumming circle supports turn-taking and joint attention'
    ],
    ethicalConsiderations: [
      'Respect student musical preferences and sensitivities',
      'Avoid overwhelming volume or frequency',
      'Do not use music to mask distress or force compliance',
      'Ensure music is culturally appropriate and student-chosen when possible'
    ],
    whenToUse: 'Use when music aligns with student interests, supports regulation, or enhances learning engagement.',
    relatedEBPs: ['antecedent-based-intervention', 'naturalistic-intervention', 'reinforcement']
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
      'Prioritise authentic communication over scripted responses',
      'Avoid manipulating access to preferred items as "motivation"',
      'Ensure learning goals are meaningful to the student, not just convenient for adults'
    ],
    whenToUse: 'Use to support communication, social interaction, and skill generalisation in contexts that matter to the student.',
    relatedEBPs: ['peer-mediated-instruction', 'prompting', 'reinforcement']
  },
  {
    id: 'parent-implemented-intervention',
    title: 'Parent-Implemented Intervention',
    category: 'Collaboration',
    description: 'Teaching parents and caregivers to use evidence-based strategies in home and community settings.',
    overview: 'Parent-implemented interventions involve training families to support their child\'s learning and development outside school. This promotes consistency, generalisation, and empowers families as partners.',
    quickStart: [
      'Identify one strategy that would be useful at home',
      'Explain strategy clearly with examples',
      'Model the strategy for parents',
      'Support parents to practice and ask questions',
      'Follow up regularly to problem-solve and celebrate progress'
    ],
    irishExamples: [
      'Parent workshop: Families learn to use visual schedules for morning and bedtime routines',
      'Home visit: SLT shows parents how to model AAC device use during family meals',
      'Parent-teacher meeting: Teacher shares "wait time" strategy; parent tries during homework',
      'Online session: OT teaches parents calming sensory activities for evening regulation'
    ],
    ethicalConsiderations: [
      'Respect family priorities, values, and capacity',
      'Avoid overwhelming families with expectations',
      'Support, don\'t blame, when implementation is difficult',
      'Ensure strategies align with family culture and home environment'
    ],
    whenToUse: 'Use to extend learning beyond school, support consistency, and empower families as key partners.',
    relatedEBPs: ['naturalistic-intervention', 'visual-supports', 'reinforcement']
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
      'Prioritise mutual relationships, not one-way helping',
      'Provide autistic student with autonomy to decline interactions'
    ],
    whenToUse: 'Use to increase authentic social opportunities, build inclusive classroom culture, and support generalisation of social skills.',
    relatedEBPs: ['naturalistic-intervention', 'social-skills-training', 'reinforcement']
  },
  {
    id: 'pivotal-response-training',
    title: 'Pivotal Response Training',
    category: 'Instructional Strategy',
    description: 'Naturalistic approach targeting pivotal areas like motivation, self-initiation, and responding to multiple cues.',
    overview: 'PRT focuses on key developmental areas that lead to widespread improvements. It uses child choice, natural reinforcement, reinforcing attempts, and varying tasks within natural settings.',
    quickStart: [
      'Follow student\'s lead to activity or interest',
      'Provide clear opportunities for communication or engagement',
      'Reinforce any reasonable attempt, not just perfect responses',
      'Use natural consequences (e.g., if student requests book, give book)',
      'Vary tasks to maintain motivation'
    ],
    irishExamples: [
      'Infant class: Student interested in toy animals; teacher creates communication opportunities ("Which one?") and reinforces any attempt to respond',
      'Break time: Student wants to join game; adult supports initiation and reinforces trying even if words unclear',
      'Homework time: Student chooses order of subjects; completion improves due to increased autonomy',
      'ASD unit: Student learning to ask questions; teacher reinforces "why?" questions during preferred science activity'
    ],
    ethicalConsiderations: [
      'Ensure student choice is genuine, not manipulated',
      'Avoid withholding preferred items to create "motivation"',
      'Respect student\'s autonomy over which activities they engage with',
      'Prioritise intrinsic motivation over compliance'
    ],
    whenToUse: 'Use to support motivation, communication initiation, and generalisation across settings.',
    relatedEBPs: ['naturalistic-intervention', 'reinforcement', 'prompting']
  },
  {
    id: 'prompting',
    title: 'Prompting',
    category: 'Instructional Strategy',
    description: 'Providing cues or assistance to help student perform a skill, with gradual fading as independence increases.',
    overview: 'Prompts include verbal, gestural, modeling, and physical guidance. Effective prompting involves using the least intrusive prompt necessary and systematically fading to promote independence.',
    quickStart: [
      'Identify the skill and where student needs support',
      'Choose prompt type (verbal, gesture, model, physical)',
      'Give instruction, then provide prompt immediately',
      'Gradually fade prompt as student gains competence',
      'Reinforce independent performance'
    ],
    irishExamples: [
      'Junior Infants: Teacher points to coat hook (gestural prompt) when student forgets',
      'Third class: Teacher models first step of long division on board before students begin',
      'First year: Verbal prompt "Check your timetable" before transitions; fades to just "Check..."',
      'ASD unit: SNA uses hand-over-hand prompt for handwriting, fading to light touch, then hover, then independence'
    ],
    ethicalConsiderations: [
      'Use least intrusive prompt that works',
      'Fade prompts to avoid learned dependence',
      'Respect bodily autonomy; use physical prompts only when necessary and with consent',
      'Avoid over-prompting which can reduce student initiative'
    ],
    whenToUse: 'Use when teaching new skills or when student needs support to complete familiar tasks.',
    relatedEBPs: ['task-analysis', 'time-delay', 'modeling']
  },
  {
    id: 'reinforcement',
    title: 'Reinforcement',
    category: 'Behavioural Support',
    description: 'Providing consequences that increase the likelihood a behaviour will occur again.',
    overview: 'Reinforcement can be social (praise, attention), tangible (preferred items), activity-based (access to preferred activities), or sensory. Effective reinforcement is immediate, consistent, and meaningful to the student.',
    quickStart: [
      'Identify what is genuinely reinforcing for this specific student',
      'Provide reinforcement immediately after desired behaviour',
      'Be specific about what earned the reinforcement',
      'Vary reinforcers to maintain effectiveness',
      'Gradually shift to more natural, sustainable reinforcement'
    ],
    irishExamples: [
      'Second class: Student earns 5 minutes of computer time after completing morning tasks',
      'First year: Teacher praises specific effort: "You used your planner—that helped you remember your homework"',
      'ASD unit: Token system; student earns tokens for using words instead of grabbing; exchanges tokens for preferred sensory activity',
      'Fifth class: Student allowed to help teacher set up science experiment (activity reinforcement) after good focus'
    ],
    ethicalConsiderations: [
      'Avoid bribery (reinforcement after behavior, not before)',
      'Do not withhold basic needs as "motivation"',
      'Respect dignity; avoid infantilizing reinforcers for older students',
      'Monitor whether reinforcement is truly increasing desired behaviour'
    ],
    whenToUse: 'Use to strengthen new or emerging skills and maintain positive behaviours.',
    relatedEBPs: ['differential-reinforcement', 'functional-communication-training', 'self-management']
  },
  {
    id: 'response-interruption-redirection',
    title: 'Response Interruption/Redirection',
    category: 'Behavioural Support',
    description: 'Interrupting an interfering behaviour and redirecting to a more appropriate activity.',
    overview: 'RIR involves briefly stopping a repetitive or interfering behaviour and prompting engagement with alternative activity. It should be used respectfully and only when behaviour significantly interferes with learning or safety.',
    quickStart: [
      'Identify repetitive behaviour that interferes with learning or participation',
      'When behaviour occurs, gently interrupt with neutral prompt',
      'Immediately redirect to functional alternative',
      'Reinforce engagement with alternative',
      'Monitor whether behaviour decreases over time'
    ],
    irishExamples: [
      'Junior Infants: Student repeatedly flips pages instead of looking at pictures; teacher gently closes book, asks "What do you see here?"',
      'Third class: Student echolalic during instruction; teacher redirects: "Let\'s listen now, you can tell me about [topic] at break"',
      'First year: Student tapping desk repetitively during test; teacher hands stress ball as quiet alternative',
      'ASD unit: Student scripting instead of responding; teacher interrupts gently: "I asked about your weekend—what did you do?"'
    ],
    ethicalConsiderations: [
      'Do not interrupt behaviours that serve important self-regulation functions without offering alternative',
      'Respect that some repetitive behaviours (stimming) are not problems to eliminate',
      'Use only when behaviour genuinely interferes with functioning',
      'Avoid punitive tone; keep interactions neutral and supportive'
    ],
    whenToUse: 'Use when repetitive behaviours significantly interfere with learning or social situations.',
    relatedEBPs: ['differential-reinforcement', 'functional-communication-training', 'antecedent-based-intervention']
  },
  {
    id: 'scripting',
    title: 'Scripting',
    category: 'Communication',
    description: 'Teaching verbal or written scripts to support communication in specific social situations.',
    overview: 'Scripts provide language frameworks for situations students find difficult. They can be memorized phrases, sentence starters, or visual cue cards. Effective scripting balances support with flexibility.',
    quickStart: [
      'Identify situations where student struggles with what to say',
      'Create brief, natural-sounding script (2-4 sentences)',
      'Practice script when calm and not in the moment',
      'Support student to use script in real situation',
      'Gradually fade or vary script as student gains confidence'
    ],
    irishExamples: [
      'First year: Script for asking peer to explain instruction: "Sorry, I didn\'t catch that. Can you explain?"',
      'Fourth class: Script for joining playground game: "Can I play?" and "What are the rules?"',
      'Secondary: Phone script for calling absent line: "This is [name] in [year]. I\'m not in school today because [reason]"',
      'ASD unit: Script for requesting help: "I need help with [task]"'
    ],
    ethicalConsiderations: [
      'Scripts should sound natural, not robotic',
      'Teach flexibility; student should be able to adapt scripts',
      'Do not force scripted responses that feel inauthentic to student',
      'Avoid scripts that mask distress or enforce compliance'
    ],
    whenToUse: 'Use when student needs language support for specific social or communication situations.',
    relatedEBPs: ['social-skills-training', 'modeling', 'video-modeling']
  },
  {
    id: 'self-management',
    title: 'Self-Management',
    category: 'Independence & Regulation',
    description: 'Teaching students to monitor, evaluate, and reinforce their own behaviour independently.',
    overview: 'Self-management strategies help students track their own actions, assess performance against goals, and self-reinforce. This promotes autonomy, self-awareness, and reduces reliance on adult monitoring.',
    quickStart: [
      'Choose one specific, observable behaviour to self-monitor',
      'Create simple tracking system (checklist, tally, rating scale)',
      'Teach student to use system',
      'Student self-monitors and self-evaluates at set intervals',
      'Gradually fade adult involvement'
    ],
    irishExamples: [
      'Fifth class: Student uses checklist to self-monitor homework completion; checks off each subject',
      'Third year: Student rates own focus each class period on 1-5 scale; notices patterns',
      'Second class: Student moves token from "to-do" to "done" column after completing each task',
      'ASD unit: Student uses visual scale to monitor emotional regulation; requests break when reaching "4"'
    ],
    ethicalConsiderations: [
      'Goals should be meaningful to student, not just adult priorities',
      'Avoid self-monitoring that increases anxiety or self-criticism',
      'Ensure student has skills and support to improve, not just track failures',
      'Celebrate progress, not just perfect performance'
    ],
    whenToUse: 'Use to promote independence, self-awareness, and autonomy in managing behaviour or tasks.',
    relatedEBPs: ['visual-supports', 'reinforcement', 'cognitive-behavioral-intervention']
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
    id: 'social-skills-training',
    title: 'Social Skills Training',
    category: 'Social & Communication',
    description: 'Explicit teaching of social understanding and interaction skills through structured lessons and practice.',
    overview: 'Social skills training involves teaching specific skills like turn-taking, conversation, reading social cues, or friendship skills through instruction, modeling, role-play, and feedback. It requires opportunities for generalization to natural settings.',
    quickStart: [
      'Identify specific social skill student needs support with',
      'Teach skill explicitly: explain, model, discuss',
      'Practice through role-play or structured activities',
      'Provide specific feedback',
      'Create opportunities to practice in natural settings with support'
    ],
    irishExamples: [
      'Small group with SET: Teaching "joining a conversation"—wait for pause, make eye contact, add related comment',
      'Lunchtime club: Practicing giving compliments and responding to others\' compliments',
      'Secondary SPHE: Lessons on interpreting tone of voice and facial expressions using video examples',
      'ASD unit: Board game sessions teaching turn-taking, winning/losing graciously, and encouraging others'
    ],
    ethicalConsiderations: [
      'Respect neurodivergent communication styles; not all neurotypical social norms are necessary',
      'Balance teaching skills with creating accepting environments',
      'Avoid training that pressures masking at cost to wellbeing',
      'Include autistic perspectives on what "social success" means'
    ],
    whenToUse: 'Use when student wants to improve social connections or when specific skill deficits limit participation.',
    relatedEBPs: ['peer-mediated-instruction', 'video-modeling', 'modeling']
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
    id: 'task-analysis',
    title: 'Task Analysis',
    category: 'Instructional Strategy',
    description: 'Breaking complex tasks into small, sequential steps to support teaching and learning.',
    overview: 'Task analysis involves identifying all component steps of a skill, ordering them logically, and teaching each step systematically. This makes complex tasks manageable and clarifies expectations.',
    quickStart: [
      'Choose a task student finds difficult',
      'Break task into smallest observable steps',
      'Write steps in sequence',
      'Teach steps one at a time or chain together',
      'Use visual supports to show steps'
    ],
    irishExamples: [
      'Infant class: Hand-washing broken into 8 steps with photos beside sink',
      'Fifth class: Long division task analysis posted on classroom wall',
      'Home economics: Recipe broken into numbered steps with visual support for each',
      'Secondary: Getting organized for class: 1. Check timetable, 2. Get correct books, 3. Check homework journal, 4. Go to room'
    ],
    ethicalConsiderations: [
      'Ensure task is meaningful and functional for student',
      'Allow for individual variation in how steps are completed',
      'Do not use task analysis to enforce rigid compliance',
      'Fade supports as student gains mastery'
    ],
    whenToUse: 'Use when teaching multi-step tasks or when student struggles with complex skills.',
    relatedEBPs: ['prompting', 'visual-supports', 'structured-work-systems']
  },
  {
    id: 'technology-aided-instruction',
    title: 'Technology-Aided Instruction and Intervention',
    category: 'Technology',
    description: 'Using technology tools to support learning, communication, organization, or engagement.',
    overview: 'Technology-aided approaches include apps, software, tablets, computers, and interactive tools that support various goals. Technology can increase engagement, provide immediate feedback, and support accessibility.',
    quickStart: [
      'Identify learning or support goal',
      'Choose technology tool matched to goal and student ability',
      'Teach student how to use the tool',
      'Integrate tool into regular routines',
      'Monitor effectiveness and adjust'
    ],
    irishExamples: [
      'Third class: Student uses tablet timer app with visual countdown for task completion',
      'First year: Student uses Google Calendar with reminders for homework and tests',
      'ASD unit: Interactive whiteboard for group social skills lessons with engaging visuals',
      'Fifth class: Student uses speech-to-text software for writing assignments'
    ],
    ethicalConsiderations: [
      'Technology should enable, not replace, human connection',
      'Ensure equitable access; do not assume all families have devices',
      'Avoid technology as babysitting or busy work',
      'Teach responsible, safe use'
    ],
    whenToUse: 'Use when technology offers advantages over traditional methods for engagement, accessibility, or skill development.',
    relatedEBPs: ['visual-supports', 'augmentative-alternative-communication', 'self-management']
  },
  {
    id: 'time-delay',
    title: 'Time Delay',
    category: 'Instructional Strategy',
    description: 'Systematically increasing wait time between instruction and prompt to promote independent responding.',
    overview: 'Time delay involves pausing after giving instruction to allow student to respond independently before providing a prompt. The delay gradually increases (e.g., 0 seconds, then 3 seconds, then 5 seconds) to fade prompts.',
    quickStart: [
      'Identify skill where student relies on immediate prompt',
      'Start with 0-second delay (instruction + immediate prompt) until student is consistently successful',
      'Gradually increase delay (2 seconds, then 4, then 6)',
      'If student responds during delay, reinforce immediately',
      'If no response after delay, provide prompt'
    ],
    irishExamples: [
      'Junior Infants: Teacher says "Coat on" and immediately models; after mastery, waits 3 seconds before modeling',
      'Third class: Teacher asks "What\'s 7x8?" waits 5 seconds before giving hint',
      'ASD unit: Student learning to greet; adult says "Say hi" and waits 4 seconds before prompting',
      'First year: Teacher gives instruction for task, waits 10 seconds before repeating'
    ],
    ethicalConsiderations: [
      'Do not use excessive wait time that increases anxiety',
      'Be patient; some students need longer processing time',
      'Avoid using time delay as punishment for slow responding',
      'Celebrate attempts during delay period'
    ],
    whenToUse: 'Use to promote independence by fading prompts systematically.',
    relatedEBPs: ['prompting', 'reinforcement', 'task-analysis']
  },
  {
    id: 'video-modeling',
    title: 'Video Modeling',
    category: 'Instructional Strategy',
    description: 'Using video recordings to demonstrate skills or behaviours for students to learn through observation.',
    overview: 'Video modelling shows students what to do through recorded demonstrations. Videos can feature adults, peers, or the student themselves (video self-modelling). It supports visual learners and allows repeated viewing.',
    quickStart: [
      'Identify skill to teach',
      'Create or find clear video demonstration (1-3 minutes)',
      'Watch video with student several times',
      'Support student to practice skill after viewing',
      'Review video and provide feedback'
    ],
    irishExamples: [
      'Junior Infants: Video of peer putting on coat correctly; student watches before trying',
      'Secondary: Video of student successfully giving presentation; watches before next presentation to boost confidence',
      'ASD unit: Video of morning arrival routine; student watches at home before school',
      'Fifth class: Teacher-created video demonstrating science experiment procedure'
    ],
    ethicalConsiderations: [
      'Obtain consent before recording students',
      'Ensure videos show respectful, authentic behaviour',
      'Avoid videos that promote masking distress or forcing conformity',
      'Use age-appropriate models'
    ],
    whenToUse: 'Use for teaching new skills, clarifying expectations, or building confidence through self-modelling.',
    relatedEBPs: ['modelling', 'social-skills-training', 'task-analysis']
  },
  {
    id: 'visual-activity-schedules',
    title: 'Visual Activity Schedules',
    category: 'Organization',
    description: 'Picture, text, or object-based schedules showing sequence of activities or steps.',
    overview: 'Visual schedules provide predictability, reduce anxiety, support transitions, and promote independence. They range from full-day schedules to mini-schedules for specific routines. Students learn to check their schedule independently.',
    quickStart: [
      'Identify routine or time period that needs structure',
      'Create schedule using format student can access (photos, symbols, words)',
      'Teach student to check schedule and transition independently',
      'Update schedule consistently',
      'Fade adult prompts to check schedule'
    ],
    irishExamples: [
      'Infant class: Visual schedule on desk with Velcro cards for each subject; student moves card to "finished" after each activity',
      'Third class: Written schedule in homework journal for after-school routine',
      'First year: Schedule on phone showing order of classes with room numbers',
      'ASD unit: Object schedule (real items representing activities) for student with vision impairment'
    ],
    ethicalConsiderations: [
      'Include student input about schedule format and content when possible',
      'Build in flexibility for changes; teach coping strategies for schedule changes',
      'Do not use schedule rigidly in ways that increase distress',
      'Ensure schedule supports student, not just adult control'
    ],
    whenToUse: 'Use to provide predictability, support transitions, reduce anxiety, or promote independence.',
    relatedEBPs: ['visual-supports', 'structured-work-systems', 'self-management']
  },
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
      'SEN setting: Photo sequence showing steps for washing hands, displayed beside sink',
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
    id: 'augmentative-alternative-communication',
    title: 'Augmentative and Alternative Communication',
    category: 'Communication',
    description: 'Communication methods beyond speech including picture systems, sign language, and speech-generating devices.',
    overview: 'AAC supports students who are minimally verbal or non-speaking to communicate wants, needs, thoughts, and feelings. AAC can be low-tech (picture boards, sign) or high-tech (tablets with communication apps). It supplements or replaces spoken communication.',
    quickStart: [
      'Assess student\'s current communication and needs',
      'Choose AAC system matched to student ability and context',
      'Model AAC use consistently throughout day',
      'Teach communication partners to recognize and respond to AAC',
      'Expand vocabulary as student demonstrates mastery'
    ],
    irishExamples: [
      'Junior Infants: PECS book with core vocabulary; student exchanges picture to request preferred activities',
      'ASD unit: Student uses iPad with Proloquo2Go app; device always accessible',
      'Third class: Student uses combination of speech and sign (Lámh) for key words',
      'Secondary: Student types responses on laptop during class discussions instead of speaking'
    ],
    ethicalConsiderations: [
      'Presume competence; AAC users have thoughts and feelings to express',
      'Never withhold AAC as punishment',
      'Provide robust vocabulary, not just basic requests',
      'Support autonomy by giving access to AAC at all times',
      'Respect when student chooses not to communicate'
    ],
    whenToUse: 'Use when speech alone is insufficient for functional communication.',
    relatedEBPs: ['functional-communication-training', 'naturalistic-intervention', 'modeling']
  },
  {
    id: 'speech-generating-devices',
    title: 'Speech-Generating Devices',
    category: 'Technology',
    description: 'Electronic devices that produce spoken output for communication, from simple single-message devices to complex tablets.',
    overview: 'SGDs range from basic single-button communicators to sophisticated tablets with thousands of vocabulary items. They provide voice to students who do not speak or whose speech is unreliable. SGDs must be accessible, personalized, and consistently available.',
    quickStart: [
      'Identify communication goals and contexts',
      'Choose device matched to student\'s motor, cognitive, and vision abilities',
      'Program device with functional, meaningful vocabulary',
      'Teach student to use device through modeling',
      'Ensure device is always available and charged'
    ],
    irishExamples: [
      'Infant class: Single-message Big Mack button used to participate in story time ("Turn the page!")',
      'ASD unit: Student uses iPad with TouchChat for all communication needs throughout day',
      'Secondary: Student has device with quick phrases for class participation plus full keyboard for complex thoughts',
      'Primary: Student uses Go Talk 9+ to make choices during snack and play'
    ],
    ethicalConsiderations: [
      'Device is student\'s voice; never withhold or remove as punishment',
      'Program age-appropriate vocabulary including slang, humor, and protest',
      'Respect message ownership; what student says is their communication',
      'Avoid surveillance or limiting vocabulary to "appropriate" messages only',
      'Ensure privacy; adults should not read all message history without consent'
    ],
    whenToUse: 'Use when student needs voice output for functional communication and other AAC methods are insufficient.',
    relatedEBPs: ['augmentative-alternative-communication', 'technology-aided-instruction', 'functional-communication-training']
  },
  {
    id: 'virtual-reality-learning',
    title: 'Virtual Reality Learning',
    category: 'Technology',
    description: 'Using VR technology to create immersive, controlled learning environments for practising social skills, exploring new situations, and building confidence.',
    overview: 'Virtual Reality (VR) provides safe, repeatable environments where autistic students can practise skills, explore anxiety-provoking situations at their own pace, and experience scenarios before encountering them in real life. VR can support social skills practice, transition preparation, situational rehearsal, and sensory exploration with full student control.',
    quickStart: [
      'Identify specific skill or situation that would benefit from safe practice',
      'Choose age-appropriate VR application or create custom scenario',
      'Introduce VR equipment gradually; allow student to explore at own pace',
      'Start with short sessions (5-10 minutes) and build tolerance',
      'Debrief after VR session; connect virtual practice to real-world application'
    ],
    irishExamples: [
      'Transition preparation: Sixth class students use VR to explore their new secondary school building before starting, walking virtual corridors and locating key rooms',
      'Social skills practice: Small group uses VR scenarios to practise ordering food in a café, with teacher pausing to discuss choices and strategies',
      'Anxiety management: First year student with public transport anxiety uses VR bus simulator to practise the school bus journey in a controlled setting',
      'Job skills training: TY students practise workplace scenarios (interviews, customer service, following instructions) in VR before work experience placement'
    ],
    ethicalConsiderations: [
      'Student must have full control to pause, stop, or remove headset at any time',
      'Monitor for sensory overwhelm; VR can be intense for some autistic individuals',
      'Never use VR as "exposure therapy" to force tolerance of distressing stimuli',
      'Ensure VR scenarios are realistic and respectful, not stigmatising',
      'VR is a practice tool, not a replacement for real-world support and accommodation',
      'Consider accessibility: some students experience motion sickness or visual discomfort'
    ],
    whenToUse: 'Use when safe, repeatable practice would build confidence, when preparing for new situations, or when real-world practice is not yet feasible.',
    relatedEBPs: ['video-modeling', 'social-skills-training', 'technology-aided-instruction', 'antecedent-based-intervention']
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
    id: 'lesson-script-generator',
    title: 'Lesson Script Generator',
    description: 'Generate complete, structured lesson scripts based on your chosen EBPs',
    category: 'Planning',
    icon: 'FileText',
    ebpCategories: ['All']
  },
  {
    id: 'choose-3-ebps',
    title: 'Choose 3 EBPs Planner',
    description: 'Guided process to select three evidence-based practices for a specific student or situation',
    category: 'Planning',
    icon: 'ListChecks',
    ebpCategories: ['All']
  },
  {
    id: 'visual-supports-builder',
    title: 'Visual Supports Builder',
    description: 'Create custom visual schedules, choice boards, first-then boards, and task lists',
    category: 'Implementation',
    icon: 'Image',
    ebpCategories: ['Communication', 'Organization']
  },
  {
    id: 'social-narrative-creator',
    title: 'Social Narrative Creator',
    description: 'Generate personalized social stories for challenging situations using evidence-based format',
    category: 'Implementation',
    icon: 'Book',
    ebpCategories: ['Social & Communication']
  },
  {
    id: 'task-analysis-builder',
    title: 'Task Analysis Builder',
    description: 'Break down complex tasks into teachable steps with visual support options',
    category: 'Implementation',
    icon: 'ListNumbers',
    ebpCategories: ['Instructional Strategy']
  },
  {
    id: 'sensory-checklist',
    title: 'Sensory Needs Checklist',
    description: 'Structured observation tool to identify sensory preferences and sensitivities',
    category: 'Assessment',
    icon: 'Eye',
    ebpCategories: ['Environmental Support']
  },
  {
    id: 'behavior-communication',
    title: 'Behaviour = Communication Analyser',
    description: 'Use FBA framework to understand behaviour and plan function-based interventions',
    category: 'Assessment',
    icon: 'ChatCircle',
    ebpCategories: ['Assessment & Planning', 'Behavioural Support']
  },
  {
    id: 'fct-planner',
    title: 'Functional Communication Training Planner',
    description: 'Design FCT interventions that teach appropriate communication to replace challenging behaviour',
    category: 'Implementation',
    icon: 'ChatsCircle',
    ebpCategories: ['Communication', 'Behavioural Support']
  },
  {
    id: 'reinforcement-menu',
    title: 'Reinforcement Menu Builder',
    description: 'Identify effective reinforcers and create reinforcement systems with fading plans',
    category: 'Implementation',
    icon: 'Star',
    ebpCategories: ['Behavioural Support']
  },
  {
    id: 'prompting-hierarchy',
    title: 'Prompting Hierarchy Planner',
    description: 'Design least-to-most prompting strategies with systematic fading procedures',
    category: 'Implementation',
    icon: 'ArrowBendDownRight',
    ebpCategories: ['Instructional Strategy']
  },
  {
    id: 'self-management-system',
    title: 'Self-Management System Designer',
    description: 'Create self-monitoring tools with visual tracking and student-selected goals',
    category: 'Implementation',
    icon: 'ChartLine',
    ebpCategories: ['Independence & Regulation']
  },
  {
    id: 'co-regulation',
    title: 'Co-Regulation Strategies',
    description: 'Practical approaches for supporting student regulation through adult co-regulation',
    category: 'Support',
    icon: 'HandHeart',
    ebpCategories: ['Regulation & Wellness']
  },
  {
    id: 'transition-support',
    title: 'Transition Support Builder',
    description: 'Step-by-step guide to planning successful transitions using antecedent strategies',
    category: 'Planning',
    icon: 'ArrowsLeftRight',
    ebpCategories: ['Environmental Support']
  },
  {
    id: 'structured-work-planner',
    title: 'Structured Work System Planner',
    description: 'Design work systems answering: What work? How much? When finished? What next?',
    category: 'Implementation',
    icon: 'Folders',
    ebpCategories: ['Organization']
  },
  {
    id: 'peer-mediation-guide',
    title: 'Peer-Mediated Support Guide',
    description: 'Plan peer buddy systems, peer tutoring, or play facilitation with training scripts',
    category: 'Implementation',
    icon: 'UsersThree',
    ebpCategories: ['Social & Communication']
  },
  {
    id: 'parent-ebp-assessment',
    title: 'Parent/Caregiver EBP Assessment',
    description: 'Parents rate all 28 EBPs based on what works at home to inform school planning',
    category: 'Collaboration',
    icon: 'UserCircle',
    ebpCategories: ['Collaboration']
  },
  {
    id: 'parent-training-planner',
    title: 'Parent Training Session Planner',
    description: 'Design parent workshops or one-on-one coaching sessions for home implementation',
    category: 'Collaboration',
    icon: 'Presentation',
    ebpCategories: ['Collaboration']
  },
  {
    id: 'school-planner',
    title: 'School Daily Planner',
    description: 'Create personalized daily schedules incorporating EBPs and accommodations',
    category: 'Planning',
    icon: 'CalendarCheck',
    ebpCategories: ['Organization']
  },
  {
    id: 'student-input',
    title: 'Student Voice: My Triggers & Supports',
    description: 'Students share experiences with strategies, expressing what helps and what causes stress',
    category: 'Collaboration',
    icon: 'Smiley',
    ebpCategories: ['Collaboration']
  },
  {
    id: 'social-skills-lesson',
    title: 'Social Skills Lesson Planner',
    description: 'Design structured social skills lessons with modeling, practice, and generalization',
    category: 'Implementation',
    icon: 'UsersThree',
    ebpCategories: ['Social & Communication']
  },
  {
    id: 'video-modeling-script',
    title: 'Video Modeling Script Generator',
    description: 'Create scripts and shot lists for video modeling or video self-modeling',
    category: 'Implementation',
    icon: 'Video',
    ebpCategories: ['Instructional Strategy']
  },
  {
    id: 'aac-implementation',
    title: 'AAC Implementation Planner',
    description: 'Plan AAC system introduction, partner training, and vocabulary expansion',
    category: 'Implementation',
    icon: 'DeviceMobile',
    ebpCategories: ['Communication', 'Technology']
  },
  {
    id: 'antecedent-modification',
    title: 'Antecedent Modification Planner',
    description: 'Identify triggers and design environmental modifications to prevent challenges',
    category: 'Implementation',
    icon: 'Lightning',
    ebpCategories: ['Environmental Support']
  },
  {
    id: 'cbt-activity-planner',
    title: 'CBT Activity Planner',
    description: 'Design cognitive behavioral activities for anxiety, emotions, and problem-solving',
    category: 'Implementation',
    icon: 'Brain',
    ebpCategories: ['Social-Emotional']
  },
  {
    id: 'exercise-movement-schedule',
    title: 'Exercise & Movement Schedule',
    description: 'Plan movement breaks, sensory activities, and exercise for regulation',
    category: 'Implementation',
    icon: 'PersonSimpleRun',
    ebpCategories: ['Regulation & Wellness']
  },
  {
    id: 'music-intervention-planner',
    title: 'Music Intervention Planner',
    description: 'Design music-based activities for transitions, engagement, or regulation',
    category: 'Implementation',
    icon: 'MusicNotes',
    ebpCategories: ['Engagement & Regulation']
  },
  {
    id: 'technology-integration',
    title: 'Technology Integration Planner',
    description: 'Select and plan implementation of technology tools for learning or support',
    category: 'Implementation',
    icon: 'Laptop',
    ebpCategories: ['Technology']
  },
  {
    id: 'dtt-session-planner',
    title: 'DTT Session Planner',
    description: 'Design discrete trial teaching sessions with data collection and errorless learning',
    category: 'Implementation',
    icon: 'Target',
    ebpCategories: ['Instructional Strategy']
  },
  {
    id: 'naturalistic-teaching',
    title: 'Naturalistic Teaching Planner',
    description: 'Plan child-led teaching opportunities in play, routines, and natural contexts',
    category: 'Implementation',
    icon: 'Leaf',
    ebpCategories: ['Social & Communication', 'Instructional Strategy']
  },
  {
    id: 'vr-scenario-planner',
    title: 'VR Scenario Planner',
    description: 'Design virtual reality learning experiences for social skills, transitions, and anxiety management',
    category: 'Implementation',
    icon: 'Laptop',
    ebpCategories: ['Technology', 'Social & Communication']
  },
  {
    id: 'vr-transition-prep',
    title: 'VR Transition Preparation',
    description: 'Create VR-based transition plans for new schools, classrooms, or environments',
    category: 'Planning',
    icon: 'ArrowsLeftRight',
    ebpCategories: ['Technology', 'Environmental Support']
  }
]

export const teachingApproaches = [
  'Antecedent-Based Intervention',
  'Augmentative and Alternative Communication',
  'Cognitive Behavioral Intervention',
  'Differential Reinforcement',
  'Discrete Trial Training',
  'Exercise and Movement',
  'Extinction',
  'Functional Behavior Assessment',
  'Functional Communication Training',
  'Modeling',
  'Music-Mediated Intervention',
  'Naturalistic Intervention',
  'Parent-Implemented Intervention',
  'Peer-Mediated Instruction and Intervention',
  'Pivotal Response Training',
  'Prompting',
  'Reinforcement',
  'Response Interruption/Redirection',
  'Scripting',
  'Self-Management',
  'Social Narratives',
  'Social Skills Training',
  'Speech-Generating Devices',
  'Structured Work Systems',
  'Task Analysis',
  'Technology-Aided Instruction and Intervention',
  'Time Delay',
  'Video Modeling',
  'Virtual Reality Learning',
  'Visual Activity Schedules',
  'Visual Supports'
] as const

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
