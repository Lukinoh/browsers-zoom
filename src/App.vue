<template>
  <div style="display: inline-flex; flex-direction: column">
    <button :onclick="open">Open popup</button>
    <button :onclick="moveBy">Move window</button>
    <button :onclick="resizeBy">Resize window</button>
    <button :onclick="reset">Reset window</button>
  </div>
  <br>
  <br>
  <div style="display: grid; grid-template-columns: min-content auto min-content auto; gap: 10px">
    <div>
      innerWidth
    </div>
    <div>
      {{data.innerWidth}}
    </div>
    <div>
      outerWidth
    </div>
    <div>
      {{data.outerWidth}}
    </div>
    <div style="grid-column: span 4; background: black; height: 1px"></div>
    <div>
      innerHeight
    </div>
    <div>
      {{data.innerHeight}}
    </div>
    <div>
      outerHeight
    </div>
    <div>
      {{data.outerHeight}}
    </div>
    <div style="grid-column: span 4; background: black; height: 1px"></div>
    <div>
      screenTop
    </div>
    <div>
      {{data.screenTop}}
    </div>
    <div>
      screenLeft
    </div>
    <div>
      {{data.screenLeft}}
    </div>
    <div style="grid-column: span 4; background: black; height: 1px"></div>
    <div>
      devicePixelRatio
    </div>
    <div>
      {{data.devicePixelRatio}}
    </div>
    <div>
      magicDevicePixelRatio
    </div>
    <div>
      {{data.magicPixelRatio}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

// Affect innerWidth
const popupConfig = [
    "popup",
    `top=50`,
    `left=50`,
    `width=400`,
    `height=400`,
  ].join(",");

const getMagicDevicePixelRatio = () => {
  const widthRatio = window.screen.width / window.innerWidth;
  const heightRatio = window.screen.height / window.innerHeight;
  // We take the min to be the more conservative
  // We round to 2 digits to be more precise as usually zoom has a step of 25%.
  return Number(Math.min(widthRatio, heightRatio).toFixed(2));
}

const getData = () => {
  return {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    screenTop: window.screenTop,
    screenLeft: window.screenLeft,
    devicePixelRatio: window.devicePixelRatio,
    magicPixelRatio: getMagicDevicePixelRatio()
  }
}

const data = ref(getData());

onMounted(() => {
  setInterval(() => {
    data.value = getData();
  }, 500)
})

const open = () => {
  window.open("http://localhost:5173", "whatever-target", popupConfig);
}

const resizeBy = () => {
  window.resizeBy(50, 0);
}

const moveBy = () => {
  window.moveBy(50, 0);
}

const reset = () => {
  window.moveTo(50, 50);
  // Affect outerWidth
  window.resizeTo(400, 400);
}
</script>

<style scoped>
</style>
