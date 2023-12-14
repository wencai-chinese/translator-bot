import * as fs from 'fs';
import * as path from 'path';

const filename = 'tally.json';

// Function to read the JSON file
function readJsonFile(): any {
  try {
    const filePath = path.join(__dirname, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading the file:', (error as Error).message);
    return null;
  }
}

// Function to update a key in the JSON file
function updateJsonKey(key: string, newValue: any): void {
  try {
    const filePath = path.join(__dirname, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Update the key with the new value
    data[key] = newValue;

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Key '${key}' updated successfully.`);
  } catch (error) {
    console.error('Error updating the file:', (error as Error).message);
  }
}
