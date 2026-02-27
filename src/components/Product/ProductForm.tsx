import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux"; // Adicionei dispatch para atualizar a lista
import api from "@/services/api";
import { setProducts } from "@/store/slices/productSlice"; // Para atualizar a lista após salvar
import type { Product } from "@/types";

// Interface local para o estado do formulário
interface CompositionInput {
  materialId: number;
  quantityNeeded: number;
}

export function ProductForm() {
  const dispatch = useAppDispatch();
  const { items: materials } = useAppSelector((state) => state.materials);

  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [composition, setComposition] = useState<CompositionInput[]>([]);

  const addMaterialRow = () => {
    setComposition([...composition, { materialId: 0, quantityNeeded: 0 }]);
  };

  const removeMaterialRow = (index: number) => {
    setComposition(composition.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      composition.length === 0 ||
      composition.some((c) => c.materialId === 0)
    ) {
      alert("Selecione os materiais e as quantidades!");
      return;
    }

    // O Backend geralmente espera o ID do material no POST,
    // mas o GET nos retorna o objeto completo.
    // Vamos enviar o payload conforme o seu backend espera:
    const payload = {
      name,
      value,
      // Se o seu backend espera o objeto material: { id: X }, use:
      // composition: composition.map(c => ({ material: { id: c.materialId }, quantityNeeded: c.quantityNeeded }))
      // Se o seu backend espera apenas o materialId, use:
      composition: composition.map((c) => ({
        materialId: c.materialId,
        quantityNeeded: c.quantityNeeded,
      })),
    };

    try {
      await api.post("/products", payload);
      alert("Produto cadastrado com sucesso!");

      // Limpa o form
      setName("");
      setValue(0);
      setComposition([]);

      // Atualiza a lista de produtos automaticamente após o cadastro
      const response = await api.get<Product[]>("/products");
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Falha ao salvar produto.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Cadastrar Novo Produto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
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
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700 font-mono text-sm uppercase">
              Composição
            </h3>
            <button
              type="button"
              onClick={addMaterialRow}
              className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition font-bold"
            >
              + Adicionar Item
            </button>
          </div>

          {composition.map((item, index) => (
            <div key={index} className="flex gap-2 mb-3 items-center">
              <select
                required
                className="flex-1 border rounded-lg p-2 bg-gray-50 text-sm"
                value={item.materialId}
                onChange={(e) => {
                  const newComp = [...composition];
                  newComp[index].materialId = Number(e.target.value);
                  setComposition(newComp);
                }}
              >
                <option value={0}>Material...</option>
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                required
                min="1"
                className="w-20 border rounded-lg p-2 text-sm"
                placeholder="Qtd"
                value={item.quantityNeeded || ""}
                onChange={(e) => {
                  const newComp = [...composition];
                  newComp[index].quantityNeeded = Number(e.target.value);
                  setComposition(newComp);
                }}
              />

              <button
                type="button"
                onClick={() => removeMaterialRow(index)}
                className="p-2 text-red-400 hover:text-red-600 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg mt-4 active:scale-95"
        >
          Salvar Produto Completo
        </button>
      </form>
    </div>
  );
}
