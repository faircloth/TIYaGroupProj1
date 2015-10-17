"use strict";

(function () {

  console.log('It Works!');

  let tagSearch = "fine+dining";
  let flickrURL = 'https://api.flickr.com/services/rest?method=flickr.photos.search&tags='+ tagSearch + '&format=json&nojsoncallback=1&api_key=ba1b9d0f8d9ba8dc20eadd024c969c34';
  let menuURL = 'https://json-data.herokuapp.com/restaurant/menu/1';
  let newsURL = 'https://json-data.herokuapp.com/restaurant/news/1';
  let specialURL = 'https://json-data.herokuapp.com/restaurant/special/1';

  let newsPromise = $.getJSON(newsURL);


  newsPromise.then(function (newsResponse) {
    $('.newsTitle').append(newsResponse.title);
  });

  newsPromise.then(function (newsResponse) {
    $('.newsPost').append(newsResponse.post);
  });


  let menuPromise = $.getJSON(menuURL);
  let specialPromise = $.getJSON(specialURL);


// menu Sections
  menuPromise.then(function(menuResponse) {
    console.log(menuResponse);
    
// Specials section
    // specialPromise.then(function (specialResponse) {
    //   let specialItemId = _.values(_.pick(specialResponse,'menu_item_id'));
    //   let specialItemIdValue = _.first(specialItemId);
    // });
    
    let menuSections = _.keys(menuResponse);
    let arrayofArrays = _.values(menuResponse);

    let appetizers = _.pick(menuResponse, 'appetizers');
    console.log(appetizers);

    let entrees = _.pick(menuResponse, 'entrees');
    console.log(entrees);

    let sides = _.pick(menuResponse, 'sides');
    console.log(sides);

    _.each(appetizers, function (object) {
      let appTemplateString = $('#appetizers').text();
      let renderApps = _.template(appTemplateString);
      let appHTML = renderApps(object);
      $('.appetizers').append(appHTML);

        // if (object.allergy > 0) {
        //   $('.icons').addClass($('showAllergy'));
        // };

        // if (object.favorite > 0) {
        //   $('.icons').addClass($('showFavorite'))
        // };

        // if (object.spicy > 0) {
        //   $('.icons').addClass($('showSpicy'));
        // };

        // if (object.vegan > 0) {
        //   $('.icons').addClass($('showVegan'));
        // };
    });

    _.each(entrees, function (object) {
      let entreesTemplateString = $('#entrees').text();
      let renderApps = _.template(entreesTemplateString);
      let entreeHTML = renderApps(object);
      $('.entrees').append(entreeHTML);
    });

    _.each(sides, function(object) {
      let sidesTemplateString = $('#sides').text();
      let renderApps = _.template(sidesTemplateString);
      let sidesHTML = renderApps(object);
      $('.sides').append(sidesHTML);
    });

  });


let flickrPromise = $.getJSON(flickrURL); 

  flickrPromise.then( function (flickrResponse) {
    let arrayOfPhotoObjects   = flickrResponse.photos.photo;
    let numberOfImages        = 5;
    let sampleOfPhotoObjects = _.sample(arrayOfPhotoObjects, numberOfImages);
    _.each ( sampleOfPhotoObjects, function (photo) {
      console.log("https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
      $('.imagesClass').append("https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
    });
  });


}());
