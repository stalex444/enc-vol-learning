// Comprehensive navigation test - simulates complete user journey
const modulesData = require('./content/modules.json');

function getModule(moduleId) {
  return modulesData.modules.find(m => m.id === moduleId);
}

function getNextChapter(moduleId, chapterId) {
  const currentModule = getModule(moduleId);
  if (!currentModule) return null;
  
  const currentIndex = currentModule.chapters.findIndex(c => c.id === chapterId);
  if (currentIndex === -1) return null;
  
  // Next chapter in same module
  if (currentIndex < currentModule.chapters.length - 1) {
    return {
      moduleId,
      chapterId: currentModule.chapters[currentIndex + 1].id,
      title: currentModule.chapters[currentIndex + 1].title,
    };
  }
  
  // First chapter of next module
  const moduleIndex = modulesData.modules.findIndex(m => m.id === moduleId);
  if (moduleIndex < modulesData.modules.length - 1) {
    const nextModule = modulesData.modules[moduleIndex + 1];
    return {
      moduleId: nextModule.id,
      chapterId: nextModule.chapters[0].id,
      title: nextModule.chapters[0].title,
    };
  }
  
  // End of all content
  return null;
}

console.log('\n========================================');
console.log('COMPLETE NAVIGATION FLOW TEST');
console.log('========================================\n');

let currentModule = '01-foundation';
let currentChapter = '01';
let stepCount = 0;
let errorCount = 0;

console.log('Starting at: Module 01, Chapter 01\n');

// Simulate clicking through ALL chapters
while (true) {
  stepCount++;
  
  const module = getModule(currentModule);
  if (!module) {
    console.error(`❌ ERROR: Module ${currentModule} not found!`);
    errorCount++;
    break;
  }
  
  const chapter = module.chapters.find(c => c.id === currentChapter);
  if (!chapter) {
    console.error(`❌ ERROR: Chapter ${currentChapter} not found in module ${currentModule}!`);
    errorCount++;
    break;
  }
  
  console.log(`Step ${stepCount}: ${module.title} - ${chapter.title}`);
  console.log(`  Current: /learn/${currentModule}/${currentChapter}`);
  
  // Get next chapter
  const next = getNextChapter(currentModule, currentChapter);
  
  if (!next) {
    console.log(`  ✓ End of content - Navigate to: /learn`);
    console.log('\n✅ REACHED END SUCCESSFULLY\n');
    break;
  }
  
  console.log(`  → Next: /learn/${next.moduleId}/${next.chapterId}`);
  
  // Move to next
  currentModule = next.moduleId;
  currentChapter = next.chapterId;
  
  console.log('');
  
  // Safety check to prevent infinite loop
  if (stepCount > 100) {
    console.error('❌ ERROR: Infinite loop detected!');
    errorCount++;
    break;
  }
}

console.log('========================================');
console.log('TEST SUMMARY');
console.log('========================================');
console.log(`Total steps: ${stepCount}`);
console.log(`Errors: ${errorCount}`);

if (errorCount === 0) {
  console.log('\n✅ ALL NAVIGATION TESTS PASSED');
  console.log('Navigation is working correctly!\n');
} else {
  console.log('\n❌ NAVIGATION HAS ERRORS');
  console.log('Please fix the issues above.\n');
  process.exit(1);
}

// Additional verification: Check all modules have chapters
console.log('\n========================================');
console.log('MODULE STRUCTURE VERIFICATION');
console.log('========================================\n');

let structureErrors = 0;

modulesData.modules.forEach((module, index) => {
  console.log(`Module ${index + 1}: ${module.id}`);
  console.log(`  Title: ${module.title}`);
  console.log(`  Chapters: ${module.chapters.length}`);
  
  if (module.chapters.length === 0) {
    console.error(`  ❌ ERROR: No chapters found!`);
    structureErrors++;
  }
  
  module.chapters.forEach((chapter, chIndex) => {
    console.log(`    ${chIndex + 1}. ${chapter.id} - ${chapter.title}`);
    
    if (!chapter.id || !chapter.title) {
      console.error(`      ❌ ERROR: Missing id or title!`);
      structureErrors++;
    }
  });
  
  console.log('');
});

console.log('========================================');
if (structureErrors === 0) {
  console.log('✅ MODULE STRUCTURE IS VALID\n');
} else {
  console.log(`❌ FOUND ${structureErrors} STRUCTURE ERRORS\n`);
  process.exit(1);
}

console.log('========================================');
console.log('✅ ALL TESTS PASSED - NAVIGATION IS SAFE');
console.log('========================================\n');
