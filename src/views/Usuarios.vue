<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbarStyle">
        <ion-title><strong>Gestion de Usuarios</strong>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="bodyStyle">
      <ion-header collapse="condense">
      </ion-header>
      <ion-searchbar show-clear-button="focus"  color="dark" class="barraBusqueda">

      </ion-searchbar >
      <ion-card class="tituloCarta" color="dark">
        <ion-card-content>
          <div class="displayFixed">
            <!-- Esto tenemos que configurarlo que solo salga si es admin -->
            <div class="icono">
              <ion-icon :icon="shieldOutline" class="tamIcon"></ion-icon>
            </div>
            <!-- Aqui que solo se muestren los detalles -->
            <div class="headerFlex">
              <div class="detalles">
                <h2><strong>Adminsitrador Principal</strong></h2>
                <!-- Aqui tendria que ser un get del correo -->
                <p>admin@gmail.com</p>
                <div class="tipoAdmin">
                  <p>Administrador</p>
                </div>
              </div>
              <div>
                <ion-button class="rounded" color="danger">
                  <ion-icon :icon="trashOutline"></ion-icon>
                </ion-button>
              </div>
            </div>
          </div>
          <p>Creado en: 29/07/2025</p>
        </ion-card-content>
      </ion-card>
      <ion-card class="tituloCarta" color="dark">
        <ion-card-content>
          <div class="displayFixed">
            <!-- Esto tenemos que configurarlo que solo salga si es admin -->
            <div class="icono">
              <ion-icon :icon="personOutline" class="tamIcon"></ion-icon>
            </div>
            <!-- Aqui que solo se muestren los detalles -->
            <div class="headerFlex">
              <div class="detalles">
                <h2><strong>Eriel Ten Su</strong></h2>
                <!-- Aqui tendria que ser un get del correo -->
                <p>eriel@gmail.com</p>
                <div class="tipoTrabajador">
                  <p>Trabajador</p>
                </div>
              </div>
              <div>
                <ion-button class="rounded" color="danger">
                  <ion-icon :icon="trashOutline"></ion-icon>
                </ion-button>
              </div>
            </div>
          </div>
          <p>Creado en: 29/07/2025</p>
          
        </ion-card-content>
      </ion-card>
      <ion-modal color="light" ref="modalUser" trigger="open-modalUser" @willDismiss="onWillDismiss">
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
                <ion-input label="Nombre Completo"label-placement="floating" :clear-input="true" fill="outline" type="text" ref="nombreUsuario" :maxlength="30" placeholder="Ej. Miguel Zamora"
                ></ion-input>

                <h4><strong>Usuario</strong></h4>
                <ion-input label="Usuario"label-placement="floating" :clear-input="true" fill="outline" type="text" ref="Usuario" :maxlength="30" placeholder="JZamora"
                ></ion-input>

                <h4><strong>Inserte el correo</strong></h4>
                <ion-input label="Email"label-placement="floating" :clear-input="true" fill="outline" type="email" ref="email" placeholder="tuempresa@gmail.com"
                ></ion-input>
                
                <h4>
                    <strong>Inserte su Cedula</strong>
                </h4>
                <ion-input label="Cédula(con guiones)" label-placement="floating" :clear-input="true" fill="outline" type="text" id="cedulaInput">
                  </ion-input>

                <h4><strong>Contraseña</strong></h4>
                <ion-input label="Contraseña"label-placement="floating" :clear-input="true" fill="outline" type="password" ref="nombreUsuario" :maxlength="20"
                ></ion-input>
                <h4><strong>Rol:</strong></h4>
                <ion-segment v-model="rolSeleccionado" value="trabajador" class="segmentStyle">
                  <ion-segment-button value="trabajador">
                    <ion-label>Empleado</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="administrador">
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
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonSearchbar, IonButton, IonIcon, IonCard,IonCardContent,IonSegment, IonSegmentButton,IonLabel, IonModal, IonButtons, IonInput} from '@ionic/vue';
import { add, personOutline, shieldOutline, trashOutline } from 'ionicons/icons';
import {ref}from 'vue'
import { OverlayEventDetail } from '@ionic/core/components';
  const rolSeleccionado = ref('trabajador');
  const modalUser = ref();
  const name = ref();
  const cancel = () => modalUser.value.$el.dismiss(null, 'cancel');
  const confirm = () => {
  modalUser.value.$el.dismiss(name, 'confirm');
}
  const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
    if (event.detail.role === 'confirm') {
    }
  }
</script>




<style scoped>
.segmentStyle {
  /* Keep this for the overall segment background */
  --indicator-color: transparent;
  /* Set indicator-color to transparent to hide the default indicator */
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
