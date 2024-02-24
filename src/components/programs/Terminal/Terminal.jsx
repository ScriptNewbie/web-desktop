import React, { useState, useRef, useEffect } from "react";
import Filesystem from "../../../tools/filesystem";
import Neofetch from "./neofetch";
import Ping from "./ping";
import TermOutput from "./TermOutput";
import Bash from "./bash";
import Node from "./node";
import Help from "./help";

function Terminal({ setFilesystem, filesystem, onTop: currentOnTop, close }) {
  const onTop = useRef(currentOnTop);
  const [path, setPath] = useState("/home/");
  const [bashHistory, setBashHistory] = useState([]);
  const pathContent = Object.keys(
    Filesystem.getPathContent(filesystem, path).content
  );
  const getDirName = (path) => {
    return Filesystem.parseTree(path).pop() || "/";
  };

  const print = (text) => {
    setBashHistory((bashHistory) => [
      ...bashHistory,
      <TermOutput>{text}</TermOutput>,
    ]);
  };

  const [prompt, setPrompt] = useState("");
  const [promptToExecute, setPromptToExecute] = useState();
  const promptContainer = useRef(null);
  const [promptCursorPosition, setPromptCursorPosition] = useState(0);
  const promptCursorPositionRef = useRef(promptCursorPosition);

  useEffect(() => {
    if (promptCursorPosition > prompt.length)
      setPromptCursorPosition(prompt.length);
    if (promptCursorPosition < 0) setPromptCursorPosition(0);
    promptCursorPositionRef.current = promptCursorPosition;
  }, [promptCursorPosition, prompt]);

  const handleButton = (e) => {
    if (onTop.current) {
      if (e.key === "Enter") {
        setPrompt((prompt) => {
          setPromptToExecute(prompt);
          return "";
        });
      }
      if (e.key === "ArrowLeft") {
        return setPromptCursorPosition((current) => {
          return current + 1;
        });
      }
      if (e.key === "ArrowRight") {
        return setPromptCursorPosition((current) => current - 1);
      }
      setPrompt((prompt) => {
        if (e.key.length === 1)
          return (
            prompt.slice(0, prompt.length - promptCursorPositionRef.current) +
            e.key +
            prompt.slice(prompt.length - promptCursorPositionRef.current)
          );
        if (e.key === "Backspace") {
          if (promptCursorPositionRef.current < prompt.length)
            return (
              prompt.slice(
                0,
                prompt.length - promptCursorPositionRef.current - 1
              ) + prompt.slice(prompt.length - promptCursorPositionRef.current)
            );
        }
        return prompt;
      });
    }
  };

  useEffect(() => {
    onTop.current = currentOnTop;
  }, [currentOnTop]);

  useEffect(() => {
    if (typeof promptToExecute !== "undefined") {
      setBashHistory((bashHistory) => [
        ...bashHistory,
        <TermOutput>{running.prompt + " " + promptToExecute}</TermOutput>,
      ]);
      running.commandInterpreter(promptToExecute);
    }
    setPromptToExecute();
  }, [promptToExecute]);

  useEffect(() => {
    const div = promptContainer.current;
    div.scrollTop = div.scrollHeight;
  });

  useEffect(() => {
    document.addEventListener("keydown", handleButton);
    return () => {
      document.removeEventListener("keydown", handleButton);
    };
  }, []);

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
        id="test"
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
              document.getElementById("test").focus();
            }}
          >
            <TermOutput cursorPosition={promptCursorPosition}>
              {running.prompt + " " + prompt}
            </TermOutput>
          </div>
        )}
      </div>
    </div>
  );
}

export default Terminal;
