<template>
  <div>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSearchRoute">
      <UFormGroup label="Departure" name="departureLocation" description="Select your departure location and let us find you the best way to your accommodation.">
        <USelectMenu placeholder="Search for a station..." :searchable="search" v-model="state.departureLocation" :options="options" />
      </UFormGroup>
      <UFormGroup label="Departure" name="departureTime" description="Select your preferred time of departure.">
        <UInput type="time" v-model="state.departureTime" />
      </UFormGroup>
      <UButton block size="xl" :loading="isLoading" type="submit">Find best route</UButton>
    </UForm>
    <div v-for="train in trainData">
      <h2>{{train}}</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import {email, type Input, minLength, object, objectAsync, string} from "valibot";
import type {FormSubmitEvent} from "#ui/types";
import {DateTime} from "luxon";

const props = defineProps<{
  hotelData: {
    id: string
    name: string
    station: string
    img: string
  }
}>()

const router = useRouter()
const {query} = useRoute()

const options = [
  { label: 'John', value: 'john' },
  { label: 'Jane', value: 'jane' },
  { label: 'Joe', value: 'joe' }
]
const isLoading = ref(false)
const trainData = ref([])

const search = async (q) => {
  const stations = await $fetch('/api/stations', { params: { q: q || undefined } })

  return stations.map(station => ({ id: station.id, label: station.name, value: station.id })).filter(Boolean)
}

const onSearchRoute = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true
  router.push({
    name: 'trains',
    query: {
      from: event.data.departureLocation.id,
      to: props.hotelData.station,
      when: DateTime.fromISO(query.from || '2023-11-13').set({ hour: parseInt(event.data.departureTime.split(':')[0]), minute: parseInt(event.data.departureTime.split(':')[1]) }).toISO(),
    }
  })
}
const state = reactive({
  departureLocation: undefined,
  departureTime: undefined
})
type Schema = Input<typeof schema>

const schema = objectAsync({
  departureLocation: object({
    id: string(),
    label: string(),
    value: string()
  }, 'Must be a valid town'),
  departureTime: string([minLength(5, 'Must be a valid time')])
})
</script>
