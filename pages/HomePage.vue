<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
        <ion-buttons slot="end">
          <ion-button>LOGOUT</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Home Page</h1>
      <p>This is the Home Page</p>
      <ion-button color="danger" @click="ionRouter.push('/next')"> Next Page </ion-button>
      <ion-button @click="doCamera"> Camera </ion-button>
      <ion-img :src="imageURL" />
    </ion-content>
  </ion-page>
  <Body>
  extra body stuff
  </Body>
</template>
<script lang="ts" setup>
import { Camera, CameraResultType, ImageOptions } from '@capacitor/camera';
import { ref } from 'vue';

definePageMeta({
  alias: ["/", "/home"],
});
const ionRouter = useIonRouter();
const imageURL= ref(null);

const doCamera = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  imageURL.value = image.webPath;
}
</script>
