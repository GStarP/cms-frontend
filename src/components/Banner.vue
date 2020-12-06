<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="index in bannerInfo.length" :key="index">
        <el-image
          @click="this.$router.push({ path: bannerInfo[index - 1].src })"
          :src="bannerInfo[index - 1].img"
          :fit="fit"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: auto;

  :nth-child(2n) {
    background-color: #99a9bf;
  }

  :nth-child(2n + 1) {
    background-color: #d3dce6;
  }
}
</style>
