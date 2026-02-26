import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setMaterials } from "@/store/slices/materialSlice";
import api from "@/services/api";
import type { Material } from "@/types";
import axios from "axios";

export function MaterialsPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.materials);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await api.get<Material[]>("/materials");
        dispatch(setMaterials(response.data));
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error("Erro na API:", err.response?.data || err.message);
        } else {
          console.error("Erro inesperado:", err);
        }
      }
    };
    fetchMaterials();
  }, [dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Matérias-Primas</h1>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden max-w-2xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                Nome
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">
                Estoque
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-gray-400 italic"
                >
                  Buscando materiais no servidor...
                </td>
              </tr>
            ) : (
              items.map((item: Material) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    #{item.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                      {item.stockQuantity} un
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
