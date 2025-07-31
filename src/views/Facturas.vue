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
          <ion-modal color="light" ref="modalFacturaAdd" trigger="open-modalFacturaAdd" @willDismiss="onWillDismiss">
            <ion-header>
              <ion-toolbar class="toolbarStyle">
                <ion-buttons slot="start">
                  <ion-button @click="cancel()">Cancelar</ion-button>
                </ion-buttons>
                <ion-title>Nueva Factura</ion-title>
                <ion-buttons slot="end">
                  <ion-button :strong="true" @click="confirm()">Guardar</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding bodyStyle" color="dark">
              <ion-card v-for="(item, index) in productos" :key="index" class="tituloCarta">
                  <ion-card-content>
                    <p>Item {{ index + 1 }}</p>
                    <br>

                    <!-- Producto: cambiar esto luego a v-select -->
                    <ion-input
                      v-model="item.producto"
                      label="Producto"
                      label-placement="floating"
                      :clear-input="true"
                      fill="outline"
                      type="text"
                      placeholder="Laptop Pavilion"
                    ></ion-input>

                    <br>
                    <h4><strong>Cantidad</strong></h4>
                    <ion-input
                      v-model="item.cantidad"
                      label="Cantidad"
                      label-placement="floating"
                      :clear-input="true"
                      fill="outline"
                      type="number"
                      placeholder="5"
                    ></ion-input>

                    <br>
                    <h4><strong>Precio</strong></h4>
                    <ion-input
                      v-model="item.precio"
                      label="Precio"
                      label-placement="floating"
                      :clear-input="true"
                      fill="outline"
                      type="number"
                      placeholder="350.00"
                    ></ion-input>
                  </ion-card-content>
                </ion-card>

                <ion-button expand="block" @click="agregarProducto" class="botonPersonalizado">
                  Añadir producto
                </ion-button>
                <ion-card class="tituloCarta">
                  <ion-card-content>
                    <!-- Esto sumara el precio de todos, la cantidad multiplica el precio -->
                    <p>Total: $+ 0.00</p>
                  </ion-card-content>
                </ion-card>
            </ion-content>
          </ion-modal>
          <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button id="open-modalFacturaAdd">
              <ion-icon :icon="add" ></ion-icon>
            </ion-fab-button>
          </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonButton, IonIcon, IonCard,IonCardContent,IonCardHeader,IonCardTitle, IonCardSubtitle, IonModal, IonButtons, IonInput } from '@ionic/vue';
import { add, eyeOutline } from 'ionicons/icons';
import { ref }from 'vue'
import { OverlayEventDetail } from '@ionic/core/components';

  const modalFacturaAdd = ref();
  
  const name = ref();
  const cancel = () => {
    modalFacturaAdd.value.$el.dismiss(null, 'cancel')
    productos.value=[]
  };
  const confirm = () => {
  modalFacturaAdd.value.$el.dismiss(name, 'confirm');
}
  const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
    if (event.detail.role === 'confirm') {
    }
  }
  const productos = ref([
  { producto: '', cantidad: '', precio: '' }
])

const agregarProducto = () => {
  productos.value.push({ producto: '', cantidad: '', precio: '' })
}
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
