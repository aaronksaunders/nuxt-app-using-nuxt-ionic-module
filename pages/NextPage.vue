<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>Next Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Next Page</h1>
    </ion-content>
  </ion-page>
</template>
<script lang="ts" setup>
definePageMeta({
  alias: ["/next"],
});
</script>
