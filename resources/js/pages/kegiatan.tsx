import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "@inertiajs/react";

interface Kegiatan {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  waktu_mulai: string;
  waktu_selesai: string;
  status: string;
  notulensi?: string; // Optional property for notulensi
}

export default function Kegiatan() {
  const [kegiatan, setKegiatan] = useState<Kegiatan[]>([]);

  useEffect(() => {
    fetch('/api/kegiatan')
      .then((response) => response.json())
      .then((data) => setKegiatan(data));
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Kegiatan</h1>
            <p className="text-gray-500">Data Kegiatan Asrama Ekasari</p>
          </div>
          <Link href="/kegiatan/create">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Tambah
            </button>
          </Link>
        </div>

        <h2 className="text-lg font-semibold mb-4">Kegiatan yang Akan Datang</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {kegiatan.filter(k => k.status === 'akan_datang').map((item) => (
            <KegiatanCard key={item.id} kegiatan={item} />
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-4">Arsip Kegiatan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kegiatan.filter(k => k.status === 'arsip').map((item) => (
            <KegiatanCard key={item.id} kegiatan={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function KegiatanCard({ kegiatan }: { kegiatan: Kegiatan }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-xl">{kegiatan.judul}</h3>
      <p className="text-gray-600 text-sm mt-1">{kegiatan.deskripsi}</p>
      <div className="text-sm text-gray-500 mt-2">
        {kegiatan.tanggal}<br />
        {kegiatan.waktu_mulai} - {kegiatan.waktu_selesai}
      </div>

      {/* Jika ada file notulensi */}
      {kegiatan.notulensi && (
        <a
          href={`/storage/${kegiatan.notulensi}`}
          target="_blank"
          className="block mt-2 text-blue-600 hover:underline text-sm"
        >
          Lihat Notulensi (PDF)
        </a>
      )}

      <div className="flex gap-2 mt-4">
        <Link href={`/kegiatan/absensi/${kegiatan.id}`}>
          <button className="border border-indigo-600 text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-50">
            Absen
          </button>
        </Link>
        <Link href={`/kegiatan/detail/${kegiatan.id}`}>
          <button className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700">
            Detail
          </button>
        </Link>
      </div>
    </div>
  );
}
