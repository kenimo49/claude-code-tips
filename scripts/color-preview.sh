#!/bin/bash

# Temporary script to preview status line color variations
# Run: bash scripts/color-preview.sh

echo ""
echo "=== Status Line Color Previews ==="
echo ""

# Colors
R='\033[0m'
G='\033[38;5;245m'  # explicit gray for default text
E='\033[38;5;238m'  # empty bar (dark gray)

# 0. gray (all gray)
echo "0. gray"
echo -e "${G}Opus 4.5 | 📁Daft | 🔀main (2 uncommitted, synced 20m ago) | ████▄░░░░░ 45%${R}"
echo -e "${G}💬 What is type checking and why are we using it there?${R}"
echo ""

# 1. orange (slightly darker: 173 instead of 209)
echo "1. orange"
C='\033[38;5;173m'
echo -e "${C}Opus 4.5${G} | 📁Daft | 🔀main (2 uncommitted, synced 20m ago) | ${C}████▄${E}░░░░░ ${G}45%${R}"
echo -e "${G}💬 What is type checking and why are we using it there?${R}"
echo ""

# 2. blue (slightly darker: 74 instead of 110)
echo "2. blue"
C='\033[38;5;74m'
echo -e "${C}Opus 4.5${G} | 📁Daft | 🔀main (2 uncommitted, synced 20m ago) | ${C}████▄${E}░░░░░ ${G}45%${R}"
echo -e "${G}💬 What is type checking and why are we using it there?${R}"
echo ""

# 3. teal (slightly darker: 66 instead of 73)
echo "3. teal"
C='\033[38;5;66m'
echo -e "${C}Opus 4.5${G} | 📁Daft | 🔀main (2 uncommitted, synced 20m ago) | ${C}████▄${E}░░░░░ ${G}45%${R}"
echo -e "${G}💬 What is type checking and why are we using it there?${R}"
echo ""

# 4. green (slightly darker: 71 instead of 108)
echo "4. green"
C='\033[38;5;71m'
echo -e "${C}Opus 4.5${G} | 📁Daft | 🔀main (2 uncommitted, synced 20m ago) | ${C}████▄${E}░░░░░ ${G}45%${R}"
echo -e "${G}💬 What is type checking and why are we using it there?${R}"
echo ""

# 5. lavender (slightly darker: 139 instead of 146)
echo "5. lavender"
C='\033[38;5;139m'
echo -e "${C}Opus 4.5${G} | 📁Daft | 🔀main (2 uncommitted, synced 20m ago) | ${C}████▄${E}░░░░░ ${G}45%${R}"
echo -e "${G}💬 What is type checking and why are we using it there?${R}"
echo ""

# 6. rose
echo "6. rose"
C='\033[38;5;132m'
echo -e "${C}Opus 4.5${G} | 📁Daft | 🔀main (2 uncommitted, synced 20m ago) | ${C}████▄${E}░░░░░ ${G}45%${R}"
echo -e "${G}💬 What is type checking and why are we using it there?${R}"
echo ""

# 7. gold
echo "7. gold"
C='\033[38;5;136m'
echo -e "${C}Opus 4.5${G} | 📁Daft | 🔀main (2 uncommitted, synced 20m ago) | ${C}████▄${E}░░░░░ ${G}45%${R}"
echo -e "${G}💬 What is type checking and why are we using it there?${R}"
echo ""

# 8. slate
echo "8. slate"
C='\033[38;5;60m'
echo -e "${C}Opus 4.5${G} | 📁Daft | 🔀main (2 uncommitted, synced 20m ago) | ${C}████▄${E}░░░░░ ${G}45%${R}"
echo -e "${G}💬 What is type checking and why are we using it there?${R}"
echo ""

# 9. cyan
echo "9. cyan"
C='\033[38;5;37m'
echo -e "${C}Opus 4.5${G} | 📁Daft | 🔀main (2 uncommitted, synced 20m ago) | ${C}████▄${E}░░░░░ ${G}45%${R}"
echo -e "${G}💬 What is type checking and why are we using it there?${R}"
echo ""

echo "=== End of previews ==="
