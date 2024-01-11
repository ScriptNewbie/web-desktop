import React from "react";
import CalendarDays from "./CalendarDays";
import Weather from "./Weather";

function Calendar({ calendarVisible }) {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();
  const monthNumber = date.getMonth();
  const year = date.getFullYear();

  const month = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];

  const day = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];

  return (
    <div
      onTouchMove={(e) => {
        e.stopPropagation();
      }}
      style={{
        position: "absolute",
        right: "0",
        bottom: "60px",
        width: "500px",
        maxWidth: "100%",
        maxHeight: "calc(100% - 60px)",
        backgroundColor: "dodgerblue",
        zIndex: 9999,
        overflow: "auto",
        display: calendarVisible ? "block" : "none",
      }}
    >
      <div>
        Dzisiaj jest {day[dayOfWeek]}, {dayOfMonth} {month[monthNumber]} {year}
      </div>
      <CalendarDays day={dayOfMonth} month={monthNumber} year={year} />
      <Weather />
    </div>
  );
}

export default Calendar;
