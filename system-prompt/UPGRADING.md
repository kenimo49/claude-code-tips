# Upgrading to a New Claude Code Version

Start fresh with an empty folder and build patches one by one.

## 1. Create new version folder

```bash
mkdir 2.0.56  # replace with actual version
cd 2.0.56
mkdir patches
```

## 2. Extract and understand the new structure

Copy `extract-system-prompt.js` from previous version and run it:

```bash
node extract-system-prompt.js system-prompt.md
```

Review the output to understand the new structure.

## 3. Build patches one at a time

For each section to slim:

1. Find the exact text in the bundle
2. Create `patches/name.find.txt` with that text
3. Create `patches/name.replace.txt` with slimmed version
4. Test the patch
5. Re-run extraction to verify
6. Start Claude Code and run `/context` to make sure it still works

## 4. Update README

Document which patches were created and token savings.
