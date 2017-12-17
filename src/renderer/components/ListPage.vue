<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Photos</h1>
      <ul id="example-1">
        <li v-for="item in items">
          <Photo :item=item></Photo>
          {{ item.urls.regular }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>

import unsplash from '../unsplash/index.js'

import Photo from './ListPage/Photo.vue'

export default {
  name: 'list-page',
  components: { Photo },
  props: {
    fetchedItems: Array
  },
  data: () => {
    return {
      items: this.fetchedItems
    }
  },
  created() {
    unsplash.fetch()
      .then((response) => {
        this.items = response
      })
  }
}

</script>

<style>

</style>
