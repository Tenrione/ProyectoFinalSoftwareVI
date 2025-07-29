<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="toolbarStyle">
        <ion-tab-button tab="tab1" href="/tabs/Dashboard">
          <ion-icon aria-hidden="true" :icon="barChart" />
        </ion-tab-button>

        <ion-tab-button tab="Inventario" href="/tabs/Inventario">
          <ion-icon aria-hidden="true" :icon="cubeOutline" />
        
        </ion-tab-button>

        <ion-tab-button tab="Usuarios" href="/tabs/Usuarios">
          <ion-icon aria-hidden="true" :icon="peopleOutline" />
        
        </ion-tab-button>

        <ion-tab-button tab="Facturas" href="/tabs/Facturas">
          <ion-icon :icon="receiptOutline"/>
        </ion-tab-button>

        <ion-tab-button tab="Perfil" href="/tabs/Perfil">
          <ion-icon aria-hidden="true" :icon="personCircle" />
        
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet} from '@ionic/vue';
import { receiptOutline, peopleOutline, personCircle, cubeOutline, barChart } from 'ionicons/icons';
</script>
