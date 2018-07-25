<template>
    <section class="eventi-list">
        <div class="eventi-wrapper" v-for="eventi in eventis" :key="eventi._id"> 



        </div>
        
        </section> 
</template>

<script>
export default {
created(){
    this.loadEventis;
},
methods:{

},
computed:{

}
};
</script>

<style>
</style>
