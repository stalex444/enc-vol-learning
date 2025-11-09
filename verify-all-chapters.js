// Verify ALL chapter files exist and are valid
const fs = require('fs');
const path = require('path');
const modulesData = require('./content/modules.json');

console.log('\n========================================');
console.log('COMPLETE CHAPTER FILE VERIFICATION');
console.log('========================================\n');

let totalChapters = 0;
let validChapters = 0;
let errors = [];

modulesData.modules.forEach((module) => {
  console.log(`\n📁 Module: ${module.id} - ${module.title}`);
  console.log(`   Expected chapters: ${module.chapters.length}\n`);
  
  module.chapters.forEach((chapter) => {
    totalChapters++;
    const filePath = path.join(__dirname, 'content', 'chapters', module.id, `${chapter.id}.json`);
    
    process.stdout.write(`   Checking ${module.id}/${chapter.id}.json ... `);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log('❌ FILE NOT FOUND');
      errors.push(`${module.id}/${chapter.id}.json - File does not exist`);
      return;
    }
    
    // Try to read and parse JSON
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      // Verify required fields
      const requiredFields = ['id', 'moduleId', 'title', 'estimatedTime'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        console.log(`❌ MISSING FIELDS: ${missingFields.join(', ')}`);
        errors.push(`${module.id}/${chapter.id}.json - Missing fields: ${missingFields.join(', ')}`);
        return;
      }
      
      // Verify IDs match
      if (data.id !== chapter.id) {
        console.log(`❌ ID MISMATCH: Expected ${chapter.id}, got ${data.id}`);
        errors.push(`${module.id}/${chapter.id}.json - ID mismatch`);
        return;
      }
      
      if (data.moduleId !== module.id) {
        console.log(`❌ MODULE ID MISMATCH: Expected ${module.id}, got ${data.moduleId}`);
        errors.push(`${module.id}/${chapter.id}.json - Module ID mismatch`);
        return;
      }
      
      // Check for phase content
      const hasContent = data.phase1_prime || data.phase2_immerse || data.content;
      if (!hasContent) {
        console.log('⚠️  NO CONTENT (but valid structure)');
      } else {
        console.log('✅ VALID');
        validChapters++;
      }
      
    } catch (err) {
      console.log(`❌ PARSE ERROR: ${err.message}`);
      errors.push(`${module.id}/${chapter.id}.json - ${err.message}`);
    }
  });
});

console.log('\n========================================');
console.log('VERIFICATION SUMMARY');
console.log('========================================');
console.log(`Total chapters expected: ${totalChapters}`);
console.log(`Valid chapters found: ${validChapters}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('\n❌ ERRORS FOUND:\n');
  errors.forEach((error, index) => {
    console.log(`${index + 1}. ${error}`);
  });
  console.log('\n');
  process.exit(1);
} else {
  console.log('\n✅ ALL CHAPTER FILES ARE VALID AND LOADABLE');
  console.log('========================================\n');
}
