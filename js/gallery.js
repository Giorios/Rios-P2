// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {

	if(mCurrentIndex >= mImages.length){
		mCurrentIndex = 0;
	}
	if(mCurrentIndex < 0) {
		mCurrentIndex = mImages.length - 1;
	}

	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	document.getElementById('photo').src = mImages[mCurrentIndex].url;
	document.getElementsByClassName('location')[0].innerHTML = "Location: " + mImages[mCurrentIndex].location
	document.getElementsByClassName('description')[0].innerHTML = "Description: " + mImages[mCurrentIndex].description
	document.getElementsByClassName('date')[0].innerHTML = "Date: " + mImages[mCurrentIndex].date
	console.log('swap photo');

	mLastFrameTime = 0
	mCurrentIndex++;
	if (mCurrentIndex == 13){
		mCurrentIndex -= 13
	};
	console.log(mCurrentIndex)
}


// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
 var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	$('#nextPhoto').position({
		my: "right bottom",
		at: "right bottom",
		of: "#nav"
	})

	$('#prevPhoto').click(function(){
		mCurrentIndex-=2;
		swapPhoto();
	})
	$('#nextPhoto').click(function(){
		swapPhoto();
	})
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();

	// CLICK HANDLER
	let moreBtn = $('.moreIndicator')
	moreBtn.click(function(){
		if(moreBtn.hasClass('rot90'))
		{
			moreBtn.removeClass('rot90');
			moreBtn.addClass('rot270');
			$('details').fadeToggle( "slow", "linear" );
		}
		else {
			moreBtn.removeClass('rot270');
			moreBtn.addClass('rot90');
		}
	})
});

window.addEventListener('load', function() {
	
	console.log('window loaded');
	fetchJSON();
}, false);

function GalleryImage() {
	//implement me as an object to hold the following data about an image:
	let location;
	let description;
	let date;
	let url;
}

function fetchJSON()
{
mRequest.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200){
	mJson = JSON.parse(mRequest.responseText);
	iterateJSON()
}
};
mRequest.open("GET", mUrl, true);
mRequest.send();
}

function iterateJSON()
{
	for(let i = 0; i < mJson.images.length; i++)
	{
		mImages[i] = new GalleryImage();
		mImages[i].location = mJson.images[i].imgLocation;
		mImages[i].description = mJson.images[i].description;
		mImages[i].date = mJson.images[i].date;
		mImages[i].url = mJson.images[i].imgPath;
	}
}

function getAllUrlParams(url) {

	var queryString = url ? url.split('=')[1] : window.location.search.slice(1);
	if (queryString = 'index.html?json') {
	$('url').append("=images.json")
	}
  }
  console.log(getAllUrlParams('index.html?json=images-short.json'));

