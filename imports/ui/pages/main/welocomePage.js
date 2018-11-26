import "./welcomePage.html";
import "../../stylesheets/utopiaIdentity.css";
import "../../pages/main/header.js";

Template.welcomePage.events({
  "click .optionBox1": function() {
    FlowRouter.go('/identity-reg');
  }
});
