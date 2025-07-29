<template>
    <ion-page>
        <ion-header>
        </ion-header>
        <ion-content :fullscreen="true" class="bodyStyle ion-padding">
            <div class="contCenter">
            <div class="logo">
                <!-- Aqui tengo que poner el logo lol -->
                <H1>PM</H1>
            </div>
            <h2 class="titulo"><strong>PyManagEr</strong></h2>
            <em class="subtitulo">Gestion de inventario profesional</em>
            

            <div class="carFlex">
                <ion-grid>
                    <ion-row class="align-items-center">
                        <ion-col>
                            <div class="rounded">
                                <img src="../theme/icons/679821.png" alt="">
                            </div>
                        </ion-col>
                        <ion-col>
                            <div class="infoCol">Control de Inventario</div>
                        </ion-col>
                    </ion-row>
                    <ion-row class="align-items-center">
                        <ion-col>
                            <div class="rounded">
                                <img src="../theme/icons/4072698.png" alt="">
                            </div>
                        </ion-col>
                        <ion-col>
                            <div class="infoCol">Reportes en tiempo real</div>
                        </ion-col>
                    </ion-row>
                    <ion-row class="align-items-center">
                        <ion-col>
                            <div class="rounded">
                                <img src="../theme/icons/12560218.png" alt="">
                            </div>
                        </ion-col>
                        <ion-col>
                            <div class="infoCol">Facturacion inteligente</div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <em class="subtitulo">optimiza tu negocio con tecnologia avanzada</em>
            <br>
            <ion-button class="botonPersonalizado" @click="pantallaSesion()">
                Iniciar Sesion
            </ion-button>
            <ion-button class="botonPersonalizado" @click="pantallaRegistro()">
                Registrarse
            </ion-button>
            </div>
        </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import router from '@/router';
import { Preferences } from '@capacitor/preferences';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol} from '@ionic/vue';


function pantallaSesion(){
    router.push('/usuarioUI/Login')
}
function pantallaRegistro(){
    router.push('/usuarioUI/Registro')
}
</script>
<style scoped>
ion-content{
    text-align: center;
    align-items: center;
}
ion-row.align-items-center {
  align-items: center;
  width: 15rem;
  height: 5rem;
}

.rounded{
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    background-color: darkblue;

}
.logo {
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
  background-color: rgb(178, 241, 126);
  margin: 0 auto 1rem auto; /* centrado horizontal + separación */
  text-align: center;
}
.logo h1 {
  font-weight: bold;  
  margin: 0;
  line-height: 3rem;
  position: relative;
  top: 0.5rem;

}
.rounded img {
  width: 70%;
  height: 70%;
  object-fit: cover;
  margin-top: 0.5rem;
}
.infoCol{
    width: 9.5rem;
}

.contCenter{
    margin: 10rem 5rem 2rem 5rem;
}
.carFlex{
    display: flex;
    justify-content: center;
}
.caracteristicasManager{
    list-style: none;
    text-align: start;

}
.subtitulo{
    color: gray;
}
</style>