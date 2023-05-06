import {query} from "@/lib/db";

//get products that match the id of a url
export async function getProductById(id) {
    const results = await query({
      query: "SELECT * FROM products WHERE product_id = ?",
      values: [id],
    });
    return results[0];
  }
  

//get products from database
export default async function handler(req, res) {
    let message;
    if (req.method === "GET") {
      const products = await query({
        query: "SELECT * FROM products",
        values: [],
      });
      res.status(200).json({ products: products  });
    }
  
    //add products to database
    if (req.method === "POST") {
      const productName = req.body.product_name;
      const addProducts = await query({
        query: "INSERT INTO products (product_name) VALUES (?)",
        values: [productName, ],
      });
      let product = [];
      if (addProducts.insertId) {
        message = "success";
      } else {
        message = "error";
      }
      product = {
        product_id: addProducts.insertId,
        product_name: productName,

      };
      res.status(200).json({ response: { message: message, product: product } });
    }
  

    //update products in database
    if (req.method === "PUT") {
      const productId = req.body.product_id;
      const productName = req.body.product_name;
      const productPrice = req.body.product_price;
      const productTradeVal = req.body.product_tradeval;
      const productPlatform = req.body.product_platform;
      const productRating = req.body.product_rating;
      const productDescription = req.body.product_description;
  
      const updateProducts = await query({
        query:
          "UPDATE products SET product_name = ?, product_price = ?, product_tradeval = ?, product_platform = ?, product_rating = ?, product_description = ? WHERE product_id = ?",
        values: [
          productName || null,
          productPrice || null,
          productTradeVal || null,
          productPlatform || null,
          productRating || null,
          productDescription || null,
          productId,
        ],
      });
  
      const result = updateProducts.affectedRows;
      if (result) {
        message = "success";
      } else {
        message = "error";
      }
  
      const product = {
        product_id: productId,
        product_name: productName,
        product_price: productPrice,
        product_trade_val: productTradeVal,
        product_platform: productPlatform,
        product_rating: productRating,
        product_description: productDescription,
      };
  
      res
        .status(200)
        .json({ response: { message: message, product: product } });
    }

    //delete products from database
    if (req.method === "DELETE") {
      const productId = req.body.product_id;
      const deleteProducts = await query({
        query: "DELETE FROM products WHERE product_id = ?",
        values: [productId],
      });
      const result = deleteProducts.affectedRows;
      if (result) {
        message = "success";
      } else {
        message = "error";
      }
      res
        .status(200)
        .json({ response: { message: message, product_id: productId } });
    }
  }
  