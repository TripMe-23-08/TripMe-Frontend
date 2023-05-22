<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      :elevation="isHovering ? 12 : 2"
      :class="{ 'on-hover': isHovering }"
      v-bind="props"
      @click="onClick"
    >
      <v-responsive :aspect-ratio="1 / 1" class="border px-0">
        <!-- <div v-show="isHovering" class="text">Hello World</div> -->
        <v-card-title class="text" v-if="isHovering" style="white-space: initial;">
          {{ getName }}
        </v-card-title>
        <v-img
          :class="isHovering ? 'blur' : 'normal'"
          :src="getImgUrl"
          cover
        />
      </v-responsive>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "SimpleImageCard",
  components: {},
  props: {
    placeInfo: Object
  },
  data() {
    return {
      defaultImgUrl: 'https://images.unsplash.com/photo-1572633424705-d813d2fb5cb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHwzMzMyNTYyfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    };
  },
  created() {
  },
  methods: {
    onClick() {
      // alert("clicked");
      console.log("place image clicked !!!")
      console.log(this.placeInfo)

      if (!this.placeInfo) {
        alert("no place info ... to be fixed here")
        return
      }

      this.$emit('clickPlace', {
        name: this.placeInfo.name,
        location: this.placeInfo.address,
        id: this.placeInfo.id,
      });
    },
  },
  computed: {
    getImgUrl() {
      if (!this.placeInfo) return this.defaultImgUrl
      if (!this.placeInfo.imgUrl) return this.defaultImgUrl
      return this.placeInfo.imgUrl
    },
    getName() {
      if (!this.placeInfo) return 'NO PLACE'
      if (!this.placeInfo.name) return 'NO NAME'
      return this.placeInfo.name
    }
  }
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
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
</style>
