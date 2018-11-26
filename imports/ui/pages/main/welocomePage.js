import "./welcomePage.html";
import "../../stylesheets/utopiaIdentity.css";
import "../../pages/main/header.js";
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


Template.welcomePage.events({
  "click .optionBox1": function() {
    FlowRouter.go("/identity-reg");
  },
  "click .scatterloginlogout":function(){
    console.log("scatter",scatter);
    if (!JSON.parse(localStorage.getItem("loginstatus"))) {
        ScatterJS.scatter.connect('utopia').then(connected => {
            if (!connected) return false;
            scatter = ScatterJS.scatter;
            const requiredFields = { accounts: [network] };
            const eos = scatter.eos(network, Eos, eosOptions);
            scatter.getIdentity(requiredFields).then(() => {
                const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                const account = acc.name
                console.log("account ",account);
                console.log("inlogin")
                localStorage.setItem("loginstatus",JSON.stringify(true));
                
            }).catch(error => {
                console.error(error);
            });
        });
    } else {
        ScatterJS.scatter.forgetIdentity().then(() => {
            localStorage.setItem("loginstatus",JSON.stringify(false));
            console.log("logout");
        });
    }
  }
});
