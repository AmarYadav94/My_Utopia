import "./result.html";
import "../../stylesheets/result.css";
import "./footer.js";
import Eos from "eosjs";



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

Template.App_result.onRendered(async function () {
    var result = [];
    var length = 0;
    var id = FlowRouter.current().params.id;
    let resultdata = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: "votes13",
        limit: "50",
        json: true,
        /* key_type: "i64",
        index_position: 2 */
    });

    let candidatedata = await eos.getTableRows({
        code: "voteproposal",
        scope: "voteproposal",
        table: "proposal11",
        limit: "50",
        json: true,
    });

    console.log("candidate list ",candidatedata.rows[id].proposal_options);

    //getting the length of list of all choices for a  particular proposal
    var length = 0;
    for(var i=0; i<resultdata.rows.length;i++){
        if(id == resultdata.rows[i].proposal_id){
            length = resultdata.rows[i].choices.length;
            break;
        }
    }

    //creating a 2d array to store who got how many votes based on rank 
    for (var i = 0; i < length; i++) {
        result[i] = [];
    }

    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
            result[i][j] = 0;
        }
    }

    var input = [];

    for(var i=0;i<resultdata.rows.length;i++){
        if(id == resultdata.rows[i].proposal_id){
            input.push(resultdata.rows[i].choices)
        }
    }


   /*  for (var i = 0; i < resultdata.rows.length; i++) {
        console.log("id: ", id);
        if (resultdata.rows[i].proposal_id == id) {
            var choices = resultdata.rows[i].choices
            for (var j = 0; j < choices.length; j++) {
                var value = choices[j];
                result[j][value - 1] += 1;
            }
        }

    } */
    // calculaing votes based on ranks
    for(var i=0;i<input.length;i++){
        for(j=0;j<input[i].length;j++){
            var val = input[i][j];
            result[j][val-1] += 1;
        }
    }

    console.log("result after calculating ", result);
    var candidatelist = candidatedata.rows[id].proposal_options;

    /* console.log("result of this proposal ", result); */

    /* for (var i = 0; i < result.length; i++) {
        var total = result[i][0];
        total = total + "votes";
        document.getElementsByClassName("candidate")[i].innerHTML = total;
        document.getElementsByTagName("label")[i].innerHTML = candidatelist[i];
    } */
    document.getElementById("proposal-result").innerHTML = candidatelist;
});