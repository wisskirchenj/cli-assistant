const {createDir, fileExists, removeDir, isFolder, fileSizekB, diskUsage, listWorkingDir } = require('./file_actions');
const mockLog = jest.spyOn(console, 'log').mockImplementation(value => value);
const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

test('fileExists works for existing file', async () => {
    const path = 'file_actions.js';
    await fileExists(path);
    expect(mockLog).toHaveBeenCalledWith(`The file ${path} exists!`);
  });

test('fileExists works for non existing file', async () => {
  const path = 'fake.js';
  await fileExists(path);
  expect(mockLog).toHaveBeenCalledWith(`The file ${path} doesn't exist!`);
});

test('createDir works for simple folder', async () => {
  const path = 'testDir';
  await createDir(path);
  expect(mockLog).toHaveBeenCalledWith(`The folder ${path} was created!`);
});

test('removeDir works for simple folder', async () => {
  const path = 'testDir';
  await removeDir(path);
  expect(mockLog).toHaveBeenCalledWith(`The folder ${path} was deleted!`);
});

test('createDir works for sub folder', async () => {
  const path = 'tmp/subDir';
  await createDir(path);
  expect(mockLog).toHaveBeenCalledWith(`The folders ${path} were created!`);
});

test('removeDir works for sub folder', async () => {
  const path = 'tmp/subDir';
  await removeDir(path);
  expect(mockLog).toHaveBeenCalledWith("The folder tmp in subDir folder was deleted!");
});

test('removeDir errors for non existing folder', async () => {
  const path = 'fake';
  await removeDir(path);
  expect(mockLog).toHaveBeenCalledWith("This fake folder doesn't exist!");
});

test('isFolder works for folder', async () => {
  const path = 'node_modules';
  await isFolder(path);
  expect(mockLog).toHaveBeenCalledWith(`The ${path} is a folder!`);
});

test('isFolder works for file', async () => {
  const path = 'file_actions.js';
  await isFolder(path);
  expect(mockLog).toHaveBeenCalledWith(`The ${path} is not a folder!`);
});

test('isFolder errors for non existing folder', async () => {
  const path = 'fake';
  await isFolder(path);
  expect(mockLog).toHaveBeenCalledWith("It seems that some specified files don't exist!");
});

test('fileSizekB works for file', async () => {
  const path = '.gitignore';
  const size = await fileSizekB(path);
  expect(size).toBeGreaterThan(0.02);
  expect(size).toBeLessThan(0.03);
});

test('fileSizekB errors for non existing file', async () => {
  const path = 'fake';
  await fileSizekB(path);
  expect(mockLog).toHaveBeenCalledWith("It seems that some specified files don't exist!");
});

test('diskUsage works for file', async () => {
  const path = '.gitignore';
  await diskUsage(path);
  expect(mockLog).toHaveBeenCalledWith(`The size of the specified files is 0 kilobytes`);
});

test('diskUsage works for multiple files', async () => {
  const path = '.gitignore-README.MD';
  await diskUsage(path);
  expect(mockLog).toHaveBeenCalledWith(`The size of the specified files is 1.1 kilobytes`);
});

test('listWorkingDir works for current folder', async () => {
  jest.spyOn(process, "cwd").mockImplementation(() => '.github');
  await listWorkingDir();
  expect(mockLog).toHaveBeenCalledWith('workflows');
});