const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { development: { api: apiConfig } } = require("./config/config.json");
const sequelize = require("./config/database.config");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routes
// Users routes
const userRoutes = require("./src/routes/user.routes");
app.use("/api/v1/user", userRoutes);

// Products routes
const productRoutes = require("./src/routes/product.routes");
app.use("/api/v1/product", productRoutes);

// Product categories routes
const productCategoryRoutes = require("./src/routes/product-category.routes");
app.use("/api/v1/product-category", productCategoryRoutes);

// Sales routes
const saleRoutes = require("./src/routes/sale.routes");
app.use("/api/v1/sale", saleRoutes);

app.listen(apiConfig.port, async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        console.log("E-commerce app listening on port " + apiConfig.port);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});