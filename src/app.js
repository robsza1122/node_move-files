/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveAndRenameFile() {
  const args = process.argv.slice(2);

  const [sourcePath, newSourcePath] = args;

  if (args.length !== 2) {
    throw new Error('source path or destination path is not provided');
  }

  if (!fs.existsSync(sourcePath)) {
    throw new Error('This source does not exist');
  }

  if (sourcePath === newSourcePath) {
    return;
  }

  const fileStats = fs.statSync(sourcePath);

  if (!fileStats) {
    throw new Error('Source path does not exist');
  }

  if (!fileStats.isFile()) {
    throw new Error('Destination path is not a file');
  }

  const isDirectory = newSourcePath.endsWith('/');

  let targetDirectory;

  if (isDirectory) {
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`This directory does not exist`);
    }
  } else {
    if (
      fs.existsSync(newSourcePath) &&
      fs.statSync(newSourcePath).isDirectory()
    ) {
      const fileName = path.basename(sourcePath);

      const newPath = path.join(newSourcePath, fileName);

      targetDirectory = newPath;
    } else {
      targetDirectory = newSourcePath;
    }
  }

  try {
    fs.renameSync(sourcePath, targetDirectory);
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

try {
  moveAndRenameFile();
} catch (error) {
  console.error(`Error: ${error.message}`);
}
