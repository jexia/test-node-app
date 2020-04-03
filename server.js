const express = require("express");
const dotenv = require("dotenv"); 
dotenv.config();

const jexiaSDK = require("jexia-sdk-js/node");
const dataModule = jexiaSDK.dataOperations();
const field = jexiaSDK.field();

const credentials = {
  projectID: process.env.PROJECT_ID,
  key: process.env.API_KEY,
  secret:process.env.API_SECRET
};

jexiaSDK.jexiaClient().init( credentials,dataModule);
const todo = dataModule.dataset(process.env.DATASET);

// to deploy it to AppHosting please use port 80
const PORT = 3000; 

// to deploy it to AppHosting please use IP:0.0.0.0
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  todo
  .select()
  .limit(200)
  .fields("text", "id","done")
  .where(field=> field("text").isLike("%4").and(field("id").isNotNull()))
  .subscribe(
   records => { 
    console.log(records)
    res.send(records)
  }, 
  error => { 
     console.log(error)
     next(error)
  }
 );  
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
