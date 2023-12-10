import 'dart:io';

void main() {
  // Root directory of the Dart app
  var rootDir = Process.runSync('git', ['rev-parse', '--show-toplevel']);
  var ROOT_DIR = rootDir.stdout.trim();

  // Path to protoc-gen-dart binary
  var PROTOC_GEN_DART_PATH = "${ROOT_DIR}/path/to/protoc-gen-dart";

  // Directory holding all .proto files
  var SRC_DIR = "${ROOT_DIR}/src";

  // Directory to write generated Dart code
  var OUT_DIR = "${ROOT_DIR}/build/gen";

  // Clean all existing generated files
  Process.runSync('rm', ['-rf', OUT_DIR]);
  Process.runSync('mkdir', ['-p', OUT_DIR]);

  // List of .proto files
  var protoFiles = ["foo.proto", "bar/baz.proto"];

  // Generate Dart code for the specified .proto files
  for (var protoFile in protoFiles) {
    var protoPath = "$SRC_DIR/$protoFile";
    var outputFilePath = "$OUT_DIR/${protoFile.replaceAll('.proto', '.pb.dart')}";

    Process.runSync('protoc', [
      '--dart_out=$OUT_DIR',
      '--proto_path=$SRC_DIR',
      protoPath,
    ]);

    print("Generated Dart code for $protoPath to $outputFilePath");
  }

  print("Dart code generation completed in $OUT_DIR");
}
