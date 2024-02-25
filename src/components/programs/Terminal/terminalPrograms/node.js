function evalWithVariables(code) {
  const evalFunction = new Function(`return ${code}`);
  return evalFunction();
}

class Node {
  constructor(output, exit) {
    this.prompt = "> ";
    this.promptEnabled = true;
    this.commandInterpreter = (command) => {
      output(this.prompt + " " + command);
      if (command === "exit") {
        return exit();
      }
      if (command === ".help") {
        return output(
          "It uses yours browser's JS engine to evaluate expressions.\nIt might not work properly and crash entire app or even browser!\nTo declare variable don't type const, let or var just eg. a = 2!\nType \"exit\" to exit!"
        );
      }
      try {
        if (command.startsWith("console.log")) {
          command = command.substring(12, command.length - 1);
        }
        const result = evalWithVariables(command);
        output(`${result}`);
      } catch (error) {
        output(error.toString());
      }
    };

    this.onStart = (args) => {
      output("Welcome to ZettaNode.js v7.12");
      output('Type ".help" for more information.');
    };
  }
}

export default Node;
