export type FileNode = {
  type: "file";
  content: string;
};

export type DirectoryNode = {
  type: "directory";
  content: Record<string, FilesystemNode>;
};

export type FilesystemNode = FileNode | DirectoryNode;

export type PathContentResult =
  | {
      pathExists: true;
      fullPath: string;
      isDirectory: true;
      content: Record<string, FilesystemNode>;
    }
  | {
      pathExists: true;
      fullPath: string;
      isDirectory: false;
      content: string;
    }
  | {
      pathExists: false;
      fullPath: string;
      isDirectory: null;
      content: null;
    };

type FilesystemCursor = {
  path: DirectoryNode;
};

const parseTree = (path: string): string[] => {
  const parsedTree = path.split("/").filter((str) => str !== "");
  return parsedTree;
};

const pathFromTree = (tree: string[]): string => {
  return "/" + tree.join("/");
};

const cloneFilesystem = (filesystem: DirectoryNode): DirectoryNode => {
  return JSON.parse(JSON.stringify(filesystem)) as DirectoryNode;
};

const navigateToPath = (
  filesystem: FilesystemCursor,
  path: string
): { pathExists: boolean } => {
  const parsedTree = parseTree(path);
  let pathExists = true;
  parsedTree.forEach((segment) => {
    const child = filesystem.path.content[segment];
    if (child && child.type === "directory") {
      filesystem.path = child;
      return;
    }
    pathExists = false;
  });
  return { pathExists };
};

const getFullPath = (
  currentFullPath: string,
  targetRelativeOrFullPath: string
): string => {
  if (targetRelativeOrFullPath.startsWith("~")) {
    targetRelativeOrFullPath = targetRelativeOrFullPath.replace(
      "~",
      "/home/jack"
    );
  }
  if (targetRelativeOrFullPath.startsWith("/")) {
    return targetRelativeOrFullPath;
  }
  console.log(targetRelativeOrFullPath);
  const currentTree = parseTree(currentFullPath);
  const targetTree = parseTree(targetRelativeOrFullPath);
  for (const element of targetTree) {
    if (element === "..") {
      currentTree.pop();
    } else if (element === ".") {
      continue;
    } else {
      currentTree.push(element);
    }
  }

  return "/" + currentTree.join("/");
};

const getPathContent = (
  filesystem: DirectoryNode,
  currentFullPath: string,
  targetRelativeOrFullPath = "."
): PathContentResult => {
  const filesystemCopy = cloneFilesystem(filesystem);
  const current: FilesystemCursor = { path: filesystemCopy };
  const fullPath = getFullPath(currentFullPath, targetRelativeOrFullPath);
  const parentDirectoryTree = parseTree(fullPath);
  const name =
    parentDirectoryTree.length > 0 ? parentDirectoryTree.pop() : undefined;

  const { pathExists: parentFolderExists } = navigateToPath(
    current,
    pathFromTree(parentDirectoryTree)
  );

  const object = name ? current.path.content[name] : current.path;
  if (!parentFolderExists || !object) {
    return {
      pathExists: false,
      fullPath,
      isDirectory: null,
      content: null,
    };
  }

  if (object.type === "directory") {
    return {
      pathExists: true,
      fullPath,
      isDirectory: true,
      content: object.content,
    };
  }

  return {
    pathExists: true,
    fullPath,
    isDirectory: false,
    content: object.content,
  };
};

const createInFileSystem = (
  filesystem: DirectoryNode,
  currentFullPath: string,
  targetRelativeOrFullPath: string,
  type: "file" | "directory",
  content: string | Record<string, FilesystemNode> = {}
): { success: boolean; newFilesystem: DirectoryNode } => {
  const newFilesystem = cloneFilesystem(filesystem);
  const current: FilesystemCursor = { path: newFilesystem };

  const fullPath = getFullPath(currentFullPath, targetRelativeOrFullPath);
  const parentDirectoryTree = parseTree(fullPath);
  const name =
    parentDirectoryTree.length > 1 ? parentDirectoryTree.pop() : undefined;

  let success = false;
  if (name) {
    const { pathExists } = navigateToPath(
      current,
      pathFromTree(parentDirectoryTree)
    );
    if (pathExists) {
      current.path.content[name] =
        type === "directory"
          ? {
              type: "directory",
              content:
                typeof content === "object" && content !== null
                  ? content
                  : {},
            }
          : {
              type: "file",
              content: typeof content === "string" ? content : "",
            };
      success = true;
    }
  }
  return { success, newFilesystem };
};

const removeFromFileSystem = (
  filesystem: DirectoryNode,
  currentFullPath: string,
  targetRelativeOrFullPath: string
): { success: boolean; newFilesystem: DirectoryNode } => {
  const newFilesystem = cloneFilesystem(filesystem);
  const current: FilesystemCursor = { path: newFilesystem };

  const fullPath = getFullPath(currentFullPath, targetRelativeOrFullPath);
  const parentDirectoryTree = parseTree(fullPath);
  const name =
    parentDirectoryTree.length > 1 ? parentDirectoryTree.pop() : undefined;

  const { pathExists } = navigateToPath(
    current,
    pathFromTree(parentDirectoryTree)
  );

  if (name && pathExists) {
    if (current.path.content[name]) delete current.path.content[name];
  }

  return { success: pathExists, newFilesystem };
};

const Filesystem = {
  getPathContent,
  createInFileSystem,
  removeFromFileSystem,
  parseTree,
};

export const initialFilesystem: DirectoryNode = {
  type: "directory",
  content: {
    home: {
      type: "directory",
      content: {
        jack: {
          type: "directory",
          content: {
            file: { type: "file", content: "Text file" },
            directory: { type: "directory", content: {} },
            "hello-world.js": {
              type: "file",
              content: "console.log('Hello World!')",
            },
            "about-me.txt": {
              type: "file",
              content: "I'm Jack, a full-stack developer.",
            },
          },
        },
      },
    },
  },
};

export default Filesystem;
