import { Component, OnInit } from '@angular/core';

import { Idea } from '../shared/idea.model';
import { config } from '../shared/idea.config';

import { ItemService } from '../services/item.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  newIdeas = [];
  public votes: any = this.itemService.form.value.votes;

  constructor(public db: AngularFirestore, public itemService: ItemService) { }


  ngOnInit() {
    this.getIdeas();
  }



  // TODO: add a filtering/sorting service and inject into the component to filter by number of votes


  // adding votes to an idea
  upVote = (id: number) => {

    // use this to access the votes for specific id passed in this fx in firestore!!! //
    // this.newIdeas[id].payload.doc.data().votes

    console.log('id: ', id);
    console.log('obj of id being passed: ', this.newIdeas[id].payload.doc.data());
    console.log('initial vote #: ', this.newIdeas[id].payload.doc.data().votes);

    console.log('the idea: ', this.newIdeas[id].payload.doc.data().newIdea);

    const idea = this.newIdeas[id].payload.doc.data().newIdea;
    // add one count to votes
    console.log('%c votes in firestore: ', 'color: orange; font-weight: bold;', this.newIdeas[id].payload.doc.data().votes);
    let plusOne = this.newIdeas[id].payload.doc.data().votes;
    plusOne++;

    // update vote count in fb db
    this.updateVote(id, idea, plusOne);

    console.log('%c add +1 vote: ', 'color: green; font-weight: bold;', plusOne);
    // return plusOne;
  }


  // update vote in document
  updateVote = (id, idea, data) => this.itemService.updateVote(id, idea, data);

  // get ideas collection from firestore db
  getIdeas = () =>
    this.itemService
      .getIdeas()
      .subscribe(res => (this.newIdeas = res))

  // We’re going to pass in the instance of the idea data in the loop when the ‘delete_forever’ icon gets clicked
  deleteIdea = data => this.itemService.deleteIdea(data);
}
