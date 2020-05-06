import { Injectable } from "@angular/core";

import { Idea } from "../shared/idea.model";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  idea: AngularFirestoreCollection<Idea>;
  ideaDoc: AngularFirestoreDocument<Idea>;

  constructor(public db: AngularFirestore) {}

  // Need to specify the collection name and what data you want to push to the database
  // In our case, it’s newIdeas
  async createNewIdea(data) {
    try {
      return this.db
        .collection("newIdeas")
        .add(data);
    }
    catch (err) {
      return console.error(err);
    }
    
  }

  // Display ideas data from firestore db newIdeas collection
  // to use it, call it from home.c.ts
  getIdeas() {
    return this.db
      .collection("newIdeas", (ref) => ref.orderBy("votes", "desc"))
      .snapshotChanges();
  }

  // This function will connect and call your Firestore db based on selected collection and document id
  // we can find the document id based on the parameters passed in from the component function call
  // .set() will set the specific record with whatever data you passed in
  // .set() takes in two parameters — your data and a settings object
  // If you use merge: true, then it means that you only update the value-key pair passed in
  // rather than replacing the entire document with what you passed in.

  updateIdea(data) {
    return this.db
      .collection("newIdeas")
      .doc(data.payload.doc.id)
      .set({ votes: data }, { merge: true });
  }

  updateVote(id, plusOne) {
    return this.db
      .collection("newIdeas")
      .doc(`${id}`) // ${config.collection_endpoint} // need to target idea from vote
      .set({ votes: plusOne }, { merge: true });
  }

  // you need to know both the collection name and the document id to correctly identify which record you want to delete
  deleteIdea(data) {
    return this.db.collection("newIdeas").doc(data.payload.doc.id).delete();
  }
}
