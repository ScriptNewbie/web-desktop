import Program from "./Program";
import Filesystem from "../../../../tools/filesystem";

class Ls extends Program {
  constructor(output, exit, filesystem, path) {
    super();

    this.onStart = (args) => {
      let lsPath = args[0];
      if (typeof lsPath === "undefined") {
        const { pathExists, content } = Filesystem.getPathContent(
          filesystem,
          path
        );
        if (pathExists) output(Object.keys(content).join(" "));
        return exit();
      }
      if (!lsPath.startsWith("/")) {
        lsPath = path + lsPath;
      }
      const { pathExists, content } = Filesystem.getPathContent(
        filesystem,
        lsPath
      );
      let result = "Path does not exist!";
      if (pathExists) {
        result = Object.keys(content).join(" ");
      }
      output(result);
      exit();
    };
  }
}

export default Ls;
