<template>
  <div class="wrapper">
    <div class="content">
      <div class="typing-demo">
          Hey &#128075;, I am Jeffrey Emakpor, an enterprise software solution architect,
        digital nomad and Polymath (πολυμαθής)
      </div>
      <p class="globe">
        <Globe />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const textElement = document.querySelector(".typing-demo");

  if (textElement) {
    const textContent = textElement?.textContent
      ?.split("")
      .map((text) => `<span class='hover-effect'>${text}</span>`)?.join("");

    textElement.innerHTML = textContent;
  }
});
</script>

<style scoped>
.wrapper {
  height: 85vh;
  display: grid;
  place-items: center;
}

.content {
  display: grid;
  grid-template-columns: auto 30px;
  grid-gap: 20px;
}

.typing-demo {
  width: 50ch;
  animation: typing 0s steps(33), blink 0.6s step-end infinite alternate;
  white-space: unset;
  word-break: normal;
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

@media (max-width: 767px) {
  .content {
    display: flex;
    flex-direction: column-reverse;
  }

  .typing-demo {
    width: fit-content;
    text-align: center;
    margin-top: 4rem;
    padding: 10px;
  }
}
</style>