# Portfolio Showcase Management

This document explains how to easily add, manage, and maintain portfolio showcases on your website.

## Quick Start

### Adding a New Showcase

```bash
# Create a new showcase project
npm run showcase:new "My Amazing AI Project"

# This creates:
# - src/content/projects/my-amazing-ai-project.mdx
# - public/images/projects/my-amazing-ai-project/README.md
```

### Managing Showcases

```bash
# Validate all showcases
npm run showcase:validate

# View portfolio statistics
npm run showcase:stats
```

## Showcase Structure

### Required Frontmatter Fields

```yaml
---
title: "Project Name"                    # Display name
summary: "Brief project description"     # 1-2 sentences
publishedAt: "2024-01-15"               # ISO date
status: "live"                          # "live" or "wip"
tags: ["AI-built", "Web App"]          # At least one category + tech tags
aiRole: "How AI was used"               # Describe AI contribution
---
```

### Optional Fields

```yaml
featured: true                          # Show on homepage (default: false)
metrics:
  users: "2.5k"                        # User count
  stars: 127                           # GitHub stars (number)
  revenue: "$5,000 MRR"                # Revenue info
links:
  demo: "https://example.com"          # Live demo
  github: "https://github.com/user/repo" # Source code
accent: "emerald"                      # Color theme (emerald|navy|pink)
```

## Categories

Choose at least one category for proper filtering:

- **AI-built**: Projects built primarily with AI assistance
- **Tooling**: Developer tools and utilities  
- **Infra**: Infrastructure and deployment projects
- **Experiment**: Prototypes and experimental projects

## Content Structure

### Recommended Sections

```markdown
# Project Title

## Overview
What the project does and why it was built.

## AI Integration
- Which AI tools were used
- Percentage of AI-generated code
- Human vs AI contribution breakdown

## Technical Details
### Tech Stack
- Frontend: Next.js, TypeScript, Tailwind
- Backend: [Your stack]
- AI Tools: Claude, ChatGPT, etc.

### Architecture
High-level system design.

## Development Process
### Timeline
- Planning: X days
- Development: X days
- Total: X days

### AI Workflow
How you used AI throughout the process.

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Challenges & Solutions
Technical problems and how you solved them.

## Results & Impact
Metrics, learnings, and future plans.

## Screenshots
![Screenshot](/images/projects/project-slug/screenshot-1.png)

## Conclusion
Project summary and next steps.
```

## File Organization

```
src/content/projects/
├── project-one.mdx
├── project-two.mdx
└── project-three.mdx

public/images/projects/
├── project-one/
│   ├── screenshot-1.png
│   ├── screenshot-2.png
│   └── demo.gif
└── project-two/
    └── hero-image.png
```

## Image Guidelines

### Screenshots
- **Size**: 1200x800px recommended
- **Format**: PNG for UI screenshots, JPG for photos
- **Quality**: High quality but optimized for web

### Demo GIFs
- **Size**: 800x600px max
- **Duration**: 5-10 seconds
- **File size**: Under 2MB

### Architecture Diagrams
- **Size**: 1000x600px
- **Format**: PNG or SVG
- **Style**: Clean, readable diagrams

## Showcase Features

### Automatic Sorting
Projects are automatically sorted by:
1. Status (live projects first)
2. Date (newest first)
3. Featured status

### Search & Filtering
- Full-text search across title, summary, AI role, and tags
- Category filtering (AI-built, Tooling, etc.)
- Grid/list view toggle

### Featured Projects
Set `featured: true` to show projects on the homepage.

### Metrics Display
Add user counts, GitHub stars, and revenue to showcase impact.

## Validation Rules

The validation script checks for:
- ✅ Required fields (title, summary, aiRole, status, tags)
- ✅ Valid status ("live" or "wip")
- ✅ At least one category tag
- ✅ Valid date format
- ✅ Valid URLs in links
- ✅ Proper metrics format

## Development Workflow

### 1. Create Project
```bash
npm run showcase:new "New Project Name"
```

### 2. Edit Content
- Fill in the generated `.mdx` file
- Add screenshots to the images directory
- Set `featured: true` if you want it on homepage

### 3. Validate
```bash
npm run showcase:validate
```

### 4. Deploy
- Commit changes
- Projects appear automatically on the site

## Utilities & Helpers

### Showcase Library (`src/lib/showcase.ts`)

```typescript
import { 
  filterByCategory, 
  searchProjects, 
  getFeaturedProjects,
  getSortedProjects,
  getProjectStats,
  validateProject,
  generateSlug,
  formatMetrics 
} from '@/lib/showcase';

// Filter projects by category
const aiProjects = filterByCategory(projects, 'AI-built');

// Get featured projects for homepage
const featured = getFeaturedProjects(projects);

// Get project statistics
const stats = getProjectStats(projects);
```

### Project Grid Component

```tsx
import { ProjectGrid } from '@/features/project-grid';

<ProjectGrid
  projects={projects}
  title="My Projects"
  subtitle="Built with AI"
  showFilters={true}
  maxItems={6}
/>
```

## Tips for Great Showcases

### Content
- **Be specific** about AI usage and contribution
- **Include metrics** to show real impact
- **Tell a story** - problem, solution, results
- **Add screenshots** to make it visual

### Technical
- **Follow the template** for consistency
- **Use proper categories** for filtering
- **Add meaningful tags** for searchability
- **Keep images optimized** for fast loading

### SEO & Discovery
- **Write clear titles** and summaries
- **Use descriptive tags** 
- **Include relevant keywords** naturally
- **Add external links** to live demos

## Troubleshooting

### Common Issues

**Validation Errors**
```bash
npm run showcase:validate
# Fix the errors shown in output
```

**Images Not Loading**
- Check file paths match `/images/projects/project-slug/filename`
- Ensure images are in `public/images/projects/`
- Verify file extensions are correct

**Project Not Showing**
- Check frontmatter syntax (YAML format)
- Ensure file is in `src/content/projects/`
- Verify `.mdx` extension
- Run validation script

**Featured Projects Not Appearing**
- Set `featured: true` in frontmatter
- Check if project meets other criteria (status, etc.)

## Advanced Customization

### Custom Categories
To add new categories, update:
1. `src/lib/showcase.ts` - `ShowcaseCategory` type
2. `src/features/project-grid.tsx` - `filterCategories` array
3. Validation scripts

### Custom Metrics
Add new metric types by updating:
1. `src/lib/mdx.ts` - `ProjectFrontMatter` interface
2. `src/lib/showcase.ts` - `formatMetrics` function
3. `src/components/project-card.tsx` - Display logic

### Styling
Customize project card appearance in:
- `src/components/project-card.tsx`
- `src/features/project-grid.tsx`
- Update CSS classes and layout as needed

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run showcase:new "Title"` | Create new project |
| `npm run showcase:validate` | Validate all projects |
| `npm run showcase:stats` | View portfolio stats |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |

**File Locations:**
- Projects: `src/content/projects/`
- Images: `public/images/projects/`
- Types: `src/lib/mdx.ts`
- Utils: `src/lib/showcase.ts`