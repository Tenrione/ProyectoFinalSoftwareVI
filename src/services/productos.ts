import api from "./api"

export const listarProductos = async () => {
    const response = await api.get('/productos')
    return response.data
}