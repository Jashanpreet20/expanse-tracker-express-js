const express=require('express');
const alert=require('alert');

const routes=express.Router();
const path=require('path');
const bodyparser=require('body-parser');


const db=require('../util/database');



routes.use(bodyparser.urlencoded({ extended : false}));

routes.get('/',(req,res,next) =>{
  try{
        
        db.execute('SELECT * FROM user ' ,(err,data,fielddata) =>{
                if(err) console.log(err);
                res.render('register',{list:data});
               });       

  
        } catch(err){
                console.log(err);
        }
});

routes.get('/remove/(:id)', function (req, res, next) {
        var user = { id: req.params.id }
        db.query(
          'DELETE FROM user WHERE id = ' + req.params.id,
          user,
          function (err, result) {
           if(err) console.log(err);
           res.redirect('/');
          },
        )
      })

      routes.get('/update/(:id)', function (req, res, next) {
        var user = { id: req.params.id }
       try {
        db.query(
          'SELECT * FROM user WHERE id = ' + req.params.id,
          user,
          function (err, result) {
           if(err) console.log(err);
                res.render('update', {update:result});
        },
        )
       }catch(err){
        console.log(err);
       }
      })

      
      routes.post('/update/(:id)', function (req, res, next) {
        var itemname=req.body.itemname;
        var price=req.body.price;
        var id=req.body.id;

        var sql=db.query('UPDATE user set itemname=?, price=? WHERE id=?');

      
        db.query(sql,[itemname,price,id], function(err,result) {
          if(err) console.log(err);
          res.redirect('/');
  });
      
      });
routes.get('/delete',(req,res) =>{
        var sql=db.execute('DELETE FROM user WHERE id=?');

        var id=req.params.id;

        db.query(sql,id,(err,result) =>{
                if(err) console.log(err);
                res.redirect('/');
        })

});



routes.post('/add',(req,res,next) =>{
      
        const itemname=req.body.itemname;
        const price=req.body.price;
      
        if(itemname.length === 0 && price.length ===0)
        {
        return res.redirect('/');
        } else{
                db.execute('INSERT INTO user(itemname,price) VALUES(?,?)',[itemname,price]);
                res.redirect('/');
        }
                
      
})


module.exports=routes;