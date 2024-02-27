const parseTree = (path) => {
  const parsedTree = path.split("/").filter((str) => str !== "");
  return parsedTree;
};

const pathFromTree = (tree) => {
  return "/" + tree.join("/");
};

const navigateToPath = (filesystem, path) => {
  const parsedTree = parseTree(path);
  let pathExists = true;
  parsedTree.forEach((path) => {
    if (
      filesystem.path.content[path] &&
      filesystem.path.content[path].type === "directory"
    ) {
      filesystem.path = filesystem.path.content[path];
      return;
    }
    pathExists = false;
  });
  return { pathExists };
};

const getFullPath = (currentFullPath, targetRelativeOrFullPath) => {
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
  for (let element of targetTree) {
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
  filesystem,
  currentFullPath,
  targetRelativeOrFullPath = "."
) => {
  const filesystemCopy = JSON.parse(JSON.stringify(filesystem));
  const current = { path: filesystemCopy };
  const fullPath = getFullPath(currentFullPath, targetRelativeOrFullPath);
  const parentDirectoryTree = parseTree(fullPath);
  const name =
    parentDirectoryTree.length > 0 ? parentDirectoryTree.pop() : null;

  const { pathExists: parentFolderExists } = navigateToPath(
    current,
    pathFromTree(parentDirectoryTree)
  );

  let pathExists = false;
  const object = name ? current.path.content[name] : current.path;
  if (parentFolderExists && object) pathExists = true;
  return {
    pathExists,
    fullPath,
    isDirectory: object ? object.type === "directory" : null,
    content: object ? object.content : null,
  };
};

const createInFileSystem = (
  filesystem,
  currentFullPath,
  targetRelativeOrFullPath,
  type,
  content = {}
) => {
  const newFilesystem = JSON.parse(JSON.stringify(filesystem));
  const current = { path: newFilesystem };

  const fullPath = getFullPath(currentFullPath, targetRelativeOrFullPath);
  const parentDirectoryTree = parseTree(fullPath);
  const name =
    parentDirectoryTree.length > 1 ? parentDirectoryTree.pop() : null;

  let success = false;
  if (name) {
    const { pathExists } = navigateToPath(
      current,
      pathFromTree(parentDirectoryTree)
    );
    if (pathExists) {
      current.path.content[name] = { content, type };
      success = true;
    }
  }
  return { success, newFilesystem };
};

const removeFromFileSystem = (
  filesystem,
  currentFullPath,
  targetRelativeOrFullPath
) => {
  const newFilesystem = JSON.parse(JSON.stringify(filesystem));
  const current = { path: newFilesystem };

  const fullPath = getFullPath(currentFullPath, targetRelativeOrFullPath);
  const parentDirectoryTree = parseTree(fullPath);
  const name =
    parentDirectoryTree.length > 1 ? parentDirectoryTree.pop() : null;

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

export const initialFilesystem = {
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
