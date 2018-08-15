<template>
    <section class="eventi-filter has-background-white">
        <hr>
        <div class="container filter-container">
            <div class="columns filters is-marginless">
                <div class="column is-8">
                    <div class="buttons is-marginless button-filter">
                        <button @click.stop="onFilterChange(null)" class="button">All
                        </button>
                        <button @click.stop="onFilterChange('lecture')" class="button lecture" :class="{active : category === 'lecture'}">Lecture
                        </button>
                        <button @click.stop="onFilterChange('party')" class="button party" :class="{active : category === 'party'}">Party
                        </button>
                        <button @click.stop="onFilterChange('gathering')" class="button gathering" :class="{active : category === 'gathering'}">Gathering
                        </button>
                        <button @click.stop="onFilterChange('sale')" class="button sale" :class="{active : category === 'sale'}">Sale
                        </button>
                        <button @click.stop="onFilterChange('needhelp')" class="button needhelp" :class="{active : category === 'needhelp'}">Need Help
                        </button>
                        <button @click.stop="onFilterChange('lostfound')" class="button lostfound" :class="{active : category === 'lostfound'}">Lost &amp; Found
                        </button>
                    </div>
                    <div class="has-text-centered select-filter">
                        <div class="select">
                            <select @change="onFilterChange($event.target.value)">
                                <option value="null">All</option>
                                <option value="lecture">Lecture</option>
                                <option value="party">Party</option>
                                <option value="gathering">Gathering</option>
                                <option value="sale">Sale</option>
                                <option value="needhelp">Need Help</option>
                                <option value="lostfound">Lost &amp; Found</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <input value="500" v-model="distance" @change="onDistanceChange" class="is-checkradio" id="distance-1" type="radio" :checked="distance === 500">
                        <label for="distance-1">500m</label>
                        <input value="5000" v-model="distance" @change="onDistanceChange" class="is-checkradio" id="distance-2" type="radio" :checked="distance === 5000">
                        <label for="distance-2">5000m</label>
                    </div>
                </div>
                <!-- <div class="column is-2">
                    <div class="field">
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="search" placeholder="Search for location">
                            <span class="icon is-small is-left">
                                <font-awesome-icon icon="search" />
                            </span>
                        </p>
                    </div>
                </div> -->
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
      if (this.category === selectedCategory) this.category = null;
      else this.category = selectedCategory;
      this.$store.dispatch({
        type: 'setFilterBy',
        distance: +this.distance,
        category: this.category
      });
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
.eventi-filter {
  position: fixed;
  position: sticky;
  top: 65px;
  z-index: 10;
}
.filter-container {
  padding-left: 1rem;
  padding-right: 1rem;
}
.filters {
  align-items: center;
}
.button-filter {
  display: none;
}
.column {
  display: inline-block;
}
@media (min-width: 720px) {
  .button-filter {
    display: flex;
  }
  .select-filter {
    display: none;
  }
}
</style>