# Chapter Content Files

This directory contains all chapter content organized by module.

## Structure

```
chapters/
├── 01-foundation/
│   ├── 01.json (Welcome & Sacred Responsibility)
│   ├── 02.json (Respecting Dr. Joe's Space)
│   ├── 03.json (Volunteer Agreements & Guidelines)
│   └── 04.json (Code of Conduct & Embodying the Work)
│
├── 02-communication/
│   ├── 01.json (Understanding the Three Types of Support)
│   ├── 02.json (How to Request Medical Assistance)
│   ├── 03.json (When to Call Emotional Support)
│   ├── 04.json (Meditation Assistance & Moving Energy)
│   └── 05.json (Telegram Communication Protocol)
│
├── 03-event-structure/
│   ├── 01.json (The Week Long Retreat Experience)
│   ├── 02.json (Daily Flow & Being Timeless)
│   └── 03.json (The Ballroom as Sacred Space)
│
├── 04-critical-protocols/
│   ├── 01.json (Medical Emergency Protocol)
│   ├── 02.json (Emotional Support Decision Tree)
│   ├── 03.json (Seizure Protocol & Response)
│   ├── 04.json (Gravity Chair Protocol)
│   └── 05.json (Breath Contraindications & Safety)
│
└── 05-roles/
    ├── 01.json (Overview of Volunteer Roles)
    ├── 02.json (Registration Day Essentials)
    └── 03.json (Your Specific Role Deep Dive)
```

## Chapter File Format

Each chapter JSON file follows this structure:

```json
{
  "id": "01",
  "moduleId": "01-foundation",
  "title": "Chapter Title",
  "estimatedTime": "12 min",
  
  "phase1_prime": {
    "breathing": {
      "intro": "Breathing introduction text",
      "instructions": "Breathing instructions"
    },
    "story": {
      "content": "Story content with paragraphs separated by \\n\\n"
    },
    "whyThisMatters": {
      "quote": "Dr. Joe quote",
      "author": "Dr. Joe Dispenza",
      "content": "Why this matters content"
    },
    "learningObjectives": [
      "Objective 1",
      "Objective 2"
    ]
  },
  
  "phase2_immerse": {
    "sections": [
      {
        "title": "Section Title",
        "content": "Section content",
        "pullQuote": {
          "text": "Quote text",
          "author": "Dr. Joe Dispenza"
        }
      }
    ]
  },
  
  "phase3_integrate": {
    "reflection": {
      "prompt": "Reflection prompt",
      "placeholder": "Placeholder text"
    },
    "quiz": [
      {
        "question": "Question text",
        "options": [
          {
            "text": "Option text",
            "isCorrect": true,
            "feedback": "Feedback text"
          }
        ]
      }
    ]
  },
  
  "phase4_anchor": {
    "summary": {
      "keyPoints": [
        "Key point 1",
        "Key point 2"
      ],
      "integration": "Integration text"
    },
    "closingQuote": {
      "text": "Quote text",
      "author": "Dr. Joe Dispenza"
    },
    "nextChapter": {
      "title": "Next chapter title",
      "preview": "Preview text"
    }
  }
}
```

## Content Guidelines

### Story Content
- Start directly with the narrative
- No location/date headers
- Use `\n\n` to separate paragraphs
- Keep stories vivid and relatable
- Include dialogue when appropriate

### Quiz Questions
- Scenario-based, not trivia
- 4 options per question
- Thoughtful feedback for all options
- Explain the "why" behind answers
- Multiple correct answers possible

### Learning Objectives
- Clear and actionable
- Start with verbs (Understand, Recognize, Know)
- 3-5 objectives per chapter
- Aligned with content

### Key Takeaways
- 5-7 bullet points
- Memorable and actionable
- Reinforce main teachings
- Easy to recall

## Loading Content

Content is loaded dynamically using the content loader:

```typescript
import { getChapterContent } from '@/lib/content-loader';

const content = await getChapterContent('01-foundation', '01');
```

## Status

- ✅ Folder structure created
- ✅ Content loader implemented
- ⏳ Chapter content files (to be created)

## Next Steps

1. Create chapter content files for Module 1
2. Test loading and display
3. Create remaining module content
4. Review and refine
