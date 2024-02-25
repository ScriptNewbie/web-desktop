//TODO: Fix reference issues - get rid of useRef
import TermOutput from "./TermOutput";
import { useEffect, useRef, useState } from "react";

function PromptInput({ running, onTop: currentOnTop }) {
  const [prompt, setPrompt] = useState("");
  const [promptToExecute, setPromptToExecute] = useState();

  const [promptCursorPosition, setPromptCursorPosition] = useState(0);
  const promptCursorPositionRef = useRef(promptCursorPosition);

  const onTop = useRef(currentOnTop);

  useEffect(() => {
    onTop.current = currentOnTop;
  }, [currentOnTop]);

  useEffect(() => {
    if (promptCursorPosition > prompt.length)
      setPromptCursorPosition(prompt.length);
    if (promptCursorPosition < 0) setPromptCursorPosition(0);
    promptCursorPositionRef.current = promptCursorPosition;
  }, [promptCursorPosition, prompt]);

  //Buttons handling
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
    document.addEventListener("keydown", handleButton);
    return () => {
      document.removeEventListener("keydown", handleButton);
    };
  }, []);

  useEffect(() => {
    if (typeof promptToExecute !== "undefined") {
      running.commandInterpreter(promptToExecute);
    }
    setPromptToExecute();
  }, [promptToExecute]);

  return (
    <TermOutput cursorPosition={promptCursorPosition}>
      {running.prompt + " " + prompt}
    </TermOutput>
  );
}

export default PromptInput;
