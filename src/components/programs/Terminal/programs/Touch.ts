import Filesystem from "../../../../tools/filesystem";
import type { DirectoryNode } from "../../../../tools/filesystem";
import Program from "./Program";

class Touch extends Program {
  constructor(
    output: (text: string) => void,
    exit: () => void,
    path: string,
    filesystem: DirectoryNode,
    setFilesystem: (filesystem: DirectoryNode) => void
  ) {
    super();
    this.onStart = (args) => {
      if (args.length > 0) {
        args.forEach((arg) => {
          const { success, newFilesystem } = Filesystem.createInFileSystem(
            filesystem,
            path,
            arg,
            "file",
            ""
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
