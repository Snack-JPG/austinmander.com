# Daily Summary Automation Setup Guide

This automation generates daily summaries from your git commits, pushes them to Notion, and creates LinkedIn post drafts.

## Quick Start

### Option 1: On-Demand via Claude Code

Just run the slash command:

```
/daily-summary
```

Claude will:
1. Gather your commits for today
2. Analyze and contextualize them
3. Generate a Notion entry
4. Create a LinkedIn post draft

### Option 2: Run Scripts Directly

```bash
# Run the full pipeline
./scripts/daily-summary/run-all.sh

# Or run each step individually
npx tsx scripts/daily-summary/gather-commits.ts
npx tsx scripts/daily-summary/generate-linkedin-post.ts
npx tsx scripts/daily-summary/push-to-notion.ts
```

### Option 3: Scheduled (Automatic Daily)

See "Schedule Setup" section below.

---

## Notion Setup (Required for Notion Integration)

### Step 1: Create a Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "New integration"
3. Name it "Daily Dev Log"
4. Select your workspace
5. Copy the "Internal Integration Token" (starts with `secret_`)

### Step 2: Create Your Time Log Database

Create a new Notion database with these properties:

| Property | Type | Required |
|----------|------|----------|
| Name | Title | Yes |
| Date | Date | Yes |
| Summary | Text | Yes |
| Commits | Number | No |
| Projects | Multi-select | No |
| Categories | Multi-select | No |
| Hours | Number | No |
| Files Changed | Number | No |
| Lines Added | Number | No |
| Lines Removed | Number | No |
| Posted | Checkbox | No |

### Step 3: Share Database with Integration

1. Open your database in Notion
2. Click "..." menu → "Add connections"
3. Select your "Daily Dev Log" integration

### Step 4: Get Database ID

From the database URL:
```
https://notion.so/yourworkspace/abc123def456...
                               ^^^^^^^^^^^^^^^^
                               This is your database ID
```

### Step 5: Configure Environment Variables

Add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export NOTION_API_KEY="secret_your_token_here"
export NOTION_DATABASE_ID="your_database_id_here"
```

Then reload:
```bash
source ~/.zshrc
```

---

## Schedule Setup (macOS)

### Install the Schedule

```bash
# Copy plist to LaunchAgents
cp scripts/daily-summary/com.pulseai.daily-summary.plist ~/Library/LaunchAgents/

# Edit the plist to add your Notion credentials
nano ~/Library/LaunchAgents/com.pulseai.daily-summary.plist

# Load the schedule
launchctl load ~/Library/LaunchAgents/com.pulseai.daily-summary.plist
```

### Verify It's Running

```bash
# Check status
launchctl list | grep daily-summary

# View logs
tail -f /tmp/daily-summary.log
```

### Change Schedule Time

Edit the plist file and change the `Hour` and `Minute` values:

```xml
<key>Hour</key>
<integer>18</integer>  <!-- 6 PM - change to your preferred time -->
<key>Minute</key>
<integer>0</integer>
```

Then reload:
```bash
launchctl unload ~/Library/LaunchAgents/com.pulseai.daily-summary.plist
launchctl load ~/Library/LaunchAgents/com.pulseai.daily-summary.plist
```

### Disable Schedule

```bash
launchctl unload ~/Library/LaunchAgents/com.pulseai.daily-summary.plist
rm ~/Library/LaunchAgents/com.pulseai.daily-summary.plist
```

---

## Multi-Repo Support

To scan multiple repositories:

### Option A: Environment Variable

```bash
export REPOS_TO_SCAN="/Users/austin/Desktop/PulseAI,/Users/austin/Desktop/OtherProject"
```

### Option B: Command Line

```bash
./scripts/daily-summary/run-all.sh --repos=/path/to/repo1,/path/to/repo2
```

---

## LinkedIn Post Styles

The generator supports multiple post styles:

```bash
# Auto-detect best style based on commits
npx tsx scripts/daily-summary/generate-linkedin-post.ts

# Force a specific style
npx tsx scripts/daily-summary/generate-linkedin-post.ts --style=progress
npx tsx scripts/daily-summary/generate-linkedin-post.ts --style=learning
npx tsx scripts/daily-summary/generate-linkedin-post.ts --style=milestone
npx tsx scripts/daily-summary/generate-linkedin-post.ts --style=technical
```

---

## Output Files

After running, you'll find:

| File | Description |
|------|-------------|
| `scripts/daily-summary/output.json` | Full structured data |
| `scripts/daily-summary/linkedin-draft.txt` | Ready-to-post LinkedIn content |

---

## Customization Ideas

### Add More Repos

Edit the `REPOS_TO_SCAN` environment variable or modify `gather-commits.ts`.

### Change LinkedIn Hashtags

Edit `generate-linkedin-post.ts` → `generateHashtags()` function.

### Add Custom Notion Properties

Edit `push-to-notion.ts` → `createNotionPage()` function.

### Weekly/Monthly Rollups

Create a new script that aggregates multiple `output.json` files:

```bash
# Example: Generate weekly summary
cat scripts/daily-summary/archive/*.json | npx tsx scripts/daily-summary/weekly-rollup.ts
```

---

## Troubleshooting

### "No commits found"

- Check you're in a git repository
- Verify your git user.name matches commit authors
- Try: `git log --since="midnight" --author="$(git config user.name)"`

### Notion API Error

- Verify your API key is correct
- Make sure the database is shared with your integration
- Check property names match exactly (case-sensitive)

### Schedule Not Running

```bash
# Check if loaded
launchctl list | grep daily-summary

# View errors
cat /tmp/daily-summary-stderr.log

# Test manually
./scripts/daily-summary/run-all.sh
```

---

## Files Created

```
scripts/daily-summary/
├── SETUP.md                          # This file
├── gather-commits.ts                 # Collects git commits
├── generate-linkedin-post.ts         # Creates LinkedIn draft
├── push-to-notion.ts                 # Pushes to Notion database
├── run-all.sh                        # Runs full pipeline
├── com.pulseai.daily-summary.plist   # macOS schedule config
├── output.json                       # (generated) Full data
└── linkedin-draft.txt                # (generated) Post content
```

---

*Version: 1.0*
*Created: December 2024*
