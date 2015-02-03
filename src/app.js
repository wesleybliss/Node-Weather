var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

var NodeWeather = require('./server/NodeWeather');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

var nodeWeather = new NodeWeather();


/**
 * Workaround for logging to browser console.
 * 
 * @param {browser-window} win, target window to send console log message two.
 * @param {String} msg, the message we are sending.
 */
console.send = function( msg ) {
    mainWindow.webContents.send( 'send-console', msg );
    // mainWindow.webContents.on( 'did-finish-load', function() {
    //     mainWindow.webContents.send( 'send-console', msg );
    // });
};


// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/client/index.html');
    
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});





require('ipc').on( 'asynchronous-message', function( event, arg ) {
    
    console.send( arg );
    
    switch ( arg.action ) {
        
        case 'get-forecast':
            nodeWeather.getForecastByLocation( arg.lat, arg.lng, function( err, res ) {
                if ( err ) {
                    event.sender.send( 'asynchronous-reply', { error: err } );
                    return;
                }
                event.sender.send( 'asynchronous-reply', res );
            });
            break;
        
        default:
            alert( 'unknown command' );
        
    }
    
});