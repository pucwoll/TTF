<template>
  <div>
    <h1 class="text-2xl font-light text-center pb-2">From home to paradise</h1>
    <div class="rounded border mb-2">
      <NuxtImg class="rounded-t w-full" :src="hotelData.img" v-if="hotelData.img" />
      <h2 class="m-2">{{ hotelData.name }}</h2>
      <p class="m-2">{{DateTime.fromISO(query.from).isValid === true ? DateTime.fromISO(query.from).toLocaleString() : '2023/11/13'}} - {{ DateTime.fromISO(query.from).isValid === true ? DateTime.fromISO(query.to).toLocaleString() : '2023/11/20' }}</p>
    </div>
    <arrival :hotel-data="hotelData" />
  </div>
</template>


<script setup lang="ts">
import { DateTime } from "luxon";

const hotelData = useHotel()
const items = [
  {
    key: 'arrival',
    label: 'Arrival',
  },
  {
    key: 'departure',
    label: 'Departure',
    disabled: true
  }
]
const router = useRouter()
const date = useDate()

const {query} = useRoute()
if (!query.from || !query.to || !query.hid) {
  router.replace({
    name: 'index',
    query: {
      hid: 1,
      from: '2023-11-13',
      to: '2023-11-20'
    }
  })
}

const { data } = await useFetch('/api/hotels', {
  query: {
    q: query.hid ?? 1
  }
})

if(data.value) {
  hotelData.value = data.value
}
date.value.from = query.from ?? '2023-11-13'
date.value.to = query.to ?? '2023-11-20'

</script>
