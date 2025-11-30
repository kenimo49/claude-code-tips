#!/bin/bash
# Restore Claude Code CLI from backup

set -e

CLI_PATH="$HOME/.claude/local/node_modules/@anthropic-ai/claude-code/cli.js"
BACKUP_PATH="$HOME/.claude/local/node_modules/@anthropic-ai/claude-code/cli.js.backup"

if [ ! -f "$BACKUP_PATH" ]; then
    echo "Error: No backup found at $BACKUP_PATH"
    exit 1
fi

cp "$BACKUP_PATH" "$CLI_PATH"
echo "Restored from backup."
