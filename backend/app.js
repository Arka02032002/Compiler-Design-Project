const { urlencoded } = require('express');
const express=require('express');
const fs= require('fs');
const path = require('path');
const bodyParser= require('body-parser');
const app=express();
const port=80;

// EXPRESS SPECIFIC
app.use('/static',express.static('../static')); // Serving static files
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'../frontend'));// Set the views directory


var type;
var labels=['Red','Blue','Green','Black','Blue'];
var data=[12,13,14,3,20];

//APP ENDPOINTS
app.get('/',(req,res)=>{
    // res.status(200).sendFile(path.join(__dirname,'../frontend/index.html'));
    res.render("index",{data:data,type:type,labels:labels,description: 'Bar-graph'});

});

app.post('/',(req,res)=>{
    // console.log(req.body['graph_type']);
    // console.log(req.body);
    type=req.body['graph_type'];
    data=req.body['graph_data'];
    labels=req.body['graph_labels'];
    data=data.split(",");
    labels=labels.split(",");
    // console.log(type);
    // console.log(data);
    // console.log(labels);



    // var params=req.body.graph_type;

    // res.status(200).sendFile(path.join(__dirname,'../frontend/index.html'));
    res.render("index",{type:type,labels: labels,description: 'Bar-graph',data:data});
})

app.listen(port,()=>{
    console.log(`Server started at http://localhost:  ${port}`);
}
)
