import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})

export class SuggestionFormComponent implements OnInit {
newIdeas = []; // ideas array
votes: number;
showSubmit = false;
successMsg = false;

  // create an object of the class inside the constructor
constructor(public itemService: ItemService) { }

  // adds idea
addIdea = idea => {
    this.newIdeas.push(idea); // adds new idea to array

  }

  // remove idea
removeIdea = idea => {
    // returns the index within the calling this.coffeeOrder object of the first occurrence
    // of the specified value, starting the search at -1 if the value is not found.
    // declaring the index
    const index = this.newIdeas.indexOf(idea);
    // changes the content of an array, adding new elements while removing old elements.
    if (index > -1) { this.newIdeas.splice(index, 1); }
  }



  // add an great idea
onSubmit() {
    // map newIdeas array to the form value idea
    // this.itemService.form.value.newIdea = this.newIdeas;

    // set new idea votes to 0
    this.itemService.form.controls.votes.setValue(0);

    // assign data to form value
    const data = this.itemService.form.value;

    // create idea
    this.itemService.createNewIdea(data);


    // resets form
    this.itemService.form.reset();

    console.log('New idea has been submitted!');

    // reset form to pristine conditions
    this.itemService.form.reset();

}


ngOnInit() {
      // validation
      this.itemService.form = new FormGroup({
        newIdea: new FormControl('', [Validators.required, Validators.minLength(2)]),
        votes: new FormControl()
      });
}

}
