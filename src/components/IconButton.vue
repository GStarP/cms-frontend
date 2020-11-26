<template>
  <div class="icon-button" @click="$emit('click')">
    <div class="icon-button__icon" :style="iconStyle"></div>
    <div class="icon-button__text">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['icon', 'color'],
  computed: {
    iconStyle() {
      const url = require(`@/assets/img/${this.icon}.svg`)
      return {
        'mask': `url(${url}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${url}) no-repeat 50% 50%`,
        'mask-size': 'contain',
        '-webkit-mask-size': 'contain',
        'background-color': this.color
      }
    }
  }
}
</script>

<style lang="scss">
.icon-button {
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-left: 12px;
  padding-right: 10px;

  width: fit-content;
  border-radius: 4px;
  background-color: $primary;

  &:hover {
    cursor: pointer;
    background-color: #1E88E5;
  }

  .icon-button__icon {
    $size: 16px;
    width: $size;
    height: $size;
    margin-right: 6px;
  }

  .icon-button__text {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 2px;
    color: #FFF;
  }
}
</style>