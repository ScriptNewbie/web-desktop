import Filesystem from "../../../../tools/filesystem";
import Program from "./Program";

class Cat extends Program {
  constructor(output, exit, filesystem, path) {
    super();
    this.onStart = (args) => {
      let outputString = "";
      if (args.length > 0) {
        for (let arg of args) {
          const { pathExists, isDirectory, content } = Filesystem.getContent(
            filesystem,
            path,
            arg
          );
          if (pathExists && !isDirectory) {
            outputString += content;
          } else {
            output(`File ${arg} does not exist!`);
            return exit();
          }
        }
      }
      output(outputString);
      exit();
    };
  }
}

export default Cat;
