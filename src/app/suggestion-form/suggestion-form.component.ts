import { Component, OnInit, HostBinding } from "@angular/core";
import { ItemService } from "../services/item.service";
import { AngularFirestore } from "@angular/fire/firestore";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { firestore } from "firebase";

@Component({
  selector: "app-suggestion-form",
  templateUrl: "./suggestion-form.component.html",
  styleUrls: ["./suggestion-form.component.scss"],
})
export class SuggestionFormComponent implements OnInit {
  @HostBinding("class") class = "suggestions";

  id: number;
  newIdeas = []; // ideas array
  votes: number;
  showSubmit = false;

  // use these values to store in Firebase
  form = new FormGroup({
    newIdea: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
    ]),
    votes: new FormControl(),
  });

  // create an object of the class inside the constructor
  constructor(public db: AngularFirestore, public itemService: ItemService) {}

  ngOnInit() {}

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
      newIdea: this.form.controls["newIdea"].value,
      votes: 0,
    };

    // create idea
    this.itemService.createNewIdea(data);

    console.log(
      "%c New idea has been submitted!",
      "color: green; font-weight: bold;"
    );

    // reset form
    this.form.get("newIdea").reset();
  }
}
