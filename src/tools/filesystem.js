const parseTree = (path) => {
  const parsedTree = path.split("/").filter((str) => str !== "");
  return parsedTree;
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

const getPathContent = (filesystem, path) => {
  const filesystemCopy = JSON.parse(JSON.stringify(filesystem));
  const current = { path: filesystemCopy };

  const { pathExists } = navigateToPath(current, path);
  return { pathExists, content: current.path.content };
};

const createInFileSystem = (filesystem, path, type, name, content = {}) => {
  const newFilesystem = JSON.parse(JSON.stringify(filesystem));
  const current = { path: newFilesystem };
  const { pathExists } = navigateToPath(current, path);
  if (pathExists) {
    current.path.content[name] = { content, type };
  }

  return { success: pathExists, newFilesystem };
};

const removeFromFileSystem = (filesystem, path, name) => {
  const newFilesystem = JSON.parse(JSON.stringify(filesystem));
  const current = { path: newFilesystem };
  const { pathExists } = navigateToPath(current, path);
  if (pathExists) {
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
  content: {
    home: {
      type: "directory",
      content: {
        file: { type: "file", content: "Text file" },
        directory: { type: "directory", content: {} },
      },
    },
  },
};

export default Filesystem;