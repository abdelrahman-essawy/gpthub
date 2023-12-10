import 'dart:io';

void main() {
  // Root directory of app
  var rootDir = Process.runSync('git', ['rev-parse', '--show-toplevel']);
  var ROOT_DIR = rootDir.stdout.trim();

  // Path to Protoc Plugin
  var PROTOC_GEN_TS_PATH = "${ROOT_DIR}/node_modules/.bin/protoc-gen-ts_proto";

  // Directory holding all .proto files
  var SRC_DIR = "${ROOT_DIR}/libs/core/src/proto/src";

  // Directory to write generated code (.d.ts files)
  var OUT_DIR = "${ROOT_DIR}/libs/core/src/proto/generated_dart";

  // Clean all existing generated files
  Process.runSync('rm', ['-rf', OUT_DIR]);
  Process.runSync('mkdir', ['-p', OUT_DIR]);

  // Find all .proto files
  var protoFiles = Process.runSync('find', [SRC_DIR, '-name', '*.proto']);
  var PROTO_FILES = protoFiles.stdout.trim().split('\n');

  // Count the total number of .proto files
  var TOTAL_FILES = PROTO_FILES.length;

  // Counter for completed files
  var COMPLETED_FILES = 0;

  // Colors for formatting
  var GREEN = '\x1B[0;32m';
  var YELLOW = '\x1B[1;33m';
  var NC = '\x1B[0m'; // No Color

  print("${YELLOW}Generating Proto Files...${NC}");

  // Start time for measuring elapsed time
  var startTime = DateTime.now();

  // Iterate over each .proto file
  for (var PROTO_FILE in PROTO_FILES) {
    var fileName = PROTO_FILE.split('/').last;
    var fileNameNoExt = fileName.split('.').first;

    print("${GREEN}Processing $fileName...${NC}");

    // Generate code for the current .proto file with various options
    Process.runSync('protoc', [
      '--plugin=$PROTOC_GEN_TS_PATH',
      '--ts_proto_out=$OUT_DIR',
      '--ts_proto_opt=nestJs=true',
      '--proto_path=$SRC_DIR',
      PROTO_FILE,
    ]);

    // Increment completed files counter
    COMPLETED_FILES++;
  }

  print("\n${YELLOW}Generation completed for $COMPLETED_FILES out of $TOTAL_FILES files.${NC}");

  // Generate index.dart to export everything
  var indexFile = File("$OUT_DIR/index.dart");
  indexFile.writeAsStringSync("// Auto-generated index.dart\n");

  // Iterate over each generated file and folder
  Process.runSync('find', [OUT_DIR, '-type', 'f', '-name', '*.dart']).stdout.split('\n').forEach((generatedFile) {
    var generatedRelativePath = generatedFile.substring(OUT_DIR.length + 1);
    var generatedPath = "$OUT_DIR/$generatedRelativePath";

    // Check if it's a file
    if (File(generatedPath).existsSync()) {
      indexFile.writeAsStringSync("export '$generatedRelativePath';\n", mode: FileMode.append);
    }
  });

  print("\n${YELLOW}Generated index.dart.${NC}");

  // Display the time taken
  var endTime = DateTime.now();
  var elapsedTime = endTime.difference(startTime).inSeconds;
  print("${YELLOW}Time taken: $elapsedTime seconds.${NC}");
}
