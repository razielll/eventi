export let eventiTime = {
  computed: {
    eventiTime() {
      let { startTime, endTime } = this.eventi;
      let timeStr = '';
      if (this.isNow) {
        timeStr = this.$options.filters.moment(startTime, 'ddd, hA') + ' : Now';
      } else {
        timeStr =
          this.$options.filters.moment(startTime, 'ddd, hA') +
          ' : ' +
          this.$options.filters.moment(startTime, 'from');
      }
      return timeStr;
    },
    isNow() {
      let now = Date.now();
      let { startTime, endTime } = this.eventi;
      return now >= startTime && now < endTime;
    }
  }
};
