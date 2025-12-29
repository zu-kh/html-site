#!/bin/bash

set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Ensure clean index before sync
git fetch origin

# Handle divergence safely
if ! git diff --quiet || ! git diff --cached --quiet; then
    git add .
    git commit -m "Automated update via Gemini CLI"
fi

# Rebase if remote advanced
git pull --rebase origin "$BRANCH"

# Push only if local ahead
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse origin/"$BRANCH")

if [ "$LOCAL" != "$REMOTE" ]; then
    git push origin "$BRANCH"
fi
