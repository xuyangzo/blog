<template>
  <main class="home" aria-labelledby="main-title">
    <header class="hero">
      <div class="blocker" @click.stop v-if="!shouldAnimate">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
      <div class="tv-displayer">
        <img :src="$withBase('/images/screen.gif')" alt="tv" class="tv" @load="imageLoad" />
        <img
          :src="$withBase('/images/warning.gif')"
          alt="warning"
          class="warning"
          @load="imageLoad"
        />
        <img
          :src="$withBase('/images/target.gif')"
          alt="target"
          class="target"
          @load="imageLoad"
          :class="{'target-animation': shouldAnimate}"
        />
        <img
          :src="$withBase('/images/earth.gif')"
          alt="earth"
          class="earth"
          @click="$router.push(data.actionLink)"
          @load="imageLoad"
          :class="{'earth-animation': shouldAnimate}"
        />
        <img
          :src="$withBase(data.heroImage)"
          alt="cry"
          class="cry"
          @load="imageLoad"
          :class="{'cry-animation': shouldAnimate}"
        />
        <img
          :src="$withBase('/images/dialog.png')"
          alt="dialog"
          class="dialog"
          @load="imageLoad"
          :class="{'dialog-animation': shouldAnimate}"
        />
        <span
          class="dialog-text"
          :class="{'dialog-text-animation': shouldAnimate}"
        >{{ data.dialogText }}</span>
      </div>
    </header>

    <header class="hero mobile-hero">
      <br />
      <br />
      <br />
      <img v-if="data.heroImage" :src="$withBase(heroImage)" />
      <br />
      <p class="action" v-if="data.actionText && data.actionLink">
        <NavLink class="action-button" :item="actionLink" />
      </p>
    </header>

    <!-- <div class="footer" v-if="data.footer">{{ data.footer }}</div> -->
  </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";

export default {
  components: { NavLink },
  data() {
    return {
      heroImage: "/images/01.png",
      doFlip: false,
      prevTime: null,
      imagesLoaded: 0,
      shouldAnimate: false
    };
  },
  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    }
  },
  methods: {
    imageLoad() {
      this.imagesLoaded++;
      // 如果图片全部加载完，添加动画
      if (this.imagesLoaded === 6) {
        this.shouldAnimate = true;
      }
    }
  }
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Caveat|Permanent+Marker&display=swap');

@keyframes appear {
  0% {
    visibility: visible;
    opacity: 0;
  }

  100% {
    visibility: visible;
    opacity: 1;
  }
}

@keyframes myscale {
  0% {
    transform: scale(0);
    top: 35%;
    oapcity: 1;
    left: 40%;
  }

  66% {
    transform: scale(1);
    top: 35%;
    oapcity: 1;
    left: 40%;
  }

  74% {
    transform: scale(1);
    top: 32%;
    oapcity: 1;
    left: 40%;
  }

  76% {
    transform: scale(1);
    top: 35%;
    oapcity: 1;
    left: 40%;
  }

  84% {
    transform: scale(1);
    top: 32%;
    oapcity: 1;
    left: 40%;
  }

  86% {
    transform: scale(1);
    top: 35%;
    oapcity: 1;
    left: 40%;
  }

  100% {
    transform: scale(1);
    top: 35%;
    left: 110%;
    opacity: 1;
  }
}

@keyframes dialog {
  0% {
    opacity: 0;
  }

  60% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes search {
  0% {
    top: 25%;
    left: 35%;
    transform: scale(1);
  }

  20% {
    top: 55%;
    left: 50%;
    transform: scale(1);
  }

  40% {
    top: 60%;
    left: 35%;
    transform: scale(1);
  }

  60% {
    top: 40%;
    left: 40%;
    transform: scale(1);
  }

  90% {
    top: 40%;
    left: 40%;
    transform: scale(1);
  }

  100% {
    top: 40%;
    left: 40%;
    transform: scale(0);
  }
}

.home {
  padding: 0 2rem 0;
  max-width: 100%;
  min-height: 100vh;
  margin: 0px auto;
  display: block;
  background: ghostwhite;

  .mobile-hero {
    display: none;
  }

  .hero {
    text-align: center;
    position: relative;

    .blocker {
      width: 100%;
      height: 100%;
      background: ghostwhite;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      transition: opacity;
    }

    img {
      display: block;
    }

    .tv-displayer {
      .dialog-animation, .dialog-text-animation {
        animation: dialog 1.5s 6.5s forwards ease-in-out;
      }

      .cry-animation {
        animation: myscale 3s 5s forwards ease-in-out;
      }

      .target-animation {
        animation: search 8s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
      }

      .earth-animation {
        animation: appear 1s 8s forwards ease-in-out;
      }

      .tv {
        width: 100%;
        height: 100vh;
        margin: 0 auto;
      }

      .dialog {
        width: 150px;
        position: absolute;
        top: 25%;
        left: 55%;
        opacity: 0;
      }

      .dialog-text {
        width: 150px;
        position: absolute;
        top: 29%;
        left: 55.5%;
        opacity: 0;
      }

      .cry {
        width: 200px;
        position: absolute;
        top: 35%;
        left: 40%;
        transform: scale(0);
      }

      .earth {
        width: 200px;
        position: absolute;
        top: 42%;
        left: 43%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
      }

      .target {
        width: 200px;
        position: absolute;
        top: 25%;
        left: 35%;
        filter: invert(100%);
      }

      .warning {
        width: 500px;
        position: absolute;
        left: 50%;
        transform: translateX(-60%);
        top: -60px;
        z-index: 100;
      }
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .do-flip {
      transform: rotateY(360deg);
    }

    .description {
      max-width: 35rem;
      font-size: 1.4rem;
      line-height: 1.3;
      color: lighten($textColor, 40%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      font-weight: 300;
      color: black;
      background-color: white;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: all 0.8s ease;
      box-sizing: border-box;
      font-family: 'Caveat', cursive;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

      &:hover {
        background-color: lighten(black, 20%);
        color: white;
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background: white;

    .mobile-hero {
      display: block;
    }

    .hero {
      .tv-displayer, .blocker {
        display: none;
      }

      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
