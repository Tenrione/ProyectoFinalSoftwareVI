<template>
  <ion-page v-if="rolUsuario === 'admin'">
    <ion-header>
      <ion-toolbar class="toolbarStyle">
        <ion-title><strong>Gestion de Usuarios</strong></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="bodyStyle">
      <ion-header collapse="condense"></ion-header>
      <ion-searchbar show-clear-button="focus" color="dark" class="barraBusqueda"></ion-searchbar>
      
      <!-- Mostrar mensaje de carga -->
      <div v-if="cargando" style="text-align: center; padding: 2rem;">
        <p>Cargando usuarios...</p>
      </div>
      
      <ion-card
        v-for="usuario in listaUsuarios"
        :key="usuario.id"
        class="tituloCarta"
        color="dark"
      >
        <ion-card-content>
          <div class="displayFixed">
            <div class="icono">
              <ion-icon :icon="usuario.rol === 'admin' ? shieldOutline : personOutline" class="tamIcon"></ion-icon>
            </div>
            <div class="headerFlex">
              <div class="detalles">
                <h2><strong>{{ usuario.nombre }}</strong></h2>
                <p>{{ usuario.email }}</p>
                <div :class="usuario.rol === 'admin' ? 'tipoAdmin' : 'tipoTrabajador'">
                  <p>{{ usuario.rol === 'admin' ? 'Administrador' : 'Empleado' }}</p>
                </div>
              </div>
              <div>
                <ion-button class="rounded" color="danger" @click="borrarUsuario(usuario.id)">
                  <ion-icon :icon="trashOutline"></ion-icon>
                </ion-button>
              </div>
            </div>
          </div>
          <p>Creado en: {{ usuario.fecha_creacion }}</p>
        </ion-card-content>
      </ion-card>
      
      <!-- Modal para AGREGAR usuario -->
      <ion-modal color="light" ref="modalUser" trigger="open-modalUser">
        <ion-header>
          <ion-toolbar class="toolbarStyle">
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancelar</ion-button>
            </ion-buttons>
            <ion-title>Agregar Usuario</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()">Guardar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding bodyStyle" color="dark">
          <h4><strong>Nombre Completo</strong></h4>
          <ion-input 
            label="Nombre Completo" 
            label-placement="floating" 
            :clear-input="true" 
            fill="outline" 
            type="text" 
            ref="nombreUsuario" 
            :maxlength="50" 
            placeholder="Ej. Juan Perez"
          ></ion-input>

          <h4><strong>Usuario</strong></h4>
          <ion-input 
            label="Usuario" 
            label-placement="floating" 
            :clear-input="true" 
            fill="outline" 
            type="text" 
            ref="usuario" 
            :maxlength="30" 
            placeholder="juanp22"
          ></ion-input>

          <h4><strong>Email</strong></h4>
          <ion-input 
            label="Email" 
            label-placement="floating" 
            :clear-input="true" 
            fill="outline" 
            type="email" 
            ref="email" 
            placeholder="funcionaconio@empresa.com"
          ></ion-input>
          
          <h4><strong>Cédula</strong></h4>
          <ion-input 
            label="Cédula (con guiones)" 
            label-placement="floating" 
            :clear-input="true" 
            fill="outline" 
            type="text" 
            ref="cedula" 
            placeholder="3-1103-4536"
          ></ion-input>

          <h4><strong>Contraseña</strong></h4>
          <ion-input 
            label="Contraseña" 
            label-placement="floating" 
            :clear-input="true" 
            fill="outline" 
            type="password" 
            ref="password" 
            :maxlength="20" 
            placeholder="Mínimo 8 caracteres"
          ></ion-input>

          <h4><strong>Rol</strong></h4>
          <ion-segment v-model="rolSeleccionado" value="empleado" class="segmentStyle">
            <ion-segment-button value="empleado">
              <ion-label>Empleado</ion-label>
            </ion-segment-button>
            <ion-segment-button value="admin">
              <ion-label>Administrador</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-content>
      </ion-modal>
      
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button id="open-modalUser">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
  <ion-page v-else>
    <ion-content>
      <h2 style="text-align:center; margin-top:2rem;">Acceso solo para administradores</h2>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonSearchbar, IonButton, IonIcon, IonCard, IonCardContent, IonSegment, IonSegmentButton, IonLabel, IonModal, IonButtons, IonInput, alertController } from '@ionic/vue';
import { add, personOutline, shieldOutline, trashOutline } from 'ionicons/icons';
import { ref, onMounted } from 'vue'
import { OverlayEventDetail } from '@ionic/core/components';
import { Preferences } from '@capacitor/preferences';
import { obtenerUsuariosEmpresa, registrarUsuario, borrarUsuario as borrarUsuarioService } from '@/services/usuarios';
import { onIonViewWillEnter } from '@ionic/vue';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  fecha_creacion: string;
}

const listaUsuarios = ref<Usuario[]>([]);
const rolUsuario = ref('');
const modalUser = ref();
const name = ref();
const cargando = ref(true);
const rolSeleccionado = ref('empleado');

// Referencias para los campos del formulario
const nombreUsuario = ref();
const usuario = ref();
const email = ref();
const cedula = ref();
const password = ref();

// Función para mostrar alertas
async function presentAlert(header: string, message: string) {
  const alert = await alertController.create({
    header: header,
    message: message,
    buttons: ['OK'],
  });
  await alert.present();
}

// Función para mostrar confirmación
async function presentConfirm(header: string, message: string): Promise<boolean> {
  return new Promise(async (resolve) => {
    const alert = await alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => resolve(false)
        },
        {
          text: 'Confirmar',
          handler: () => resolve(true)
        }
      ]
    });
    await alert.present();
  });
}

const cancel = () => {
  try {
    modalUser.value.$el.dismiss(null, 'cancel');
  } catch (error) {
    console.error('Error al cerrar modal:', error);
  }
};

const confirm = async () => {
  console.log('=== GUARDANDO NUEVO USUARIO ===');
  
  // Obtener valores de los campos
  const nombre = nombreUsuario.value.$el.value;
  const user = usuario.value.$el.value;
  const emailVal = email.value.$el.value;
  const cedulaVal = cedula.value.$el.value;
  const pass = password.value.$el.value;

  // Validaciones
  if (!nombre || !user || !emailVal || !cedulaVal || !pass) {
    await presentAlert('Error', 'Por favor, rellene todos los campos.');
    return; 
  }
  // ... (otras validaciones)

  try {
    const { value: rucEmpresa } = await Preferences.get({ key: 'ruc' });

    if (!rucEmpresa) {
      await presentAlert('Error', 'No se encontró el RUC de la empresa. Por favor, inicie sesión de nuevo.');
      return;
    }

    const usuarioData = {
      "nombre": nombre,
      "email": emailVal,
      "password_hash": pass,
      "rol": rolSeleccionado.value,
      "usuario": user,
      "cedula": cedulaVal
    };
    
    // 1. Intentamos registrar el usuario
    await registrarUsuario(rucEmpresa, usuarioData);

    // 2. Si llegamos aquí, el usuario se creó con éxito.
    // Cerramos el modal y limpiamos los campos inmediatamente.
    await modalUser.value.$el.dismiss();
    limpiarCampos();

    // 3. Mostramos el mensaje de éxito.
    await presentAlert('¡Éxito!', 'Usuario creado exitosamente.');

    // 4. Por último, intentamos recargar la lista de usuarios.
    // Si esto falla, no afectará el mensaje de éxito que el usuario ya vio.
    await cargarUsuarios();

  } catch (error) {
    console.error('Error al guardar o recargar:', error);
    // Si algo falla (ya sea el registro o la recarga), cerramos el modal si aún está abierto.
    try {
      await modalUser.value.$el.dismiss();
    } catch (e) {
      // Ignoramos el error si el modal ya estaba cerrado
    }
    await presentAlert('Error', 'Ocurrió un error. Por favor, verifique la lista de usuarios.');
  }
}

// Función para limpiar campos del formulario
function limpiarCampos() {
  if (nombreUsuario.value?.$el) nombreUsuario.value.$el.value = '';
  if (usuario.value?.$el) usuario.value.$el.value = '';
  if (email.value?.$el) email.value.$el.value = '';
  if (cedula.value?.$el) cedula.value.$el.value = '';
  if (password.value?.$el) password.value.$el.value = '';
  rolSeleccionado.value = 'empleado';
}

// Función para limpiar datos
function limpiarDatos() {
  console.log('=== LIMPIANDO DATOS USUARIOS ===');
  listaUsuarios.value = [];
  cargando.value = true;
}

// Función para validar token
async function validarToken(): Promise<string | null> {
  const { value: token } = await Preferences.get({ key: 'token' });
  if (!token) {
    console.log('❌ No hay token válido');
    return null;
  }
  return token;
}

async function obtenerRol() {
  console.log('=== OBTENIENDO ROL USUARIOS ===');
  const { value } = await Preferences.get({ key: 'rol' });
  rolUsuario.value = value || '';
  console.log('Rol obtenido:', rolUsuario.value);
  
  if (rolUsuario.value !== 'admin') {
    console.log('❌ Usuario no es admin');
    return false;
  }
  
  return true;
}

async function cargarUsuarios() {
  console.log('=== CARGANDO USUARIOS DE LA EMPRESA ===');
  const token = await validarToken();
  
  if (!token) {
    console.log('❌ Token inválido, limpiando lista');
    listaUsuarios.value = [];
    return;
  }
  
  try {
    console.log('🔄 Haciendo petición a obtenerUsuariosEmpresa...');
    const response = await obtenerUsuariosEmpresa(token);
    console.log('✅ Respuesta recibida:', response);
    
    // Asegurar que es un array
    if (Array.isArray(response)) {
      listaUsuarios.value = response;
      console.log(`👥 ${response.length} usuarios cargados`);
    } else {
      console.log('❌ Respuesta no es array:', typeof response);
      listaUsuarios.value = [];
    }
  } catch (error: any) {
    console.error('❌ Error al cargar usuarios:', error);
    listaUsuarios.value = [];
    
    if (error?.response?.status === 401) {
      console.log('🔐 Token expirado, redirigiendo...');
      // Opcional: redirigir al login
    }
  }
}

async function eliminarUsuario(id: number) {
  console.log('=== ELIMINANDO USUARIO ===', id);
  
  try {
    const confirmar = await presentConfirm('¿Eliminar usuario?', 'Esta acción no se puede deshacer');
    
    if (!confirmar) {
      return;
    }

    const token = await validarToken();
    if (!token) {
      await presentAlert('Error', 'No se encontró token de autenticación');
      return;
    }

    console.log('🗑️ Eliminando usuario con ID:', id);
    await borrarUsuarioService(token, id);
    
    console.log('✅ Usuario eliminado exitosamente');
    
    // Recargar la lista de usuarios
    await cargarUsuarios();
    
    await presentAlert('¡Eliminado!', 'Usuario eliminado exitosamente');
    
  } catch (error) {
    console.error('❌ Error al borrar usuario:', error);
    await presentAlert('Error', 'No se pudo eliminar el usuario');
  }
}

async function cargarVistaUsuarios() {
  console.log('=== INICIANDO CARGA VISTA USUARIOS ===');
  
  // 1. Limpiar datos anteriores
  limpiarDatos();
  
  // 2. Validar token
  const token = await validarToken();
  if (!token) {
    cargando.value = false;
    return;
  }
  
  // 3. Obtener y validar rol
  const esAdmin = await obtenerRol();
  if (!esAdmin) {
    cargando.value = false;
    return;
  }
  
  // 4. Cargar usuarios
  await cargarUsuarios();
  
  // 5. Finalizar carga
  cargando.value = false;
  console.log('=== VISTA USUARIOS CARGADA ===');
}

// Cambiar nombre de función para evitar conflicto
async function borrarUsuario(id: number) {
  await eliminarUsuario(id);
}

onMounted(async () => {
  console.log('🎯 MOUNTED - Usuarios.vue');
  await cargarVistaUsuarios();
});

onIonViewWillEnter(async () => {
  console.log('🎯 ION VIEW WILL ENTER - Usuarios.vue');
  await cargarVistaUsuarios();
});
</script>

<style scoped>
.segmentStyle {
  --indicator-color: transparent;
  --text-color: black;
  --border-radius: 8px;
  padding: 4px;
}

ion-segment-button {
  --background: #f0f0f0;
  --color: #000;
  --border-radius: 8px;
  font-weight: 500;
  margin-right: 6px;
}

.headerFlex{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.displayFixed {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.detalles{
  width: 11rem;
}

.tipoAdmin{
  background-color: rgb(68, 68, 86);
  color: white;
  width: 60%;
  border-radius: 5rem;
  text-align: center;
}

.tipoTrabajador{
  background-color: rgb(82, 209, 90);
  color: white;
  width: 60%;
  text-align: center;
  border-radius: 5rem;
}

.icono{
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  background-color: lightgrey;
  align-items: center;
  display: flex;
  justify-content: center;
}

.rounded{
  --border-radius: 50%;
  height: 2.8rem;
  width: 2.8rem;
}

.tamIcon{
  height: 80%;
  width: 80%;
}

.mostrarInline{
  display: flex;
  justify-content: space-between;
}

.barraBusqueda{
  --border-radius: 0.5rem;
  box-shadow: none;
}
</style>