import "./Registered.html"
import "../../stylesheets/Registered.css";
import Eos from "eosjs";
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
eos = Eos(eosConfig);

Template.Reg_success.events({
      "click .button":function(){
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


    Template.Reg_success.onRendered(async function(){
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
                document.getElementById("statusButton").disabled=true;
                
               }
           }
        }
})
