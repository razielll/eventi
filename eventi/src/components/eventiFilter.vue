<template>
    <section class="eventi-filter">
        <hr>
        <div class="container">
            <div class="columns filters">
                <div class="column is-8-tablet">
                <div class="buttons">
                    <button @click="filterByCategory('lecture')" class="button">Lecture</button>
                    <button @click="filterByCategory('party')" class="button">Party</button>
                    <button @click="filterByCategory('gathering')" class="button">Gathering</button>
                    <button @click="filterByCategory('sale')" class="button">Sale</button>
                    <button @click="filterByCategory('need help')" class="button">Need Help</button>
                    <button @click="filterByCategory('lost & found')" class="button">Lost &amp; Found</button>
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
  methods: {
    filterByCategory(category) {
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