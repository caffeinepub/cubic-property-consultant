import Nat "mo:core/Nat";
import Time "mo:core/Time";
import List "mo:core/List";

actor {
  type Submission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  var nextId = 0;
  let submissions = List.empty<(Nat, Submission)>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    let submission : Submission = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    submissions.add((nextId, submission));
    nextId += 1;
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.map<(Nat, Submission), Submission>(func((_, sub)) { sub }).toArray();
  };
};
