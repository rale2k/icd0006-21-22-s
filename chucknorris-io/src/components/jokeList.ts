import { bindable } from 'aurelia';

export class Jokelist {
    
    @bindable 
    public jokes : string[] = [];
}