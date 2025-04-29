"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@radix-ui/react-dialog";
import BarangForm from "@/components/BarangForm";
import BarangList from "@/components/BarangList";
import { Barang } from "@/types";

export default function Home() {
  const [barangs, setBarangs] = useState<Barang[]>([]);
  const [editing, setEditing] = useState<Barang | null>(null);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // State untuk mengontrol pembukaan dialog tambah barang

  useEffect(() => {
    const saved = localStorage.getItem("barangs");
    if (saved) {
      setBarangs(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("barangs", JSON.stringify(barangs));
  }, [barangs]);

  const handleAdd = (barang: Barang) => {
    setBarangs((prev) => {
      const existing = prev.find((b) => b.nama.toLowerCase() === barang.nama.toLowerCase());
      if (existing) {
        return prev.map((b) => (b.nama.toLowerCase() === barang.nama.toLowerCase() ? { ...b, jumlah: b.jumlah + barang.jumlah } : b));
      } else {
        return [...prev, barang];
      }
    });
    setOpenDialog(false); // Menutup dialog setelah barang ditambahkan
  };

  const handleDelete = (id: string) => {
    setBarangs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdate = (updated: Barang) => {
    setBarangs((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setEditing(null);
  };

  const handleEdit = (barang: Barang) => {
    setEditing(barang);
  };

  const filteredBarangs = barangs.filter((barang) => barang.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <main className=" min-h-screen mx-auto bg-[#67AE6E] shadow-md">
      <section className="p-6 text-white">
        <h1 className="font-bold text-xl">📦 Manajemen Gudang</h1>

        <div className="mt-2 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Cari Barang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-white border text-[#222222] border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          />
          <button onClick={() => setOpenDialog(true)} className="bg-[#328E6E] text-xl text-white px-6 py-2 rounded-lg focus:outline-none hover:bg-[#90C67C] transition duration-300">
            +
          </button>
        </div>
      </section>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <span className="sr-only">
              <DialogTitle>Tambah Barang</DialogTitle> {/* Title is visually hidden but still accessible */}
            </span>
            <BarangForm onAdd={handleAdd} editData={editing} onUpdate={handleUpdate} />
            <DialogClose asChild>
              <button onClick={() => setOpenDialog(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg focus:outline-none">
                Tutup
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <span className="sr-only">
              <DialogTitle>Edit Barang</DialogTitle> {/* Title is visually hidden but still accessible */}
            </span>
            {editing && <BarangForm onAdd={handleAdd} editData={editing} onUpdate={handleUpdate} />}
            <DialogClose asChild>
              <button onClick={() => setEditing(null)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg focus:outline-none">
                Tutup
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <section className="bg-white min-h-screen rounded-xl">
        <h2 className="font-bold text-lg text-[#328E6E] mb-4">Daftar Barang</h2>
        <BarangList items={filteredBarangs} onDelete={handleDelete} onEdit={handleEdit} />
      </section>
    </main>
  );
}
