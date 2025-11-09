// Find chapters with missing content fields
const fs = require('fs');
const path = require('path');
const modulesData = require('./content/modules.json');

console.log('\n========================================');
console.log('FINDING MISSING CONTENT FIELDS');
console.log('========================================\n');

let issues = [];

modulesData.modules.forEach((module) => {
  module.chapters.forEach((chapter) => {
    const filePath = path.join(__dirname, 'content', 'chapters', module.id, `${chapter.id}.json`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      // Check for phase1_prime.story.content
      if (!data.phase1_prime) {
        issues.push({
          file: `${module.id}/${chapter.id}.json`,
          title: chapter.title,
          issue: 'Missing phase1_prime'
        });
      } else if (!data.phase1_prime.story) {
        issues.push({
          file: `${module.id}/${chapter.id}.json`,
          title: chapter.title,
          issue: 'Missing phase1_prime.story'
        });
      } else if (!data.phase1_prime.story.content) {
        issues.push({
          file: `${module.id}/${chapter.id}.json`,
          title: chapter.title,
          issue: 'Missing phase1_prime.story.content'
        });
      } else if (typeof data.phase1_prime.story.content !== 'string') {
        issues.push({
          file: `${module.id}/${chapter.id}.json`,
          title: chapter.title,
          issue: `phase1_prime.story.content is ${typeof data.phase1_prime.story.content}, not string`
        });
      }
      
    } catch (err) {
      issues.push({
        file: `${module.id}/${chapter.id}.json`,
        title: chapter.title,
        issue: err.message
      });
    }
  });
});

if (issues.length > 0) {
  console.log('❌ FOUND ISSUES:\n');
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.file}`);
    console.log(`   Title: ${issue.title}`);
    console.log(`   Issue: ${issue.issue}\n`);
  });
  console.log(`Total issues: ${issues.length}\n`);
} else {
  console.log('✅ All chapters have valid phase1_prime.story.content\n');
}
