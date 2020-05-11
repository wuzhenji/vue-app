<template>
  <div class="three">
    <pointwave :color="0x097bdb" />
  </div>
</template>

<script>
import * as THREE from 'three'
import pointwave from '@/components/Pointwave/index'
export default {
  components: { pointwave },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
  .three{
    // width: 100vh;
    // height: 100vh;
    // overflow: hidden;
  }
</style>
