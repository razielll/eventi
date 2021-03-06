<template>
    <section class="eventi-add section">
        <h1 class="title has-text-centered">Add New Event</h1>
          <div class="columns is-centered">
            <form @submit.prevent class="column is-half-tablet">
              <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                      <input 
                        v-model="eventi.name"
                        v-validate="'required|min:5'"
                        :class="{'input': true, 'is-danger': errors.has('name') }"
                        name="name" type="text"  placeholder="Event or announcement title" />
                  </div>
                  <p v-if="errors.has('name')" class="help is-danger">
                    <span class="icon is-small">
                      <font-awesome-icon icon="exclamation-triangle" />
                    </span>
                    <span>{{ errors.first('name') }}</span>
                  </p>
                  <p v-else class="help">Enter the name of event or announcement</p>
              </div>

              <div class="field">
                  <label class="label">Description</label>
                  <div class="control">
                      <textarea class="textarea" ref="description" v-model="eventi.description" placeholder="Add description"></textarea>
                  </div>
                  <p class="help">Add description</p>
              </div>

              <div class="field is-grouped is-grouped-multiline">
                  <div class="control">
                      <label class="label">Start Time</label>
                      <Datetime 
                        v-model="eventi.startTime"
                        v-validate="'required'"
                        name="start-time"
                        type="datetime"
                        input-class="input"
                        input-id="start-time"/>    
                  </div>
                  <div class="control">
                      <label class="label">End Time</label>
                      <Datetime 
                        v-model="eventi.endTime"
                        hidden-name="end-time"
                        type="datetime"
                        input-class="input"
                        input-id="end-time"/>    
                  </div>
              </div>

              <div class="field">
                <label class="label">Recurring Event</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" value="" v-model="eventi.recurringEventi" />
                    No
                  </label>
                  <label class="radio">
                    <input type="radio" value="weekly" v-model="eventi.recurringEventi" />
                    Weekly
                  </label>
                  <label class="radio">
                    <input type="radio" value="monthly" v-model="eventi.recurringEventi" />
                    Monthly
                  </label>
                </div>
              </div>

              <div class="field">
                <label class="label">Category</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" name="category" v-validate="'required'" value="lecture" v-model="eventi.category" />
                    Lecture
                  </label>
                  <label class="radio">
                    <input type="radio" name="category" value="party" v-model="eventi.category" />
                    Party
                  </label>
                  <label class="radio">
                    <input type="radio" name="category" value="gathering" v-model="eventi.category" />
                    Gathering
                  </label>
                  <label class="radio">
                    <input type="radio" name="category" value="sale" v-model="eventi.category" />
                    Sale
                  </label>
                  <label class="radio">
                    <input type="radio" name="category" value="needelp" v-model="eventi.category" />
                    Need Help
                  </label>
                  <label class="radio">
                    <input type="radio" name="category" value="lostfound" v-model="eventi.category" />
                    Lost &amp; found
                  </label>
                  <p v-if="errors.has('category')" class="help is-danger">
                    <span class="icon is-small">
                      <font-awesome-icon icon="exclamation-triangle" />
                    </span>
                    <span>{{ errors.first('category') }}</span>
                  </p>
                </div>
              </div>
              
              <div class="field">
                <label class="label">Location</label>
                <div class="control">
                  <GoogleAutocomplete 
                    @onLocationFound="locationFound"
                    :value="eventi.location.address"
                    class="input"
                  /> 
                </div>
                <p v-if="locationError" class="help is-danger">
                  <span class="icon is-small">
                    <font-awesome-icon icon="exclamation-triangle" />
                  </span>
                  <span>Location is required</span>
                </p>
              </div>

              <div class="field is-grouped is-grouped-multiline">
                <div class="control">
                  <label class="label">Image Url</label>
                  <input type="url" class="input" v-model="eventi.gallery" />
                  <p class="help">If you don't have one a default image will be provided</p>
                </div>
                <figure v-if="eventi.category" class="category-img control image is-128x128">
                  <img :src="categoryImgUrl">
                </figure>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <a @click="onFormSubmit" class="button is-link">Save</a>
                </div>
                <!-- <div class="control">
                  <button class="button is-text">Cancel</button>
                </div> -->
                <p class="help is-danger " v-if="errors.count()">Please fill all required fields</p>
              </div>
            </form>
          </div>
    </section> 
</template>

<script>
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import GoogleAutocomplete from './googleAutocomplete';
import EventBusService, { SHOW_MSG } from '@/services/eventBus';

const categoryImgMap = {
  lecture: 'https://jixifox.files.wordpress.com/2018/02/lecture.jpg',
  party: 'https://seda.college/wp-content/uploads/party.jpg',
  gathering: 'https://openclipart.org/download/281545/PicNicFamily.svg',
  sale: 'https://www.hiyabucks.com/wp-content/uploads/2018/06/SALE.jpg',
  needhelp:
    'http://apple-of-my-eye.com/wp-content/uploads/2015/04/hhUntitled.jpg',
  lostfound: 'https://bridgechurchnyc.com/wp-content/uploads/2017/12/Day-4.jpg'
};
export default {
  name: 'eventiAdd',
  data() {
    return {
      eventi: {
        name: '',
        description: '',
        startTime: new Date().toISOString(),
        endTime: '',
        recurringEventi: '', // weekly ,monthly
        category: null,
        gallery: null,
        location: {
          coordinates: [],
          type: 'Point'
        },
        address: ''
      },
      isEdit: false
    };
  },
  created() {
    if (this.$route.params.eventiId) {
      this.$store
        .dispatch({
          type: 'getEventiById',
          eventiId: this.$route.params.eventiId
        })
        .then(eventi => {
          // convert timestamps to ISO 8601 string
          eventi.startTime = new Date(+eventi.startTime).toISOString();
          eventi.endTime = new Date(+eventi.endTime).toISOString();

          this.eventi = eventi;

          this.isEdit = true;
        });
    }
  },
  methods: {
    onFormSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const action = this.isEdit ? 'updateEventi' : 'addEventi';
          let eventi = JSON.parse(JSON.stringify(this.eventi));
          this.$store
            .dispatch({
              type: action,
              _id: this.eventi._id,
              data: eventi,
              isCommit: false
            })
            .then(() => {
              EventBusService.$emit(SHOW_MSG, {
                txt: 'New Eventi Added',
                type: 'primary'
              });
              this.$router.push('/');
            });
        } else {
        }
      });
    },
    locationFound(location) {
      this.eventi.location.coordinates = [location.lng, location.lat];
      this.eventi.address = location.address;
    }
  },
  computed: {
    locationError() {
      // let { lat, lng, address } = this.eventi.location;
      let hasAdress = !!this.eventi.address;
      let hasCordinates = this.eventi.location.coordinates.length === 2;
      return !(hasAdress, hasCordinates);
    },
    categoryImgUrl() {
      return this.eventi.gallery
        ? this.eventi.gallery
        : categoryImgMap[this.eventi.category];
    }
  },
  watch: {
    'eventi.category'(newCategory, oldCategory) {
      this.eventi.gallery = categoryImgMap[newCategory];
    }
  },
  components: {
    Datetime,
    GoogleAutocomplete
  }
};
</script>

<style scoped>
.category-img {
  display: flex;
}
</style>
