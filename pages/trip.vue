<template>
  <div>
    <h1 class="text-2xl font-light text-center pb-2">From home to paradise</h1>
    <div class="rounded border mb-2">
      <NuxtImg class="rounded-t w-full" :src="hotelData.img" v-if="hotelData?.img" />
      <h2 class="m-2">{{ hotelData?.name }}</h2>
      <p class="m-2">{{DateTime.fromISO(date.from).isValid === true ? DateTime.fromISO(date.from).toLocaleString() : '2023/11/13'}} - {{ DateTime.fromISO(date.from).isValid === true ? DateTime.fromISO(date.to).toLocaleString() : '2023/11/20' }}</p>
    </div>
   <div v-for="(item, index) in items" :key="index">
    <template v-if="item?.data || (item?.data && item.data?.length > 0)" >
      <div class="flex my-1 p-1 gap-2 mt-4 items-center justify-between border-b-2 border-gray-300">
        <DIV class="flex gap-3">
          <div class="bg-primary rounded-full flex w-fit items-center justify-center p-1">
            <UIcon :name="item.icon" class="w-5 h-5" />
          </div>
          <h4>{{ item.label }}</h4>
        </DIV>
        <!-- <UIcon
          name="i-heroicons-chevron-right-20-solid"
          class="w-5 h-5 transform transition-transform duration-200"
          :class="item?.key == 'hotelTransfer'? 'rotate-90': ''"
        /> -->
      </div>
      <div v-if="item?.key == 'taxi'" class="p-2 my-1 border-b bordre-gray-200" v-for="(i, index) in item?.data" :key="index">
        <div class="flex gap-4">
          <div class="flex">
            <UIcon name="i-heroicons-clock" class="w-8 h-4 my-auto"/>
            <span>{{ i?.time.split(':')[1]+' min.' }}</span>
          </div>
          <div class="flex">
            <UIcon name="i-heroicons-user-group" class="w-8 h-4 my-auto"/>
            <span>{{ i?.max_people }}</span>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="font-bold text-start">{{ i?.taxi_company?.name }}</div>
          <UButton variant="outline" class="px-8" color="primary" size="lg">{{ i?.price }}€</UButton>
        </div>
      </div>

      <div v-if="item?.key =='boats'" class="p-2 my-1 border-b bordre-gray-200 flex justify-between items-center" v-for="(i, gg) in item?.data?.departures.slice(1)" :key="gg">
      <span class="font-bold text-start">{{ i }}</span>
      <UButton variant="outline" class="px-4" color="primary" size="lg">{{ item?.data?.price }}€</UButton>
      </div>

      <div v-if="item?.key =='bus'" class="p-2 my-1 border-b bordre-gray-200 flex justify-between items-center" v-for="(i, tt) in [...item?.data].slice(item?.data?.length - 4)" :key="tt">
      <span class="font-bold text-start">{{ i?.hour + ':' + i?.minute }}</span>
      <UButton variant="outline" class="px-4" color="primary" size="lg">{{ i?.price }}€</UButton>
      </div>

      <div v-if="item?.key == 'hotelTransfer'" class="p-2 my-1 border-b bordre-gray-200" >
        <div class="flex gap-4">
          <div class="flex">
            <UIcon name="i-heroicons-clock" class="w-8 h-4 my-auto"/>
            <span>{{ '34 min.' }}</span>
          </div>
          <div class="flex">
            <UIcon name="i-heroicons-user-group" class="w-8 h-4 my-auto"/>
            <span>{{ 1 }}</span>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="font-bold text-start">{{ 'Hotel '+item.data?.hotel_id }}</div>
          <UButton variant="outline" class="px-8" color="primary" size="lg">{{ item.data?.price }}€</UButton>
        </div>
      </div>
    </template>
   </div>
   <div class="mb-10"></div>
  </div>
</template>

<script setup lang="ts">
import {DateTime} from "luxon";

const {query} = useRoute()
const hotelData = useHotel()
const date = useDate()

const { data }:any = await useFetch('/api/transports', {
  query: {
    jId: query.jid,
    hotel_id: hotelData.value?.id,
  }
})


const items = computed(() => {
  return [
    {
      key: 'bus',
      label: 'Bus',
      icon: 'i-ph-bus',
      data: data.value?.bus
    },
    {
      key: 'boats',
      label: 'Boats',
      icon: 'i-ph-boat',
      data: data.value?.boats
    },
    {
      key: 'hotelTransfer',
      label: 'Hotel transfer',
      icon: 'i-ph-van',
      data: data.value?.hotelTransfer
    },
    {
      key: 'taxi',
      label: 'Taxi',
      icon: 'i-ph-taxi',
      data: data.value?.taxi
    }
  ]
})
</script>
