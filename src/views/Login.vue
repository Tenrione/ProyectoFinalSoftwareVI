<template>
  <ion-page>
    <ion-toolbar class="toolbarStyle">
        <ion-buttons slot="start" >
          <ion-button @click="retrocederPantalla()" class="ion-padding botonPersonalizado">
            <ion-icon :icon="arrowBackOutline" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
    </ion-toolbar>
    <ion-content :fullscreen="true" class="bodyStyle ion-padding">
      <ion-card class="cartaLoginReg">
            <ion-card-header>
                <ion-card-title class="tituloCarta"><strong></strong>Iniciar Sesion</ion-card-title>
                <ion-card-subtitle>Accede a tu cuenta de PyManagEr</ion-card-subtitle>
            </ion-card-header>
        <ion-card-content>
            <ion-label>
                <h2>
                    Inserte su usuario
                </h2>
            </ion-label>
            <ion-input label="Usuario" label-placement="floating" :clear-input="true" fill="outline" type="text" id="userInput" v-model="userInput" :min="8">

            </ion-input>
            <br>
            <ion-label>
                <h2>
                    Inserte su contraseña
                </h2>
            </ion-label>
            <ion-input label="Contraseña" label-placement="floating" :clear-input="true" fill="outline" type="password" :min="8" id="passInput" v-model="passInput">
                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
            </ion-input>

          <ion-button expand="block" class="botonPersonalizado ion-margin-top" @click="iniciarSesion()">
            Iniciar Sesion
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import router from '@/router';
import { Preferences } from '@capacitor/preferences';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonButtons, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonLabel, IonInputPasswordToggle, alertController, IonIcon} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { ref ,onMounted} from 'vue';
import { usuarioLogin } from '@/services/usuarios';
import { setAuthToken } from '@/services/api';

const passInput=ref('');
const userInput=ref('');

async function crearSesion(token: any, nombre: string, rol: string, id: string, ruc: string) {
    console.log('Guardando datos en Preferences:');
    console.log('Token:', token);
    console.log('Nombre:', nombre);
    console.log('Rol:', rol);
    console.log('ID:', id);
    console.log('RUC:', ruc); // Log para verificar
    
    await Preferences.set({ key: 'token', value: token });
    await Preferences.set({ key: 'nombre', value: nombre });
    await Preferences.set({ key: 'rol', value: rol });
    await Preferences.set({ key: 'id', value: id }); // Guardar ID también
    
    // 2. Guarda el RUC si existe
    if (ruc) {
        await Preferences.set({ key: 'ruc', value: ruc });
    }
}

function retrocederPantalla(){
    router.replace("/usuarioUI/PantallaBienvenida")
}

async function iniciarSesion(){
  const usuario = userInput.value.trim();
  const password = passInput.value.trim();
  
  if(!usuario || !password){
    await presentAlert('Error de Inicio de Sesion', 'Por favor, rellene todos los campos antes de registrarse.');
    return;
  }
  
  const usuarioLoginIn = {
    "username": usuario,
    "password": password
  };
   
  
 try {
    const response = await usuarioLogin(usuarioLoginIn);
    console.log('Respuesta completa del login:', response);
    
    if(response.token) {
      // 3. Pasa el RUC (response.ruc) a la función crearSesion
      await crearSesion(response.token, response.nombre, response.rol, response.id, response.ruc);
      setAuthToken(response.token);
      router.replace("/tabs/Dashboard");
    } else {
      await presentAlert('Usuario fallo en el inicio de sesion', 'Tus credenciales son incorrectas');
      return;
    }
  } catch(error) {
    console.error('Error en login:', error);
    await presentAlert('Usuario fallo en el inicio de sesion', 'Tus credenciales son incorrectas');
  }
}

async function presentAlert(header: string, message: string) {
  const alert = await alertController.create({
    header: header,
    message: message,
    buttons: ['OK'],
  });
  await alert.present();
}

//Hacer las funciones para que se envie la info en la base de datos con un get
//si se recibe respuesta sera login y se guardara el token en vez de un true
</script>
<style scoped>
ion-content{
    text-align: center;
}
ion-label {
  display: block;
  text-align: left;
  margin-left: 0.5rem; 
}
</style>