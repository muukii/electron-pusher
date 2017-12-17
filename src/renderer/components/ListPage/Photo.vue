<template>
  
  <figure class="image is-64x64">
    <img :src=imageURL alt="Image">
  </figure>
  
</template>

<script>

export default {
  name : "Photo",
  props : { item: Object },
  data() {
    return {
      imageURL: this.item.urls.regular
    }
  }
}

</script>

<style>

</style>
