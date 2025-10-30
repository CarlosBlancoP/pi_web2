import axios from "axios";
import { ProductDetail } from "../types/ProductDetail";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/product-details";

export const productDetailsService = {
  getAll: async (): Promise<ProductDetail[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id: number): Promise<ProductDetail> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (data: ProductDetail): Promise<ProductDetail> => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  update: async (id: number, data: ProductDetail): Promise<ProductDetail> => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
