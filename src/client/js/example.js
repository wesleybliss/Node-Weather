
var windowOnLoadOriginal = window.onload;

window.onload = function() {
    
    var button = document.querySelector('#get-forecast');
    button.onclick = function(e) {
        
        var ipc = require('ipc');
        ipc.on( 'asynchronous-reply', function( arg ) {
            alert( arg );
        });
        ipc.send( 'asynchronous-message', 'foo' );
        
        return false;
    };
    
    windowOnLoadOriginal();
    
};