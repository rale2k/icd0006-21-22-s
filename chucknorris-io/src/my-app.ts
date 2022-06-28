import { route } from "aurelia";
import { AppState } from "./AppState";

@route({
  routes: [
    {
      id: 'jokes',
      path: ['', '/jokes'],
      component: import('./views/jokes/jokes'),
      title: 'Jokes',
    },
    {
      id: 'category',
      path: '/category/:category',
      component: import('./views/category/category'),
      title: 'View category',
    }
  ]
})

export class MyApp {
  constructor(private appState : AppState) {
  }
}
