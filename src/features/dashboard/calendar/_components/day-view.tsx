import { format, isSameDay } from "date-fns";
import { id } from "date-fns/locale";
import { TimeGrid } from "./time-grid";

interface DayViewProps {
  currentDate: Date;
}

export const DayView = ({ currentDate }: DayViewProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const today = new Date();
  const isToday = isSameDay(currentDate, today);

  return (
    <div className="flex flex-1 overflow-hidden">
      <TimeGrid hours={hours} />

      <div className="flex-1 overflow-auto">
        {/* Day header */}
        <div className="flex border-b border-border sticky top-0 bg-background z-10">
          <div className="flex-1 h-12 flex items-center justify-center">
            <div className="text-center">
              <span
                className={`text-sm font-medium capitalize ${
                  isToday ? "text-primary" : "text-foreground"
                }`}
              >
                {format(currentDate, "EEEE", { locale: id })}{" "}
                <span
                  className={`inline-flex items-center justify-center ${
                    isToday
                      ? "bg-primary text-primary-foreground rounded-full w-6 h-6"
                      : ""
                  }`}
                >
                  {format(currentDate, "d")}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div className={`${isToday ? "bg-calendar-today" : ""}`}>
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-20 border-b border-border hover:bg-calendar-hover transition-colors cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
