
// @todo This needs to be organized
// @todo Not sure if IPC is a singleton or not

var ipc = require('ipc');
var windowOnLoadOriginal = window.onload;


window.onload = function() {
    
    console.log('hi');
    
    // Make sure the client supports geolocation
    // @todo Fallback with manual input box?
    if ( !navigator.geolocation ) {
        $('#no-location-error').removeClass( 'hidden' );
        return;
    }
    
    ipc.on( 'asynchronous-reply', function( arg ) {
        if ( arg.error ) {
            alert( arg.error );
            return false;
        }
        //alert( arg.list[0].weather[0].description );
        $('#forecast-general').html(
            arg.list[0].weather[0].description +
            ' in ' + arg.city.name
        );
    });
    
    var button = document.querySelector('#get-forecast');
    button.onclick = function(e) {
        getLocation( function( err, pos ) {
            ipc.send( 'asynchronous-message', {
                action: 'get-forecast',
                lat: pos.lat,
                lng: pos.lng
            });
        });
    };
    
    typeof windowOnLoadOriginal == 'function' && windowOnLoadOriginal();
    
};



/**
 * Gets the user's current location.
 * 
 * @param  {Function} done Callback( err, {lat:x, lon:y})
 */
var getLocation = function( done ) {
    navigator.geolocation.getCurrentPosition( function( pos ) {
        done( false, {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        });
    });
};