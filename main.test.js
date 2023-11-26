const { processArgs } = require('./main');

test('processArgs works with -h', () => {
  const argv = ['-h'];
  const expected = {h: true};
  expect(processArgs(argv)).toMatchObject(expected); // toMatchObject checks if the object has all the properties and values of the expected object
});

test('processArgs works with --help -t', () => {
  const argv = ['--help', '-t'];
  const expected = {help: true,
                    t: true};
  expect(processArgs(argv)).toMatchObject(expected); // toMatchObject checks if the object has all the properties and values of the expected object
});

test('processArgs works with -p --save=false --interactive', () => {
  const argv = ['-p', '--save=false', '--interactive'];
  const expected = {p: true,
                    save: 'false',
                    interactive: true};
  expect(processArgs(argv)).toMatchObject(expected); // toMatchObject checks if the object has all the properties and values of the expected object
});

test('processArgs invalid args with -save= logs error and exits', () => {
  const argv = ['--save='];
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
  const mockLog = jest.spyOn(console, 'log');
  processArgs(argv);
  expect(mockExit).toHaveBeenCalledWith(1);
  expect(mockLog).toHaveBeenCalledWith("It seems you forget to specify argument!");
});