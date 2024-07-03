<template>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dongle&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  font-family: "Dongle", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 25px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
