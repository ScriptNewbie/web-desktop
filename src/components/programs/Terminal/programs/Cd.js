import Program from "./Program";
import Filesystem from "../../../../tools/filesystem";

class Cd extends Program {
  constructor(output, exit, filesystem, path, setPath) {
    super();

    this.onStart = (args) => {
      let navigatePath = args[0];
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
