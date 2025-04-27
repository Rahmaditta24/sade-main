import { useForm } from "@inertiajs/react";
import { FormEvent, ChangeEvent } from "react";
import Navbar from "../components/Navbar";

type Kegiatan = {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  waktu_mulai: string;
  waktu_selesai: string;
};

export default function KegiatanDetail({ kegiatan }: { kegiatan: Kegiatan }) {
  const { data, setData, put, delete: destroy } = useForm(kegiatan);

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/kegiatan/${kegiatan.id}`);
  };

  const handleDelete = () => {
    if (confirm('Yakin mau hapus kegiatan ini?')) {
      destroy(`/kegiatan/${kegiatan.id}`);
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Detail Kegiatan</h1>
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input
              label="Judul"
              name="judul"
              value={data.judul}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('judul', e.target.value)}
            />
            <Input
              label="Deskripsi"
              name="deskripsi"
              value={data.deskripsi}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('deskripsi', e.target.value)}
            />
            <Input
              label="Tanggal"
              name="tanggal"
              type="date"
              value={data.tanggal}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('tanggal', e.target.value)}
            />
            <Input
              label="Waktu Mulai"
              name="waktu_mulai"
              type="time"
              value={data.waktu_mulai}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('waktu_mulai', e.target.value)}
            />
            <Input
              label="Waktu Selesai"
              name="waktu_selesai"
              type="time"
              value={data.waktu_selesai}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('waktu_selesai', e.target.value)}
            />

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ label, name, type = "text", value, onChange }: InputProps) {
  return (
    <div>
      <label className="block mb-1 font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-2"
      />
    </div>
  );
}
