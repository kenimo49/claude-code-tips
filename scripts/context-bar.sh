#!/bin/bash

# Context usage bar for Claude Code status line
# Shows: ████░░░░░░ 42%

input=$(cat)
transcript_path=$(echo "$input" | jq -r '.transcript_path // empty')

if [[ -z "$transcript_path" || ! -f "$transcript_path" ]]; then
    echo "░░░░░░░░░░ ?%"
    exit 0
fi

# Get context length from most recent main chain entry
context_length=$(jq -s '
    map(select(.message.usage and .isSidechain != true and .isApiErrorMessage != true)) |
    last |
    if . then
        (.message.usage.input_tokens // 0) +
        (.message.usage.cache_read_input_tokens // 0) +
        (.message.usage.cache_creation_input_tokens // 0)
    else 0 end
' < "$transcript_path")

max_context=200000
bar_width=10

# Calculate percentage (integer)
if [[ "$context_length" -gt 0 ]]; then
    pct=$((context_length * 100 / max_context))
else
    pct=0
fi

# Cap at 100%
[[ $pct -gt 100 ]] && pct=100

# Build the bar
filled=$((pct * bar_width / 100))
empty=$((bar_width - filled))

bar=""
for ((i=0; i<filled; i++)); do bar+="█"; done
for ((i=0; i<empty; i++)); do bar+="░"; done

echo "${bar} ${pct}%"
