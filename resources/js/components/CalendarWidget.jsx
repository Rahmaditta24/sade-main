import React from "react";

const CalendarWidget = ({ currentDate, daysInMonth, firstDayOfMonth, monthNames }) => {
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold mb-2">Jadwal Kegiatan Mendatang</h2>
      <div className="flex justify-between items-center text-sm mb-2">
        <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <div className="flex space-x-2">
          <button className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">&lt;</button>
          <button className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">&gt;</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {["M", "S", "S", "R", "K", "J", "S"].map((day) => (
          <div key={day} className="text-center font-medium">{day}</div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="text-center p-1"></div>
        ))}

        {calendarDays.map((day) => (
          <div
            key={`day-${day}`}
            className={`text-center p-1 rounded-full ${
              day === currentDate.getDate() ? "bg-indigo-700 text-white" : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
