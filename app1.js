
var express = require("express");
var redis = require("redis");
var client = redis.createClient();
var bodyparser=require("body-parser");
var app = express();
app.use(express.static("."));
app.use(bodyparser.json());

app.get("/", function (req, res) {
  res.send("Hello World!");
});




app.delete("/stats",function(){

client.set("WINS", 0);
  client.set("LOSSES", 0);
});

app.get("/stats",function(req,res){

    client.get("WINS",function(err, reply){
      count_win=reply;
      console.log(count_win);
    });
    client.get("LOSSES",function(err, reply){
      count_loss=reply;
      console.log(count_loss);
    });
});

app.post("/flip",function(req,res){


var count_win=0;
  var count_loss=0;
    var user_choice= req.body.call;
    var flip,result;
    client.get("WINS",function(err, reply){
      count_win=reply;
      console.log(count_win);
    });
    client.get("LOSSES",function(err, reply){
      count_loss=reply;
      console.log(count_loss);
    });
    var x = (Math.floor(Math.random() * 2) === 0);
    if(x){
        flip="heads";
    }else{
        flip="tails";
    }

    if(flip===user_choice){
    result="WINS";
    client.incr("WINS");
    res.json({
      "result":"WINS"
    });


    }
    else{
      client.incr("LOSSES");
      res.json({
        "result":"LOSSES"
      });



    }

    //client.set("WINS",count_win, redis.print);
    //client.set("LOSSES",count_loss, redis.print);

});



app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
