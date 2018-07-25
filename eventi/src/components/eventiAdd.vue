<template>
    <section class="eventi-add">
        <form @submit.prevent="onFormSubmit">

            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="eventi.name" placeholder="Event or announcement title">
                </div>
                <p class="help">Enter the name of event or announcement</p>
            </div>

            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" v-model="eventi.description" placeholder="Add description"></textarea>
                </div>
                <p class="help">Add description</p>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <label class="label">Start Time</label>
                    <Datetime v-model="eventi.startTime" input-class="input"/>    
                </div>
                <div class="control">
                    <label class="label">End Time</label>
                    <Datetime v-model="eventi.endTime" input-class="input"/>    
                </div>
            </div>

            <div class="field">
              <label class="label">Recurring Event</label>
              <div class="control">
                <label class="radio">
                  <input type="radio" value="" v-model="eventi.recurringEventi">
                  No
                </label>
                <label class="radio">
                  <input type="radio" value="weekly" v-model="eventi.recurringEventi">
                  Weekly
                </label>
                <label class="radio">
                  <input type="radio" value="monthly" v-model="eventi.recurringEventi">
                  Monthly
                </label>
              </div>
            </div>

            <div class="field">
              <label class="label">Category</label>
              <div class="control">
                <label class="radio">
                  <input type="radio" value="lecture" v-model="eventi.category" />
                  Lecture
                </label>
                <label class="radio">
                  <input type="radio" value="party" v-model="eventi.category" />
                  Party
                </label>
                <label class="radio">
                  <input type="radio" value="gathering" v-model="eventi.category" />
                  Gathering
                </label>
                <label class="radio">
                  <input type="radio" value="sale" v-model="eventi.category" />
                  Sale
                </label>
                <label class="radio">
                  <input type="radio" value="needelp" v-model="eventi.category" />
                  Need Help
                </label>
                <label class="radio">
                  <input type="radio" value="lost &amp; found" v-model="eventi.category" />
                  Lost &amp; found
                </label>
              </div>
            </div>
            
            <div class="field">
              <label class="label">Location</label>
              <div class="control">
                <input type="text" class="input" v-model="eventi.location.address">
              </div>
            </div>

            <div class="field">
              <label class="label">Image Url</label>
              <div class="control">
                <input type="url" class="input" v-model="eventi.gallery">
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button type="submit" class="button is-link">Submit</button>
              </div>
              <!-- <div class="control">
                <button class="button is-text">Cancel</button>
              </div> -->
            </div>
        </form>
    </section> 
</template>

<script>
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import { EVENTI_ADD } from '../store/eventiModule';
export default {
  name: 'eventiAdd',
  data() {
    return {
      eventi: {
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
      }
    };
  },
  methods: {
    onFormSubmit() {
      this.$store.dispatch({ type: EVENTI_ADD, eventi: this.eventi });
    }
  },
  components: {
    Datetime
  }
};
</script>

<style>
</style>
