type CalendarDay = {
  thisMonth: boolean;
  number: number;
};

type CalendarDaysProps = {
  day: number;
  month: number;
  year: number;
};

function CalendarDays({ day: dayOfMonth, month, year }: CalendarDaysProps) {
  const dayLetters = ["P", "W", "Ś", "C", "P", "S", "N"];

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getMonthLength = (monthIndex: number) => {
    const length =
      monthIndex === 1
        ? isLeapYear
          ? 29
          : 28
        : monthIndex < 6
          ? monthIndex % 2
            ? 30
            : 31
          : monthIndex % 2
            ? 31
            : 30;
    return length;
  };

  const daysInThisMonth = getMonthLength(month);
  const daysInPrevMonth = getMonthLength((month + 11 - 1) % 11);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days: CalendarDay[] = [];
  const weeks: CalendarDay[][] = [];

  for (
    let i = daysInPrevMonth - (firstDayOfMonth - 2); //Substraction of two because days of week are counted from 0, and days from month from 1
    i <= daysInPrevMonth;
    ++i
  ) {
    days.push({ thisMonth: false, number: i });
  }
  for (let i = 1; i <= daysInThisMonth; ++i) {
    days.push({ thisMonth: true, number: i });
  }
  for (let i = 1; i < days.length % 7; ++i) {
    days.push({ thisMonth: false, number: i });
  }

  for (let i = 0; i < days.length; i = i + 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return (
    <table style={{ color: "white", textAlign: "center" }}>
      <thead>
        <tr>
          {dayLetters.map((dayLetter, i) => (
            <th key={"title" + i}>{dayLetter}</th> //Od poniedziałku, nie od niedzieli
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, index) => (
          <tr key={"row" + index}>
            {week.map((day, i) => (
              <td key={"column" + i}>
                {day.number === dayOfMonth && day.thisMonth ? (
                  <b>{day.number}</b>
                ) : day.thisMonth ? (
                  day.number
                ) : (
                  <span style={{ opacity: 0.5 }}>{day.number}</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CalendarDays;
