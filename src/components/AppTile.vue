<template>
  <button :class="{ empty: isEmpty }" @click="clickHandler">
    {{ isEmpty ? null : value }}
  </button>
</template>

<script>
export default {
  name: "AppTile",
  props: ["value", "indices"],
  emits: ["clickedtile"],

  computed: {
    isEmpty() {
      return this.value === 0 ? true : false;
    },
  },

  methods: {
    clickHandler() {
      this.$emit("clickedtile", this.indices);
    },
  },
};
</script>

<style scoped>
button {
  width: 100%;
  height: 100%;
  background-color: bisque;
  display: grid;
  place-content: center;
  cursor: pointer;
}
.empty {
  background-color: white;
  pointer-events: none;
}
</style>
