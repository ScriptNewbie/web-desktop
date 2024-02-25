class Bash {
  constructor(output, exit, programs, startProgram, dirname, clearTerminal) {
    this.prompt = "jack@zettawhit " + dirname + " #";
    this.promptEnabled = true;
    this.commandInterpreter = (command) => {
      output(this.prompt + " " + command);
      if (command === "") return;
      if (command === "clear") return clearTerminal();
      if (command === "exit") return exit();
      const [program, ...args] = command.split(" ");
      if (program in programs) return startProgram(programs[program], args);
      output("Command not found: " + program);
    };

    this.onStart = (args) => {};
  }
}

export default Bash;
