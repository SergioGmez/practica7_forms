function removeChildsElement(element){

        for(var i=element.children.length-1; i>-1; i--){
                element.removeChild(element.children[i]);
            }
}
        
 function generalForm(form){
        var dv = document.createElement("div");
        dv.setAttribute("class", "form-group");
                
        var label = document.createElement("label");
        label.setAttribute("class", "control-label col-sm-2");
        
        label.appendChild(document.createTextNode("Titulo"));
        dv.appendChild(label);
                
        var dv1 = document.createElement("div");
        dv1.setAttribute("class", "col-sm-4");
                
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "form-control");
        input.setAttribute("name", "title");
                
        dv1.appendChild(input);
        dv.appendChild(dv1);
        form.appendChild(dv);
                
        dv = document.createElement("div");
        dv.setAttribute("class", "form-group");
                
        label = document.createElement("label");
        label.setAttribute("class", "control-label col-sm-2");
        label.appendChild(document.createTextNode("Descripción"));
         dv.appendChild(label);
                
         dv1 = document.createElement("div");
         dv1.setAttribute("class", "col-sm-4");
                
         input = document.createElement("textarea");
         input.setAttribute("rows", "5");
         input.setAttribute("class", "form-control");
         input.setAttribute("name", "description");
                
         dv1.appendChild(input);
         dv.appendChild(dv1);
         form.appendChild(dv);
}
        
function addCategoryForm(){
       return function (){
            var divForm = document.getElementById("sct1");
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
                
            generalForm(form);
           
            dv = document.createElement("div");
            dv.setAttribute("class", "form-group");

            dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-offset-5");

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("Enviar"));
            a.setAttribute("class", "btn btn-default");
            a.addEventListener("click", addCategory());   

            dv1.appendChild(a);
            dv.appendChild(dv1);
            form.appendChild(dv);
                
            divForm.appendChild(form);
      }
}
        
function updCategoryForm(){
        return function (){
            var divForm = document.getElementById("sct1");
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
                
            var dv = document.createElement("div");
            dv.setAttribute("class", "form-group");
                
            var label = document.createElement("label");
            label.setAttribute("class", "control-label col-sm-2");
            label.appendChild(document.createTextNode("Titulo de la categoria a actualizar"));
            dv.appendChild(label);
                
            var dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-4");
                
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
            input.setAttribute("name", "titleId");
                
            dv1.appendChild(input);
            dv.appendChild(dv1);
            form.appendChild(dv);
                 
            generalForm(form);
            
            dv = document.createElement("div");
            dv.setAttribute("class", "form-group");

            dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-offset-5");

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("Enviar"));
            a.setAttribute("class", "btn btn-default");
            a.addEventListener("click", updCategory()); 
            
            dv1.appendChild(a);
            dv.appendChild(dv1);
            form.appendChild(dv);
                
            divForm.appendChild(form);
        }
}
            
function delCategoryForm(){
        return function (){
            var divForm = document.getElementById("sct1");

            removeChildsElement(divForm);

            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");

            var dv = document.createElement("div");
            dv.setAttribute("class", "form-group");

            var label = document.createElement("label");
            label.setAttribute("class", "control-label col-sm-2");
            label.appendChild(document.createTextNode("Titulo de la categoria a eliminar"));
            dv.appendChild(label);

            var dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-4");

            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
            input.setAttribute("name", "titleId");
            dv1.appendChild(input);
            
            var a = document.createElement("a");
            a.appendChild(document.createTextNode("Enviar"));
            a.setAttribute("class", "btn btn-default");
            a.addEventListener("click", delCategory());
            dv1.appendChild(a);
        
            dv.appendChild(dv1);
            form.appendChild(dv);
            divForm.appendChild(form);
        }
}
        
function addCategory(){
      return function (){
            var name = document.forms["catForm"]["title"].value;
            var description = document.forms["catForm"]["description"].value;
             
            if (name == "" || description == ""){
                 throw new EmptyValueException();
            } else {
                 var cat = new Category(name);
                 cat.description = description;
                 sh.addCategory(cat);
            }
      }
}
        
function updCategory(){
      return function (){
             function compareElements(element){
                 return (element.title === titleId)
             }

             var titleId = document.forms["catForm"]["titleId"].value;
             var title = document.forms["catForm"]["title"].value;
             var description = document.forms["catForm"]["description"].value;
                
             var cs = sh.categories;
             var category = cs.next();
             var categories = [];
          
             while (category.done !== true){
                  categories.push(category.value);
                  category = cs.next();
             }

             if (title == "" || titleId == ""){
                  throw new EmptyValueException();
             } else {
                  index = categories.findIndex(compareElements);

                  if (index != -1){
                        categories[index].title = title;
                        categories[index].description = description;
                  } else {
                        throw new CategoryNoExistsException();
                  }
             } 
      }  
}
        
function delCategory(){
    return function (){
        function compareElements(element){
           return (element.title === titleId)
        }
            
        var titleId = document.forms["catForm"]["titleId"].value;
    
        var cs = sh.categories;
        var category = cs.next();
        var categories = [];
          
        while (category.done !== true){
             categories.push(category.value);
             category = cs.next();
        } 
    
        if (titleId == ""){
            throw new EmptyValueException();
        } else {
            index = categories.findIndex(compareElements);
                
            if (index != -1){
                
                sh.removeCategory(categories[index]);
                
            } else {
                 throw new CategoryNoExistsException();
            }
        }
    }   
}


function generalShopForm(form, elements){
    
        function elementsForm(element){
            var dv = document.createElement("div");
            dv.setAttribute("class", "form-group");

            var label = document.createElement("label");
            label.setAttribute("class", "control-label col-sm-2");
           label.appendChild(document.createTextNode(element));
            dv.appendChild(label);

            var dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-4");

            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
            input.setAttribute("name", element);

            dv1.appendChild(input);
            dv.appendChild(dv1);
            form.appendChild(dv);
        }
    
        for (var i=0; i<elements.length; i++){
            elementsForm(elements[i]);
        }
                
}

function addShopForm(){
       return function (){
            var divForm = document.getElementById("sct1");
            var elements = ["CIF", "Name", "Direction", "Phone"];
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
                
            generalShopForm(form, elements);
           
            dv = document.createElement("div");
            dv.setAttribute("class", "form-group");

            dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-offset-5");

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("Enviar"));
            a.setAttribute("class", "btn btn-default");
            a.addEventListener("click", addShop());   

            dv1.appendChild(a);
            dv.appendChild(dv1);
            form.appendChild(dv);
                
            divForm.appendChild(form);
      }
}

function addShop(){
      return function (){
            var cif = document.forms["catForm"]["CIF"].value;
            var name = document.forms["catForm"]["Name"].value;
            var direction = document.forms["catForm"]["Direction"].value;
            var phone = document.forms["catForm"]["Phone"].value;
             
            if (cif == "" || name == ""){
                 throw new EmptyValueException();
            } else {
                 var coord = new Coords(120, 111);
                 var shop = new Shop(cif, name, coord);
                 shop.direction = direction;
                 shop.phone = phone;

                 sh.addShop(shop);
            }
      }
}

function updShopForm(){
      return function (){
            var divForm = document.getElementById("sct1");
            var elements = ["CIF", "Name", "Direction", "Phone"];
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
                
            var dv = document.createElement("div");
            dv.setAttribute("class", "form-group");
                
            var label = document.createElement("label");
            label.setAttribute("class", "control-label col-sm-2");
            label.appendChild(document.createTextNode("CIF de la tienda a actualizar"));
            dv.appendChild(label);
                
            var dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-4");
                
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
            input.setAttribute("name", "cifId");
                
            dv1.appendChild(input);
            dv.appendChild(dv1);
            form.appendChild(dv);
   
            generalShopForm(form, elements);
           
            dv = document.createElement("div");
            dv.setAttribute("class", "form-group");

            dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-offset-5");

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("Enviar"));
            a.setAttribute("class", "btn btn-default");
            a.addEventListener("click", updShop());
          
            dv1.appendChild(a);
            dv.appendChild(dv1);
            form.appendChild(dv);
                
            divForm.appendChild(form);
        }  
}

function updShop(){
      return function (){
             function compareElements(element){
                 return (element.cif == cifId)
             }

             var cifId = document.forms["catForm"]["cifId"].value;
             var cif = document.forms["catForm"]["CIF"].value;
             var name = document.forms["catForm"]["Name"].value;
             var direction = document.forms["catForm"]["Direction"].value;
             var phone = document.forms["catForm"]["Phone"].value;
                
             var sp = sh.shops;
             var shop = sp.next();
             var shops = [];
          
             while (shop.done !== true){
                  shops.push(shop.value);
                  shop = sp.next();
             }

             if (cif == "" || cifId == ""){
                  throw new EmptyValueException();
             } else {
                  index = shops.findIndex(compareElements);

                  if (index != -1){
                        shops[index].cif = cif;
                        shops[index].name = name;
                        shops[index].direction = direction;
                        shops[index].phone = phone;
                  } else {
                        throw new ShopNotExistsException();
                  }
             } 
      }  
}


function delShopForm(){
        return function (){
            var divForm = document.getElementById("sct1");
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
                
            var dv = document.createElement("div");
            dv.setAttribute("class", "form-group");
                
            var label = document.createElement("label");
            label.setAttribute("class", "control-label col-sm-2");
            label.appendChild(document.createTextNode("CIF de la tienda a eliminar"));
            dv.appendChild(label);
                
            var dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-4");
                
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
            input.setAttribute("name", "cifId");
                
            dv1.appendChild(input);
            dv.appendChild(dv1);
            form.appendChild(dv);
           
            dv = document.createElement("div");
            dv.setAttribute("class", "form-group");

            dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-offset-5");

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("Enviar"));
            a.setAttribute("class", "btn btn-default");
            a.addEventListener("click", delShop());
          
            dv1.appendChild(a);
            dv.appendChild(dv1);
            form.appendChild(dv);
                
            divForm.appendChild(form);
        }
}

function delShop(){
    return function (){
        function compareElements(element){
             return (element.cif == cifId)
        }
            
        var cifId = document.forms["catForm"]["cifId"].value;
                
        var sp = sh.shops;
        var shop = sp.next();
        var shops = [];
          
        while (shop.done !== true){
             shops.push(shop.value);
             shop = sp.next();
        }
    
        if (cifId == ""){
            throw new EmptyValueException();
        } else {
            index = shops.findIndex(compareElements);
                
            if (index != -1){
                sh.removeShop(shops[index]);
                
            } else {
                 throw new ShopNotExistsException();
            }
        }
    }   
}

function addProForm(){
       return function (){
            var divForm = document.getElementById("sct1");
            var elements = ["SerialNumber", "Name", "Description", "Price", "Tax"];
                
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
                
            generalShopForm(form, elements);
           
            dv = document.createElement("div");
            dv.setAttribute("class", "form-group");

            dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-offset-5");

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("Enviar"));
            a.setAttribute("class", "btn btn-default");
            a.addEventListener("click", addPro());   

            dv1.appendChild(a);
            dv.appendChild(dv1);
            form.appendChild(dv);
                
            divForm.appendChild(form);
      }
}

function addPro(){
      return function (){
            var serial = parseInt(document.forms["catForm"]["SerialNumber"].value);
            var name = document.forms["catForm"]["Name"].value;
            var description = document.forms["catForm"]["Description"].value;
            var price = parseInt(document.forms["catForm"]["Price"].value);
            var tax = document.forms["catForm"]["Tax"].value;
             
            if (serial == "" || name == ""){
                 throw new EmptyValueException();
            } else {
                 var pro = new Product(serial, name, price);
                 pro.description = description;
                 pro.tax = tax;
                 console.log(sh.defaultCategory);
                 sh.addProduct(pro, sh.defaultCategory);
            }
      }
}

function delProForm(){
       return function (){
            var divForm = document.getElementById("sct1");
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
                
            var dv = document.createElement("div");
            dv.setAttribute("class", "form-group");
                
            var label = document.createElement("label");
            label.setAttribute("class", "control-label col-sm-2");
            label.appendChild(document.createTextNode("SerialNumber del producto a eliminar"));
            dv.appendChild(label);
                
            var dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-4");
                
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
            input.setAttribute("name", "serial");
                
            dv1.appendChild(input);
            dv.appendChild(dv1);
            form.appendChild(dv);
           
            dv = document.createElement("div");
            dv.setAttribute("class", "form-group");

            dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-offset-5");

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("Enviar"));
            a.setAttribute("class", "btn btn-default");
            a.addEventListener("click", delPro());
          
            dv1.appendChild(a);
            dv.appendChild(dv1);
            form.appendChild(dv);
                
            divForm.appendChild(form);
      }
}

function delPro(){
    return function (){
        function compareElements(element){
             return (element.serialNumber == serial)
        }
            
        var serial = document.forms["catForm"]["serial"].value;

    
        if (serial == ""){
            throw new EmptyValueException();
        } else {
            index = sh.products.findIndex(compareElements);
                
            if (index != -1){
                sh.removeProduct(sh.products[index]);
            }else{
                throw new ProductNotExistsException("Product "+serial);
            }
        }
    }   
}

function sesionForm(){
     return function (){
        
            var divForm = document.getElementById("sct1");
          
            removeChildsElement(divForm);
                
            var form = document.createElement("form");
            form.setAttribute("name", "catForm");
            form.setAttribute("class", "form-horizontal");
                
            var dv = document.createElement("div");
            dv.setAttribute("class", "form-group");
                
            var label = document.createElement("label");
            label.setAttribute("class", "control-label col-sm-2");
            label.appendChild(document.createTextNode("User"));
            dv.appendChild(label);
                
            var dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-4");
                
            var input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
            input.setAttribute("name", "user");
                
            dv1.appendChild(input);
            dv.appendChild(dv1);
            form.appendChild(dv);
   
           
            dv = document.createElement("div");
            dv.setAttribute("class", "form-group");
                
            label = document.createElement("label");
            label.setAttribute("class", "control-label col-sm-2");
            label.appendChild(document.createTextNode("Password"));
            dv.appendChild(label);
                
            dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-4");
                
            input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("class", "form-control");
            input.setAttribute("name", "pass");
                
            dv1.appendChild(input);
            dv.appendChild(dv1);
            form.appendChild(dv);
         
         
            dv = document.createElement("div");
            dv.setAttribute("class", "form-group");

            dv1 = document.createElement("div");
            dv1.setAttribute("class", "col-sm-offset-5");

            var a = document.createElement("a");
            a.appendChild(document.createTextNode("Enviar"));
            a.setAttribute("class", "btn btn-default");
            a.addEventListener("click", sesion());
          
            dv1.appendChild(a);
            dv.appendChild(dv1);
            form.appendChild(dv);
                
            divForm.appendChild(form);
      }
}

function sesion(){
     return function (){
          var user = document.forms["catForm"]["user"].value;
          var pass = document.forms["catForm"]["pass"].value;
         
          if (user === "prueba" && pass === "prueba"){
              document.cookie = "username=prueba";
              console.log(document.cookie);
          }
     }
}
