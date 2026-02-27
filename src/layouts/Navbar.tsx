import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 mb-6">
      <div className="container mx-auto flex gap-6">
        <h1 className="font-bold text-xl mr-4">Databasis</h1>
        <Link title="Materiais" to="/materials" className="hover:text-blue-400">
          Materiais
        </Link>
        <Link title="Produtos" to="/products" className="hover:text-blue-400">
          Produtos
        </Link>
      </div>
    </nav>
  );
}
