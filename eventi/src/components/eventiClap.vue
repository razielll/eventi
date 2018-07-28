<template>
    <div class="eventi-clap">
      <button 
          @click.stop="$emit('clap-click')"
          class="button is-primary is-outlined is-large clap"
          title="clap">
        <span class="icon">👏</span>
        <span>{{clapCount}}</span>
      </button>
    </div>

</template>

<script>
export default {
  name: 'eventi-clap',
  props: ['clapCount']
};
</script>

<style lang="scss" scoped>
</style>
