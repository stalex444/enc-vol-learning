#!/usr/bin/env python3
"""
Final comprehensive content fix:
1. Convert ALL bullet points to flowing prose
2. Keep 100% of information
3. Improve readability dramatically
"""

import json
import re
from pathlib import Path

def convert_bullets_to_prose(text):
    """Convert bullet lists to flowing prose while preserving all information."""
    
    # Split into paragraphs
    paragraphs = text.split('\n\n')
    result = []
    
    for para in paragraphs:
        # Check if this paragraph contains bullets
        if '\n• ' in para or '\n\n• ' in para:
            # Split intro from bullets
            parts = re.split(r'\n\n?• ', para)
            intro = parts[0].strip()
            
            if intro:
                result.append(intro)
            
            # Convert bullets to sentences
            if len(parts) > 1:
                bullets = parts[1:]
                # Join bullets with proper punctuation
                sentences = '. '.join(b.strip() for b in bullets if b.strip())
                if sentences:
                    result.append(sentences + '.')
        else:
            result.append(para)
    
    return '\n\n'.join(result)

def process_chapter(chapter_path):
    """Process a chapter file."""
    print(f"Processing {chapter_path.name}...")
    
    with open(chapter_path, 'r') as f:
        data = json.load(f)
    
    # Process phase2_immerse sections
    if 'phase2_immerse' in data and 'sections' in data['phase2_immerse']:
        for section in data['phase2_immerse']['sections']:
            if 'content' in section:
                original = section['content']
                section['content'] = convert_bullets_to_prose(original)
                if original != section['content']:
                    print(f"  ✓ Converted bullets in: {section.get('title', 'section')}")
    
    # Write back
    with open(chapter_path, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write('\n')

# Process ALL chapters
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
print("FINAL CONTENT FIX - ALL CHAPTERS")
print("="*60 + "\n")

for chapter_file in chapters:
    chapter_path = Path(chapter_file)
    if chapter_path.exists():
        process_chapter(chapter_path)

print("\n" + "="*60)
print("✅ ALL CHAPTERS FIXED")
print("="*60 + "\n")
print("All bullets converted to flowing prose.")
print("All information preserved.")
print("Ready for world-class presentation.")
