import Program from "./Program";
import Filesystem from "../../../../tools/filesystem";
import type { DirectoryNode } from "../../../../tools/filesystem";

class Ls extends Program {
  constructor(
    output: (text: string) => void,
    exit: () => void,
    filesystem: DirectoryNode,
    path: string
  ) {
    super();

    this.onStart = (args) => {
      const lsPath = args[0] ?? ".";

      const { pathExists, isDirectory, content } = Filesystem.getPathContent(
        filesystem,
        path,
        lsPath
      );

      if (pathExists && isDirectory) output(Object.keys(content).join(" "));
      return exit();
    };
  }
}

export default Ls;
