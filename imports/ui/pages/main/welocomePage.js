import "./welcomePage.html";
import "../../stylesheets/utopiaIdentity.css";
import "../../pages/main/header.js";
import "../../pages/main/footer.js"
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import Eos from "eosjs";
ScatterJS.plugins(new ScatterEOS());
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



eosConfig = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
    keyProvider: ['5KeNdWYxPbUpsLUa8QT64AbjTAQeHcZejcR6shHnNi1sESgxgm7'],
    // WIF string or array of keys..
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
}
eos = Eos(eosConfig)


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
                        localStorage.setItem("username",account);                       
                        console.log("inside created----1",localStorage.getItem("loginstatus"));   ;

                    } else {
                        localStorage.setItem("loginstatus",JSON.stringify(false));
                        localStorage.setItem("username","");
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
        FlowRouter.go("/identity-reg",{data:"scatter"});
      },
    'click .scatterloginlogout': function( event, instance ){
    if (!JSON.parse(localStorage.getItem("loginstatus"))) {
        ScatterJS.scatter.connect('utopia').then(connected => {
            if (!connected) return false;
            scatter = ScatterJS.scatter;
            const requiredFields = { accounts: [network] };
            const eos = scatter.eos(network, Eos, eosOptions);
            localStorage.setItem("eosinstance",JSON.stringify(eos));
            console.log("1-------------------",eos)
            scatter.getIdentity(requiredFields).then(() => {
                const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                const account = acc.name
                console.log("account ",account);
                console.log("inlogin");
                localStorage.setItem("loginstatus",JSON.stringify(true));
                localStorage.setItem("username",account);
            }).catch(error => {
                console.error(error);
            });
        });
    } else {
        console.log("2-----------------")
        ScatterJS.scatter.forgetIdentity().then(() => {
            localStorage.setItem("loginstatus",JSON.stringify(false));
            console.log("----",localStorage.getItem("loginstatus"));
            localStorage.setItem("username","");
            console.log("logout");
        });
    }
    },
})

Template.welcomePage.events({
      "click .optionBox2":function(){
        var username= localStorage.getItem("username");
        eos.contract('identityreg1').then(identityreg1 => {
          identityreg1.reqcitizen(username,{authorization:username}).then((response)=>{
              if(response){
                  console.log("hello--",response);
              }else{
                  alert("identity is not registered !!!!");;
              }
          });
        
        })
        FlowRouter.go("/citizenship",{eosinstance :scatter});
      }
    })

    /* Template.welcomePage.onRendered(async function(){
        let tabledata =  await eos.getTableRows({
            code: "identityreg1",
            scope: "identityreg1",
            table: 'citizen',
            limit: 50,
            json: true,
        });
        
        console.log("tabledata---------",tabledata.rows);
        var account_name = "amartesttest";
        console.log("account_name ---",account_name);
        for(var i=0;i<tabledata.rows.length;i++)
        {
            var acc = tabledata.rows[i].identity;
           if(acc==account_name)
           {
               status = tabledata.rows[i].approved;
               console.log("status----",status);
               if(status==0){
                document.getElementById("statusButton").disabled = true;
                
               }
           }
        }
}) */


