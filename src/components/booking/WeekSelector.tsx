"use client";

import { useMemo } from "react";

interface WeekSelectorProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const dayNames = [
  "Dom",
  "Lun",
  "Mar",
  "Mié",
  "Jue",
  "Vie",
  "Sáb",
];

export default function WeekSelector({
  selectedDate,
  onSelectDate,
}: WeekSelectorProps) {
  const days = useMemo(() => {
    const result = [];

    for (let index = 0; index < 7; index++) {
      const date = new Date();

      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + index);

      result.push(date);
    }

    return result;
  }, []);

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-neutral-950">
          Elige el día
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Solo puedes reservar dentro de los próximos 7 días.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {days.map((date) => {
          const dateString = date.toISOString().split("T")[0];

          const selected = selectedDate === dateString;

          return (
            <button
              key={dateString}
              type="button"
              onClick={() => onSelectDate(dateString)}
              className={`rounded-2xl border px-2 py-4 text-center transition ${
                selected
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-neutral-200 bg-white hover:border-neutral-500"
              }`}
            >
              <span className="block text-xs uppercase">
                {dayNames[date.getDay()]}
              </span>

              <span className="mt-2 block text-xl font-semibold">
                {date.getDate()}
              </span>

              <span className="mt-1 block text-[10px] uppercase opacity-60">
                {date.toLocaleDateString("es-ES", {
                  month: "short",
                })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}