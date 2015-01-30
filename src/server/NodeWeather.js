
http = require('http')
;

//
var NodeWeather = function(){};
//


/*
Call by city name in XML format api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml
Call by geographic coordinates in JSON format api.openweathermap.org/data/2.5/forecast?lat=35&lon=139
Call by city ID api.openweathermap.org/data/2.5/forecast?id=524901
*/

NodeWeather.prototype.getFileHTTP = function( url, next ) {
    http.get( url, function( res ) {
        
        var body = '';
        
        res.on( 'data', function( chunk ) {
            body += chunk;
        });
        
        res.on( 'end', function() {
            next( false, JSON.parse( body ) );
        });
        
    }).on( 'error', function( e ) {
        next( e );
    });
}

/**
 * Gets a forecast.
 * @param  {String} state   Case sensitive. E.g. "New York".
 * @param  {String} country Country code. E.g. "us".
 * @return {JSON}           Weather response.
 */
NodeWeather.prototype.getForecastByName = function( state, country, next ) {
    var url = 'http://api.openweathermap.org/data/2.5/forecast?q='
        + encodeURIComponent( state )
        + ',' + country + '&mode=json';
    this.getFileHTTP( url, next );
};

/**
 * Gets a forecast.
 * @return {JSON}           Weather response.
 */
NodeWeather.prototype.getForecastByLocation = function( lat, lng, next ) {
    var url = 'http://api.openweathermap.org/data/2.5/forecast?q='
        + 'lat=' + lat + '&lon=' + lng + '&mode=json';
    this.getFileHTTP( url, next );
};


//
module.exports = NodeWeather;