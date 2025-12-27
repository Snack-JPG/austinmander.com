# Daily Summary - Multi-Repo Commit Aggregator

Automatically gather commits from all your repos, generate a LinkedIn post, and sync to Notion.

## Quick Start

```bash
cd /Users/austin/Desktop/Austinmander.com/scripts/daily-summary

# Install dependencies (first time only)
npm install

# Run everything (gather + linkedin + notion)
npm run all

# Or step by step:
npm run gather    # Collect commits → output.json
npm run linkedin  # Generate post → linkedin-draft.txt
npm run notion    # Push to Notion
```

## From Anywhere

Add to your `.zshrc`:

```bash
alias daily-summary="cd /Users/austin/Desktop/Austinmander.com/scripts/daily-summary && npm run all"
alias ds="daily-summary"
```

Then just run:
```bash
ds
```

## Configuration

### repos.config.json

Edit to add/remove repos:

```json
{
  "repos": [
    { "path": "/Users/austin/Desktop/PulseAI", "name": "PulseAI", "enabled": true },
    { "path": "/Users/austin/Desktop/YourRepo", "name": "YourRepo", "enabled": true }
  ],
  "settings": {
    "autoDiscover": true,
    "discoverPaths": ["/Users/austin/Desktop"]
  }
}
```

### Environment Variables

Set in `~/.zshrc`:

```bash
export NOTION_API_KEY="ntn_your_key_here"
export NOTION_DATABASE_ID="your_database_id"
```

## Output Files

- `output.json` - Full commit data
- `linkedin-draft.txt` - Ready-to-post LinkedIn content

## Scheduled Automation

The plist file runs this daily at 6 PM:

```bash
# Install schedule
cp com.pulseai.daily-summary.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.pulseai.daily-summary.plist

# Uninstall
launchctl unload ~/Library/LaunchAgents/com.pulseai.daily-summary.plist
```
