function TermOutput({ children, cursorPosition }) {
  let text = children;
  if (typeof text !== "string") {
    text = text.join("");
  }

  const style = { backgroundColor: "white", color: "black" };
  return (
    <pre>
      {text.split("").map((char, index) => (
        <span
          style={
            typeof cursorPosition !== "undefined " &&
            cursorPosition !== 0 &&
            index === text.length - cursorPosition
              ? style
              : {}
          }
          key={index}
        >
          {char}
          <wbr />
        </span>
      ))}
      {cursorPosition === 0 ? <span style={style}> </span> : <></>}
    </pre>
  );
}

export default TermOutput;
