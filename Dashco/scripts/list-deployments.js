// List all deployed commits
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const deploymentsFile = path.join(projectRoot, '.deployments.json');

console.log('\n📋 Deployed Commits:\n');

if (fs.existsSync(deploymentsFile)) {
  const deployments = JSON.parse(fs.readFileSync(deploymentsFile, 'utf8'));
  
  if (deployments.length === 0) {
    console.log('No commits deployed yet.\n');
    console.log('Deploy a commit with: npm run deploy:commit <commit-hash>\n');
  } else {
    console.log('┌─────────────────────────────────────────────────────────────────┐');
    deployments.forEach((deployment, index) => {
      const date = new Date(deployment.date).toLocaleString();
      console.log(`│ ${index + 1}. ${deployment.name}`);
      console.log(`│    Commit: ${deployment.commit}`);
      console.log(`│    Date:   ${date}`);
      console.log(`│    URL:    ${deployment.url}`);
      if (index < deployments.length - 1) {
        console.log('├─────────────────────────────────────────────────────────────────┤');
      }
    });
    console.log('└─────────────────────────────────────────────────────────────────┘\n');
  }
} else {
  console.log('No deployments found.\n');
  console.log('Deploy a commit with: npm run deploy:commit <commit-hash>\n');
}

console.log('Main site: https://sonymounika63.github.io/Dashco/\n');

// Show recent commits
console.log('📝 Recent Commits (last 10):\n');
try {
  const commits = execSync('git log --oneline -10').toString();
  console.log(commits);
} catch (e) {
  console.log('Could not fetch git log\n');
}

