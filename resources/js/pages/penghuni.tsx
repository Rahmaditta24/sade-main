import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";

const dummyData = [
  {
    "id": 1,
    "nama": "Hidayatul Khoiriyah",
    "tanggalLahir": "19/10/2003",
    "prodi": "Manajemen Keuangan",
    "angkatan": 2021,
    "asalDaerah": "Bondowoso",
    "noHp": "082131303030"
  },
  {
    "id": 2,
    "nama": "Hesti Dwi Lestari",
    "tanggalLahir": "01/03/2004",
    "prodi": "TRPL",
    "angkatan": 2021,
    "asalDaerah": "Jember",
    "noHp": "082134567897"
  },
  {
    "id": 3,
    "nama": "Rajendra Nawasena",
    "tanggalLahir": "10/02/2005",
    "prodi": "Manajemen Industri Gizi",
    "angkatan": 60,
    "asalDaerah": "Bandung",
    "noHp": "087865789012"
  },
  // ...tambah data lainnya
];

const penghuni = () => {
  // const [penghuni, setPenghuni] = useState(dummyData);
  return (
    <div className="flex h-screen">
      <Navbar />
      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Penghuni</h1>
            <h2 className="text-lg text-gray-600 font-normal">
              Data Penguni Asrama Ekasari
            </h2>
          </div>
          {/* Menggunakan Link untuk navigasi ke halaman tambah penghuni */}
          <Link
            href="/penghuni/tambah"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Tambah
          </Link>
        </div>

        <div className="overflow-auto rounded shadow bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-white-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Tanggal Lahir</th>
                <th className="px-4 py-2">Prodi</th>
                <th className="px-4 py-2">Angkatan</th>
                <th className="px-4 py-2">Asal Daerah</th>
                <th className="px-4 py-2">No.Tlp</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.nama}</td>
                  <td className="px-4 py-2">{item.tanggalLahir}</td>
                  <td className="px-4 py-2">{item.prodi}</td>
                  <td className="px-4 py-2">{item.angkatan}</td>
                  <td className="px-4 py-2">{item.asalDaerah}</td>
                  <td className="px-4 py-2">{item.noHp}</td>
                  <td className="px-4 my-5 space-x-2 flex">
                    {/* Edit button */}
                    <Link
                      href={`/penghuni/edit/${item.id}`}
                      className="text-yellow-500"
                    >
                      <FaEdit />
                    </Link>
                    {/* Delete button (handle with Inertia if needed) */}
                    <button className="text-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default penghuni;
