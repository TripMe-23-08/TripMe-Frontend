<template>
  <v-footer color="#A2D2FF" class="text-center d-flex flex-column">
    <div>
      <v-btn
        v-for="item in items"
        :key="item.icon"
        class="mx-4"
        :icon="item.icon"
        :href="item.href"
        variant="text"
      ></v-btn>
    </div>

    <div class="pt-0 desc">Enjoy Trip</div>

    <v-divider></v-divider>

    <div class="desc">{{ new Date().getFullYear() }} — <strong>Team08</strong></div>
  </v-footer>
</template>

<script>
export default {
  name: "EnjoyFooter",
  data: () => ({
    items: [{ icon: "fa-brands fa-github", href: "https://github.com/EnjoyTrip-23-08" }],
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.desc {
  font-family: "LeeSeoyun", sans-serif;
}
</style>
