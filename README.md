# Encephalon Learning Platform

An interactive training platform for Encephalon event crew members, combining meditation, storytelling, practical knowledge, and interactive scenarios.

## Features

- **4-Phase Learning Structure**: Each chapter includes breathing exercises, real stories, content, and Dr. Joe's wisdom
- **Interactive Components**: Quizzes and branching scenarios for hands-on learning
- **Progress Tracking**: Visual progress bars and completion tracking
- **Beautiful UI**: Modern, accessible design with Tailwind CSS
- **State Management**: Persistent progress using Zustand
- **Responsive Design**: Works seamlessly on desktop and mobile

## Project Structure

```
encephalon-learning/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Main layout with header/footer
│   ├── page.tsx                 # Homepage/Dashboard
│   ├── globals.css              # Global styles
│   └── learn/
│       ├── [moduleId]/[chapterId]/
│       │   └── page.tsx         # Chapter view with 4-phase structure
│       └── complete/
│           └── page.tsx         # Completion certificate
│
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Badge.tsx
│   │
│   └── learning/                # Learning-specific components
│       ├── BreathingExercise.tsx
│       ├── StoryHook.tsx
│       ├── WhyThisMatters.tsx
│       ├── ChapterContent.tsx
│       ├── Quiz.tsx
│       ├── Scenario.tsx
│       └── ChapterSummary.tsx
│
├── lib/
│   ├── store.ts                 # Zustand state management
│   ├── content-loader.ts        # Content loading utilities
│   └── utils.ts                 # Helper functions
│
├── types/
│   └── index.ts                 # TypeScript type definitions
│
└── content/                     # JSON content files (to be added)
    ├── modules/
    ├── protocols/
    ├── scenarios/
    └── quotes/
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **UI Components**: Custom components with Tailwind

## Module Structure

The platform includes 5 training modules:

1. **Foundation** - Understanding your sacred responsibility
2. **Communication** - Protocols for effective team communication
3. **Event Structure** - Understanding the flow of an event
4. **Critical Protocols** - Emergency and safety procedures
5. **Team Roles** - Understanding different crew positions

## Chapter Flow

Each chapter follows a 4-phase structure:

1. **Opening Meditation** - Breathing exercise to center learners
2. **Story Hook** - Real story that illustrates key concepts
3. **Content** - Main learning content with protocols and procedures
4. **Why This Matters** - Dr. Joe's perspective on the importance
5. **Interactive Assessment** - Quiz or scenario for practice
6. **Summary** - Key takeaways and reflection prompts

## Adding Content

Content is structured as JSON files in the `content/` directory. To add a new chapter:

1. Create a JSON file in `content/modules/{moduleId}/{chapterId}.json`
2. Follow the chapter structure defined in `types/index.ts`
3. Include all required phases (breathing, story, content, why, quiz/scenario, summary)

Example chapter structure:
```json
{
  "id": "01-welcome",
  "moduleId": "01-foundation",
  "title": "Welcome to Encephalon",
  "description": "Introduction to your role as crew",
  "estimatedTime": 15,
  "phases": [...]
}
```

## Customization

### Colors

The platform uses a butterfly-themed color palette defined in `tailwind.config.ts`:

- Purple: `#8B5CF6`
- Blue: `#3B82F6`
- Gold: `#F59E0B`

### Animations

Custom animations are defined in `tailwind.config.ts` and `globals.css`:

- `breathe` - Pulsing animation for meditation
- `fade-in` - Smooth entrance animation

## Development

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Future Enhancements

- [ ] Add video content support
- [ ] Implement certificate PDF generation
- [ ] Add multi-language support
- [ ] Create admin panel for content management
- [ ] Add social sharing features
- [ ] Implement discussion forums
- [ ] Add mobile app version

## License

© 2024 Encephalon. All rights reserved.

## Support

For questions or support, contact: crew@encephalon.com
