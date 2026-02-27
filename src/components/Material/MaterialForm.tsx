import { useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { useSelector } from "react-redux";
import { createMaterial, updateMaterial } from "@/store/slices/materialSlice";
import type { Material } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { RootState } from "@/store"; //

interface MaterialFormProps {
  material?: Material | null;
  onClose: () => void;
}

export function MaterialForm({ material, onClose }: MaterialFormProps) {
  const dispatch = useAppDispatch();

  const materials = useSelector((state: RootState) => state.materials.items);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Omit<Material, "id">>({
    name: material?.name ?? "",
    description: material?.description ?? "",
    stockQuantity: material?.stockQuantity ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isDuplicate = materials.some(
      (m) =>
        m.id !== material?.id &&
        m.name.toLowerCase() === formData.name.toLowerCase(),
    );

    if (isDuplicate) {
      setError(
        "Já existe um material com este nome (diferença de maiúsculas/minúsculas não é permitida).",
      );
      return;
    }
    // -----------------------------------------------------

    if (material) {
      await dispatch(updateMaterial({ ...formData, id: material.id }));
    } else {
      await dispatch(createMaterial(formData));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-900">
        {material ? "Editar Material" : "Cadastrar Material"}
      </h2>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Input
        label="Nome do Material"
        placeholder="Nome do Material"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Input
        label="Descrição"
        placeholder="Descrição"
        value={formData.description ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <Input
        label="Estoque Atual"
        type="number"
        placeholder="Estoque Atual"
        value={formData.stockQuantity}
        onChange={(e) =>
          setFormData({ ...formData, stockQuantity: Number(e.target.value) })
        }
        required
      />

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="ghost" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
