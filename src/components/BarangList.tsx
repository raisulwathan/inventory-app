import { Barang } from "@/types";
import { AlertTriangle } from "lucide-react";

interface Props {
  items: Barang[];
  onDelete: (id: string) => void;
  onEdit: (barang: Barang) => void;
}

export default function BarangList({ items, onDelete, onEdit }: Props) {
  if (items.length === 0) return <p className="text-center text-gray-500">Belum ada barang.</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className="border p-4 rounded flex justify-between items-center">
          <div>
            <p className="font-medium">{item.nama}</p>
            <p className="text-sm text-gray-600">Jumlah: {item.jumlah}</p>
            {parseInt(item.jumlah) < 10 && (
              <div title="Stok hampir habis!" className="flex items-center mt-1">
                <AlertTriangle className="inline text-yellow-500 w-4 h-4 ml-1" />
                <span className="ml-1 text-sm text-yellow-600">Stok hampir habis!</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(item)} className="text-sm text-[#328E6E] hover:underline">
              Edit
            </button>
            <button onClick={() => onDelete(item.id)} className="text-sm text-red-600 hover:underline">
              Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
