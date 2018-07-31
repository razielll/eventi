<template>
    <section class="eventi-filter">
        <hr>
        <div class="container">
            <div class="columns filters">
                <div class="column is-8-tablet">
                <div class="buttons">
                    <button 
                        @click="filterByCategory(null)"
                        class="button"
                        >All
                    </button>
                    <button 
                        @click="filterByCategory('lecture')" 
                        class="button lecture"
                        :class="{active : activeCategory === 'lecture'}"
                        >Lecture
                    </button>
                    <button 
                        @click="filterByCategory('party')" 
                        class="button party"
                        :class="{active : activeCategory === 'party'}"
                        >Party
                    </button>
                    <button 
                        @click="filterByCategory('gathering')" 
                        class="button gathering"
                        :class="{active : activeCategory === 'gathering'}"
                        >Gathering
                    </button>
                    <button 
                        @click="filterByCategory('sale')" 
                        class="button sale"
                        :class="{active : activeCategory === 'sale'}"
                        >Sale
                    </button>
                    <button 
                        @click="filterByCategory('needhelp')" 
                        class="button needhelp"
                        :class="{active : activeCategory === 'needhelp'}"
                        >Need Help
                    </button>
                    <button 
                        @click="filterByCategory('lostfound')" 
                        class="button lostfound"
                        :class="{active : activeCategory === 'lostfound'}"
                        >Lost &amp; Found
                    </button>
                </div>
                </div>
                <div class="column">
                <div class="field">
                    <input class="is-checkradio" id="distance-1" type="radio" name="exampleRadioInline" checked="checked">
                    <label for="distance-1">500m</label>
                    <input class="is-checkradio" id="distance-2" type="radio" name="exampleRadioInline">
                    <label for="distance-2">1000m</label>
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
      activeCategory: null
    };
  },
  methods: {
    filterByCategory(category) {
      this.activeCategory = category;
      this.$store.dispatch({ type: 'filterByCategory', category });
    }
  }
};
</script>
<style scoped>
.filters {
  align-items: center;
}
</style>