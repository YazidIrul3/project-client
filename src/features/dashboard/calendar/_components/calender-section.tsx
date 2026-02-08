import { useState } from "react";
import {
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfDay,
  startOfWeek,
  format,
  isSameDay,
} from "date-fns";
import { id } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateEventSheet from "./create-event-sheet";

// TimeGrid Component
const TimeGrid = ({ hours }: { hours: number[] }) => {
  return (
    <div className="w-16 flex-shrink-0 border-r border-border">
      <div className="h-12 border-b border-border flex items-center justify-center">
        <span className="text-xs text-calendar-time font-medium">GMT+7</span>
      </div>
      {hours.map((hour) => (
        <div
          key={hour}
          className="h-20 border-b border-border flex items-start justify-end pr-3 pt-0"
        >
          <span className="text-xs text-calendar-time -translate-y-2">
            {hour === 0
              ? "12 AM"
              : hour < 12
                ? `${hour} AM`
                : hour === 12
                  ? "12 PM"
                  : `${hour - 12} PM`}
          </span>
        </div>
      ))}
    </div>
  );
};

// CalendarHeader Component
interface CalendarHeaderProps {
  currentDate: Date;
  view: "week" | "day";
  onViewChange: (view: "week" | "day") => void;
  onNavigate: (direction: "prev" | "next" | "today") => void;
}

const CalendarHeader = ({
  currentDate,
  view,
  onViewChange,
  onNavigate,
}: CalendarHeaderProps) => {
  const formatTitle = () => {
    if (view === "day") {
      return format(currentDate, "EEE d MMMM, yyyy", { locale: id });
    }
    return format(currentDate, "MMMM yyyy", { locale: id });
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate("today")}
          className="font-medium"
        >
          Hari Ini
        </Button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("prev")}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("next")}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h1 className="text-xl font-semibold text-foreground capitalize ml-2">
          {formatTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="font-medium">
          Event saya
        </Button>
        <Select
          value={view}
          onValueChange={(v) => onViewChange(v as "week" | "day")}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="day">Day</SelectItem>
          </SelectContent>
        </Select>
        <div>
          <CreateEventSheet />
        </div>
      </div>
    </header>
  );
};

// WeekView Component
const WeekView = ({ currentDate }: { currentDate: Date }) => {
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

// DayView Component
const DayView = ({ currentDate }: { currentDate: Date }) => {
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

// Main Calendar Component
export const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
  const [view, setView] = useState<"week" | "day">("week");

  const handleNavigate = (direction: "prev" | "next" | "today") => {
    if (direction === "today") {
      setCurrentDate(startOfDay(new Date()));
      return;
    }

    if (view === "week") {
      setCurrentDate((prev) =>
        direction === "prev" ? subWeeks(prev, 1) : addWeeks(prev, 1),
      );
    } else {
      setCurrentDate((prev) =>
        direction === "prev" ? subDays(prev, 1) : addDays(prev, 1),
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onViewChange={setView}
        onNavigate={handleNavigate}
      />
      {view === "week" ? (
        <WeekView currentDate={currentDate} />
      ) : (
        <DayView currentDate={currentDate} />
      )}
    </div>
  );
};
