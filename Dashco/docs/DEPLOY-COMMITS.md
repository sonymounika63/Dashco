# Deploy Git Commits to GitHub Pages

View the output of **any git commit** deployed live on GitHub Pages!

## 🚀 Quick Start

### 1. View Your Recent Commits

```bash
git log --oneline -10
```

Output example:
```
abc123f Fix: Updated navbar styling
def456g Feature: Added dark mode
789hij0 Refactor: Improved dashboard layout
```

### 2. Deploy a Specific Commit

```bash
# Deploy by commit hash
npm run deploy:commit abc123f

# Deploy with custom name
npm run deploy:commit abc123f "navbar-fix"
```

### 3. View Your Deployed Commits

```bash
npm run list:deployments
```

## 📋 Deployment URLs

Each commit will be deployed to:
```
https://sonymounika63.github.io/Dashco/commits/<commit-hash>/
```

Examples:
- `https://sonymounika63.github.io/Dashco/commits/abc123f/`
- `https://sonymounika63.github.io/Dashco/commits/navbar-fix/`

## 🎯 Use Cases

### Compare Different Implementations
```bash
# Deploy old version
npm run deploy:commit abc123f "old-design"

# Deploy new version  
npm run deploy:commit def456g "new-design"

# Compare:
# https://sonymounika63.github.io/Dashco/commits/old-design/
# https://sonymounika63.github.io/Dashco/commits/new-design/
```

### Show Feature Progress
```bash
# Deploy before feature
npm run deploy:commit 789hij0 "before-feature"

# Deploy after feature
npm run deploy:commit abc123f "after-feature"
```

### Demo for Client/Team
```bash
# Deploy specific working state
npm run deploy:commit abc123f "demo-jan-15"

# Share URL: https://sonymounika63.github.io/Dashco/commits/demo-jan-15/
```

## 📝 Complete Workflow Example

```bash
# 1. See what commits you have
git log --oneline -20

# Example output:
# abc123f (HEAD -> main) Latest changes
# def456g Previous version  
# 789hij0 Two commits ago
# 1a2b3c4 Three commits ago

# 2. Deploy the commit from 2 days ago
npm run deploy:commit 789hij0 "version-2days-ago"

# 3. Deploy yesterday's commit
npm run deploy:commit def456g "version-yesterday"

# 4. Deploy current version (main site)
npm run deploy

# 5. List all deployed commits
npm run list:deployments

# 6. Now you can compare:
# - Today:     https://sonymounika63.github.io/Dashco/
# - Yesterday: https://sonymounika63.github.io/Dashco/commits/version-yesterday/
# - 2 days ago: https://sonymounika63.github.io/Dashco/commits/version-2days-ago/
```

## 🔍 Finding Specific Commits

### By Date
```bash
# Show commits from last 7 days
git log --since="7 days ago" --oneline

# Show commits from specific date
git log --since="2025-01-01" --until="2025-01-15" --oneline
```

### By Author
```bash
git log --author="Your Name" --oneline -10
```

### By Message
```bash
# Find commits with "navbar" in message
git log --grep="navbar" --oneline
```

### By File
```bash
# Show commits that modified a specific file
git log --oneline src/components/Navbar.jsx
```

## 📊 View All Deployments

```bash
# List all deployed commits with URLs
npm run list:deployments
```

Output:
```
📋 Deployed Commits:

┌─────────────────────────────────────────────────────────────────┐
│ 1. navbar-fix
│    Commit: abc123f
│    Date:   1/15/2025, 10:30:00 AM
│    URL:    https://sonymounika63.github.io/Dashco/commits/navbar-fix/
├─────────────────────────────────────────────────────────────────┤
│ 2. old-design
│    Commit: def456g
│    Date:   1/15/2025, 11:45:00 AM
│    URL:    https://sonymounika63.github.io/Dashco/commits/old-design/
└─────────────────────────────────────────────────────────────────┘
```

## 🛠️ Advanced Usage

### Deploy Multiple Commits at Once

```bash
# Create a script to deploy multiple commits
# deploy-multiple.sh

commits=(
  "abc123f:design-v1"
  "def456g:design-v2"
  "789hij0:design-v3"
)

for commit in "${commits[@]}"; do
  hash="${commit%%:*}"
  name="${commit##*:}"
  npm run deploy:commit $hash $name
done
```

### Deploy Branch

```bash
# Get the latest commit from a branch
git log feature-branch -1 --oneline

# Deploy that commit
npm run deploy:commit <commit-hash> "feature-branch"
```

## ⚠️ Important Notes

1. **Don't delete commits** - Deployed URLs reference specific commits
2. **Wait 1-2 minutes** after deployment for GitHub Pages to update
3. **Clear cache** if you don't see changes (Ctrl+Shift+R)
4. The script temporarily checks out commits and returns to your current branch
5. All deployment info is saved in `.deployments.json`

## 🗑️ Cleanup

To remove deployed commits from GitHub Pages:

```bash
# Clone gh-pages branch
git clone -b gh-pages https://github.com/sonymounika63/Dashco.git dashco-gh-pages
cd dashco-gh-pages

# Remove a specific commit folder
rm -rf commits/abc123f
git add .
git commit -m "Remove old deployment"
git push

# Or remove all commits
rm -rf commits
git add .
git commit -m "Clean up all commit deployments"
git push
```

## 📚 Summary

| Command | Description |
|---------|-------------|
| `npm run deploy:commit <hash>` | Deploy specific commit |
| `npm run deploy:commit <hash> "name"` | Deploy with custom name |
| `npm run list:deployments` | List all deployed commits |
| `npm run deploy` | Deploy current/latest version |
| `git log --oneline -20` | See recent commits |

**Main Site**: https://sonymounika63.github.io/Dashco/  
**Commits**: https://sonymounika63.github.io/Dashco/commits/{name}/

