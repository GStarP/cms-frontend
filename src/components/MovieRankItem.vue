<template>
  <div class="movie-rank-item">
    <div class="movie-rank-item-left">
      <div :class="indexClassName">{{ index }}</div>
      <div :class="nameClassName">{{ name }}</div>
    </div>
    <div class="movie-rank-item-value">{{ boxOffice || 0 }}</div>
  </div>
</template>

<script>
export default {
  props: ["index", "id", "name", "boxOffice"],
  name: "MovieRankItem",
  data() {
    let indexClassName = "movie-rank-item-index";
    let nameClassName = "movie-rank-item-name";
    if (this.$props.index <= 3) {
      indexClassName += ` movie-rank-item-top movie-rank-item-top${this.$props.index}`;
      nameClassName += ` movie-rank-item-top${this.$props.index}`;
    } else {
      indexClassName += ` movie-rank-item-index-others`;
      nameClassName += ` movie-rank-item-index-others`;
    }
    return {
      indexClassName: indexClassName,
      nameClassName: nameClassName
    };
  }
};
</script>

<style scoped lang="scss">
.movie-rank-item {
  display: flex;
  justify-content: space-between;

  height: 35px;
  line-height: 35px;
  padding: 10px 5px 10px;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.03);
  }
}

.movie-rank-item-left {
  display: flex;
  justify-content: left;
  /*防止文本过长将父容器撑开*/
  width: 250px;
}

.movie-rank-item-value {
  color: $primary;
}

.movie-rank-item-index {
  /*font-size: 18px;*/
  font-style: italic;
  font-weight: bold;
  width: 26px;
}

.movie-rank-item-name {
  /*font-size: 16px;*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/*======================================================*/

.movie-rank-item-index-others {
  color: #999;
  font-size: 18px;
}

.movie-rank-item-name-others {
  font-size: 16px;
}

.movie-rank-item-top {
  color: $primary;

  &1 {
    font-size: 22px;
  }

  &2 {
    font-size: 20px;
  }

  &3 {
    font-size: 18px;
  }
}
</style>
