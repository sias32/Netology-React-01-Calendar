import React from "react";
import { nanoid } from "nanoid"; // Генератор уникальных строк, для key - значений

interface CalendarProps {
  date: Date;
}

type Props = Readonly<CalendarProps>;

const Calendar: React.FC<Props> = ({ date }) => {
  // Переменные даты, в строковом формате
  const MonthString = date.toLocaleDateString("ru", { month: "long" });
  const MonthBowedString = date
    .toLocaleDateString("ru", { day: "numeric", month: "long" })
    .split(" ")[1];
  const weekDayString = date.toLocaleDateString("ru", { weekday: "long" });

  // Переменные даты, в числовом формате
  const currentDay = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  // Константы для цикла
  const weekDayInStartMonth = new Date(currentYear, currentMonth).getDay();
  const weekIndex = (weekDayInStartMonth + 6) % 7;
  const ROWS = Math.ceil(
    (weekIndex + DaysInMonth(currentYear, currentMonth)) / 7
  );
  const COLS = 7;
  const table: JSX.Element[] = [];

  let DayIndex = 1 - weekIndex;

  for (let i = 0; i < ROWS; i++) {
    const tr: JSX.Element[] = [];
    for (let j = 0; j < COLS; j++) {
      // День, вычисляемый от индекса, выдает дни текущего месяца и соседних
      const calendarDay = new Date(
        currentYear,
        currentMonth,
        DayIndex
      ).getDate();

      tr.push(
        <td
          key={nanoid(10)}
          className={classOtherMonth(DayIndex) ?? classCurrentDay(calendarDay)}
        >
          {calendarDay}
        </td>
      );
      DayIndex++;
    }
    table.push(<tr key={nanoid(10)}>{tr}</tr>);
  }

  // Переводит первую букву недели в вверхний регистр
  function FomatedWeekDay(week: string): string {
    return week[0].toUpperCase() + week.slice(1);
  }

  // Добавляет класс ко дню, если он относится не к текущему месяцу
  function classOtherMonth(dayNumber: number): string | undefined {
    if (dayNumber > 0 && dayNumber <= DaysInMonth(currentYear, currentMonth)) {
      return undefined;
    }

    return "ui-datepicker-other-month";
  }

  // Добавляет класс ко дню, если он равен текущему дню
  function classCurrentDay(numberDay: number): string | undefined {
    return numberDay == currentDay ? "ui-datepicker-today" : undefined;
  }

  function DaysInMonth(year: number, month: number): number {
    const Month = new Date(year, month);
    const nextMonth = new Date(year, month + 1);
    const diffDays =
      (nextMonth.getTime() - Month.getTime()) / (1000 * 3600 * 24);

    return diffDays;
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">
          {FomatedWeekDay(weekDayString)}
        </div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currentDay}</div>
          <div className="ui-datepicker-material-month">{MonthBowedString}</div>
          <div className="ui-datepicker-material-year">{currentYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">
            {MonthString.toUpperCase()}
          </span>
          &nbsp;
          <span className="ui-datepicker-year">{currentYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">
              Пн
            </th>
            <th scope="col" title="Вторник">
              Вт
            </th>
            <th scope="col" title="Среда">
              Ср
            </th>
            <th scope="col" title="Четверг">
              Чт
            </th>
            <th scope="col" title="Пятница">
              Пт
            </th>
            <th scope="col" title="Суббота">
              Сб
            </th>
            <th scope="col" title="Воскресенье">
              Вс
            </th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
export type { CalendarProps };
