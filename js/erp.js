"use strict";

//Excepción general.
function StoreHouseException() {
	this.name = "StoreHouseException";
	this.message = "Error. StoreHouse Generic Exception.";
}
StoreHouseException.prototype = new BaseException();
StoreHouseException.prototype.constructor = StoreHouseException;

//----> Excepciones del objeto Category

//Excepción que se lanza cuando un parámetro no es un objeto Category.
function CategoryStoreHouseException() {
	this.name = "CategoryStoreHouseException";
	this.message = "Error. The method needs a object Category.";
}
CategoryStoreHouseException.prototype = new BaseException();
CategoryStoreHouseException.prototype.constructor = CategoryStoreHouseException;

//Excepción que se lanza cuando un objeto category ya existe.
function CategoryExistsException() {
	this.name = "CategoryExistsException";
	this.message = "Error. The category already exist.";
}
CategoryExistsException.prototype = new BaseException();
CategoryExistsException.prototype.constructor = CategoryExistsException;

//Excepción que se lanza cuando un objeto category no existe.
function CategoryNoExistsException() {
	this.name = "CategoryNoExistsException";
	this.message = "Error. The category not exist.";
}
CategoryNoExistsException.prototype = new BaseException();
CategoryNoExistsException.prototype.constructor = CategoryNoExistsException;


//-----> Excepciones del objeto Producto

//Excepción que se lanza cuando un parámetro no es un objeto Product.
function ProductStoreHouseException() {
	this.name = "ProductStoreHouseException";
	this.message = "Error. The method needs a object Product.";
}
ProductStoreHouseException.prototype = new BaseException();
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;

//Excepción que se lanza cuando un objeto product ya existe.
function ProductExistsException(product) {
	this.name = "ProductExistsException";
	this.message = "Error. "+product+" already exist.";
}
ProductExistsException.prototype = new BaseException();
ProductExistsException.prototype.constructor = ProductExistsException;

//Excepción que se lanza cuando un objeto product no existe.
function ProductNotExistsException(product) {
	this.name = "ProductNotExistsException";
	this.message = "Error. "+product+" not exist.";
}
ProductNotExistsException.prototype = new BaseException();
ProductNotExistsException.prototype.constructor = ProductNotExistsException;

//-----> Excepciones del objeto Coords

function CoordsStoreHouseException() {
	this.name = "CoordsStoreHouseException";
	this.message = "Error. The method needs a object Coords.";
}
CoordsStoreHouseException.prototype = new BaseException();
CoordsStoreHouseException.prototype.constructor = CoordsStoreHouseException;


//-----> Excepciones del objeto Shop

function ShopStoreHouseException() {
	this.name = "ShopStoreHouseException";
	this.message = "Error. The method needs a object Shop.";
}
ShopStoreHouseException.prototype = new BaseException();
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

//Excepción que se lanza cuando un objeto product ya existe.
function ShopExistsException(shop) {
	this.name = "ShopExistsException";
	this.message = "Error. "+shop+" already exist.";
}
ProductExistsException.prototype = new BaseException();
ProductExistsException.prototype.constructor = ProductExistsException;

//Excepción que se lanza cuando un objeto product no existe.
function ShopNotExistsException(shop) {
	this.name = "ShopNotExistsException";
	this.message = "Error. "+shop+" not exist.";
}
ProductNotExistsException.prototype = new BaseException();
ProductNotExistsException.prototype.constructor = ProductNotExistsException;


function StoreHouse(){

	if (!(this instanceof StoreHouse)) 
		throw new InvalidAccessConstructorException();

	//Definición de atributos privados del objeto.
	var name = null;
	var products = [];
    var categories = [];
    var shops = [];
    
    //Definición de los metodos 'get' y 'set' del atributo name.
    Object.defineProperty(this, 'name', {
			get:function(){
				return name;
			},
			set:function(value){
				value = value.trim();
				if (value === "" && value === undefined ) throw new EmptyValueException("name");		
				name = value;
			}		
		});
	
    //Definición del metodo 'get' del atributo categories. Devuelve iterador.
    Object.defineProperty(this, 'categories', {
		get:function(){
            var nextIndex = 0;
            return {
                next: function(){
                    return nextIndex < categories.length ? {value: categories[nextIndex++], done: false} : {done: true};
                }
            }
		}	
	});
    
    
    //Definición del metodo 'get' del atributo shops. Devuelve iterador.
    Object.defineProperty(this, 'shops', {
		get:function(){
            var nextIndex = 0;
            return {
                next: function(){
                    return nextIndex < shops.length ? {value: shops[nextIndex++], done: false} : {done: true};
                }
            }
		}	
	});
    
    //Método que permite añadir una categoria. Devuelve el número de categorias.
    this.addCategory = function(category){
		if (!(category instanceof Category)){ 
			throw new CategoryStoreHouseException();
		}
        
        if (category === undefined && category === null){ 
			throw new EmptyValueException(category);
		}
        
		var indexCategory = getCategoryIndex(category);
        if (indexCategory === -1){
            categories.push(category);
        }else{
            throw new CategoryExistsException();
        }
        
        return categories.length;
	}
    
    //Método que permite eliminar una categoria. Devuelve el número de categorias.
    this.removeCategory = function(category){
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException();
		}
        
		var indexCategory = getCategoryIndex(category);   
        if (indexCategory !== -1){
            var i = 0;

            while ( i < categories[indexCategory].products.length){
                this.addProduct(categories[indexCategory].products[i], categories[0]);
                i++;
            }
            categories.splice(indexCategory, 1);
        }else{
            throw new CategoryNoExistsException();
        }
        return categories.length;
	}
    
    //Devuelve la posición de una categoria dada.
    function getCategoryIndex(category){
        if (!(category instanceof Category)) { 
            throw new CategoryStoreHouseException();
        }		

        function compareElements(element){
            return (element.title === category.title)
        }
				
        return categories.findIndex(compareElements);	
	}
    
    //Categoría por defecto.
	var defaultCategory = new Category ("Anonymous");
	this.addCategory(defaultCategory);
    
    //Metodo que permite añadir un producto con una categoria. Devuelve el numero de productos de dicha categoria.
    this.addProduct = function(product, category){
		if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}	
		if (product === null){
			throw new EmptyValueException(product);
		}	
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException();
		}		


		var productPosition = getProductIndex(product);
        if (productPosition === -1){
			products.push(product);
		}
        
        var categoryPosition = getCategoryIndex(category);
		if (categoryPosition === -1){
            categoryPosition = this.addCategory(category)-1;
		}	
        
        var productCategoryPos = getCategoryProducts(product, categories[categoryPosition].products);
        
		if (productCategoryPos === -1){
			categories[categoryPosition].products.push(product);
            shops[0].products.push(product);
		}else{
            throw new ProductExistsException(product);
		}	
        return categories[categoryPosition].products.length;
	}
    
    //Método que borra un producto. Devuelve el numero de productos de dicha categoria.
    this.removeProduct = function(product){
		if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}
        
        var productPosition = getProductIndex(product);

		var i = categories.length - 1, categoryPosition = -1;
		while (i >= 0 && categoryPosition === -1){					
			categoryPosition = getCategoryProducts(product, categories[i].products); 
			i--;
		}
        
        var y = shops.length - 1, shopPosition = -1;
		while (y >= 0 && shopPosition === -1){					
			shopPosition = getShopProducts(product, shops[y].products); 
			y--;
		}

		if (productPosition !== -1){
            products.splice(productPosition, 1);
            
            if (categoryPosition !== -1 ){
                categories[i+1].products.splice(categoryPosition, 1);
            }
			
            if (shopPosition !== -1 ){
                shops[y+1].products.splice(shopPosition, 1);
            }
            
		}else{
			throw new ProductNotExistsException(product);
		}
        return products.length;
	}
    
    //Metodo que devuelve la posición de un producto dado.
    function getProductIndex(product){
        if (!(product instanceof Product)) { 
            throw new ProductStoreHouseException();
        }		

        function compareElements(element) {
            return (element.serialNumber === product.serialNumber)
        }
				
        return products.findIndex(compareElements);		
	}
    
    //Método que devuelve la posición de un producto en una categoria.
    function getCategoryProducts(product, categoryProducts){
		if (!(product instanceof Product)){ 
			throw new ProductStoreHouseException();
		}
        
		function compareElements(element){
			return (element.serialNumber === product.serialNumber)
		}
		
		return categoryProducts.findIndex(compareElements);	
	}
     
    //Método que añade un producto a una tienda con un stock.
    this.addProductInShop = function(product, shop, num){
        if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}	

		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException();
		}		
		
		var productPosition = getProductIndex(product); 
		if (productPosition === -1){
			products.push(product);
		}	

		var shopPosition = getShopIndex(shop);
		if (shopPosition === -1){
			shopPosition = this.addShop(shop)-1;
		}

		var productShopPosition = getShopProducts(product, shops[shopPosition].products); 	
		if (productShopPosition === -1){
            product.stock = num;
			shops[shopPosition].products.push(
                {
                 product: product,
                 serialNumber: product.serialNumber,
                 stock: num    
                }
            );
           
		}else{
			throw new ProductExistsException(product);
		}	

		return shops[shopPosition].products.length;
    }                              
    
   //Método que suma stock de un producto de una tienda ya existentes.
   this.addQuantityProductInShop = function(product, shop, num){
		if (!(product instanceof Product)) { 
			throw new ProductStoreHouseException();
		}	

		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException();
		}		

		var productPosition = getProductIndex(product); 
		if (productPosition === -1){
			throw new ProductNotExistsException(product);
		}	
        
		var shopPosition = getShopIndex(shop); 
		if (shopPosition === -1){
			throw new ShopNotExistsException(product);
		}
       
        if (num < 0 ) throw new InvalidValueException("num", num);

		
		var productShopPosition = getShopProducts(product, shops[shopPosition].products);

		if (productShopPosition !== -1){
			shops[shopPosition].products[productShopPosition].stock += num;
		}else{
			throw new ProductNotExistsException(product);
		}	

        return shops[shopPosition].products[productShopPosition].stock;
	}
   
   //Método que devuelve todos los productos añadidos en una categoria con su stock. Parametro type opcional para filtrar.
   this.getCategoryProducts = function(category, type){
		if (!(category instanceof Category)) { 
			throw new CategoryStoreHouseException ();
		}
        
        if (category === undefined && category === null){ 
			throw new EmptyValueException(category);
		}
       
		var categoryPosition = getCategoryIndex(category);  	
		if (categoryPosition === -1) throw new CategoryNotExistsException(category);
        
        var productPosition = 0;
        
        if (type === null || type === undefined ){
            return {
                next: function(){

                    var _product = null;

                    _product = category.products[productPosition];

                    if (_product !== null && productPosition < category.products.length ){
                        productPosition++;
                        return {value: _product, done: false}
                    }
                    if (productPosition >= category.products.length) return {done: true};
                }
            }
        }else{
            return {
                next: function(){
                    
                    var _product = null;

                    _product = category.products[productPosition];
                    
                    while ( _product !== null && productPosition < category.products.length ){    
                        
                        if ( category.products[productPosition] instanceof type){
                            _product = category.products[productPosition];
                            productPosition++;
                        return {value: _product, done: false}
                        }
                        productPosition++; 
                    }
                    if (productPosition >= category.products.length) return {done: true};
                }
            }
        }
	}
   
   //Método que devuelve la posición de un producto en una tienda.
   function getShopProducts(product, shopProducts){
		if (!(product instanceof Product)){ 
			throw new ShopStoreHouseException();
		}

		function compareElements(element){
			return (element.serialNumber === product.serialNumber)
		}
       
		return shopProducts.findIndex(compareElements);	
	}
    
    //Método que añade una tienda.
    this.addShop = function(shop){
		if (!(shop instanceof Shop)){ 
			throw new ShopStoreHouseException();
		}
        
        if (shop === undefined && shop === null){ 
			throw new EmptyValueException(shop);
		}
        
		var indexShop = getShopIndex(shop);
        if (indexShop === -1){
            shops.push(shop);
        }else{
            throw new ShopExistsException(shop);
        }
        
        return shops.length;
	}
    
    //Método que elimina una tienda.
    this.removeShop = function(shop){
		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException();
		}
        
		var indexShop = getShopIndex(shop); 
          
        if (indexShop !== -1){
            var i = 0;
            
            while ( i < shops[indexShop].length){
                this.addProductInShop(shops[indexShop].products[i], this.defaultShop, shops[indexShop].products[i].stock );
            }
            shops.splice(indexShop, 1);
        }else{
            throw new ShopNotExistsException(shop);
        }
        return shops.length;
	}
    
    //Método que devuelve todos los productos añadidos en una tienda con su stock. Parametro type opcional para filtrar.
    this.getShopProducts = function(shop, type){
		if (!(shop instanceof Shop)) { 
			throw new ShopStoreHouseException ();
		}
        
        if (shop === undefined && shop === null){ 
			throw new EmptyValueException(shop);
		}
       
		var shopPosition = getShopIndex(shop);  	
		if (shopPosition === -1) throw new ShopNotExistsException(shop);
        
        var productPosition = 0;
        
        if (type === null || type === undefined ){
            return {
                next: function(){

                    var _product = null;

                    _product = shop.products[productPosition];

                    if (_product !== null && productPosition < shop.products.length ){
                        productPosition++;
                        return {value: _product, done: false}
                    }
                    if (productPosition >= shop.products.length) return {done: true};
                }
            }
        }else{
            return {
                next: function(){
                    
                    var _product = null;

                    _product = shop.products[productPosition];
                    
                    while ( _product !== null && productPosition < shop.products.length ){    
                        
                        if ( shop.products[productPosition].product instanceof type){
                            _product = shop.products[productPosition];
                            productPosition++;
                        return {value: _product, done: false}
                        }
                        productPosition++; 
                    }
                    if (productPosition >= shop.products.length) return {done: true};
                }
            }
        }
	}
    
    //Método que devuelve la posición de una tienda.
    function getShopIndex(shop){
        if (!(shop instanceof Shop)) { 
            throw new ShopStoreHouseException();
        }		

        function compareElements(element) {
            return (element.cif === shop.cif)
        }
				
        return shops.findIndex(compareElements);		
	}
    
    //Tienda por defecto.
    var coord = new Coords(14, 68);
	var defaultShop = new Shop("0123", "General", coord);
	this.addShop(defaultShop);

}

function createObjects(sh){
    
        var cat1 = new Category("Ropa");
        cat1.description = "Todo tipo de ropa";
        var cat2 = new Category("Tecnología");
        cat2.description = "Todo tipo de aparato electrónico";
        var cat3 = new Category("Libros");
        cat3.description = "Todo lo relacionado con la lectura";

       var pro1 = new Product(1111, "Camiseta", 19.99);
       pro1.description = "Camiseta Roja para hombre";
       pro1.tax = 3;
       pro1.images.push("imagenes/camiseta_roja.jpg")    
       var pro2 = new Product(2222, "Portatil", 321.99)
       pro2.description = "HP - BS017 - i5 - 15.6";
       pro2.tax = 4;
       pro2.images.push("imagenes/portatil.jpg")
       var pro3 = new Product(3333, "Zapatos", 27.99);
       pro3.description = "Zapatos Hugo Boss";
       pro3.tax = 4;
       pro3.images.push("imagenes/zapatos.jpg")
       var pro4 = new Product(4444, "Vaqueros", 16.99);
       pro4.description = "Vaquero Pepe Jeans Soho Z63";
       pro4.tax = 5;
       pro4.images.push("imagenes/vaqueros.jpg")
       var pro5 = new Product(5555, "Movil", 189.49);
       pro5.description = " Móvil Huawei P8 Lite - Negro";
       pro5.tax = 5;
       pro5.images.push("imagenes/movil.jpg")
       var book = new Book(6666, "ESDLA", 20, 576);
       book.description = "La comunidad del anillo (tapa dura)";
       book.tax = 6;
       book.images.push("imagenes/esdla.jpg")    
       var tv = new TV(7777, "TV1", 1450, 48);
       tv.description = "WXGA LED HD";
       tv.tax = 6;
       tv.images.push("imagenes/tv.jpg") 

       var coor1 = new Coords(14, 68);
       var shop1 = new Shop(1234, "Shop1", coor1);
       shop1.direction = "C/ San Marcos N32";
       shop1.phone = 123456789;    
       var shop2 = new Shop(4321, "Shop2", coor1);
       shop2.direction = "C/ Calle1 N2";
       shop2.phone = 987654321; 
       var shop3 = new Shop(6221, "Shop3", coor1);
       shop3.direction = "C/ Calle Falsa N74";
       shop3.phone = 282822110; 

       sh.addProduct(pro1, cat1);
       sh.addProduct(pro3, cat1);
       sh.addProduct(pro4, cat1);
       sh.addProduct(pro2, cat2);
       sh.addProduct(pro5, cat2);
       sh.addProduct(book, cat3);
       sh.addProduct(tv, cat2);

       sh.addProductInShop(pro1, shop1, 32);
       sh.addProductInShop(pro1, shop2, 44);
       sh.addProductInShop(pro2, shop1, 55);
       sh.addProductInShop(pro2, shop2, 66);
       sh.addProductInShop(pro3, shop3, 32);
       sh.addProductInShop(pro3, shop1, 23);
       sh.addProductInShop(pro4, shop1, 34);
       sh.addProductInShop(pro4, shop2, 11);
       sh.addProductInShop(pro4, shop3, 13);
       sh.addProductInShop(pro5, shop2, 61);  
       sh.addProductInShop(book, shop1, 31);  
       sh.addProductInShop(tv, shop1, 11);  
       sh.addProductInShop(tv, shop2, 4);  
    }

 var sh = new StoreHouse();
 sh.name = "Test";
 createObjects(sh);
 