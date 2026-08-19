import type { RunningProgram } from "../../types";

type BarProgramsRunningProps = {
  running: RunningProgram[];
  changeOnTopRunning: (pid: number) => void;
  onTop: RunningProgram | null;
};

function BarProgramsRunning({
  running,
  changeOnTopRunning,
  onTop,
}: BarProgramsRunningProps) {
  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        margin: "0 10px 0 10px",
        backgroundColor: "rgba(200,200,200, 0.2)",
        maxWidth: "calc(100% - 280px)",
        overflow: "auto",
      }}
    >
      {running.map((item) => (
        <div
          onClick={() => {
            changeOnTopRunning(item.pid);
          }}
          key={item.pid}
          id="barIcon"
          style={{
            flexGrow: 1,
            maxWidth: "90px",
            padding: "5px 0px 5px 0px",
            backgroundColor: onTop?.pid === item.pid ? "rgba(0,0,0,0.4)" : "",
          }}
        >
          <div
            style={{
              maxWidth: "50px",
              height: "50px",
              backgroundImage: "url(" + item.icon + ")",
              backgroundSize: "cover",
              marginLeft: "20px",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default BarProgramsRunning;
