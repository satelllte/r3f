#!/bin/bash

clang-format --version
echo "---"

SOURCE_FILES=$(find "src" -type f \( -name "*.glsl" \))

echo "Formatting files:"
echo "$SOURCE_FILES"

clang-format -i -style=file $SOURCE_FILES -Werror
