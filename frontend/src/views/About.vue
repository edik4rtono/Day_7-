<template>
  <div>
    <h1>About me</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  mounted() {
    const path = this.$route.path
    axios.get('backend/' + path)
  }

}
</script>
