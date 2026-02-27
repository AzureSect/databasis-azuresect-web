import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setMaterials } from "@/store/slices/materialSlice";
import { MaterialList } from "@/components/Material/MaterialList";
import api from "@/services/api";
import type { Material } from "@/types";
import axios from "axios";

export function MaterialsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await api.get<Material[]>("/materials");
        dispatch(setMaterials(response.data));
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error("Erro na API:", err.response?.data || err.message);
        } else {
          console.error("Erro inesperado:", err);
        }
      }
    };
    fetchMaterials();
  }, [dispatch]);

  return (
    <div className="p-8">
      <MaterialList />
    </div>
  );
}
