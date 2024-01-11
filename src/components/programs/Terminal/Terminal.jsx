import React, { useState, useRef, useEffect } from "react";
import Filesystem from "../../../tools/filesystem";
import neofetch from "./neofetch";
import ping from "./ping";
import TermOutput from "./TermOutput";
import startNode from "./node";

function Terminal({ setFilesystem, filesystem, onTop: currentOnTop, close }) {
  const onTop = useRef(currentOnTop);
  const [promptEnabled, setPromptEnabled] = useState(true);
  const [path, setPath] = useState("/home/");
  const [bashHistory, setBashHistory] = useState([]);
  const pathContent = Object.keys(
    Filesystem.getPathContent(filesystem, path).content
  );

  console.log(path);

  const getDirName = (path) => {
    return Filesystem.parseTree(path).pop() || "/";
  };

  const [prompt, setPrompt] = useState("");
  const [promptText, setPromptText] = useState(
    "jack@zettawhit " + getDirName(path) + " #"
  );
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

  const print = (text) => {
    setBashHistory((bashHistory) => [
      ...bashHistory,
      <TermOutput>{text}</TermOutput>,
    ]);
  };

  const runNode = () => {
    startNode({
      print,
      setPromptText,
      running,
      promptText,
      execCommand,
    });
  };

  const ls = (lsPath) => {
    if (typeof lsPath === "undefined") return print(pathContent.join(" "));
    if (!lsPath.startsWith("/")) {
      lsPath = path + lsPath;
    }
    const { pathExists, content } = Filesystem.getPathContent(
      filesystem,
      lsPath
    );
    let output = "Path does not exist!";
    if (pathExists) {
      output = Object.keys(content).join(" ");
    }
    print(output);
  };

  const cd = (navigatePath) => {
    if (!navigatePath.startsWith("/")) {
      navigatePath = path + navigatePath;
    }
    const { pathExists } = Filesystem.getPathContent(filesystem, navigatePath);
    if (pathExists) {
      setPromptText("jack@zettawhit " + getDirName(navigatePath) + " #");
      return setPath(navigatePath);
    }
    print("This path does not exist!");
  };

  const help = () => {
    print("Available commands:");
    print("   -exit\t - closes terminal");
    print("   -clear\t - clears terminal");
    print("   -ping\t - checks the connection to given host");
    print("   -node\t - runs JS code");
    print("   -neofetch\t - prints system specyfication");
  };

  const execCommand = (prompt) => {
    if (typeof prompt === "undefined" || prompt === "") return;
    const words = prompt.split(" ");
    prompt = words[0];
    if (prompt === "neofetch") return neofetch(setBashHistory);
    if (prompt === "clear") return setBashHistory([]);
    if (prompt === "ping") return ping(setPromptEnabled, print, words);
    if (prompt === "node") return runNode();
    if (prompt === "help") return help();
    if (prompt === "exit") return close();
    if (prompt === "pwd") return print(path);
    if (prompt === "ls") return ls(words[1]);
    if (prompt === "cd") return cd(words[1]);
    print(
      "Command " +
        prompt +
        ' does not exist!\nType "help" to see available commands!'
    );
  };

  const running = useRef({ name: "bash", function: execCommand });

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
        <TermOutput>{promptText + " " + promptToExecute}</TermOutput>,
      ]);
      running.current.function(promptToExecute);
    }
    setPromptToExecute();
  }, [promptToExecute]);

  useEffect(() => {
    if (running.current.name === "bash") running.current.function = execCommand;
    const div = promptContainer.current;
    div.scrollTop = div.scrollHeight;
  });

  useEffect(() => {
    document.addEventListener("keydown", handleButton);
    return () => {
      document.removeEventListener("keydown", handleButton);
    };
  }, []);

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
        {promptEnabled && (
          <div
            onClick={() => {
              document.getElementById("test").focus();
            }}
          >
            <TermOutput cursorPosition={promptCursorPosition}>
              {promptText + " " + prompt}
            </TermOutput>
          </div>
        )}
      </div>
    </div>
  );
}

export default Terminal;
