/*zoshe.net© all rights reserved*/
/***** Theses R ways to sniff out old browsers ******/

//alert("navigator.onLine:"+navigator.onLine);
//alert(!!window.applicationCache); // opera does not support this
//window.onerror=function(){return true;}// this is 4 older browser so it does not error them to death// mostly pre5 browsers
// varibles needed when loading the document 
var qWin = window;
var qDoc = document;
var qDocElm = qDoc.documentElement;
var qHead =	qDoc.getElementsByTagName('HEAD')[0];
//alert(!!document.createDocumentFragment);
//(!!document.createDocumentFragment)? alert("created createDocumentFragment") : alert("failed createDocumentFragment");



// Test for different Browsers
//100002 NOTE NOT USING ANY OF THESE BROWSER AND VERSION SNIFF
// THEY CAN BE REMOVED and Used for the browser support page
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
