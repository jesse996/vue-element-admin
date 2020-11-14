<template>
  <div class="app-container">
    <h2>设置轮波图：</h2>
    <img src="@/assets/404_images/404.png" class="slide">
    <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
  </div>
</template>
<script>
import Dropzone from '@/components/Dropzone'
export default {
  name: 'SetSlide',
  components: {
    Dropzone
  },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    }
  }
}
</script>
<style lang="scss" scoped>
.slide{
  display: block;
  margin: 30px auto;
}
</style>
