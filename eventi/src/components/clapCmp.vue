<template>
<section class="clap-medium">
	<button ref="eventiId" class="clap">
  <span>
    <!--  SVG Created by Luis Durazo from the Noun Project  -->
    <svg ref="clap--icon" class="clap--icon" xmlns="http://www.w3.org/2000/svg" viewBox="-549 338 100.1 125">
  <path d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z"/>
  <path d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9"/>
</svg>
  </span>
  <span ref="clap--count" class="clap--count"></span>
</button>
</section>
</template>

<script>
import mojs from "mo-js";

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default {
  name: "clap-cmp",
  props: ["eventiId"],
  methods: {},

  mounted() {
    const initialNumberOfClaps = generateRandomNumber(500, 10000);
    const btnDimension = 80;
    const tlDuration = 300;
    let numberOfClaps = 0;
    let clapHold;

    const clap = this.$refs["eventiId"];
    const clapIcon = this.$refs["clap--icon"];
    const clapCount = this.$refs["clap--count"];

    const scaleButton = new mojs.Html({
      el: this.$refs["eventiId"],
      duration: tlDuration,
      scale: { 1.3: 1 },
      easing: mojs.easing.out
    });
    clap.style.transform = "scale(1, 1)"; /*Bug1 fix*/

    const triangleBurst = new mojs.Burst({
      parent: this.$refs["eventiId"],
      radius: { 50: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: "polygon",
        radius: { 6: 0 },
        scale: 1,
        stroke: "rgba(211,84,0 ,0.5)",
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration
      }
    });
    const circleBurst = new mojs.Burst({
      parent: this.$refs["eventiId"],
      radius: { 50: 75 },
      angle: 25,
      duration: tlDuration,
      children: {
        shape: "circle",
        fill: "rgba(149,165,166 ,0.5)",
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
      }
    });

    const animationTimeline = new mojs.Timeline();
    animationTimeline.add([triangleBurst, circleBurst, scaleButton]);

    clap.addEventListener("click", function() {
      repeatClapping();
    });

    clap.addEventListener("mousedown", function() {
      clapHold = setInterval(function() {
        repeatClapping();
      }, 400);
    });

    function repeatClapping() {
      animationTimeline.replay();
      clapIcon.classList.add("checked");
    }

    clap.addEventListener("mouseup", function() {
      clearInterval(clapHold);
    });
  }
};
</script>

<style lang="scss">
/*========================
    SASS definitions
  =======================*/
$btn-dimension: 60px;
$primary-color: rgba(189, 195, 199, 1);
$secondary-color: rgba(39, 174, 96, 1);
@mixin debug {
  outline: 1px solid red;
}

.clap {
  position: relative;
  outline: 1px solid transparent;
  border-radius: 50%;
  border: 1px solid $primary-color;
  width: $btn-dimension;
  height: $btn-dimension;
  background: none;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 50%;
    //border: 1px solid $primary-color;
    width: $btn-dimension - 1px;
    height: $btn-dimension - 1px;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid $secondary-color;
    transition: border-color 0.3s ease-in;
    &:after {
      animation: shockwave 1s ease-in infinite;
    }
  }
  svg {
    width: 40px;
    fill: none;
    stroke: $secondary-color;
    stroke-width: 2px;
    &.checked {
      fill: $secondary-color;
      stroke: #fff;
      stroke-width: 1px;
    }
  }
}

/*====================
        Message
======================*/
#message {
  position: absolute;
  bottom: 20px;
  color: $secondary-color;
  line-height: 1.52rem;
  padding: 1rem;
  font-size: 0.9rem;
  a {
    color: $primary-color;
  }
}

@keyframes shockwave {
  0% {
    transform: scale(1);
    box-shadow: 0 0 2px $secondary-color;
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
    box-shadow: 0 0 50px darken($secondary-color, 20%),
      inset 0 0 10px $secondary-color;
  }
}
</style>
