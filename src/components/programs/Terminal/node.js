const startNode = ({
  print,
  setPromptText,
  running,
  promptText,
  execCommand,
}) => {
  print("Welcome to ZettaNode.js v7.12");
  print('Type ".help" for more information.');
  setPromptText("> ");

  const node = (prompt) => {
    if (prompt === "exit") {
      running.current = { function: execCommand, name: "bash" };
      return setPromptText(promptText);
    }
    if (prompt === ".help") {
      return print(
        "It uses yours browser's JS engine to evaluate expressions.\nIt might not work properly and crash entire app or even browser!\nTo declare variable don't type const, let or var just eg. a = 2!\nType \"exit\" to exit!"
      );
    }
    try {
      if (prompt.startsWith("console.log")) {
        prompt = prompt.substring(12, prompt.length - 1);
        console.log(prompt);
      }
      const result = evalWithVariables(prompt);
      print(`${result}`);
    } catch (error) {
      print(error.toString());
    }
  };

  running.current = { function: node, name: "node" };
};

function evalWithVariables(code) {
  const evalFunction = new Function(`return ${code}`);
  return evalFunction();
}

export default startNode;
