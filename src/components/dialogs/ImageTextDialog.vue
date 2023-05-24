
<template>
  <div class="text-center">
    <v-btn color="primary"> Open Dialog </v-btn>
    <v-dialog v-model="dialog" activator="parent" width="auto">
      <v-card>
        <v-card-text>
          {{ clickedPlaceInfo }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false"
            >Close Dialog</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "ImageTextDialog",
  props: {
    clickedPlaceInfo: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style scoped></style>