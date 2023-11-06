$(document).ready(function() {

//retrieve full content etc.
let innerContent = document.all; let textpart = "";
$.each(innerContent, (key,value) => {
textpart += innerContent[key].outerHTML;
 });

//validation on DOM.
(() => {
return (new DOMParser().parseFromString(textpart,'text/xml').documentElement.querySelector('parsererror')) == undefined 
? console.log("DOMContentLoaded produces XTHML valid parts.")
: console.log("DOMContentLoaded XHTML invalid! check file.");
 })(textpart);

});