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
      <ion-button @click="doSave"> SAVE RECORD </ion-button>
      <ion-img :src="imageURL" style="width: 50% !important" />
      <!-- {{ data }} -->
      <ion-card v-for="item in data" :key="item?.id">
        <ion-card-header>
          <ion-card-title>Card Title</ion-card-title>
          <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content v-if="item?.image">
          <ion-img :src="(item?.image as any)" />
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script lang="ts" setup>
import { Camera, CameraResultType, ImageOptions } from "@capacitor/camera";
import { ref } from "vue";

definePageMeta({
  alias: ["/", "/home"],
});

useHead({
  script: [
    {
      async: true,
      crossorigin: "anonymous",
      type: "module",
      src:
        "https://unpkg.com/@ionic/pwa-elements@latest/dist/ionicpwaelements/ionicpwaelements.esm.js",
    },
  ],
});

const ionRouter = useIonRouter();
const imageURL = ref(null);
const API_URL = useRuntimeConfig().public.API_URL;
console.log(API_URL);
const { data, pending, error, refresh } = await useAsyncData("posts", () => $fetch(`${API_URL}/getAllPosts`));
if (error?.value) {
  console.log((error?.value as Error)?.message);
  alert((error?.value as Error)?.message);
}
console.log(data);

const doCamera = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    // allowEditing: true,
    correctOrientation : true,
    width: 400,
    resultType: CameraResultType.Base64,
  });

  imageURL.value = `data:${image.format};base64,${image.base64String}`;
};

const doSave = async () => {
  const resp = await $fetch(`${API_URL}/post`, {
    method: "POST",
    body: JSON.stringify({
      title: "Test " + new Date().toISOString(),
      content: "Test",
      image: imageURL.value,
    }),
  });

  await refresh();

  imageURL.value = null;
};
</script>
<style lang="css">
.ios.ion-page {
  --ion-safe-area-top: 47px !important;
}
</style>
