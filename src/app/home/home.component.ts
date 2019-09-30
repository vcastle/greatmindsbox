import { Component, OnInit } from '@angular/core';
import { Idea } from '../models/idea';
import { NewSuggestion } from '../models/newsuggestion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// make this.ideas = the posts in suggestionsService
// this.ideas = suggestions.ideas


// add a filtering/sorting service and inject into the component to filter by number of votes

// this could be moved into a service
// calls to the db should be made in service
ideas = [
    {
      id: 1,
      title: 'Pizza everyday',
      votes: 40
     },
     {
       title: 'Half day Fridays',
       votes: 10
     },
     {
       title: 'Walk at the park on Wednesdays',
       votes: 8
     }
 ];

string = JSON.stringify(this.ideas);


  // model = new Idea (1, 'Half days on Fridays', 15);


// adds 1 vote to a specific idea
upVote = (idea: any) => {
  idea.votes += 1;
}


ngOnInit() {}


}
