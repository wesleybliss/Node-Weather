
var windowOnLoadOriginal = window.onload;

window.onload = function() {
    
    var example = document.querySelector('#example');
    example.innerHTML = 'kah!';
    
    windowOnLoadOriginal();
    
};