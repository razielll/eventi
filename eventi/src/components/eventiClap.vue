<template>
    <div class="eventi-clap">
      <button @click.stop="$emit('clap-click')" class="button is-primery clap">clap</button>
      <span>{{clapCount}}</span>
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
