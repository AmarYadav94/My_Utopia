import "./welcomePage.html";
import "../../stylesheets/utopiaIdentity.css";
import "../../pages/main/header.js";
import "../../pages/main/footer.js"
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Eos from "eosjs";
ScatterJS.plugins(new ScatterEOS());


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
                localStorage.setItem("username",account);
                
            }).catch(error => {
                console.error(error);
            });
        });
    } else {
        ScatterJS.scatter.forgetIdentity().then(() => {
            localStorage.setItem("loginstatus",JSON.stringify(false));
            localStorage.removeItem("username");
            console.log("logout");
        });
    }
  }
});
