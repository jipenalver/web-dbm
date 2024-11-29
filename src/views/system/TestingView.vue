<script setup>
import { ref, onMounted, reactive } from 'vue'
import { nextTick } from 'vue'
const count = ref(0)
const formData = ref({
  pap: '',
  status: 'pending'
})
const reactiveState = reactive({ state: 0 })
const nested = { nestedRef: ref(10) }
function incrementReactiveState() {
  //   let { state } = reactiveState
  //   state++
  reactiveState.state++
  console.log('reactive will not trigger rerender')
}
async function increment() {
  count.value++
  await nextTick()
  count.value++
}
onMounted(() => {
  console.log('Elements have been mounted')
  console.log(formData.value)
})
</script>
<template>
  <button @click="increment">Count is: {{ count }}</button>
  <div>{{ formData }}</div>
  <div>{{ nested.nestedRef }}</div>
  <button @click="incrementReactiveState">Increment Reactive State</button>
  <div>reactive state: {{ reactiveState.state }}</div>
</template>
