import Filesystem from "../../../../tools/filesystem";
import Program from "./Program";

class Mkdir extends Program {
  constructor(output, exit, path, filesystem, setFilesystem) {
    super();
    this.onStart = (args) => {
      if (args.length > 0) {
        args.forEach((arg) => {
          const { success, newFilesystem } = Filesystem.createInFileSystem(
            filesystem,
            path,
            arg,
            "directory"
          );
          if (success) {
            setFilesystem(newFilesystem);
          } else {
            output("Unexpected error occured!");
          }
        });
      } else {
        output("Specify directory name!");
      }
      exit();
    };
  }
}

export default Mkdir;
