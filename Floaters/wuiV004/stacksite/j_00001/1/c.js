/*zoshe.net© all rights reserved*/
/* security stuff will need to be considered */
//alert("from JS indexScript");
//ClassArray:
// From the page itself which comes from the js loader class name // 4 values
//* 0   = stacksitejsclass
//* 1   = pageNumber
//* 2   = layoutNumber (notused/currently it's a maybe right now)
//* 3   = stacksitejsclass
// From the infoLoader u.js file in the loader folder  // 7
//* 4   = fileUpdateType
//* 5   = fileUpdateSubType
//* 6   = layoutFileUpdateNumber
//* 7   = snipitFilesUpdateNumber
//* 8   = menuFilesUpdateNumber
//* 9   = scriptFilesUpdateNumber
//* 10 = artFliesUpdateNumber
// From the infoPage u.js file in the w folder // 3 values
//* 11 = pageType
//* 12 = pageSubType
//* 13 = layoutNumber
// From the infoLayout u.js file in the t folder // 4 values
//* 14 = layoutTypeNumber
//* 15 = layoutSubTypeNumber
//* 16 = menuNumbers
//* 17 = snipitNumbers
//* 18 = scriptNumbers

//alert("loader");

//window.onerror=function(){return true;}// this is 4 older browser so it does not error them to death// mostly pre5 browsers
// varibles needed when loading the document 
var qWin = window;
var qDoc = document;
var qDocElm = qDoc.documentElement;
var qHead =	qDoc.getElementsByTagName('HEAD')[0];
//alert(!!document.createDocumentFragment);
//(!!document.createDocumentFragment)? alert("created createDocumentFragment") : alert("failed createDocumentFragment");

// Test for different Browsers

var is_DocFragiable = !!qDoc.createDocumentFragment;// ie6+,nn6+,ff1+,sa1+,op6+ not used yet
var qUserAgent = navigator.userAgent;
var is_sa = qUserAgent.indexOf('AppleWebKit/') > -1;// var name should be webkit
var is_sas = (is_sa)? qUserAgent.split("AppleWebKit/") :0;
var is_saVer = (is_sas)? parseFloat(is_sas[1]):0;
var is_saMobile = !!qUserAgent.match(/Apple.*Mobile.*Safari/);
var is_op = (qWin.opera)?true:false;
var is_op7 = is_op && qDoc.createComment; //also qDoc.childNodes works too
var is_nn = (navigator.product == 'Gecko')&& !is_op;
var is_nn6 = is_nn && (!qWin.find)?true:false;
var is_nn7 = is_nn && (qWin.find)?true:false;
var is_ie = qDoc.all && !is_op;
var is_ie6 = is_ie && qDoc.fireEvent && qDoc.createComment;
var is_complaint = (qDoc.compatMode != 'undefined' && qDoc.compatMode == 'CSS1Compat');
var is_ie6c = (is_ie6  && is_complaint );
var is_ie7 = qDocElm && typeof qDocElm.style.maxHeight!="undefined";
// var Not_macIE =(qDoc.mimeType || !qDoc.all) || is_op; // not BEINGUSED
var isDocXML = qDoc.contentType && qDoc.contentType.indexOf("application/xhtml+xml") > -1;
var isXMLHttpR = !!(qWin.XMLHttpRequest); //Firefox, Opera, Safari, IE7 // not in use
//alert(navigator.userAgent);
//alert(is_sa);
//var isMoz = !window.opera && !/Apple/.test(navigator.vendor);
//var isCanvas = !!(qDoc.createElement('canvas').getContext); //Firefox, Opera, Safari //this causes bugs for //op7.5mac
//alert(isCanvas +"|||||"+ isXMLHttpR);
//alert(is_saVer>419.3);
//alert(qDoc.getElementsByTagName("body")[0].offsetParent == null); // this might work to weeds out nn5 to nn6.9
//other detections: navigator.product == 'Gecko' or navigator.vendor == 'Apple Computer, Inc.'
// also navigator.productSub,10) >= 20020826 is for geckos too
//var getFFVersion=qUserAgent.substring(qUserAgent.indexOf("Firefox")).split("/")[1]
//var FFextraHeight=parseFloat(getFFVersion)>=0.1? 16 : 0 //extra height in px to add to iframe in FireFox 1.0+ browsers

// Global var needed
var jsTag = qGBID("stacksitejs");
var jsTagScr = (jsTag)? jsTag.src : 0;
var qFileArray = [];
var sitePath = (jsTagScr)? jsTagScr.substring(0,jsTagScr.indexOf("stacksite")) : 0; //reqires a "/" at the end
var stackPath = (sitePath)? sitePath + "stacksite/" : 0; // //reqires a / at the end
// qSetDiv is used to create a temp nested dom of <b> elements for menus. qSetDiv also acts as a goblal object to set values that can be retrieved later with the getAttribute function. Both setmenu's and setsnipit's use it set and get values this way. 
var qSetDiv = qDoc.createElement("DIV");
var qSetArray = [];//holds the selected Nested setMenu Objects, and setSnipits
var qLayoutArray = qDoc.createElement("DIV");
// create a hidden element  on top of the document to place the layoutTable in
var qLayoutDiv =qDoc.createElement("DIV");// this might be better is it was a table
var qSnpVar ="";
//window.isScriptsLoaded = false;
//var isDomLoaded = false;

// set the css before page loads
// I think a link to a css file would be better// less code too. 
addCssToDoc("html,body{border:0;padding:0;margin:0;height:100%;width:100%}#qBody{display:none}");
/* ########NOT USING ANYMORE but it maybe better then the above it does work and it's less code*/
//document.write("<style type='text/css' id='stacksitecss'>");
//document.write("html,body{border:0;padding:0;margin:0;height:100%;width:100%}#qBody{display:none}");
//document.write("</style>");


if(jsTag.className){//loads the Loader's u.js file in the loader folder
addFileArray(jsTag.className);//adds 4 values 0,1,2,3
if(qFileArray[0]== "stacksitejsclass" && parseInt(qFileArray[1])){
//alert(qFileArray.toString());
addJS("j/3/u.js?"+Math.random());
}
}
//alert("sssssss: "+ qFileArray);

//quLoadStackSitePage (quloadPageStackSite)
function qPageStackSite(X){//loads the Page's u.js file in the w folder 
addFileArray(X);//adds 4 + 7 values 0,1,2,3,4,5,6,7,8.9,10
if(qFileArray[0]== "stacksitejsclass" && parseInt(qFileArray[1])){
jsTag.className = jsTag.className + X;
//alert("qPageStackSite:"+qFileArray[1]);
//alert("qPageStackSite:"+qFileArray.toString());
addJS("w/"+qFileArray[1]+"/u.js?"+parseInt(qFileArray[8]));
}
}

//quLoadStackSiteLayout (qulSST)
function qLayoutStackSite(X){//loads the Layout u.js file in the t folder
addFileArray(X);//adds 4 + 7 + 3 to the array 0,1,2,3,4,5,6,7,8,9,10.11,12,13
if(qFileArray[0]== "stacksitejsclass" && parseInt(qFileArray[13])){
//alert("qLayoutStackSite:"+qFileArray[13]);
addJS("t/"+qFileArray[13]+"/u.js?"+parseInt(qFileArray[6]));
}
}
//quLoadStackSiteScripts (qulSSS)
function qFrameStackSite(X){//load the latout informatiom and the scripts needed iFrame
addFileArray(X);//adds 4 + 7 + 3 + 4 to the array 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18
//alert("qFrameStackSite:"+qFileArray[9]);
if(qFileArray[0]== "stacksitejsclass" && parseInt(qFileArray[9])){
//add the js files needed
qAddScriptFiles("j",18,"c.js",9);

}
}

function addFileArray(addTo){
var addTos = (addTo.indexOf("_")>-1)? addTo.split("_") : [addTo];
var addToLength = addTos.length;
for(var i = 0; i <addToLength;i++){
qFileArray.push(addTos[i]);
}
}

function addCssToDoc(cssCode){
if(qHead){
var styleSheetElm = null;
if(document.createStyleSheet){
styleSheetElm = document.createStyleSheet();
styleSheetElm.cssText = cssCode;//works with ff
}
else if(document.createElement){
var headElmTest = document.createElementNS && qHead.tagName == 'head';
styleSheetElm=(headElmTest)?document.createElementNS('http://www.w3.org/1999/xhtml','style'):document.createElement('style');
var newStyles = document.createTextNode("\n<!--\n"+cssCode+"\n-->\n");
styleSheetElm.setAttribute('type', 'text/css'); // not sure this will be needed
styleSheetElm.appendChild(newStyles);
qHead.appendChild(styleSheetElm);
}

if(!styleSheetElm){ // I don't think this will be needed and it can't work after the page has loaded
document.write("<style type='text/css' id='stacksitecss'>"+cssCode+"</style>");
}
//styleSheetElm.type = 'text/css';
}
}

//var holdScripts = document.createDocumentFragment();
//var holdScripts = document.createElement("DIV");
function addJS(urlPath){
// ok append does not work in the head, 
// maybe the order is the problem eventhough I have a function fire on each script load
//Maybe
//var elms = document.getElementsByTagName('*'); var pos = elms[elms.length-1]; pos.parentNode.appendChild(...);

document.write("<sc"+"ript language='JavaScript1.2'type='text/javascript'sr"+"c='"+stackPath+urlPath+"'></sc"+"ript>");

//alert(urlPath);
/*
//BUG sa1.0+? Doesn't seem to work when src starts with  a local "file://"  sa1.0 works with doc.write,.
// sa1+? needs document.write to work 2.0 works without document.write
if(document.createElement && document.childNodes && !is_sa||is_saVer>=412.7){// new browsers
var sElm = document.createElement('script');
sElm.language='javascript';
sElm.type='text/javascript';
sElm.src = stackPath+urlPath; // ../ in front of the url here would add some extra securitiy // "../../"+urlPath

holdScripts.appendChild(sElm);
//document.getElementsByTagName('head')[0].appendChild(sElm);
//qHead.insertBefore(sElm,qHead.firstChild)
}

else{//old browsers and  sa1.0+?(version 412.7-) 
document.write("<sc"+"ript language='JavaScript1.2'type='text/javascript'sr"+"c='"+stackPath+urlPath+"'></sc"+"ript>");
}
*/
//alert(qHead.innerHTML);
// this is just a way to add a script in of a href
//javascript:(function(){with(j=(d=document).createElement(s='script')){type='text/'+(language='java'+s);src='http://whatEver.js';}d.body.appendChild(j);})()

}

//Load the Menu
function qAddScriptFiles(inFolder,folderArrayNum,fileName,filesearchNum){
//logFtn(qAddScriptFiles);

//alert("inFolder: "+inFolder+" folderArrayNum: " +folderArrayNum+ " fileName:" +fileName+" filesearchNum:"+filesearchNum);
var fileSearch = (filesearchNum)? "?"+parseInt(qFileArray[filesearchNum]) : "";
//alert("fileSearch:"+fileSearch);
//could add file path number //
if(qFileArray.length>=folderArrayNum){
var arrayLength = 0;
var arrayObjs = qFileArray[folderArrayNum];
if(arrayObjs.indexOf("-")>-1){
arrayObjs = arrayObjs.split("-");
arrayLength = arrayObjs.length;
}
else if(parseInt(arrayObjs)){
arrayObjs = [arrayObjs];
arrayLength = 1;
}
//alert(arrayObjs);
//(inFolder == "n")? alert(arrayObjs) : null;
for(var i = 0; i <arrayLength;i++){
addJS(inFolder+"/"+parseInt(arrayObjs[i])+"/"+fileName + fileSearch);
}
}
}

function qGBID(X){// GetElementByID
return document.getElementById(X);
}

function logFtn(ftnObj){//log Function // this is just for testing function calls// can be removed on final build
/////if(!logFtnOn){return;}// if it's off don't run
var ftnCaller = (ftnObj.caller)? ftnObj.caller.name : ftnObj.name;
var ftnArgmnts = ftnObj.arguments;
var ftnArgmntLngth = ftnObj.arguments.length;
var argmnts = (ftnArgmntLngth>0)? "": "none";
for(i=0;i<ftnArgmntLngth;i++){
argmnts =  argmnts + " val"+i+":"+ftnObj.arguments[i];
}
alert("Good- ftnCaller:"+ftnCaller+ " ftnName:"+ftnObj.name+" ftnArgmnts:"+argmnts);
//alert("ftnName:"+ftnObj.name+" ftnCaller:"+ftnCaller+argmnts);
//return true;
}

//document.write("<li"+"nk hr"+"ef='"+stackPath+"loader/"+parseInt(xVals[0])+"/index.css?"+parseInt(xVals[1])+"' /");
