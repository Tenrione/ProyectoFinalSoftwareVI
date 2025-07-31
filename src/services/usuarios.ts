import api from './api'

export const registrarUsuario = async (ruc: string, data: any) =>{
    const response = await api.post('/users/registro/'+ ruc, data)
    return response.data
}
export const usuarioLogin = async (data:any)=>{
    const response=await api.post('/users/login', data)
    return response.data
}