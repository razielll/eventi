<template>
    <section class="eventi-preview-wrapper flex-col-wrap marginone" @click="eventiDetails(eventi)">

        <img class="img-responsive" :src="eventi.gallery" />
        <span class="eventi-status"> COMING UP</span>
        <h1 class="eventi-title"> {{eventi.name}}</h1>
        <p class="eventi-desc"> {{eventi.description}}</p>
        <span class="eventi-category"> {{eventi.category.join()}} </span>
        <span class="eventi-date"> date </span>
        <span class="eventi-going-people"> {{goingUsers}} people are going </span>
        <div class="action-btns flex space-between">
        <button class="eventi-join"> join </button>
        <button class="eventi-clap"> clap </button>
        <span class="eventi-dist"> distance </span>
        </div>

    </section>
</template>

<script>
import "@/assets/scss/main.scss";
export default {
  props: ["eventi"],
  computed: {
    goingUsers() {
      return this.eventi.goingUserId.length;
    }
  },
  methods:{
      eventiDetails(eventi){
          console.log('got eventi id', eventi._id);
          this.$router.push(`/eventi/${eventi._id}`)
          
      }
  }
};
</script>

<style scoped lang="scss">
.eventi-preview-wrapper {
  flex: 1 0 350px;
  padding: 5px;
  box-shadow: 0px 0px 8px black;
  //   position: relative;
  max-height: 100%;
  max-width: 100%;
  //   height: 350px;
  width: 350px;
}
.eventi-status {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  transform: translateX(40%);
  max-width: 100%;
  color: white;
  font-size: 1.5em;
}
</style>
