import type { ComponentType, Dispatch, MouseEvent, SetStateAction } from "react";
import type { DirectoryNode } from "./tools/filesystem";

export type ProgramWindowProps = {
  filesystem: DirectoryNode;
  setFilesystem: Dispatch<SetStateAction<DirectoryNode>>;
  onTop: boolean;
  width: number;
  height: number;
  close: (event?: MouseEvent<Element>) => void;
};

export type DesktopProgram = {
  id: number;
  name: string;
  icon: string;
  component: ComponentType<ProgramWindowProps>;
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  allowMultipleInstances: boolean;
};

export type RunningProgram = {
  pid: number;
  id: number;
  name: string;
  icon: string;
  component: ComponentType<ProgramWindowProps>;
  minimised: boolean;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  allowMultipleInstances: boolean;
  zIndex: number;
};

export type ProgramProps = {
  filesystem: DirectoryNode;
  setFilesystem: Dispatch<SetStateAction<DirectoryNode>>;
};
