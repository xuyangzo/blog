<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      intersection: {
        threshold: 0.1
      },
      once: true
    }"
    v-if="experiences.length"
    class="resume-experience"
    :class="{ 'resume-experience-appear': isVisible }"
  >
    <v-timeline>
      <v-timeline-item v-for="work in experiences" :key="work.color" :color="work.color" fill-dot>
        <template v-slot:icon>
          <v-avatar class="experience-avatar">
            <img :src="$withBase(work.logo)" />
          </v-avatar>
        </template>
        <v-card :color="work.color" class="overwrite-card-title">
          <v-card-title
            class="title"
            :style="{ color: work.color }"
          >{{ work.job }} - {{ work.company }}</v-card-title>
          <span class="experience-time">{{ work.time }}</span>
          <v-card-text class="white text--primary overwrite-card-text">
            <ul>
              <li v-for="description in work.description" v-bind:key="description">{{ description }}</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
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
    experiences: {
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
@keyframes fadeInUp {
  0% {
    transform: translate(0, 200px);
    -webkit-transform: translate(0, 200px);
    opacity: 0;
  }

  100% {
    transform: translate(0, 0);
    -webkit-transform: translate(0, 0);
    opacity: 1;
  }
}

.resume-experience-appear {
  animation: fadeInUp 2s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}

.resume-experience {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 20px 40px;
  box-sizing: border-box;
  background: rgba(255, 250, 240, 0.3);
  opacity: 0;

  .experience-avatar {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .experience-time {
    font-style: italic;
    color: gray;
    font-size: 14px;
    padding-left: 16px;
  }

  .theme--light.v-timeline .v-timeline-item .v-card:before {
    border-right-color: white;
  }

  .overwrite-card-title {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .overwrite-card-text {
    color: rgb(60, 60, 60) !important;
    font-size: 16px;
  }
}

@media (max-width: 500px) {
  .resume-experience {
    padding: 10px !important;

    /* overwrite vuetify css */
    .v-timeline-item {
      position: relative;
      padding-top: 40px;
      padding-bottom: 80px;

      .v-timeline-item__divider {
        position: absolute;
        left: -45px;
        top: -10px;
      }
    }

    /* overwrite vuetify css */
    .v-timeline:not(.v-timeline--dense):not(.v-timeline--reverse):before {
      left: 0 !important;
    }

    /* overwrite vuetify css */
    .v-timeline:not(.v-timeline--dense):not(.v-timeline--reverse), .v-timeline-item--after .v-timeline-item__body, .v-timeline:not(.v-timeline--dense):not(.v-timeline--reverse), .v-timeline-item:nth-child(odd):not(.v-timeline-item--before), .v-timeline-item__body {
      max-width: 97% !important;
    }

    /* overwrite vuetify css */
    .v-timeline-item__body {
      transform: translateX(15px);
    }
  }
}
</style>