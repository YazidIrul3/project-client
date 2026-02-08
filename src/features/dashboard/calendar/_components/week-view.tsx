import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { id } from "date-fns/locale";
import { TimeGrid } from "./time-grid";

interface WeekViewProps {
  currentDate: Date;
}

export const WeekView = ({ currentDate }: WeekViewProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const today = new Date();

  return (
    <div className="flex flex-1 overflow-hidden">
      <TimeGrid hours={hours} />

      <div className="flex-1 overflow-auto">
        {/* Days header */}
        <div className="flex border-b border-border sticky top-0 bg-background z-10">
          {days.map((day) => {
            const isToday = isSameDay(day, today);
            return (
              <div
                key={day.toISOString()}
                className="flex-1 h-12 flex items-center justify-center border-r border-border last:border-r-0"
              >
                <div className="text-center">
                  <span
                    className={`text-sm font-medium capitalize ${
                      isToday ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {format(day, "EEE", { locale: id })}{" "}
                    <span
                      className={`inline-flex items-center justify-center ${
                        isToday
                          ? "bg-primary text-primary-foreground rounded-full w-6 h-6"
                          : ""
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Time slots grid */}
        <div className="flex">
          {days.map((day) => {
            const isToday = isSameDay(day, today);
            return (
              <div
                key={day.toISOString()}
                className={`flex-1 border-r border-border last:border-r-0 ${
                  isToday ? "bg-calendar-today" : ""
                }`}
              >
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-20 border-b border-border hover:bg-calendar-hover transition-colors cursor-pointer"
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
