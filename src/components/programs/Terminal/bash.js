class Bash {
  constructor(output, exit, programs, startProgram, dirname, clearTerminal) {
    this.prompt = "jack@zettawhit " + dirname + " #";
    this.promptEnabled = true;
    this.commandInterpreter = (command) => {
      if (!command) return output("");
      if (command === "clear") return clearTerminal();
      if (command === "exit") return exit();
      //if (command === "ls") return ls();
      //if (command.startsWith("cd")) return cd(command.split(" ")[1] || "/");
      const executedLine = command.split(" ");
      if (executedLine[0] in programs)
        return startProgram(programs[executedLine[0]], executedLine.slice(1));

      output("Command not found: " + executedLine[0]);
    };

    this.onStart = (args) => {};
  }
}

export default Bash;
