<template>
    <section class="nav-bar">

        <span class="logo"><span class="logo-letter">e</span>venti </span>
        <router-link to="/">eventi</router-link> |
        <button>login</button>

    </section>
</template>

<script>
export default {
  name: "nav-bar"
};
</script>

<style scoped lang="scss">
.nav-bar {
  .logo {
    font-size: 2rem;
    color: rgb(75, 75, 75);
  }
  .logo-letter {
    text-align: center;
    line-height: 30px;
    display: inline-block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: rgb(75, 75, 75);
    color: white;
  }

  padding: 15px;

  a {
    display: inline-block;
    transition: 0.3s;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
    &:hover {
      transform: scale(1.3);
      // color: rgb(75, 75, 75);
      color:#41b883;

    }
  }
}
</style>
