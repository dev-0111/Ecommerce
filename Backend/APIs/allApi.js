const express = require("express");
const cors = require("cors");
require("../database/connection");
const app = express();

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

app.use(express.json());
app.use(cors());

const User = require("../database/userModel");
const Product = require("../database/productModel");

// Sign Up Registration API
app.post("/register", async (req, resp) => {
  let data = new User(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "Something Went Wrong ! Plzz Try After Some Time" });
    }
    resp.send({ result, auth: token });
  });
});

//Login Authentication API
app.post("/login", async (req, resp) => {
  console.log(req.body);

  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({
            result: "Something Went Wrong ! Plzz Try After Some Time",
          });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send("No User Found");
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

//Add Product API
app.post("/add-product", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

//All Products API
app.get("/products", verifyToken, async (req, resp) => {
  let result = await Product.find();
  if (result.length > 0) {
    resp.send(result);
  } else {
    resp.send("No Product Found");
  }
});

//Delete Product API
app.delete("/delete-item/:id", verifyToken, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

//Update Product API
app.put("/update-product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );

  resp.send(result);
});

//Single Product Detail API
app.get("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send("No Product Found");
  }
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });

  resp.send(result);
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    // console.log(token);

    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please Provide Valid Token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add Token With Header" });
  }
  
  
}

app.listen(5500);
