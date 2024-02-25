import Program from "./Program";
import Filesystem from "../../../../tools/filesystem";

class Cd extends Program {
  constructor(output, exit, filesystem, path, setPath) {
    super();

    this.onStart = (args) => {
      let navigatePath = args[0];
      if (!navigatePath) return exit();

      let cleanPath = Filesystem.getCleanPath(path);
      if (cleanPath !== "/") cleanPath += "/";

      if (navigatePath.startsWith("..")) {
        const tree = Filesystem.parseTree(path);
        if (tree.length > 0)
          navigatePath = "/" + tree.slice(0, -1).join("/") + "/";
        else return exit();
      }
      if (!navigatePath.startsWith("/")) {
        navigatePath = cleanPath + navigatePath;
      }

      const { pathExists } = Filesystem.getPathContent(
        filesystem,
        navigatePath
      );
      if (pathExists) {
        setPath(navigatePath);
        return exit();
      }
      output("This path does not exist!");
      exit();
    };
  }
}

export default Cd;
