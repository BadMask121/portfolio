
<template>
  <div>
    <div id="cursor"/>
    <slot />
    <footer class="footer">
      <div class="socials">
        <a
          class="icon-linkedin hover-effect"
          href="https://www.linkedin.com/in/jeffrey-emakpor-5536aa156"
          target="_blank"
        />
        <a
          class="icon-github hover-effect"
          href="https://github.com/BadMask121"
          target="_blank"
        />
        <a
          class="icon-twitter hover-effect"
          href="https://twitter.com/jjarthur121"
          target="_blank"
        />
      </div>
      <div class="footer-bottom-links">
        <p>
          <a
            class="icon-attach resume hover-effect"
            href="https://drive.google.com/file/d/1cuPVEvWwjdTyVWCjieldyA9OmXgd_eX_/view?usp=sharing"
            target="_blank"
            >&nbsp;Resumè</a
          >
        </p>
        <p>
          <a
            class="icon-emo-wink2 eof hover-effect"
            href="https://twitter.com/jjarthur121"
            >&nbsp;jjarthur121</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const cursor = document.querySelector("#cursor");

  document.addEventListener("mousemove", (event) => cursorMove(cursor, event));

  const hoverEffectElements = document.querySelectorAll(".hover-effect");

  hoverEffectElements.forEach((effectElement) => {
    effectElement.addEventListener("mouseover", () => {
      cursor?.classList.add("link-grow");
      effectElement.classList.add("link-hovered");

      if (effectElement.tagName.toLowerCase() === "span") {
        effectElement.classList.add("hover-text");
      }
    });

    effectElement.addEventListener("mouseleave", () => {
      cursor?.classList.remove("link-grow");
      effectElement.classList.remove("link-hovered");
    });
  });
});

function cursorMove(cursor: Element | null, event: MouseEvent) {
  const x = event.pageX - 10;
  const y = event.pageY - 10;

  if (cursor) {
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
    cursor.style.display = "block";
  }
}
</script>

<style lang="scss">
body,
* {
  cursor: none;
}

#cursor {
  display: none;
  position: absolute;
  width: 20px;
  height: 20px;
  background: black;
  border-radius: 50%;
  pointer-events: none;

  mix-blend-mode: difference;
  transition: all 0.1s ease-in-out;
  transition-property: background, transform;
  transform-origin: 100% 100%;
  z-index: -1;
}

.link-grow {
  transform: scale(2);
  background: white;
}

.link-hovered {
  color: white;
}

.footer {
  .socials {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(3, 50px);
    grid-gap: 20px;
  }
}

.footer-bottom-links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-left: -40px;

  p:last-child {
    margin-top: 20px;
  }

  .eof {
    font-size: 11px;
  }
}
</style>
