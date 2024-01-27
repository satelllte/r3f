#!/bin/bash

clang-format --version
echo "---"

SOURCE_FILES=$(find "src" -type f \( -name "*.glsl" \))

echo "Checking formatting for files:"
echo "$SOURCE_FILES"

clang-format --dry-run -style=file $SOURCE_FILES -Werror
