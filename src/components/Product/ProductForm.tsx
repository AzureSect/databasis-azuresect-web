import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import api from "@/services/api";
import { setProducts } from "@/store/slices/productSlice";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FormSection } from "@/components/ui/FormSection";

interface CompositionInput {
  materialId: number;
  quantityNeeded: number;
}

export function ProductForm() {
  const dispatch = useAppDispatch();
  const { items: materials } = useAppSelector((state) => state.materials);
  const { items: products } = useAppSelector((state) => state.products);

  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [composition, setComposition] = useState<CompositionInput[]>([]);
  const [error, setError] = useState("");

  const addMaterialRow = () => {
    setComposition([...composition, { materialId: 0, quantityNeeded: 0 }]);
  };

  const removeMaterialRow = (index: number) => {
    setComposition(composition.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isDuplicate = products.some(
      (p) => p.name.toLowerCase() === name.trim().toLowerCase(),
    );

    if (isDuplicate) {
      setError("Já existe um produto com este nome.");
      return;
    }

    if (
      composition.length === 0 ||
      composition.some((c) => c.materialId === 0)
    ) {
      setError("Selecione os materiais e as quantidades!");
      return;
    }

    const payload = {
      name,
      value,
      composition: composition.map((c) => ({
        material: { id: c.materialId },
        quantityNeeded: c.quantityNeeded,
      })),
    };

    try {
      await api.post("/products", payload);
      alert("Produto cadastrado com sucesso!");
      setName("");
      setValue(0);
      setComposition([]);
      const response = await api.get<Product[]>("/products");
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      setError("Falha ao salvar produto no servidor.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Cadastrar Novo Produto
      </h2>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Nome do Produto"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Cadeira de Aço"
          />
          <Input
            label="Preço de Venda (R$)"
            type="number"
            required
            min="0"
            step="0.01"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>

        <FormSection
          title="Composição"
          action={
            <Button type="button" onClick={addMaterialRow}>
              + Adicionar Item
            </Button>
          }
        >
          {composition.map((item, index) => (
            <div key={index} className="flex gap-2 mb-3 items-center">
              <Select
                value={item.materialId}
                placeholder="Material..."
                options={materials.map((m) => ({ value: m.id, label: m.name }))}
                onChange={(e) => {
                  const newComp = composition.map((c, i) =>
                    i === index
                      ? { ...c, materialId: Number(e.target.value) }
                      : c,
                  );
                  setComposition(newComp);
                }}
                required
              />
              <Input
                type="number"
                required
                min="1"
                className="w-20"
                placeholder="Qtd"
                value={item.quantityNeeded || ""}
                onChange={(e) => {
                  const newComp = composition.map((c, i) =>
                    i === index
                      ? { ...c, quantityNeeded: Number(e.target.value) }
                      : c,
                  );
                  setComposition(newComp);
                }}
              />
              <Button
                type="button"
                variant="danger"
                onClick={() => removeMaterialRow(index)}
              >
                ✕
              </Button>
            </div>
          ))}
        </FormSection>

        <Button type="submit" className="w-full py-3">
          Salvar Produto Completo
        </Button>
      </form>
    </div>
  );
}
