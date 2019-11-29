const assert = require('assert');



var cartList = [];

function createRoutes (app, db) {
    
    
    
    
    
    app.post('/api/cart/:id', (request, response) => {
        var id = request.params.id;
        const products = db.collection('productos');
        
        var esId=false;
        var cont=1;
        var encuentraComun=false;
        
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            //
            
            var c=0;
            for(c;c<result.length;c++){
                if(request.params.id.toString()===result[c]._id.toString()){
                    esId=true;  
                    var i=0;
                    
                    for(i;i<cartList.length;i++){
                        
                        if (request.params.id.toString()===cartList[i]._id.toString()){
                            
                            encuentraComun=true;
                            
                            cartList[i].cantidad+=1;
                            
                        } 
                    }
                    if(encuentraComun!=true){
                        
                        result[c].cantidad=cont;
                        cartList.push(result[c]);
                    }
                    
                } 
            }
            
            
            if(!esId){
                response.send({
                    message: 'error',
                    cartSize: cartList.length
                });
                return;
            }
            
            response.send({
                cartSize: cartList.length
            });
            
        });
        
        
        
    });
    
    app.get('/product/:id', function (req, res) {
        const products = db.collection('productos');
        var query= {};        
        products.find({})
        .toArray((err, result) => {
            
            var c=0;
            for(c;c<result.length;c++){
                if(req.params.id.toString()===result[c]._id.toString()){
                    result[c].cartLength= cartList.length,
                    res.render('product', result[c]);
                }
                
            } 
        });
        
    });
    
    
    app.get('/', function (req, res) {
        
        const products = db.collection('productos');
        products.find({})
        // transformamos el cursor a un arreglo
        .toArray((err, result) => {
            // asegurarnos de que noh ay error
            
            
            var listCopy = result.slice();
            
            if(req.query.orderType == 'popularity'){
                listCopy.sort(function(a, b){
                    return a.popularidad - b.popularidad;
                });
            }
            
            
            if(req.query.orderType == 'alfabet'){
                listCopy.sort(function(a, b){
                    return a.nombre - b.nombre;
                });
            }
            
            
            if(req.query.orderType == 'price'){
                listCopy.sort(function(a, b){
                    return a.precio - b.precio;
                });
            }
            
            if(req.query.filter == 'sports'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.categoria==="DEPORTES"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == 'war'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.categoria==="GUERRA"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            if(req.query.filter == 'adventure'){
                listCopy = listCopy.filter(function(elem){
                    if(elem.categoria==="AVENTURA"){
                        return true;
                    } else {
                        
                        return false;
                    }
                });
            }
            
            for(var i=0;i<listCopy.length;i++){
                listCopy[i]._id=listCopy[i]._id.toString();
            }
            
            const context={
                products:listCopy,
                cartLength: cartList.length,
                
            }
            res.render('store',context);
            
        });
        
    });
    
    app.get('/cart', function (req, res) {
        
        
        var listCopy = cartList.slice();
        var price=0;
        var cantidad=0;
        for(var i=0;i<listCopy.length;i++){
            price+=listCopy[i].price;
            
        }
        
        for(var i=0;i<listCopy.length;i++){
            
            console.log(listCopy[i]._id.toString());
            if(listCopy[i+1]!=null){
                if(listCopy[i]._id.toString()===listCopy[i+1]._id.toString()){
                    cantidad+=1;
                    console.log(cantidad);
                }
            }
        }
        
        const context={
            cart_products:listCopy,
            total:price,
            cant:cantidad,
            
            
        }
        
        
        res.render('cart',context);
        
    });
    
    
    
    app.post('/api/cartTotal', (request,response)=>{
        var listCopy = cartList.slice();
        
        var price=0;
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].precio*listCopy[i].cantidad;
                console.log(price);
            }
        }
        response.send({
            total: "TOTAL $"+price,
        });
    });
    app.post('/api/cartDelete/:id', (request,response)=>{
        var id = request.params.id;
        
        var listCopy = cartList.slice();
        
        
        var index=listCopy.length;
        for(var c=0;c<listCopy.length;c++){
            if(request.params.id.toString()===listCopy[c]._id.toString()){
                console.log("encontre");
                cartList.splice(c,1);
            }
        }
        
        var price=0;
        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].precio*listCopy[i].cantidad;
                console.log(price);
            }
        }
        
        response.send({
            total: "TOTAL $"+price,
        });
        
    });
    
    app.get('/checkout', function (req, res) {
        const products = db.collection('products');
        var query= {};        
        
        
        res.render('checkout');
        
    });
    

    app.post('/buy', function (request, response) {
        
        var listCopy = cartList.slice();
        var price = 0;
        var cantidad = 0;

        if(listCopy!=null){
            for(var i=0;i<listCopy.length;i++){
                price+=listCopy[i].price*listCopy[i].cantidad;
                
            }
        }
       
        var datos = {
            nombre: request.body.name,
            direccion:request.body.id,
            tipoTarjeta:request.body.tarjet,
            direccion:request.body.dir,
            products:cartList,
            total: price
            
        };
        
        var collection = db.collection('pedidosTienda');

        collection.insertOne(datos, function (err) {
            assert.equal(err, null);
            
        });     
     
        response.redirect('/');
    });
    
    
}

module.exports = createRoutes;