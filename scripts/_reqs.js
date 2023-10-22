(function() {
 const xhr = new XMLHttpRequest()
 xhr.open( 'POST','http://logs-01.loggly.com/inputs/ab48807b-4cfb-452e-8371-f9eab2134e32/tag/http/');
 xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
 xhr.setRequestHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT');
 xhr.setRequestHeader('Content-type','application/reports+json');
 xhr.setRequestHeader('Reporting-Endpoints','main-endpoint="http://logs-01.loggly.com/inputs/ab48807b-4cfb-452e-8371-f9eab2134e32/tag/http/"');
 xhr.withCredentials = false;
 xhr.onreadystatechange = function() {
    console.log("presetting uri ok")
}
xhr.send(null);
})();