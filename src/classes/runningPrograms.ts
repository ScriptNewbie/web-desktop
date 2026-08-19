import type { DesktopProgram, RunningProgram } from "../types";

const DEFAULT_MIN_WIDTH = 280;
const DEFAULT_MIN_HEIGHT = 100;

const createRunningProgram = (
  pid: number,
  program: DesktopProgram,
  zIndex: number
): RunningProgram => {
  return {
    pid: pid,
    id: program.id,
    name: program.name,
    icon: program.icon,
    component: program.component,
    minimised: false,
    width: program.width,
    height: program.height,
    minWidth: program.minWidth ?? DEFAULT_MIN_WIDTH,
    minHeight: program.minHeight ?? DEFAULT_MIN_HEIGHT,
    allowMultipleInstances: program.allowMultipleInstances,
    zIndex: zIndex,
  };
};

export default createRunningProgram;
