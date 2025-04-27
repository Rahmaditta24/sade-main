import React, { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import { router, useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

type PenghuniItem = {
  id: number;
  nama: string;
  tanggalLahir: string;
  prodi: string;
  angkatan: number;
  asalDaerah: string;
  noHp: string;
};

const Penghuni = () => {
  const { penghunis: initialPenghunis } = usePage<{ penghunis: PenghuniItem[] }>().props;
  const [penghunis, setPenghunis] = useState<PenghuniItem[]>(initialPenghunis);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<null | number>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const prodiOptions = [
    "Komunikasi Digital dan Media",
    "Ekowisata",
    "Teknologi Rekayasa Perangkat Lunak",
    "Teknologi Rekayasa Komputer",
    "Supervisor Jaminan Mutu Pangan",
    "Manajemen Industri Jasa Makanan dan Gizi",
    "Teknologi Industri Benih",
    "Teknologi dan Manajemen Pembenihan Ikan",
    "Teknologi dan Manajemen Ternak",
    "Manajemen Agribisnis",
    "Manajemen Industri",
    "Analisis Kimia",
    "Teknik dan Manajemen Lingkungan",
    "Akuntansi",
    "Paramedik Veteriner",
    "Teknologi Produksi dan Manajemen Perkebunan",
    "Teknologi Produksi dan Pengembangan Masyarakat Pertanian",
  ];

  const { data, setData, reset } = useForm({
    nama: "",
    tanggalLahir: "",
    prodi: "",
    angkatan: "",
    asalDaerah: "",
    noHp: "",
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = penghunis.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(penghunis.length / itemsPerPage);

  const openAddModal = () => {
    setEditing(null);
    reset();
    setShowModal(true);
  };

  const openEditModal = (id: number) => {
    const item = penghunis.find((item) => item.id === id);
    if (item) {
      setData({
        nama: item.nama,
        tanggalLahir: item.tanggalLahir,
        prodi: item.prodi,
        angkatan: item.angkatan.toString(),
        asalDaerah: item.asalDaerah,
        noHp: item.noHp,
      });
      setEditing(id);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    reset();
    setEditing(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      nama: data.nama,
      tanggalLahir: data.tanggalLahir,
      prodi: data.prodi,
      angkatan: parseInt(data.angkatan),
      asalDaerah: data.asalDaerah,
      noHp: data.noHp,
    };

    if (editing !== null) {
      router.put(`/penghuni/${editing}`, formData, {
        preserveScroll: true,
        onSuccess: () => {
          setPenghunis((prev) =>
            prev.map((item) =>
              item.id === editing ? { ...item, ...formData } : item
            )
          );
          toast.success("Data berhasil diperbarui!");
          closeModal();
        },
      });
    } else {
      router.post("/penghuni", formData, {
        preserveScroll: true,
        onSuccess: (page) => {
          const newItem = ((page as unknown) as { props: { penghunis: PenghuniItem[] } }).props.penghunis?.at(-1);
          if (newItem) {
            setPenghunis((prev) => [...prev, newItem]);
          }
          toast.success("Data berhasil ditambahkan!");
          closeModal();
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus?")) {
      router.delete(`/penghuni/${id}`, {
        preserveScroll: true,
        onSuccess: () => {
          setPenghunis((prev) => prev.filter((item) => item.id !== id));
          toast.success("Data berhasil dihapus!");
        },
      });
    }
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
          <h1 className="text-2xl font-bold text-gray-800">Penghuni</h1>
          <p className="text-sm text-gray-500">Data penghuni Asrama Ekasari</p>

          <div className="flex justify-between items-center mb-4 mt-8">
            <h2 className="text-xl font-bold text-gray-800">Data Penghuni</h2>
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
                <th className="px-4 py-2 border">Nama</th>
                <th className="px-4 py-2 border">Tanggal Lahir</th>
                <th className="px-4 py-2 border">Prodi</th>
                <th className="px-4 py-2 border">Angkatan</th>
                <th className="px-4 py-2 border">Asal Daerah</th>
                <th className="px-4 py-2 border">No HP</th>
                <th className="px-4 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              
              {currentItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{indexOfFirst + index + 1}</td>
                  <td className="px-4 py-2 border">{item.nama}</td>
                  <td className="px-4 py-2 border">{item.tanggalLahir}</td>
                  <td className="px-4 py-2 border">{item.prodi}</td>
                  <td className="px-4 py-2 border">{item.angkatan}</td>
                  <td className="px-4 py-2 border">{item.asalDaerah}</td>
                  <td className="px-4 py-2 border">{item.noHp}</td>
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
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 px-2 text-sm text-gray-600">
            <span>
              Showing {indexOfFirst + 1} to {Math.min(indexOfLast, penghunis.length)} of {penghunis.length} results
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
                  {editing !== null ? "Edit Penghuni" : "Tambah Penghuni"}
                </h2>
                <form onSubmit={handleSubmit}>
                  {["nama", "tanggalLahir", "prodi", "angkatan", "asalDaerah", "noHp"].map((field) => (
                    <div key={field} className="mb-3">
                      <label className="block mb-1 text-sm capitalize">{field}</label>
                      {field === "prodi" ? (
                        <select
                          value={data.prodi}
                          onChange={(e) => setData("prodi", e.target.value)}
                          className="w-full border p-2 rounded"
                          required
                        >
                          <option value="">-- Pilih Prodi --</option>
                          {prodiOptions.map((prodi) => (
                            <option key={prodi} value={prodi}>
                              {prodi}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field === "tanggalLahir" ? "date" : "text"}
                          value={data[field as keyof typeof data]}
                          onChange={(e) => setData(field as keyof typeof data, e.target.value)}
                          className="w-full border p-2 rounded"
                          required
                        />
                      )}
                    </div>
                  ))}
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

export default Penghuni;
