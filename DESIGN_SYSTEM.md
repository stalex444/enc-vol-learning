# Encephalon Learning - Design System

## 🎨 Color Palette

### Primary Colors (Dr. Joe's Brand)
```css
primary-50:  #e6f0ff  /* Lightest blue - backgrounds, hover states */
primary-100: #cce0ff  /* Light blue - subtle accents */
primary-200: #99c2ff  /* Soft blue - borders, dividers */
primary-300: #66a3ff  /* Medium blue - secondary actions */
primary-400: #4A90E2  /* Main blue - primary actions, links */
primary-500: #2B4C7E  /* Deep blue - headers, emphasis */
primary-600: #1e3a5f  /* Darker blue - hover states */
primary-700: #152940  /* Very dark blue - text on light */
primary-800: #0d1a28  /* Almost black - strong emphasis */
primary-900: #1A2332  /* Deep navy - primary text */
```

### Sacred Colors
```css
sacred-gold:   #D4AF37  /* Wisdom, achievement, completion */
sacred-sage:   #87A878  /* Healing, growth, nature */
sacred-violet: #8B7BA8  /* Transformation, mystery, spirituality */
sacred-white:  #FFFFFF  /* Purity, clarity, space */
```

### Usage Guidelines

**Primary-400** (Main Blue):
- Primary buttons
- Links
- Active states
- Brand elements

**Primary-500** (Deep Blue):
- Headings
- Important text
- Section dividers
- Navigation

**Primary-900** (Deep Navy):
- Body text
- Paragraphs
- Content

**Sacred Gold**:
- Completion badges
- Achievement indicators
- Premium features
- Wisdom quotes

**Sacred Sage**:
- Success messages
- Growth indicators
- Nature-related content
- Healing themes

**Sacred Violet**:
- Transformation moments
- Meditation elements
- Spiritual content
- Mystery/depth

## 📝 Typography

### Font Families

**Sans-Serif (Inter)**: Body text, UI elements
```css
font-family: 'Inter', system-ui, sans-serif;
```

**Serif (Tiempos)**: Headings, quotes, sacred moments
```css
font-family: 'Tiempos', Georgia, serif;
```

### Type Scale

```css
/* Headings */
h1: 3rem (48px) - font-serif, font-bold
h2: 2.25rem (36px) - font-serif, font-bold
h3: 1.875rem (30px) - font-serif, font-semibold
h4: 1.5rem (24px) - font-serif, font-semibold

/* Body */
body: 1rem (16px) - font-sans, font-normal
large: 1.125rem (18px) - font-sans, font-normal
small: 0.875rem (14px) - font-sans, font-normal
tiny: 0.75rem (12px) - font-sans, font-normal

/* Special */
quote: 1.5rem (24px) - font-serif, italic
caption: 0.875rem (14px) - font-sans, font-medium
```

### Font Weights
- Light: 300 (subtle text)
- Regular: 400 (body text)
- Medium: 500 (emphasis)
- Semibold: 600 (headings)
- Bold: 700 (strong emphasis)

## 🎭 Animations

### Breathing (6 seconds - coherent breathing)
```css
animation: breathe 6s ease-in-out infinite;

@keyframes breathe {
  0%, 100%: scale(1), opacity(0.8)
  50%: scale(1.1), opacity(1)
}
```

**Usage**: Meditation circles, breathing exercises, sacred moments

### Fade In
```css
animation: fadeIn 0.5s ease-in;

@keyframes fadeIn {
  0%: opacity(0)
  100%: opacity(1)
}
```

**Usage**: Page transitions, content reveals, modals

### Slide Up
```css
animation: slideUp 0.5s ease-out;

@keyframes slideUp {
  0%: translateY(20px), opacity(0)
  100%: translateY(0), opacity(1)
}
```

**Usage**: Cards appearing, form elements, notifications

## 📐 Spacing

### Base Unit: 4px (0.25rem)

```css
/* Common spacing values */
xs:  0.5rem  (8px)   - Tight spacing
sm:  0.75rem (12px)  - Small gaps
md:  1rem    (16px)  - Default spacing
lg:  1.5rem  (24px)  - Section spacing
xl:  2rem    (32px)  - Large gaps
2xl: 3rem    (48px)  - Major sections
3xl: 4rem    (64px)  - Page sections
```

### Component Spacing

**Cards**:
- Padding: `p-6` (24px) or `p-8` (32px)
- Gap between cards: `gap-6` (24px)

**Buttons**:
- Padding: `px-6 py-3` (24px horizontal, 12px vertical)
- Gap between buttons: `gap-4` (16px)

**Sections**:
- Margin between: `mb-12` (48px) or `mb-16` (64px)
- Container padding: `px-4 sm:px-6 lg:px-8`

## 🎯 Components

### Buttons

**Primary**:
```tsx
<button className="bg-primary-400 hover:bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
  Primary Action
</button>
```

**Secondary**:
```tsx
<button className="bg-primary-100 hover:bg-primary-200 text-primary-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
  Secondary Action
</button>
```

**Sacred (Special moments)**:
```tsx
<button className="bg-gradient-to-r from-primary-500 to-sacred-violet text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
  Sacred Action
</button>
```

### Cards

**Default**:
```tsx
<div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
  Content
</div>
```

**Sacred (Special content)**:
```tsx
<div className="bg-gradient-to-br from-primary-50 to-sacred-violet/10 rounded-2xl shadow-lg p-8 border border-primary-200">
  Sacred Content
</div>
```

### Badges

**Status**:
```tsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
  In Progress
</span>
```

**Achievement**:
```tsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sacred-gold/20 text-sacred-gold">
  Mastery Achieved
</span>
```

## 🌊 Backgrounds

### Sacred Geometry Pattern
```css
.sacred-bg {
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(74, 144, 226, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(139, 123, 168, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
}
```

### Gradient Backgrounds

**Primary Gradient**:
```css
bg-gradient-to-r from-primary-400 to-primary-600
```

**Sacred Gradient**:
```css
bg-gradient-to-br from-primary-500 via-sacred-violet to-sacred-gold
```

**Subtle Background**:
```css
bg-gradient-to-br from-primary-50 to-sacred-violet/5
```

## 📱 Responsive Breakpoints

```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Mobile-First Approach
Always design for mobile first, then enhance for larger screens:

```tsx
<div className="p-4 sm:p-6 lg:p-8">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl">
    Responsive Heading
  </h1>
</div>
```

## ♿ Accessibility

### Color Contrast
- Text on white: Use `primary-700` or darker (4.5:1 ratio)
- Large text: Use `primary-500` or darker (3:1 ratio)
- Interactive elements: Clear focus states with `ring-2 ring-primary-400`

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
```

### Motion
Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

## 🎨 Design Principles

1. **Spacious**: Generous white space creates breathing room
2. **Sacred**: Subtle patterns and gradients honor the depth of the work
3. **Smooth**: All transitions are intentional and graceful
4. **Clear**: Typography hierarchy guides the eye
5. **Accessible**: WCAG 2.1 AA compliant throughout
6. **Mobile-First**: 60% of learners on phones
7. **Intentional**: Every element serves the learning journey

---

**Remember**: This isn't just a design system—it's a visual language for transformation. Every color, every animation, every spacing decision should honor the sacred nature of this work.

🦋 *Design with intention. Build with reverence.*
