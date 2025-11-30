# Claude Code Scripts

## context-bar.sh

Shows context window usage as a visual progress bar in your Claude Code status line.

**Example output:** `████░░░░░░ 42%`

### Installation

1. Copy the script to your Claude scripts directory:
   ```bash
   mkdir -p ~/.claude/scripts
   cp context-bar.sh ~/.claude/scripts/
   chmod +x ~/.claude/scripts/context-bar.sh
   ```

2. Update your `~/.claude/settings.json` to include the context bar. Example:
   ```json
   {
     "statusLine": {
       "type": "command",
       "command": "input=$(cat); model=$(echo \"$input\" | jq -r '.model.display_name // .model.id'); dir=$(basename \"$(echo \"$input\" | jq -r '.cwd')\"); cwd=$(echo \"$input\" | jq -r '.cwd'); branch=$(git -C \"$cwd\" branch --show-current 2>/dev/null); ctx=$(echo \"$input\" | ~/.claude/scripts/context-bar.sh); echo \"${model} | ${dir}${branch:+ | $branch} | ${ctx}\""
     }
   }
   ```

3. Your status line will now show: `Opus 4.5 | myproject | main | ████░░░░░░ 42%`

### Requirements

- `jq` (for JSON parsing)
- `bash`

### How it works

Claude Code passes session metadata (including `transcript_path`) to status line commands via stdin as JSON. The script reads the transcript JSONL file and calculates context usage from the most recent API response's token counts.
