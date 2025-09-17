#!/usr/bin/env node

/**
 * Script to create a new portfolio showcase with standardized template
 * Usage: node scripts/create-showcase.js "My New Project"
 */

const fs = require('fs');
const path = require('path');

const projectTitle = process.argv[2];

if (!projectTitle) {
  console.error('Please provide a project title: node scripts/create-showcase.js "My New Project"');
  process.exit(1);
}

// Generate slug from title
const slug = projectTitle
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const today = new Date().toISOString().split('T')[0];

// Standard project template
const projectTemplate = `---
title: "${projectTitle}"
summary: "Brief description of what this project does and its impact"
publishedAt: "${today}"
status: "wip" # or "live"
tags:
  - "AI-built" # Choose from: AI-built, Tooling, Infra, Experiment
  - "Web App" # Add relevant tech tags
aiRole: "Describe how AI was used in this project"
metrics:
  users: "0" # Number or "N/A"
  stars: 0 # GitHub stars if applicable
  revenue: "N/A" # Revenue if applicable
links:
  demo: "https://example.com" # Live demo URL
  github: "https://github.com/username/repo" # GitHub repo
featured: false # Set to true for homepage featured section
---

# ${projectTitle}

## Overview

Describe what the project does, why it was built, and what problem it solves.

## AI Integration

Explain how AI was used in this project:
- What AI tools/models were used
- How much of the code was AI-generated
- What was the human vs AI contribution split

## Technical Details

### Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** [Your backend tech]
- **Database:** [Your database]
- **AI Tools:** Claude, ChatGPT, etc.

### Architecture
Describe the system architecture and key technical decisions.

## Development Process

### Timeline
- **Planning:** X days
- **Development:** X days  
- **Testing & Polish:** X days
- **Total:** X days

### AI Workflow
1. **Planning:** Used AI for initial architecture design
2. **Development:** AI pair programming for rapid development
3. **Testing:** AI-generated test cases and debugging

## Key Features

- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Challenges & Solutions

### Challenge 1
Describe a technical challenge and how you solved it with/without AI.

### Challenge 2
Another challenge and solution.

## Results & Impact

- **Metrics:** Users, performance, etc.
- **Learning:** What you learned from this project
- **Future:** Plans for improvement or expansion

## Screenshots

<!-- Add screenshots here -->
![Screenshot 1](/images/projects/${slug}/screenshot-1.png)

## Code Snippets

\`\`\`typescript
// Example of key code with AI assistance
function keyFeature() {
  // Implementation details
}
\`\`\`

## Conclusion

Summary of the project, its success, and what's next.

---

*Built with AI assistance using Claude, completed in X days.*
`;

// Create directories
const projectsDir = path.join(process.cwd(), 'src', 'content', 'projects');
const imagesDir = path.join(process.cwd(), 'public', 'images', 'projects', slug);

if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Write the project file
const projectFile = path.join(projectsDir, `${slug}.mdx`);

if (fs.existsSync(projectFile)) {
  console.error(`Project already exists: ${projectFile}`);
  process.exit(1);
}

fs.writeFileSync(projectFile, projectTemplate);

// Create a README for the images directory
const imageReadme = `# Images for ${projectTitle}

Add project screenshots and assets here:
- screenshot-1.png - Main application screenshot
- screenshot-2.png - Additional features
- architecture.png - System architecture diagram
- demo.gif - Short demo animation

Recommended image sizes:
- Screenshots: 1200x800px
- Architecture diagrams: 1000x600px
- Demo GIFs: 800x600px, <2MB
`;

fs.writeFileSync(path.join(imagesDir, 'README.md'), imageReadme);

console.log(`✅ Created new showcase: ${projectTitle}`);
console.log(`📁 Project file: ${projectFile}`);
console.log(`🖼️  Images directory: ${imagesDir}`);
console.log(`\n📝 Next steps:`);
console.log(`1. Edit ${projectFile} with your project details`);
console.log(`2. Add screenshots to ${imagesDir}/`);
console.log(`3. Set featured: true in frontmatter to show on homepage`);
console.log(`4. Push to git and the project will appear automatically`);