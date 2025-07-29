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
      <ion-searchbar show-clear-button="focus"  color="dark" class="barraBusqueda">

      </ion-searchbar >
      <ion-card class="tituloCarta" color="dark">
        <ion-card-header>
          <ion-card-title>
            <div class="headerFlex">
              <!-- Aqui el nombre del producto -->
               <!-- Deberia ser un for each que genere estas por cada producto -->
              <strong>Laptop HP Pavilion</strong>
              <ion-button color="success" class="rounded">
                <ion-icon :icon="pencil"></ion-icon>
              </ion-button>
              <ion-button color="danger" class="rounded">
                <ion-icon :icon="trashOutline" color="dark"></ion-icon>
              </ion-button>

            </div>

          </ion-card-title>
          <ion-card-subtitle>
            <!-- Aqui la categoria del producto -->
            Electronicos
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <!-- Aqui irian los detalles del producto -->
          <p>Laptop con 8GB de RAM, 256GB SSD</p>
          <!-- Aqui los precios -->
          <div class="mostrarInline">
            <p>precio: <strong>799.99</strong></p>
            <!-- Aqui el stock -->
            <p>Stock: 15 unidades</p>
          </div>
        </ion-card-content>
        
      </ion-card>
      <ion-modal color="light" ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
            <ion-header>
              <ion-toolbar class="toolbarStyle">
                <ion-buttons slot="start">
                  <ion-button @click="cancel()">Cancelar</ion-button>
                </ion-buttons>
                <ion-title>Agregar Producto</ion-title>
                <ion-buttons slot="end">
                  <ion-button :strong="true" @click="confirm()">Guardar</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding bodyStyle" color="dark">
                <h4><strong>Nombre del Producto</strong></h4>
                <ion-input label="Nombre del producto"label-placement="floating" :clear-input="true" fill="outline" type="text" ref="producto" :maxlength=20 placeholder="Ej: Laptop HP Pavilion" 
                ></ion-input>
                <h4><strong>Descripcion</strong></h4>
                <ion-input label="Descripcion"label-placement="floating" :clear-input="true" fill="outline" type="text" ref="descripcion" :maxlength=100 placeholder="Descripcion del producto" 
                ></ion-input>
                <h4><strong>Categoria</strong></h4>
                <ion-input label="Categoria"label-placement="floating" :clear-input="true" fill="outline" type="text" ref="categoria" :maxlength=100 placeholder="Ej: Electronicos" 
                ></ion-input>
                <h4><strong>Precio</strong></h4>
                <ion-input label="Precio"label-placement="floating" :clear-input="true" fill="outline" type="number" step="0.01" ref="precio" :max="10000" placeholder="7.00"
                ></ion-input>
                <h4><strong>Stock</strong></h4>
                <ion-input label="Cantidad en Stock"label-placement="floating" :clear-input="true" fill="outline" type="number" ref="stock" :min="2" :max="25" placeholder="5" 
                ></ion-input>
                <h4><strong>Stock minimo</strong></h4>
                <ion-input label="Cantidad en Stock"label-placement="floating" :clear-input="true" fill="outline" type="number" ref="stockMin" :min="0" :max="25" placeholder="0" 
                ></ion-input>
            </ion-content>
          </ion-modal>
          <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button id="open-modal">
              <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
          </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from '@/router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonSearchbar, IonButton, IonIcon, IonCard,IonCardContent,IonCardHeader,IonCardTitle, IonCardSubtitle, IonButtons, IonModal, IonLabel, IonInput, alertController} from '@ionic/vue';
import { add, pencil, trashOutline } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core/components';
import { ref } from 'vue'

function AddProductos(){
  router.push("/inventario/editarAddProductos")
}

  const modal = ref();
  const producto = ref();
  const descripcion = ref();
  const categoria = ref();
  const precio = ref();
  const stock = ref();
  const stockMin = ref();

  const cancel = () => modal.value.$el.dismiss(null, 'cancel');

  const confirm = () => {
    const prod = producto.value.$el.value;
    const desc = descripcion.value.$el.value;
    const cat = categoria.value.$el.value;
    const prec = precio.value.$el.value;
    const stk = stock.value.$el.value;
    const stkMin = stockMin.value.$el.value;
    if (!prod || !desc || !cat || !prec || !stk || !stkMin) {
    presentAlert('Error de Registro', 'Por favor, rellene todos los campos para guardar el producto.');
    return; 
  }
  const stockValue = Number(stk);
  const stkMinVal = Number(stkMin)
  if (!Number.isInteger(stockValue)||!Number.isInteger(stkMinVal)) {
    presentAlert('Error de Registro', 'Stock y Stock minimo solo acepta enteros.');
    return;
  };
  modal.value.$el.dismiss(prod, 'confirm');
}

async function presentAlert(header: string, message: string) {
  const alert = await alertController.create({
    header: header,
    message: message,
    buttons: ['OK'],
  });
  await alert.present();
}
  const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
    if (event.detail.role === 'confirm') {
    }
  }
</script>




<style>
.headerFlex{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
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
.barraBusqueda{
  --border-radius: 0.5rem;
  box-shadow: none;
}
</style>
