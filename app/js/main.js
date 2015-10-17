"use strict";

(function () {

  console.log('It Works!');

  var tagSearch = "fine+dining";
  var flickrURL = 'https://api.flickr.com/services/rest?method=flickr.photos.search&tags=' + tagSearch + '&format=json&nojsoncallback=1&api_key=ba1b9d0f8d9ba8dc20eadd024c969c34';
  var menuURL = 'https://json-data.herokuapp.com/restaurant/menu/1';
  var newsURL = 'https://json-data.herokuapp.com/restaurant/news/1';
  var specialURL = 'https://json-data.herokuapp.com/restaurant/special/1';

  var newsPromise = $.getJSON(newsURL);

  newsPromise.then(function (newsResponse) {
    $('.newsTitle').append(newsResponse.title);
  });

  newsPromise.then(function (newsResponse) {
    $('.newsPost').append(newsResponse.post);
  });

  var menuPromise = $.getJSON(menuURL);
  var specialPromise = $.getJSON(specialURL);

  // menu Sections
  menuPromise.then(function (menuResponse) {
    console.log(menuResponse);

    // Specials section
    // specialPromise.then(function (specialResponse) {
    //   let specialItemId = _.values(_.pick(specialResponse,'menu_item_id'));
    //   let specialItemIdValue = _.first(specialItemId);
    // });

    var menuSections = _.keys(menuResponse);
    var arrayofArrays = _.values(menuResponse);

    var appetizers = _.pick(menuResponse, 'appetizers');
    console.log(appetizers);

    var entrees = _.pick(menuResponse, 'entrees');
    console.log(entrees);

    var sides = _.pick(menuResponse, 'sides');
    console.log(sides);

    _.each(appetizers, function (object) {
      var appTemplateString = $('#appetizers').text();
      var renderApps = _.template(appTemplateString);
      var appHTML = renderApps(object);
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
      var entreesTemplateString = $('#entrees').text();
      var renderApps = _.template(entreesTemplateString);
      var entreeHTML = renderApps(object);
      $('.entrees').append(entreeHTML);
    });

    _.each(sides, function (object) {
      var sidesTemplateString = $('#sides').text();
      var renderApps = _.template(sidesTemplateString);
      var sidesHTML = renderApps(object);
      $('.sides').append(sidesHTML);
    });
  });

  var flickrPromise = $.getJSON(flickrURL);

  flickrPromise.then(function (flickrResponse) {
    var arrayOfPhotoObjects = flickrResponse.photos.photo;
    var numberOfImages = 5;
    var sampleOfPhotoObjects = _.sample(arrayOfPhotoObjects, numberOfImages);
    _.each(sampleOfPhotoObjects, function (photo) {
      console.log("https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
      $('.imagesClass').append("https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
    });
  });
})();