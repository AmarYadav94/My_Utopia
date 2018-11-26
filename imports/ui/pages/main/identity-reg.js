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
        var dob = $('#dob').val()
        var city = $('#city').val()
        var contact = $('#contact').val()
        var email = $('#email').val()
        console.log(name)
        Meteor.call('user.insert', name,dob,city,contact,email)

    },


});