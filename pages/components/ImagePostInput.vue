<template>
  <IonModal :is-open="showImagePostInput" v-on:ion-modal-did-dismiss="closeModal">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Image Post Input</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonItem>
        <IonLabel position="floating">Title</IonLabel>
        <IonInput v-model="data.title" />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Content</IonLabel>
        <IonInput v-model="data.content" />
      </IonItem>
      <div v-if="imageURL" style="margin: auto; width: 50%; margin-top: 18px">
        <ion-img :src="imageURL" />
      </div>
      <div style="float: right; margin: 12px">
        <IonButton @click="closeModal" color="danger">CANCEL</IonButton>
        <IonButton @click="onSubmit">SAVE</IonButton>
      </div>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
defineProps({
  // flag to show/hide the modal
  showImagePostInput: {
    type: Boolean,
    default: false,
  },
  // image URL data
  imageURL: {
    type: String,
    default: "",
  },
});

// events emmitted by the component
const emit = defineEmits<{
  // event to close the modal
  (event: "image-post-cancel"): void;
  // event to save the data
  (
    event: "image-post-submit",
    { title, content }: { title: string; content: string }
  ): void;
}>();

// data from the component form
const data = ref({
  title: "",
  content: "",
});

/**
 * close modal take no action
 */
const closeModal = () => {
  emit("image-post-cancel");
};

/**
 * close modal and pass form data
 */
const onSubmit = () => {
  emit("image-post-submit", {
    title: data.value.title,
    content: data.value.content,
  });
};
</script>

<style scoped></style>
