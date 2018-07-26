<template>
    <section class="user-profile">
        hi
    </section>    
</template>

<script>
export default {
    data() {
        return {
            user: null
        }
    },
    created() {
        this.$store.dispatch({type: 'loadUser'}).then(user => {
            this.user = user
        })
    }
}
</script>

<style>

</style>
