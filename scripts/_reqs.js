//IIFE start..
(function() {
$(document).ready(function() {
const url_entries = new Map([
                            [0,"3c76ba350bf9635c6277e5eee8819a8a/"], //ciu xml atom feeds
                            [1,"14382e201fb6be671a33af3feae2c58d/"], //git action responses (check yml files).
                            [2,"14a13d8b4c7ac6b5e1f8228df1287bbc/"]  //created datetimes from older xml api.
                           ]);

const retFullUrl = (byKey) => `https://gist.githubusercontent.com/chrdek/${url_entries.get(byKey)}/raw/`


//Requests section.
var getStart = new Date().getTime();


//Initializat. requests for data retrieval.
var reqVector = [
{
    url:retFullUrl(0),
    crossDomain:true,
    cache: false,
    timeout:100000,
    spinner:true,
},
{
    url:retFullUrl(1),
    crossDomain:true,
    cache: false,
    timeout:100000,
    spinner:true,
},
{
    url:retFullUrl(2),
    crossDomain:true,
    cache: false,
    timeout:100000,
    spinner:true,
}];


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
$.get(reqVector[0]).then((xml_data) => {
let CanIUseInfo = $.parseXML(xml_data); let dataParts = [];

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

/*** Handle Nuget json/xml data accordingly here. ***/
$.get(reqVector[1]).then((data) => {

//Total Duration of request.
var totalDuration = parseFloat(((new Date().getTime()-getStart)*.001).toString()).toFixed(4);

//Updated data parts..
let packageInfo = JSON.parse(atob(data)).data; //list of packages for display.
let htmlPart = [];

//Static supplementary info for packages.
$.getJSON(reqVector[2].url,function(xml_trans){


//Re-set footer info on request data, track per 10 mins..
var footerInfo2 = document.querySelector("#loadpage2");
var footerInfo3 = document.querySelector("#loadpage3");
var dataloadingTime = `Data fetched in: ${totalDuration} secs`;   // ${packageInfo[0].RequestTime}`;
var datasrcType = `Data is: ${isXmlorJs(packageInfo)}`;
footerInfo2.innerHTML = `<small><strong>${dataloadingTime}</strong></small>`;
footerInfo3.innerHTML = `<small><strong>${datasrcType}</strong></small>`;

$.each( packageInfo, (key, value) => {

packageInfo[1].verified = true; //make doc active online for specified package.

var isActive = ( packageInfo[key].verified ) ? 
`<a href="https://chrdek.github.io/docs/${packageInfo[key].id}.html" target="_blank" rel="noopener noreferrer" title="Open new tab"><div class="col col-6 status" data-label="Docs"><span class="active">Online</span></div></a>` :
`<div class="col col-6 status" data-label="Docs"><span class="waiting">Offline</span></div>`;

   htmlPart.push($(`<li class="table-row">
      <a href="https://www.nuget.org/packages/${packageInfo[key].id}"><div class="col col-1" data-label="Info">🌐 ${packageInfo[key].id}</div></a>
      <div class="col col-2" data-label="Version">${packageInfo[key].version}</div>
      <div class="col col-3" data-label="Created">${xml_trans[key].DateCreated}</div>
      <div class="col col-4" data-label="Summary">${packageInfo[key].description}</div>
      <div class="col col-5" data-label="Downloads">${packageInfo[key].totalDownloads}</div>
      ${isActive}
    </li>`));
$('ul').append(htmlPart);
});

});
},'json');

//General usage page stats - footer section.
var visibleloadingTime = `Page loaded in: ${parseFloat(`${(window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart)*.001}`).toFixed(4)}
secs`;

var footerInfo = document.querySelector("#loadpage");
footerInfo.innerHTML = `<small><strong>${visibleloadingTime}</strong></small>`;
  $("body > div > ul.responsive-table").fadeIn(650,'linear');
 });
})(); //IIFE end..