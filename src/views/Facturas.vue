
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbarStyle">
        <ion-title><strong>Gestion de Facturas</strong></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="bodyStyle">
      <ion-header collapse="condense"></ion-header>
      <ion-card
        v-for="factura in facturas"
        :key="factura.id || factura.codigo"
        class="tituloCarta"
        color="dark"
      >
        <ion-card-header>
          <ion-card-title>
            <div class="headerFlex">
              <strong>{{ factura.nombre }}</strong>
              <ion-button color="success" class="rounded" @click="verDetalle(factura)">
                <ion-icon :icon="eyeOutline" color="dark"></ion-icon>
              </ion-button>
            </div>
            <h6>{{ factura.empresa || factura.empresa_nombre }}</h6>
            <h6>{{ formatearFecha(factura.fecha || factura.fecha_emision) }}</h6>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content class="ion-padding">
          <div class="displayFixed">
            <div :class="factura.estado === 'pagada' ? 'pagada' : 'pendiente'">
              <p>{{ factura.estado === 'pagada' ? 'Pagada' : 'Pendiente' }}</p>
            </div>
            <div class="valorFactura">
              <h2><strong>${{ factura.total || factura.valor }}</strong></h2>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
      <!-- Modal para agregar factura -->
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
          <ion-input v-model="nuevaFactura.cliente_nombre" label="Nombre del cliente" label-placement="floating" fill="outline" type="text" placeholder="Carlos López"></ion-input>
<ion-input v-model="nuevaFactura.total" label="Total" label-placement="floating" fill="outline" type="number" placeholder="250.75"></ion-input>
<ion-input v-model="nuevaFactura.cliente_telefono" label="Teléfono" label-placement="floating" fill="outline" type="text" placeholder="6123-4567"></ion-input>
<ion-input v-model="nuevaFactura.cliente_correo" label="Correo" label-placement="floating" fill="outline" type="email" placeholder="carlos.lopez@example.com"></ion-input>
            <ion-select v-model="nuevaFactura.estado" label="Estado" label-placement="floating" fill="outline" placeholder="Selecciona estado">
              <ion-select-option value="pagada">Pagada</ion-select-option>
              <ion-select-option value="pendiente">Pendiente</ion-select-option>
            </ion-select>
          <ion-input v-model="nuevaFactura.total" label="Total" label-placement="floating" fill="outline" type="number" placeholder="0.00"></ion-input>
        </ion-content>
      </ion-modal>
      <!-- Modal para ver detalles de factura -->
      <ion-modal color="light" ref="modalFacturaDetalle">
        <ion-header>
          <ion-toolbar class="toolbarStyle">
            <ion-title>Detalle de Factura</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="modalFacturaDetalle.value.$el.dismiss()">Cerrar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding bodyStyle" color="dark">
          <div v-if="facturaSeleccionada">
            <h2><strong>{{ facturaSeleccionada.nombre }}</strong></h2>
            <p>Empresa: {{ facturaSeleccionada.empresa || facturaSeleccionada.empresa_nombre }}</p>
            <p>Fecha: {{ formatearFecha(facturaSeleccionada.fecha || facturaSeleccionada.fecha_emision) }}</p>
            <p>Estado: {{ facturaSeleccionada.estado }}</p>
            <p>Total: ${{ facturaSeleccionada.total || facturaSeleccionada.valor }}</p>
            <!-- Aquí puedes agregar más detalles si tu API los provee -->
          </div>
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
import { ref, onMounted }from 'vue'
import { onIonViewWillEnter } from '@ionic/vue'; 

import { OverlayEventDetail } from '@ionic/core/components';
import { Preferences } from '@capacitor/preferences';
import { obtenerFacturaEmpresa,registrarFactura, detalleFactura } from '@/services/facturas';
const modalFacturaAdd = ref();
const modalFacturaDetalle = ref();
const nuevaFactura = ref({
  cliente_nombre: '',
  total: '',
  cliente_telefono: '',
  cliente_correo: ''
});
const facturaSeleccionada = ref(null);
const productos = ref([{ producto: '', cantidad: '', precio: '' }]);
const facturas = ref([]);

  const cancel = () => {
    modalFacturaAdd.value.$el.dismiss(null, 'cancel')
    productos.value=[]
  };
  
  const confirm = async () => {
  const { value: token } = await Preferences.get({ key: 'token' });
  // Valida y envía solo los campos requeridos
  const facturaData = {
    cliente_nombre: nuevaFactura.value.cliente_nombre,
    total: nuevaFactura.value.total,
    cliente_telefono: nuevaFactura.value.cliente_telefono,
    cliente_correo: nuevaFactura.value.cliente_correo
  };
  await registrarFactura(token, facturaData);
  modalFacturaAdd.value.$el.dismiss(null, 'confirm');
  await cargarFacturas();
  Object.assign(nuevaFactura.value, { cliente_nombre: '', total: '', cliente_telefono: '', cliente_correo: '' });
};

const verDetalle = async (factura) => {
  facturaSeleccionada.value = factura;
  modalFacturaDetalle.value.$el.present();
  // Si necesitas más detalles, puedes llamar a detalleFactura aquí
  // const { value: token } = await Preferences.get({ key: 'token' });
  // const detalles = await detalleFactura(token, { id: factura.id });
  // facturaSeleccionada.value = { ...facturaSeleccionada.value, ...detalles };
};

  const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
    if (event.detail.role === 'confirm') {
    }
  }
  const agregarProducto = () => {
  productos.value.push({ producto: '', cantidad: '', precio: '' })
}

function formatearFecha(fechaIso) {
  if (!fechaIso) return '';
  const fecha = new Date(fechaIso);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const año = fecha.getFullYear();
  return `${dia}/${mes}/${año}`;
}
async function cargarFacturas() {
  const { value: token } = await Preferences.get({ key: 'token' });
  if (!token) {
    facturas.value = [];
    return;
  }
  try {
    const response = await obtenerFacturaEmpresa(token);
    facturas.value = Array.isArray(response) ? response : [];
  } catch (error) {
    facturas.value = [];
  }
}
onMounted(() => {
  cargarFacturas();
});

onIonViewWillEnter(() => {
  cargarFacturas();
});
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
