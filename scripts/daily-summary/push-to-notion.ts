#!/usr/bin/env npx tsx

/**
 * Push Daily Summary to Notion
 *
 * Reads the daily summary from output.json and creates a page in your Notion database.
 *
 * Prerequisites:
 * 1. Create a Notion integration at https://www.notion.so/my-integrations
 * 2. Share your database with the integration
 * 3. Set environment variables:
 *    - NOTION_API_KEY: Your integration secret
 *    - NOTION_DATABASE_ID: The database ID from the URL
 *
 * Usage:
 *   npx tsx scripts/daily-summary/push-to-notion.ts
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
  linkedInDraft?: string;
  repos: Array<{
    repoName: string;
    commits: Array<{
      message: string;
      hash: string;
    }>;
  }>;
}

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function createNotionPage(summary: DailySummary): Promise<void> {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error('❌ Missing environment variables:');
    if (!NOTION_API_KEY) console.error('   - NOTION_API_KEY');
    if (!NOTION_DATABASE_ID) console.error('   - NOTION_DATABASE_ID');
    console.log('\n📋 Manual entry JSON:\n');
    console.log(
      JSON.stringify(
        {
          date: summary.date,
          summary: generateNarrativeSummary(summary),
          commits: summary.totalCommits,
          projects: summary.projects,
          categories: summary.categories,
          highlights: summary.highlights.join('\n'),
          hours: summary.estimatedHours,
          files_changed: summary.totalFilesChanged,
          lines_added: summary.totalAdditions,
          lines_removed: summary.totalDeletions,
        },
        null,
        2
      )
    );
    return;
  }

  const narrativeSummary = generateNarrativeSummary(summary);

  // Only use properties that exist in the database (Name, Date)
  // Additional data goes in page content
  const requestBody = {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      // Title/Name property (required)
      Name: {
        title: [
          {
            text: {
              content: `${summary.date} - Dev Log`,
            },
          },
        ],
      },
      // Date
      Date: {
        date: {
          start: summary.date,
        },
      },
    },
    // Page content (children blocks)
    children: [
      {
        object: 'block',
        type: 'callout',
        callout: {
          rich_text: [{ text: { content: narrativeSummary } }],
          icon: { emoji: '📊' },
        },
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              text: {
                content: `📈 ${summary.totalCommits} commits | 📁 ${summary.totalFilesChanged} files | ⏱️ ~${summary.estimatedHours}h | +${summary.totalAdditions} / -${summary.totalDeletions} lines`,
              },
            },
          ],
        },
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ text: { content: `🗂️ Projects: ${summary.projects.join(', ')}` } }],
        },
      },
      {
        object: 'block',
        type: 'divider',
        divider: {},
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ text: { content: 'Highlights' } }],
        },
      },
      {
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: summary.highlights.map((h, i) => ({
            text: { content: i === 0 ? h : `\n${h}` },
          })),
        },
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ text: { content: 'Commits' } }],
        },
      },
      ...summary.repos.flatMap((repo) => [
        {
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [{ text: { content: repo.repoName } }],
          },
        },
        ...repo.commits.slice(0, 10).map((commit) => ({
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                text: {
                  content: commit.message,
                  link: null,
                },
              },
              {
                text: {
                  content: ` (${commit.hash.substring(0, 7)})`,
                },
                annotations: {
                  code: true,
                },
              },
            ],
          },
        })),
      ]),
      {
        object: 'block',
        type: 'divider',
        divider: {},
      },
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ text: { content: 'Technologies Used' } }],
        },
      },
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              text: {
                content: summary.technologies.join(' • '),
              },
            },
          ],
        },
      },
    ],
  };

  // Add LinkedIn Draft section if available
  if (summary.linkedInDraft) {
    // Read from file for latest draft
    const draftPath = path.join(process.cwd(), 'scripts/daily-summary/linkedin-draft.txt');
    const linkedInContent = fs.existsSync(draftPath)
      ? fs.readFileSync(draftPath, 'utf-8')
      : summary.linkedInDraft;

    requestBody.children.push(
      {
        object: 'block',
        type: 'divider',
        divider: {},
      } as any,
      {
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ text: { content: '📱 LinkedIn Draft' } }],
        },
      } as any,
      {
        object: 'block',
        type: 'quote',
        quote: {
          rich_text: [{ text: { content: linkedInContent } }],
        },
      } as any
    );
  }

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Notion API Error:', error);
      return;
    }

    const result = await response.json();
    console.log(`\n✅ Created Notion page: ${result.url}`);
  } catch (error) {
    console.error('❌ Failed to create Notion page:', error);
  }
}

function generateNarrativeSummary(summary: DailySummary): string {
  const projectText =
    summary.projects.length === 1
      ? summary.projects[0]
      : `${summary.projects.slice(0, -1).join(', ')} and ${summary.projects.slice(-1)}`;

  const categoryText =
    summary.categories.length === 1
      ? summary.categories[0]
      : summary.categories.slice(0, 3).join(', ');

  let narrative = `Worked on ${projectText} with ${summary.totalCommits} commits. `;
  narrative += `Focus areas: ${categoryText}. `;
  narrative += `Changed ${summary.totalFilesChanged} files (+${summary.totalAdditions}/-${summary.totalDeletions} lines). `;
  narrative += `Estimated ${summary.estimatedHours} hours of deep work.`;

  if (summary.highlights.length > 0) {
    narrative += ` Key achievements: ${summary.highlights[0]}`;
    if (summary.highlights.length > 1) {
      narrative += ` and ${summary.highlights.length - 1} more.`;
    }
  }

  return narrative;
}

async function main() {
  const outputPath = path.join(process.cwd(), 'scripts/daily-summary/output.json');

  if (!fs.existsSync(outputPath)) {
    console.error('❌ No output.json found. Run gather-commits.ts first.');
    process.exit(1);
  }

  const summary: DailySummary = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
  console.log(`\n📤 Pushing summary for ${summary.date} to Notion...`);

  await createNotionPage(summary);
}

main().catch(console.error);
