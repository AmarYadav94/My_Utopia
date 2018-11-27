import "./identity-reg.html";
import "../../stylesheets/identity-reg.css";
import "../../pages/main/footer.js"
import "../main/header.js"
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../../../api/identity/methods';
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Eos from "eosjs";
ScatterJS.plugins(new ScatterEOS());

Template.identity_reg.onCreated(function () {

    Meteor.subscribe('identity');
});

// Setup event handling.
Template.identity_reg.events({

    'click .register': function (event) {
        event.preventDefault()
        var firstname = $('#firstname').val();
        var midname = $('#midname').val();
        var lastname = $('#lastname').val();
        var dob = $('#dob').val();
        var phonenumber = $('#phonenumber').val();
        var email = $('#email').val();
        var username = localStorage.getItem("username")
        eos.contract('identityreg1').then(identityreg1 => {
            identityreg1.addidentity(username, firstname, midname, lastname, dob, phonenumber, email, { authorization: username }
                , (err, res) => {
                    if (err) {
                        console.log("error ", err);
                    }
                    else {
                        console.log("Result ", res);
                    }
                });
        }
        )
    },
});

