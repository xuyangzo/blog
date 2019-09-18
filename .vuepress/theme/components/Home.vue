<template>
  <main class="home" aria-labelledby="main-title">
    <header class="hero">
      <img
        v-bind:class="{ 'do-flip': doFlip }"
        v-if="data.heroImage"
        :src="$withBase(heroImage)"
        :alt="data.heroAlt || 'hero'"
        @mouseenter="randomFlip"
      />
      <p class="description">{{ intro }}</p>
      <h1 v-if="data.heroText !== null" id="main-title">{{ data.heroText || $title || 'Hello' }}</h1>

      <p class="action" v-if="data.actionText && data.actionLink">
        <NavLink class="action-button" :item="actionLink" />
      </p>
    </header>

    <div class="features" v-if="data.features && data.features.length">
      <div class="feature" v-for="(feature, index) in data.features" :key="index">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <div class="footer" v-if="data.footer">{{ data.footer }}</div>
  </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";

const intro = {
  1: "I'm single...",
  2: "What the fuck???",
  3: "So many stuff in front-end...",
  4: "So many fucking stuff in front-end...",
  5: "Great. Interesting.",
  6: "Am I cute?",
  7: "Hello nice to meet you.",
  8: "Dalao!!!",
  9: "Fuck LeetCode!!!",
  10: "emmm...",
  11: "OK...",
  12: "I am not surprised at all (true)",
  13: "Come fuck me if you can~",
  14: "Go fuck yourself.",
  15: "What the hack did I see!!!",
  16: "I am done.",
  17: "Heiheiheihei...",
  18: "Go on. I am listening.",
  19: "You scared me.",
  20: "Handsome!",
  21: "How is this possible???",
  22: "I am not happy at all",
  23: "Fine.",
  24: "Yi~~~",
  25: "I am sure.",
  26: "I am HAPPYYYY!!!",
  27: "TO BE ADDED.",
  28: "Nothing special.",
  29: "You gotta coax me.",
  30: "Nothing works fine for me.",
  31: "Fight on!",
  32: "Great!",
  33: "Why are you so cold?",
  34: "It's normal...",
  35: "No one loves in this world...",
  36: "Shitttt!!!",
  37: "Hahahahaha~",
  38: "You deserve this.",
  39: "Got it! Thank you so much!",
  40: "...",
  41: "Heng!",
  42: "It should not come...",
  43: "xswl",
  44: "You cannot beat me~~~",
  45: "You really think so???",
  46: "Too bad.",
  47: "OK. Continue your performance.",
  48: "Let's not tell him how stupid he is.",
  49: "Fuck algorithms!!!",
  50: "There's something..."
};

export default {
  components: { NavLink },
  data() {
    return {
      heroImage: "/01.png",
      doFlip: false,
      prevTime: null,
      intro: intro[1]
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
    randomFlip: function() {
      const time = new Date();
      if (!this.prevTime || time - this.prevTime > 500) {
        // throttle
        let num = Math.floor(Math.random() * 50) + 1;
        this.intro = intro[num];
        if (num < 10) num = "/0".concat(num.toString());
        else num = "/".concat(num.toString());
        this.heroImage = num.concat(".png");
        this.doFlip = !this.doFlip;
        this.prevTime = time;
      }
    }
  }
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Caveat|Permanent+Marker&display=swap');

.home {
  padding: $navbarHeight 2rem 0;
  max-width: 960px;
  margin: 0px auto;
  display: block;

  .hero {
    text-align: center;

    img {
      max-width: 150px;
      display: block;
      margin: 3rem auto 1.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transition: transform 2s cubic-bezier(0.075, 0.82, 0.165, 1);
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
      border: 1px solid black;
      transition: all 0.8s ease;
      box-sizing: border-box;
      font-family: 'Caveat', cursive;

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

    .hero {
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
