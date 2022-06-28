import { IHttpClient } from "aurelia";

export class AppState {
    public categories : string[] = [];
    public jokes : Map<string, string[]> = new Map<string, string[]>()

    constructor(@IHttpClient private http : IHttpClient) {
        this.loadCategories(3)
            .then(result => { 
                result.forEach(element => {
                    this.jokes.set(element, [])
                this.categories = result
            }); }
        );
    }

    async loadCategories(count : number) {
        let res = await this.http.get('https://api.chucknorris.io/jokes/categories')
        let result = await res.json()

        let categories : string[] = []

        for (let i = 0; i < count; i++) {
            let rand = Math.floor((Math.random()*result.length))
            categories.push(result[rand])
            result.splice(rand, 1)
        }

        return categories
    }
}
