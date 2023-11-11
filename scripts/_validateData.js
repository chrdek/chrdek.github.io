$(document).ready(function() {

//retrieve full content etc.
let innerContent = document.all; let textpart = "";
$.each(innerContent, (key,value) => {
textpart += innerContent[key].outerHTML;
 });

//validations for DOM. xhtml/html etc.
(() => {
return (new DOMParser().parseFromString(textpart,'text/xml').documentElement.querySelector('parsererror')) == undefined 
? console.log("DOMContentLoaded produces XTHML valid parts.")
: console.warn("DOMContentLoaded XHTML invalid! check file.");
 })(textpart);

(() => {
return (new DOMParser().parseFromString(textpart,'text/html').documentElement.querySelector('parsererror')) == undefined 
? console.log("DOMContentLoaded produces HTML valid parts.")
: console.warn("DOMContentLoaded is invalid for HTML - check file.");
 })(textpart);

});