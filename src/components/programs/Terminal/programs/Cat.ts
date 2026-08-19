import Filesystem from "../../../../tools/filesystem";
import type { DirectoryNode } from "../../../../tools/filesystem";
import Program from "./Program";

class Cat extends Program {
  constructor(
    output: (text: string) => void,
    exit: () => void,
    filesystem: DirectoryNode,
    path: string
  ) {
    super();
    this.onStart = (args) => {
      let outputString = "";
      if (args.length > 0) {
        for (const arg of args) {
          const { pathExists, isDirectory, content } =
            Filesystem.getPathContent(filesystem, path, arg);
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
