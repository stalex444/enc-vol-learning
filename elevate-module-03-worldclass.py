#!/usr/bin/env python3
"""
Elevate Module 03 spiritual sections to world-class quality
Matching the Intro chapter's voice, rhythm, and emotional resonance
"""

import json
from pathlib import Path

# Chapter 01: Week Long Roles Overview
ch01_reflection = """You might look at all these roles and wonder: Why so much structure? Why so many specific positions?

Here's why: because transformation requires a container. And a container requires everyone doing their part.

Every role matters. Not because of hierarchy. Because of function.

The Greeter creates the first moment of welcome. The Door Team protects the sacred space. The Seating Coordinator ensures everyone has a place. The HSL holds the vision. The HST makes it real.

Remove any one of these, and the container weakens. Keep them all strong, and transformation becomes possible.

You're learning where you fit in this architecture. What your role does. Why it matters. How it serves.

This is profound practice.

Because most of us have been taught that some work is important and some work is just support. That leadership matters more than logistics. That visible roles are more valuable than invisible ones.

But you're learning something different: every role is essential. Every task serves. Every person matters.

The volunteer checking badges at the door is doing sacred work. They're protecting the container. They're ensuring only people who are supposed to be here are here. They're creating safety.

The volunteer managing materials is doing sacred work. They're ensuring the tools of transformation are available when needed. They're removing obstacles. They're creating flow.

The volunteer coordinating seating is doing sacred work. They're ensuring everyone has a place. They're managing the energy of the room. They're creating order from chaos.

There are no small roles. Only essential ones.

And here's what happens when you truly understand this:

You stop comparing. You stop wishing you had a different role. You stop thinking "I'm just" doing anything.

You recognize: I'm doing exactly what's needed. My role serves. My presence matters.

This changes how you show up. Not resentful that you're not leading. Not diminished because your role isn't visible. Grounded in knowing: I'm essential to this container.

You're also learning how roles work together. How HSL and HST partner. How Door and Greeter coordinate. How everyone supports everyone else.

This is what coherence looks like in action. Not everyone doing the same thing. Everyone doing their thing in harmony.

Your role isn't isolated. It's interconnected. What you do affects what others can do. How you show up affects how others can show up.

When you're clear and grounded in your role, you make everyone else's role easier. When you're confused or scattered, you create ripples of confusion.

This is why understanding your role matters. Not just what to do. Why it matters. How it serves. How it connects.

You're becoming someone who can hold their part of the container with integrity. Who doesn't need recognition to know they're valuable. Who serves because the work itself is meaningful.

That's the practice. That's the evolution. That's what it means to be part of something larger than yourself."""

# Chapter 02: Registration Day Roles
ch02_reflection = """Registration Day is when the container begins to form.

Before the first meditation. Before the first teaching. Before transformation even starts.

You're creating the conditions that make everything else possible.

This is profound work.

Because first impressions matter. Not superficially. Energetically.

When someone arrives and feels welcomed—truly seen, truly received—they relax. They begin to trust. They open to possibility.

When someone arrives and feels processed—rushed through, just another number—they contract. They guard. They stay defended.

You're learning to create the first kind of arrival. The kind that says: You're safe here. You're welcome here. You belong here.

This isn't about being friendly. It's about being present.

Present enough to make eye contact. To speak their name. To sense if they're nervous or excited or overwhelmed. To adjust your energy to what they need.

Some people need warmth and reassurance. Some people need efficiency and clarity. Some people need space and minimal interaction.

You're learning to read what each person needs and offer it. Not from a script. From presence.

This is consciousness practice disguised as registration.

You're also learning to handle complexity with grace. Multiple lines. Missing information. Technology issues. People who don't speak English. People who are frustrated or confused.

All while staying grounded. All while maintaining the energy of welcome.

This develops capacity you'll use everywhere. The ability to handle multiple demands without getting flustered. To stay warm while being efficient. To solve problems without losing presence.

And here's what you're really learning:

That how you do anything is how you do everything. That the "small" moment of checking someone in is actually the moment you're setting the tone for their entire experience.

You're learning that service is sacred. Not because you're special. Because you're willing to be fully present for each person, each moment, each interaction.

Registration isn't just logistics. It's the first act of holding space. The first moment of creating container. The first offering of: you matter here.

When you understand this—when you truly feel it—your whole energy shifts.

You're not just checking people in. You're welcoming them home. You're creating the first moment of safety. You're beginning the transformation before it officially begins.

That's who you're becoming. Someone who knows that every interaction is an opportunity to create welcome. To offer presence. To serve.

Not just on Registration Day. In life. Every moment someone crosses your threshold."""

# Chapter 03: Additional Duties & Special Roles
ch03_reflection = """These are the roles most people never see.

The ones that don't get mentioned in the opening circle. The ones that happen behind the scenes. The ones that, when done well, are invisible.

And yet: these roles hold everything.

The Materials Coordinator ensures the tools are there when needed. The Logistics Support solves problems before they become crises. The Float fills gaps before anyone notices they exist.

This is profound service.

Because ego wants to be seen. Ego wants recognition. Ego wants to be the one on stage, the one people thank, the one who gets credit.

But you're learning something deeper: the most essential work is often invisible. The best service is the kind no one notices because everything just works.

This is spiritual practice.

Learning to serve without needing recognition. Learning to do essential work without needing validation. Learning to be the foundation that holds everything up without needing anyone to see it.

When you're the Materials Coordinator and the meditation cushions are exactly where they need to be, no one thinks about it. They just sit down and meditate.

That's success. Not being thanked. Everything working.

When you're Logistics Support and you solve a problem before it disrupts anything, no one knows it was even a problem.

That's mastery. Not being praised. Preventing chaos.

When you're a Float and you fill a gap seamlessly, the event continues without interruption.

That's service. Not being noticed. Maintaining flow.

This is what it means to serve from consciousness instead of ego.

Ego needs to be seen. Consciousness knows: the work itself is the reward. The service itself is the meaning. The contribution itself is the fulfillment.

You're also learning profound flexibility. To move between roles. To adapt to what's needed. To let go of "my role" and embrace "what serves right now."

This develops a capacity that serves you everywhere: the ability to be useful without being rigid. To contribute without needing control. To serve without needing a specific position.

And here's what happens to you in this process:

You become more humble. More flexible. More focused on what serves than what gets you recognition.

You learn that your value isn't in being seen. It's in being useful. In being reliable. In being someone who can be counted on to do what needs doing.

You discover that there's deep satisfaction in invisible work done well. In being the person who makes everything easier for everyone else. In serving the whole without needing individual credit.

These capacities don't just serve events. They serve your life. Your relationships. Your work. Every situation where you can choose between ego and service.

You're learning to be someone who serves because service itself is meaningful. Who contributes because contribution itself is fulfilling. Who holds space because holding space itself is sacred.

That's the practice. That's who you're becoming. That's what it means to do the invisible work that holds everything."""

chapters = {
    '03-roles/01.json': {
        'title': 'Your Essential Part',
        'content': ch01_reflection
    },
    '03-roles/02.json': {
        'title': 'The First Welcome',
        'content': ch02_reflection
    },
    '03-roles/03.json': {
        'title': 'The Invisible Foundation',
        'content': ch03_reflection
    }
}

print("\n" + "="*80)
print("ELEVATING MODULE 03 - WORLD-CLASS SPIRITUAL SECTIONS")
print("="*80 + "\n")
print("Matching Intro quality: Simple, direct, about YOUR transformation\n")

for chapter_file, reflection in chapters.items():
    path = Path('content/chapters') / chapter_file
    
    print(f"Processing {chapter_file}...")
    
    with open(path, 'r') as f:
        data = json.load(f)
    
    data['phase2_immerse']['reflection']['title'] = reflection['title']
    data['phase2_immerse']['reflection']['content'] = reflection['content']
    
    with open(path, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write('\n')
    
    word_count = len(reflection['content'].split())
    print(f"  ✅ {reflection['title']}")
    print(f"     {word_count} words")
    print(f"     Intro-style: flows naturally, speaks to YOU, evokes transformation")
    print()

print("="*80)
print("✅ MODULE 03 COMPLETE - ALL 3 CHAPTERS WORLD-CLASS")
print("="*80)
print("\nAll spiritual sections now match the Intro's quality:")
print("  • Simple, clear language")
print("  • Direct address to YOU")
print("  • About YOUR transformation")
print("  • Flows naturally, no bold headers")
print("  • Evokes feeling, doesn't over-explain")
print("\nReady for review!")
