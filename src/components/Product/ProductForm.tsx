import React, { useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import api from "@/services/api";
import type { ProductComposition } from "@/types";

export function ProductForm() {
  const { items: materials } = useAppSelector((state) => state.materials);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [composition, setComposition] = useState<ProductComposition[]>([]);

  const addMaterialRow = () => {
    setComposition([...composition, { materialId: 0, quantityNeeded: 0 }]);
  };

  const removeMaterialRow = (index: number) => {
    setComposition(composition.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (composition.length === 0) {
      alert("Adicione pelo menos uma matéria-prima na composição!");
      return;
    }

    try {
      await api.post("/products", { name, price, composition });
      alert("Produto cadastrado com sucesso!");
      setName("");
      setPrice(0);
      setComposition([]);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Falha ao salvar produto. Verifique o console.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Cadastrar Novo Produto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto
            </label>
            <input
              type="text"
              required
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Cadeira de Aço"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço de Venda (R$)
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Composição Técnica</h3>
            <button
              type="button"
              onClick={addMaterialRow}
              className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100 transition"
            >
              + Adicionar Matéria-Prima
            </button>
          </div>

          {composition.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 mb-3 items-end animate-in fade-in slide-in-from-top-1"
            >
              <div className="flex-1">
                <select
                  required
                  className="w-full border rounded-lg p-2 bg-gray-50"
                  value={item.materialId}
                  onChange={(e) => {
                    const newComp = [...composition];
                    newComp[index].materialId = Number(e.target.value);
                    setComposition(newComp);
                  }}
                >
                  <option value="">Selecione o material...</option>
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} (Estoque: {m.stockQuantity})
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-28">
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="Qtd"
                  className="w-full border rounded-lg p-2"
                  value={item.quantityNeeded || ""}
                  onChange={(e) => {
                    const newComp = [...composition];
                    newComp[index].quantityNeeded = Number(e.target.value);
                    setComposition(newComp);
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => removeMaterialRow(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg mt-4"
        >
          Salvar Produto Completo
        </button>
      </form>
    </div>
  );
}
