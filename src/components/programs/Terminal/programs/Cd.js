import Program from "./Program";
import Filesystem from "../../../../tools/filesystem";

class Cd extends Program {
  constructor(output, exit, filesystem, path, setPath) {
    super();

    this.onStart = (args) => {
      let navigatePath = args[0];
      if (!path.endsWith("/")) path += "/";
      if (!navigatePath) return exit();
      if (navigatePath.startsWith("..")) {
        const tree = path.split("/");
        if (tree.length > 2)
          navigatePath = path.split("/").slice(0, -2).join("/") + "/";
        else return exit();
      }
      if (!navigatePath.startsWith("/")) {
        navigatePath = path + navigatePath;
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
