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
    font-weight: 500;
    font-size: 1.1rem;
    background-color: bisque;
    border: 1px solid burlywood;
    border-radius: 5px;
    display: grid;
    place-content: center;
    cursor: pointer;
    z-index: 8;
  }
  .empty {
    border: 1px solid white;
    background-color: rgb(255, 255, 255);
    pointer-events: none;
    z-index: 5;
  }
</style>
