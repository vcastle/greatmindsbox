import { NewSuggestion } from '../models/newsuggestion';


export class Idea {
    id: number;
    // title: NewSuggestion['title'];
    title: string;
    votes: number;

    constructor(id: number, title: string, votes: number) {
        this.id = id;
        // tslint:disable-next-line: no-string-literal
        this.title = NewSuggestion['title'];
        this.votes = votes;
    }

}
