import "./proposal.html"
import "../../stylesheets/proposal.css";

Template.App_proposal.events({
    "click .new-proposal-button": function(){
        console.log("create a new proposal");
    },
    "click .all-proposal-button": function(){
        console.log("view all proposals");
    }
})