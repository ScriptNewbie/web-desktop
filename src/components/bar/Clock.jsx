import React, { useState, useEffect } from "react";

function Clock({ toggleCalendar }) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 480);
  }, []);
  return (
    <div
      onClick={toggleCalendar}
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-end",
        textAlign: "center",
        paddingRight: "20px",
        paddingLeft: "20px",
        flexDirection: "column",
        justifyContent: "space-around",
        fontSize: "1.3rem",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <div>{date.toLocaleDateString("pl-pl")}</div>
      <div>{date.toTimeString().split(" ")[0].substring(0, 8)}</div>
    </div>
  );
}

export default Clock;
