require("dotenv").config();
const models = require("./models/models");
const express = require("express");
const sequelize = require("./db");
const { adminBro, adminRouter } = require("./admin"); //!ADMINBRO
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
// const formidableMiddleware = require("express-formidable"); //! shit for mf adminbro, because it doesnt work without it
const errorHandler = require("./middleware/ErrorHandlingMiddleware.js");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
// app.use(formidableMiddleware()); //!!!!! FUCKING BULLSHIT!!!! update doesnt work with this shit!!!!!! and adminbro doesnt work without this shit!!!!!!!!
app.use(express.static(path.resolve(__dirname, "static")));

app.use(fileUpload({}));

app.use(adminBro.options.rootPath, adminRouter); //! ADMINBRO

app.use("/api", router); //!MAIN ROUTE
app.use(errorHandler); //!error handler should be the last middleware

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // { force: true }
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
