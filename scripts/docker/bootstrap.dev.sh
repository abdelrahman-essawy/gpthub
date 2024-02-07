#!/bin/bash

# Check if a string is provided as a parameter
if [ $# -eq 0 ]; then
  echo "Error: Please provide a project name as a parameter."
  exit 1
fi

# Store the first parameter (string) in a variable
project_name="$1"


npm run prisma:migrate && nx run $project_name:serve
