import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setMaterials } from "@/store/slices/materialSlice";
import { setProducts } from "@/store/slices/productSlice";
import api from "@/services/api";
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Link } from "react-router-dom";

export function HomePage() {
  const dispatch = useAppDispatch();
  const { items: materials } = useAppSelector((state) => state.materials);
  const { items: products } = useAppSelector((state) => state.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resMat, resProd] = await Promise.all([
          api.get("/materials"),
          api.get("/products"),
        ]);
        dispatch(setMaterials(resMat.data));
        dispatch(setProducts(resProd.data));
      } catch (error) {
        console.error("Erro ao sincronizar CraftLog:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const lowStock = materials.filter((m) => m.stockQuantity < 10).length;
  const isLoading = materials.length === 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">
          Bem-vindo ao CraftLog
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Sistema de Gestão de Produção e Composição Técnica.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          stat={{
            label: "Materiais no Inventário",
            value: isLoading ? "..." : materials.length,
            icon: <Package className="text-blue-600" />,
            iconColor: "bg-blue-50",
          }}
        />
        <Card
          stat={{
            label: "Produtos Catalogados",
            value: isLoading ? "..." : products.length,
            icon: <ShoppingCart className="text-emerald-600" />,
            iconColor: "bg-emerald-50",
          }}
        />
        <Card
          stat={{
            label: "Alertas de Estoque Baixo",
            value: isLoading ? "..." : lowStock,
            icon: <AlertTriangle className="text-amber-600" />,
            iconColor: "bg-amber-50",
          }}
        />
      </div>

      <Card className="p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/materials">
            <Card className="p-4 hover:border-blue-500 hover:bg-blue-50 cursor-pointer">
              <h3 className="font-bold text-gray-700 group-hover:text-blue-700">
                Novo Material
              </h3>
              <p className="text-sm text-gray-500">
                Adicione insumos ao seu estoque central.
              </p>
            </Card>
          </Link>
          <Link to="/products">
            <Card className="p-4 hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer">
              <h3 className="font-bold text-gray-700 group-hover:text-emerald-700">
                Criar Produto
              </h3>
              <p className="text-sm text-gray-500">
                Defina composições técnicas e preços.
              </p>
            </Card>
          </Link>
          <Link to="/suggestions">
            <Card className="p-4 hover:border-purple-500 hover:bg-purple-50 cursor-pointer">
              <h3 className="font-bold text-gray-700 group-hover:text-purple-700 flex items-center gap-2">
                Sugestão de Produção <TrendingUp size={16} />
              </h3>
              <p className="text-sm text-gray-500">
                Veja o que você pode produzir hoje.
              </p>
            </Card>
          </Link>
        </div>
      </Card>
    </div>
  );
}
