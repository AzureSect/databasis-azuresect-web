import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Lightbulb,
  Menu,
  X,
  Factory,
} from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    {
      path: "/materials",
      label: "Matérias-Primas",
      icon: <Package size={20} />,
    },
    { path: "/products", label: "Produtos", icon: <ShoppingCart size={20} /> },
    { path: "/suggestions", label: "Sugestões", icon: <Lightbulb size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="lg:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-[60] shadow-lg">
        <div className="flex items-center gap-2">
          <Factory className="text-blue-400" size={24} />
          <span className="font-black tracking-tighter text-xl">CraftLog</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[50] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-[55] w-72 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0 lg:h-screen
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-8 flex flex-col h-full">
          <div className="hidden lg:flex items-center gap-3 mb-10">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Factory className="text-white" size={24} />
            </div>
            <span className="font-black text-2xl text-white tracking-tighter">
              CraftLog
            </span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all group ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-900/40"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span
                  className={`${isActive(item.path) ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-800">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Autoflex Test v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
