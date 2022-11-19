import axios from 'axios';
import { toast } from 'react-toastify';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});


export const getProductById = async (id: number) => {
  try {
    const { data } = await api.get(`products/${id}`)
    return data
  } catch (e) {
    console.log('getProductById -> e', e)
    toast.error('Erro na adição do produto')
  }
}
export const getStockById = async (id: number) => {
  try {
    const { data } = await api.get(`stock/${id}`)
    return data
  } catch (e) {
    console.log('getStockById -> e', e)
    toast.error('Erro na adição do produto')
  }
}
