// Deploy a specific git commit to GitHub Pages
// Usage: node deploy-commit.js <commit-hash> [custom-name]
// Example: node deploy-commit.js abc123f
// Example: node deploy-commit.js abc123f "my-feature"

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const commitHash = process.argv[2];
const customName = process.argv[3] || commitHash?.substring(0, 7);

if (!commitHash) {
  console.error('❌ Please provide a commit hash');
  console.log('\nUsage:');
  console.log('  node deploy-commit.js <commit-hash>');
  console.log('  node deploy-commit.js abc123f');
  console.log('  node deploy-commit.js abc123f "feature-name"\n');
  console.log('To see available commits:');
  console.log('  git log --oneline -20\n');
  process.exit(1);
}

console.log(`\n📦 Deploying commit: ${commitHash}`);
console.log(`📁 Deploy path: /Dashco/commits/${customName}/\n`);

// Save current branch
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
console.log(`💾 Current branch: ${currentBranch}`);

const viteConfigPath = path.join(projectRoot, 'vite.config.js');
const appPath = path.join(projectRoot, 'src', 'App.jsx');

// Backup current state
let viteConfigBackup = null;
let appBackup = null;

try {
  // Checkout the specific commit
  console.log(`\n🔄 Checking out commit ${commitHash}...`);
  execSync(`git checkout ${commitHash}`, { stdio: 'inherit' });

  // Read and backup the files from this commit
  viteConfigBackup = fs.readFileSync(viteConfigPath, 'utf8');
  appBackup = fs.readFileSync(appPath, 'utf8');

  // Update base path for this commit
  const deployPath = `/Dashco/commits/${customName}/`;
  
  let updatedConfig = viteConfigBackup;
  
  // Handle different base path formats
  if (updatedConfig.includes('base:')) {
    updatedConfig = updatedConfig.replace(
      /base:\s*["']\/.*?["']/,
      `base: "${deployPath}"`
    );
  } else {
    // Add base if it doesn't exist
    updatedConfig = updatedConfig.replace(
      'export default defineConfig({',
      `export default defineConfig({\n  base: "${deployPath}",`
    );
  }
  
  fs.writeFileSync(viteConfigPath, updatedConfig);
  console.log(`✓ Updated base path to ${deployPath}`);

  // Update router basename if App.jsx exists and has Router
  if (appBackup.includes('Router')) {
    let updatedApp = appBackup;
    
    if (appBackup.includes('basename=')) {
      updatedApp = updatedApp.replace(
        /basename=["']\/.*?["']/,
        `basename="${deployPath.slice(0, -1)}"`
      );
    } else if (appBackup.includes('<Router>')) {
      updatedApp = updatedApp.replace(
        '<Router>',
        `<Router basename="${deployPath.slice(0, -1)}">`
      );
    } else if (appBackup.includes('<BrowserRouter>')) {
      updatedApp = updatedApp.replace(
        '<BrowserRouter>',
        `<BrowserRouter basename="${deployPath.slice(0, -1)}">`
      );
    }
    
    fs.writeFileSync(appPath, updatedApp);
    console.log(`✓ Updated router basename to ${deployPath.slice(0, -1)}`);
  }

  // Install dependencies (in case they changed)
  console.log('\n📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the project
  console.log('\n🔨 Building project...\n');
  execSync('npm run build', { stdio: 'inherit' });

  // Deploy to gh-pages
  console.log(`\n🚀 Deploying to GitHub Pages...\n`);
  execSync(`npx gh-pages -d dist -e commits/${customName}`, { stdio: 'inherit' });

  console.log(`\n✅ Deployment complete!`);
  console.log(`\n🌐 Your commit is available at:`);
  console.log(`   https://sonymounika63.github.io/Dashco/commits/${customName}/\n`);
  
  // Save deployment info
  const deployInfo = {
    commit: commitHash,
    name: customName,
    date: new Date().toISOString(),
    url: `https://sonymounika63.github.io/Dashco/commits/${customName}/`
  };
  
  const deploymentsFile = path.join(projectRoot, '.deployments.json');
  let deployments = [];
  
  if (fs.existsSync(deploymentsFile)) {
    deployments = JSON.parse(fs.readFileSync(deploymentsFile, 'utf8'));
  }
  
  deployments.push(deployInfo);
  fs.writeFileSync(deploymentsFile, JSON.stringify(deployments, null, 2));
  console.log('✓ Deployment info saved to .deployments.json\n');

} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
} finally {
  // Return to original branch
  console.log(`\n🔄 Returning to ${currentBranch}...`);
  try {
    execSync(`git checkout ${currentBranch}`, { stdio: 'inherit' });
    console.log('✓ Returned to original branch\n');
  } catch (e) {
    console.error('⚠️  Could not return to original branch. Please run: git checkout ' + currentBranch);
  }
}

