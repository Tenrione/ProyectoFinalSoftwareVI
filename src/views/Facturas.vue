<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbarStyle">
        <ion-title><strong>Gestion de Productos</strong>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="bodyStyle">
      <ion-header collapse="condense">
      </ion-header>
      <ion-card class="tituloCarta" color="dark">
        <ion-card-header>
          <ion-card-title>
            <div class="headerFlex">
              <!-- Aqui el nombre del producto -->
               <!-- Deberia ser un for each que genere estas por cada producto -->
              <strong>INV-001234</strong>
              <ion-button color="success" class="rounded">
                <ion-icon :icon="eyeOutline" color="dark"></ion-icon>
              </ion-button>
            </div>
            <!-- Get de la empresa que hace la factura -->
            <h6>Empresas ABC S.A</h6>
            <h6>29/07/2025</h6>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-padding">
          <div class="displayFixed">
            <div class="pagada">
              <p>Pagada</p>
            </div>
            <div class="valorFactura">
              <!-- Aqui seria un get con cuanto vale -->
              <h2><strong>$1599.77</strong></h2>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
      <ion-card class="tituloCarta" color="dark">
        <ion-card-header>
          <ion-card-title>
            <div class="headerFlex">
              <!-- Aqui el nombre del producto -->
               <!-- Deberia ser un for each que genere estas por cada producto -->
              <strong>INV-001235</strong>
              <ion-button color="success" class="rounded">
                <ion-icon :icon="eyeOutline" color="dark"></ion-icon>
              </ion-button>
            </div>
            <!-- Get de la empresa que hace la factura -->
            <h6>Empresas ABC S.A</h6>
            <h6>29/07/2025</h6>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-padding">
          <div class="displayFixed">
            <div class="pendiente">
              <p>Pendiente</p>
            </div>
            <div class="valorFactura">
              <!-- Aqui seria un get con cuanto vale -->
              <h2><strong>$119.18</strong></h2>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
      
          <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button>
              <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
          </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonSearchbar, IonButton, IonIcon, IonCard,IonCardContent,IonCardHeader,IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { add, eyeOutline, pencil, trashOutline } from 'ionicons/icons';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
<style>
.headerFlex{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}
.displayFixed{
  display: flex;
  justify-content: space-between;

}
h6{
  padding: 0;
  margin: 0;
}
.rounded{
  --border-radius: 12rem;
  height: 2.8rem;
  width: 2.8rem;
  
}
.mostrarInline{
  display: flex;
  justify-content: space-between;
}
.rounded ion-icon{
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2.5rem;
}
.pendiente{
  background-color: rgb(240, 203, 58);
  color: white;
  width: 45%;
  border-radius: 5rem;
  text-align: center;
}
.pagada{
  background-color: rgb(78, 197, 86);
  color: white;
  width: 45%;
  text-align: center;
  border-radius: 5rem;
}
</style>
