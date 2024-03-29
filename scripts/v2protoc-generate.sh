#!/usr/bin/env bash

# Root directory of app
ROOT_DIR=$(git rev-parse --show-toplevel)

# Path to Protoc Plugin
PROTOC_GEN_TS_PATH="${ROOT_DIR}/node_modules/.bin/protoc-gen-ts_proto.cmd"

# Directory holding all .proto files
SRC_DIR="${ROOT_DIR}/apps"

# Directory to write generated code (.d.ts files)
OUT_DIR="${ROOT_DIR}/libs/backend/proto/gen"

# Clean all existing generated files
rm -rf "${OUT_DIR}"
mkdir -p "${OUT_DIR}"

# Find all .proto files
PROTO_FILES=($(find "${SRC_DIR}" -name "*.proto"))

# Count the total number of .proto files
TOTAL_FILES=${#PROTO_FILES[@]}

# Counter for completed files
COMPLETED_FILES=0

# Colors for formatting
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Generating Proto Files...${NC}"

# Start time for measuring elapsed time
START_TIME=$(date +%s)

# Iterate over each .proto file
for PROTO_FILE in "${PROTO_FILES[@]}"; do
    FILENAME=$(basename -- "$PROTO_FILE")
    FILENAME_NOEXT="${FILENAME%.*}"

    echo -e "${GREEN}Processing $FILENAME...${NC}"

    # Generate code for the current .proto file with various options
    pnpx protoc \
        --plugin="${PROTOC_GEN_TS_PATH}" \
        --ts_proto_out="${OUT_DIR}" \
        --ts_proto_opt=nestJs=true \
        --proto_path="${SRC_DIR}" \
        "${PROTO_FILE}"

    # Increment completed files counter
    ((COMPLETED_FILES++))
done

echo -e "\n${YELLOW}Generation completed for $COMPLETED_FILES out of $TOTAL_FILES files.${NC}"

# Generate index.ts to export everything
INDEX_FILE="${OUT_DIR}/index.ts"
echo -e "// Auto-generated index.ts\n" > "${INDEX_FILE}"

# Iterate over each generated file and folder
while IFS= read -r -d '' GENERATED_FILE; do
    GENERATED_RELATIVE_PATH="${GENERATED_FILE#${OUT_DIR}/}"
    GENERATED_PATH="${OUT_DIR}/${GENERATED_RELATIVE_PATH}"

    # Check if it's a file
    if [ -f "${GENERATED_PATH}" ]; then
        echo -e "export * from './${GENERATED_RELATIVE_PATH%.ts}';" >> "${INDEX_FILE}"
    fi
done < <(find "${OUT_DIR}" -type f -name "*.ts" -print0)

echo -e "\n${YELLOW}Generated index.ts.${NC}"


# Display the time taken
END_TIME=$(date +%s)
ELAPSED_TIME=$((END_TIME - START_TIME))
echo -e "${YELLOW}Time taken: $ELAPSED_TIME seconds.${NC}"
