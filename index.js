var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var unirest = require("unirest");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');

app.get('/', function(req, res, next) {
  res.status(200).sendFile(path.join(__dirname+'/startpage.html')); 
});

app.post('/insert', function (req, res) {
    mongodb.MongoClient.connect('mongodb://localhost:27017',{ useUnifiedTopology: true }, function(err, db){
        var dbO = db.db("mydb");
        
        function getValueForNextSequence(sequenceOfName, callback)
        {
           dbO.collection("sample").findOneAndUpdate({_idd: sequenceOfName}, {$inc:{sequence_value:1}}, {returnNewDocument:true}, function(err, res) {
               var final = res.value.sequence_value;
               return callback(final);
           });
        }
    
       getValueForNextSequence("item_id", function(response){
           result = response;
           var record = {
            user_id: result,
            name: req.body.name,
            phone: req.body.phone,
            rating: req.body.rating,
            message: req.body.message
           }
           
           var myreq = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

            myreq.query({
              "authorization": "FN4dUYRJkk9ST5U6kicEi2tEnPWTO08hKDfgGZh64SRUsfbZJm3jnSC8Bu1u",
              "sender_id": "TXTIND",
              "message": "Hi "+req.body.name+"! Thank You for your feedback! Your Reference ID is "+result+". You can use this to make changes or view your feedback!",
              "route": "v3",
              "numbers": req.body.phone
            });

            myreq.headers({
              "cache-control": "no-cache"
            });


            myreq.end(function (res) {
              if (res.error) throw new Error(res.error);
            });
           
           dbO.collection('feedback').insertOne(record);
           app.locals.output1 = "Thank you for your Feedback!";
           app.locals.output2 = "Your reference id is: "+result;
           res.render('insert');
       });  
    });    
    
});

app.post('/view', function(req, res, next){
    mongodb.MongoClient.connect('mongodb://localhost:27017',{ useUnifiedTopology: true }, function(err, db){
        var dbO = db.db("mydb");
        dbO.collection("feedback").find({ user_id : parseInt(req.body.id)}).toArray(function(err, result) {
            if(result.length == 0)
            {
                app.locals.outputr = "Invalid Reference ID!!";
                res.render('view_err');
            }   
            else
            {
                app.locals.output = "Here is the feedback we got from you!";
                app.locals.name = "Name: "+result[0].name;
                app.locals.phone = "Phone: "+result[0].phone;
                app.locals.rating = "Rating: "+result[0].rating;
                app.locals.message = "Message: "+result[0].message;
                res.render('view');
            } 
            db.close();
        });
    });
});

app.post('/update', function(req, res, next){
    mongodb.MongoClient.connect('mongodb://localhost:27017',{ useUnifiedTopology: true }, function(err, db){
        var dbO = db.db("mydb");
        dbO.collection("feedback").updateOne({ user_id : parseInt(req.body.id)}, { $set: { rating: req.body.rating } }, function(err, obj) {
             if(obj.result.nModified > 0)
             {
                app.locals.outputn = "Your New rating has been successfully updated!";
                res.render('update');
             }
             else
             {
                app.locals.outputn = "Invalid Reference ID!";
                res.render('update');
             }
             db.close();
        });
    });
});

module.exports = app;

app.listen(8080 , () =>{
    console.log("Server listening at port 8080!");
} );