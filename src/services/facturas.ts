import api from "./api"

export const obtenerFacturaEmpresa = async (token:string) => {
    const response = await api.get('/facturas/factura-empresa',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const registrarFactura = async (token: string, data: any) => {
    const response = await api.post('/facturas/crear-factura', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}


export const detalleFactura = async (token: string, data: any) => {
    const response = await api.post('/facturas/detalle/:id', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}