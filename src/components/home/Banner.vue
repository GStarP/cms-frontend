<template>
  <div class="banner">
    <div class="banner__wrapper">
      <el-carousel
        class="banner-main"
        :interval="4000"
        style="width: 100%"
        height="560px"
      >
        <el-carousel-item
          v-for="index in bannerInfo.length"
          :key="'banner' + index"
        >
          <el-image
            class="banner-img"
            @click="
              $router.push({
                path: bannerInfo[index - 1].src
              })
            "
            :src="bannerInfo[index - 1].img"
            :fit="fit"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { getBannerInfo } from "@/api/movie";

export default {
  name: "Banner",
  data() {
    return {
      fit: "fit",
      bannerInfo: []
    };
  },
  mounted() {
    const loading = this.$loading.service();
    getBannerInfo()
      .then(res => res.content)
      .then(res => {
        this.bannerInfo = [
          {
            img: res.img1,
            src: "/movie-detail/" + res.navi1
          },
          {
            img: res.img2,
            src: "/movie-detail/" + res.navi2
          },
          {
            img: res.img3,
            src: "/movie-detail/" + res.navi3
          }
        ];
        loading.close();
      })
      .catch(e => {
        console.log(e);
        loading.close();
      });
  }
};
</script>

<style scoped lang="scss">
.banner__wrapper {
  margin-top: 16px;
  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
}
.banner-img {
  height: 100%;
  width: 100%;
}
</style>
