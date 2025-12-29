#!/bin/bash

set -e

git add .
if git diff --cached --quiet; then
  echo "No changes to commit"
  exit 0
fi

git commit -m "Automated update via Gemini CLI"
git push
