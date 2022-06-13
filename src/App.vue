<template>
  <div class="finished-msg" v-if="isFinished">
    <h2>You Won!</h2>
    <button class="start-btn" @click="startGame">start new game</button>
  </div>
  <transition-group tag="main" name="animate-tile" v-else class="game-board">
    <template v-for="(row, rowIndex) in gameBoard">
      <AppTile
        v-for="(num, columnIndex) in row"
        :value="num"
        :indices="{ rowIndex, columnIndex }"
        :key="num"
        @clickedtile="handleTileClick"
      />
    </template>
  </transition-group>
</template>

<script>
  import AppTile from "./components/AppTile.vue";
  import {
    createBoard,
    createBoardNums,
    hasWon,
    moveTile,
  } from "./utils/game.utils";

  export default {
    name: "App",
    components: { AppTile },

    data() {
      return {
        rowsAndColumns: 4,
        gameBoard: [],
      };
    },

    computed: {
      solvedBoard() {
        return createBoardNums(this.rowsAndColumns);
      },

      isFinished() {
        return hasWon(this.gameBoard, this.solvedBoard);
      },
    },

    created() {
      this.startGame();
    },

    methods: {
      handleTileClick(ev) {
        this.gameBoard = moveTile(this.gameBoard, ev);
      },

      startGame() {
        this.gameBoard = createBoard(this.solvedBoard);
      },
    },
  };
</script>

<style>
  * {
    border: 0;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .game-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    width: 400px;
    height: 400px;
  }

  .finished-msg {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .start-btn {
    font-size: 18px;
    color: cornsilk;
    background-color: darkcyan;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition-duration: 0.3s;
    transition-property: all;
    transition-timing-function: ease-in-out;
  }

  .start-btn:hover {
    transform: scale(1.1);
  }

  .animate-tile-move {
    transition-property: transform;
    transition-duration: 0.2s;
    transition-timing-function: ease-in;
  }
</style>
