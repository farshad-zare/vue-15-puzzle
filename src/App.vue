<template>
  <div class="info-container">
    <button class="start-btn" @click="startGame">start new game</button>
    <div class="moves-info">Moves: {{ moves }}</div>
  </div>

  <transition-group tag="main" name="animate-tile" class="game-board">
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

  import winConfetti from "./utils/confetti";

  export default {
    name: "App",
    components: { AppTile },

    data() {
      return {
        rowsAndColumns: 4,
        gameBoard: [],
        isWon: false,
        solvedBoard: [],
        moves: 0,
      };
    },

    created() {
      this.startGame();
    },

    methods: {
      handleTileClick(ev) {
        if (this.isWon) return;
        const { board, moved } = moveTile(this.gameBoard, ev);
        if (moved) {
          this.gameBoard = board;
          this.moves = this.moves + 1;
        }
      },

      startGame() {
        this.moves = 0;
        this.solvedBoard = createBoardNums(this.rowsAndColumns);
        this.gameBoard = createBoard(this.solvedBoard);
      },
    },

    watch: {
      gameBoard: {
        handler: function () {
          if (hasWon(this.gameBoard, this.solvedBoard)) {
            this.isWon = true;
            winConfetti();
          }
        },
        deep: true,
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

    background: linear-gradient(to right, #3a6073, #16222a);
  }

  .game-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    width: 400px;
    height: 400px;
  }

  .info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .moves-info {
    border: 1px solid darkcyan;
    padding: 10px;
    border-radius: 5px;
    width: 7rem;
    color: cornsilk;
  }

  .start-btn {
    font-size: 18px;
    color: cornsilk;
    background-color: darkcyan;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition-duration: 0.1s;
    transition-property: all;
    transition-timing-function: ease-in-out;
  }

  .animate-tile-move {
    transition-property: transform;
    transition-duration: 0.2s;
    transition-timing-function: ease-in;
  }
</style>
