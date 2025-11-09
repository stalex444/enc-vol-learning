#!/usr/bin/env python3
"""
Improve formatting of manual-heavy chapters:
- Keep ALL content exactly as-is
- Just improve visual presentation with better markdown
- Bold headings, proper spacing
"""

import json
import re
from pathlib import Path

def improve_formatting(text):
    """Improve visual formatting without changing content."""
    
    # Ensure proper spacing after bold headers
    text = re.sub(r'\*\*([^*]+)\*\*\n([^\n])', r'**\1**\n\n\2', text)
    
    # Ensure spacing before bold headers
    text = re.sub(r'([^\n])\n\*\*([^*]+)\*\*', r'\1\n\n**\2**', text)
    
    # Clean up multiple newlines (max 2)
    text = re.sub(r'\n\n\n+', '\n\n', text)
    
    # Ensure bullet points have proper spacing
    text = re.sub(r'\n•', r'\n\n•', text)
    text = re.sub(r'\n\n\n•', r'\n\n•', text)  # Clean up if we added too many
    
    return text.strip()

def process_chapter(chapter_path):
    """Process a chapter file."""
    print(f"Processing {chapter_path.name}...")
    
    with open(chapter_path, 'r') as f:
        data = json.load(f)
    
    # Process phase2_immerse sections
    if 'phase2_immerse' in data and 'sections' in data['phase2_immerse']:
        for section in data['phase2_immerse']['sections']:
            if 'content' in section:
                section['content'] = improve_formatting(section['content'])
    
    # Make sure spiritual reflection sections are properly formatted
    if 'phase2_immerse' in data and 'reflection' in data['phase2_immerse']:
        if 'content' in data['phase2_immerse']['reflection']:
            data['phase2_immerse']['reflection']['content'] = improve_formatting(
                data['phase2_immerse']['reflection']['content']
            )
    
    # Write back
    with open(chapter_path, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write('\n')
    
    print(f"  ✓ Improved formatting for {chapter_path.name}")

# All chapters
chapters = [
    'content/chapters/01-foundation/01.json',
    'content/chapters/01-foundation/02.json',
    'content/chapters/01-foundation/03.json',
    'content/chapters/01-foundation/04.json',
    'content/chapters/02-communication/01.json',
    'content/chapters/02-communication/02.json',
    'content/chapters/02-communication/03.json',
    'content/chapters/02-communication/04.json',
    'content/chapters/03-roles/01.json',
    'content/chapters/03-roles/02.json',
    'content/chapters/03-roles/03.json',
    'content/chapters/04-critical-protocols/01.json',
    'content/chapters/04-critical-protocols/02.json',
]

print("\n" + "="*60)
print("IMPROVING FORMATTING - ALL CHAPTERS")
print("="*60 + "\n")

for chapter_file in chapters:
    chapter_path = Path(chapter_file)
    if chapter_path.exists():
        process_chapter(chapter_path)

print("\n" + "="*60)
print("✅ ALL FORMATTING IMPROVED")
print("="*60 + "\n")
print("Better spacing, cleaner presentation.")
print("All content preserved exactly as-is.")
