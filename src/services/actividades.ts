import api from './api'

export const actividadesRecientes = async (token:string) => {
    const response = await api.get('/actividades/reciente', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}