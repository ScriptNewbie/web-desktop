const createRunningProgram = (pid, program, zIndex) => {
  return {
    pid: pid,
    id: program.id,
    name: program.name,
    icon: program.icon,
    component: program.component,
    minimised: false,
    width: program.width,
    height: program.height,
    minWidth: program.minWidth,
    minHeight: program.minHeight,
    allowMultipleInstances: program.allowMultipleInstances,
    zIndex: zIndex,
  };
};

export default createRunningProgram;
