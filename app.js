
const express = require("express");
const app = express();
const fetch = require("node-fetch");

// body-parser
app.use(express.urlencoded({extended:false}))
app.set("view engine", "ejs");
app.use(express.static("public"));

let api = "https://api.github.com";

app.get("/", async (req, res) =>{
  console.log(req.body);
  const response = await fetch(`${api}/users`)
  const data = await response.json()
 
  res.render("index", {authors:data}) 
   console.log(data); 
});

app.get("/search", (req, res) => {
  let searchText = req.query.searchBar;
  console.log(searchText);
  const search = () => {
    fetch(`${api}/search/users?q=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        let mainData = data;
        console.log(mainData);
        res.render("index", { authors: data.items });
      });
  };
  search();
});

app.get("/profile/:username", async (req, res) =>{
  let username = req.params.username
  const response = await fetch(`${api}/users/${username}`)
  const data = await response.json()
  console.log(data)

  res.render('profile', {data:data})
  
  // let username = req.params.username
  // let data = fetch(`${api}/users/${username}`)
  // .then(res => res.json())
  // .then(data =>{
  //   console.log(data);
  //   res.render("profile", {data:data})
  // })
})





const port = 5050;
app.listen(port, function(){
  console.log(" server started at port " + port);
})
