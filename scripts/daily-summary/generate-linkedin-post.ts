#!/usr/bin/env npx tsx

/**
 * LinkedIn Post Generator
 *
 * Generates an engaging LinkedIn post from your daily commit summary.
 * Reads from output.json and creates a polished post ready for review.
 *
 * Usage:
 *   npx tsx scripts/daily-summary/generate-linkedin-post.ts
 *   npx tsx scripts/daily-summary/generate-linkedin-post.ts --style=learning
 *   npx tsx scripts/daily-summary/generate-linkedin-post.ts --style=milestone
 */

import * as fs from 'fs';
import * as path from 'path';

interface DailySummary {
  date: string;
  totalCommits: number;
  totalFilesChanged: number;
  totalAdditions: number;
  totalDeletions: number;
  estimatedHours: number;
  highlights: string[];
  categories: string[];
  technologies: string[];
  projects: string[];
  repos: Array<{
    repoName: string;
    commits: Array<{
      message: string;
    }>;
  }>;
}

type PostStyle = 'progress' | 'learning' | 'milestone' | 'technical' | 'auto';

const args = process.argv.slice(2);
const styleArg = args.find(a => a.startsWith('--style='))?.split('=')[1] as PostStyle || 'auto';

function selectEmoji(categories: string[]): string {
  if (categories.includes('feature')) return '🚀';
  if (categories.includes('bugfix')) return '🔧';
  if (categories.includes('performance')) return '⚡';
  if (categories.includes('security')) return '🔒';
  if (categories.includes('refactor')) return '🧹';
  if (categories.includes('documentation')) return '📚';
  if (categories.includes('testing')) return '✅';
  return '💻';
}

function generateHashtags(summary: DailySummary): string[] {
  const hashtags = new Set<string>();

  // Always include build in public
  hashtags.add('#BuildInPublic');

  // Technology-specific
  if (summary.technologies.includes('TypeScript')) hashtags.add('#TypeScript');
  if (summary.technologies.includes('React')) hashtags.add('#ReactJS');
  if (summary.technologies.includes('Next.js')) hashtags.add('#NextJS');
  if (summary.technologies.includes('Python')) hashtags.add('#Python');
  if (summary.technologies.includes('Supabase')) hashtags.add('#Supabase');

  // Category-specific
  if (summary.categories.includes('feature')) hashtags.add('#SoftwareDevelopment');
  if (summary.categories.includes('security')) hashtags.add('#CyberSecurity');
  if (summary.categories.includes('performance')) hashtags.add('#WebPerformance');

  // General dev hashtags
  hashtags.add('#Developer');

  // Limit to 5 hashtags
  return Array.from(hashtags).slice(0, 5);
}

function autoSelectStyle(summary: DailySummary): PostStyle {
  // Large feature launch
  if (summary.highlights.some(h =>
    h.toLowerCase().includes('launch') ||
    h.toLowerCase().includes('ship') ||
    h.toLowerCase().includes('release')
  )) {
    return 'milestone';
  }

  // Learning-focused (docs, tests, refactors)
  if (summary.categories.includes('documentation') ||
      summary.categories.includes('testing') ||
      summary.categories.filter(c => c === 'refactor').length > 1) {
    return 'learning';
  }

  // Technical deep dive (large changes, performance work)
  if (summary.totalAdditions > 500 ||
      summary.categories.includes('performance') ||
      summary.categories.includes('security')) {
    return 'technical';
  }

  // Default to progress update
  return 'progress';
}

function generateProgressPost(summary: DailySummary): string {
  const emoji = selectEmoji(summary.categories);
  const hashtags = generateHashtags(summary);

  // Get the most interesting commits
  const topHighlights = summary.highlights.slice(0, 4);

  // Multi-project intro
  let post = '';
  if (summary.projects.length > 1) {
    post = `${emoji} Productive day across ${summary.projects.length} projects\n\n`;
  } else {
    post = `${emoji} Another productive day building ${summary.projects[0]}\n\n`;
  }

  post += `Today's progress:\n`;
  topHighlights.forEach(h => {
    // Clean up commit message for LinkedIn (preserve [ProjectName] prefix)
    const cleanMessage = h
      .replace(/^(\[[^\]]+\]\s*)?(feat|fix|refactor|docs|test|chore)(\(.+?\))?:\s*/i, '$1')
      .replace(/^\w/, c => c.toUpperCase());
    post += `• ${cleanMessage}\n`;
  });

  post += `\n`;

  // Multi-project stats
  if (summary.projects.length > 1) {
    post += `📊 ${summary.totalCommits} commits across ${summary.projects.length} repos | ${summary.totalFilesChanged} files\n\n`;
  } else {
    post += `📊 ${summary.totalCommits} commits | ${summary.totalFilesChanged} files | +${summary.totalAdditions}/-${summary.totalDeletions} lines\n\n`;
  }

  // Add a reflection or next step
  if (summary.projects.length > 1) {
    post += `Context switching between projects, but making progress on all fronts!\n\n`;
  } else if (summary.categories.includes('feature')) {
    post += `Excited to see this take shape. More features coming soon!\n\n`;
  } else if (summary.categories.includes('bugfix')) {
    post += `Squashing bugs and making the product more stable, one commit at a time.\n\n`;
  } else {
    post += `Building in public - follow along for more updates!\n\n`;
  }

  post += hashtags.join(' ');

  return post;
}

function generateLearningPost(summary: DailySummary): string {
  const hashtags = generateHashtags(summary);
  const mainTech = summary.technologies[0] || 'software development';

  let post = `💡 TIL while working on ${summary.projects[0]}:\n\n`;

  // Pick a technical insight
  const technicalCommit = summary.highlights.find(h =>
    h.toLowerCase().includes('refactor') ||
    h.toLowerCase().includes('improve') ||
    h.toLowerCase().includes('optimize')
  ) || summary.highlights[0];

  if (technicalCommit) {
    const lesson = technicalCommit
      .replace(/^(feat|fix|refactor|docs|test|chore)(\(.+?\))?:\s*/i, '')
      .replace(/^\w/, c => c.toUpperCase());

    post += `${lesson}\n\n`;
  }

  post += `Key takeaway: Sometimes the best code is the code you don't write. `;
  post += `Today I removed ${summary.totalDeletions} lines while adding ${summary.totalAdditions}. `;

  if (summary.totalDeletions > summary.totalAdditions) {
    post += `Net reduction! 🎯\n\n`;
  } else {
    post += `Sometimes you need to add before you can simplify.\n\n`;
  }

  post += `What's something you learned recently while coding?\n\n`;
  post += hashtags.join(' ');

  return post;
}

function generateMilestonePost(summary: DailySummary): string {
  const hashtags = generateHashtags(summary);
  const mainProject = summary.projects[0];

  let post = `🎉 Milestone reached on ${mainProject}!\n\n`;

  // Find the milestone commit
  const milestoneHighlight = summary.highlights.find(h =>
    h.toLowerCase().includes('launch') ||
    h.toLowerCase().includes('ship') ||
    h.toLowerCase().includes('release') ||
    h.toLowerCase().includes('complete')
  ) || summary.highlights[0];

  if (milestoneHighlight) {
    const achievement = milestoneHighlight
      .replace(/^(feat|fix|refactor|docs|test|chore)(\(.+?\))?:\s*/i, '')
      .replace(/^\w/, c => c.toUpperCase());

    post += `✅ ${achievement}\n\n`;
  }

  post += `This represents:\n`;
  post += `• ${summary.totalCommits} commits of focused work\n`;
  post += `• ${summary.totalFilesChanged} files touched\n`;
  post += `• ~${summary.estimatedHours} hours of development\n\n`;

  post += `Building ${mainProject} has been an incredible journey. `;
  post += `Grateful for the process and excited for what's next.\n\n`;

  post += `What milestone are you working toward?\n\n`;
  post += hashtags.join(' ');

  return post;
}

function generateTechnicalPost(summary: DailySummary): string {
  const emoji = selectEmoji(summary.categories);
  const hashtags = generateHashtags(summary);
  const mainTech = summary.technologies.slice(0, 2).join(' + ') || 'code';

  let post = `${emoji} Deep dive: ${summary.categories[0]} work in ${mainTech}\n\n`;

  // Technical details
  post += `Today's technical focus:\n\n`;

  summary.highlights.slice(0, 2).forEach(h => {
    const cleanMessage = h
      .replace(/^(feat|fix|refactor|docs|test|chore)(\(.+?\))?:\s*/i, '')
      .replace(/^\w/, c => c.toUpperCase());
    post += `→ ${cleanMessage}\n`;
  });

  post += `\n`;

  // Add technical context
  if (summary.categories.includes('performance')) {
    post += `Performance matters. Every millisecond counts for user experience.\n\n`;
  } else if (summary.categories.includes('security')) {
    post += `Security isn't a feature - it's a foundation. Always prioritize it.\n\n`;
  } else if (summary.categories.includes('refactor')) {
    post += `Good code isn't just about working - it's about being maintainable.\n\n`;
  } else {
    post += `The details matter. Quality comes from attention to craft.\n\n`;
  }

  post += `Tech stack: ${summary.technologies.join(', ')}\n\n`;
  post += hashtags.join(' ');

  return post;
}

function generatePost(summary: DailySummary, style: PostStyle): string {
  const actualStyle = style === 'auto' ? autoSelectStyle(summary) : style;

  console.log(`📝 Using style: ${actualStyle}`);

  switch (actualStyle) {
    case 'learning':
      return generateLearningPost(summary);
    case 'milestone':
      return generateMilestonePost(summary);
    case 'technical':
      return generateTechnicalPost(summary);
    case 'progress':
    default:
      return generateProgressPost(summary);
  }
}

function main() {
  const outputPath = path.join(process.cwd(), 'scripts/daily-summary/output.json');

  if (!fs.existsSync(outputPath)) {
    console.error('❌ No output.json found. Run gather-commits.ts first.');
    process.exit(1);
  }

  const summary: DailySummary = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));

  console.log(`\n🔗 Generating LinkedIn post for ${summary.date}...\n`);

  const post = generatePost(summary, styleArg);

  // Check character count
  const charCount = post.length;
  const isWithinLimit = charCount <= 1300;

  console.log('='.repeat(60));
  console.log('📱 LINKEDIN POST DRAFT');
  console.log('='.repeat(60));
  console.log();
  console.log(post);
  console.log();
  console.log('='.repeat(60));
  console.log(`📊 Character count: ${charCount}/1300 ${isWithinLimit ? '✅' : '⚠️ (consider shortening)'}`);
  console.log('='.repeat(60));

  // Save to file
  const postPath = path.join(process.cwd(), 'scripts/daily-summary/linkedin-draft.txt');
  fs.writeFileSync(postPath, post);
  console.log(`\n💾 Draft saved to: ${postPath}`);

  // Also update the output.json with the post
  summary['linkedInDraft' as keyof DailySummary] = post as never;
  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

  return post;
}

main();
