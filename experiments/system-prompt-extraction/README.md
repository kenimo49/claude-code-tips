# System Prompt Extraction

Extracts the system prompt from the Claude Code CLI bundle.

## Files

- `extract-system-prompt.js` - Node.js script to extract the prompt
- `system-prompt.txt` - Extracted system prompt (partial)

## How it works

Claude Code is installed at `~/.claude/local/node_modules/@anthropic-ai/claude-code/cli.js` as a ~10MB minified JavaScript bundle.

The system prompt is:
- Built dynamically from template literals
- Split across multiple sections with JavaScript conditionals
- Uses minified variable names (e.g., `E9` for "Bash", `R8` for "Task")

The extraction script:
1. Finds each major section by its header (e.g., "# Tone and style")
2. Extracts text until the template literal ends
3. Replaces known minified variable names with readable ones

## Usage

```bash
node extract-system-prompt.js [output-file]
```

## Limitations

Some sections are truncated where JavaScript conditionals break the template:
```javascript
${Y!==null?"":` ... `}  // Conditional inclusion
${W.has(toolName)?` ... `:``}  // Tool availability check
```

For the complete prompt, either:
1. Ask Claude to output its own system prompt
2. Intercept the API call with a proxy (e.g., mitmproxy)
3. Use Node debugger to inspect at runtime

## Variable mappings (v2.0.55)

These change with each minified build:

| Minified | Actual |
|----------|--------|
| E9 | Bash |
| R8 | Task |
| eI.name | TodoWrite |
| h5 | Read |
| R5 | Edit |
| vX | Write |
| xX | WebFetch |
| DD | Glob |
| uY | Grep |
| uJ | AskUserQuestion |
| ZC.agentType | Explore |
