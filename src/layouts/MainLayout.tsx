import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Lightbulb,
  Box,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "Início", path: "/", icon: <LayoutDashboard size={20} /> },
  { name: "Materiais", path: "/materials", icon: <Package size={20} /> },
  { name: "Produtos", path: "/products", icon: <ShoppingCart size={20} /> },
  { name: "Sugestões", path: "/suggestions", icon: <Lightbulb size={20} /> },
];

interface NavLinksProps {
  currentPath: string;
  closeMenu?: () => void;
}

const NavLinks = ({ currentPath, closeMenu }: NavLinksProps) => (
  <>
    {navItems.map((item) => {
      const isActive = currentPath === item.path;
      return (
        <Link
          key={item.path}
          to={item.path}
          onClick={closeMenu}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            isActive
              ? "bg-blue-50 text-blue-700 shadow-sm"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          }`}
        >
          {item.icon}
          {item.name}
        </Link>
      );
    })}
  </>
);

export function MainLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-900 font-sans">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
            <Box className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            CraftLog
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLinks currentPath={location.pathname} />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-slate-900 rounded-2xl p-4 text-white text-[10px] uppercase tracking-wider">
            <p className="opacity-70 mb-1 font-semibold">Status do Servidor</p>
            <p className="font-bold flex items-center gap-2 text-xs normal-case">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Conectado - v1.0.2
            </p>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <Box className="text-blue-600" size={24} />
            <span className="font-bold text-slate-800 text-lg">Menu</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} className="text-slate-500" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <NavLinks
            currentPath={location.pathname}
            closeMenu={() => setIsMobileMenuOpen(false)}
          />
        </nav>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:hidden sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <Box className="text-blue-600" size={20} />
            <span className="font-bold text-slate-800">CraftLog</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 bg-slate-50 rounded-lg text-slate-600"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="p-4 md:p-8 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
