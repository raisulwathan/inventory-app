"use client";

import { useEffect, useState } from "react";
import { Barang } from "@/types";

interface Props {
  onAdd: (barang: Barang) => void;
  onUpdate?: (barang: Barang) => void;
  editData?: Barang | null;
}

export default function BarangForm({ onAdd, onUpdate, editData }: Props) {
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");

  useEffect(() => {
    if (editData) {
      setNama(editData.nama);
      setJumlah(editData.jumlah);
    }
  }, [editData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || jumlah <= "") return;

    const updatedBarang: Barang = {
      id: editData ? editData.id : Date.now().toString(),
      nama: nama.trim(),
      jumlah,
    };

    if (editData && onUpdate) {
      onUpdate(updatedBarang);
    } else {
      onAdd(updatedBarang);
    }

    setNama("");
    setJumlah("");
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-1">{editData ? "Edit Barang" : "Tambah Barang Baru"}</h2>

      <div className="flex">
        <div className="w-2/3 pr-2">
          <input
            type="text"
            placeholder="Contoh: Rak Besi"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 text-[#222222] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          />
        </div>

        <div className="w-1/3 pl-2">
          <input
            placeholder="Jumlah"
            min={1}
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border text-[#222222] border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          />
        </div>
      </div>

      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition duration-150 ease-in-out ${
          editData ? "bg-[#67AE6E] hover:bg-[#90C67C] " : "bg-[#67AE6E] hover:bg-[#90C67C] focus:ring-blue-300"
        } focus:outline-none focus:ring-2 focus:ring-offset-2`}
      >
        {editData ? "Simpan Perubahan" : "Tambah Barang"}
      </button>
    </form>
  );
}
