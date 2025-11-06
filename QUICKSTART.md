# Quick Start Guide

## Getting Started

Your Encephalon Learning Platform is ready to go! Follow these steps to start the development server:

### 1. Start the Development Server

```bash
cd /Users/stephaniealexander/CascadeProjects/encephalon-learning
npm run dev
```

### 2. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## What You'll See

### Homepage (Dashboard)
- **Progress Overview**: Visual progress tracking across all modules
- **Module Cards**: 5 training modules with chapter counts and estimated times
- **Completion Stats**: Track completed vs remaining chapters

### Sample Chapter Flow
Visit `/learn/01-foundation/01-welcome` to experience the full learning journey:

1. **Breathing Exercise** - Opening meditation with animated guidance
2. **Story Hook** - Real story about crew presence
3. **Content** - Main learning material with protocols
4. **Why This Matters** - Dr. Joe's perspective
5. **Quiz** - Interactive assessment
6. **Summary** - Key takeaways and reflection

### Completion Certificate
Complete all modules to unlock the certificate page at `/learn/complete`

## Project Structure

```
encephalon-learning/
├── app/                    # Next.js pages
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   └── learning/          # Learning-specific components
├── lib/                   # Utilities and state management
├── types/                 # TypeScript definitions
├── content/               # JSON content files
└── public/                # Static assets
```

## Key Features

✅ **4-Phase Learning Structure** - Meditation, stories, content, wisdom  
✅ **Interactive Components** - Quizzes and scenarios  
✅ **Progress Tracking** - Persistent state with Zustand  
✅ **Beautiful UI** - Modern design with Tailwind CSS  
✅ **Responsive** - Works on desktop and mobile  
✅ **Type-Safe** - Full TypeScript support  

## Next Steps

### Add More Content
1. Create JSON files in `content/modules/{moduleId}/`
2. Follow the structure in `types/index.ts`
3. Include all required phases

### Customize Styling
- Edit colors in `tailwind.config.ts`
- Modify animations in `app/globals.css`
- Update component styles in individual files

### Deploy
```bash
npm run build
npm start
```

Or deploy to Vercel:
```bash
vercel deploy
```

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Next.js will automatically use 3001, 3002, etc.

### TypeScript Errors
All dependencies are installed. TypeScript errors should resolve after the first build.

### Missing Modules
Run `npm install` again if you encounter missing module errors.

## Support

Questions? Check the main README.md or contact: crew@encephalon.com

---

**Happy Learning! 🦋**
