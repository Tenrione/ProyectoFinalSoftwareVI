import api from './api'

export const registrarUsuario = async (ruc: string, data: any) =>{
    const response = await api.post('/users/registro/'+ ruc, data)
    return response.data
}
export const usuarioLogin = async (data:any)=>{
    const response=await api.post('/users/login', data)
    return response.data
}
export const cantidadUsuarios = async (token:string) => {
    const response = await api.get('/users/mi-empresa',{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const obtenerUsuariosEmpresa = async (token:string) => {
    const response = await api.get('/users/mi-empresa', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data}

export const borrarUsuario = async (token: string, id: string) => {
    await api.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

export const actualizarUsuario = async (token: string, id: string, data: any) => {
    const response = await api.put(`/users/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}


// Primero, agreguemos una nueva función al servicio usuarios.ts
export const crearUsuarioEnEmpresa = async (token: string, data: any) => {
    const response = await api.post('/users', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}