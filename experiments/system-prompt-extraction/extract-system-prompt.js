#!/usr/bin/env node
/**
 * Claude Code System Prompt Extractor
 *
 * Extracts the system prompt from the minified Claude Code CLI bundle.
 *
 * The CLI is installed at: ~/.claude/local/node_modules/@anthropic-ai/claude-code/cli.js
 * It's a ~10MB minified JavaScript file bundled with esbuild.
 *
 * The system prompt is built dynamically from template literals with conditionals.
 * This script finds the major sections and attempts to resolve variable names.
 *
 * Usage: node extract-system-prompt.js [output-file]
 *
 * Note: Variable names change between versions as they're minified.
 * You may need to update VAR_MAP for newer versions.
 */

const fs = require('fs');
const path = require('path');

// Path to Claude Code CLI
const CLI_PATH = path.join(process.env.HOME, '.claude/local/node_modules/@anthropic-ai/claude-code/cli.js');

// Check if file exists
if (!fs.existsSync(CLI_PATH)) {
  console.error('Error: Claude Code CLI not found at', CLI_PATH);
  console.error('Make sure Claude Code is installed.');
  process.exit(1);
}

const content = fs.readFileSync(CLI_PATH, 'utf8');

// Extract version
const versionMatch = content.match(/Version: ([\d.]+)/);
const version = versionMatch ? versionMatch[1] : 'unknown';

console.log('Claude Code System Prompt Extractor');
console.log('===================================');
console.log('CLI Path:', CLI_PATH);
console.log('CLI Size:', (content.length / 1024 / 1024).toFixed(2), 'MB');
console.log('Version:', version);
console.log('');

/**
 * Variable name mappings (minified -> readable)
 * These are discovered by searching the bundle for patterns like:
 *   - Tool definitions: name:"Bash"
 *   - Usage in templates: ${E9} where E9="Bash"
 *
 * NOTE: These names change with each build. Update as needed.
 */
const VAR_MAP = {
  'E9': 'Bash',
  'R8': 'Task',
  'eI': { name: 'TodoWrite' },
  'h5': 'Read',
  'R5': 'Edit',
  'vX': 'Write',
  'xX': 'WebFetch',
  'DD': 'Glob',
  'uY': 'Grep',
  'uJ': 'AskUserQuestion',
  'ZC': { agentType: 'Explore' },
  'yb1': 'claude-code-guide',
  'F': 'SlashCommand',
};

/**
 * Extract a section starting from a marker until the end of its template literal
 */
function extractSection(startMarker, maxLen = 5000) {
  const idx = content.indexOf(startMarker);
  if (idx === -1) return null;

  let end = idx;

  // Find end of template literal (backtick)
  for (let i = idx; i < Math.min(content.length, idx + maxLen); i++) {
    if (content[i] === '`' && content[i - 1] !== '\\') {
      end = i;
      break;
    }
  }

  return content.slice(idx, end);
}

/**
 * Replace minified variable names with readable ones
 */
function cleanTemplate(text) {
  if (!text) return '';

  // Replace known variable patterns
  const replacements = [
    [/\$\{E9\}/g, 'Bash'],
    [/\$\{R8\}/g, 'Task'],
    [/\$\{eI\.name\}/g, 'TodoWrite'],
    [/\$\{h5\}/g, 'Read'],
    [/\$\{R5\}/g, 'Edit'],
    [/\$\{vX\}/g, 'Write'],
    [/\$\{xX\}/g, 'WebFetch'],
    [/\$\{DD\}/g, 'Glob'],
    [/\$\{uY\}/g, 'Grep'],
    [/\$\{uJ\}/g, 'AskUserQuestion'],
    [/\$\{ZC\.agentType\}/g, 'Explore'],
    [/\$\{yb1\}/g, 'claude-code-guide'],
    [/\$\{F\}/g, 'SlashCommand'],
  ];

  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, replacement);
  }

  // Remove conditional starts that got cut off
  text = text.replace(/\$\{[A-Za-z0-9_]+\?$/gm, '');
  text = text.replace(/\$\{[A-Za-z0-9_.]+\(.*?\)\?$/gm, '');
  text = text.replace(/\$\{W\.has\([^)]+\)\?$/gm, '');
  text = text.replace(/\$\{[A-Z]!==null\?$/gm, '');

  return text;
}

// Sections to extract (in order)
const SECTIONS = [
  '# Looking up your own documentation:',
  '# Tone and style',
  '# Professional objectivity',
  '# Planning without timelines',
  '# Task Management',
  '# Asking questions as you work',
  '# Doing tasks',
  '# Tool usage policy',
  '# Committing changes with git',
  '# Creating pull requests',
  '# Code References',
];

// Build output
let output = [];

// Header
output.push(`# Claude Code System Prompt
# Extracted from cli.js version ${version}
# Extraction date: ${new Date().toISOString().split('T')[0]}
#
# Note: This is a partial extraction. Some sections are truncated where
# JavaScript conditionals break the template literals. The full prompt
# is assembled dynamically at runtime.
#
# To get the complete prompt, intercept the API call or ask Claude to
# output its own system prompt.

================================================================================
IDENTITY
================================================================================

You are Claude Code, Anthropic's official CLI for Claude.
You are an interactive CLI tool that helps users with software engineering tasks.
Use the instructions below and the tools available to you to assist the user.

IMPORTANT: Assist with authorized security testing, defensive security, CTF
challenges, and educational contexts. Refuse requests for destructive techniques,
DoS attacks, mass targeting, supply chain compromise, or detection evasion for
malicious purposes.

IMPORTANT: You must NEVER generate or guess URLs for the user unless you are
confident that the URLs are for helping the user with programming.

If the user asks for help or wants to give feedback:
- /help: Get help with using Claude Code
- Report issues at https://github.com/anthropics/claude-code/issues
`);

// Extract each section
const seen = new Set();
for (const section of SECTIONS) {
  const text = extractSection(section);
  if (text && !seen.has(section)) {
    seen.add(section);
    output.push('\n================================================================================');
    output.push(cleanTemplate(text));
  }
}

// Combine output
const finalOutput = output.join('\n');

// Determine output path
const outputPath = process.argv[2] || path.join(__dirname, 'system-prompt.txt');
fs.writeFileSync(outputPath, finalOutput);

console.log('Extraction complete!');
console.log('Output:', outputPath);
console.log('Size:', finalOutput.length, 'chars');
console.log('Lines:', finalOutput.split('\n').length);
console.log('');
console.log('Sections extracted:');
for (const s of seen) {
  console.log('  -', s);
}
console.log('');
console.log('Missing/truncated sections may need runtime extraction.');
