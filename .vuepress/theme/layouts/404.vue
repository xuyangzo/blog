<template>
  <div class="theme-container fof-container">
    <v-app>
      <v-container fluid class="text-center">
        <br />
        <br />
        <v-row align="center" justify="center">
          <img :src="$withBase('/images/ah.png')" class="ah-image" />
          <v-alert
            dense
            text
            type="success"
            icon="mdi-account"
            max-width="350"
            class="d-inline-block ml-6"
          >既然都 404 了，为什么不来吸猫呢？</v-alert>
        </v-row>
        <br />
        <div class="cat-displayer mx-auto">
          <v-row justify="center" v-for="row in currImages()">
            <v-col cols="4" xs="12" v-for="image in row" :style="{ padding: '5px'  }">
              <v-card elevation="0" min-width="120" min-height="120">
                <img
                  :src="image"
                  alt="cat-ah"
                  class="cat-image"
                  :class="{ 'cat-image-scale' : shouldScale[image] }"
                  :key="image"
                  @load="setScale(image)"
                />
              </v-card>
            </v-col>
          </v-row>
        </div>
        <br />
        <v-row justify="center">
          <v-col cols="3" xs="12">
            <v-btn block color="deep-purple lighten-4" @click="updateIndex">换一批</v-btn>
          </v-col>
          <v-col cols="3" xs="12">
            <v-btn block @click="$router.go(-1)">不吸了，回到上个页面</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currIndex: 0,
      shouldScale: {},
      allImages: [
        "https://t1.picb.cc/uploads/2019/10/31/gKcNFX.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKc3Mg.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKcvf8.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKc7LR.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKcWlW.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKcMKL.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKcAji.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKc84v.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKc5JD.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKcHFu.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKcGAa.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKc4wd.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKcmL1.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKcch0.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKcClJ.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKclKr.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKcebF.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKcn4t.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKciJM.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKc6BT.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKcfA6.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKcww7.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKct9s.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKckhe.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKcgeN.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKcJEK.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKc2bc.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKcy1j.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCoJy.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCYBG.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCK8X.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCEwg.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCz98.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCs7R.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCUew.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKC9EW.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCTaL.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCx1i.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCR2v.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCFXD.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCB8u.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCXZa.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKC0Td.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCp71.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCjn0.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCaEJ.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCQar.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCNmF.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKC32t.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKChXM.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKC75T.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCqZ6.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCOT7.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCMqs.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCAne.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKC5DN.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCrQK.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCHmc.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCGyj.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKC1Xy.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCm5G.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCctX.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCuTg.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKClq8.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCeiR.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCiDw.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCIQW.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKC6cL.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCfyi.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCZSv.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCtrD.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKCktu.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCVxa.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKCJWd.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKC2i1.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuoz0.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKudQJ.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuYcr.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuEoF.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuDSt.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuzrM.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuskT.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuLx6.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKu9W7.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuTIs.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuRze.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuPNN.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuFCK.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuXoc.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuS0j.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKu0ry.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKupkG.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKubRX.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuaWg.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuQI8.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKu3sR.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuvNw.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuhCW.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuqdL.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuW0i.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuOHv.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuMgD.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKu8Ru.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKu5Oa.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKur6d.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuGs1.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKu430.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKu1CJ.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKucdr.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuCpF.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuuHt.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKulgM.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKunPT.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuiO6.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuI67.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKufUs.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuw3e.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuZuN.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKukYK.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKugpc.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuVGj.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKuJgy.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKuyPG.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKloMX.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKld6g.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlKU8.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlEvR.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKlDuw.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlsYW.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlUjL.jpg",
        "https://t1.picb.cc/uploads/2019/10/31/gKlLGi.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKl9Vv.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlxFD.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlRMu.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlPfa.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlBLd.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlXv1.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlSl0.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlpYJ.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKljjr.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlb4F.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlaVt.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlNFM.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKl3AT.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlvf6.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKl7L7.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlqhs.gif",
        "https://t1.picb.cc/uploads/2019/10/31/gKlWle.gif"
      ]
    };
  },
  methods: {
    setScale(image) {
      if (!this.shouldScale[image]) this.$set(this.shouldScale, image, true);
    },
    updateIndex() {
      const range = Math.floor(this.allImages.length / 9);
      this.currIndex = Math.floor(Math.random() * range);
      this.$scrollToTop();
    },
    currImages() {
      const images = this.allImages.slice(
        this.currIndex * 9,
        this.currIndex * 9 + 9
      );
      const result = [];
      for (let i = 0; i < 3; ++i) {
        const temp = [images[i * 3], images[i * 3 + 1], images[i * 3 + 2]];
        result.push(temp);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus">
@keyframes myscale {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

.cat-displayer {
  border-radius: 5px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 50%;
  padding: 10px 20px;

  .cat-image {
    max-width: 100%;
    max-height: 120px;
    transform: scale(0);
  }

  .cat-image-scale {
    transform: scale(1);
    animation: myscale 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
}

@media (max-width: 400px) {
  .fof-container {
    .ah-image {
      margin-bottom: 20px;
    }

    /* overwrite vuepress css */
    .ml-6 {
      margin-left: 0 !important;
    }

    .col-4, .col-3 {
      flex-basis: 95% !important;
      max-width: 95%;
    }

    .v-btn {
      height: 50px !important;
    }

    .v-card {
      min-height: 200px !important;
      min-width: 200px !important;
    }

    .cat-displayer {
      width: 95%;

      .cat-image {
        max-height: 100%;
      }
    }
  }
}
</style>