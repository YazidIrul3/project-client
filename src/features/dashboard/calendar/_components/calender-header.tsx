import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface CalendarHeaderProps {
  currentDate: Date;
  view: "week" | "day";
  onViewChange: (view: "week" | "day") => void;
  onNavigate: (direction: "prev" | "next" | "today") => void;
}

export const CalendarHeader = ({
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
        <Button className="gap-2 font-medium">
          <Plus className="h-4 w-4" />
          Event Baru
        </Button>
      </div>
    </header>
  );
};
