#!/bin/bash

# Daily Summary - Full Pipeline
#
# Runs all steps of the daily summary automation:
# 1. Gather commits
# 2. Generate LinkedIn post
# 3. Push to Notion (if configured)
#
# Usage:
#   ./scripts/daily-summary/run-all.sh
#   ./scripts/daily-summary/run-all.sh --date=yesterday
#   ./scripts/daily-summary/run-all.sh --repos=/path/to/repo1,/path/to/repo2

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

echo "========================================"
echo "📊 DAILY SUMMARY AUTOMATION"
echo "========================================"
echo ""

# Step 1: Gather commits
echo "Step 1/3: Gathering commits..."
npx tsx scripts/daily-summary/gather-commits.ts "$@"

if [ ! -f "scripts/daily-summary/output.json" ]; then
    echo "❌ No commits found. Exiting."
    exit 0
fi

echo ""

# Step 2: Generate LinkedIn post
echo "Step 2/3: Generating LinkedIn post..."
npx tsx scripts/daily-summary/generate-linkedin-post.ts

echo ""

# Step 3: Push to Notion (if configured)
echo "Step 3/3: Pushing to Notion..."
if [ -n "$NOTION_API_KEY" ] && [ -n "$NOTION_DATABASE_ID" ]; then
    npx tsx scripts/daily-summary/push-to-notion.ts
else
    echo "⚠️  Notion not configured. Set NOTION_API_KEY and NOTION_DATABASE_ID to enable."
    echo "   Showing JSON for manual entry instead:"
    echo ""
    cat scripts/daily-summary/output.json | head -30
fi

echo ""
echo "========================================"
echo "✅ DAILY SUMMARY COMPLETE"
echo "========================================"
echo ""
echo "📁 Output files:"
echo "   - scripts/daily-summary/output.json (full data)"
echo "   - scripts/daily-summary/linkedin-draft.txt (ready to post)"
echo ""
