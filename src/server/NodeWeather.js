
http = require('http')
;

//
var NodeWeather = function(){};
//

/**
 * Gets a forecast.
 * @param  {String} state   Case sensitive. E.g. "New York".
 * @param  {String} country Country code. E.g. "us".
 * @return {JSON}           Weather response.
 */
NodeWeather.prototype.getForecast = function( state, country, next ) {
    
    var url = 'http://api.openweathermap.org/data/2.5/forecast?q='
        + encodeURIComponent( state )
        + ',' + country + '&mode=json';
    
    http
        .get( url, function( res ) {
            
            var body = '';
            
            res.on( 'data', function( chunk ) {
                body += chunk;
            });
            
            res.on( 'end', function() {
                next( false, JSON.parse( body ) );
            });
            
        })
        .on( 'error', function( e ) {
            next( e );
        })
    ;
    
};


//
module.exports = NodeWeather;