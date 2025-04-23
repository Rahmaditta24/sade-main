import React from "react";

const AttendanceProgress = ({ percentage }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold mb-2">Rata-rata Kehadiran Bulan Ini</h2>
      <div className="flex justify-center items-center">
        <div className="relative flex items-center justify-center w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#eee" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#4c4ce6"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute text-2xl font-bold">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceProgress;
