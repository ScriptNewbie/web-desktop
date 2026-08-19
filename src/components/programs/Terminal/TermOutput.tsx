type TermOutputProps = {
  children: string | string[];
  cursorPosition?: number;
};

function TermOutput({ children, cursorPosition }: TermOutputProps) {
  const text = typeof children === "string" ? children : children.join("");

  const style = { backgroundColor: "white", color: "black" };
  return (
    <pre>
      {text.split("").map((char, index) => (
        <span
          style={
            cursorPosition !== undefined &&
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
