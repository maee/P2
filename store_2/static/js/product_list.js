/**
 * Created by Maee on 12/27/13.
 */
var article = document.getElementById('article');
var slider = document.getElementById('slider');
var search = document.getElementById('search');
var cart = document.getElementById('cart');
var pannel = document.getElementById('pannel');
var c = 0;

var but = document.getElementsByClassName("buyButton")
for(var i = 0; i < but.length; i = i + 1){
    but[i].onclick = function(){
        buy(this.parentNode.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML,
            this.parentNode.getElementsByTagName("div")[0].getElementsByTagName("p")[1].innerHTML.substr(6));
    };
}
/*var sliders = document.getElementById("SliderName_2Description");
sliders.onclick = function(){
    show_product("maee", "1000", "amir", "model");
};*/

var search_button = document.getElementById("searchBtn");
search_button.onclick = product_list;

var content = document.getElementsByClassName("product_content");
for(var i = 0; i < content.length; i += 1){
    content[i].onclick = function(){
        show_product(this.getElementsByTagName("p")[0].innerHTML,
            this.getElementsByTagName("p")[1].innerHTML,
            this.getElementsByTagName("p")[2].innerHTML,
            this.getElementsByTagName("p")[3].innerHTML,
            this.getElementsByTagName("img")[0].src);
    };
}

var li = document.getElementsByTagName("li");
for(var i = 0; i < li.length; i = i + 1){
    li[i].onclick = product_list;
}

var body = document.getElementsByTagName("body")[0];
body.onload = loadFunction();

function loadFunction(){
    //alert("hello")
    //alert(localStorage.valueOf())
    for(var i = 0; i < localStorage.length; i += 1){
        //showProductOnCart(localStorage.value(i).split(":")[0], localStorage.value(i).split(":")[1])
    }
}

function product_list(){
    //=============================== removing all children of article ===============>
    while(article.hasChildNodes()){
        article.removeChild(article.firstChild);
    }
    //========================== append search box to article ========================>
    article.appendChild(search);
    article.appendChild(cart);
    article.appendChild(pannel);

    //========================== add headr div =======================================>
    var mother3_div = document.createElement("div");
    mother3_div.setAttribute("id", "inContentArticle");
    mother3_div.style.color = 'yellow';
    article.appendChild(mother3_div);

    var div = document.createElement("div");
    div.setAttribute('class', 'header');
    //========================== add content of headr ================================>
    var p_head = document.createElement("p");
    p_head.setAttribute("class", "fatext_head");

    var ifsearch = "";
    var category;
    if(this.id === "searchBtn"){
        alert(document.getElementById("frst_select").value)
        p_head.innerHTML = document.getElementById("textInput").value;
        ifsearch = document.getElementById("textInput").value;
        category = document.getElementById("frst_select").value;
    }
    else{
        p_head.innerHTML = this.firstElementChild.innerHTML;
        category = this.firstElementChild.innerHTML;
    }

    div.appendChild(p_head);

    mother3_div.appendChild(div);
    //========================== sending request for getting list of products ========>
    var ajaxData2 = {
        "category": category,
        "search": ifsearch,
        "pageSize": 12
    }
    $.ajax({
        url: "/store/product/list/",
        type: 'get',
        dataType: 'json',
        data: ajaxData2,
        success: function(data, status, xhr){
            if (data.result == 0){
                alert("error");
            }
            // ============ list gotten successfully ==================================>
            else{
                //alert("success")
                //========= now process and show the list =============================>
                if(data.productList.length == 0){
                    var div = document.createElement("div");
                    div.setAttribute("class", "fatext2 header");
                    div.style.color = 'white';
                    div.innerHTML = "هیچ موردی یافت نشد"

                    mother3_div.appendChild(div);
                }

                for(var u = 0; u < data.productList.length; u = u + 1){
                    //===== for each product, we have a div_content ===================>
                    var div_1 = document.createElement("div");
                    //div_1.setAttribute('class', 'content');
                    div_1.style.cursor = 'pointer';

                    div_1.data = data.productList[u];

                    article.appendChild(mother3_div)

                    //===== for each product, we have an image ========================>
                    var img = document.createElement("img");
                    img.src = data.productList[u].pic;
                    img.setAttribute("class", "m_img");
                    div_1.appendChild(img);

                    //===== for each product, we have name, parice, category ==========>
                    var p1 = document.createElement("p");
                    var p2 = document.createElement("p");
                    var p3 = document.createElement("p");
                    var p4 = document.createElement("p");

                    p1.setAttribute("class", "fatext2");
                    p2.setAttribute("class", "fatext2");
                    p3.setAttribute("class", "fatext2");
                    p4.setAttribute("class", "fatext2");

                    p1.innerHTML = data.productList[u].name;
                    p2.innerHTML = "قیمت: " + data.productList[u].price + " تومان";
                    p3.innerHTML = "دسته: " + data.productList[u].category;
                    p4.innerHTML = data.productList[u].description;

                    p4.hidden = "hidden";

                    div_1.appendChild(p1);
                    div_1.appendChild(p2);
                    div_1.appendChild(p3);
                    div_1.appendChild(p4);

                    var div_2 = document.createElement("div");
                    div_2.setAttribute("class", "content");

                    //===== for each product, we have a button to buy =================>
                    var button = document.createElement("button");
                    button.setAttribute("class", "buyButton fatext btn btn-primary btn-wide");
                    button.innerHTML = "اضافه به سبد خرید";
                    button.data = data.productList[u];

                    button.onclick = function() {
                        buy(this.parentNode.getElementsByTagName("p")[0].innerHTML,
                            this.parentNode.getElementsByTagName("p")[1].innerHTML.substr(6));
                    }

                    div_2.appendChild(div_1);
                    div_2.appendChild(button);
                    mother3_div.appendChild(div_2);

                    //====== go to the page of product specification ==================>
                    div_1.onclick = function(){
                        show_product(this.parentNode.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerHTML,
                            this.parentNode.getElementsByTagName("div")[0].getElementsByTagName("p")[1].innerHTML,
                            this.parentNode.getElementsByTagName("div")[0].getElementsByTagName("p")[2].innerHTML,
                            this.parentNode.getElementsByTagName("div")[0].getElementsByTagName("p")[3].innerHTML,
                            this.getElementsByTagName("img")[0].src);
                    };
                }

                //========== add pagination ===========================================>
                $(function(data) {
                    var pagin = document.createElement("div");
                    pagin.setAttribute("class", "pagin");
                    article.appendChild(pagin);
                    $(pagin).pagination({
                        items: data.totalResults,
                        itemsOnPage: data.pagesSize,
                        cssStyle: 'light-theme'
                    });
                });
                //======================================================================>
            }
        }
    });

}

function buy(name, price) {
    //============================== first showing to the user ===========================================================================>
    showProductOnCart(name, price);
}

function showProductOnCart(name, price){
   /* p_all = document.getElementsByTagName("p");
    for(var i = 0; i < p_all.length; i = i + 1){
        //alert(p_all[i].parentNode.nodeName)
        if(p_all[i].parentNode.id === "my_pannel"){
            alert("true")
            if(p_all[i].name === "name"){
                p_all[i].num += 1;
            }
        }
    }*/
    //var pannel = document.getElementById("pannel");
    var button = document.createElement("button");
    button.setAttribute("class", "omit");

    var img = document.createElement("img");
    img.setAttribute("src", "../static/image/hazf.jpg");
    img.setAttribute("class", "omit_pic");
    button.appendChild(img);

    button.onclick = function(){omitCart(name)};

    pannel.appendChild(button);

    var p = document.createElement("p");
    p.setAttribute("class", "fatext2");
    p.name = name;
    p.num = 1;
    p.innerHTML = name + ": " + price

    if (typeof(Storage)!=="undefined"){
        localStorage.setItem(c, p.innerHTML);
        c++;
    }
    pannel.appendChild(p);
    //pannel.id = "my_pannel"
    //alert(p.parentNode.nodeName)
}

function omitCart(name){
    removeData(name);
}

function removeData(name){
    for(var i = 0; i < pannel.childNodes.length; i = i + 1){
        if(pannel.childNodes[i].nodeName == "P"){
            if(pannel.childNodes[i].name == name){
                pannel.removeChild(pannel.childNodes[i]);
                pannel.removeChild(pannel.childNodes[i-1]);
                break;
            }
        }
    }
}

function show_product(name, price, cat, desc, picUrl){
    //=========== removing all children of article ================>
    while(article.hasChildNodes()){
        article.removeChild(article.firstChild);
    }
    //=========== add search box and inContent div ================>
    article.appendChild(search);
    article.appendChild(cart);
    article.appendChild(pannel);

    var mother3_div = document.createElement("div");
    mother3_div.setAttribute("id", "inContentArticle");
    article.appendChild(mother3_div);


    //=========== add main_div and its contents ===================>
    var main_div = document.createElement("div");
    main_div.setAttribute("class", "main_div");
    main_div.style.color = "gray";

    var img_div = document.createElement("div");
    img_div.setAttribute("class", "img");

    var img = document.createElement("img");
    img.setAttribute("src", picUrl);
    img_div.appendChild(img);

    var butn = document.createElement("button");
    butn.setAttribute("class", "buyButton fatext btn btn-primary btn-wide");
    butn.innerHTML = "اضافه به سبد خرید";

    var name = name;
    var price = price;

    butn.onclick = function() {

        buy(name, price);
    }
    img_div.appendChild(butn);
    main_div.appendChild(img_div);

    var dscp = document.createElement("div");
    dscp.setAttribute("class", "dscp");

    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");

    p1.setAttribute("class", "fatext2");
    p2.setAttribute("class", "fatext2");
    p3.setAttribute("class", "fatext2");
    p4.setAttribute("class", "fatext2");

    p1.innerHTML = "نام :" + name;
    p2.innerHTML = cat;
    p3.innerHTML = price;
    p4.innerHTML = "توضیح :" + desc;

    dscp.appendChild(p1);
    dscp.appendChild(p2);
    dscp.appendChild(p3);
    dscp.appendChild(p4);

    main_div.appendChild(dscp);

    var relative = document.createElement("div");
    relative.setAttribute("class", "relative");
    var p = document.createElement("p");
    p.setAttribute("class", "fatext");
    p.innerHTML = "محصولات مرتبط";
    relative.appendChild(p);

    main_div.appendChild(relative);
    mother3_div.appendChild(main_div);
    //============ end of adding content of main_div ==============>
}















