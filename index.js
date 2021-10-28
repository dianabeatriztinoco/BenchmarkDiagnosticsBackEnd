import express from "express";
import { getCats, getCat, deleteCat, validateCat } from "./cats.js";
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("howdy!"));

app.get("/cats", async (req, res) => {
  const cats = await getCats();

  return res.json(cats);
  //res.status(404).end() // <-replace with your code
});

app.get("/cats/:id", async (req, res) => {
  const catId = req.params.id;
  const cats = await getCats();
  const catIndices = Object.keys(cats);

  if (catIndices.includes(catId)) {
    const selectedCat = await getCat(catId);
    res.json(selectedCat);
  } else {
    const err = "No such Kitty!";
    //res.send(err)
    res.status(400).send({
      errorMessage: "No such Kitty!",
    });
  }
});

app.post("/cats", async (req, res) => {
   const newCat = req.body
   if(newCat.name && newCat.furColor && newCat.favoriteFood && newCat.furColor.length < 10 && (newCat.favoriteFood.includes("turkey giblets") || newCat.favoriteFood.includes("beef paté") || newCat.favoriteFood.includes("lamb chops") || newCat.favoriteFood.includes("everything bagels"))){
     validateCat(newCat)
     res.status(200).end();
   }

  else{
   
    res.status(400).end();
   }

});

app.delete("/cats/:id", async (req, res) => {
  const catId = req.params.id
  const cat = await getCat(catId)
  const cats = await getCats()

 if(cat){
   deleteCat(cat)
   res.status(200).end()
 }
 else{
  res.status(400).send({
    errorMessage: "No such Kitty!",
  });
 }
});

export default app;
