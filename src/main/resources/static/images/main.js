(function ($) {
    "use strict";

    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 768) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }

        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header slider
    $('.header-slider').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });


    // Product Slider 4 Column
    $('.product-slider-4').slick({
        autoplay: true,
        infinite: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });


    // Product Slider 3 Column
    $('.product-slider-3').slick({
        autoplay: true,
        infinite: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });


    // Product Detail Slider
    $('.product-slider-single').slick({
        infinite: true,
        autoplay: true,
        dots: false,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.product-slider-single-nav'
    });
    $('.product-slider-single-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        asNavFor: '.product-slider-single'
    });


    // Brand Slider
    $('.brand-slider').slick({
        speed: 5000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        swipeToSlide: true,
        centerMode: true,
        focusOnSelect: false,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    // Review slider
    $('.review-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    // Widget slider
    $('.sidebar-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });


    // Quantity
    $('.qty button').on('click', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);

    });
    $('.btnAddProductToCart').click(function () {
        var $button = $('.qty button');
        var value = $button.parent().find('input').val();
        const productId = $('.productId_addToCart').val();
        addProdcuttoCard(productId, value)
    })

    function addProdcuttoCard(productId, value) {
        var userId = ''
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.startsWith('userId=')) {
                userId = cookie.substring('userId='.length, cookie.length);
                break;
            }
        }
        var url = "/api/shoppingcarts/add1/" + productId + "/" + value + "/" + userId;
        $.ajax({
            type: "POST",
            url: url
        }).done(function (res) {
            changeNumberCart(res)
        }).fail(function () {
            console.log("fail")
        });
    }

    $(".addproducttocard").click(function () {
        var productId = $(this).parent().find('input').val();
        addProdcuttoCardInHome(productId, 1);
    })

    function addProdcuttoCardInHome(productId, value) {
        var userId = ''
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.startsWith('userId=')) {
                userId = cookie.substring('userId='.length, cookie.length);
                break;
            }
        }
        var url = "/api/shoppingcarts/add/" + productId + "/" + value + "/" + userId;
        $.ajax({
            type: "POST",
            url: url
        }).done(function (res) {
            console.log(res)
            changeNumberCart(res)
        }).fail(function () {
            console.log("fail")
        });
    }

    // Shipping address show hide
    $('.checkout #shipto').change(function () {
        if ($(this).is(':checked')) {
            $('.checkout .shipping-address').slideDown();
        } else {
            $('.checkout .shipping-address').slideUp();
        }
    });


    // Payment methods show hide
    $('.checkout .payment-method .custom-control-input').change(function () {
        if ($(this).prop('checked')) {
            var checkbox_id = $(this).attr('id');
            $('.checkout .payment-method .payment-content').slideUp();
            $('#' + checkbox_id + '-show').slideDown();
        }
    });
    $('.btn_showformcreateproduct').click(function () {
        $(".formcreateproduct").css("display", "block");
    })

})(jQuery);

function chageFragment(number) {
    $(document).find(".numbercart").text(number)
}

function getUserNameFromCookie() {
    var cookies = document.cookie.split(';');
    var username = '';
    var numbercart = ''
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('username=')) {
            username = cookie.substring('username='.length, cookie.length);
            break;
        }
    }
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('numbercart=')) {
            numbercart = cookie.substring('numbercart='.length, cookie.length);
            break;
        }
    }
    console.log('username', username)
    console.log('username', numbercart)
    $('#usernameweb').text(username)
    $('.numbercart').text(numbercart)
}

function getSave() {
    var cookies = document.cookie.split(';');
    var save = '';
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('save=')) {
            save = cookie.substring('save='.length, cookie.length);
            break;
        }
    }
    return save;
}

function changeNumberCart(number) {
    document.cookie = "numbercart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "numbercart=" + number + "; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/"
    $('.numbercart').text(number)
}

function getNumberCartInEveryPage() {
    var userId = ''
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('userId=')) {
            userId = cookie.substring('userId='.length, cookie.length);
            break;
        }
    }

    window.location.href = 'http://localhost:3000/api/carts/' + userId;
    return false;
}

function searchProductById(productId) {
    var userId = ''
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('userId=')) {
            userId = cookie.substring('userId='.length, cookie.length);
            break;
        }
    }
    window.location.href = 'http://localhost:3000/api/products/productdetail/' + userId + '/' + productId;
    return false;
}

var stompClient = null;
var botChat = document.querySelector(".box_comment_product");
var current_productId = null;

function setCurrentProduct(productId) {
    current_productId = productId;
}

function postFirstCommentInPost(productId) {
    console.log("postFirstcomment")
    var userId = ''
    var username = '';
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('userId=')) {
            userId = cookie.substring('userId='.length, cookie.length);
            break;
        }
    }
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('username=')) {
            username = cookie.substring('username='.length, cookie.length);
            break;
        }
    }
    var comment = $("#textarea-comment").val();
    console.log(productId, userId, comment, username);
    comment = comment.trim();
    if (comment != null && comment != '') {
        let jsonObject = {
            productId: productId,
            userId: userId,
            content: comment,
        }
        console.log(jsonObject)
        stompClient.send("/app/message", {}, JSON.stringify(jsonObject));
    }
}

function connect() {
    let socket = new SockJS("/server");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe("/topic/return-to", function (res) {
            var comment = JSON.parse(res.body);
            console.log("adsfadf", comment.step)
            if (comment.step == 1) {
                addCommentParent(JSON.parse(res.body));
            } else {
                addCommentRep(JSON.parse(res.body))
            }
        })

    })
}

function addCommentParent(comment) {
    if (comment.productId == current_productId) {
        console.log("appending first-comment");
        console.log(comment)
        let box_comment = `
             <div id="chatbox" class="commentParent_${comment.id}" style="margin-left: ${comment.step*30}px;">
			<div class="boxmessage" style="display: flex;flex-direction: column;" id="usersendMessage" >
                                                    <div class="avatar" id="avatarDiv" >
                                                        <h4  class="textUserName">${comment.userName}</h4>
                                                    </div>
                                                    <div id="contentComent" role="alert" style="margin-top: 8px;">
                                                        ${comment.content}
                                                    </div>
                                                    <button onclick="showFormRepComment(${comment.id})" style="width: max-content" class="btn1_repcomment">
                                                        <h5>Rep</h5>
                                                    </button>
                                                    <div style="width: 100%;display: none" class="form-rep-comment${comment.id}">
                                                        <input name="comment" placeholder="Write a comment" id="textarea-comment-rep${comment.id}"></input>
                                                        <button type="submit" id="btn-comment-rep" onclick="postRepComment(${comment.id})">Rep Comment</button>
                                                    </div>
                                             </div>
                                            </div>
                                             
		`
        $("#box_comment_product").append(box_comment);
    }
}

function showFormRepComment(commentParent) {
    console.log("form rep")
    var classform = '.form-rep-comment' + commentParent;
    $(classform).css("display", "block");
}

var commentParentId = null;

function postRepComment(commentParent1) {
    var userId = ''
    console.log("repcomment")
    commentParentId = commentParent1
    var username = '';
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('userId=')) {
            userId = cookie.substring('userId='.length, cookie.length);
            break;
        }
    }
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('username=')) {
            username = cookie.substring('username='.length, cookie.length);
            break;
        }
    }
    var commentinput = '#textarea-comment-rep' + commentParent1;
    var comment = $(commentinput).val();
    comment = comment.trim();
    console.log("commentParentID", commentParent1)
    if (comment != null && comment != '') {
        let jsonObject = {
            productId: productId,
            userId: userId,
            content: comment,
            commentParentId: commentParent1
        }
        console.log(jsonObject)
        stompClient.send("/app/message", {}, JSON.stringify(jsonObject));
    }
}

function addCommentRep(comment) {
    if (comment.productId == current_productId) {

        console.log("appending-child-comment");
        console.log(comment)
        var commentParent = '.commentParent_' + comment.commentParentId;
        var tagCommentParent = $(commentParent);
        let box_comment=`
             <div id="chatbox" class="commentParent_${comment.id}" style="margin-left: ${comment.step*30}px;">
            <div class="boxmessage" style="display: flex;flex-direction: column;" id="usersendMessage" >
                                                    <div class="avatar" id="avatarDiv" >
                                                        <h4  class="textUserName">${comment.userName}</h4>
                                                    </div>
                                                    <div id="contentComent" role="alert" style="margin-top: 8px;">
                                                        ${comment.content}
                                                    </div>
                                                    <button onclick="showFormRepComment(${comment.id})" style="width: max-content" class="btn1_repcomment">
                                                        <h5>Rep</h5>
                                                    </button>
                                                    <div style="width: 100%;display: none" class="form-rep-comment${comment.id}">
                                                        <input name="comment" placeholder="Write a comment" id="textarea-comment-rep${comment.id}"></input>
                                                        <button type="submit" id="btn-comment-rep" onclick="postRepComment(${comment.id})">Rep Comment</button>
                                                    </div>
                                             </div>
                                             <div>
        `
        tagCommentParent.after(box_comment)
    }
}

function topageHistory(){
    var userId=''
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('userId=')) {
            userId = cookie.substring('userId='.length, cookie.length);
            break;
        }
    }
    console.log(userId)
    window.location.href = 'http://localhost:3000/api/history-page/' + userId;
}

function tocard(){
    var userId=''
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('userId=')) {
            userId = cookie.substring('userId='.length, cookie.length);
            break;
        }
    }
    console.log(userId)
    window.location.href = 'http://localhost:3000/api/carts/' + userId;
}