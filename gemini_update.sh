#!/bin/bash

PROMPT="$1"
gemini "$PROMPT" --files .
./auto_commit.sh
