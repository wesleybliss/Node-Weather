
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
        $('#forecast-coords').html(
            '<b>Lat:</b> ' + arg.city.coord.lat + '<br/>' +
            '<b>Lng:</b> ' + arg.city.coord.lon
        );
        $('#forecast-general').html(
            arg.list[0].weather[0].description +
            ' in ' + arg.city.name
        );
    });
    
    var button = document.querySelector('#get-forecast');
    button.onclick = function(e) {
        $('#status').html( 'Getting your location...' );
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
    
    // Due to a bug in Atom, we'll have to do this manually for now.
    /*navigator.geolocation.getCurrentPosition( function( pos ) {
        done( false, {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        });
    });*/
    
    var manualGeoLoc = 'https://maps.googleapis.com/maps/api/browserlocation/json?browser=chromium&sensor=true';
    $.getJSON( manualGeoLoc, function( res ) {
        done( false, {
            lat: res.location.lat,
            lng: res.location.lng
        });
    });
    
    /* Example response:
    {
        accuracy: 477,
        location: {
            lat: 40.7229971,
            lng: -74.00062129999999
        },
        status: "OK"
    }*/
    
};