import { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setMaterials } from "@/store/slices/materialSlice";
import { Lightbulb, PackageCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface CompositionItem {
  material: {
    id: number;
    name: string;
  };
  quantityNeeded: number;
}

interface SuggestionDetail {
  name: string;
  needed: number;
  has: number;
}

export function SuggestionsPage() {
  const dispatch = useAppDispatch();
  const { items: products } = useAppSelector((state) => state.products);
  const { items: materials } = useAppSelector((state) => state.materials);

  const [tempMaterials, setTempMaterials] = useState(materials);
  const [productionQtys, setProductionQtys] = useState<Record<number, number>>(
    {},
  );

  const suggestionsData = useMemo(() => {
    const sortedProducts = [...products].sort((a, b) => b.value - a.value);
    const stockMap = new Map(tempMaterials.map((m) => [m.id, { ...m }]));

    const calculatedItems = sortedProducts.map((product) => {
      if (!product.composition || product.composition.length === 0) {
        return {
          ...product,
          possibleQuantity: 0,
          details: [] as SuggestionDetail[],
        };
      }

      let maxPossible = Infinity;
      product.composition.forEach((item: CompositionItem) => {
        const mat = stockMap.get(item.material.id);
        const stock = mat?.stockQuantity || 0;
        const capacity = Math.floor(stock / item.quantityNeeded);
        if (capacity < maxPossible) maxPossible = capacity;
      });

      const finalQty = maxPossible === Infinity ? 0 : maxPossible;

      if (finalQty > 0) {
        product.composition.forEach((item: CompositionItem) => {
          const mat = stockMap.get(item.material.id);
          if (mat) {
            stockMap.set(item.material.id, {
              ...mat,
              stockQuantity: mat.stockQuantity - finalQty * item.quantityNeeded,
            });
          }
        });
      }

      return {
        ...product,
        possibleQuantity: finalQty,
        details: product.composition.map((c: CompositionItem) => ({
          name: c.material.name,
          needed: c.quantityNeeded,
          has:
            tempMaterials.find((m) => m.id === c.material.id)?.stockQuantity ||
            0,
        })),
      };
    });

    const totalPotentialValue = calculatedItems.reduce(
      (acc, item) => acc + item.possibleQuantity * item.value,
      0,
    );

    return { items: calculatedItems, totalPotentialValue };
  }, [products, tempMaterials]);

  const handleQtyChange = (id: number, val: string, max: number) => {
    const num = Math.max(0, Math.min(max, Number(val)));
    setProductionQtys((prev) => ({ ...prev, [id]: num }));
  };

  const handleConfirmProduction = (
    productName: string,
    productId: number,
    composition: CompositionItem[],
  ) => {
    const qty = productionQtys[productId] || 0;

    if (qty <= 0) {
      alert("Por favor, insira uma quantidade válida para produzir.");
      return;
    }

    if (window.confirm(`Confirmar produção de ${qty} un de ${productName}?`)) {
      const updatedMaterials = tempMaterials.map((mat) => {
        const compItem = composition.find((c) => c.material.id === mat.id);
        if (compItem) {
          return {
            ...mat,
            stockQuantity: mat.stockQuantity - qty * compItem.quantityNeeded,
          };
        }
        return mat;
      });

      setTempMaterials(updatedMaterials);
      dispatch(setMaterials(updatedMaterials));
      setProductionQtys((prev) => ({ ...prev, [productId]: 0 }));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-xl">
              <Lightbulb className="text-amber-600" size={28} />
            </div>
            Sugestões de Produção
          </h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Defina a quantidade e execute a ordem de produção.
          </p>
        </div>

        <Card className="p-5 bg-slate-900 border-slate-800 shrink-0">
          <p className="text-[10px] uppercase tracking-widest opacity-50 font-black mb-1 text-white">
            Potencial de Faturamento
          </p>
          <p className="text-2xl md:text-3xl font-black text-emerald-400">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(suggestionsData.totalPotentialValue)}
          </p>
        </Card>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestionsData.items.map((item) => (
          <Card
            key={item.id}
            className="rounded-[2rem] overflow-hidden flex flex-col hover:border-blue-400 transition-all"
          >
            <div className="p-6 md:p-8 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-lg md:text-xl text-slate-800 tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-emerald-600 font-bold text-sm mt-1">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.value)}{" "}
                    / un
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-center border border-slate-100">
                <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-1">
                  Capacidade Atual
                </p>
                <p
                  className={`text-4xl font-black ${item.possibleQuantity > 0 ? "text-slate-900" : "text-rose-300"}`}
                >
                  {item.possibleQuantity}{" "}
                  <span className="text-lg font-medium opacity-30">un</span>
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {item.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs p-3 rounded-xl bg-slate-50/50"
                  >
                    <span className="text-slate-600 font-semibold">
                      {detail.name}
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      Usa {detail.needed} (Tem {detail.has})
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                  Qual a Quantidade que deseja produzir?
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0"
                    max={item.possibleQuantity}
                    value={productionQtys[item.id] || ""}
                    onChange={(e) =>
                      handleQtyChange(
                        item.id,
                        e.target.value,
                        item.possibleQuantity,
                      )
                    }
                    placeholder="0"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      setProductionQtys((prev) => ({
                        ...prev,
                        [item.id]: item.possibleQuantity,
                      }))
                    }
                  >
                    MAX
                  </Button>
                </div>
              </div>
            </div>

            <button
              disabled={
                item.possibleQuantity <= 0 ||
                (productionQtys[item.id] || 0) <= 0
              }
              onClick={() =>
                handleConfirmProduction(item.name, item.id, item.composition)
              }
              className={`w-full p-5 flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest transition-all ${
                item.possibleQuantity > 0 && (productionQtys[item.id] || 0) > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <PackageCheck size={20} />
              Executar Produção
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
