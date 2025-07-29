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
import { add, personOutline, shieldOutline, trashOutline } from 'ionicons/icons';

</script>
<style>
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
