import { FormEvent, ChangeEvent } from "react";
import { useForm } from "@inertiajs/react";
import Navbar from "../components/Navbar";

export default function KegiatanCreate() {
  const { data, setData, post, processing, errors } = useForm({
    judul: '',
    deskripsi: '',
    tanggal: '',
    waktu_mulai: '',
    waktu_selesai: '',
    status: 'akan_datang',
    notulensi: null as File | null,
    keterangan: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/kegiatan', {
      forceFormData: true,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setData('notulensi', e.target.files[0]);
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Tambah Kegiatan</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Judul" 
              name="judul" 
              value={data.judul} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('judul', e.target.value)} 
              error={errors.judul}
            />
            <Input 
              label="Deskripsi" 
              name="deskripsi" 
              value={data.deskripsi} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('deskripsi', e.target.value)} 
              error={errors.deskripsi}
            />
            <Input 
              label="Tanggal" 
              name="tanggal" 
              type="date" 
              value={data.tanggal} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('tanggal', e.target.value)} 
              error={errors.tanggal}
            />
            <Input 
              label="Waktu Mulai" 
              name="waktu_mulai" 
              type="time" 
              value={data.waktu_mulai} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('waktu_mulai', e.target.value)} 
              error={errors.waktu_mulai}
            />
            <Input 
              label="Waktu Selesai" 
              name="waktu_selesai" 
              type="time" 
              value={data.waktu_selesai} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('waktu_selesai', e.target.value)} 
              error={errors.waktu_selesai}
            />

            {/* Upload PDF */}
            <div>
              <label className="block mb-1 font-semibold" htmlFor="notulensi">Upload Notulensi (PDF)</label>
              <input
                id="notulensi"
                name="notulensi"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {errors.notulensi && <div className="text-red-500 text-sm mt-1">{errors.notulensi}</div>}
            </div>

            {/* Keterangan Opsional */}
            <Input 
              label="Keterangan (Opsional)" 
              name="keterangan" 
              value={data.keterangan} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setData('keterangan', e.target.value)} 
              error={errors.keterangan}
            />

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Simpan
            </button>
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
  error?: string;
};

function Input({ label, name, type = "text", value, onChange, error }: InputProps) {
  return (
    <div>
      <label className="block mb-1 font-semibold" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-2"
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
