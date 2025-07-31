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
                  <ion-icon :icon="peopleOutline"></ion-icon>
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
            <ion-button class="botonPersonalizado" id="open-modalPerfil">Editar Usuario</ion-button>
            <ion-button color="danger" class="botonPersonalizado" @click="canDismiss()">Eliminar Cuenta</ion-button>
            
        </ion-card-content>
      </ion-card>
      <ion-modal color="light" ref="modalPerfil" trigger="open-modalPerfil" @willDismiss="onWillDismiss">
            <ion-header>
              <ion-toolbar class="toolbarStyle">
                <ion-buttons slot="start">
                  <ion-button @click="cancel()">Cancelar</ion-button>
                </ion-buttons>
                <ion-title>Editar Usuario</ion-title>
                <ion-buttons slot="end">
                  <ion-button :strong="true" @click="confirm()">Guardar</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding bodyStyle" color="dark">
              <!-- Aqui se precargaran los datos del usuario para que al guardar se envie un PUT -->
              <h4><strong>Nombre Completo</strong></h4>
                <ion-input label="Nombre Completo"label-placement="floating" :clear-input="true" fill="outline" type="text" ref="nombreUsuario" :maxlength="30" placeholder="Ej. Miguel Zamora"
                ></ion-input>

                <h4><strong>Usuario</strong></h4>
                <ion-input label="Usuario"label-placement="floating" :clear-input="true" fill="outline" type="text" ref="Usuario" :maxlength="30" placeholder="JZamora"
                ></ion-input>

                <h4><strong>Inserte el correo</strong></h4>
                <ion-input label="Email"label-placement="floating" :clear-input="true" fill="outline" type="email" ref="email" placeholder="tuempresa@gmail.com"
                ></ion-input>

                <h4><strong>Contraseña</strong></h4>
                <ion-input label="Contraseña"label-placement="floating" :clear-input="true" fill="outline" type="password" ref="nombreUsuario" :maxlength="20"
                ></ion-input>
            </ion-content>
          </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from '@/router';
import { Preferences } from '@capacitor/preferences';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonCard,IonCardContent,IonCardHeader,IonCardTitle, IonCardSubtitle, IonButton, actionSheetController, IonInput, IonModal} from '@ionic/vue';
import { peopleOutline } from 'ionicons/icons';
import { defineComponent, ref} from 'vue';
import { OverlayEventDetail } from '@ionic/core/components';

  const modalPerfil = ref();
  const name = ref();
  const cancel = () => modalPerfil.value.$el.dismiss(null, 'cancel');
  const confirm = () => {
  modalPerfil.value.$el.dismiss(name, 'confirm');
}
  const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
    if (event.detail.role === 'confirm') {
    }
  }
  //Mensaje para confirmar si quiere eliminar la cuenta
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
  align-items: center;
}
.roundedImg{
  display: flex;
  height: 5em;
  width: 5em;
  border-radius: 50%;
  background-color: gray;
  justify-content: center;
  align-items: center;
}
.roundedImg ion-icon{
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
}
</style>