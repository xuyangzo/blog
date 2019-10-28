<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      intersection: {
        threshold: 0.2
      },
      once: true
    }"
    v-if="intros.length"
    class="resume-intro"
    :class="{ 'resume-intro-appear': isVisible }"
  >
    <v-item-group>
      <v-container>
        <v-row>
          <v-col v-for="card in cards" :key="card.image" cols="12" md="4">
            <v-card class="d-flex align-center custom-card" height="200">
              <img :src="$withBase(card.image)" class="resume-sign" />
              <v-card-title>{{ card.title }}</v-card-title>
              <v-card-text class="text-center">{{ card.text }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
export default {
  props: {
    intros: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isVisible: false,
      setFalse: false,
      cards: [
        {
          title: "单身狗",
          image: "/single-dog.png",
          text: "不是，你们都是怎么找到女朋友的？"
        },
        {
          title: "养生选手",
          image: "/tea.png",
          text: "没有什么比身体更重要，钱也不行"
        },
        {
          title: "网文写手",
          image: "/writer.jpeg",
          text: "水平还行的半途而废型十八流写手"
        },
        {
          title: "不喝酒",
          image: "/no-drink.jpg",
          text: "讲道理，酒又没有肥宅快乐水好喝"
        },
        {
          title: "不抽烟",
          image: "/no-smoke.png",
          text: "讲道理，抽烟只会加速肥宅的死亡"
        },
        {
          title: "不玩多人游戏",
          image: "/no-game.png",
          text: "只喜欢能随时暂停或者投降的游戏"
        },
        {
          title: "会做饭",
          image: "/cook.png",
          text: "讲道理，没有哪个留学生不会做饭"
        },
        {
          title: "整理癖",
          image: "/clean.png",
          text: "看见乱或者脏的东西就会暴起整理"
        },
        {
          title: "死宅",
          image: "/house.jpeg",
          text: "喜欢待在家里，尤其是晚上9:00后"
        }
      ]
    };
  },
  methods: {
    visibilityChanged(isVisible) {
      this.isVisible = isVisible;
    }
  }
};
</script>

<style lang="stylus">
.resume-intro-appear {
  animation: fadeInUp 1s forwards cubic-bezier(0.075, 0.82, 0.165, 1);
}

.resume-intro {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  background: rgba(255, 230, 245, 0.2);
  opacity: 0;

  /* overwrite vuetify css */
  .v-card {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 10px 0;
    justify-content: center;

    .v-card__text {
      text-align: center;
    }
  }

  /* overwrite vuetify css */
  .custom-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h2 {
    font-family: 'Karla', sans-serif;
    border-bottom: 2px solid black;
  }

  .resume-sign {
    height: 100px;
    border-radius: 50% !important;
  }
}
</style>