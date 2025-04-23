import React from "react";

const FinanceGraph = ({ data }) => {
  return (
    <div className="col-span-2 bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold mb-4">Grafik Keuangan</h2>
      <div className="h-48 w-full">
        <svg viewBox="0 0 400 150" className="w-full h-full">
          {[40, 80, 120].map((y) => (
            <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#eee" strokeWidth="1" />
          ))}

          <path
            d={data.map((v, i) => `${i === 0 ? "M" : "L"} ${50 + i * 50} ${120 - v}`).join(" ")}
            fill="none"
            stroke="#4c4ce6"
            strokeWidth="2"
          />

          {data.map((v, i) => (
            <circle key={i} cx={50 + i * 50} cy={120 - v} r="3" fill="#4c4ce6" />
          ))}
        </svg>
      </div>
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>Januari</span>
        <span>Februari</span>
        <span>Maret</span>
        <span>April</span>
        <span>Mei</span>
        <span>Juni</span>
      </div>
    </div>
  );
};

export default FinanceGraph;
