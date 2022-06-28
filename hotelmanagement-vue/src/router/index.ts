import { createRouter, createWebHistory } from 'vue-router'

import HotelCreate from '@/views/dashboard/HotelCreate.vue'
import Home from '@/views/Home.vue'
import HotelEdit from '@/views/dashboard/HotelEdit.vue'
import HotelStructure from '@/views/dashboard/HotelStructure.vue'
import RoomEdit from '@/views/dashboard/RoomEdit.vue'
import Tickets from '@/views/dashboard/Tickets.vue'
import TicketEdit from '@/views/dashboard/TicketEdit.vue'
import Reservations from '@/views/dashboard/Reservations.vue'
import Register from '@/components/identity/Register.vue'
import Login from '@/components/identity/Login.vue'
import LandingMessageVue from '@/components/dashboard/LandingMessage.vue'
import ReservationEdit from '@/views/dashboard/ReservationEdit.vue'
import StayEdit from '@/views/dashboard/StayEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home,
      children: [
        { path: '/register', name: 'register', component: Register },
        { path: '/login', name: 'login', component: Login },   
      ]
    },
    {
      path: '/dashboard', name: 'dashboard', component: () => import('@/views/Dashboard.vue'),
      children: [
        { path: '', name: 'landing', component: LandingMessageVue },
        { path: 'hotelcreate', name: 'hotelcreate', component: HotelCreate },
        { path: ':hotelId', name: 'hotelstructure', component: HotelStructure, props: true},
        { path: ':hotelId/details', name: 'hoteledit', component: HotelEdit, props: true },
        { path: ':hotelId/room/:roomId', name: 'roomedit', component: RoomEdit, props: true },
        { path: ':hotelId/tickets', name: 'hoteltickets', component: Tickets, props: true },
        { path: ':hotelId/createticket', name: 'ticketcreate', component: RoomEdit, props: true },
        { path: ':hotelId/ticket/:ticketId', name: 'ticketedit', component: TicketEdit, props: true },
        { path: ':hotelId/reservations', name: 'hotelreservations', component: Reservations, props: true },
        { path: ':hotelId/reservation/:reservationId', name: 'reservationedit', component: ReservationEdit, props: true },
        { path: ':hotelId/stay/:stayId', name: 'stayedit', component: StayEdit, props: true },
      ]
    },
    { path: '/reserve/:hotelId', name: 'hotelreserve', component: () => import('@/views/Reserve.vue'), props: true }
  ]
})

export default router
