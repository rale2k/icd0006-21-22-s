import type { IJWTResponse } from '@/domain/IJWTResponse'
import { defineStore } from 'pinia'


export const useIdentityStore = defineStore({
  id: 'identitystore',

  state: () => ({
    data: null as IJWTResponse | null
  })
})
