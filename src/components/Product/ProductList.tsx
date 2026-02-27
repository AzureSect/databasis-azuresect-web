import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { fetchProducts, deleteProduct } from "@/store/slices/productSlice";
import type { Product, ProductComposition } from "@/types";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";

export function ProductList() {
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
        alert("Não foi possível excluir o produto.");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500 flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="font-semibold">Acordando o servidor...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table
        data={products}
        keyExtractor={(p) => p.id}
        emptyMessage="Nenhum produto cadastrado."
        columns={[
          {
            header: "Identificação",
            render: (p) => (
              <div>
                <div className="font-bold text-gray-900">{p.name}</div>
                <div className="text-[10px] text-gray-400 mt-1 font-mono">
                  ID: #{p.id}
                </div>
              </div>
            ),
          },
          {
            header: "Composição Técnica",
            className: "text-center",
            render: (p: Product) => (
              <div className="flex flex-wrap justify-center gap-2">
                {p.composition?.map((comp: ProductComposition) => (
                  <div
                    key={comp.id}
                    className="inline-flex items-center bg-white border border-blue-100 rounded-full px-3 py-1 shadow-sm"
                  >
                    <span className="text-xs font-semibold text-blue-800">
                      {comp.material.name}
                    </span>
                    <span className="mx-2 w-1 h-1 bg-blue-300 rounded-full" />
                    <span className="text-xs font-bold text-blue-600">
                      {comp.quantityNeeded} un
                    </span>
                  </div>
                ))}
              </div>
            ),
          },
          {
            header: "Preço de Venda",
            className: "text-right",
            render: (p) => (
              <Badge variant="green">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(p.value || 0)}
              </Badge>
            ),
          },
          {
            header: "Ações",
            className: "text-right",
            render: (p) => (
              <Button variant="danger" onClick={() => handleDelete(p.id)}>
                Excluir
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
