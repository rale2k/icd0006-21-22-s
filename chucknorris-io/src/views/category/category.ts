import { Params, IHttpClient } from "aurelia"
import { AppState } from "../../AppState";
import { isStrings } from '../../utils/typeguards';

export class Category {
    public category : string = "undefined"
    public jokes : string[] = []

    constructor(@IHttpClient private http: IHttpClient,
                 public appState : AppState) {  
    }

    canLoad(params: Params) {
        if (params["category"] == undefined)
            return ''

        if (!this.appState.jokes.has(params["category"]))
            return ''

        return true
    }

    load(params: Params) {
        if (params["category"] == undefined)
            return

        this.category = params['category'];
        this.loadJokes(5)
    }

    unload() {
        let jokes = this.appState.jokes.get(this.category)

        if (jokes != undefined && isStrings(jokes))
            this.appState.jokes.set(this.category, jokes.concat(this.jokes))

        this.jokes = []
    }

    async loadJokes(count : number) {
        for (let i = 0; i < count; i++) {
            let res = await 
                this.http.get('https://api.chucknorris.io/jokes/random?category=' + this.category)
            let result = await res.json()

            this.jokes.push(result.value)
        }
    }
}
