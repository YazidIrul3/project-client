interface TimeGridProps {
  hours: number[];
}

export const TimeGrid = ({ hours }: TimeGridProps) => {
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
