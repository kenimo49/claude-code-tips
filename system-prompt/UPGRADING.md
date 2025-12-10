# Upgrading to a New Claude Code Version

This project patches the Claude Code CLI to reduce system prompt token usage. When Claude Code updates, minified variable names change, breaking existing patches. This guide walks through updating the extraction script, patches, and patch script for a new version.

**Key files:**
- `extract-system-prompt.js` - extracts readable prompt from minified CLI
- `patch-cli.js` - applies patches to reduce prompt size
- `backup-cli.sh` - creates backup of original CLI (with hash validation)
- `restore-cli.sh` - restores CLI from backup
- `patches/*.find.txt` - text to find in bundle
- `patches/*.replace.txt` - replacement text (shorter)

## Quick Method: Let Claude Do It in a Container

The fastest way to upgrade is to have Claude Code fix the patches autonomously inside a container. This is safe because any mistakes stay isolated in the container.

### Why use a container?

1. **Safety** - patching mistakes won't break your main Claude installation
2. **Autonomy** - Claude can run with `--dangerously-skip-permissions` and iterate freely
3. **Easy recovery** - if something breaks, the container can be reset
4. **Copy when done** - only move verified patches to the host

### For the outer Claude (or human)

If you're Claude Code running on the host and helping with an upgrade, do NOT run each docker command individually with user approval. Instead:
1. Run Steps 1-3 to set up the container
2. Kick off the container Claude in Step 4
3. Monitor with `tmux capture-pane` until it's done
4. Then copy the results back

The container Claude handles all the iteration autonomously - that's the whole point.

### Step 1: Update Claude in container

```bash
docker exec -u root peaceful_lovelace npm install -g @anthropic-ai/claude-code@latest
docker exec peaceful_lovelace claude --version  # verify new version
```

### Step 2: Set up the new version folder

```bash
# Copy previous version's patches to container
docker cp system-prompt/2.0.XX peaceful_lovelace:/home/claude/projects/

# Create new version folder from previous
# Note: chown is needed because files copied from host keep host UID
docker exec -u root peaceful_lovelace bash -c "
  cp -r /home/claude/projects/2.0.XX /home/claude/projects/2.0.YY
  chown -R claude:claude /home/claude/projects/"

# Create backup of new cli.js
docker exec peaceful_lovelace bash -c "
  cp /usr/local/lib/node_modules/@anthropic-ai/claude-code/cli.js \
     /home/claude/projects/2.0.YY/cli.js.backup"

# Get the hash for patch-cli.js
docker exec peaceful_lovelace sha256sum /home/claude/projects/2.0.YY/cli.js.backup
```

### Step 3: Update patch-cli.js version and hash

Either manually edit or have Claude do it:
```bash
# Update EXPECTED_VERSION and EXPECTED_HASH in patch-cli.js
docker exec peaceful_lovelace sed -i \
  -e "s/EXPECTED_VERSION = '2.0.XX'/EXPECTED_VERSION = '2.0.YY'/" \
  -e "s/EXPECTED_HASH = '.*'/EXPECTED_HASH = 'NEW_HASH_HERE'/" \
  /home/claude/projects/2.0.YY/patch-cli.js
```

### Step 4: Let Claude fix the patches

Start a Claude session in tmux (so you can monitor progress):

```bash
docker exec peaceful_lovelace tmux new-session -d -s upgrade \
  'cd /home/claude/projects/2.0.YY && claude --dangerously-skip-permissions'

# Wait for it to start, then send the task
sleep 4
docker exec peaceful_lovelace tmux send-keys -t upgrade \
  'Read UPGRADING.md for context. Update all patches for the new version.
   The backup is cli.js.backup. Test with: node patch-cli.js cli.js
   Keep fixing until all patches apply successfully.' Enter
```

Monitor progress:
```bash
docker exec peaceful_lovelace tmux capture-pane -t upgrade -p -S -50
```

Claude will:
1. Find new variable mappings by searching cli.js.backup
2. Update all .find.txt and .replace.txt files with sed
3. Test with `node patch-cli.js cli.js` (uses local backup)
4. Iterate until all patches apply

### Step 5: Test the real installation

Once patches work locally, apply to the actual Claude installation and **run the full verification checklist** (see bottom of this doc):

```bash
# Apply patches to real cli.js (needs root)
docker exec -u root peaceful_lovelace node /home/claude/projects/2.0.YY/patch-cli.js

# Test /context works
docker exec peaceful_lovelace tmux new-session -d -s test 'claude --dangerously-skip-permissions'
sleep 4
docker exec peaceful_lovelace tmux send-keys -t test '/context' Enter
sleep 3
docker exec peaceful_lovelace tmux capture-pane -t test -p -S -30
```

**IMPORTANT:** Don't skip verification! Run all tests from the Final Verification Checklist before copying patches to host.

### Step 6: Copy verified patches to host

```bash
# Create folder on host
mkdir -p system-prompt/2.0.YY/patches

# Copy from container (exclude the large cli.js.backup)
docker cp peaceful_lovelace:/home/claude/projects/2.0.YY/patch-cli.js system-prompt/2.0.YY/
docker cp peaceful_lovelace:/home/claude/projects/2.0.YY/patches/. system-prompt/2.0.YY/patches/

# Copy and update backup/restore scripts
cp system-prompt/2.0.XX/backup-cli.sh system-prompt/2.0.YY/
cp system-prompt/2.0.XX/restore-cli.sh system-prompt/2.0.YY/

# Update version and hash in backup-cli.sh (use same hash as patch-cli.js)
sed -i '' \
  -e 's/EXPECTED_VERSION="2.0.XX"/EXPECTED_VERSION="2.0.YY"/' \
  -e 's/EXPECTED_HASH="[^"]*"/EXPECTED_HASH="NEW_HASH_HERE"/' \
  system-prompt/2.0.YY/backup-cli.sh
```

### Step 7: Apply to host and other containers

```bash
# Host
npm update -g @anthropic-ai/claude-code
cd system-prompt/2.0.YY && ./backup-cli.sh && node patch-cli.js

# Other containers (update Claude first, then patch)
# Check ~/.claude/CLAUDE.md for current container list
for container in eager_moser daphne delfina; do
  docker exec -u root $container npm install -g @anthropic-ai/claude-code@latest
  docker cp system-prompt/2.0.YY $container:/tmp/
  docker exec -u root $container cp /usr/local/lib/node_modules/@anthropic-ai/claude-code/cli.js \
    /usr/local/lib/node_modules/@anthropic-ai/claude-code/cli.js.backup
  docker exec -u root $container node /tmp/2.0.YY/patch-cli.js
done
```

**Note:** The loop syntax above may not work in all shells. If it fails, run each container separately or use `&&` to chain commands.

---

## Manual Method

## 1. Update Claude Code

```bash
npm update -g @anthropic-ai/claude-code
claude --version
```

## 2. Create new version folder

```bash
mkdir 2.0.XX && cd 2.0.XX && mkdir patches
```

## 3. Copy and update extraction script

```bash
cp ../PREV_VERSION/extract-system-prompt.js .
```

**Important:** Minified variable names change between versions. Update the mappings:

```bash
# Find tool variable assignments
grep -oE '[A-Za-z0-9_]{2,4}="(Task|Bash|Read|Edit|Write|Glob|Grep|TodoWrite|WebFetch|WebSearch)"' \
  "$(which claude | xargs realpath | xargs dirname)/cli.js" | sort -u

# Find object.name patterns
grep -oE '[a-zA-Z0-9_]+={name:[A-Za-z0-9_]+' "$(which claude | xargs realpath | xargs dirname)/cli.js" | head -20

# Find agentType patterns
grep -oE '[A-Za-z0-9_]+={agentType:"[^"]*"' "$(which claude | xargs realpath | xargs dirname)/cli.js"
```

Update `VAR_MAP` and `replaceVariables()` with new mappings.

If a tool isn't extracted, its description may have changed:
```bash
grep -oE 'Launch.{0,60}agent' "$(which claude | xargs realpath | xargs dirname)/cli.js"
```

## 4. Extract and diff

```bash
node extract-system-prompt.js system-prompt-original-unpatched.md
diff ../PREV_VERSION/system-prompt-original-unpatched.md system-prompt-original-unpatched.md
```

Look for:
- Actual prompt changes (new instructions, modified wording)
- Extraction bugs (`[DYNAMIC]` = unmapped variables)

If you see wrong tool names or `[DYNAMIC]` in unexpected places, iterate on the mappings until the diff shows only real changes.

## 5. Copy and update patch-cli.js

```bash
cp ../PREV_VERSION/patch-cli.js .
```

Update `EXPECTED_VERSION`, `EXPECTED_HASH` (run `shasum -a 256` on cli.js), and `findClaudeCli()` if the installation path changed.

## 5b. Copy and update backup/restore scripts

```bash
cp ../PREV_VERSION/backup-cli.sh .
cp ../PREV_VERSION/restore-cli.sh .
```

Update `EXPECTED_VERSION` and `EXPECTED_HASH` in `backup-cli.sh` to match `patch-cli.js`:

```bash
# Get hash from cli.js
shasum -a 256 "$(which claude | xargs realpath | xargs dirname)/cli.js"

# Update backup-cli.sh with new version and hash
sed -i '' \
  -e 's/EXPECTED_VERSION=".*"/EXPECTED_VERSION="2.0.YY"/' \
  -e 's/EXPECTED_HASH=".*"/EXPECTED_HASH="NEW_HASH_HERE"/' \
  backup-cli.sh
```

Note: `restore-cli.sh` doesn't need hash updates - it just copies the backup back.

## 6. Update existing patches

**Critical:** Update variable names in BOTH `*.find.txt` AND `*.replace.txt` files!

The replace files contain variable references like `${r8}` that must match the new version. Old variable names cause runtime crashes or corrupted prompts.

### Finding all variable mappings

Use Claude Code inside a container to help find mappings:

```bash
docker exec peaceful_lovelace claude --dangerously-skip-permissions -p \
  'Search the cli.js.backup for tool variable assignments like X="Bash".
   List all tool variable names: Bash, Read, Write, Edit, Glob, Grep, Task,
   TodoWrite, WebFetch, WebSearch, AskUserQuestion, BashOutput, KillShell.'
```

Common variable categories that change:
- **Tool names:** `D9→U9` (Bash), `uY→cY` (Grep), `bX→fX` (Write)
- **Object properties:** `tI.name→BY.name`, `In.name→Fn.name`, `d8.name→m8.name`
- **Function names:** `KoA→woA`, `LGA→PGA`, `Ke→ze`, `oM6→LO6`
- **Full function renames:** `vk3→Yy3`, `QFA→ZFA`, `RJ→vZ`
- **Agent types:** `Sq.agentType→kq.agentType`
- **Constants:** `Uf1→jf1`, `BH9→TH9`

### Bulk update all patches

```bash
# Update BOTH find.txt AND replace.txt files!
cd patches && sed -i '' \
  -e 's/\${D9}/\${U9}/g' \
  -e 's/\${uY}/\${cY}/g' \
  -e 's/\${bX}/\${fX}/g' \
  -e 's/\${tI\.name}/\${BY.name}/g' \
  *.find.txt *.replace.txt
```

**Common mistakes:**
1. Updating only `.find.txt` files - the `.replace.txt` files contain the SAME variables
2. Missing function calls with expressions like `woA()/60000` - simple sed for `woA()` won't catch these. Use broader patterns: `s/woA()/zrA()/g` catches both `${woA()}` and `${woA()/60000}`

## 7. Build new patches

1. Find exact text in bundle
2. Create `patches/name.find.txt` with that text
3. Create `patches/name.replace.txt` with slimmed version
4. Test: `node patch-cli.js`
5. Verify: start Claude, run `/context`

## 8. Update README

Document patches and token savings.

---

# Troubleshooting

## Finding where patch text diverges

When a patch shows "not found in bundle", find the mismatch point:

```javascript
// Run: node -e '<paste this>'
const fs = require('fs');
const bundle = fs.readFileSync('/opt/homebrew/lib/node_modules/@anthropic-ai/claude-code/cli.js', 'utf8');
const patch = fs.readFileSync('patches/PATCHNAME.find.txt', 'utf8');

let lo = 10, hi = patch.length;
while (lo < hi) {
  const mid = Math.floor((lo + hi + 1) / 2);
  bundle.indexOf(patch.slice(0, mid)) !== -1 ? lo = mid : hi = mid - 1;
}
console.log('Match up to char:', lo, 'of', patch.length);
console.log('Patch:', JSON.stringify(patch.slice(lo-20, lo+30)));
const idx = bundle.indexOf(patch.slice(0, lo));
console.log('Bundle:', JSON.stringify(bundle.slice(idx + lo - 20, idx + lo + 30)));
```

## Testing patches without root (--local flag)

Add a `--local` flag to patch-cli.js for testing against a local copy:

```javascript
// In patch-cli.js, modify the path detection:
const localTest = process.argv.includes('--local');
const basePath = localTest ? path.join(__dirname, 'cli.js') : (customPath || findClaudeCli());
const backupPath = localTest ? path.join(__dirname, 'cli.js.backup') : (basePath + '.backup');
```

Then test without needing root:
```bash
cp /path/to/cli.js.backup ./cli.js.backup
cp /path/to/cli.js.backup ./cli.js
node patch-cli.js --local
```

## Debugging runtime crashes

Use bisect mode to find which patch breaks:

```bash
node patch-cli.js --max=10  # apply only first N patches

# Test with tmux
tmux new-session -d -s test 'claude -p "Say hello" 2>&1 > /tmp/claude-test.txt'
sleep 12 && cat /tmp/claude-test.txt
# Binary search: works = try more, crashes = try fewer
```

**Symptoms:**
- "Execution error" with no output = variable points to non-existent function
- `TypeError: Cannot read properties of undefined` = same cause
- Claude hangs immediately = same cause
- `[object Object]` in prompt = variable resolves to wrong type (see below)

**Root cause:** `*.replace.txt` contains old variable names.

## Detecting corrupted system prompts

Some errors don't crash - they corrupt the prompt silently. Test by asking Claude:

```bash
claude --dangerously-skip-permissions -p \
  'Look at your own system prompt carefully. Do you notice anything weird,
   broken, incomplete, or inconsistent? Any instructions that seem truncated,
   duplicate, or don'\''t make sense? Report any issues you find.'
```

**Note:** Some issues are pre-existing bugs in Claude Code itself, not caused by patches. For example, v2.0.58+ has an empty bullet point in the "Doing tasks" section and duplicate security warnings - these exist in the UNPATCHED version too. Always compare against the unpatched version to distinguish patch bugs from Claude Code bugs.

**Signs of failure:**
- `[object Object]` where a tool name should be
- Minified JS like `function(Q){if(this.ended)return...` leaking into text
- API error: "text content blocks must contain non-whitespace text"

## Empty replacements break /context

When removing a section entirely, you **cannot** use an empty `.replace.txt` file. The API requires non-whitespace content in text blocks.

**Wrong:** Empty `code-references.replace.txt` causes `/context` to fail with:
```
Error: 400 "text content blocks must contain non-whitespace text"
```

**Correct:** Use a minimal placeholder like `# .` in `code-references.replace.txt`:
```
# .
```

This appears as a harmless orphan section header but keeps the API happy.

**Why remove code-references?** The original reminds Claude to cite code with `file_path:line_number` format. Removing it saves ~360 chars. Claude can still do this naturally without the instruction - the patch just removes the explicit reminder.

## Variable case sensitivity

**Symptoms:** `[object Object]` in prompt, `subagent_type=undefined`

**Causes:** Case sensitivity (`${R8}` vs `${r8}`) or wrong variable (`${yb1}` should be `${db1}`)

**Fix:** Compare `*.replace.txt` variables against `*.find.txt` or `extract-system-prompt.js` VAR_MAP.

## Function-based patches

Some patches replace entire functions (like `allowed-tools`). The function name itself can change completely between versions (e.g., `OS3` -> `vk3`).

**Step 1: Find the function by its unique string content:**
```bash
# Find byte offset of the unique string
grep -b 'You can use the following tools without requiring user approval' \
  "$(which claude | xargs realpath | xargs dirname)/cli.js"
```

**Step 2: Extract context around that offset:**
```bash
# Use dd to get surrounding bytes (adjust skip value from grep output)
dd if="$(which claude | xargs realpath | xargs dirname)/cli.js" \
  bs=1 skip=10482600 count=500 2>/dev/null
```

This reveals the full function signature including the new function name and helper variables.

**Step 3: Update both find and replace files** with the new function name and all helper variables.

## Quick testing with non-interactive mode

Use `-p` flag for faster testing:

```bash
claude -p "Say hello"  # sanity check
claude -p "Any [object Object] or [DYNAMIC] in your prompt?"  # corruption check
claude -p "Use Read to read test.txt" --allowedTools "Read"  # tool check
```

## Using container Claude to investigate patches

Claude Code itself can help find variable mappings and compare patches:

```bash
# Ask Claude to find exact text differences
docker exec container claude --dangerously-skip-permissions -p \
  'Read patches/bash-tool.find.txt and search for this exact text in
   /path/to/cli.js.backup. Tell me where it differs.'

# Ask Claude to find variable mappings
docker exec container claude --dangerously-skip-permissions -p \
  'Search cli.js.backup for all occurrences of X="ToolName" patterns.
   Create a table of variable->tool mappings.'

# Ask Claude to update patches automatically
docker exec container claude --dangerously-skip-permissions -p \
  'Update all .find.txt files in patches/ using sed with these mappings:
   D9->U9, uY->cY, bX->fX. Run the sed command.'
```

This is especially useful when multiple variables change between versions - Claude can analyze the cli.js and find all the mappings at once.

---

# Final Verification Checklist

Use this to verify a version upgrade is complete. Works for humans or Claude in a container.

**Checklist:**
- [ ] Required files present (`patch-cli.js`, `backup-cli.sh`, `restore-cli.sh`, `patches/`)
- [ ] Hash matches in both `patch-cli.js` and `backup-cli.sh`
- [ ] All patches apply with `[OK]` status
- [ ] `/context` works and shows reduced token count
- [ ] No prompt corruption (`[object Object]`, `[DYNAMIC]`, JS leaking)
- [ ] Claude self-reports no weirdness in system prompt or tool descriptions
- [ ] Basic tools work (Read, Bash, Glob)
- [ ] `restore-cli.sh` can revert changes

## Quick Verification Script

```bash
# Run this in container after applying patches
cd /home/claude/projects/2.0.YY

echo "=== File Check ==="
ls -la patch-cli.js backup-cli.sh restore-cli.sh patches/*.find.txt | head -5

echo "=== Hash Check ==="
grep 'EXPECTED_HASH' patch-cli.js backup-cli.sh | cut -d'"' -f2 | sort -u | wc -l
# Should output "1" (both files have same hash)

echo "=== Patch Test ==="
node patch-cli.js 2>&1 | tail -5

echo "=== Corruption Test ==="
claude --dangerously-skip-permissions -p 'Any [object Object] or [DYNAMIC] in your prompt? Yes or no only.'

echo "=== Self-Report Test ==="
claude --dangerously-skip-permissions -p 'Anything weird, truncated, or broken in your system prompt or tool descriptions? Brief answer only.'

echo "=== Tool Test ==="
claude --dangerously-skip-permissions -p 'Run: echo "tools work"' --allowedTools Bash
```

All checks passing = upgrade complete!
