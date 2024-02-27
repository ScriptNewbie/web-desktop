import Filesystem from "../../../../tools/filesystem";
import Program from "./Program";

class Touch extends Program {
  constructor(output, exit, path, filesystem, setFilesystem) {
    super();
    this.onStart = (args) => {
      if (args.length > 0) {
        args.forEach((arg) => {
          const { success, newFilesystem } = Filesystem.createInFileSystem(
            filesystem,
            path,
            "file",
            arg
          );
          if (success) {
            setFilesystem(newFilesystem);
          } else {
            output("Unexpected error occured!");
          }
        });
      } else {
        output("Specify file name!");
      }
      exit();
    };
  }
}

export default Touch;
