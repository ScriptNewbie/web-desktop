class Program {
  constructor() {
    this.prompt = "";
    this.promptEnabled = false;
    this.commandInterpreter = (command) => {};
    this.onStart = (args) => {};
  }
}

export default Program;
