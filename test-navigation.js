// Quick test of navigation logic
const modulesData = require('./content/modules.json');

function getModule(moduleId) {
  return modulesData.modules.find(m => m.id === moduleId);
}

function getNextChapter(moduleId, chapterId) {
  const currentModule = getModule(moduleId);
  if (!currentModule) {
    console.log('❌ Module not found:', moduleId);
    return null;
  }
  
  const currentIndex = currentModule.chapters.findIndex(c => c.id === chapterId);
  if (currentIndex === -1) {
    console.log('❌ Chapter not found:', chapterId, 'in module', moduleId);
    return null;
  }
  
  // Next chapter in same module
  if (currentIndex < currentModule.chapters.length - 1) {
    const next = {
      moduleId,
      chapterId: currentModule.chapters[currentIndex + 1].id,
      title: currentModule.chapters[currentIndex + 1].title,
    };
    console.log('✓ Next chapter in same module:', next);
    return next;
  }
  
  // First chapter of next module
  const moduleIndex = modulesData.modules.findIndex(m => m.id === moduleId);
  if (moduleIndex < modulesData.modules.length - 1) {
    const nextModule = modulesData.modules[moduleIndex + 1];
    const next = {
      moduleId: nextModule.id,
      chapterId: nextModule.chapters[0].id,
      title: nextModule.chapters[0].title,
    };
    console.log('✓ First chapter of next module:', next);
    return next;
  }
  
  // End of all content
  console.log('✓ End of all content - no next chapter');
  return null;
}

console.log('\n=== Testing Navigation Logic ===\n');

// Test within module
console.log('Test 1: Module 01, Chapter 01 → Should go to 01/02');
getNextChapter('01-foundation', '01');

console.log('\nTest 2: Module 01, Chapter 04 → Should go to Module 02, Chapter 01');
getNextChapter('01-foundation', '04');

console.log('\nTest 3: Module 02, Chapter 04 → Should go to Module 03, Chapter 01');
getNextChapter('02-communication', '04');

console.log('\nTest 4: Module 03, Chapter 03 → Should go to Module 04, Chapter 01');
getNextChapter('03-roles', '03');

console.log('\nTest 5: Module 04, Chapter 02 → Should go to Appendix');
getNextChapter('04-critical-protocols', '02');

console.log('\nTest 6: Appendix, Chapter 06 → Should return null (end)');
getNextChapter('appendix', '06');

console.log('\n=== All Tests Complete ===\n');
