# 🚀 Deploy Avartan to GitHub Pages

## Quick Steps:

### 1. Create GitHub Repository
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit: Avartan Recycling Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/avartan-recycling.git
git push -u origin main
```

### 2. Enable GitHub Pages
- Go to your GitHub repository
- Click "Settings" tab
- Scroll to "GitHub Pages" section
- Select "Deploy from a branch"
- Choose "main" branch and "/ (root)" folder
- Click "Save"

### 3. Your Site is Live!
- URL: `https://YOUR_USERNAME.github.io/avartan-recycling`
- Updates automatically when you push to main branch

## File Structure for GitHub:
```
avartan-recycling/
├── index.html (Login page)
├── dashboard.html
├── recycling-guide.html
├── schedule.html
├── rewards.html
├── profile.html
├── *.css files
├── *.js files
├── Logo-removebg-preview.png
└── README.md
```

## Notes:
- All file paths are relative (no absolute paths)
- Logo file must be in root directory
- GitHub Pages serves static files automatically
- No server setup required
