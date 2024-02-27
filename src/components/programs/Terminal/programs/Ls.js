import Program from "./Program";
import Filesystem from "../../../../tools/filesystem";

class Ls extends Program {
  constructor(output, exit, filesystem, path) {
    super();

    this.onStart = (args) => {
      let lsPath = args[0];

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
