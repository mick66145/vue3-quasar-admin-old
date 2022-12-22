import { defineStore } from 'pinia'

export const useDataTableStore = defineStore({
  id: 'dataTable',
  state: () => ({
    search: {
      page: 1,
      page_size: 10,
    },
    data: [],
    total: 0,
  }),
  actions: {
  },
})
