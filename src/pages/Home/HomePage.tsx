import { useEffect } from "react"; // 1. Importar useEffect
import { useAppSelector, useAppDispatch } from "@/hooks/redux"; // 2. Adicionar useAppDispatch
import { setMaterials } from "@/store/slices/materialSlice";
import { setProducts } from "@/store/slices/productSlice";
import api from "@/services/api";
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function HomePage() {
  const dispatch = useAppDispatch(); // 3. Inicializar o dispatch
  const { items: materials } = useAppSelector((state) => state.materials);
  const { items: products } = useAppSelector((state) => state.products);

  // 4. Efeito para buscar dados assim que a Home carregar
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

  const stats = [
    {
      label: "Materiais no Inventário",
      value: materials.length,
      icon: <Package className="text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      label: "Produtos Catalogados", // Corrigi o erro de digitação de "Catálogados"
      value: products.length,
      icon: <ShoppingCart className="text-emerald-600" />,
      color: "bg-emerald-50",
    },
    {
      label: "Alertas de Estoque Baixo",
      value: lowStock,
      icon: <AlertTriangle className="text-amber-600" />,
      color: "bg-amber-50",
    },
  ];

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

      {/* Grid de Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`p-4 rounded-xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              {/* Se o valor for 0, ele pode estar carregando ou realmente vazio */}
              <p className="text-2xl font-bold text-gray-900">
                {stat.value === 0 && materials.length === 0
                  ? "..."
                  : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/materials"
            className="p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <h3 className="font-bold text-gray-700 group-hover:text-blue-700">
              Novo Material
            </h3>
            <p className="text-sm text-gray-500">
              Adicione insumos ao seu estoque central.
            </p>
          </Link>
          <Link
            to="/products"
            className="p-4 border rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
          >
            <h3 className="font-bold text-gray-700 group-hover:text-emerald-700">
              Criar Produto
            </h3>
            <p className="text-sm text-gray-500">
              Defina composições técnicas e preços.
            </p>
          </Link>
          <Link
            to="/suggestions"
            className="p-4 border rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <h3 className="font-bold text-gray-700 group-hover:text-purple-700 flex items-center gap-2">
              Sugestão de Produção <TrendingUp size={16} />
            </h3>
            <p className="text-sm text-gray-500">
              Veja o que você pode produzir hoje.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
