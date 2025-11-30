#!/bin/bash

# Claude Code status line script
# Shows: Opus 4.5 | 📁 Daft | 🔀 main (2 files uncommitted) | ████░░░░░░ 42% of 200k tokens used

input=$(cat)

# Extract model, directory, and cwd
model=$(echo "$input" | jq -r '.model.display_name // .model.id // "?"')
cwd=$(echo "$input" | jq -r '.cwd // empty')
dir=$(basename "$cwd" 2>/dev/null || echo "?")

# Get git branch and uncommitted file count
branch=""
uncommitted=""
if [[ -n "$cwd" && -d "$cwd" ]]; then
    branch=$(git -C "$cwd" branch --show-current 2>/dev/null)
    if [[ -n "$branch" ]]; then
        file_count=$(git -C "$cwd" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
        if [[ "$file_count" -eq 0 ]]; then
            uncommitted="(0 files uncommitted)"
        elif [[ "$file_count" -eq 1 ]]; then
            uncommitted="(1 file uncommitted)"
        else
            uncommitted="(${file_count} files uncommitted)"
        fi
    fi
fi

# Get transcript path for context calculation
transcript_path=$(echo "$input" | jq -r '.transcript_path // empty')

# Calculate context bar
if [[ -n "$transcript_path" && -f "$transcript_path" ]]; then
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

    if [[ "$context_length" -gt 0 ]]; then
        pct=$((context_length * 100 / max_context))
    else
        pct=0
    fi

    [[ $pct -gt 100 ]] && pct=100

    bar=""
    for ((i=0; i<bar_width; i++)); do
        bar_start=$((i * 10))
        progress=$((pct - bar_start))
        if [[ $progress -ge 8 ]]; then
            bar+="█"
        elif [[ $progress -ge 3 ]]; then
            bar+="▄"
        else
            bar+="░"
        fi
    done

    ctx="${bar} ${pct}% of 200k tokens used"
else
    ctx="░░░░░░░░░░ ?% of 200k tokens used"
fi

# Build output: Model | Dir | Branch (uncommitted) | Context
output="${model} | 📁${dir}"
[[ -n "$branch" ]] && output+=" | 🔀${branch} ${uncommitted}"
output+=" | ${ctx}"

echo "$output"
