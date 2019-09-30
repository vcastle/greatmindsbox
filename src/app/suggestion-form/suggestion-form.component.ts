import { Component, OnInit } from '@angular/core';
import { NewSuggestion } from '../models/newsuggestion';
import { format } from 'path';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
votes = 0;
id = 0;
successMsg = false;

  constructor() { }

  model = new NewSuggestion('Pizza on Retro days');
  ideas = [];

  // fx that adds idea
  addIdea() {
    // push idea into ideas array
    this.ideas.push({
      title: this.model.title,
      votes: 0
    });
    console.log('pushed');
  }

// add an great idea fx
  onSubmit(form: any) {

    // push idea object model to array
    this.addIdea();
    console.log('new ideas array:', this.ideas);

    this.successMsg = true;

     // this new array equals array being shown on home
     // ex: suggestions.posts = this.posts;

     // clear input field after submit
    this.model.title = '';

    // reset form to pristine conditions
    form.resetForm();

}



    // TODO: Remove this when we're done
    // get diagnostic() { return JSON.stringify(this.model); }

ngOnInit() {}

}
