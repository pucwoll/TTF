<template class="relative">
  <div>
    <div>
      <h1 class="text-2xl font-light text-center pb-2">From home to paradise</h1>
      <div class="rounded border mb-2">
        <NuxtImg class="rounded-t w-full" :src="hotelData.img" v-if="hotelData?.img"/>
        <h2 class="m-2">{{ hotelData?.name }}</h2>
        <p class="m-2">
          {{
            DateTime.fromISO(date?.from)?.isValid === true ? DateTime.fromISO(date?.from).toLocaleString() : '2023/11/13'
          }}
          - {{
            DateTime.fromISO(date?.from)?.isValid === true ? DateTime.fromISO(date?.to).toLocaleString() : '2023/11/20'
          }}</p>
      </div>
      <h1 class="text-4xl font-bold text-center">Routes</h1>
      <div
        class="p-2 rounded-full text-[13px] md:text-[20px] w-full font-medium relative flex flex-col items-center justify-center -my-1">
      <span class="text-center">{{
          trainData[0]?.legs[0]?.origin?.name
        }}<i> - </i>{{ trainData[0]?.legs.at(-1)?.destination?.name }}</span>
        <UDivider class="mt-1 mb-3"/>
      </div>
      <UAccordion :items="trainData" multiple :ui="{ wrapper: 'flex flex-col w-full' }">
        <template #default="{ item, index, open }" class="flex justify-between">
          <UButton color="gray" variant="ghost"
                   class="border-b text-[12px] relative border-gray-200 flex justify-between dark:border-gray-700"
                   :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
            <template #leading>
              <div class="flex flex-col gap-1 w-full">
                <div class="flex justify-between w-full">
                  <div class="flex items-center justify-center">
                    <UBadge v-if="item?.price?.amount" color="primary" variant="outline">{{
                        item.price.amount
                      }}€
                    </UBadge>
                    <span v-else class="w-12"></span>
                  </div>
                  <div class="flex justify-center items-center">
                    <div
                      class="w-fit p-2 rounded-full dark:bg-primary-400 flex flex-col items-center justify-center -my-1">
                      <span>Departure:</span>
                      <div class="flex items-center">
                        <span class="font-bold text-start">{{ getTime(item?.legs[0]?.departure) }}</span>
                      </div>
                    </div>
                    <UIcon name="i-heroicons-arrow-long-right-solid" class="w-8 h-4 my-auto"/>
                    <div
                      class="w-fit p-2 rounded-full dark:bg-primary-400 flex flex-col items-center justify-center -my-1">
                      <span>Arrival:</span>
                      <div class="flex items-center">
                        <span class="font-bold">{{ getTime(item?.legs.at(-1)?.arrival) }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col items-start justify-center">
                    <div class="flex items-center justify-between">
                      <UIcon name="i-heroicons-arrow-path-rounded-square" class="w-8 h-4 my-auto"/>
                      <span>{{ item?.legs.length }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <UIcon name="i-heroicons-clock" class="w-8 h-4 my-auto"/>
                      <span>{{ getTimeDiff(item?.legs[0]?.departure, item?.legs.at(-1)?.arrival) }}</span>
                    </div>
                  </div>
                </div>
                <UButton @click="selectRoute(item?.id)" size="xs" class="justify-center ml-auto max-w-[260px]">Choose
                  last mile option
                </UButton>
              </div>
            </template>

            <template #trailing>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 transform transition-transform duration-200"
                  :class="[open && 'rotate-90']"
                />
              </div>
            </template>

          </UButton>
        </template>
        <template #item="{ item }">
          <div class="mx-2 flex flex-col min-h-[77px] justify-between" v-for="(leg, index) in item.legs" :key="index">
            <div class="p-1.5 flex text-black justify-between font-medium">
              <div class="w-2/5">{{ getTime(leg.departure) }}
                {{ leg?.departurePlatform ? '(Pl. ' + leg.departurePlatform + ')' : '' }}
              </div>
              <UBadge class="flex-shrink-0" v-if="leg?.line?.name" color="secondaty" variant="outline">{{
                  leg.line.name
                }}
              </UBadge>
              <UBadge class="flex-shrink-0 capitalize" v-else-if="leg?.line?.mode" color="secondaty" variant="outline">
                {{ leg.line?.mode }}
              </UBadge>
              <div class="w-2/5 text-end">{{ leg?.arrivalPlatform ? '(Pl. ' + leg.arrivalPlatform + ')' : '' }}
                {{ getTime(leg.arrival) }}
              </div>
            </div>
            <div class="text-[12px]">
              <div class="flex items-center justify-between relative">
                <span class="text-start w-[calc(50%-3px)]">{{ leg?.origin?.name }}</span>
                <img v-if="leg.mode == 'train'" class="w-6 h-6 mx-auto" src="~/assets/train.svg"/>
                <img v-else-if="leg.mode == 'bus'" class="w-6 h-6 mx-auto" src="~/assets/bus.svg"/>
                <span class="text-end w-[calc(50%-3px)]">{{ leg?.destination?.name }}</span>
              </div>
            </div>
            <UDivider/>
          </div>
        </template>
      </UAccordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import {DateTime} from "luxon";

const hotelData = useHotel()
const date = useDate()

const {query} = useRoute()
const router = useRouter()

if(!hotelData.value || !date.value.from || !date.value.to) {
  console.log(hotelData.value, date.value)
  router.replace({
    name: 'index'
  })
}
if (!query.from || !query.to || !query.when) {
  router.replace({
    name: 'index'
  })
}
const {data: trainData} = await useFetch('/api/journies', {
  query: {
    from: query.from,
    to: query.to,
    when: query.when,
  }
})

const getTime = ((dateISO: string | number) => {
  const date = new Date(dateISO)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
})

const getTimeDiff = (date_from: string, date_to: string) => {
  const from = new Date(date_from)
  const to = new Date(date_to)
  const diff = to.getTime() - from.getTime()
  return getTime(diff)
}

const selectRoute = (id: string) => {
  router.push({
    name: 'trip',
    query: {
      jid: id,
    }
  })
}
</script>
