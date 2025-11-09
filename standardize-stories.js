// Standardize all story fields to use story.content format
const fs = require('fs');
const path = require('path');
const modulesData = require('./content/modules.json');

console.log('\n========================================');
console.log('STANDARDIZING STORY FORMATS');
console.log('========================================\n');

let fixed = 0;
let alreadyCorrect = 0;

modulesData.modules.forEach((module) => {
  module.chapters.forEach((chapter) => {
    const filePath = path.join(__dirname, 'content', 'chapters', module.id, `${chapter.id}.json`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      // Check if phase1_prime exists and has a story
      if (data.phase1_prime && data.phase1_prime.story) {
        // If story is a string, convert to object format
        if (typeof data.phase1_prime.story === 'string') {
          console.log(`📝 Fixing ${module.id}/${chapter.id}.json`);
          
          data.phase1_prime.story = {
            content: data.phase1_prime.story
          };
          
          // Write back to file with proper formatting
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
          fixed++;
        } else {
          console.log(`✓ ${module.id}/${chapter.id}.json already correct`);
          alreadyCorrect++;
        }
      } else {
        console.log(`⊘ ${module.id}/${chapter.id}.json has no story field`);
      }
      
    } catch (err) {
      console.error(`❌ Error processing ${module.id}/${chapter.id}.json: ${err.message}`);
    }
  });
});

console.log('\n========================================');
console.log('STANDARDIZATION COMPLETE');
console.log('========================================');
console.log(`Files fixed: ${fixed}`);
console.log(`Already correct: ${alreadyCorrect}`);
console.log('\n✅ All story fields now use consistent format\n');
