import 'dart:io';

void main() {
  // Root directory of the Dart app
  var rootDir = Process.runSync('git', ['rev-parse', '--show-toplevel']);
  var ROOT_DIR = rootDir.stdout.trim();

  // Path to protoc-gen-dart binary
  var PROTOC_GEN_DART_PATH = "${ROOT_DIR}/path/to/protoc-gen-dart";

  // Directory holding all .proto files
  var SRC_DIR = "${ROOT_DIR}/path/to/your/proto/files";

  // Directory to write generated Dart code
  var OUT_DIR = "${ROOT_DIR}/generated_dart";

  // Clean all existing generated files
  Process.runSync('rm', ['-rf', OUT_DIR]);
  Process.runSync('mkdir', ['-p', OUT_DIR]);

  // Find all .proto files
  var protoFiles = Process.runSync('find', [SRC_DIR, '-name', '*.proto']);
  var PROTO_FILES = protoFiles.stdout.trim().split('\n');

  // Iterate over each .proto file
  for (var PROTO_FILE in PROTO_FILES) {
    var fileName = PROTO_FILE.split('/').last;
    var fileNameNoExt = fileName.split('.').first;

    // Generate Dart code for the current .proto file
    Process.runSync('protoc', [
      '--dart_out=$OUT_DIR',
      '--proto_path=$SRC_DIR',
      PROTO_FILE,
    ]);
  }

  print("Dart code generation completed in $OUT_DIR");
}
