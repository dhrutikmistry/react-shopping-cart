const express = require("express");
const bodyParser = require("body-parser");
const Database = require('better-sqlite3-with-prebuilds');

const app = express();
app.use(express.json());

const db = new Database('/home/kamal/workspace/react-shopping-cart/react-shopping-cart.db', { verbose: console.log });

app.get('/api/products',(req,res)=>{
    let products = db.prepare("select *from products");
    let getProducts = products.all();
    res.send(getProducts);
})

app.post('/api/products',(req,res)=>{
    let product = {
         title:req.body.title,
         description:req.body.description,
         image:req.body.image,
         price:req.body.price,
         availableSizes:req.body.availableSizes,
     }
     let insertProduct = db.prepare('insert into products(title,description,image,price,availableSizes) values(?,?,?,?,?)');
     let saveRecords = insertProduct.run(product.title,product.description,product.image,product.price,product.availableSizes);
   
     res.send(saveRecords);
})

app.delete('/api/products/:id',(req,res) => {
    let stmt = db.prepare('delete from products where _id = ?');
    let deleteProduct = stmt.run(parseInt(req.params.id))
    res.send(deleteProduct);
})

       

const port = process.env.port || 5000;
app.listen(port, ()=> console.log(`Listening to port ${port}`))