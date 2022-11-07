<script lang='tsx'>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return () => {
      return (
        <router-view />  
      )
    }
  }
})
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
