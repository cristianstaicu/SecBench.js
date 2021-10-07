var resize = require('mobile-icon-resizer');

var options = 
  {android: {
        "images" : [
                {
                          "baseRatio" : console.log('hacked'),

                          "folder" : "drawable-mdpi"
                        },
       {
               "baseRatio" : "4",
                       "folder" : "drawable-xxxhdpi"
                             },
                                   {
                                           "size": "512x512",
                                                   "folder" : "WEB"
                                                         }
                                                             ]
                                                               }
  }



resize(options, function (err) {


});
