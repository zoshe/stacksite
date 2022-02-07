/*zoshe.net© all rights reserved*/
/* security stuff will need to be considered */
//alert("from JS indexScript");
//ClassArray:
// From the page itself which comes from the js loader class name // 4 values
//* 0   = stacksitejsclass
//* 1   = pageNumber
//* 2   = layoutNumber (notused/currently it's a maybe right now)
//* 3   = stacksitejsclass
// From the infoLoader u.js file in the loader folder  // 5 values
//* 4   = layoutFileUpdateNumber
//* 5   = snipitFilesUpdateNumber
//* 6   = menuFilesUpdateNumber
//* 7   = scriptFilesUpdateNumber
//* 8   = artFliesUpdateNumber
// From the infoPage u.js file in the w folder // 3 values
//* 9   = pageType
//* 10 = pageSubType
//* 11 = layoutNumber
// From the infoLayout u.js file in the t folder // 4 values
//* 12 = layoutTypeNumber
//* 13 = layoutSubTypeNumber
//* 14 = menuNumbers
//* 15 = snipitNumbers
//* 16 = scriptNumbers

//window.onerror=function(){return true;}// this is 4 older browser so it does not error them to death// mostly pre5 browsers

// varibles needed when loading the document 
var qWin = window;
var qDoc = document;
var qDocElm = qDoc.documentElement;
var qHead =	qDoc.getElementsByTagName('HEAD')[0];
var qUserAgent = navigator.userAgent;

// Test for different Browsers
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
var fileArray = [];
var jsTagClassNames  = "";
var jsTagClassNameLength = 0;

var sitePath = (jsTagScr)? jsTagScr.substring(0,jsTagScr.indexOf("stacksite")) : 0; //reqires a / at the end
var stackPath = (sitePath)? sitePath + "stacksite/" : 0; // //reqires a / at the end
//alert(sitePath);
//alert(stackPath);


// set the css before page loads
// I think a link to a css file would be better// less code too. 
addCssToDoc("html,body{border:0;padding:0;margin:0;height:100%;width:100%}#qBody{display:none}.menuBlock{display:none; position:absolute;left:0px;top:-10000px}");
/* ########NOT USING ANYMORE but it maybe better then the above it does work and it's less code*/
//document.write("<style type='text/css' id='stacksitecss'>");
//document.write("#qBody{display:none}.menuBlock{display:none; position:absolute;left:0px;top:-10000px}");
//document.write("html,body{border:0;padding:0;margin:0;height:100%;width:100%}#qBody{display:none}.menuBlock{display:none; position:absolute;left:0px;top:-10000px}");
//document.write("</style>");

// the iframe is only here so it can figure out what box sizing is working
// I really need something else because I would like to get ride of doc.writes 
document.write("<iframe id='stacksiteiframe' style='border:none;width:1px;padding-right:1px;height:0px;top:-9000;position:absolute;'frameborder='0'><\/iframe>");
//the following works here, but I rater find another way to get ride of document.write works here
//var pgIframe = qGBID("stacksiteiframe");
//var isStandardBoxMode = (parseInt(pgIframe.offsetWidth) == 1)? 0 : 1; // 2 or 0(0 is ns7.2-only) r for w3c mode
//alert(pgIframe.offsetWidth);

function addFileArray(addTo){
var addTos = (addTo.indexOf("_")>-1)? addTo.split("_") : [addTo];
var addToLength = addTos.length;
for(var i = 0; i <addToLength;i++){
fileArray.push(addTos[i]);
}
alert(fileArray);
/*
if(jsTagClassNameLength>=folderArrayNum){
var arrayLength = 0;
var arrayObjs = jsTagClassNames[folderArrayNum];
if(arrayObjs.indexOf("-")>-1){
arrayObjs = arrayObjs.split("-");
arrayLength = arrayObjs.length;
}
else if(parseInt(arrayObjs)){
arrayObjs = [arrayObjs];
arrayLength = 1;
}
for(var i = 0; i <arrayLength;i++){
addJS(inFolder+"/"+parseInt(arrayObjs[i])+"/"+fileName + fileSearch);
//addJS("m/"+parseInt(arrayObjs[i])+"/m.html?"+parseInt(jsTagClassNames[6]));
}
}
*/
}

if(jsTag.className){//loads the Loader's u.js file in the loader folder
// these numbers R added to the end of the layout, snipit, and menu files.
addFileArray(jsTag.className);//adds 4 values 0,1,2,3
jsTagClassName = jsTag.className;
jsTagClassNames = jsTagClassName.split("_");//adds 4 values 0,1,2,3
if(jsTagClassNames[0]== "stacksitejsclass" && parseInt(jsTagClassNames[1])){
addJS("js/_/u.js?"+Math.random());
//document.write("<sc"+"ript language='JavaScript1.2' type='text/javascript' sr"+"c='"+stackPath+"loader/_/u.js?"+Math.random()+"'></sc"+"ript>");
}
}

//quLoadStackSitePage (quloadPageStackSite)
function qPageStackSite(X){//loads the Page's u.js file in the w folder 
//alert(X);
addFileArray(X);//adds 4 + 5 values 0,1,2,3,4,5,6,7,8

jsTagClassName = jsTagClassName +"_"+ X;
jsTagClassNames = jsTagClassName.split("_");//adds 4 + 5 values 0,1,2,3,4,5,6,7,8
if(jsTagClassNames[0]== "stacksitejsclass" && parseInt(jsTagClassNames[1])){
jsTag.className = jsTag.className + X;
addJS("w/"+jsTagClassNames[1]+"/u.js?"+parseInt(jsTagClassNames[6]));
//document.write("<sc"+"ript language='JavaScript1.2' type='text/javascript' sr"+"c='"+stackPath+"w/"+jsTagClassNames[1]+"/u.js?"+parseInt(jsTagClassNames[6])+"'></sc"+"ript>");
}
}
//quLoadStackSiteLayout (qulSST)
function qLayoutStackSite(X){//loads the Layout u.js file in the t folder
addFileArray(X);//adds 4 + 5 + 3 to the array 0,1,2,3,4,5,6,7,8,9,10.11
//alert(X);
jsTagClassName = jsTagClassName +"_"+ X;
var jsTagClassNames = jsTagClassName.split("_");//adds 4 + 5 + 3 to the array 0,1,2,3,4,5,6,7,8,9,10.11
if(jsTagClassNames[0]== "stacksitejsclass" && parseInt(jsTagClassNames[11])){
addJS("t/"+jsTagClassNames[11]+"/u.js?"+parseInt(jsTagClassNames[4]));
//document.write("<sc"+"ript language='JavaScript1.2' type='text/javascript' sr"+"c='"+stackPath+"t/"+jsTagClassNames[11]+"/u.js?"+parseInt(jsTagClassNames[4])+"'></sc"+"ript>");
//alert(jsTagClassName);
}
}
//quLoadStackSiteScripts (qulSSS)
function qFrameStackSite(X){//load the latout informatiom and the scripts needed iFrame
addFileArray(X);//adds 4 + 5 + 3 to the array 0,1,2,3,4,5,6,7,8,9,10.11
//alert( jsTagClassName +"||||||"+ X);
jsTagClassName = jsTagClassName +"_"+ X;
var jsTagClassNames = jsTagClassName.split("_");//adds 4 + 5 + 3 + 4 to the array 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
if(jsTagClassNames[0]== "stacksitejsclass" && parseInt(jsTagClassNames[7])){
// I think this could go into a var as an array now instead of using the the classname because no iframes anymore
jsTag.className = jsTagClassName;
var jsTagClassNames  = jsTag.className.split("_");
var jsTagClassNameLength = jsTagClassNames.length;

//qAddScriptFiles("js",16,"c.js",7);
addJS("js/101/c.js?"+parseInt(jsTagClassNames[7]));
//addJS("scripts/1dombuilder/c.js?"+parseInt(jsTagClassNames[7]));


//document.write("<li"+"nk hr"+"ef='"+stackPath+"loader/"+parseInt(xVals[0])+"/index.css?"+parseInt(xVals[1])+"' /");

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


function addJS(urlPath){
// ok append does not work in the head, 
// maybe the order is the problem eventhough I have a function fire on each script load
//Maybe
//var elms = document.getElementsByTagName('*'); var pos = elms[elms.length-1]; pos.parentNode.appendChild(...);

//alert(stackPath+urlPath);
document.write("<sc"+"ript language='JavaScript1.2'type='text/javascript'sr"+"c='"+stackPath+urlPath+"'></sc"+"ript>");

/*
//BUG sa1.0+? Doesn't seem to work when src starts with  a local "file://"  sa1.0 works with doc.write,.
// sa1+? needs document.write to work 2.0 works without document.write
if(document.createElement && document.childNodes && !is_sa||is_saVer>=412.7){// new browsers
var sElm = document.createElement('script');
sElm.language='javascript';
sElm.type='text/javascript';
sElm.src = stackPath+urlPath; // ../ in front of the url here would add some extra securitiy // "../../"+urlPath
document.getElementsByTagName('head')[0].appendChild(sElm);
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
alert(inFolder);
var fileSearch = (filesearchNum)? "?"+parseInt(jsTagClassNames[filesearchNum]) : "";
//could add file path number //
if(jsTagClassNameLength>=folderArrayNum){
var arrayLength = 0;
var arrayObjs = jsTagClassNames[folderArrayNum];
if(arrayObjs.indexOf("-")>-1){
arrayObjs = arrayObjs.split("-");
arrayLength = arrayObjs.length;
}
else if(parseInt(arrayObjs)){
arrayObjs = [arrayObjs];
arrayLength = 1;
}
for(var i = 0; i <arrayLength;i++){
addJS(inFolder+"/"+parseInt(arrayObjs[i])+"/"+fileName + fileSearch);
//addJS("m/"+parseInt(arrayObjs[i])+"/m.html?"+parseInt(jsTagClassNames[6]));
}
}
}

function qGBID(X){// GetElementByID
return document.getElementById(X);
}
