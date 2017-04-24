var currentImage = 1;

var Setup = function(){
    var width = $('.slider').width();
    var imageCount = $('.slider .images li').length;
 
    //generate the thumbnail images underneath
 
  $('.slider ul').clone().removeClass("images").appendTo($('.thumbnails'));
  
    //set the css for the ul
    $('.slider .images').css({'list-style': 'none',
                        'width': width * (imageCount + 2),
                        'padding': 0,
                        'margin-left': '0px' ,
                        'position': 'relative'}); 
   //and width for the list item
    $('.slider .images li').css({'width': width, "display": "inline-block"});
   
  //and width of the images
  $('.slider .images li img').css('width', 'inherit');
  

  
  //Clone first and last images for smooth looping
  $('.slider .images li').last().clone().prependTo($('.slider .images'));
  $('.slider .images li').eq(1).clone().appendTo($('.slider .images')); 
  
   $('.slider .images li').css({"margin-right": "-4px"});
  setImage(currentImage);
}

//Sets the displayed image using the number given (no animation) 
var setImage = function(index){
  currentImage = index;
  width = $('.slider').width();
  $('.slider .images').css("left", -(width * index) + "px");
  updateThumbnails();
};

//Animates to the image using the number given
var slideToImage = function(index){
  width = $('.slider').width();
  $('.slider .images').animate({left:-(width * index) + "px"}, "slow");
  currentImage = index;
};

var slide = function(){
  currentImage += -1;
  
  //The if statement accounts for wrapping the image to make loop infinite
   if (currentImage >= $('.slider .images li').length){
    setImage(1);
    slideToImage(2);
     updateThumbnails();
  }
  else if(currentImage <= -1){
    setImage($('.slider .images li').length - 2);
    slideToImage($('.slider .images li').length - 2);
     updateThumbnails();
  }
  else{
    slideToImage(currentImage);
     updateThumbnails();
  }
 
};

var updateThumbnails = function(){
  $('.thumbnails ul li').removeClass('active-thumb');
  
  if (currentImage >= $('.slider .images li').length -1){
    $('.thumbnails ul li').eq(0).addClass('active-thumb');
  }
  else if(currentImage <= -1){
    $('.thumbnails ul li').eq($('.slider .images li').length - 2).addClass('active-thumb');
  } 
  else{
    $('.thumbnails ul li').eq(currentImage - 1).addClass('active-thumb');
  }
}




Setup();
setInterval(function(){slide()},3000);



   $('.thumbnails ul li').mousedown(function(event){
    setImage($(this).index() + 1);
});