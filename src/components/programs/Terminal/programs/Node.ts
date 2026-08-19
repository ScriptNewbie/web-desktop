import Program from "./Program";

class Node extends Program {
  constructor(output: (text: string) => void, exit: () => void) {
    super();

    this.expressionEvaluator = (code) => {
      //Do not add returns inside loops or functions
      code = code.replace(
        /for\s*\(.*?\)|while\s*\(.*?\)|do\s*{[^}]*}/g,
        (match) => {
          return match.replace(/;/g, "***");
        }
      );

      code = code.replace(/function\s*\([^)]*\)\s*{[^}]*}/g, (match) => {
        return match.replace(/;/g, "***");
      });

      code = code.replace(
        /(\([^)]*\)\s*=>\s*{[^}]*})|(\([^)]*\)\s*=>\s*[^{]*)/g,
        (match) => {
          return match.replace(/;/g, "***");
        }
      );

      const codeLines = code.split(";").filter((line) => line.trim() !== "");
      let lastLine = codeLines.pop() ?? "";
      lastLine = lastLine.trim();

      const nonReturnable = [
        "for",
        "while",
        "if",
        "let",
        "const",
        "var",
        "yield",
        "do",
        "continue",
        "break",
        "return",
      ];

      if (!nonReturnable.some((keyword) => lastLine.startsWith(keyword))) {
        lastLine = `return ${lastLine}`;
      }
      codeLines.push(lastLine);

      code = codeLines.join(";");
      code = code.replace(/\*\*\*/g, ";");

      const evalFunction = new Function("console", `${code}`) as (
        consoleObj: { log: (msg: unknown) => void }
      ) => unknown;
      return evalFunction({
        log: (msg) => {
          output("  " + String(msg));
        },
      });
    };

    this.prompt = ">";
    this.promptEnabled = true;
    this.commandInterpreter = (command) => {
      output(this.prompt + " " + command);
      if (command === "") {
        return;
      }

      if (command === "exit") {
        return exit();
      }
      if (command === ".help") {
        return output(
          'It uses yours browser\'s JS engine to evaluate expressions.\nIt might not work properly and crash entire app or even browser!\nAll variables are added to window!\nType "exit" to exit!'
        );
      }
      try {
        command = command.replace(/let|const|var/, "");
        const result = this.expressionEvaluator(command);
        output(`< ${String(result)}`);
      } catch (error: unknown) {
        output(String(error));
      }
    };

    this.onStart = () => {
      output("Welcome to ZettaNode.js v7.12");
      output('Type ".help" for more information.');
    };
  }

  expressionEvaluator: (code: string) => unknown;
}

export default Node;
