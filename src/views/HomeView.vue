<template>
  <v-app id="inspire">
    <enjoy-header />
    <v-main>
      <v-container>
        <!--Trip with Enjoy-->
        <v-window v-model="onboarding" show-arrows="hover" flat>
          <v-window-item v-for="n in cardItems" :key="`card-${n}`">
            <v-card elevation="1" height="450" class="d-flex align-center justify-center ma-1">
              <h1 class="text-h2">Slide {{ n }}</h1>
            </v-card>
          </v-window-item>
        </v-window>
        <!--떠나세요-->
        <v-sheet class="bg-grey-lighten-3" min-height="70vh" rounded="lg"> </v-sheet>
        <!--여행 후기-->
        <trip-feed-back />
        <!--추천 여행지-->
      </v-container>
    </v-main>
    <enjoy-footer />
  </v-app>
</template>

<script>
import EnjoyHeader from "@/components/commons/EnjoyHeader.vue";
import EnjoyFooter from "@/components/commons/EnjoyFooter.vue";
import TripFeedBack from "@/components/feedback/TripFeedBack.vue";
export default {
  components: { EnjoyHeader, EnjoyFooter, TripFeedBack },
  data: () => ({
    cardItems: 3,
    onboarding: 0,
  }),
};
</script>
