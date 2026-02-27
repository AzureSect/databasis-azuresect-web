import { ProductForm } from "@/components/Product/ProductForm";
import { ProductList } from "@/components/Product/ProductList";

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Gestão de Produtos
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Cadastre e gerencie a composição técnica dos seus itens.
          </p>
          <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-1">
                {" "}
                <ProductForm />
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 bg-white flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Produtos Registrados
              </h2>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                Databasis Engine
              </span>
            </div>

            <div className="p-0">
              {" "}
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
