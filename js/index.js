function Slider(id){
  var self = this;
  this.id = id;
  this.width = 0;
  this.imageCount = 0;
  this.currentImage = 1;
  this.sliderSelector = $(this.id);
  this.messages = [];
  this.interval = setInterval(function(){self.slide()},3000);;
//Call to initialize the slider
  this.Setup = function(messageArr){
    this.width = $(this.id).width();
    this.imageCount = $(this.id + ' .images li').length;
    this.messages = messageArr;
    //generate the thumbnail images underneath
    $(this.id + ' ul').clone().removeClass("images").appendTo(this.sliderSelector.next());
    //set the css for the ul
    $(this.id + ' .images').css({'list-style': 'none',
                                 'width': this.width * (this.imageCount + 2),
                                 'padding': 0,
                                 'margin-left': '0px' ,
                                 'position': 'relative'});
    //and width for the list item
    $(this.id + ' .images li').css({'width': this.width, "display": "inline-block"});
    //and width of the images
    $(this.id + ' .images li img').css('width', 'inherit');
    //Clone first and last images for smooth looping
    $(this.id + ' .images li').last().clone().prependTo($(this.id + ' .images'));
    $(this.id + ' .images li').eq(1).clone().appendTo($(this.id + ' .images'));
    $(this.id + ' .images li').css({"margin-right": "-5px"});

    //change image when thumbnails are clicked
    this.sliderSelector.next().find("li").on("click", function(event){
      self.setImage($(this).index() + 1);
      clearInterval(self.interval);
      self.interval = window.setInterval(function(){self.slide()},3000);
    });
    this.setImage(this.currentImage);
  }

//Moves directly to given image, no animation
  this.setImage = function(index){
    this.currentImage = index;
    $(this.id + ' .images').css("left", -(this.width * index) + "px");
    $(this.id + ' .img-message ').html("<p>" + this.messages[index-1] + "</p>");
    this.updateThumbnails();
  }

//Update styling of the active thumbnail
  this.updateThumbnails = function(){
    this.sliderSelector.next().find("li").removeClass('active-thumb');

    if (this.currentImage >= $(this.id + ' .images li').length -1){
      this.sliderSelector.next().find("li").eq(0).addClass('active-thumb');
    }
    else if(this.currentImage <= -1){
      this.sliderSelector.next().find("li").eq($(this.id + ' .images li').length - 2).addClass('active-thumb');
    }
    else{
      this.sliderSelector.next().find("li").eq(this.currentImage - 1).addClass('active-thumb');
    }
  }

//Slide to the next image and account for image wrapping
  this.slide = function(){

    //set 1 for forward scrolling, -1 for backward
    this.currentImage += 1;
    //Wrap the image when going beyond last image
     if (this.currentImage >= $(this.id + ' .images li').length){
      this.setImage(1);
      this.slideToImage(2);
      this.updateThumbnails();
    }
    //wrap when going less than first image
    else if(this.currentImage <= -1){
      this.setImage($(this.id + ' .images li').length - 2);
      this.slideToImage($(this.id + ' .images li').length - 3);
      this.updateThumbnails();
    }
    //slide to next as normal
    else{
      this.slideToImage(this.currentImage);
      this.updateThumbnails();
    }
  }

//Moves to given image with animation
  this.slideToImage = function(index){
    this.currentImage = index;
    $(this.id + ' .images').animate({left:-(this.width * index) + "px"}, "slow");

    if (this.currentImage >= $(this.id + ' .images li').length-1){
     $(this.id + ' .img-message p').html("<p>" + this.messages[0] + "</p>");
   }

   else if(this.currentImage <= 0){
     $(this.id + ' .img-message p').html("<p>" + this.messages[this.imageCount - 1] + "</p>");
   }

   else{
     $(this.id + ' .img-message p').html("<p>" + this.messages[index-1] + "</p>");
   }

  }
}

//initialise a slider
var slider1 = new Slider('#slider-1');
slider1.Setup(["Cute Cat",
              "Stupid Cat",
              "Confused Cat",
              "Cool Cat"]);

              var slider2 = new Slider('#slider-2');
              slider2.Setup(["Cup Dog",
                            "Ears Dog",
                            "Car Dog",
                            "Ball Dog",
                            "Angry Dog",
                            "Sleepy Dog"]);
