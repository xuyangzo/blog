<template>
  <div>
    <div v-if="skills.length" class="resume-skill">
      <h2>SKILL</h2>
      <div v-for="skill in skills" :key="skill.title" class="resume-skill-single">
        <div class="skill-title">{{ skill.title }}</div>
        <div class="skill-percent">
          <div
            class="skill-progress-bar"
            :class="{ red: skill.percent <= 50}"
            :style="{ width: skill.percent + '%' }"
          ></div>
          <div
            class="skill-progress-circle"
            :class="{ red: skill.percent <= 50}"
            :style="{ left: (skill.percent - 5) + '%' }"
          ></div>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    skills: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="stylus">
@keyframes grow {
  0% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(1);
  }
}

@keyframes moveRight {
  0% {
    left: 0;
  }

  100% {
  }
}

.resume-skill {
  h2 {
    font-family: 'Karla', sans-serif;
    border-bottom: 2px solid black;
  }

  .resume-skill-single {
    position: relative;
    width: 50%;
    float: left;
    margin: 0 0 20px;

    div {
      display: inline-block;
    }

    .skill-title {
      width: 160px;
      white-space: nowrap;
    }

    .skill-percent {
      height: 5px;
      background: lightgray;
      width: 150px;
      border-radius: 10px;
      position: relative;
      top: -2px;

      .yellow {
        background: rgb(253, 236, 0) !important;
      }

      .red {
        background: crimson !important;
      }

      .skill-progress-bar {
        height: 5px;
        position: absolute;
        top: 0;
        left: 0;
        background: mediumpurple;
        border-radius: 10px;
        animation: grow 1s ease-in-out forwards;
        transform-origin: 0% 50%;
      }

      .skill-progress-circle {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: mediumpurple;
        position: absolute;
        top: -5px;
        animation: moveRight 1s ease-in-out forwards;
      }
    }
  }
}
</style>