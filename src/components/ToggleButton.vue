<template>
  <div
    class="toggle-button toggle-button-selected"
    v-if="this.selected"
    @click="this.toggle"
  >
    {{ text }}
  </div>
  <div
    class="toggle-button toggle-button-unselected"
    v-else
    @click="this.toggle"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "ToggleButton",
  props: ["toggled", "onClick", "text"],
  data() {
    return {
      selected: this.toggled
    };
  },
  methods: {
    toggle() {
      this.selected = !this.selected;
      this.onClick(this.text, this.selected);
    }
  }
};
</script>

<style scoped lang="scss">
.toggle-button {
  margin: 10px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  border: 1px solid #ffffff;
  border-radius: 4px;
}
.toggle-button-selected {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.toggle-button-unselected {
  background: transparent;
  border-color: #dcdfe6;
  color: #606266;

  &:hover {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }
}
</style>
