/**
 * Created by Maee on 12/27/13.
 */
var article = document.getElementById('article');
var slider = document.getElementById('slider');
var search = document.getElementById('search');
var cart = document.getElementById('cart');
var pannel = document.getElementById('pannel');

var li = document.getElementsByTagName("li");
for(var i = 0; i < li.length; i = i + 1){
    li[i].onclick = product_list;
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
    article.appendChild(mother3_div);

    var div = document.createElement("div");
    div.setAttribute('class', 'header');
    //========================== add content of headr ================================>
    var p_head = document.createElement("p");
    p_head.setAttribute("class", "fatext_head");
    p_head.innerHTML = this.firstElementChild.innerHTML;
    div.appendChild(p_head);

    mother3_div.appendChild(div);

    //========================== sending request for getting list of products ========>
    var ifsearch;
    if(this.nodeName === "OPTION"){
        ifsearch = this.firstElementChild.innerHTML;

    }
    alert(ifsearch)
    var ajaxData2 = {
        "category": this.id,
        //"search": ifsearch,
        "pageSize": 12
    }
    $.ajax({
        url: "https://localhost:8000/store/product/list/",
        type: 'post',
        dataType: 'json',
        data: ajaxData2,
        success: function(data2, status, xhr){
            if (data2.result == 0){
                alert("error");
            }
            // ============ list gotten successfully ==================================>
            else{
                alert("success")
                //========= now process and show the list =============================>
                if(data2.productList.length == 0){
                    var div = document.createElement("div");
                    div.setAttribute("class", "fatext2 header");
                    div.style.color = 'white';
                    div.innerHTML = "هیچ موردی یافت نشد"

                    mother3_div.appendChild(div);
                }
                for(var u = 0; u < data2.productList.length; u = u + 1){

                    //===== for each product, we have a div_content ===================>
                    var div = document.createElement("div");
                    div.setAttribute('class', 'content');
                    div.style.cursor = 'pointer';
                    div.data = data2.productList[u];
                    mother3_div.appendChild(div);
                    //====== go to the page of product specification ==================>
                    div.onclick = function(){
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

                        var img_div = document.createElement("div");
                        img_div.setAttribute("class", "img");

                        var img = document.createElement("img");
                        img.setAttribute("src", this.data.picUrl);
                        img_div.appendChild(img);

                        var butn = document.createElement("button");
                        butn.setAttribute("class", "fatext btn btn-primary btn-wide");
                        butn.innerHTML = "اضافه به سبد خرید";

                        var name = this.data.name;
                        var price = this.data.price;
                        var id = this.data.id;

                        butn.onclick = function() {
                            buy(name, price, id);
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

                        p1.innerHTML = "نام :" + this.data.name;
                        p2.innerHTML = "دسته :" + this.data.category;
                        p3.innerHTML = "قیمت :" + this.data.price;
                        //p4.innerHTML = "توضیح :" + this.data.description;

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
                }
            }
        }
    });

}














