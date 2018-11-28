import "./result.html";
import "../../stylesheets/result.css";
import "./footer.js";
import Eos from "eosjs";

var result = [];

eosConfig = {
    chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
    keyProvider: ['5Jur4pK1Rb8xvdfNUUZJq5JE36HQUd9PNouWwjUdbWw7cK8ZuUo'],
    // WIF string or array of keys..
    httpEndpoint: 'https://jungle2.cryptolions.io:443',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
}
const eos = Eos(eosConfig);

Template.App_result.onRendered(async function(){
    let resultdata = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: "votes13",
        limit: "50",
        json: true
    });

    var length = resultdata.rows[0].choices.length;

    for(var i=0; i<length;i++){
        result[i] = [];
    }

    for(var i=0; i<length;i++){
        for(var j=0; j<length;j++){
            result[i][j] = 0;
        }
    }

    for(var i=0;i<resultdata.rows.length;i++){
        var choices = resultdata.rows[i].choices
        console.log("choices: ", choices);
        for(var j=0;j<choices.length;j++){
            var value = choices[j];
            result[j][value-1]+=1;
        }
    }

    console.log("result array after calculating : ", result);
    for(var i=0; i<result.length;i++){
        console.log(" total votes for 1st position ", result[i][0]);
        var total = result[i][0];
        var length = 30*total;
        var width = length+"px";
        console.log("width ",width);
        document.getElementsByClassName("candidate")[i].style.width = width;

    }
});