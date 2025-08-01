<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbarStyle">
        <!-- Cambiar mi nombre por una variable que guarde el nombre -->
        <ion-title>
          Bienvenido de nuevo, <strong>{{ nombre }}</strong>
        </ion-title>
        <ion-buttons slot="end" color="primary">
          <ion-button @click="cerrarSesion()">
          Salir
        </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="bodyStyle">
        <div class="cardsInline">
      <ion-card class="tituloCarta Productos">
        <ion-card-header>
          <ion-card-title color="light">
            <ion-icon :icon="cubeOutline"></ion-icon>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <!-- Reemplazar con un get de los items en inventario -->
          <h2><strong>{{itemsActuales}}</strong></h2>
          <p>Productos totales</p>
        </ion-card-content>
      </ion-card>
      <ion-card class="tituloCarta Usuarios">
        <ion-card-header>
          <ion-card-title color="success">
            <ion-icon :icon="peopleOutline"></ion-icon>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <!-- Lo mismo que con el otro -->
          <h2><strong>{{ usuariosActuales }}</strong></h2>
          <p>Usuarios Totales</p>
        </ion-card-content>
      </ion-card>
      </div>
      <ion-card class="tituloCarta Stock">
        <ion-card-header>
          <div class="headerFlex">
          <ion-card-title color="warning">
              <ion-icon :icon="warningOutline"></ion-icon>
          </ion-card-title>
          <ion-button fill="clear" color="warning" @click="revisarInventario()"><strong>Revisar</strong></ion-button>
          </div>
        </ion-card-header>
        <ion-card-content>
          <h2><strong>{{ productosBajoStock }}</strong></h2>
          <p>Stock bajo</p>
        </ion-card-content>
      </ion-card>
         <ion-card class="tituloCarta">
        <ion-card-header>
          <ion-card-title color="light">
            <strong>Actividad Reciente</strong>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row v-for="actividad in actividades" :key="actividad.id">
              <ion-col size="12">
    <p class="actividad-linea">
      {{ actividad.descripcion }}
      <span class="fechaActividad">{{ formatearFecha(actividad.fecha) }}</span>
    </p>
  </ion-col>
              
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from '@/router'
import { Preferences } from '@capacitor/preferences';

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonButtons, IonGrid, IonCol, IonRow } from '@ionic/vue';
import { cubeOutline, peopleOutline, warningOutline } from 'ionicons/icons';
import { cantidadProductosEmpresa } from '@/services/productos';
import { cantidadUsuarios } from '@/services/usuarios';
import { actividadesRecientes } from '@/services/actividades';
import { onMounted, ref } from 'vue';
import { onIonViewWillEnter } from '@ionic/vue'; 
import { setAuthToken } from '@/services/api';
const itemsActuales = ref(0);
const usuariosActuales = ref(0);
const productosBajoStock = ref(0);
const actividades = ref<any[]>([]);
const nombre = ref('');

async function contadorProductos(){
  console.log('=== CONTANDO PRODUCTOS ===');
  const { value: token } = await Preferences.get({ key: 'token' });
  console.log('Token para productos:', token);
  
  if (!token) {
    console.log('No hay token, estableciendo productos en 0');
    itemsActuales.value = 0;
    productosBajoStock.value = 0;
    return;
  }
  
  try {
    const response = await cantidadProductosEmpresa(token);
    console.log('Respuesta productos:', response);
    itemsActuales.value = Array.isArray(response) ? response.length : 0;
   
    if (Array.isArray(response)) {
      productosBajoStock.value = response.filter(
        producto => producto.stock_actual < producto.stock_minimo
      ).length;
      console.log('Productos bajo stock:', productosBajoStock.value);
    } else {
      productosBajoStock.value = 0;
    }
  } catch (error) {
    console.error('Error al obtener productos:', error);
    itemsActuales.value = 0;
    productosBajoStock.value = 0;
  }
}
async function depurarDatos() {
  console.log('=== DEPURACIÓN COMPLETA ===');
  
  // Verificar qué hay en Preferences
  const { value: token } = await Preferences.get({ key: 'token' });
  const { value: loginData } = await Preferences.get({ key: 'loginCreado' });
  const { value: nombre } = await Preferences.get({ key: 'nombre' });
  const { value: rol } = await Preferences.get({ key: 'rol' });
  
  console.log('=== DATOS EN PREFERENCES ===');
  console.log('Token:', token);
  console.log('LoginData:', loginData);
  console.log('Nombre:', nombre);
  console.log('Rol:', rol);
  
  if (token && loginData) {
    const userData = JSON.parse(loginData);
    console.log('ID del usuario actual:', userData.id);
    
    // Verificar qué datos retorna el backend para este usuario específico
    try {
      console.log('=== PETICIONES AL BACKEND ===');
      const productos = await cantidadProductosEmpresa(token);
      const usuarios = await cantidadUsuarios(token);
      const actividades_data = await actividadesRecientes(token);
      
      console.log('Productos para usuario ID', userData.id, ':', productos);
      console.log('Usuarios para usuario ID', userData.id, ':', usuarios);
      console.log('Actividades para usuario ID', userData.id, ':', actividades_data);
      
    } catch (error) {
      console.error('Error en peticiones al backend:', error);
    }
  }
}
async function cargarActividades(){
  console.log('=== CARGANDO ACTIVIDADES ===');
  const { value: token } = await Preferences.get({ key: 'token' });
  console.log('Token para actividades:', token);
  
  if (!token) {
    console.log('No hay token, estableciendo actividades vacías');
    actividades.value = [];
    return;
  }
  
  try {
    const response = await actividadesRecientes(token);
    console.log('Respuesta actividades:', response);
    
    // Si la respuesta es un array:
    if(Array.isArray(response)) {
      actividades.value = response.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).slice(0, 4);
    } else {
      actividades.value = [];
    }
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    actividades.value = [];
  }
}

async function obtenerNombre() {
  console.log('=== OBTENIENDO NOMBRE ===');
  const { value } = await Preferences.get({ key: 'nombre' });
  console.log('Nombre desde Preferences:', value);
  nombre.value = value || 'Usuario';
} 

async function contarUsuarios() {
  console.log('=== CONTANDO USUARIOS ===');
  const { value: token } = await Preferences.get({ key: 'token' });
  console.log('Token para usuarios:', token);

  if (!token) {
    console.log('No hay token, estableciendo usuarios en 0');
    usuariosActuales.value = 0;
    return;
  }

  try {
    const response = await cantidadUsuarios(token);
    console.log('Respuesta usuarios:', response);
    
    if (Array.isArray(response)) {
      usuariosActuales.value = response.length;
    } else if (response && Array.isArray(response.usuarios)) {
      usuariosActuales.value = response.usuarios.length;
    } else {
      usuariosActuales.value = 0;
    }
    console.log('Usuarios actuales:', usuariosActuales.value);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    usuariosActuales.value = 0;
  }
}

async function cerrarSesion(){
  console.log('=== CERRANDO SESIÓN COMPLETA ===');
  
  // 1. Limpiar TODOS los datos de Preferences
  await Preferences.clear();
  
  // 2. Limpiar el token del header de axios
  setAuthToken('');
  
  // 3. Limpiar variables reactivas
  itemsActuales.value = 0;
  usuariosActuales.value = 0;
  productosBajoStock.value = 0;
  actividades.value = [];
  nombre.value = '';
  
  // 4. Forzar recarga completa de la página
  window.location.href = "/usuarioUI/PantallaBienvenida";
}
function revisarInventario(){
  router.push("/tabs/Inventario");
}

function formatearFecha(fechaIso: string): string {
  if (!fechaIso) return '';
  const fecha = new Date(fechaIso);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const año = fecha.getFullYear();
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${año} ${horas}:${minutos}`;
}

async function cargarDashboard() {
  console.log('=== CARGANDO DASHBOARD ===');
  const { value: token } = await Preferences.get({ key: 'token' });
  const { value: loginData } = await Preferences.get({ key: 'loginCreado' });
  console.log('Token en Dashboard:', token);
  console.log('Datos de login en Dashboard:', loginData);
  
  await obtenerNombre();
  await contadorProductos();
  await contarUsuarios();
  await cargarActividades();
  
  console.log('=== DASHBOARD CARGADO ===');
}

onMounted(async() => {
  await cargarDashboard();
});

onIonViewWillEnter(async () => {
  console.log('=== ENTRANDO A DASHBOARD ===');
  await cargarDashboard();
});
</script>

<style>
.cardsInline{
  display: flex; 
  flex-wrap: wrap; 
  align-items: center; 
  width: 100%;
}
.tituloCarta.Productos, .tituloCarta.Usuarios{
  width: 44%;
}
.headerFlex{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}
.infoCol{
    width: 10rem;
}
.actividad-linea {
  display: flex;
  align-items: center;
  margin: 0;
}
.fechaActividad {
  font-size: 0.8em;
  color: #666;
  margin-left: auto; /* empuja la fecha hacia la derecha */
}
</style>