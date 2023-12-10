import 'dart:io';

void main() {
  // Root directory of app
  String rootDir = Process.runSync('git', ['rev-parse', '--show-toplevel'])
      .stdout
      .trim();

  // Directory holding all .proto files
  String srcDir = '$rootDir/libs/core/src/proto/src';

  // Directory to write generated code (.dart files)
  String outDir = '$rootDir/libs/core/src/proto/generated_dart';

  // Clean all existing generated files
  Process.runSync('rm', ['-rf', outDir]);
  Process.runSync('mkdir', ['-p', outDir]);

  // Find all .proto files
  List<String> protoFiles =
      Process.runSync('find', [srcDir, '-name', '*.proto'])
          .stdout
          .trim()
          .split('\n')
          .map((file) => file.trim())
          .toList();

  // Count the total number of .proto files
  int totalFiles = protoFiles.length;

  // Counter for completed files
  int completedFiles = 0;

  // Colors for formatting
  String green = '\x1B[0;32m';
  String yellow = '\x1B[1;33m';
  String nc = '\x1B[0m'; // No Color

  print('${yellow}Generating Dart Files...$nc');

  // Start time for measuring elapsed time
  int startTime = DateTime.now().millisecondsSinceEpoch;

  // Iterate over each .proto file
  for (String protoFile in protoFiles) {
    String fileName = protoFile.split('/').last;
    String fileNameNoExt = fileName.split('.').first;

    print('${green}Processing $fileName...$nc');

    // Generate code for the current .proto file with various options
    Process.runSync('protoc', [
      '--dart_out=$outDir',
      '--proto_path=$srcDir',
      protoFile,
    ]);

    // Increment completed files counter
    completedFiles++;
  }

  print(
      '\n${yellow}Generation completed for $completedFiles out of $totalFiles files.$nc');

  // Display the time taken
  int endTime = DateTime.now().millisecondsSinceEpoch;
  int elapsedTime = (endTime - startTime) ~/ 1000; // Convert to seconds
  print('${yellow}Time taken: $elapsedTime seconds.$nc');
}
