class Program {
  prompt = "";
  promptEnabled = false;
  commandInterpreter: (command: string) => void = () => {};
  onStart: (args: string[]) => void = () => {};
}

export default Program;
