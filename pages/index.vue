<template>
  <div class="wrapper">
    <div class="typing-demo text-3xl font-bold underline">
      Hello, Welcome to Jeffrey Emakpor world
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.wrapper {
  height: 100vh;
  display: grid;
  place-items: center;
}

.typing-demo {
  width: 40ch;
  animation: typing 2s steps(22), blink 0.5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  font-family: monospace;
  font-size: 2em;
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>