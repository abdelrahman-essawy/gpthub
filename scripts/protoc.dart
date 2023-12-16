import 'dart:io';

void main() {
  // Specify the path to the .proto file
  String protoFilePath = './libs/core/src/proto/src/auth/auth.proto';

  // Specify the output directory for generated Dart files
  String outputDirectory = './libs/core/src/proto/generated';

  // Run protoc command to generate Dart files
  Process.run(
    'protoc',
    [
      '--dart_out=grpc:$outputDirectory',
      '-I.',
      protoFilePath,
    ],
  ).then((ProcessResult results) {
    if (results.exitCode == 0) {
      print('Dart files generated successfully!');
    } else {
      print('Error generating Dart files:');
      print(results.stderr);
    }
  }).catchError((error) {
    print('Error generating Dart files:');
    print(error);
  });
}
