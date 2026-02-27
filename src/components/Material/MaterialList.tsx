import { useState } from "react";
import { MaterialForm } from "./MaterialForm";
import { deleteMaterial } from "@/store/slices/materialSlice";
import type { Material } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Table } from "@/components/ui/Table";
import { PageHeader } from "@/components/ui/PageHeader";

export function MaterialList() {
  const dispatch = useAppDispatch();
  const { items: materials } = useAppSelector((state) => state.materials);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (material: Material) => {
    setSelectedMaterial(material);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      dispatch(deleteMaterial(id));
    }
  };

  return (
    <div>
      <PageHeader
        title="Materiais"
        action={
          <Button
            onClick={() => {
              setSelectedMaterial(null);
              setIsFormOpen(true);
            }}
          >
            + Novo Material
          </Button>
        }
      />

      <Table
        data={materials}
        keyExtractor={(m) => m.id}
        emptyMessage="Nenhum material cadastrado."
        columns={[
          {
            header: "ID",
            render: (m) => (
              <span className="text-gray-400 text-sm">#{m.id}</span>
            ),
          },
          {
            header: "Nome",
            render: (m) => (
              <span className="font-medium text-gray-900">{m.name}</span>
            ),
          },
          {
            header: "Descrição",
            render: (m) => (
              <span className="text-gray-500 text-sm">
                {m.description ?? "—"}
              </span>
            ),
          },
          {
            header: "Estoque",
            className: "text-right",
            render: (m) => <Badge>{m.stockQuantity} un</Badge>,
          },
          {
            header: "Ações",
            className: "text-right",
            render: (m) => (
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => handleEdit(m)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(m.id)}>
                  Excluir
                </Button>
              </div>
            ),
          },
        ]}
      />

      {isFormOpen && (
        <Modal onClose={() => setIsFormOpen(false)}>
          <MaterialForm
            material={selectedMaterial}
            onClose={() => setIsFormOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
