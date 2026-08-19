import Program from "./Program";
import Filesystem from "../../../../tools/filesystem";
import type { DirectoryNode } from "../../../../tools/filesystem";

class Cd extends Program {
  constructor(
    output: (text: string) => void,
    exit: () => void,
    filesystem: DirectoryNode,
    path: string,
    setPath: (path: string) => void
  ) {
    super();

    this.onStart = (args) => {
      const navigatePath = args[0];
      if (!navigatePath) return exit();

      const { pathExists, isDirectory, fullPath } = Filesystem.getPathContent(
        filesystem,
        path,
        navigatePath
      );

      if (pathExists && isDirectory) {
        setPath(fullPath);
        return exit();
      }
      output("This path does not exist!");
      exit();
    };
  }
}

export default Cd;
