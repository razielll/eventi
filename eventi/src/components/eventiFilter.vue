<template>
    <section class="eventi-filter">
        <hr>
        <div class="container">
            <div class="columns filters">
                <div class="column is-8-tablet">
                <div class="buttons">
                    <button 
                        @click="onFilterChange(null)"
                        class="button"
                        >All
                    </button>
                    <button 
                        @click="onFilterChange('lecture')" 
                        class="button lecture"
                        :class="{active : category === 'lecture'}"
                        >Lecture
                    </button>
                    <button 
                        @click="onFilterChange('party')" 
                        class="button party"
                        :class="{active : category === 'party'}"
                        >Party
                    </button>
                    <button 
                        @click="onFilterChange('gathering')" 
                        class="button gathering"
                        :class="{active : category === 'gathering'}"
                        >Gathering
                    </button>
                    <button 
                        @click="onFilterChange('sale')" 
                        class="button sale"
                        :class="{active : category === 'sale'}"
                        >Sale
                    </button>
                    <button 
                        @click="onFilterChange('needhelp')" 
                        class="button needhelp"
                        :class="{active : category === 'needhelp'}"
                        >Need Help
                    </button>
                    <button 
                        @click="onFilterChange('lostfound')" 
                        class="button lostfound"
                        :class="{active : category === 'lostfound'}"
                        >Lost &amp; Found
                    </button>
                </div>
                </div>
                <div class="column">
                <div class="field">
                    <input 
                        value="500"
                        v-model="distance"
                        @change="onDistanceChange"
                        class="is-checkradio" id="distance-1" type="radio" :checked="distance === 500">
                    <label for="distance-1">500m</label>
                    <input 
                        value="5000"
                        v-model="distance"
                        @change="onDistanceChange"
                        class="is-checkradio" id="distance-2" type="radio" :checked="distance === 5000">
                    <label for="distance-2">5000m</label>
                </div>
                </div>
                <div class="column">
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                    <input class="input" type="search" placeholder="Search for location">
                    <span class="icon is-small is-left">
                        <font-awesome-icon icon="search"/>
                    </span>
                    </p>
                </div>
                </div>
            </div>
        </div>
        
        <hr>
    </section>
</template>
<script>
export default {
  name: 'eventi-filter',
  data() {
    return {
      category: null,
      distance: '5000'
    };
  },
  methods: {
    onFilterChange(selectedCategory) {
      this.category = selectedCategory;
      this.$store.dispatch({
        type: 'setFilterBy',
        distance: +this.distance,
        category: this.category
      });
    },
    filterByCategory(category) {
      this.activeCategory = category;
      this.$store.dispatch({ type: 'setFilterBy', category });
    },
    onDistanceChange() {
      this.$store.dispatch({
        type: 'setFilterBy',
        distance: +this.distance,
        category: this.category
      });
    }
  }
};
</script>
<style scoped>
.filters {
  align-items: center;
}
</style>