var express = require("express");
const http = require("http");
const sql = require('mssql/msnodesqlv8')
var app = express();
var bodyParser = require("body-parser");
// Create an HTTP service.
http.createServer(app).listen(8090);
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

// <!--Web Config-->
const pool = new sql.ConnectionPool({
  database: 'INDRAJITH',
  server: 'DESKTOP-4V2EHN9',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
});
const PORT = process.env.PORT || 8090;
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
// app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
// });
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});
// <!--Request-->


app.post("/Register",(req,res)=>{
  pool.connect().then(()=>{
    pool.request().query("CSPRegChat '"+req.body.Username+"','"+req.body.Email+"','"+req.body.Password+"'", (err, result) => {
      console.log(err)
      // console.log(result);
      if(err!=null)
    return res.json(err);
    else
    return res.json("succes");
  });
  })
});

app.post("/Login",(req,res)=>{
  pool.connect().then(()=>{
    pool.request().query("LoginChk '"+req.body.key1+"','"+req.body.key2+"'", (err, result) => {
      if(err!=null){
        console.log(err);
         return res.json(err);
      }
    else
    return res.json(result.recordset[0]);
  });
  })
})
