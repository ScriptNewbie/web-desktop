import Program from "./Program";

class Bash extends Program {
  constructor(
    output: (text: string) => void,
    exit: () => void,
    programs: Record<string, Program>,
    startProgram: (program: Program, args: string[]) => void,
    dirname: string,
    clearTerminal: () => void
  ) {
    super();
    this.prompt = "jack@zettawhit " + dirname + " #";
    this.promptEnabled = true;
    this.commandInterpreter = (command) => {
      output(this.prompt + " " + command);
      if (command === "") return;
      if (command === "clear") return clearTerminal();
      if (command === "exit") return exit();
      const [program, ...args] = command.split(" ");
      if (!program) return;
      const selected = programs[program];
      if (selected) return startProgram(selected, args);
      output("Command not found: " + program);
    };
  }
}

export default Bash;
