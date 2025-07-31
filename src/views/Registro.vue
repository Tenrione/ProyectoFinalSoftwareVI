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
                <ion-card-title class="tituloCarta"><strong>Registrarse</strong></ion-card-title>
                <ion-card-subtitle>Cree una cuenta en PyManagEr</ion-card-subtitle>
            </ion-card-header>
        <ion-card-content>
            <ion-label>
                <h2>
                    Inserte su nombre
                </h2>
            </ion-label>
            <ion-input label="Nombre" label-placement="floating" :clear-input="true" fill="outline" type="text" id="nombreInput" ::maxlength="20" v-model="nombreInput" :min="5">

            </ion-input>
            <br>
            <ion-label>
                <h2>
                    Inserte su apellido
                </h2>
            </ion-label>
            <ion-input label="Apellido" label-placement="floating" :clear-input="true" fill="outline" type="text" id="apellidoInput" ::maxlength="20" v-model="apellidoInput" :min="5">
            </ion-input>
            <br>
            <ion-label>
                <h2>
                    Inserte su usuario
                </h2>
            </ion-label>
            <ion-input label="Usuario" label-placement="floating" :clear-input="true" fill="outline" type="text" id="userInput" v-model="userInput" :min="8" ::maxlength="20">

            </ion-input>
            <br>
            <ion-label>
                <h2>
                    Inserte su RUC
                </h2>
            </ion-label>
            <ion-input label="RUC (con guiones)" label-placement="floating" :clear-input="true" fill="outline" type="text" id="rucInput" v-model="rucInput">

            </ion-input>
            <br>
            <ion-label>
                <h2>
                    Inserte su Cedula
                </h2>
            </ion-label>
            <ion-input label="Cédula(con guiones)" label-placement="floating" :clear-input="true" fill="outline" type="text" id="cedulaInput" v-model="cedulaInput">

            </ion-input>
            <br>
            <ion-label>
                <h2>
                    Inserte su correo
                </h2>
            </ion-label>
            <ion-input label="correo" label-placement="floating" :clear-input="true" fill="outline" type="email" id="correoInput" v-model="correoInput">

            </ion-input>
            <br>
            <ion-label>
                <h2>
                    Inserte su contraseña
                </h2>
            </ion-label>
            <ion-input label="Contraseña (minimo 8 caracteres)" label-placement="floating" :clear-input="true" fill="outline" type="password" id="passInput" v-model="passInput">
                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
            </ion-input>
            <ion-label>
                <h2>
                    Inserte su contraseña nuevamente
                </h2>
            </ion-label>
            <ion-input label="Confirmar contraseña" label-placement="floating" :clear-input="true" fill="outline" type="password" id="passInputConfirm" v-model="passInputConfirm" :min="8">
                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
            </ion-input>

          <ion-button expand="block" class="botonPersonalizado ion-margin-top" @click="registroUsuario()">
            Registrarse
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
import { ref } from 'vue';
import { registrarUsuario } from '@/services/usuarios';
//Variables creadas para despues validar que no den espacios vacios
const nombreInput = ref('');
const apellidoInput = ref('');
const userInput = ref('');
const rucInput = ref('');
const cedulaInput = ref('');
const correoInput = ref('');
const passInput = ref('');
const passInputConfirm = ref('');
function retrocederPantalla(){
    router.replace("/usuarioUI/PantallaBienvenida")
}
async function registroUsuario() {
//Se obtienen los valores de los inputs
  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  const usuario = userInput.value.trim();
  const ruc = rucInput.value.trim();
  const cedula = cedulaInput.value.trim();
  const correo = correoInput.value.trim();
  const password = passInput.value.trim();
  const confirmPassword = passInputConfirm.value.trim();

  // Perform validation
  if (!nombre || !apellido || !usuario || !ruc || !cedula || !correo || !password || !confirmPassword) {
    await presentAlert('Error de Registro', 'Por favor, rellene todos los campos antes de registrarse.');
    return; 
  }
  if (password.length <8){
    await presentAlert('Error en la contraseña', 'Inserte una contraseña de minimo 8 caracteres')
    return
  }
  const RUC_REGEX = /^(\d{10}-\d{1}|\d{7}-\d{1}-\d{6})$/;
  if (!RUC_REGEX.test(ruc)){
    await presentAlert('Error en el Ruc', 'Por favor inserte un RUC valido');
    return;
  }
  const cedulaRegex=/^\d-\d{3,4}-\d{3,4}$/;
  if(!cedulaRegex.test(cedula)){
    await presentAlert('Error de Cedula', 'Por favor, introduzca una cedula valida.');
    return;
  }

  if (password !== confirmPassword) {
    await presentAlert('Error de Contraseña', 'Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    return;
  }
  

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    await presentAlert('Error de Correo', 'Por favor, introduzca un correo electrónico válido.');
    return;
  }
  //Tipo usuario quemado dado que si lo crea es por que es admin
  const UsuarioRegistro = {
    "nombre": nombre+" "+ apellido,
    "email": correo,
    "password_hash": password,
    
    "rol": "admin",
    "usuario": usuario,
    "cedula": cedula
  }
  try{
    const rucInsert = ruc
    const response = await registrarUsuario(rucInsert, UsuarioRegistro)
    console.log(response)
    if(response && response.mensaje === "Usuario creado correctamente"){
      await presentAlert('Usuario creado exitosamente', '¡Ya puede iniciar sesion!')
      router.replace("/usuarioUI/Login");
    }
    else{
      await presentAlert('Usuario fallo en el registro', 'Tus credenciales son incorrectas')
    }
  }
  catch(error){
    await presentAlert('Usuario fallo en el registro', 'Tus credenciales son incorrectas')
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