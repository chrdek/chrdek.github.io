window.onload = function (){
document.getElementById('timeDisplay').innerHTML = ` Latest updates on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`;
}