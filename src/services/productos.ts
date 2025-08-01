import api from "./api"

export const cantidadProductosEmpresa = async (token:string) => {
    const response = await api.get('/productos',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const registrarProducto = async ( token: string,data: any,) => {
    const response = await api.post('/productos/agregar-producto/', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const actualizarProducto = async (token: string, id: string, data: any) => {
    const response = await api.put(`/productos/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}