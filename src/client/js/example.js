
var windowOnLoadOriginal = window.onload;

window.onload = function() {
    
    var button = document.querySelector('#get-forecast');
    button.onclick = function(e) {
        
        var ipc = require('ipc');
        
        ipc.on( 'asynchronous-reply', function( arg ) {
            if ( arg.error ) {
                alert( arg.error );
                return false;
            }
            alert( arg.list[0].weather[0].description );
        });
        
        ipc.send( 'asynchronous-message', 'get-forecast' );
        
        return false;
    };
    
    windowOnLoadOriginal();
    
};