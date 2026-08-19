import { useState, useRef, useEffect, type ReactElement } from "react";
import Filesystem from "../../../tools/filesystem";
import TermOutput from "./TermOutput";
import PromptInput from "./PromptInput";

import Neofetch from "./programs/Neofetch";
import Ping from "./programs/Ping";
import Bash from "./programs/Bash";
import Node from "./programs/Node";
import Help from "./programs/Help";
import Ls from "./programs/Ls";
import Cd from "./programs/Cd";
import Touch from "./programs/Touch";
import Cat from "./programs/Cat";
import Mkdir from "./programs/Mkdir";
import Program from "./programs/Program";
import type { ProgramWindowProps } from "../../../types";

function Terminal({
  setFilesystem,
  filesystem,
  onTop,
  close,
}: ProgramWindowProps) {
  const [path, setPath] = useState("/home/jack");
  const getDirName = (currentPath: string) => {
    if (currentPath === "/home/jack") return "~";
    return Filesystem.parseTree(currentPath).pop() || "/";
  };

  //Terminal output handling
  const [bashHistory, setBashHistory] = useState<ReactElement[]>([]);
  const print = (text: string) => {
    setBashHistory((history) => [
      ...history,
      <TermOutput key={history.length}>{text.toString()}</TermOutput>,
    ]);
  };
  const promptContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const div = promptContainer.current;
    if (!div) return;
    div.scrollTop = div.scrollHeight;
  });

  //Programs handling
  const [runningProgram, setRunningProgram] = useState<Program | null>(null);
  const defaultProgramExit = () => {
    setRunningProgram(null);
  };
  const ping = new Ping(print, defaultProgramExit);
  const node = new Node(print, defaultProgramExit);
  const neofetch = new Neofetch(print, defaultProgramExit);
  const help = new Help(print, defaultProgramExit);
  const ls = new Ls(print, defaultProgramExit, filesystem, path);
  const cd = new Cd(print, defaultProgramExit, filesystem, path, setPath);
  const cat = new Cat(print, defaultProgramExit, filesystem, path);
  const touch = new Touch(
    print,
    defaultProgramExit,
    path,
    filesystem,
    setFilesystem
  );
  const mkdir = new Mkdir(
    print,
    defaultProgramExit,
    path,
    filesystem,
    setFilesystem
  );

  const programs: Record<string, Program> = {
    ping,
    node,
    neofetch,
    help,
    ls,
    cd,
    touch,
    cat,
    mkdir,
  };

  const startProgram = (program: Program, args: string[]) => {
    setRunningProgram(program);
    program.onStart(args);
  };
  const running =
    runningProgram ||
    new Bash(print, close, programs, startProgram, getDirName(path), () => {
      setBashHistory([]);
    });

  //Mobile keyboard handling
  const hiddenInput = useRef<HTMLInputElement>(null);

  return (
    <div
      ref={promptContainer}
      style={{
        backgroundColor: "black",
        flexGrow: 1,
        paddingLeft: 10,
        color: "white",
        overflow: "scroll",
        overflowX: "hidden",
        marginTop: -20,
      }}
    >
      <input
        ref={hiddenInput}
        type="text"
        style={{
          height: 0,
          width: 0,
          padding: 0,
          margin: 0,
          opacity: 0,
          position: "relative",
        }}
      />
      {bashHistory.map((otp, i) => (
        <div key={i}>{otp}</div>
      ))}
      <div>
        {running.promptEnabled && (
          <div
            onClick={() => {
              hiddenInput.current?.focus();
            }}
          >
            <PromptInput onTop={onTop} running={running} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Terminal;
