import "./identity-reg.html";
import "../../stylesheets/identity-reg.css";
import "../../pages/main/footer.js"
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '../../../api/identity/methods';
import  Eos from "eosjs";

eosConfig = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
    keyProvider: ['5KeNdWYxPbUpsLUa8QT64AbjTAQeHcZejcR6shHnNi1sESgxgm7','5Jg4m51EZNRpekRVfu27ThNQ1kMpBo27i9SYfpZk2fQ8dcch6ip'], // WIF string or array of keys..
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
  }
  eos = Eos(eosConfig)


Template.identity_reg.onCreated(function () {

    Meteor.subscribe('identity');
});

// Setup event handling.
Template.identity_reg.events({


    'click .register': function (event) {
        event.preventDefault()
        var name = $('#name').val();
        var age = parseInt($('#age').val());
        var gender = $('#gender').val();
        var origin = $('#origin').val();
        console.log(name);
        console.log(eos);
        var username= localStorage.getItem("username")
        eos.contract('identityreg1').then(identityreg1 => {
            identityreg1.addidentity(name,name,age,gender,origin,{authorization:username}).then((response)=>{
                //FlowRouter.go("/reg-success");
                alert("identity is registered !!!!");
            });
            alert("identity is not registered !!!!");
          })
    },

});

