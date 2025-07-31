import axios from 'axios'
//Service creado para facilitar los llamados a la API

const api = axios.create({
    baseURL: 'https://api-pymanager.onrender.com',
    headers:{
        'Content-Type': 'application/json',
    }
})
export const setAuthToken = (token: string | null)=>{
    if (token){
        api.defaults.headers.common['Authorization']=`Bearer ${token}`
    }
    else{
        delete api.defaults.headers.common['Authorization']
    }
}

export default api