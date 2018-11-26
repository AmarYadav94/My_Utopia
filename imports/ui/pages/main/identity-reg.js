import "./identity-reg.html";
import "../../stylesheets/identity-reg.css";
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../../../api/identity/methods';


Template.identity_reg.onCreated(function () {

    Meteor.subscribe('identity');
});

// Setup event handling.
Template.identity_reg.events({


    'click #reg-id': function (event) {
        event.preventDefault()
        var name = $('#name').val()
        var age = $('#age').val()
        var gender = $('#gender').val()
        var origin = $('#origin').val()
        console.log(name)
    },


});