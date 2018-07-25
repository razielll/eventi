<template>
    <section class="eventi-add">
        <form @submit.prevent="onFormSubmit">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="name" placeholder="Event or announcement title">
                </div>
                <p class="help">Enter the name of event or announcement</p>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" v-model="description" placeholder="Add description"></textarea>
                </div>
                <p class="help">Add description</p>
            </div>
            <div class="field-group">
              <div class="field">
                  <label class="label">Start Time</label>
                  <div class="control">
                      <Datetime v-model="startTime" input-class="input"/>    
                  </div>
              </div>
              <div class="field">
                  <label class="label">End Time</label>
                  <div class="control">
                      <Datetime v-model="endTime" input-class="input"/>    
                  </div>
              </div>
            </div>


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
html {
  box-sizing: border-box;
}

*,
::after,
::before {
  box-sizing: inherit;
}
.field-group {
  display: flex;
}
.field {
  line-height: 1.5;
  text-align: left;
}
.label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
}

.label:not(:last-child) {
  margin-bottom: 0.5em;
}
.control {
  clear: both;
  font-size: 1rem;
  position: relative;
}
.input,
.textarea {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 1rem;
  height: 2.25em;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
  position: relative;
  vertical-align: top;
  margin: 0;
  background-color: #fff;
  border-color: #dbdbdb;
  color: #363636;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  max-width: 100%;
  width: 100%;
}
.textarea {
  display: block;
  max-width: 100%;
  min-width: 100%;
  padding: 0.625em;
  resize: vertical;
}
.textarea:not([rows]) {
  max-height: 600px;
  min-height: 120px;
}

.textarea[rows] {
  height: initial;
}

.help {
  display: block;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
</style>
