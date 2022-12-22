<template>
  <input-text
    :label="label"
    :clearable="false"
    :placeholder="placeholder"
    :modelValue="`${dateRange.from} - ${dateRange.to}`"
    @focus="show = true"
  >
    <template v-slot:prepend>
      <q-icon name="event" />
    </template>

    <q-popup-proxy
      v-if="show"
      v-model="show"
      class="flex justify-center"
      transition-show="scale"
      transition-hide="scale"
      context-menu
    >
      <div style="width: 100px;">
        <div class="q-mt-md">
          <q-btn
            v-for="({ text,onClick }, index) in pickerOptions.shortcuts"
            :key="index"
            style="width: 100px;"
            flat
            :label="text"
            @click="onClick"
          />
        </div>
      </div>
      <q-date ref="datePicker" v-model="dateRange" range @range-end="show = false">
        <div class="row items-center justify-end">
          <q-btn v-close-popup label="Close" color="primary" flat />
        </div>
      </q-date>
    </q-popup-proxy>
  </input-text>
</template>

<script>
import $dayjs from '@/plugins/dayjs'
import { useVModel } from '@vueuse/core'
import { defineComponent, ref } from 'vue-demi'
export default defineComponent({
  props: {
    modelValue: { type: String },
    label: { type: String },
    startDate: { type: [Date, String], default: () => $dayjs().format('YYYY-MM-DD') },
    endDate: { type: [Date, String], default: () => $dayjs().format('YYYY-MM-DD') },
    placeholder: { type: String, default: '請選擇開始日期至結束日期' },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    // data
    const datePicker = ref()
    const show = ref(false)
    const observeValue = useVModel(props, 'modelValue', emit)
    const dateRange = ref({ from: props.startDate, to: props.endDate })
    const pickerOptions = {
      shortcuts: [
        {
          text: '今天',
          onClick () {
            const start = $dayjs().format('YYYY-MM-DD')
            const end = $dayjs().format('YYYY-MM-DD')
            // dateRange.value = { from: start, to: end }
            datePicker.value.setEditingRange(start, end)
            // console.log(datePicker.setCalendarTo(start, end))
          },
        },
        {
          text: '前七天',
          onClick () {
            let start = new Date()
            const end = $dayjs()
            start.setTime(
              start.getTime() - 3600 * 1000 * 24 * 7,
            )
            start = $dayjs(start)
            const startObj = {
              year: start.year(),
              month: start.month() + 1,
              day: start.date(),
            }
            const endObj = {
              year: end.year(),
              month: end.month() + 1,
              day: end.date(),
            }

            // dateRange.value = { from: start.format('YYYY-MM-DD'), to: end.format('YYYY-MM-DD') }
            datePicker.value.setEditingRange({ from: startObj, to: endObj })
            console.log(datePicker.value)
            console.log(dateRange.value)
            // dateRange.value = { from: start.format('YYYY-MM-DD'), to: end.format('YYYY-MM-DD') }
            // show.value = false
          },
        },
        {
          text: '前三十天',
          onClick () {
            const start = new Date()
            const end = $dayjs().format('YYYY-MM-DD')
            start.setTime(
              start.getTime() - 3600 * 1000 * 24 * 30,
            )
            dateRange.value = { from: $dayjs(start).format('YYYY-MM-DD'), to: end }
          },
        },
        {
          text: '前一年',
          onClick () {
            const start = new Date()
            const end = $dayjs().format('YYYY-MM-DD')
            start.setTime(
              start.getTime() - 3600 * 1000 * 24 * 365,
            )
            dateRange.value = { from: $dayjs(start).format('YYYY-MM-DD'), to: end }
          },
        },
      ],
    }

    return {
      datePicker,
      show,
      observeValue,
      dateRange,
      pickerOptions,
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
