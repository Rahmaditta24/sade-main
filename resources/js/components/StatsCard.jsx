import React from "react";

const StatsCard = ({ icon: Icon, label, value, description }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="text-sm text-gray-500 mb-1">{label}</div>
    <div className="flex justify-between items-end">
      <div className="text-3xl font-bold">{value}</div>
      <div className="flex items-center text-sm">
        <Icon className="h-6 w-6 text-indigo-700" />
        <span className="ml-1">{description}</span>
      </div>
    </div>
  </div>
);

export default StatsCard;
