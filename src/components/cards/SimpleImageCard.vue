<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      :elevation="isHovering ? 12 : 2"
      :class="{ 'on-hover': isHovering }"
      v-bind="props"
      height="200"
      width="200"
    >
      <!-- <div v-show="isHovering" class="text">Hello World</div> -->
      <v-card-title class="text" v-if="isHovering">
        {{ name }}
      </v-card-title>
      <v-img
        :class="isHovering ? 'blur' : 'normal'"
        src="https://images.pexels.com/photos/1470589/pexels-photo-1470589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        cover
      />

      <!-- <div class="align-center justify-center fill-height">
        <v-img
          v-show="!isHovering"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          height="225px"
          cover
        >
        </v-img>
        <v-img
          class="blur text"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          height="225px"
          cover
        >
          <v-card-title class="text-h6">
            <p class="mt-4 font-weight-bold">
              {{ name }}
            </p>

            <div>
              <p class="ma-0 text-body-1 font-weight-bold">
                {{ location }}
              </p>
            </div>
          </v-card-title>
        </v-img>
      </div> -->
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "SimpleImageCard",
  components: {},
  data() {
    return {
      message: "",
      name: "서울숲",
      location: "서울 어딘가 그곳",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.img-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}

.sticky {
  position: sticky;
  top: 0;
}

.blur {
  filter: brightness(40%);
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.normal {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 24px;
  color: #ffffff;
  font-weight: 600;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
</style>
