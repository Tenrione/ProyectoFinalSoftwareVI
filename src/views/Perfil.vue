<template>

  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbarStyle">
        <ion-title>Perfil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="bodyStyle">
      <ion-card class="tituloCarta" color="dark">
          <ion-card-header>
            <ion-card-title>
              <div class="headerFlex">
                <div class="roundedImg">

                </div>
                <div class="detalles">
                  <!-- Get del nombre de usuario -->
                  <h2><strong>Administrador</strong></h2>
                </div>
              </div>

            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <!-- GET de nombre + Apellido -->
            <h3>Nombre: Eriel Ten Su</h3>
            <br>
            <!-- GET de cedula -->
            <h3>Cedula: 8-1024-2395</h3>
            <br>
            <!-- GET del ruc -->
             <!-- Este no podra ser editado al actualizar -->
            <h3>RUC: 1234567890-1</h3>
            <br>
            <h3>Correo: eriel@gmail.com</h3>
            <br>
            <h3>Tipo: Administrador</h3>
            <br>
            <ion-button color="danger" class="botonPersonalizado" @click="canDismiss()">Eliminar Usuario</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from '@/router';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonCard,IonCardContent,IonCardHeader,IonCardTitle, IonCardSubtitle, IonButton, actionSheetController} from '@ionic/vue';
import { defineComponent, ref} from 'vue';

const presentingElement = ref<any>(null)
const canDismiss = async () => {
  const actionSheet = await actionSheetController.create({
    header: '¿Estás seguro que quieres eliminar tu cuenta?',
    buttons: [
      { text: 'Sí', role: 'confirm', handler: async () => {
          eliminarUsuario()
        } },
      { text: 'No', role: 'cancel' }
    ],
  })
  await actionSheet.present()
  const { role } = await actionSheet.onWillDismiss()
  return role === 'confirm'
}
async function eliminarUsuario(){
  //Logica para eliminar usuario introducido actualmente
  await Preferences.remove({key: 'loginCreado'})
  router.replace('/usuarioUI/PantallaBienvenida')
}

</script>
<style>
.headerFlex{
  display: flex;
  justify-content: space-around;
  justify-items: center;
}
.roundedImg{
  height: 5em;
  width: 5em;
  border-radius: 50%;
  background-color: gray;
}
</style>