"use strick";

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

function init(sh){
    var initPop = initPopulate(sh);
    initPop();
    shopsMenusPopulate(sh);
    menuForms();
}

function initPopulate(sh){
    return function(){
        var shops = sh.shops;
        var shop = shops.next();
        var divSct1 = document.getElementById("sct1");
        var cat = document.getElementById("listCategories");
        var ul = document.getElementById("navShop");
        
        document.getElementById("catMenu").style.visibility = "hidden";
        
        removeChildsElement(ul);
        shopsMenusPopulate(sh);
        
        removeChildsElement(divSct1);
        menuForms();
        
        while (!shop.done){
            var divCol = document.createElement("div");
            divCol.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");

            var divThumb = document.createElement("div");
            divThumb.setAttribute("class", "thumbnail");

            var img = document.createElement("img");
            img.setAttribute("src", "http://placehold.it/320x150");
            divThumb.appendChild(img);

            var divCap = document.createElement("div");
            divCap.setAttribute("class", "caption");

            var h4 = document.createElement("h4");
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.appendChild(document.createTextNode(shop.value.name));
            h4.appendChild(a);
            divCap.appendChild(h4);

            var p = document.createElement("p");
            p.appendChild(document.createTextNode("Dirección: "+shop.value.direction));
            divCap.appendChild(p);

            p = document.createElement("p");
            p.appendChild(document.createTextNode("Teléfono: "+shop.value.phone));
            divCap.appendChild(p);

            var button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-primary pull-right");
            button.appendChild(document.createTextNode("Ver Productos"));
            button.addEventListener("click", shopPopulate(shop.value, sh));
            divCap.appendChild(button);


            divThumb.appendChild(divCap);
            divCol.appendChild(divThumb);
            divSct1.appendChild(divCol);

            shop = shops.next();
        }
    }    
}

function shopsMenusPopulate (erp){
    
    var ini = document.getElementsByClassName("navbar-header");
    var ul = document.getElementById("navShop");   
    var shops = erp.shops;
    var shop = shops.next();
    
    removeChildsElement(ul);
    
    ini[0].addEventListener("click", initPopulate(erp));
    
    while (shop.done !== true){
        var li = document.createElement("li");
        
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.addEventListener("click", shopPopulate(shop.value, erp));
        a.appendChild(document.createTextNode(shop.value.name));
        
        li.appendChild(a);
        ul.appendChild(li);

        shop = shops.next();
    }
}

function removeChildsElement(element){

    for(var i=element.children.length-1; i>-1; i--){
        element.removeChild(element.children[i]);
    }
}

function shopPopulate(shop, erp){
    return function(){
        var divSct1 = document.getElementById("sct1");
        removeChildsElement(divSct1);
        
        for(var i=0; i<shop.products.length; i++){
           productShopPopulate(divSct1, shop.products[i]); 
        }
        menuCategoryShopPopulate(shop, erp);
   }
}

function menuCategoryShopPopulate(shop, erp){
    
    function compareCategories(element){
			return (element.title === category.title)
	}
    
    var categoriesShop = [];
    var category;
    var cat = document.getElementById("listCategories");
    var categoryRep;
    
    removeChildsElement(cat);
    
    document.getElementById("catMenu").style.visibility = "visible";
       
    for (var i=0; i<shop.products.length; i++){
        category = productCategory(shop.products[i], erp);
        categoryRep = categoriesShop.findIndex(compareCategories);
        
        if (category != -1 && categoryRep == -1){
            categoriesShop.push(category);
        }
    }
    
    for (i=0; i<categoriesShop.length; i++){
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.appendChild(document.createTextNode(categoriesShop[i].title));
        a.addEventListener("click", productsCategoryShopPopulate(erp, shop, categoriesShop[i]));
        cat.appendChild(a);
    }
      
}

function menuForms(){
    
    function liForm(name, func){
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.appendChild(document.createTextNode(name));
        a.addEventListener("click", func());
        cat.appendChild(a);
    }
    
    var cat = document.getElementById("listCategories");
    
    removeChildsElement(cat);
    
    var p = document.createElement("p");
    p.setAttribute("class", "h3");
    
    p.appendChild(document.createTextNode("Autenticación"));
    cat.appendChild(p);
    
    liForm("Iniciar Sesión", sesionForm);
    
    p = document.createElement("p");
    p.setAttribute("class", "h3"); p.appendChild(document.createTextNode("Categorias"));
    cat.appendChild(p);
    
    liForm("Añadir categoria", addCategoryForm);
    liForm("Modificar categoria", updCategoryForm);
    liForm("Eliminar categoria", delCategoryForm);
    
    p = document.createElement("p");
    p.setAttribute("class", "h3");
    p.appendChild(document.createTextNode("Tiendas"));
    cat.appendChild(p);
    
    liForm("Añadir tienda", addShopForm);
    liForm("Modificar tienda", updShopForm);
    liForm("Eliminar tienda", delShopForm);
    
    p = document.createElement("p");
    p.setAttribute("class", "h3");
    p.appendChild(document.createTextNode("Productos"));
    cat.appendChild(p);
    liForm("Añadir producto", addProForm);
    liForm("Eliminar producto", delProForm);
}

function productCategory(product){
    
        function compareElements(element){
			return (element.serialNumber === product.serialNumber)
		}
    
        var categories = sh.categories;
        var category = categories.next();
        var index = -1;
        
        while (category.done !== true && index == -1 ){
            
           index = category.value.products.findIndex(compareElements);          
           if (index != -1){
                return category.value;
           }
            category = categories.next();
        }
    
        return -1;
}

function productsCategoryShopPopulate(erp, shop, category){
    return function(){
        function compareElements(element){
                return (element.serialNumber === shop.products[i].serialNumber)
        }

        var productsCategory = [];
        var index;

        for (var i=0; i<shop.products.length; i++){
            index = category.products.findIndex(compareElements);

            if (index != -1){
                productsCategory.push(shop.products[i]);
            }
        }

        var divSct1 = document.getElementById("sct1");
        removeChildsElement(divSct1);

        for(i=0; i<productsCategory.length; i++){
            productShopPopulate(divSct1, productsCategory[i]);
        }
    }
}

function productShopPopulate(element, product){
    
        var divCol = document.createElement("div");
        divCol.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");

        var divThumb = document.createElement("div");
        divThumb.setAttribute("class", "thumbnail");

        var img = document.createElement("img");
        img.setAttribute("src", product.product.images[0]);
        divThumb.appendChild(img);

        var divCap = document.createElement("div");
        divCap.setAttribute("class", "caption");

        var h4 = document.createElement("h4");
        h4.appendChild(document.createTextNode(product.product.name));
        divCap.appendChild(h4);

        var h4price = document.createElement("h4");
        h4price.setAttribute("class", "pull-right");
        h4price.appendChild(document.createTextNode(product.product.price+" €"));
        divCap.appendChild(h4price);

        var p = document.createElement("p");
        p.appendChild(document.createTextNode(product.product.description));
        divCap.appendChild(p);

        p = document.createElement("p");
        p.appendChild(document.createTextNode("Tax: "+product.product.tax));
        divCap.appendChild(p);

        var a = document.createElement("a");
        a.appendChild(document.createTextNode("Ver info general"));
        a.setAttribute("class", "pull-right");
        a.addEventListener("click", openWindows(product.product))
        divCap.appendChild(a);

        p = document.createElement("p");
        p.appendChild(document.createTextNode("Stock: "+product.stock));
        divCap.appendChild(p);

        divThumb.appendChild(divCap);
        divCol.appendChild(divThumb);
        element.appendChild(divCol); 
}

   
function openWindows(product){
    
    var productShop = product;
    var ventana;
    var inter;
 
    
    function closeWindows(){
        return function (){

           for (var i=0; i < listWindows.length; i++){
             listWindows[i].close();
           }
            
           var cat = document.getElementById("closeWindows");
           removeChildsElement(cat);
        }
    }
    
    function globalProductPopulate (){
        var long = listWindows.length-1;
        
        var divSct1 = listWindows[long].document.getElementById("sct");
        
        var divCol = listWindows[long].document.createElement("div");
        divCol.setAttribute("class", "col-sm-4 col-lg-4 col-md-4");

        var divThumb = listWindows[long].document.createElement("div");
        divThumb.setAttribute("class", "thumbnail");

        var divCap = listWindows[long].document.createElement("div");
        divCap.setAttribute("class", "caption");

        var h4 = listWindows[long].document.createElement("h4");
        h4.appendChild(listWindows[long].document.createTextNode(productShop.name));
        divCap.appendChild(h4);

        var h4price = listWindows[long].document.createElement("h4");
        h4price.setAttribute("class", "pull-right");
        h4price.appendChild(listWindows[long].document.createTextNode(productShop.price+" €"));
        divCap.appendChild(h4price);

        var p = listWindows[long].document.createElement("p");
        p.appendChild(document.createTextNode(productShop.description));
        divCap.appendChild(p);

        p = listWindows[long].document.createElement("p");
        p.appendChild(document.createTextNode("Tax: "+productShop.tax));
        divCap.appendChild(p);

        p = listWindows[long].document.createElement("p");
        p.appendChild(document.createTextNode("Stock General: "+productShop.stockGen));
        divCap.appendChild(p);
        
        divThumb.appendChild(divCap);
        divCol.appendChild(divThumb);
        divSct1.appendChild(divCol);
        
        var cat = document.getElementById("closeWindows");
        var a = document.createElement("a");
        
        removeChildsElement(cat);
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.appendChild(document.createTextNode("Cerrar Ventana"));
        a.addEventListener("click", closeWindows());
        cat.appendChild(a);
        
        clearInterval(inter);
    }
    
    return function (){
       listWindows.push(window.open("newWindows.html","_blank","toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"));
        
       inter = setInterval(globalProductPopulate, 500);
    }
}

 var listWindows = [];
 var sh = new StoreHouse();
 sh.name = "Test";

 createObjects(sh);
 window.onload = init(sh);
        
    