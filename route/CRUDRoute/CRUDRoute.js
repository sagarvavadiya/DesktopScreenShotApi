const express = require("express");
const CRUDController = require("../../controller/Crud/CrudController");
crudRoutes = express.Router();

crudRoutes.get("/", CRUDController.TakeScreenShot);
module.exports = crudRoutes;
