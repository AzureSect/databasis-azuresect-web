import { ProductForm } from "@/components/Product/ProductForm";
import { ProductList } from "@/components/Product/ProductList";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Gestão de Produtos"
          subtitle="Cadastre e gerencie a composição técnica dos seus itens."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <Card className="p-1 overflow-hidden">
              <ProductForm />
            </Card>
          </div>

          <div className="lg:col-span-8">
            <Card className="overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Produtos Registrados
                </h2>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                  Databasis Engine
                </span>
              </div>
              <ProductList />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
