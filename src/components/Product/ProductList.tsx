import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setProducts, setLoading } from "@/store/slices/productSlice";
import api from "@/services/api";
import type { Product, ProductComposition } from "@/types";

export function ProductList() {
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.get<Product[]>("/products");
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProducts();
  }, [dispatch]);

  if (loading)
    return (
      <div className="p-10 text-center text-gray-400">Sincronizando...</div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 text-[11px] uppercase tracking-widest font-bold text-gray-500 border-b">
            <th className="px-6 py-4">Identificação</th>
            <th className="px-6 py-4 text-center">Composição Técnica</th>
            <th className="px-6 py-4 text-right">Preço de Venda</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product: Product) => (
            <tr key={product.id} className="hover:bg-blue-50/20 transition-all">
              <td className="px-6 py-5">
                <div className="font-bold text-gray-900">{product.name}</div>
                <div className="text-[10px] text-gray-400 mt-1 font-mono">
                  ID: #{product.id}
                </div>
              </td>

              <td className="px-6 py-5 text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {product.composition?.map((comp: ProductComposition) => (
                    <div
                      key={comp.id}
                      className="inline-flex items-center bg-white border border-blue-100 rounded-full px-3 py-1 shadow-sm"
                    >
                      <span className="text-xs font-semibold text-blue-800">
                        {comp.material.name}
                      </span>
                      <span className="mx-2 w-1 h-1 bg-blue-300 rounded-full"></span>
                      <span className="text-xs font-bold text-blue-600">
                        {comp.quantityNeeded} un
                      </span>
                    </div>
                  ))}
                </div>
              </td>

              <td className="px-6 py-5 text-right">
                <span className="text-md font-mono font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.value || 0)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
