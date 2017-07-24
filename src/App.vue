<template>
  <div id="app">
    <header>
      <img src="static/hamburger.svg" @click="openLeft()" />
      <h1 class="main-header-heading">
        <router-link to="/">
          SLapp
        </router-link>
      </h1>
      <div></div>
    </header>
    <router-view></router-view>
    <aside :class="{'left--is-open':leftOpen}" class="left">
      <div class="left__back-drop" @click="closeLeft()"></div>
      <div class="left__body">
        <header>
          <h1>Meny</h1>
        </header>
        <div v-for="link in links" @click="closeLeft()">
          <router-link class="left__link" :to="link.link">{{link.text}}</router-link>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      leftOpen: false,
      openLeft: function () {
        this.leftOpen = true;
      },
      closeLeft: function () {
        console.log('')
        this.leftOpen = false;
      },
      links: [
        { link: '/', text: 'Sökning' },
        { link: '/mina-resor', text: 'Mina stationer' },
        { link: '/storningar', text: 'Störningar' },
        { link: '/om', text: 'Om SLapp' }
      ]
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

h1 {
  margin: 0;
  font-size: 2rem
}

.main-header-heading {
  margin-left: 2em;
}

a {
  color: inherit;
  text-decoration: inherit;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  display: flex;
  background-color: #03a9f4;
  color: #fefefe;
  padding: 1em;
  flex-shrink: 0;
}

header img {
  margin: -1em;
  padding: 1em;
  cursor: pointer;
}

#app>:nth-child(2) {
  overflow: auto;
}

.left {
  header {
    justify-content: center;
  }
  &__body {
    $_width: 15em;
    position: fixed;
    transition: transform 0.2s ease-in;
    top: 0;
    bottom: 0;
    left: 0;
    width: $_width;

    transform: translateX(-$_width);
    background-color: white;
  }
  &--is-open &__body {
    transform: translateX(0);
  }

  &__back-drop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.5);
    height: 100%;
    width: 100%;
    display: none;
  }

  &--is-open &__back-drop {
    display: block;
  }

  &__link {
    padding: 0.5em;
    font-size: 1.5rem;
    display: block;
    border-bottom: 1px solid #ccc;
  }
}
</style>