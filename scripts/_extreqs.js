//IIFE start..
(function() {
$(document).ready(function() {

(function() { //only usage for developers 3
    'use strict';
    Object.getOwnPropertyNames(console).filter(function(property) {
        return typeof console[property] == 'function';
    }).forEach(function (verb) {
        console[verb] = function(){return 'Not Allowed';};
    });
    window.addEventListener('devtools-opened', ()=>{
        // do some extra code if needed or ...
        window.location.href+="#";
        window.document.head.innerHTML="";
        window.document.body.innerHTML="what are you doing, contact dev support..";
    });
    window.addEventListener('devtools-closed', ()=>{
        // do some extra code if needed
    });
    let verifyConsole = () => {
        var before = new Date().getTime();
        debugger;
        var after = new Date().getTime();
        if (after - before > 100) { // user had to resume the script manually via opened dev tools 
            window.dispatchEvent(new Event('devtools-opened'));
        }else{
            window.dispatchEvent(new Event('devtools-closed'));
        }
        setTimeout(verifyConsole, 100);
    }
    verifyConsole();        
})();

const url_entries = new Map([
                            [0,"3c76ba350bf9635c6277e5eee8819a8a/"], //ciu xml atom feeds
                            [1,"6c7a4b53475444374b4557584d4e5075/"], //json retrieval feeds
                            [2,"7a39377470574132516d5668636d567949413d3d/"]
                            ]);

const retFullUrl = (byKey) => `https://gist.githubusercontent.com/chrdek/${url_entries.get(byKey)}/raw/`

var typedArray = new Uint8Array((`${url_entries.get(1)}${url_entries.get(2).substr(0,16)}`.replaceAll("/","")).match(/[\da-f]{2}/gi).map(function (h) {
  return parseInt(h, 16)
}));

var trailing = new Uint8Array((`${url_entries.get(2).substr(16,40)}`.replaceAll("/","")).match(/[\da-f]{2}/gi).map(function (h) {
  return parseInt(h, 16)
}));


let rand = (a,b)=> a+(b-a+1)*crypto.getRandomValues(new Uint32Array(1))[0]/2**32|0;
let a="";let kv=rand(0,469);var tot=0;$('li.table-header > div').each((k,v) => {
 $(v).attr("id",'*'.repeat(4)); tot+=($(v).attr('id').length);
});
function setInfo() {
var c="";for (let i=0; i < 11;i++)c+=crypto.randomUUID().replaceAll("-","");
sessionStorage.setItem("str_enc",btoa(c));

sessionStorage.setItem("str_enc",
 sessionStorage.getItem("str_enc").replace(/./g, (c, i) => i == kv? `${(new TextDecoder().decode(typedArray.buffer))}`: c)
 );
}
setInfo();

const isXmlorJs = (res) => {
if (new DOMParser().parseFromString(res,'application/xml').querySelector('parsererror') == undefined)
return 'XML';
if(JSON.stringify(res).match(/(\|{\[){1,}|(\}|\]){1,}/g) != null)
return 'JSON';
}

//Requests section.
var getStart = new Date().getTime();

//initializat. requests for data retrieval.
var reqVector = [
{
    url:(retFullUrl(0) || retFullUrl(1)),
    crossDomain:true,
    cache: false,
    timeout:100000,
    spinner:true,
}];

//NOF12,dev. only
window.oncontextmenu = function () { //1
   return false;
}
document.onkeydown = function (e) {  //2
    if (window.event.keyCode == 123 || e.button==2 || window.event.ctrlKey == true ||window.event.shiftKey == true ||window.event.keyCode == 119 ) 
    return false;
}


//Logging for general website events
 if ('ReportingObserver' in window) {
        const reportingObserver = new ReportingObserver((reports, observer) => {
          for (const report of reports) {
            let rpt_info = report.body;
            const main_setup = {
               url:"https://logs-01.loggly.com/inputs/ab48807b-4cfb-452e-8371-f9eab2134e32/tag/http/",
               cache: false,
               data:JSON.stringify(rpt_info),
               dataType:'json',
               contentType:'application/json; charset=utf-8',
             }
            // Handle the event report
           $.post(main_setup).done(function(data) {
              console.log(data); //logs ok if successful.
           }).fail(function() {
              console.log("failed probably of CORS..");
          });

          }
        }); //end reporting observer..

        // Start observing for reporting events.
        reportingObserver.observe({ types: ['csp-violation','deprecation','crash'] });
      } else {
        console.warn('Reporting is not supported, reports will not be logged.');
      }



function preSelectBg() {
 switch (localStorage.getItem("BG")) {
 case "normal": $("#toggle-button1").addClass("active");
break;
 case "grayeffect": $("#toggle-button2").addClass("active");
break;
 case "wavy-bg": $("#toggle-button3").addClass("active");
break;
 default: $("#toggle-button1").addClass("active"); //empty case, select default bg
break;
 }
}



/*** Additional UI elements ***/
if (localStorage.getItem("BG") == null || localStorage.getItem("BG") == "") {
//$("#toggle-button1").addClass("active");

preSelectBg();
$(".tri-state-toggle-button").click(function(){
  $(".tri-state-toggle-button").removeClass("active");
    var id = $(this).attr('id');
if (id == "toggle-button2") {
$("body").removeClass();
$("#toggle-button2").addClass("active"); 
 $("body").fadeIn(980).addClass("grayeffect");
localStorage.setItem("BG","grayeffect");
}
if (id == "toggle-button1") {
$("#toggle-button1").addClass("active"); 
 $("body").fadeIn(980).removeClass();
localStorage.setItem("BG","normal");
}
if (id == "toggle-button3") {
$("#toggle-button3").addClass("active"); 
$("body").removeClass();
 $("body").fadeIn(980).addClass("wavy-bg");
localStorage.setItem("BG","wavy-bg");
}
    $("#" + id).addClass("active");
});
}
else {
//$("#toggle-button1").addClass("active");

preSelectBg();
$("body").fadeIn(980).addClass(localStorage.getItem("BG"));

$(".tri-state-toggle-button").click(function(){
  $(".tri-state-toggle-button").removeClass("active");
    var id = $(this).attr('id');
if (id == "toggle-button2") {
$("#toggle-button2").addClass("active"); 
$("body").removeClass();
 $("body").fadeIn(980).addClass("grayeffect");
localStorage.setItem("BG","grayeffect");
}
if (id == "toggle-button1") {
$("#toggle-button1").addClass("active"); 
 $("body").fadeIn(980).removeClass();
localStorage.setItem("BG","normal");
}
if (id == "toggle-button3") {
$("#toggle-button3").addClass("active"); 
$("body").removeClass();
 $("body").fadeIn(980).addClass("wavy-bg");
localStorage.setItem("BG","wavy-bg");
}
    $("#" + id).addClass("active");
});

}


/*** PSGallery data section. ***/
$('div.sidebar').append($(`<h3>PSGallery Uploads</h3><hr class="green"/>`)); let psgData = [];

//Retrieve json info here (may contain stale data).
$.get('https://raw.githubusercontent.com/chrdek/chrdek.github.io/gh-pages/data/psgallery.json').then( (jsondata) => {
let PSGInfo = $.parseJSON(jsondata);

$.each(PSGInfo, (key,value) => {
 psgData.push($(`<p><b>${PSGInfo[key].Id}</b></p>
                  <span><b>Type:${PSGInfo[key].ItemType}</b></span>
                 <p><b>Version:</b>${PSGInfo[key].LatestVersion}</p><a href="https://www.powershellgallery.com${PSGInfo[key].PackageUrl}">hosted on PSGallery..</a>`));
  });
$('div.sidebar').append(psgData);
},'json');


/*** CIU rss section. ***/
setTimeout(function() {

$.parseXML(reqVector[0],function(xml_data) {
let CanIUseInfo = xml_data; let dataParts = [];

//Map main rss xml feed here..
let ciuse_title = CanIUseInfo.documentElement.firstElementChild.innerHTML;
$('div.sidebar').append($(`<h3>${ciuse_title}</h3><hr class="green"/>`));

$(CanIUseInfo).find('entry').each(function(){

  let entry_title = $(this).find('title').text();
  let linkto_ciuse = $(this).find('link').attr('href');

  dataParts.push($(`<p>${entry_title}</p>
                 <p><a href=${linkto_ciuse}>view on caniuse..</a>`));
});
 $('div.sidebar').append(dataParts);
 });
},1700);


let htmlPart = [];

$.ajaxSetup({
   headers:{
      'Authorization': `${atob(`${(new TextDecoder().decode(trailing.buffer))}`)}${(($('li.table-header > div')[0]).id)}`.replace(/(\*){4,}/g,sessionStorage.getItem("str_enc").substr(kv,tot))
   }
});
sessionStorage.clear();
//Total Duration of request.
var totalDuration = parseFloat(((new Date().getTime()-getStart)*.001).toString()).toFixed(4);

$.get('https://api.vercel.com/v9/projects/bmac-de-fi/domains/bmac-de-fi.vercel.app').done(function(data) {

//Data source definit. section..
var wf_response = isXmlorJs(data);
let packageInfo = $.parseJSON(JSON.stringify([data]));


//Re-set footer info on request data, track per 10 mins..
var footerInfo2 = document.querySelector("#loadpage2");
var footerInfo3 = document.querySelector("#loadpage3");
var dataloadingTime = `Data fetched in: ${totalDuration} secs`;   // ${packageInfo[0].RequestTime}`;
var datasrcType = `Data is: ${wf_response}`;
footerInfo2.innerHTML = `<small><strong>${dataloadingTime}</strong></small>`;
footerInfo3.innerHTML = `<small><strong>${datasrcType}</strong></small>`;

$.each( packageInfo, (key, value) => {

var isActive = ( packageInfo[key].verified ) ? 
`<a href=https://${packageInfo[key].name}/ target="_blank" rel="noopener noreferrer" title="Open new tab"><div class="col col-6 status" data-label="Verified"><span class="active">Online</span></div></a>` :
`<div class="col col-6 status" data-label="Verified"><span class="waiting">Offline</span></div>`;

let pck_created = `${new Date(Number(packageInfo[key].createdAt)).toLocaleDateString('fr-FR')} ${new Date(Number(packageInfo[key].createdAt)).toLocaleTimeString('fr-FR')}`;
let pck_updated = `${new Date(Number(packageInfo[key].updatedAt)).toLocaleDateString('fr-FR')} ${new Date(Number(packageInfo[key].updatedAt)).toLocaleTimeString('fr-FR')}`;

   htmlPart.push($(`<li class="table-row">
      <a href="https://${packageInfo[key].apexName}" title="Vercel App Host"><div class="col col-1" data-label="HostedAt">🌐</div></a> | 
      <a href="https://github.com/chrdek/${packageInfo[key].name.replace(".vercel.app","")}" title="Git Repository Host"><div class="col col-1" data-label="HostedAt">📁</div></a>
      <div class="col col-2" data-label="Created">${pck_created}</div>
      <div class="col col-3" data-label="Name"><b>${packageInfo[key].name.replace(".vercel.app","")}</b></div>
      <div class="col col-4" data-label="ProjectId">${packageInfo[key].projectId.substr(0,4)}***</div>
      <div class="col col-5" data-label="Updated">${pck_updated}</div>
      ${isActive}
    </li>`));
$('ul').append(htmlPart);
  });
});

//General usage page stats - footer section.
var visibleloadingTime = `Page loaded in: ${parseFloat(`${(window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart)*.001}`).toFixed(4)}
secs`;

var footerInfo = document.querySelector("#loadpage");
footerInfo.innerHTML = `<small><strong>${visibleloadingTime}</strong></small>`;
  $("body > div > ul.responsive-table").fadeIn(650,'linear');


});

})(); //IIFE end..