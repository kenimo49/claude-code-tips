# Project Instructions
- Respond in Japanese by default
- No AI attribution in commits
- Writing: keep user's voice, first person, conversational, no em dashes, stick closely to what user said without making things up, but fix small grammar mistakes
- Testing: use tmux to control Claude Code instances (send-keys, capture-pane)
- After adding or renaming tips, run `node scripts/generate-toc.js` to update the table of contents

## System prompt patching
- When upgrading patches, **always test `/context` in the container** before copying to host. Don't skip the Final Verification Checklist at the bottom of UPGRADING.md.
- For function-based patches (like `allowed-tools`), the replace.txt must use the NEW function name, not the old one.
