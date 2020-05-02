import { Component, OnInit } from "@angular/core";
import { ItemService } from "../services/item.service";
import { AngularFirestore } from "@angular/fire/firestore";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { firestore } from "firebase";

@Component({
  selector: "app-suggestion-form",
  templateUrl: "./suggestion-form.component.html",
  styleUrls: ["./suggestion-form.component.css"],
})
export class SuggestionFormComponent implements OnInit {
  id: number;
  newIdeas = []; // ideas array
  votes: number;
  showSubmit = false;
  successMsg = false;

  // create an object of the class inside the constructor
  constructor(public db: AngularFirestore, public itemService: ItemService) {}

  ngOnInit() {
    // validation
    this.itemService.form = new FormGroup({
      newIdea: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      votes: new FormControl(),
    });
  }

  // adds idea
  addIdea = (idea) => {
    this.newIdeas.push(idea); // adds new idea to array
  };

  // remove idea
  removeIdea = (idea) => {
    // returns the index within the calling this.coffeeOrder object of the first occurrence
    // of the specified value, starting the search at -1 if the value is not found.
    // declaring the index
    const index = this.newIdeas.indexOf(idea);
    // changes the content of an array, adding new elements while removing old elements.
    if (index > -1) {
      this.newIdeas.splice(index, 1);
    }
  };

  // add a great idea
  onSubmit() {
    // assign data
    const data = {
      created: firestore.Timestamp.now().toDate(),
      id: this.db.createId(),
      newIdea: this.itemService.form.controls["newIdea"].value,
      votes: 0,
    };

    // create idea
    this.itemService.createNewIdea(data);

    // resets form
    this.itemService.form.reset();

    console.log("New idea has been submitted!");

    // reset form to pristine conditions
    this.itemService.form.reset();
  }
}
