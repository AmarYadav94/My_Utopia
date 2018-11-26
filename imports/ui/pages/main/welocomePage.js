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
  host: "192.93.219.219",
  port: 8888,
  chainId: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca"
};

const eosOptions = {
  chainId: "038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca"
};

var scatter = {};


Template.welcomePage.events({
  "click .optionBox1": function() {
    FlowRouter.go("/identity-reg");
  },
  "click .scatterloginlogout":function(){
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
        scatter.forgetIdentity().then(() => {

            localStorage.setItem("loginstatus",JSON.stringify(false));
            console.log("logout");
        });
    }
  }
});
