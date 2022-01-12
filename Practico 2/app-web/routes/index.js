var express = require('express');
const list = require('../models').List;
const item = require('../models').Item;
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next)=>{
  let lista = await list.findAll();
  res.render('index',{pretty:true,item:true, lista:lista});
  res.end()
});

router.get('/listas', async (req, res, next)=>{
  let lista = await list.findAll();
  res.render('listas',{pretty:true, modificar:true, lista:lista});
  res.end()
});

router.get('/agLista', async (req, res, next)=>{
  let lista = await list.findAll();
  res.render('index',{pretty:true,item:false, lista:lista});
  res.end()
});

router.get('/:idList/items', async (req, res, next)=>{
  let l = await list.findByPk(req.params.idList);
  let lista = await list.findAll();
  let items = await l.getItems();
  res.render('items',{pretty:true,item:true,modificar:true, lista:lista, items:items, nlista:l.titulo});
  res.end()
});

router.post('/agregarItem', async (req, res, next)=>{
  let lista = await list.findByPk(req.body.lista);
  if(lista != null){
    await lista.createItem({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      prioridad: req.body.prioridad,
      estado: req.body.estado,
      fecha_limite: req.body.fechaL,
      createdAt: req.body.fechaC
    });
  }else{
    await item.create({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      prioridad: req.body.prioridad,
      estado: req.body.estado,
      fecha_limite: req.body.fechaL,
      createdAt: req.body.fechaC
    });
  }
});

router.post('/agregarList', async (req, res, next)=>{
  await list.create({
    titulo: req.body.titulo,
    estado: req.body.estado,
    createdAt: req.body.fechaC,
    fecha_resolucion: req.body.fechaR
  });
});

module.exports = router;
