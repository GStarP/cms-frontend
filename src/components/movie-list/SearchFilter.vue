<template>
  <div class="search-filter">
    <div class="search-filter-category">
      <span>类型：</span>
      <div class="search-filter-category-list">
        <toggle-button
          v-for="c in countries"
          v-bind:key="c"
          :text="c"
          :toggled="false"
          :onClick="onCountryClick"
        />
      </div>
    </div>
    <div class="search-filter-country">
      <span>国家：</span>
      <div class="search-filter-country-list">
        <toggle-button
          v-for="c in categories"
          v-bind:key="c"
          :text="c"
          :toggled="false"
          :onClick="onCategoryClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ToggleButton from "@/components/ToggleButton.vue";
export default {
  data() {
    return {
      selectedCountries: [],
      selectedCategories: []
    };
  },
  components: { ToggleButton },
  methods: {
    onCountryClick(country, isSelected) {
      if (isSelected) {
        this.selectedCountries = [country, ...this.selectedCountries];
      } else {
        this.selectedCountries = this.selectedCountries.filter(
          m => m !== country
        );
      }
      this.filter(this.selectedCountries, this.selectedCategories);
    },
    onCategoryClick(category, isSelected) {
      if (isSelected) {
        this.selectedCategories = [category, ...this.selectedCategories];
      } else {
        this.selectedCategories = this.selectedCategories.filter(
          m => m !== category
        );
      }
      this.filter(this.selectedCountries, this.selectedCategories);
    }
  },
  name: "SearchFilter",
  props: ["filter", "countries", "categories"]
};
</script>

<style scoped lang="scss">
.search-filter {
  padding: 0;
  margin-top: 40px;
}
.search-filter-category {
  span {
    color: gray;
  }

  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.search-filter-country {
  span {
    color: gray;
  }

  border-top: 1px dotted #e5e5e5;

  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.search-filter-category-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.search-filter-country-list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
