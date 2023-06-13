
//HACER ESTOOOOO

const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


//GET NORMAL

router.get("/api/clientes", async function (req, res) {
  // consulta de articulos con filtros y paginacion

  let where = {};
  if (req.query.ApellidoYNombre != undefined && req.query.ApellidoYNombre !== "") {
    where.ApellidoYNombre = {
      [Op.like]: "%" + req.query.ApellidoYNombre + "%",
    };
  }

  let items = await db.clientes.findAndCountAll({
    attributes: [
      "IdCliente",
      "ApellidoYNombre",
      "DNI",
    ],
    order: [["ApellidoYNombre", "ASC"]],
    where,
  });

  res.json(items.rows);
});


//GET POR ID
router.get("/api/clientes/:id", async function (req, res, next) {
    
    let items = await db.clientes.findOne({
      attributes: [
        "IdCliente",
        "ApellidoYNombre",
        "DNI",
      ],
      where: { IdCliente: req.params.id },
    });
    res.json(items);
  });

module.exports = router;
