import React from "react";
import { Home, CreditCard, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import FinanceGraph from "../components/FinanceGraph";
import CalendarWidget from "../components/CalendarWidget";
import AttendanceProgress from "../components/AttendanceProgress";
import { usePage } from '@inertiajs/react';

const Beranda = () => {
  const { props } = usePage<{ user: { name: string; role: string } }>();
  const user = props.user;

  const graphData = [20, 35, 25, 40, 30, 45, 35, 50];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];


  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Halo, {user.name}</h1>

        {user.role === 'admin' ? (
          <>
            <p className="mb-6">Ini adalah dashboard admin.</p>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <StatsCard icon={Users} label="Total Penghuni Asrama" value="29" description="Total Penghuni" />
              <StatsCard icon={Home} label="Jumlah Kamar" value="10" description="Kamar Tersedia" />
              <StatsCard icon={CreditCard} label="Total Dana" value="Rp2.355.500" description="Laba Kotor" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <FinanceGraph data={graphData} />
              <div className="space-y-6">
                <CalendarWidget
                  currentDate={currentDate}
                  daysInMonth={new Date(currentYear, currentMonth + 1, 0).getDate()}
                  firstDayOfMonth={new Date(currentYear, currentMonth, 1).getDay()}
                  monthNames={monthNames}
                />
                <AttendanceProgress percentage={85} />
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className="text-lg font-medium">Ini adalah dashboard penghuni.</p>
            {/* Tampilan untuk penghuni */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <StatsCard icon={Users} label="Total Penghuni Asrama" value="29" description="Total Penghuni" />
              <StatsCard icon={Home} label="Jumlah Kamar" value="10" description="Kamar Tersedia" />
              <StatsCard icon={CreditCard} label="Total Dana" value="Rp2.355.500" description="Laba Kotor" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <FinanceGraph data={graphData} />
              <div className="space-y-6">
                <CalendarWidget
                  currentDate={currentDate}
                  daysInMonth={new Date(currentYear, currentMonth + 1, 0).getDate()}
                  firstDayOfMonth={new Date(currentYear, currentMonth, 1).getDay()}
                  monthNames={monthNames}
                />
                <AttendanceProgress percentage={85} />
              </div>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default Beranda;
