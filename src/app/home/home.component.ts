import { Component, OnInit } from "@angular/core";

import { ItemService } from "../services/item.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  newIdeas = [];
  public votes: any = this.itemService.form.value.votes;

  constructor(private db: AngularFirestore, private itemService: ItemService) {}
  ideaCollectionRef = this.db.collection("newIdeas");

  ngOnInit() {
    this.getIdeas();
  }

  // TODO: add a filtering/sorting service and inject into the component to filter by number of votes

  // adding votes to an idea
  upVote = (id: string) => {
    // grab the id and subscribe to data to get the # of votes
    this.ideaCollectionRef
      .doc(id)
      .get()
      .subscribe((data) => {
        this.votes = data.data().votes;
        console.log("initial vote #: ", this.votes);

        // add one count to votes
        let plusOne = this.votes;
        plusOne++;

        console.log(
          "%c add +1 vote: ",
          "color: green; font-weight: bold;",
          plusOne
        );

        // update vote count in fb db
        this.updateVote(id, plusOne);
      });
  };

  // update vote in document
  updateVote = (id, plusOne) => this.itemService.updateVote(id, plusOne);

  // get ideas collection from firestore db
  getIdeas = () =>
    this.itemService.getIdeas().subscribe((res) => (this.newIdeas = res));

  // We’re going to pass in the instance of the idea data in the loop when the ‘delete_forever’ icon gets clicked
  deleteIdea = (data) => this.itemService.deleteIdea(data);
}
