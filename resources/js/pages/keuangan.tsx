import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import { router, useForm, usePage } from '@inertiajs/react';
import toast from "react-hot-toast";

const formatRupiah = (number: string | number) => {
  const angka = typeof number === "number" ? number : number.replace(/\D/g, "");
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(angka));
};

type keuanganItem = { id: number; tanggal: string; jumlah: number; deskripsi: string; tipe: string };

const Keuangan = () => {
  const { props } = usePage<{ keuangans: keuanganItem[] }>();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<null | number>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = props.keuangans.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(props.keuangans.length / itemsPerPage);

  const { data, setData, reset } = useForm({
    tanggal: "",
    jumlah: "",
    deskripsi: "",
    tipe: "masuk",
  });

  const openAddModal = () => {
    setEditing(null);
    reset();
    setShowModal(true);
  };

  const openEditModal = (id: number) => {
    const item = props.keuangans.find((item: keuanganItem) => item.id === id);
    if (item) {
      setData({
        tanggal: item.tanggal,
        jumlah: item.jumlah.toString(),
        deskripsi: item.deskripsi,
        tipe: item.tipe,
      });
      setEditing(id);
      setShowModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAmount = parseInt(data.jumlah.replace(/\D/g, ""), 10);
    const formData = {
      tanggal: data.tanggal,
      jumlah: newAmount,
      deskripsi: data.deskripsi,
      tipe: data.tipe,
    };

    if (editing !== null) {
      router.put(`/keuangan/${editing}`, formData, {
        onSuccess: () => {
          toast.success("Data berhasil diperbarui!");
          router.reload();
          closeModal();
        },
      });
    } else {
      router.post("/keuangan", formData, {
        onSuccess: () => {
          toast.success("Data berhasil ditambahkan!");
          router.reload();
          closeModal();
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus?")) {
      router.delete(`/keuangan/${id}`, {
        onSuccess: () => {
          toast.success("Data berhasil dihapus!");
          router.reload();
        },
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    reset();
    setEditing(null);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex bg-gray-900 min-h-screen">
      <Navbar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="bg-white p-6 shadow-xl rounded-xl">
          <h1 className="text-2xl font-bold text-gray-800">Keuangan</h1>
          <p className="text-sm text-gray-500">Data keuangan Asrama Ekasari</p>

          <div className="flex justify-between items-center mb-4 mt-8">
            <h2 className="text-xl font-bold text-gray-800">Data Keuangan</h2>
            <button
              onClick={openAddModal}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={18} /> Tambah
            </button>
          </div>

          <table className="w-full text-sm text-center border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Jumlah</th>
                <th className="px-4 py-2 border">Deskripsi</th>
                <th className="px-4 py-2 border">Tipe</th>
                <th className="px-4 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                Tidak ada data keuangan.
                </td>
              </tr>
              ) : (
              currentItems.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{item.tanggal}</td>
                <td className="px-4 py-2 border">{formatRupiah(item.jumlah)}</td>
                <td className="px-4 py-2 border">{item.deskripsi}</td>
                <td className="px-4 py-2 border">{item.tipe}</td>
                <td className="px-4 py-2 border flex gap-2 justify-center">
                    <button
                      onClick={() => openEditModal(item.id)}
                      className="p-1.5 text-white bg-orange-400 rounded hover:bg-orange-500"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 px-2 text-sm text-gray-600">
            <span>
              Showing {indexOfFirst + 1} to {Math.min(indexOfLast, props.keuangans.length)} of {props.keuangans.length} results
            </span>
            <div className="flex gap-1">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`px-2 py-1 border rounded ${
                  currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-100"
                }`}
              >
                {"<"}
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 border rounded ${
                  currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-gray-100"
                }`}
              >
                {">"}
              </button>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                  {editing !== null ? "Edit Pemasukan" : "Tambah Keuangan"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="block mb-1 text-sm">Tanggal</label>
                    <input
                      type="date"
                      value={data.tanggal}
                      onChange={(e) => setData("tanggal", e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1 text-sm">Jumlah</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatRupiah(data.jumlah)}
                      onChange={(e) =>
                        setData("jumlah", e.target.value.replace(/\D/g, ""))
                      }
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1 text-sm">Deskripsi</label>
                    <input
                      type="text"
                      value={data.deskripsi}
                      onChange={(e) => setData("deskripsi", e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block mb-1 text-sm">Tipe</label>
                    <select
                      value={data.tipe}
                      onChange={(e) => setData("tipe", e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    >
                      <option value="masuk">Masuk</option>
                      <option value="keluar">Keluar</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-300 text-black rounded"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      {editing !== null ? "Update" : "Tambah"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Keuangan;
