angular.module('starter.services', [])

.factory('placesExplorerService', function($resource) {

  var requestParms = {
    clientId: "W2DSL0SO3R5TG2VZG5A2A20I3LJEGZZR2OCRH0KIDXHKX04X",
    clientSecret: "1BNQUYNUASFOJ34BCLROWAW1KH5SU4FB0XSPAJHBYTEEMR3O",
    version: "20140704",
    token: "EJ5FUSFNIDWYZOEFAJCRRGP2W435TEOVGVWYI4OUJQC1VAJG"
  };

  var requestUri = 'https://api.foursquare.com/v2/venues/:action';

  return $resource(requestUri,
    {
      action: 'explore',
         client_id: requestParms.clientId,
         client_secret: requestParms.clientSecret,
         v: requestParms.version,
         venuePhotos: '1',
         callback: 'JSON_CALLBACK'
    },
    {
      get: { method: 'JSONP' }
    });

});
