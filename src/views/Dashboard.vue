<template>
  <ion-page>
    <ion-header>
      
      <ion-toolbar class="toolbarStyle">
        <!-- Cambiar mi nombre por una variable que guarde el nombre -->
        <ion-title>
          Bienvenido de nuevo, <strong>Eriel</strong>
        </ion-title>
        <ion-buttons slot="end" color="primary">
          <ion-button @click="cerrarSesion()">
          Salir
        </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="bodyStyle">
      <div class="centrarAbsoluto">
        <div class="cardsInline">
      <ion-card class="tituloCarta Productos">
        <ion-card-header>
          <ion-card-title color="light">
            <ion-icon :icon="cubeOutline"></ion-icon>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <!-- Reemplazar con un get de los items en inventario -->
          <h2><strong>127</strong></h2>
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
          <h2><strong>8</strong></h2>
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
          <h2><strong>8</strong></h2>
          <p>Stock bajo</p>
        </ion-card-content>
      </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from '@/router'
import { Preferences } from '@capacitor/preferences';

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, IonButtons, IonGrid, IonCol, IonRow } from '@ionic/vue';
import { cubeOutline, peopleOutline, warningOutline } from 'ionicons/icons';
async function cerrarSesion(){
  await Preferences.remove({ key: 'loginCreado' })
  router.push("/usuarioUI/PantallaBienvenida")
}
function revisarInventario(){
  router.push("/tabs/Inventario")
}
</script>
<style>
.centrarAbsoluto{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.cardsInline{
  display: flex; 
  flex-wrap: wrap; 
  align-items: center; 
  width: 100%;
}
.tituloCarta.Productos, .tituloCarta.Usuarios{
  width: 45%;
}
.tituloCarta.Stock{
  width: 95%;
}
.headerFlex{
  display: flex;
  align-items: start;
  justify-content: space-between;
  font-weight: bold;
}
.infoCol{
    width: 10rem;
}
</style>