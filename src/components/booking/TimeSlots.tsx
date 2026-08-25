"use client";

interface TimeSlotsProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

const availableTimes = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function TimeSlots({
  selectedTime,
  onSelectTime,
}: TimeSlotsProps) {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-neutral-950">
          Elige el horario
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Selecciona uno de los horarios disponibles.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {availableTimes.map((time) => {
          const selected = selectedTime === time;

          return (
            <button
              key={time}
              type="button"
              onClick={() => onSelectTime(time)}
              className={`rounded-xl border px-4 py-3.5 text-sm font-medium transition ${
                selected
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-500"
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}