export interface EBPStudentGuide {
  name: string
  simpleExplanation: string
  example: string
}

export const ebpStudentGuides: Record<string, EBPStudentGuide> = {
  'Visual Supports': {
    name: 'Visual Supports',
    simpleExplanation: 'Pictures, charts, or written lists that help you understand what to do and what comes next.',
    example: 'Example: A visual schedule on your desk showing the order of subjects for the day, or a checklist with pictures showing the steps to complete a task.'
  },
  'Structured Work Systems': {
    name: 'Structured Work Systems',
    simpleExplanation: 'An organized way to show what work you need to do, how much there is, and what happens when you finish.',
    example: 'Example: Three folders on your desk labeled 1, 2, 3. When you finish all three, you get free time or a break.'
  },
  'Naturalistic Intervention': {
    name: 'Naturalistic Intervention',
    simpleExplanation: 'Learning that happens during play, everyday activities, or things you\'re interested in—not at a desk with worksheets.',
    example: 'Example: Your teacher joins you while you\'re building with blocks and asks questions or suggests ideas, letting you lead the activity.'
  },
  'Social Narratives': {
    name: 'Social Narratives',
    simpleExplanation: 'Short stories that explain what will happen in a situation and help you know what to expect.',
    example: 'Example: A story about what happens during a fire drill, so you know the alarm will be loud and that everyone walks outside together.'
  },
  'Peer-Mediated Instruction': {
    name: 'Peer-Mediated Instruction',
    simpleExplanation: 'When classmates are taught how to help you learn or include you in activities in a friendly way.',
    example: 'Example: A lunch buddy who invites you to sit together and helps start conversations, or a reading partner who works with you.'
  },
  'Self-Management': {
    name: 'Self-Management',
    simpleExplanation: 'Tools and strategies that help you keep track of your own behavior, feelings, or tasks without always needing an adult.',
    example: 'Example: A checklist where you mark off completed tasks yourself, or a card you use to ask for a break when you need one.'
  },
  'Prompting': {
    name: 'Prompting',
    simpleExplanation: 'Hints, reminders, or cues from a teacher or adult to help you know what to do next.',
    example: 'Example: Your teacher taps your worksheet to remind you to keep working, or points to the visual schedule when it\'s time to switch activities.'
  },
  'Reinforcement': {
    name: 'Reinforcement',
    simpleExplanation: 'Positive things that happen after you do something, which make you want to do it again.',
    example: 'Example: Getting praise, a sticker, extra free time, or time with a favorite activity after completing your work or following a routine.'
  },
  'Time Delay': {
    name: 'Time Delay',
    simpleExplanation: 'When a teacher waits a few seconds after asking you something, giving you time to think and respond on your own.',
    example: 'Example: Your teacher asks a question and waits 5 seconds before giving you a hint, giving you time to answer by yourself first.'
  },
  'Task Analysis': {
    name: 'Task Analysis',
    simpleExplanation: 'Breaking down a big task into small, clear steps so it\'s easier to complete.',
    example: 'Example: Instead of "Clean your desk," the steps are: 1) Put books in bag, 2) Throw away trash, 3) Put pencils in case, 4) Push in chair.'
  },
  'Video Modeling': {
    name: 'Video Modeling',
    simpleExplanation: 'Watching a video of someone doing a task or skill correctly, then trying it yourself.',
    example: 'Example: Watching a video of how to wash your hands properly, how to introduce yourself, or how to complete a science experiment.'
  },
  'Cognitive Behavioral Intervention': {
    name: 'Cognitive Behavioral Intervention',
    simpleExplanation: 'Learning to notice your thoughts and feelings, and finding ways to manage them when they feel overwhelming.',
    example: 'Example: Using a "feelings thermometer" to rate your anxiety level and practicing calming strategies when it gets high.'
  },
  'Differential Reinforcement': {
    name: 'Differential Reinforcement',
    simpleExplanation: 'Getting rewards for doing positive behaviors instead of behaviors that aren\'t helpful.',
    example: 'Example: Getting praise for asking for a break with words or a card, instead of leaving the classroom without permission.'
  },
  'Discrete Trial Training': {
    name: 'Discrete Trial Training',
    simpleExplanation: 'Learning in short, structured practice sessions where you try something, get feedback, and try again.',
    example: 'Example: Your teacher shows you three colors and asks you to point to red. If you do, you get praise. Then you try again with different colors.'
  },
  'Extinction': {
    name: 'Extinction',
    simpleExplanation: 'When adults stop responding to a behavior so that it stops happening over time.',
    example: 'Example: If you call out without raising your hand, the teacher doesn\'t respond, but when you raise your hand, they answer right away.'
  },
  'Functional Behavior Assessment': {
    name: 'Functional Behavior Assessment',
    simpleExplanation: 'Adults figure out why a behavior is happening—what you\'re trying to communicate or what you need.',
    example: 'Example: Your teacher notices you leave class when it\'s too noisy, and realizes you need a quiet break space, not punishment.'
  },
  'Functional Communication Training': {
    name: 'Functional Communication Training',
    simpleExplanation: 'Teaching you a better way to communicate what you need instead of using behaviors that don\'t work well.',
    example: 'Example: Learning to use a "break card" or say "I need help" instead of getting frustrated and shutting down.'
  },
  'Parent-Implemented Intervention': {
    name: 'Parent-Implemented Intervention',
    simpleExplanation: 'When parents or caregivers are taught strategies to help you at home, so support happens everywhere, not just at school.',
    example: 'Example: Your parent uses the same visual schedule at home that you use at school, so mornings are easier.'
  },
  'Pivotal Response Training': {
    name: 'Pivotal Response Training',
    simpleExplanation: 'A teaching method that follows your interests and gives you choices, making learning feel more natural and fun.',
    example: 'Example: If you love dinosaurs, your teacher uses dinosaur toys to practice counting, sorting, and talking.'
  },
  'Response Interruption/Redirection': {
    name: 'Response Interruption/Redirection',
    simpleExplanation: 'When an adult gently interrupts a behavior and helps you do something different instead.',
    example: 'Example: If you\'re repeating the same phrase over and over, your teacher might ask you a question to redirect your attention.'
  },
  'Scripting': {
    name: 'Scripting',
    simpleExplanation: 'Learning specific words or phrases to use in social situations, like a guideline for what to say.',
    example: 'Example: Practicing saying "Hi, my name is ___. What\'s yours?" when meeting someone new.'
  },
  'Social Skills Training': {
    name: 'Social Skills Training',
    simpleExplanation: 'Lessons or practice sessions about social situations, like how to take turns, share, or join a group.',
    example: 'Example: A small group where you practice taking turns in a game, or role-playing how to ask to join others at lunch.'
  },
  'Technology-Aided Instruction': {
    name: 'Technology-Aided Instruction',
    simpleExplanation: 'Using computers, tablets, or apps to help you learn, practice skills, or stay organized.',
    example: 'Example: Using an iPad app to practice spelling words, or a computer program that helps you learn math at your own pace.'
  },
  'Augmentative and Alternative Communication': {
    name: 'Augmentative and Alternative Communication',
    simpleExplanation: 'Tools that help you communicate when speaking is hard—like picture cards, communication books, or speech devices.',
    example: 'Example: Using a book with picture symbols to point to what you want, or a tablet that speaks out loud for you.'
  },
  'Antecedent-Based Intervention': {
    name: 'Antecedent-Based Intervention',
    simpleExplanation: 'Changing the environment or routine before a problem happens, so things go more smoothly.',
    example: 'Example: Dimming bright lights in the classroom, or giving you a heads-up 5 minutes before an activity changes.'
  },
  'Exercise and Movement': {
    name: 'Exercise and Movement',
    simpleExplanation: 'Using physical activity or movement breaks to help you feel calm, focused, and ready to learn.',
    example: 'Example: Taking a quick walk, doing jumping jacks, or using a wobble cushion on your chair to help you concentrate.'
  },
  'Music-Mediated Intervention': {
    name: 'Music-Mediated Intervention',
    simpleExplanation: 'Using music, songs, or rhythm to help you learn, remember things, or feel calm.',
    example: 'Example: Learning the days of the week through a song, or listening to calming music during work time.'
  },
  'Speech-Generating Devices': {
    name: 'Speech-Generating Devices',
    simpleExplanation: 'Electronic devices or apps that speak out loud for you when you type or select words and pictures.',
    example: 'Example: Using a tablet with buttons that say "I need help," "I want a break," or "Can I have water?" when you press them.'
  }
}
