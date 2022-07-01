<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nuxt Ionic Prisma Photo Demo</ion-title>
        <ion-buttons slot="end">
          <ion-button>LOGOUT</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-loading :is-open="pending" message="LOADING..."></ion-loading>
      <ion-loading :is-open="saving" message="SAVING..."></ion-loading>

      <image-post-input
        :showImagePostInput="showImagePostInput"
        :imageURL="imageURL"
        @image-post-submit="doSave"
        @image-post-cancel="showImagePostInput = false"
      />
      <p>
        Sample app with Nuxt for server and client mobile app. Prisma for saving the data
        to database and Ionic / Capacitor for device capabilities
      </p>
      <ion-button color="danger" @click="ionRouter.push('/next')"> Next Page </ion-button>
      <ion-button @click="doCamera"> CREATE IMAGE POST </ion-button>
      <!-- <ion-button @click="showImagePostInput = true"> SAVE RECORD </ion-button> -->

      <!-- {{ data }} -->
      <ion-card v-for="item in data" :key="item?.id">
        <ion-card-header>
          <ion-card-title>{{ item?.title }}</ion-card-title>
          <ion-card-subtitle>{{ item?.content }}</ion-card-subtitle>
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
import { alertController } from "@ionic/vue";
import { ref } from "vue";
import ImagePostInput from "./components/ImagePostInput.vue";

interface ImagePost {
  id: number;
  title: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  image: string;
  published: boolean;
}
interface ImagePostArray extends Array<ImagePost> {}

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
const imageURL = ref<string | null>(null);
const saving = ref<boolean>(false);
const showImagePostInput = ref<boolean>(false);
const API_URL = useRuntimeConfig().public.API_URL;

// load the data from the API
const { data, pending, error, refresh } = await useAsyncData<ImagePostArray>(
  "posts",
  () => $fetch(`${API_URL}/getAllPosts`)
);

/**
 * Display an alert
 */
const doAlert = (options: { header: string; message: string }) => {
  return alertController
    .create({ buttons: ["OK"], ...options })
    .then((alert) => alert.present());
};

// display error if necessary
if (error?.value) {
  doAlert({
    header: "Error Loading Data",
    message: (error?.value as Error)?.message,
  });
}

/**
 * Take a photo with the camera
 */
const doCamera = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    // allowEditing: true,
    correctOrientation: true,
    width: 400,
    resultType: CameraResultType.Base64,
  });

  imageURL.value = `data:${image.format};base64,${image.base64String}`;

  // show dialog to confirm image
  showImagePostInput.value = true;
};

/**
 * Save the image to the API
 *
 * @param title
 * @param content
 */
const doSave = async ({ title, content }: { title: string; content: string }) => {
  // hide the input form
  showImagePostInput.value = false;

  // show the saving indicator
  saving.value = true;

  debugger;
  try {
    const dataToSave: Partial<ImagePost> = {
      title,
      content,
      image: imageURL.value,
      published: true,
    };

    await $fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSave),
    });
    imageURL.value = null;
    await refresh();

    saving.value = false;

    doAlert({
      header: "Saving Image Post",
      message: "Image saved successfully",
    });
  } catch (error) {
    saving.value = false;
    doAlert({
      header: "Error",
      message: error.message,
    });
  }
};
</script>
<style lang="css"></style>
