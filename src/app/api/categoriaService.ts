import { api } from "./apiClient";
import { Categoria } from "../types/Categoria";

export const CategoriaService = {
  getAll: async (): Promise<Categoria[]> => {
    const response = await api.get("/api/categories");
    return response.data;
  },
};
