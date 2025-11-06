# State Management Guide

## 🗄️ Zustand Store Architecture

The Encephalon Learning Platform uses **Zustand** for simple, efficient state management with automatic localStorage persistence.

---

## 📊 Data Structure

### ChapterProgress
```typescript
interface ChapterProgress {
  moduleId: string;        // e.g., "01-foundation"
  chapterId: string;       // e.g., "01-welcome"
  completed: boolean;      // Chapter completion status
  quizScore?: number;      // Optional quiz score (0-100)
  lastAccessed: string;    // ISO timestamp
}
```

### LearningStore
```typescript
interface LearningStore {
  progress: ChapterProgress[];
  currentModule: string | null;
  
  // Actions
  markChapterComplete: (moduleId, chapterId, quizScore?) => void;
  setCurrentModule: (moduleId) => void;
  getModuleProgress: (moduleId) => number;
  getTotalProgress: () => number;
  isChapterComplete: (moduleId, chapterId) => boolean;
}
```

---

## 🎯 Usage Examples

### 1. Mark Chapter Complete

```tsx
import { useLearningStore } from '@/lib/store';

function ChapterView() {
  const markChapterComplete = useLearningStore(
    (state) => state.markChapterComplete
  );

  const handleComplete = () => {
    markChapterComplete('01-foundation', '01-welcome', 95);
  };

  return <button onClick={handleComplete}>Complete Chapter</button>;
}
```

### 2. Check Chapter Status

```tsx
import { useLearningStore } from '@/lib/store';

function ChapterCard({ moduleId, chapterId }) {
  const isComplete = useLearningStore(
    (state) => state.isChapterComplete(moduleId, chapterId)
  );

  return (
    <div>
      {isComplete ? '✅ Completed' : '⏳ In Progress'}
    </div>
  );
}
```

### 3. Display Module Progress

```tsx
import { useLearningStore } from '@/lib/store';

function ModuleCard({ moduleId }) {
  const getModuleProgress = useLearningStore(
    (state) => state.getModuleProgress
  );
  
  const progress = getModuleProgress(moduleId);

  return (
    <div>
      <ProgressBar value={progress} />
      <span>{Math.round(progress)}% Complete</span>
    </div>
  );
}
```

### 4. Display Total Progress

```tsx
import { useLearningStore } from '@/lib/store';

function Dashboard() {
  const getTotalProgress = useLearningStore(
    (state) => state.getTotalProgress
  );
  
  const totalProgress = getTotalProgress();

  return (
    <div>
      <h2>Overall Progress</h2>
      <ProgressBar value={totalProgress} />
      <p>{Math.round(totalProgress)}% of all chapters completed</p>
    </div>
  );
}
```

### 5. Set Current Module

```tsx
import { useLearningStore } from '@/lib/store';

function ModuleSelector() {
  const setCurrentModule = useLearningStore(
    (state) => state.setCurrentModule
  );
  const currentModule = useLearningStore(
    (state) => state.currentModule
  );

  return (
    <select 
      value={currentModule || ''} 
      onChange={(e) => setCurrentModule(e.target.value)}
    >
      <option value="01-foundation">Foundation</option>
      <option value="02-communication">Communication</option>
    </select>
  );
}
```

---

## 🔄 State Updates

### How markChapterComplete Works

```typescript
markChapterComplete: (moduleId, chapterId, quizScore) => {
  set((state) => {
    // Find existing progress entry
    const existingIndex = state.progress.findIndex(
      (p) => p.moduleId === moduleId && p.chapterId === chapterId
    );

    const newProgress = [...state.progress];
    
    if (existingIndex >= 0) {
      // Update existing entry
      newProgress[existingIndex] = {
        ...newProgress[existingIndex],
        completed: true,
        quizScore,
        lastAccessed: new Date().toISOString(),
      };
    } else {
      // Add new entry
      newProgress.push({
        moduleId,
        chapterId,
        completed: true,
        quizScore,
        lastAccessed: new Date().toISOString(),
      });
    }

    return { progress: newProgress };
  });
}
```

**Key Features**:
- ✅ Updates existing progress or creates new entry
- ✅ Preserves quiz scores
- ✅ Tracks last access time
- ✅ Immutable state updates

---

## 💾 Persistence

### Automatic localStorage

The store automatically persists to `localStorage` under the key:
```
encephalon-learning-storage
```

**Features**:
- ✅ Survives page refreshes
- ✅ Survives browser restarts
- ✅ Per-user (browser-based)
- ✅ Automatic serialization

### Storage Structure

```json
{
  "state": {
    "progress": [
      {
        "moduleId": "01-foundation",
        "chapterId": "01-welcome",
        "completed": true,
        "quizScore": 95,
        "lastAccessed": "2024-11-05T16:30:00.000Z"
      }
    ],
    "currentModule": "01-foundation"
  },
  "version": 0
}
```

---

## 📈 Progress Calculations

### Module Progress

```typescript
getModuleProgress: (moduleId) => {
  const moduleChapters = state.progress.filter(
    (p) => p.moduleId === moduleId
  );
  const completed = moduleChapters.filter((p) => p.completed).length;
  return moduleChapters.length > 0 
    ? (completed / moduleChapters.length) * 100 
    : 0;
}
```

**Returns**: Percentage (0-100) of completed chapters in module

### Total Progress

```typescript
getTotalProgress: () => {
  if (state.progress.length === 0) return 0;
  const completed = state.progress.filter((p) => p.completed).length;
  return (completed / state.progress.length) * 100;
}
```

**Returns**: Percentage (0-100) of all completed chapters

---

## 🎨 UI Integration Examples

### Progress Dashboard

```tsx
function ProgressDashboard() {
  const { progress, getTotalProgress } = useLearningStore();
  const totalProgress = getTotalProgress();
  
  const completedCount = progress.filter(p => p.completed).length;
  const totalCount = progress.length;

  return (
    <div className="card-sacred p-8">
      <h2 className="text-2xl font-serif font-bold mb-4">
        Your Progress
      </h2>
      
      <ProgressBar 
        value={totalProgress} 
        showLabel 
        variant="gradient" 
        size="lg" 
      />
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-500">
            {completedCount}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-400">
            {totalCount - completedCount}
          </div>
          <div className="text-sm text-gray-600">Remaining</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-sacred-gold">
            {Math.round(totalProgress)}%
          </div>
          <div className="text-sm text-gray-600">Progress</div>
        </div>
      </div>
    </div>
  );
}
```

### Module Card with Progress

```tsx
function ModuleCard({ module }) {
  const getModuleProgress = useLearningStore(
    (state) => state.getModuleProgress
  );
  
  const progress = getModuleProgress(module.id);
  const isComplete = progress === 100;

  return (
    <div className="card-sacred p-6">
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{module.icon}</span>
        <Badge variant={isComplete ? 'success' : 'default'}>
          {Math.round(progress)}%
        </Badge>
      </div>
      
      <h3 className="text-xl font-serif font-bold mb-2">
        {module.title}
      </h3>
      
      <p className="text-gray-600 mb-4">
        {module.description}
      </p>
      
      <ProgressBar value={progress} size="sm" />
      
      <Link href={`/learn/${module.id}`}>
        <Button className="w-full mt-4">
          {progress > 0 ? 'Continue' : 'Start Module'}
        </Button>
      </Link>
    </div>
  );
}
```

---

## 🔧 Advanced Usage

### Selective Subscriptions

Only subscribe to what you need:

```tsx
// ❌ Bad - Re-renders on any state change
const store = useLearningStore();

// ✅ Good - Only re-renders when progress changes
const progress = useLearningStore((state) => state.progress);

// ✅ Best - Only re-renders when specific chapter changes
const isComplete = useLearningStore(
  (state) => state.isChapterComplete('01-foundation', '01-welcome')
);
```

### Computed Values

```tsx
function useChapterStats(moduleId: string) {
  return useLearningStore((state) => {
    const moduleChapters = state.progress.filter(
      (p) => p.moduleId === moduleId
    );
    
    return {
      total: moduleChapters.length,
      completed: moduleChapters.filter((p) => p.completed).length,
      averageScore: moduleChapters.reduce(
        (sum, p) => sum + (p.quizScore || 0), 0
      ) / moduleChapters.length,
    };
  });
}
```

---

## 🧪 Testing

### Mock Store for Tests

```typescript
import { create } from 'zustand';

export const createMockStore = (initialState = {}) => {
  return create(() => ({
    progress: [],
    currentModule: null,
    markChapterComplete: vi.fn(),
    setCurrentModule: vi.fn(),
    getModuleProgress: vi.fn(() => 0),
    getTotalProgress: vi.fn(() => 0),
    isChapterComplete: vi.fn(() => false),
    ...initialState,
  }));
};
```

---

## 🚀 Performance Tips

1. **Selective Subscriptions**: Only subscribe to needed state
2. **Memoization**: Use `useMemo` for expensive calculations
3. **Shallow Equality**: Zustand uses shallow equality by default
4. **Batch Updates**: Multiple `set` calls are automatically batched

---

## 📝 Best Practices

### ✅ Do
- Use selective subscriptions
- Keep actions simple and focused
- Persist only necessary data
- Use TypeScript for type safety

### ❌ Don't
- Subscribe to entire store unnecessarily
- Store derived data (calculate on demand)
- Mutate state directly
- Store temporary UI state

---

## 🔮 Future Enhancements

Potential additions for v2:

- [ ] User authentication integration
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Offline queue for updates
- [ ] Analytics tracking
- [ ] Multi-device sync
- [ ] Export/import progress
- [ ] Admin dashboard integration

---

**State management made simple with Zustand!** 🎯
