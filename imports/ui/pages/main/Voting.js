import "./Voting.html"
import "../../stylesheets/Voting.css";
import { Template } from 'meteor/templating';
import ScatterJS from "scatterjs-core";
import Eos from "eosjs";

const network = {
    protocol: "https", // Defaults to https
    blockchain: "eos",
    host: "jungle2.cryptolions.io",
    port: 443,
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
  };
const eosOptions = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
  };
  var titledata="title23";   
Template.Vote.onCreated(async function () {
     
    console.log("------instance",Template.Vote.helpers);
   ScatterJS.scatter.connect('utopia').then((connected) => {
    if (connected) {
        if (ScatterJS.scatter.connect('utopia')) {
            scatter = ScatterJS.scatter;
            const requiredFields = { accounts: [network] };
            const eos = scatter.eos(network, Eos, eosOptions);
             eos.getTableRows({
                code: "voteproposal",
                scope: "voteproposal",
                table: 'proposal11',
                limit: 50,
                json: true,
            }).then((tabledata=>{
                document.getElementById("upper").innerHTML = "";
                document.getElementById("proposal-group").innerHTML = "";
                console.log("table data ", tabledata);  
                var Id = FlowRouter.current().params.id; 
                var row=tabledata.rows[Id]; 
                for(var i = 0; i< row.proposal_options.length;i++){
                    var can=row.proposal_options[i];
                    titledata=row.proposal_description;
                    document.getElementById("proposal-group").innerHTML += 
                    "<div class = 'redovote hover'><div class= 'candidatevote'>"+can+"</div><div class='rank'><input class='input'/></div></div>";
                }
                document.getElementById("proposal-group").innerHTML += 
                "<button class='submit hover'>"+"submit"+"</button>"

                document.getElementById("upper").innerHTML += 
                "<h1>"+titledata+"</h1>"
            }));
          
        }
    } else {
        console.log("scatter not installed")
    }
});
Template.Vote.helpers({
data:titledata,
});

});