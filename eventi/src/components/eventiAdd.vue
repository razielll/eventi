<template>
    <section class="eventi-add">
        <form @submit.prevent="onFormSubmit">
            <input type="text" v-model="name">
            <textarea cols="30" rows="10" v-model="description"></textarea>
            <Datetime v-model="startTime"/>    
            <Datetime v-model="endTime"/>

            <label>Recurring Event</label>
            <input type="radio" value="" v-model="recurringEventi">    
            <input type="radio" value="weekly" v-model="recurringEventi">    
            <input type="radio" value="monthly" v-model="recurringEventi">

            <label>Category</label>
            <input type="radio" value="lecture" v-model="category" />
            <input type="radio" value="party" v-model="category" />
            <input type="radio" value="gathering" v-model="category" />
            <input type="radio" value="sale" v-model="category" />
            <input type="radio" value="needelp" v-model="category" />
            <input type="radio" value="lost &amp; found" v-model="category" />

            <input type="text" v-model="location.address">
            <input type="url" v-model="gallery">
        </form>
    </section> 
</template>

<script>
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';

export default {
  name: 'eventiAdd',
  data() {
    return {
      name: '',
      description: '',
      startTime: '',
      endTime: '',
      recurringEventi: '', // weekly ,monthly
      category: null,
      gallery: null,
      location: {
        lat: null,
        lng: null,
        address: ''
      }
    };
  },
  methods: {
    onFormSubmit() {}
  },
  components: {
    Datetime
  }
};
</script>

<style>
</style>
