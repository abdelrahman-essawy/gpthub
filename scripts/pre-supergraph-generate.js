const fs = require('fs');
const yaml = require('js-yaml');

// Function to update the file content
function updateFileContent(filePath, searchString, replaceString) {
  try {
    let data = fs.readFileSync(filePath, 'utf8');
    const updatedContent = data.replace(searchString, replaceString);
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`File ${filePath} updated successfully.`);
  } catch (err) {
    console.error(`Error updating file ${filePath}:`, err);
  }
}

// Load the YAML file
const yamlFilePath = 'apps/backend/router/supergraph.prod.yaml';
try {
  const yamlData = fs.readFileSync(yamlFilePath, 'utf8');
  // Parse the YAML data
  const parsedYaml = yaml.load(yamlData);

  // Extract paths from YAML and update files
  Object.values(parsedYaml.subgraphs).forEach((subgraph) => {
    const schemaFilePath = subgraph.schema.file;
    const searchString = /type UserDto {/g;
    const replaceString = 'type UserDto @key(fields: "id") {';
    updateFileContent(schemaFilePath, searchString, replaceString);
  });
} catch (err) {
  console.error(`Error reading YAML file ${yamlFilePath}:`, err);
}
