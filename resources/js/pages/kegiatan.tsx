import React from "react";
import { Link } from '@inertiajs/react'; // menggunakan Link dari inertiajs
import Navbar from "../components/Navbar";

const kegiatan = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-1">Kegiatan</h1>
          <h2 className="text-lg text-gray-600 font-normal">
            Data Kegiatan Asrama Ekosari
          </h2>

          <section className="mt-7">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-500 mb-3">
                Kegiatan yang Akan Datang
              </h2>
              {/* Menambahkan Link dengan Inertia.js */}
              <Link
                href="/kegiatan/tambah"
                className="bg-blue-700 mr-10 px-5 py-3 text-white rounded-lg"
              >
                Tambah
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card Kegiatan */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">Judul Card</h2>
                  <p className="text-gray-700 mb-4">
                    Deskripsi singkat dari card ini. Menarik banget untuk dilihat.
                  </p>
                  {/* Menggunakan Link Inertia untuk aksi */}
                  <Link
                    href="/kegiatan/aksi" 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Aksi
                  </Link>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-500 my-10">
              Arsip Kegiatan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card Arsip Kegiatan */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">Judul Card</h2>
                  <p className="text-gray-700 mb-4">
                    Deskripsi singkat dari card ini. Menarik banget untuk dilihat.
                  </p>
                  {/* Menggunakan Link Inertia untuk aksi */}
                  <Link
                    href="/kegiatan/aksi" 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Aksi
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default kegiatan;
