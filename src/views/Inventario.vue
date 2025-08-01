<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="toolbarStyle">
        <ion-title><strong>Gestion de Productos</strong></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="bodyStyle">
      <ion-header collapse="condense"></ion-header>
      
      <!-- Mostrar mensaje de carga -->
      <div v-if="cargando" style="text-align: center; padding: 2rem;">
        <p>Cargando productos...</p>
      </div>
      
      <ion-card v-for="producto in listaProductos" :key="producto.id" class="tituloCarta">
        <ion-card-header>
          <ion-card-title>
            <div class="headerFlex">
              <strong>{{producto.nombre}}</strong>
              <div>
                <ion-button color="success" class="rounded" @click="abrirEditar(producto)">
                  <ion-icon :icon="pencil"></ion-icon>
                </ion-button>
                <ion-button color="danger" class="rounded" @click="borrarProducto(producto.id)">
                  <ion-icon :icon="trashOutline"></ion-icon>
                </ion-button>
              </div>
            </div>
          </ion-card-title>
          <ion-card-subtitle>{{producto.categoria}}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>{{producto.descripcion}}</p>
          <div class="mostrarInline">
            <p>Precio: <strong>${{ producto.precio_venta}}</strong></p>
            <p>Stock: {{producto.stock_actual}}</p>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Modal para AGREGAR producto -->
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
          <ion-input label="Nombre del producto" label-placement="floating" :clear-input="true" fill="outline" type="text" ref="producto" :maxlength="20" placeholder="Ej: Laptop HP Pavilion"></ion-input>
          
          <h4><strong>Descripcion</strong></h4>
          <ion-input label="Descripcion" label-placement="floating" :clear-input="true" fill="outline" type="text" ref="descripcion" :maxlength="100" placeholder="Descripcion del producto"></ion-input>
          
          <h4><strong>Categoria</strong></h4>
          <ion-input label="Categoria" label-placement="floating" :clear-input="true" fill="outline" type="text" ref="categoria" :maxlength="100" placeholder="Ej: Electronicos"></ion-input>
          
          <h4><strong>Precio</strong></h4>
          <ion-input label="Precio" label-placement="floating" :clear-input="true" fill="outline" type="number" step="0.01" ref="precio" :max="10000" placeholder="7.00"></ion-input>
          
          <h4><strong>Stock</strong></h4>
          <ion-input label="Cantidad en Stock" label-placement="floating" :clear-input="true" fill="outline" type="number" ref="stock" :min="2" :max="25" placeholder="5"></ion-input>
          
          <h4><strong>Stock minimo</strong></h4>
          <ion-input label="Stock Minimo" label-placement="floating" :clear-input="true" fill="outline" type="number" ref="stockMin" :min="0" :max="25" placeholder="0"></ion-input>
        </ion-content>
      </ion-modal>

      <!-- Modal para EDITAR producto -->
      <ion-modal color="light" ref="modalEditar" @willDismiss="onWillDismissEditar">
        <ion-header>
          <ion-toolbar class="toolbarStyle">
            <ion-buttons slot="start">
              <ion-button @click="cancelarEdicion()">Cancelar</ion-button>
            </ion-buttons>
            <ion-title>Editar Producto</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="guardarEdicion()">Guardar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding bodyStyle" color="dark">
          <h4><strong>Nombre del Producto</strong></h4>
          <ion-input v-model="productoEdit.nombre" label="Nombre del producto" label-placement="floating" fill="outline" type="text" :maxlength="20"></ion-input>
          
          <h4><strong>Descripcion</strong></h4>
          <ion-input v-model="productoEdit.descripcion" label="Descripcion" label-placement="floating" fill="outline" type="text" :maxlength="100"></ion-input>
          
          <h4><strong>Categoria</strong></h4>
          <ion-input v-model="productoEdit.categoria" label="Categoria" label-placement="floating" fill="outline" type="text" :maxlength="100"></ion-input>
          
          <h4><strong>Precio</strong></h4>
          <ion-input v-model="productoEdit.precio_venta" label="Precio" label-placement="floating" fill="outline" type="number" step="0.01"></ion-input>
          
          <h4><strong>Stock</strong></h4>
          <ion-input v-model="productoEdit.stock_actual" label="Cantidad en Stock" label-placement="floating" fill="outline" type="number"></ion-input>
          
          <h4><strong>Stock minimo</strong></h4>
          <ion-input v-model="productoEdit.stock_minimo" label="Stock Minimo" label-placement="floating" fill="outline" type="number"></ion-input>
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
// filepath: c:\Users\veterans414\Documents\ProyectoFinalSoftwareVI\src\views\Inventario.vue
import router from '@/router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonSearchbar, IonButton, IonIcon, IonCard,IonCardContent,IonCardHeader,IonCardTitle, IonCardSubtitle, IonButtons, IonModal, IonLabel, IonInput, alertController} from '@ionic/vue';
import { add, pencil, trashOutline } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core/components';
import { onMounted, ref } from 'vue'
import { Preferences } from '@capacitor/preferences';
import { onIonViewWillEnter } from '@ionic/vue';
import { actualizarProducto, cantidadProductosEmpresa, registrarProducto } from '@/services/productos';
import api from '@/services/api';

const modal = ref();
const modalEditar = ref();
const producto = ref();
const descripcion = ref();
const categoria = ref();
const precio = ref();
const stock = ref();
const stockMin = ref();
const listaProductos = ref<any[]>([]);
const busqueda = ref('');
const cargando = ref(true);

const productoEdit = ref({
  id: '',
  nombre: '',
  descripcion: '',
  precio_venta: '',
  stock_actual: '',
  stock_minimo: '',
  categoria: ''
});

// Función para mostrar alertas
async function presentAlert(header: string, message: string) {
  const alert = await alertController.create({
    header: header,
    message: message,
    buttons: ['OK'],
  });
  await alert.present();
}

// Función para mostrar confirmación
async function presentConfirm(header: string, message: string): Promise<boolean> {
  return new Promise(async (resolve) => {
    const alert = await alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => resolve(false)
        },
        {
          text: 'Confirmar',
          handler: () => resolve(true)
        }
      ]
    });
    await alert.present();
  });
}

// Funciones para modal de AGREGAR
const cancel = () => {
  try {
    modal.value.$el.dismiss(null, 'cancel');
  } catch (error) {
    console.error('Error al cerrar modal:', error);
  }
};

const confirm = async () => {
  console.log('=== GUARDANDO NUEVO PRODUCTO ===');
  const prod = producto.value.$el.value;
  const desc = descripcion.value.$el.value;
  const cat = categoria.value.$el.value;
  const prec = precio.value.$el.value;
  const stk = stock.value.$el.value;
  const stkMin = stockMin.value.$el.value;
  
  if (!prod || !desc || !cat || !prec || !stk || !stkMin) {
    await presentAlert('Error', 'Por favor, rellene todos los campos para guardar el producto.');
    return; 
  }
  
  const stockValue = Number(stk);
  const stkMinVal = Number(stkMin)
  
  if (!Number.isInteger(stockValue)||!Number.isInteger(stkMinVal)) {
    await presentAlert('Error', 'Stock y Stock minimo solo acepta enteros.');
    return;
  }
  
  try {
    const { value: token } = await Preferences.get({ key: 'token' });
    await registrarProducto(token, {
      nombre: prod,
      descripcion: desc,
      categoria: cat,
      precio_venta: prec,
      stock_actual: stockValue,
      stock_minimo: stkMinVal
    });
    
    // Cerrar modal ANTES de mostrar alerta
    try {
      await modal.value.$el.dismiss();
    } catch (error) {
      console.error('Error al cerrar modal:', error);
    }
    
    await cargarProductos();
    await presentAlert('¡Éxito!', 'El producto se ha guardado correctamente.');
    
  } catch (error) {
    console.error('Error al guardar producto:', error);
    // Cerrar modal incluso si hay error
    try {
      await modal.value.$el.dismiss();
    } catch (modalError) {
      console.error('Error al cerrar modal:', modalError);
    }
    await presentAlert('Error', 'No se pudo guardar el producto.');
  }
}

// Funciones para modal de EDITAR
function cancelarEdicion() {
  try {
    modalEditar.value.$el.dismiss(null, 'cancel');
  } catch (error) {
    console.error('Error al cancelar edición:', error);
  }
}

function abrirEditar(producto: any) {
  console.log('=== ABRIENDO MODAL EDITAR ===', producto);
  try {
    productoEdit.value = { ...producto };
    modalEditar.value.$el.present();
  } catch (error) {
    console.error('Error al abrir modal editar:', error);
  }
}

async function guardarEdicion() {
  console.log('=== GUARDANDO EDICIÓN PRODUCTO ===', productoEdit.value);
  
  if (!productoEdit.value.nombre || !productoEdit.value.descripcion || !productoEdit.value.categoria) {
    await presentAlert('Error', 'Por favor complete todos los campos obligatorios.');
    return;
  }
  
  try {
    const { value: token } = await Preferences.get({ key: 'token' });
    const id = productoEdit.value.id;
    
    const data = {
      nombre: productoEdit.value.nombre,
      descripcion: productoEdit.value.descripcion,
      precio_venta: Number(productoEdit.value.precio_venta),
      stock_actual: Number(productoEdit.value.stock_actual),
      stock_minimo: Number(productoEdit.value.stock_minimo),
      categoria: productoEdit.value.categoria
    };
    
    console.log('Datos a actualizar:', data);
    
    await actualizarProducto(token, id, data);
    
    // CERRAR EL MODAL PRIMERO
    console.log('=== CERRANDO MODAL EDITAR ===');
    try {
      await modalEditar.value.$el.dismiss();
      console.log('✅ Modal cerrado exitosamente');
    } catch (error) {
      console.error('❌ Error al cerrar modal:', error);
    }
    
    // Luego recargar datos
    await cargarProductos();
    
    // Y por último mostrar confirmación
    await presentAlert('¡Actualizado!', 'Producto actualizado exitosamente.');
    
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);
    
    // Si hay error, también cerrar el modal
    try {
      await modalEditar.value.$el.dismiss();
    } catch (modalError) {
      console.error('Error al cerrar modal después de error:', modalError);
    }
    
    await presentAlert('Error', 'No se pudo actualizar el producto.');
  }
}

// Función para limpiar datos
function limpiarDatos() {
  console.log('=== LIMPIANDO DATOS PRODUCTOS ===');
  listaProductos.value = [];
  cargando.value = true;
}

// Función para validar token
async function validarToken() {
  const { value: token } = await Preferences.get({ key: 'token' });
  if (!token) {
    console.log('❌ No hay token válido');
    return false;
  }
  return token;
}

async function cargarProductos() {
  console.log('=== CARGANDO PRODUCTOS DE LA EMPRESA ===');
  
  const token = await validarToken();
  if (!token) {
    listaProductos.value = [];
    cargando.value = false;
    return;
  }
  
  try {
    console.log('🔄 Haciendo petición a cantidadProductosEmpresa...');
    const response = await cantidadProductosEmpresa(token);
    console.log('✅ Respuesta productos empresa:', response);
    
    if (Array.isArray(response)) {
      listaProductos.value = response;
      console.log(`📦 ${response.length} productos cargados`);
    } else {
      console.log('❌ Respuesta no es array:', typeof response);
      listaProductos.value = [];
    }
  } catch (error) {
    console.error('❌ Error al cargar productos:', error);
    listaProductos.value = [];
  }
  
  cargando.value = false;
}

async function borrarProducto(id: number) {
  console.log('=== ELIMINANDO PRODUCTO ===', id);
  
  try {
    // Si el modal de edición está abierto, ciérralo primero
    try {
      if (modalEditar.value && modalEditar.value.$el) {
        await modalEditar.value.$el.dismiss();
      }
    } catch (error) {
      console.log('Modal ya estaba cerrado');
    }

    const confirmar = await presentConfirm('¿Eliminar producto?', 'Esta acción no se puede deshacer');
    
    if (!confirmar) {
      return;
    }

    const token = await validarToken();
    if (!token) {
      await presentAlert('Error', 'No se encontró token de autenticación');
      return;
    }

    await api.delete(`/productos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    await cargarProductos();
    await presentAlert('¡Eliminado!', 'Producto eliminado exitosamente');
    
  } catch (error) {
    console.error('❌ Error al borrar producto:', error);
    await presentAlert('Error', 'No se pudo eliminar el producto');
  }
}

async function cargarVistaInventario() {
  console.log('=== INICIANDO CARGA VISTA INVENTARIO ===');
  limpiarDatos();
  await cargarProductos();
  console.log('=== VISTA INVENTARIO CARGADA ===');
}

const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => {
  console.log('Modal agregar cerrado:', event.detail.role);
}

const onWillDismissEditar = (event: CustomEvent<OverlayEventDetail>) => {
  console.log('Modal editar cerrado:', event.detail.role);
}

onMounted(async () => {
  console.log('🎯 MOUNTED - Inventario.vue');
  await cargarVistaInventario();
});

onIonViewWillEnter(async () => {
  console.log('🎯 ION VIEW WILL ENTER - Inventario.vue');
  await cargarVistaInventario();
});
</script>

<style scoped>
.headerFlex{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  gap: 0.5rem;
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