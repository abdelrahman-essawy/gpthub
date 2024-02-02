const { execSync } = require('child_process');
const { readdirSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { join, basename, relative } = require('path');
const os = require('os');
const { statSync } = require('node:fs');

const ROOT_DIR = execSync('git rev-parse --show-toplevel').toString().trim();
const PROTOC_GEN_TS_PATH = join(
  ROOT_DIR,
  'node_modules',
  '.bin',
  os.platform() === 'win32' ? 'protoc-gen-ts_proto.cmd' : 'protoc-gen-ts_proto',
);
const SRC_DIR = join(ROOT_DIR, 'apps');
const OUT_DIR = join(ROOT_DIR, 'libs', 'backend', 'proto', 'gen');

// Clean all existing generated files
const cleanCommand =
  os.platform() === 'win32'
    ? `rmdir /s /q "${OUT_DIR}"`
    : `rm -rf "${OUT_DIR}"`;
try {
  execSync(cleanCommand);
} catch (error) {
  // Ignore error if the directory doesn't exist
}

// Create output directory if it doesn't exist
if (!existsSync(OUT_DIR)) {
  try {
    mkdirSync(OUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUT_DIR}`);
  } catch (error) {
    console.error(`Error creating directory: ${OUT_DIR}`);
    process.exit(1);
  }
}

// Find all .proto files recursively
const findProtoFiles = (dir) => {
  let protoFiles = [];
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      protoFiles = protoFiles.concat(findProtoFiles(filePath));
    } else if (file.endsWith('.proto')) {
      protoFiles.push(filePath);
    }
  }

  return protoFiles;
};

const PROTO_FILES = findProtoFiles(SRC_DIR);

if (PROTO_FILES.length === 0) {
  console.error('No .proto files found');
  process.exit(1);
}

console.log(`Found ${PROTO_FILES.length} .proto file(s)`);

const TOTAL_FILES = PROTO_FILES.length;
let COMPLETED_FILES = 0;

const GREEN = '\x1b[0;32m';
const YELLOW = '\x1b[1;33m';
const NC = '\x1b[0m'; // No Color

console.log(`${YELLOW}Generating Proto Files...${NC}`);

const START_TIME = new Date().getTime();

// Iterate over each .proto file
for (const PROTO_FILE of PROTO_FILES) {
  const FILENAME = basename(PROTO_FILE);

  console.log(`${GREEN}Processing ${FILENAME}...${NC} `);

  // Generate code for the current .proto file with various options
  const protocCommand = `pnpx protoc --plugin="${PROTOC_GEN_TS_PATH}" --ts_proto_out="${OUT_DIR}" --ts_proto_opt=nestJs=true,useDate=true --proto_path="${SRC_DIR}" "${PROTO_FILE}"`;

  execSync(protocCommand);

  // Increment completed files counter
  COMPLETED_FILES++;
}

console.log(
  `\n${YELLOW}Generation completed for ${COMPLETED_FILES} out of ${TOTAL_FILES} files.${NC}`,
);

// Generate index.ts to export everything
const INDEX_FILE = join(OUT_DIR, 'index.ts');
writeFileSync(INDEX_FILE, '// Auto-generated index.ts\n\n');

// Iterate over each generated file and folder recursively
const findGeneratedFiles = (dir) => {
  let generatedFiles = [];
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);

    if (statSync(filePath).isDirectory()) {
      // if the dir belongs to google, skip it
      if (file === 'google') {
        continue;
      }
      generatedFiles = generatedFiles.concat(findGeneratedFiles(filePath));
    } else if (file.endsWith('.ts')) {
      generatedFiles.push(filePath);
    }
  }

  return generatedFiles;
};

const GENERATED_FILES = findGeneratedFiles(OUT_DIR);

for (const GENERATED_FILE of GENERATED_FILES) {
  const GENERATED_RELATIVE_PATH = relative(OUT_DIR, GENERATED_FILE).replace(
    /\\/g,
    '/',
  );
  const GENERATED_PATH = join(OUT_DIR, GENERATED_RELATIVE_PATH);

  // Check if it's a file
  if (GENERATED_PATH.endsWith('.ts')) {
    writeFileSync(
      INDEX_FILE,
      `export * from './${GENERATED_RELATIVE_PATH.replace('.ts', '')}';\n`,
      { flag: 'a' },
    );
  }
}

console.log(`\n${GREEN}Generated index.ts.${NC}`);

// Display the time taken
const END_TIME = new Date().getTime();
const ELAPSED_TIME = (END_TIME - START_TIME) / 1000; // in seconds
console.log(`${YELLOW}Time taken: ${ELAPSED_TIME} seconds.${NC}`);
