import "./welcomePage.html";
import "../../stylesheets/utopiaIdentity.css";
import "../../pages/main/header.js";
import "../../pages/main/footer.js"
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Eos from "eosjs";
ScatterJS.plugins(new ScatterEOS());
const network = {
    protocol: "http", // Defaults to https
    blockchain: "eos",
    host: "jungle2.cryptolions.io",
    port: 443,
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
  };
const eosOptions = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473"
  };
  
var scatter = {};  

Template.welcomePage.onCreated(function bodyOnCreated() {
        ScatterJS.scatter.connect('utopia').then((connected) => {
            if (connected) {
                if (ScatterJS.scatter.connect('utopia')) {
                    scatter = ScatterJS.scatter;
                    const requiredFields = { accounts: [network] };
                    const eos = scatter.eos(network, Eos, eosOptions);
                    if (scatter.identity) {
                        const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                        const account = acc.name;
                        localStorage.setItem("loginstatus",JSON.stringify(true));
                        console.log("inside created----1",localStorage.getItem("loginstatus"));   ;

                    } else {
                        localStorage.setItem("loginstatus",JSON.stringify(false));
                        console.log("inside created----2",localStorage.getItem("loginstatus"));   ;
                    }
                }
            } else {
                console.log("scatter not installed")
            }
        })
   
  });
 
Template.welcomePage.events({
    "click .optionBox1": function() {
        FlowRouter.go("/identity-reg");
      },
    'click .scatterloginlogout': function( event, instance ){
    if (!JSON.parse(localStorage.getItem("loginstatus"))) {
        ScatterJS.scatter.connect('utopia').then(connected => {
            if (!connected) return false;
            scatter = ScatterJS.scatter;
            const requiredFields = { accounts: [network] };
            const eos = scatter.eos(network, Eos, eosOptions);
            console.log("1-------------------")
            scatter.getIdentity(requiredFields).then(() => {
                const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                const account = acc.name;
                console.log("acccount---",account)
                localStorage.setItem("loginstatus",JSON.stringify(true));
                console.log("----",localStorage.getItem("loginstatus"));
                console.log("inlogin");
            }).catch(error => {
                console.error(error);
            });
        });
    } else {
        console.log("2-----------------")
            scatter.forgetIdentity().then(() => {
            localStorage.setItem("loginstatus",JSON.stringify(false));
            console.log("----",localStorage.getItem("loginstatus"));
            console.log("logout");
        });
    }
    },
})

