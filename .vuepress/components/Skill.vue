<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      intersection: {
        threshold: 0.2
      },
      once: true
    }"
    v-if="skills.length"
    class="resume-skill"
    :class="{ 'resume-skill-appear': isVisible }"
  >
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
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    };
  },
  props: {
    skills: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
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

.resume-skill-appear {
  animation: fadeInUp 1s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}

.resume-skill {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 20px 40px;
  box-sizing: border-box;
  background: rgba(248, 248, 255, 0.5);
  text-align: center;
  opacity: 0;

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
      text-align: left;
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

@media (max-width: 400px) {
  .resume-skill {
    .resume-skill-single {
      .skill-title {
        width: 120px;
        position: relative;
      }

      .skill-percent {
        width: 100px;
        left: -10px;

        .skill-progress-bar {
          animation: none;
          -webkit-animation: none;
        }

        .skill-progress-circle {
          animation: none;
          -webkit-animation: none;
        }
      }
    }
  }
}
</style>