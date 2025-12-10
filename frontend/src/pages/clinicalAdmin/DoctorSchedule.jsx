import { useMemo, useState, Fragment } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { addDays, format, startOfWeek, isSameDay, isBefore } from "date-fns";
import { es } from "date-fns/locale";

const mockShifts = {
  DR001: [
    { day: "Lunes", startTime: "09:00", endTime: "13:00" },
    { day: "Miércoles", startTime: "09:00", endTime: "13:00" },
  ],
  DR002: [
    { day: "Martes", startTime: "14:00", endTime: "18:00" },
    { day: "Jueves", startTime: "14:00", endTime: "18:00" },
  ],
  DR003: [{ day: "Viernes", startTime: "08:00", endTime: "12:00" }],
  DR004: [
    { day: "Lunes", startTime: "15:00", endTime: "19:00" },
    { day: "Martes", startTime: "15:00", endTime: "19:00" },
  ],
};

export default function DoctorSchedule({ doctorId, appointments, onSelectAppointment, onSelectTimeSlot }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  const timeSlots = Array.from({ length: 12 }, (_, i) => `${String(i + 8).padStart(2, "0")}:00`);

  const shifts = useMemo(() => (doctorId ? mockShifts[doctorId] || [] : []), [doctorId]);

  if (!doctorId) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl h-full flex items-center justify-center p-10">
        <div className="text-center text-muted-foreground">
          <User className="w-12 h-12 mx-auto mb-3" />
          <p className="font-semibold">Seleccione un doctor</p>
          <p className="text-sm">Elija un doctor en el formulario para ver su agenda y disponibilidad.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
      <div className="p-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Agenda del Doctor</h3>
          <p className="text-sm text-muted-foreground">Semana del {format(startOfCurrentWeek, "d 'de' MMMM", { locale: es })}</p>
        </div>
        <div className="flex gap-2">
          <button className="border rounded-md p-2" onClick={() => setCurrentDate(addDays(currentDate, -7))}>
            <ChevronLeft />
          </button>
          <button className="border rounded-md p-2" onClick={() => setCurrentDate(addDays(currentDate, 7))}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="px-6 pb-6 overflow-x-auto">
        <div className="grid grid-cols-[auto_repeat(7,minmax(0,1fr))] min-w-[800px] -ml-4">
          <div className="p-2 border-b"></div>
          {weekDates.map((d) => (
            <div key={d.toISOString()} className="text-center p-2 border-b">
              <p className="font-semibold text-sm capitalize">{format(d, "eeee", { locale: es })}</p>
              <p className="text-xs text-muted-foreground">{format(d, "d MMM", { locale: es })}</p>
            </div>
          ))}

          {timeSlots.map((time) => (
            <Fragment key={time}>
              <div className="h-16 flex items-center justify-center border-t text-xs text-muted-foreground px-2">{time}</div>
              {weekDates.map((day) => {
                const [hour] = time.split(":").map(Number);
                const slotDateTime = new Date(day);
                slotDateTime.setHours(hour, 0, 0, 0);

                const apt = appointments.find((a) => isSameDay(a.date, day) && new Date(a.date).getHours() === hour);
                const dayName = format(day, "eeee", { locale: es });
                const shift = shifts.find((s) => s.day.toLowerCase() === dayName.toLowerCase());
                const inShift = shift && time >= shift.startTime && time < shift.endTime;
                const past = isBefore(slotDateTime, new Date());

                return (
                  <div key={day.toISOString()} className="h-16 border-t border-l p-1">
                    {apt ? (
                      <button className="h-full w-full text-left text-xs p-1 rounded-md bg-white/70 text-gray-800" onClick={() => onSelectAppointment(apt)}>
                        <span className="font-bold block">{apt.patientName}</span>
                        <span className="text-gray-600">{apt.specialty}</span>
                      </button>
                    ) : inShift && !past ? (
                      <button className="h-full w-full rounded-md hover:bg-white/10" onClick={() => onSelectTimeSlot(slotDateTime, doctorId)} />
                    ) : (
                      <div className={`h-full w-full ${past && !inShift ? "bg-black/10" : "bg-white/5"}`} />
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
