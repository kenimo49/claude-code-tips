#!/usr/bin/env node
/**
 * Claude Code System Prompt Extractor v3
 *
 * Extracts the system prompt from the minified Claude Code CLI bundle.
 * Handles conditional template sections and resolves minified variable names.
 *
 * Usage: node extract-system-prompt.js [output-file]
 */

const fs = require('fs');
const path = require('path');

// Auto-detect CLI path by following the claude binary
const { execSync } = require('child_process');

function findCliPath() {
  if (process.env.CLI_PATH) return process.env.CLI_PATH;

  try {
    // Get the real path of the claude binary
    const claudePath = execSync('which claude', { encoding: 'utf8' }).trim();
    const realPath = fs.realpathSync(claudePath);

    // cli.js is in the same directory as the symlink target
    const cliPath = path.join(path.dirname(realPath), 'cli.js');
    if (fs.existsSync(cliPath)) return cliPath;

    // Fallback: check if realPath itself is cli.js
    if (realPath.endsWith('cli.js')) return realPath;
  } catch (e) {
    // Fallback to common locations
  }

  // Try common npm global locations
  const locations = [
    '/opt/homebrew/lib/node_modules/@anthropic-ai/claude-code/cli.js',
    '/usr/local/lib/node_modules/@anthropic-ai/claude-code/cli.js',
    path.join(process.env.HOME, '.claude/local/node_modules/@anthropic-ai/claude-code/cli.js'),
  ];

  for (const loc of locations) {
    if (fs.existsSync(loc)) return loc;
  }

  return null;
}

const CLI_PATH = findCliPath();

if (!CLI_PATH || !fs.existsSync(CLI_PATH)) {
  console.error('Error: Claude Code CLI not found. Tried auto-detection and common paths.');
  console.error('Set CLI_PATH environment variable to specify location manually.');
  process.exit(1);
}

const content = fs.readFileSync(CLI_PATH, 'utf8');

// Extract version
const versionMatch = content.match(/Version: ([\d.]+)/);
const version = versionMatch ? versionMatch[1] : 'unknown';

console.log('Claude Code System Prompt Extractor v3');
console.log('======================================');
console.log('CLI Path:', CLI_PATH);
console.log('CLI Version:', version);
console.log('');

/**
 * Variable mappings (minified -> readable)
 * Found by searching for patterns like: varName="ToolName"
 */
const VAR_MAP = {
  // 2.0.56 variable names (updated from 2.0.55)
  'C9': 'Bash',
  'r8': 'Task',
  'd7B': 'TodoWrite',
  'u5': 'Read',
  'T5': 'Edit',
  'yX': 'Write',
  '_X': 'WebFetch',
  'HD': 'Glob',
  'hY': 'Grep',
  'mJ': 'AskUserQuestion',
  'Lk': 'WebSearch',
  'kP': 'SlashCommand',
};

/**
 * Replace all known variable patterns with readable names
 */
function replaceVariables(text) {
  // Simple variable references (2.0.56 variable names)
  text = text.replace(/\$\{C9\}/g, 'Bash');
  text = text.replace(/\$\{r8\}/g, 'Task');
  text = text.replace(/\$\{d7B\.name\}/g, 'TodoWrite');
  text = text.replace(/\$\{d7B\}/g, 'TodoWrite');
  text = text.replace(/\$\{u5\}/g, 'Read');
  text = text.replace(/\$\{T5\}/g, 'Edit');
  text = text.replace(/\$\{yX\}/g, 'Write');
  text = text.replace(/\$\{_X\}/g, 'WebFetch');
  text = text.replace(/\$\{HD\}/g, 'Glob');
  text = text.replace(/\$\{hY\}/g, 'Grep');
  text = text.replace(/\$\{mJ\}/g, 'AskUserQuestion');
  text = text.replace(/\$\{Lk\}/g, 'WebSearch');
  text = text.replace(/\$\{kP\}/g, 'SlashCommand');
  text = text.replace(/\$\{db1\}/g, 'claude-code-guide');

  // Object.name patterns (2.0.56)
  text = text.replace(/\$\{WO\.name\}/g, 'Glob');
  text = text.replace(/\$\{m8\.name\}/g, 'Read');
  text = text.replace(/\$\{aX\.name\}/g, 'Write');
  text = text.replace(/\$\{tI\.name\}/g, 'TodoWrite');
  text = text.replace(/\$\{An\.name\}/g, 'Task');

  // Agent type patterns (2.0.56)
  text = text.replace(/\$\{Pq\.agentType\}/g, 'Explore');

  // Tool name references without ${}
  text = text.replace(/,r8,/g, ', Task,');
  text = text.replace(/,T5,/g, ', Edit,');
  text = text.replace(/,yX,/g, ', Write,');
  text = text.replace(/\[r8,/g, '[Task,');
  text = text.replace(/,Nk\]/g, ', NotebookEdit]');

  return text;
}

/**
 * Extract agent type descriptions for Task tool
 */
function extractAgentTypes() {
  const agents = [];

  // general-purpose
  const gpIdx = content.indexOf('General-purpose agent for');
  if (gpIdx > -1) {
    let end = gpIdx;
    for (let i = gpIdx; i < Math.min(content.length, gpIdx + 500); i++) {
      if (content[i] === '"' || content[i] === "'") { end = i; break; }
    }
    agents.push({
      name: 'general-purpose',
      desc: content.slice(gpIdx, end)
    });
  }

  // statusline-setup - hardcoded since the quote in "user's" makes extraction tricky
  agents.push({
    name: 'statusline-setup',
    desc: "Use this agent to configure the user's Claude Code status line setting.",
    tools: 'Read, Edit'
  });

  // Explore
  const expIdx = content.indexOf('Fast agent specialized for exploring codebases');
  if (expIdx > -1) {
    let end = expIdx;
    for (let i = expIdx; i < Math.min(content.length, expIdx + 600); i++) {
      if (content[i] === "'" && content[i-1] !== '\\') { end = i; break; }
    }
    agents.push({
      name: 'Explore',
      desc: content.slice(expIdx, end),
      tools: 'All tools'
    });
  }

  // claude-code-guide
  const ccgIdx = content.indexOf('Use this agent when the user asks questions about Claude Code or the Claude Agent SDK');
  if (ccgIdx > -1) {
    let end = ccgIdx;
    for (let i = ccgIdx; i < Math.min(content.length, ccgIdx + 700); i++) {
      if (content[i] === "'" && content[i-1] !== '\\') { end = i; break; }
    }
    agents.push({
      name: 'claude-code-guide',
      desc: content.slice(ccgIdx, end),
      tools: 'Glob, Grep, Read, WebFetch, WebSearch'
    });
  }

  return agents;
}

/**
 * Extract content from conditional patterns like ${W.has(X)?`content`:""}
 * Returns the content inside the backticks
 */
function extractConditionalContent(text) {
  // Pattern: ${W.has(varName)?`content`:""}
  // We want to extract 'content' and keep it

  // First, handle the simple conditionals by extracting inner content
  let result = text;

  // Match ${W.has(something)?` and extract until closing `:""}
  const conditionalPattern = /\$\{W\.has\([^)]+\)\?\`([^`]*)\`:""\}/g;
  result = result.replace(conditionalPattern, '$1');

  // Match ${varName?`content`:""} patterns
  const simpleConditional = /\$\{[A-Za-z0-9_]+\?\`([^`]*)\`:""\}/g;
  result = result.replace(simpleConditional, '$1');

  // Match ${Y!==null?"":` and remove it (keeping content after)
  result = result.replace(/\$\{Y!==null\?"":"?\s*\`/g, '');

  // Match ${Y===null||Y.keepCodingInstructions===!0?` and remove
  result = result.replace(/\$\{Y===null\|\|Y\.keepCodingInstructions===!0\?\`/g, '');

  // Clean up orphaned closing patterns
  result = result.replace(/\`:""\}/g, '');
  result = result.replace(/\`:""}/g, '');

  return result;
}

/**
 * Extract a large section of text starting from a marker
 */
function extractLargeSection(startMarker, maxLen = 8000) {
  const idx = content.indexOf(startMarker);
  if (idx === -1) return null;

  // Find the template literal boundaries more carefully
  let end = idx;
  let depth = 0;

  for (let i = idx; i < Math.min(content.length, idx + maxLen); i++) {
    const char = content[i];
    const prevChar = content[i - 1];

    // Track ${} depth
    if (char === '$' && content[i + 1] === '{') {
      depth++;
    } else if (char === '}' && depth > 0) {
      depth--;
    }

    // End at backtick only if we're not inside ${}
    if (char === '`' && prevChar !== '\\' && depth === 0) {
      end = i;
      break;
    }
  }

  let text = content.slice(idx, end);
  text = extractConditionalContent(text);
  text = replaceVariables(text);

  return text;
}

/**
 * Extract section until a specific end marker (for sections split across functions)
 */
function extractSectionUntil(startMarker, endMarker, maxLen = 8000) {
  const idx = content.indexOf(startMarker);
  if (idx === -1) return null;

  let end = idx + maxLen;

  // Find the end marker
  const endIdx = content.indexOf(endMarker, idx);
  if (endIdx !== -1 && endIdx < end) {
    end = endIdx;
  }

  let text = content.slice(idx, end);
  text = extractConditionalContent(text);
  text = replaceVariables(text);

  return text;
}

/**
 * Extract tool description
 */
function extractToolDescription(searchStr) {
  const idx = content.indexOf(searchStr);
  if (idx === -1) return null;

  // Go back to find 'description:'
  let start = idx;
  for (let i = idx; i > Math.max(0, idx - 50); i--) {
    if (content[i] === '`' || content[i] === '"') {
      start = i + 1;
      break;
    }
  }

  // Find the end of the description string
  let end = idx;
  let quote = content[start - 1]; // ` or "
  for (let i = idx; i < Math.min(content.length, idx + 10000); i++) {
    if (content[i] === quote && content[i - 1] !== '\\') {
      end = i;
      break;
    }
  }

  return content.slice(start, end);
}

// Build the output
let sections = [];

// === HEADER ===
sections.push(`# Claude Code System Prompt (v${version})
# Extracted: ${new Date().toISOString().split('T')[0]}
# Source: ${CLI_PATH}

################################################################################
# IDENTITY
################################################################################

You are Claude Code, Anthropic's official CLI for Claude.
You are an interactive CLI tool that helps users with software engineering tasks.
Use the instructions below and the tools available to you to assist the user.

IMPORTANT: Assist with authorized security testing, defensive security, CTF
challenges, and educational contexts. Refuse requests for destructive techniques,
DoS attacks, mass targeting, supply chain compromise, or detection evasion for
malicious purposes. Dual-use security tools (C2 frameworks, credential testing,
exploit development) require clear authorization context.

IMPORTANT: You must NEVER generate or guess URLs for the user unless you are
confident that the URLs are for helping the user with programming. You may use
URLs provided by the user in their messages or local files.

If the user asks for help or wants to give feedback:
- /help: Get help with using Claude Code
- Report issues at https://github.com/anthropics/claude-code/issues
`);

// === DOCUMENTATION LOOKUP ===
const docIdx = content.indexOf('# Looking up your own documentation:');
if (docIdx > -1) {
  // Find end - it ends at the conditional ${Y!==null...
  let docEnd = content.indexOf('${Y!==null', docIdx);
  if (docEnd === -1) docEnd = docIdx + 1000;
  let docText = content.slice(docIdx, docEnd).trim();
  docText = replaceVariables(docText);
  sections.push(`
################################################################################
${docText}
`);
}

// === TONE AND STYLE (combined section) ===
const toneSection = extractLargeSection('# Tone and style', 3000);
if (toneSection) {
  sections.push(`
################################################################################
${toneSection}
`);
}

// === TASK MANAGEMENT ===
const taskMgmt = extractLargeSection('# Task Management', 4000);
if (taskMgmt) {
  sections.push(`
################################################################################
${taskMgmt}
`);
}

// === ASKING QUESTIONS ===
const askingSection = extractLargeSection('# Asking questions as you work', 1000);
if (askingSection) {
  sections.push(`
################################################################################
${askingSection}
`);
}

// === HOOKS ===
const hooksIdx = content.indexOf("Users may configure 'hooks'");
if (hooksIdx > -1) {
  let hooksEnd = hooksIdx;
  for (let i = hooksIdx; i < Math.min(content.length, hooksIdx + 500); i++) {
    if (content[i] === '`' && content[i-1] !== '\\') {
      hooksEnd = i;
      break;
    }
  }
  const hooksText = content.slice(hooksIdx, hooksEnd);
  sections.push(`
${hooksText}
`);
}

// === DOING TASKS ===
const doingSection = extractLargeSection('# Doing tasks', 4000);
if (doingSection) {
  sections.push(`
################################################################################
${doingSection}
`);
}

// === TOOL USAGE POLICY ===
const toolPolicySection = extractLargeSection('# Tool usage policy', 4000);
if (toolPolicySection) {
  sections.push(`
################################################################################
${toolPolicySection}
`);
}

// === GIT COMMITS ===
// This section is in a different function in the bundle, so use extractSectionUntil
const gitSection = extractSectionUntil('# Committing changes with git', '# Creating pull requests', 4000);
if (gitSection) {
  sections.push(`
################################################################################
${gitSection}
`);
}

// === PULL REQUESTS ===
const prSection = extractSectionUntil('# Creating pull requests', '# Other common operations', 3000);
if (prSection) {
  sections.push(`
################################################################################
${prSection}
`);
}

// === OTHER COMMON OPERATIONS ===
const otherOpsIdx = content.indexOf('# Other common operations');
if (otherOpsIdx > -1) {
  let otherOpsEnd = otherOpsIdx;
  for (let i = otherOpsIdx; i < Math.min(content.length, otherOpsIdx + 500); i++) {
    if (content[i] === '`' && content[i-1] !== '\\') {
      otherOpsEnd = i;
      break;
    }
  }
  const otherOpsText = content.slice(otherOpsIdx, otherOpsEnd);
  sections.push(`
################################################################################
${otherOpsText}
`);
}

// === CODE REFERENCES ===
const codeRefSection = extractLargeSection('# Code References', 1000);
if (codeRefSection) {
  sections.push(`
################################################################################
${codeRefSection}
`);
}

// === TOOL DESCRIPTIONS ===
sections.push(`
################################################################################
# TOOL DESCRIPTIONS
################################################################################
`);

// First, add agent types after Task tool description
const agentTypes = extractAgentTypes();

const tools = [
  { name: 'Task', search: 'Launch a new agent to handle complex, multi-step tasks', appendAgentTypes: true },
  { name: 'Bash', search: 'Executes a given bash command in a persistent shell session' },
  { name: 'Glob', search: 'Fast file pattern matching tool' },
  { name: 'Grep', search: 'A powerful search tool built on ripgrep' },
  { name: 'ExitPlanMode', search: 'Use this tool when you are in plan mode and have finished' },
  { name: 'Read', search: 'Reads a file from the local filesystem' },
  { name: 'Edit', search: 'Performs exact string replacements in files' },
  { name: 'Write', search: 'Writes a file to the local filesystem' },
  { name: 'NotebookEdit', search: 'Completely replaces the contents of a specific cell in a Jupyter notebook' },
  { name: 'WebFetch', search: 'Fetches content from a specified URL' },
  { name: 'TodoWrite', search: 'Use this tool to create and manage a structured task list' },
  { name: 'WebSearch', search: 'Allows Claude to search the web' },
  { name: 'BashOutput', search: 'Retrieves output from a running or completed background bash shell' },
  { name: 'KillShell', search: 'Kills a running background bash shell' },
  { name: 'AskUserQuestion', search: 'Use this tool when you need to ask the user questions' },
  { name: 'Skill', search: 'Execute a skill within the main conversation' },
  { name: 'SlashCommand', search: 'Execute a slash command within the main conversation' },
  { name: 'EnterPlanMode', search: 'Use this tool when you encounter a complex task that requires careful planning' },
];

for (const tool of tools) {
  const desc = extractToolDescription(tool.search);
  if (desc) {
    let cleanDesc = replaceVariables(desc);

    // For Task tool, inject agent type descriptions BEFORE variable replacement
    if (tool.appendAgentTypes && agentTypes.length > 0) {
      // The original has "Available agent types...\n${Q}\n\nWhen using..."
      // Replace the ${Q} placeholder with actual agent types
      let agentSection = '';
      for (const agent of agentTypes) {
        agentSection += `- ${agent.name}: ${agent.desc}`;
        if (agent.tools) {
          agentSection += ` (Tools: ${agent.tools})`;
        }
        agentSection += '\n';
      }
      // Match ${Q} or the already-replaced variants
      cleanDesc = cleanDesc.replace(
        /Available agent types and the tools they have access to:\s*\n\$\{Q\}\s*\n/,
        'Available agent types and the tools they have access to:\n' + agentSection + '\n'
      );
      // Also try already-replaced version
      cleanDesc = cleanDesc.replace(
        /Available agent types and the tools they have access to:\s*\n\s*(Task|\[DYNAMIC\]|)\s*\n\s*When using/,
        'Available agent types and the tools they have access to:\n' + agentSection + '\nWhen using'
      );
    }

    // Ensure description ends cleanly (no trailing conditional artifacts)
    cleanDesc = cleanDesc.replace(/\$\{[^}]*\?\s*$/, '');
    cleanDesc = cleanDesc.trim();

    sections.push(`
## ${tool.name}
${cleanDesc}
`);
  }
}

// === DYNAMIC SECTIONS NOTE ===
sections.push(`
################################################################################
# DYNAMIC CONTENT (added at runtime)
################################################################################

The following are injected dynamically based on context:

- Environment info: working directory, platform, date, git status
- Model info: "You are powered by [model-name]"
- Allowed tools list (tools that don't require user approval)
- CLAUDE.md file contents (project instructions)
- MCP server instructions (if connected)
- Custom output styles (if configured)
`);

// Combine and clean up
let output = sections.join('\n');

// Remove duplicate consecutive newlines (more than 2)
output = output.replace(/\n{4,}/g, '\n\n\n');

// Replace known numeric values before catching remaining patterns
output = output.replace(/\$\{uzA\}/g, '2000');
output = output.replace(/\$\{EA6\}/g, '2000');
output = output.replace(/\$\{kj9\}/g, '600000');
output = output.replace(/\$\{[A-Za-z0-9_]+\}ms \/ \$\{[A-Za-z0-9_]+\} minutes/g, '600000ms / 10 minutes');
output = output.replace(/\$\{[A-Za-z0-9_]+\}ms \(\$\{[A-Za-z0-9_]+\} minutes\)/g, '120000ms (2 minutes)');
output = output.replace(/exceeds \$\{[A-Za-z0-9_]+\} characters/g, 'exceeds 30000 characters');

// Tool references in "NOT to use" section
output = output.replace(/use the \[DYNAMIC\] or \[DYNAMIC\] tool instead/g, 'use the Read or Glob tool instead');
output = output.replace(/use the \[DYNAMIC\] tool instead, to find/g, 'use the Glob tool instead, to find');
output = output.replace(/use the \[DYNAMIC\] tool instead of the Task/g, 'use the Read tool instead of the Task');

// Remove any remaining ${...} patterns we couldn't resolve
output = output.replace(/\$\{[^}]{1,50}\}/g, '[DYNAMIC]');

// Clean up conditional artifacts
output = output.replace(/\[DYNAMIC\]`?:"."\}/g, '');
output = output.replace(/\[DYNAMIC\]`?:""\}/g, '');
output = output.replace(/`:""}/g, '');
output = output.replace(/\?`\s*\n/g, '\n');

// Remove orphaned template artifacts
output = output.replace(/`\s*,\s*`/g, '\n');
output = output.replace(/^`|`$/gm, '');

// Clean up extra [DYNAMIC] markers followed by closing braces
output = output.replace(/\[DYNAMIC\]\}/g, '');

// Fix timeout patterns that became [DYNAMIC]
output = output.replace(/\[DYNAMIC\]ms \/ \[DYNAMIC\] minutes\)/g, '600000ms / 10 minutes)');
output = output.replace(/\[DYNAMIC\]ms \(\[DYNAMIC\] minutes\)/g, '120000ms (2 minutes)');
output = output.replace(/exceeds \[DYNAMIC\] characters/g, 'exceeds 30000 characters');
output = output.replace(/up to \[DYNAMIC\] lines/g, 'up to 2000 lines');
output = output.replace(/than \[DYNAMIC\] characters/g, 'than 2000 characters');

// Tool references that became [DYNAMIC]
output = output.replace(/use the \[DYNAMIC\] or \[DYNAMIC\] tool instead/g, 'use the Read or Glob tool instead');
output = output.replace(/use the \[DYNAMIC\] tool instead, to find/g, 'use the Glob tool instead, to find');
output = output.replace(/use the \[DYNAMIC\] tool instead of the Task/g, 'use the Read tool instead of the Task');

// Remove standalone [DYNAMIC] lines (empty dynamic content)
output = output.replace(/^\s*\[DYNAMIC\]\s*$/gm, '');
output = output.replace(/\n\s*\[DYNAMIC\]\s*\n/g, '\n');
output = output.replace(/\n   \[DYNAMIC\]\n/g, '\n');  // Indented version

// Clean up remaining conditional patterns
output = output.replace(/\$\{Y===null\|\|Y\.keepCodingInstructions===!0\?\s*\n?/g, '');
output = output.replace(/\$\{p3A\(\)\?\s*\n?/g, '');
output = output.replace(/\$\{B\?\s*\n?/g, '');
output = output.replace(/\$\{Y!==null\?"":"?\s*\n?/g, '');

// Clean up [DYNAMIC] in examples (replace with tool names)
output = output.replace(/the \[DYNAMIC\] tool to write/g, 'the Write tool to write');
output = output.replace(/the \[DYNAMIC\] tool to launch/g, 'the Task tool to launch');
output = output.replace(/use the \[DYNAMIC\] tool/g, 'use the Write tool');
output = output.replace(/Uses the \[DYNAMIC\] tool/g, 'Uses the Task tool');

// Remove any remaining standalone [DYNAMIC] - be conservative, don't replace with specific tools
output = output.replace(/\[DYNAMIC\]\s*\n/g, '\n');
output = output.replace(/\[DYNAMIC\]$/gm, '');

// Write output
const outputPath = process.argv[2] || path.join(__dirname, 'system-prompt-original-unpatched.md');
fs.writeFileSync(outputPath, output);

const lineCount = output.split('\n').length;
console.log('Output:', outputPath);
console.log('Size:', output.length, 'chars');
console.log('Lines:', lineCount);
