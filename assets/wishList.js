

$(".wishListIconContainer").on("change", function(){
   
});
$(".wishListIconContainer, .removeWishListItem").on("click", function(){

    var fullHeart = $(this).hasClass("fullHeart");
    var emptyHeart = $(this).hasClass("emptyHeart");
    
    if (fullHeart == true){
        $(this).attr("data-wishListBool", true);
    }

    if(emptyHeart == true){
        $(this).attr("data-wishListBool", false);
    }

    var productID = $(this).attr("data-productid");
    var wishListBool = $(this).attr("data-wishListBool");
    var customerID = $(this).attr("data-customerid");
    const data = {
        productID: productID,
        wishListBool: wishListBool,
        customerID: customerID
    }

    console.log(data)


    
    
    fetch(" https://shopify.gingerfox.co.uk/api/shopify/update-customer-wishlist", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
        var jsonData = JSON.parse(data);
        console.log(jsonData.success)
        if (jsonData.success == true){
            if (wishListBool == "false"){
                $(this).removeClass("emptyHeart");
                $(this).addClass("fullHeart");
                $(".wishlistPopupContainer").css("display", "flex");
                $("#wishlistPopupImage").attr("src", jsonData.data.productImage)
                $("#wishlistPopupText").html("<b>" + jsonData.data.productName + "</b> has been added to your wish list.")
                setTimeout(function(){
                    $(".wishlistPopupContainer").fadeOut();
                }, 2000)
            }
            else{
                $(this).removeClass("fullHeart");
                $(this).addClass("emptyHeart");
                $(".wishlistPopupContainer").css("display", "flex");
                $("#wishlistPopupImage").attr("src", jsonData.data.productImage)
                $("#wishlistPopupText").html("<b>" + jsonData.data.productName + "</b> has been removed from your wish list.")
                setTimeout(function(){
                    $(".wishlistPopupContainer").fadeOut();
                }, 2000)
            }
        }
         if (data.error == true){
            console.log(data.error)
         }
        

        if (window.location.pathname == "/pages/account-wishlist"){
            // $(".loading").show();
            // $(".invalid-feedback").hide();
            // setTimeout(function(){
            //     $(".loading").hide();
            //     location.reload(true)
            // }, 30000)
           window.location.href = window.location.href
        }
    })
})
