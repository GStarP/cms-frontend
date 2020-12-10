<template>
  <div class="number-password-input">
    <input
      v-for="(n, i) of numberList"
      :key="'npi' + i"
      :ref="'npiref'"
      type="password"
      maxlength="1"
      :value="numberList[i]"
      @input="onInput(i, $event.target.value)"
      @keydown.delete="onDelete(i, $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberList: [null, null, null, null, null, null]
    };
  },
  methods: {
    onInput(index, val) {
      if (val >= "0" && val <= "9") {
        const li = this.numberList.slice(0);
        li[index] = Number.parseInt(val);
        this.numberList = li;
        if (index < 5) {
          this.$refs.npiref[index + 1].focus();
        }
        // 如果全部输入完毕, 发布事件
        let finish = true;
        for (const n of this.numberList) {
          if (n === null) {
            finish = false;
          }
        }
        if (finish) {
          this.$emit("finish", this.numberList);
          console.log(this.numberList);
          this.numberList = [null, null, null, null, null, null]
        }
      } else {
        const li = this.numberList.slice(0);
        li[index] = null;
        this.numberList = li;
      }
    },
    onDelete(index, val) {
      if (index > 0 && val === "") {
        this.$refs.npiref[index - 1].focus();
      }
    }
  },
  mounted() {
    this.$refs.npiref[0].focus();
  }
};
</script>

<style lang="scss">
.number-password-input {
  display: flex;
  flex-direction: row;
  justify-content: center;

  :not(:last-child) {
    margin-right: 8px;
  }

  > input {
    $size: 40px;
    height: $size;
    width: $size;

    border: 1px solid #999;
    border-radius: 4px;

    text-align: center;
    font-size: 40px;
    /* 显示文字而不显示光标 */
    color: transparent;
    text-shadow: 0px 0px 0px #333;
  }
}
</style>
