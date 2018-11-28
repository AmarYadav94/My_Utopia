import "./Voting.html"
import "../../stylesheets/Voting.css";
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
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
  

Template.Vote.onCreated(async function () {
    
   /*  document.getElementById("all-proposals").style.display = "block"; */
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
                document.getElementById("proposal-group").innerHTML = "";
                console.log("table data ", tabledata);                
                for(var i = 0; i< tabledata.rows.length;i++){
                    var can=tabledata.rows[i].proposal_options;
                    
                    var desc = tabledata.rows[i].proposal_description;
                    document.getElementById("proposal-group").innerHTML += 
                    "<div class = 'redo'><div class= 'candidate'>"+can[0]+"</div><div class='rank'><input class='input'/></div><div class='submit'>"+"submit"+"</div></div>";
                }
            }));
          
        }
    } else {
        console.log("scatter not installed")
    }
});
    
    
});