#!/usr/bin/env npx tsx

/**
 * Daily Commit Gatherer - Multi-Repo Edition
 *
 * Collects and analyzes git commits from ALL your projects.
 * Uses repos.config.json for configuration.
 *
 * Usage:
 *   npx tsx scripts/daily-summary/gather-commits.ts
 *   npx tsx scripts/daily-summary/gather-commits.ts --date yesterday
 *   npx tsx scripts/daily-summary/gather-commits.ts --discover  # Find new repos
 */

import { execSync } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

interface RepoConfig {
  path: string;
  name: string;
  category: string;
  enabled: boolean;
}

interface Config {
  repos: RepoConfig[];
  settings: {
    autoDiscover: boolean;
    discoverPaths: string[];
    excludePatterns: string[];
  };
}

interface CommitData {
  hash: string;
  message: string;
  author: string;
  date: string;
  filesChanged: number;
  additions: number;
  deletions: number;
  files: string[];
}

interface RepoSummary {
  repoName: string;
  repoPath: string;
  category: string;
  commits: CommitData[];
  totalFiles: number;
  totalAdditions: number;
  totalDeletions: number;
  categories: string[];
  technologies: string[];
}

interface DailySummary {
  date: string;
  repos: RepoSummary[];
  totalCommits: number;
  totalFilesChanged: number;
  totalAdditions: number;
  totalDeletions: number;
  estimatedHours: number;
  highlights: string[];
  categories: string[];
  technologies: string[];
  projects: string[];
  projectCategories: Record<string, string[]>;
}

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const CONFIG_PATH = path.join(SCRIPT_DIR, 'repos.config.json');

// Parse command line arguments
const args = process.argv.slice(2);
const dateArg = args.find(a => a.startsWith('--date='))?.split('=')[1] || 'today';
const discoverMode = args.includes('--discover');
const verboseMode = args.includes('--verbose') || args.includes('-v');

function loadConfig(): Config {
  if (fs.existsSync(CONFIG_PATH)) {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  }

  // Default config
  return {
    repos: [],
    settings: {
      autoDiscover: true,
      discoverPaths: ['/Users/austin/Desktop'],
      excludePatterns: ['node_modules', '.Trash', 'backup']
    }
  };
}

function saveConfig(config: Config): void {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function discoverRepos(searchPaths: string[], excludePatterns: string[]): string[] {
  const repos: string[] = [];

  for (const searchPath of searchPaths) {
    try {
      const output = execSync(
        `find "${searchPath}" -maxdepth 3 -type d -name ".git" 2>/dev/null`,
        { encoding: 'utf-8', timeout: 30000 }
      );

      const found = output
        .split('\n')
        .filter(Boolean)
        .map(p => p.replace(/\/.git$/, ''))
        .filter(p => !excludePatterns.some(pattern => p.includes(pattern)));

      repos.push(...found);
    } catch {
      // Ignore errors from find
    }
  }

  return [...new Set(repos)]; // Dedupe
}

function getDateRange(dateStr: string): { since: string; until: string } {
  const today = new Date();

  if (dateStr === 'today') {
    const midnight = new Date(today);
    midnight.setHours(0, 0, 0, 0);
    return {
      since: midnight.toISOString(),
      until: today.toISOString()
    };
  }

  if (dateStr === 'yesterday') {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setHours(23, 59, 59, 999);
    return {
      since: yesterday.toISOString(),
      until: yesterdayEnd.toISOString()
    };
  }

  if (dateStr === 'week') {
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);
    return {
      since: weekAgo.toISOString(),
      until: today.toISOString()
    };
  }

  // Assume YYYY-MM-DD format
  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);
  const dateEnd = new Date(date);
  dateEnd.setHours(23, 59, 59, 999);
  return {
    since: date.toISOString(),
    until: dateEnd.toISOString()
  };
}

function isGitRepo(dir: string): boolean {
  try {
    execSync('git rev-parse --git-dir', { cwd: dir, stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function getGitUser(repoPath: string): string {
  try {
    return execSync('git config user.name', { cwd: repoPath, encoding: 'utf-8' }).trim();
  } catch {
    return '';
  }
}

function getCommits(repoPath: string, since: string, until: string): CommitData[] {
  try {
    const gitUser = getGitUser(repoPath);
    if (!gitUser) return [];

    // Get commits with stats
    const logOutput = execSync(
      `git log --since="${since}" --until="${until}" --author="${gitUser}" --format="%H|%s|%an|%ai" --numstat 2>/dev/null`,
      { cwd: repoPath, encoding: 'utf-8', timeout: 10000 }
    );

    if (!logOutput.trim()) {
      return [];
    }

    const commits: CommitData[] = [];
    const lines = logOutput.split('\n');
    let currentCommit: CommitData | null = null;

    for (const line of lines) {
      if (line.includes('|') && line.split('|').length >= 4) {
        // New commit header
        if (currentCommit) {
          commits.push(currentCommit);
        }
        const [hash, message, author, date] = line.split('|');
        currentCommit = {
          hash,
          message,
          author,
          date,
          filesChanged: 0,
          additions: 0,
          deletions: 0,
          files: []
        };
      } else if (currentCommit && line.trim()) {
        // File stat line: additions \t deletions \t filename
        const parts = line.split('\t');
        if (parts.length >= 3) {
          const additions = parts[0] === '-' ? 0 : parseInt(parts[0]) || 0;
          const deletions = parts[1] === '-' ? 0 : parseInt(parts[1]) || 0;
          const filename = parts[2];

          currentCommit.filesChanged++;
          currentCommit.additions += additions;
          currentCommit.deletions += deletions;
          currentCommit.files.push(filename);
        }
      }
    }

    if (currentCommit) {
      commits.push(currentCommit);
    }

    return commits;
  } catch (error) {
    if (verboseMode) {
      console.error(`  ⚠️  Error getting commits from ${repoPath}:`, error);
    }
    return [];
  }
}

function categorizeCommit(message: string): string[] {
  const categories: string[] = [];
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('feat') || lowerMessage.includes('add')) {
    categories.push('feature');
  }
  if (lowerMessage.includes('fix') || lowerMessage.includes('bug')) {
    categories.push('bugfix');
  }
  if (lowerMessage.includes('refactor') || lowerMessage.includes('clean')) {
    categories.push('refactor');
  }
  if (lowerMessage.includes('doc') || lowerMessage.includes('readme')) {
    categories.push('documentation');
  }
  if (lowerMessage.includes('test')) {
    categories.push('testing');
  }
  if (lowerMessage.includes('style') || lowerMessage.includes('css') || lowerMessage.includes('ui')) {
    categories.push('styling');
  }
  if (lowerMessage.includes('perf') || lowerMessage.includes('optim')) {
    categories.push('performance');
  }
  if (lowerMessage.includes('security') || lowerMessage.includes('auth')) {
    categories.push('security');
  }
  if (lowerMessage.includes('deploy') || lowerMessage.includes('ci') || lowerMessage.includes('build')) {
    categories.push('devops');
  }

  return categories.length > 0 ? categories : ['general'];
}

function detectTechnologies(files: string[]): string[] {
  const techSet = new Set<string>();

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file).toLowerCase();

    switch (ext) {
      case '.ts':
      case '.tsx':
        techSet.add('TypeScript');
        if (ext === '.tsx') techSet.add('React');
        break;
      case '.js':
      case '.jsx':
        techSet.add('JavaScript');
        if (ext === '.jsx') techSet.add('React');
        break;
      case '.py':
        techSet.add('Python');
        break;
      case '.go':
        techSet.add('Go');
        break;
      case '.rs':
        techSet.add('Rust');
        break;
      case '.sql':
        techSet.add('SQL');
        break;
      case '.css':
      case '.scss':
        techSet.add('CSS');
        break;
      case '.md':
        techSet.add('Markdown');
        break;
      case '.json':
        techSet.add('JSON');
        break;
      case '.yml':
      case '.yaml':
        techSet.add('YAML');
        break;
      case '.gd':
        techSet.add('GDScript');
        techSet.add('Godot');
        break;
      case '.swift':
        techSet.add('Swift');
        break;
      case '.vue':
        techSet.add('Vue');
        break;
      case '.svelte':
        techSet.add('Svelte');
        break;
    }

    // Detect frameworks from paths/filenames
    if (file.includes('next') || file.includes('app/')) {
      techSet.add('Next.js');
    }
    if (file.includes('supabase')) {
      techSet.add('Supabase');
    }
    if (file.includes('tailwind') || basename === 'tailwind.config.js' || basename === 'tailwind.config.ts') {
      techSet.add('Tailwind');
    }
    if (file.includes('prisma')) {
      techSet.add('Prisma');
    }
    if (file.includes('docker') || basename === 'dockerfile') {
      techSet.add('Docker');
    }
  }

  return Array.from(techSet);
}

function estimateHours(commits: CommitData[]): number {
  let totalMinutes = 0;

  for (const commit of commits) {
    let baseMinutes = 20;
    baseMinutes += Math.min(commit.filesChanged * 5, 30);
    const totalLines = commit.additions + commit.deletions;
    if (totalLines > 100) baseMinutes += 20;
    else if (totalLines > 50) baseMinutes += 10;
    totalMinutes += baseMinutes;
  }

  return Math.round((totalMinutes / 60) * 10) / 10;
}

function generateHighlights(repos: RepoSummary[]): string[] {
  const highlights: string[] = [];

  for (const repo of repos) {
    for (const commit of repo.commits) {
      // Feature commits
      if (commit.message.toLowerCase().includes('feat') ||
          commit.message.toLowerCase().includes('add') ||
          commit.message.toLowerCase().includes('implement') ||
          commit.message.toLowerCase().includes('ship') ||
          commit.message.toLowerCase().includes('launch')) {
        highlights.push(`[${repo.repoName}] ${commit.message}`);
      }

      // Large changes
      if (commit.additions > 200 || commit.filesChanged > 10) {
        const msg = `[${repo.repoName}] ${commit.message}`;
        if (!highlights.includes(msg)) {
          highlights.push(msg);
        }
      }
    }
  }

  // Also include any commits from repos with just 1-2 commits (likely focused work)
  for (const repo of repos) {
    if (repo.commits.length <= 2 && repo.commits.length > 0) {
      const msg = `[${repo.repoName}] ${repo.commits[0].message}`;
      if (!highlights.includes(msg)) {
        highlights.push(msg);
      }
    }
  }

  return highlights.slice(0, 8);
}

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 MULTI-REPO DAILY SUMMARY');
  console.log('='.repeat(60));

  let config = loadConfig();

  // Discover mode - find new repos
  if (discoverMode || config.settings.autoDiscover) {
    console.log('\n🔍 Discovering repositories...');
    const discovered = discoverRepos(
      config.settings.discoverPaths,
      config.settings.excludePatterns
    );

    const existingPaths = new Set(config.repos.map(r => r.path));
    const newRepos = discovered.filter(p => !existingPaths.has(p));

    if (newRepos.length > 0) {
      console.log(`   Found ${newRepos.length} new repo(s):`);
      for (const repoPath of newRepos) {
        const name = path.basename(repoPath).replace(/[^a-zA-Z0-9]/g, '');
        console.log(`   + ${name}`);
        config.repos.push({
          path: repoPath,
          name,
          category: 'uncategorized',
          enabled: true
        });
      }
      saveConfig(config);
    }
  }

  const { since, until } = getDateRange(dateArg);
  const enabledRepos = config.repos.filter(r => r.enabled);

  console.log(`\n📅 Date: ${dateArg}`);
  console.log(`   Since: ${since}`);
  console.log(`   Until: ${until}`);
  console.log(`   Scanning: ${enabledRepos.length} repositories\n`);

  const repoSummaries: RepoSummary[] = [];
  let scannedCount = 0;

  for (const repoConfig of enabledRepos) {
    scannedCount++;
    process.stdout.write(`\r   Scanning [${scannedCount}/${enabledRepos.length}]: ${repoConfig.name.padEnd(25)}`);

    if (!isGitRepo(repoConfig.path)) {
      if (verboseMode) console.log(`\n   ⚠️  ${repoConfig.name} is not a git repo`);
      continue;
    }

    const commits = getCommits(repoConfig.path, since, until);

    if (commits.length === 0) {
      continue;
    }

    const allFiles = commits.flatMap(c => c.files);
    const allCategories = [...new Set(commits.flatMap(c => categorizeCommit(c.message)))];
    const technologies = detectTechnologies(allFiles);

    const summary: RepoSummary = {
      repoName: repoConfig.name,
      repoPath: repoConfig.path,
      category: repoConfig.category,
      commits,
      totalFiles: new Set(allFiles).size,
      totalAdditions: commits.reduce((sum, c) => sum + c.additions, 0),
      totalDeletions: commits.reduce((sum, c) => sum + c.deletions, 0),
      categories: allCategories,
      technologies
    };

    repoSummaries.push(summary);
  }

  console.log('\n');

  if (repoSummaries.length === 0) {
    console.log('❌ No commits found across any repositories for the specified date range.');
    process.exit(0);
  }

  // Sort by commit count
  repoSummaries.sort((a, b) => b.commits.length - a.commits.length);

  // Show per-repo summary
  console.log('📁 Repositories with commits:\n');
  for (const repo of repoSummaries) {
    const bar = '█'.repeat(Math.min(repo.commits.length * 2, 20));
    console.log(`   ${repo.repoName.padEnd(25)} ${String(repo.commits.length).padStart(3)} commits ${bar}`);
  }

  // Aggregate all data
  const allCommits = repoSummaries.flatMap(r => r.commits);

  // Group projects by category
  const projectCategories: Record<string, string[]> = {};
  for (const repo of repoSummaries) {
    if (!projectCategories[repo.category]) {
      projectCategories[repo.category] = [];
    }
    projectCategories[repo.category].push(repo.repoName);
  }

  const dailySummary: DailySummary = {
    date: new Date(since).toISOString().split('T')[0],
    repos: repoSummaries,
    totalCommits: allCommits.length,
    totalFilesChanged: repoSummaries.reduce((sum, r) => sum + r.totalFiles, 0),
    totalAdditions: repoSummaries.reduce((sum, r) => sum + r.totalAdditions, 0),
    totalDeletions: repoSummaries.reduce((sum, r) => sum + r.totalDeletions, 0),
    estimatedHours: estimateHours(allCommits),
    highlights: generateHighlights(repoSummaries),
    categories: [...new Set(repoSummaries.flatMap(r => r.categories))],
    technologies: [...new Set(repoSummaries.flatMap(r => r.technologies))],
    projects: repoSummaries.map(r => r.repoName),
    projectCategories
  };

  // Output summary
  console.log('\n' + '='.repeat(60));
  console.log('📈 AGGREGATE SUMMARY');
  console.log('='.repeat(60));
  console.log(`Date: ${dailySummary.date}`);
  console.log(`Projects: ${dailySummary.projects.length}`);
  console.log(`Commits: ${dailySummary.totalCommits}`);
  console.log(`Files Changed: ${dailySummary.totalFilesChanged}`);
  console.log(`Lines: +${dailySummary.totalAdditions} / -${dailySummary.totalDeletions}`);
  console.log(`Estimated Hours: ${dailySummary.estimatedHours}`);
  console.log(`Categories: ${dailySummary.categories.join(', ')}`);
  console.log(`Technologies: ${dailySummary.technologies.join(', ')}`);

  console.log('\n📂 By Category:');
  for (const [category, projects] of Object.entries(projectCategories)) {
    console.log(`   ${category}: ${projects.join(', ')}`);
  }

  console.log('\n📌 Highlights:');
  dailySummary.highlights.forEach(h => console.log(`   • ${h}`));

  // Output JSON for piping to other scripts
  const outputPath = path.join(SCRIPT_DIR, 'output.json');
  fs.writeFileSync(outputPath, JSON.stringify(dailySummary, null, 2));
  console.log(`\n💾 Full data saved to: ${outputPath}`);

  return dailySummary;
}

main().catch(console.error);
