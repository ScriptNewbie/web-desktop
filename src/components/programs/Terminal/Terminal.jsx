import React, { useState, useRef, useEffect } from "react";
import Filesystem from "../../../tools/filesystem";
import TermOutput from "./TermOutput";
import Prompt from "./prompt";

import Neofetch from "./terminalPrograms/neofetch";
import Ping from "./terminalPrograms/ping";
import Bash from "./terminalPrograms/bash";
import Node from "./terminalPrograms/node";
import Help from "./terminalPrograms/help";

function Terminal({ setFilesystem, filesystem, onTop, close }) {
  //Path handling
  const [path, setPath] = useState("/home/");
  const pathContent = Object.keys(
    Filesystem.getPathContent(filesystem, path).content
  );
  const getDirName = (path) => {
    return Filesystem.parseTree(path).pop() || "/";
  };

  //Terminal output handling
  const [bashHistory, setBashHistory] = useState([]);
  const print = (text) => {
    setBashHistory((bashHistory) => [
      ...bashHistory,
      <TermOutput>{text}</TermOutput>,
    ]);
  };
  const promptContainer = useRef(null);
  useEffect(() => {
    const div = promptContainer.current;
    div.scrollTop = div.scrollHeight;
  });

  //Programs handling
  const [runningProgram, setRunningProgram] = useState();
  const defaultProgramExit = () => {
    setRunningProgram(null);
  };
  const ping = new Ping(print, defaultProgramExit);
  const node = new Node(print, defaultProgramExit);
  const neofetch = new Neofetch(print, defaultProgramExit);
  const help = new Help(print, defaultProgramExit);
  const programs = { ping, node, neofetch, help };
  const startProgram = (program, args) => {
    setRunningProgram(program);
    program.onStart(args);
  };
  const running =
    runningProgram ||
    new Bash(print, close, programs, startProgram, getDirName(path), () => {
      setBashHistory([]);
    });

  //Mobile keyboard handling
  const hiddenInput = useRef(null);

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
              hiddenInput.current.focus();
            }}
          >
            <Prompt onTop={onTop} running={running} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Terminal;
