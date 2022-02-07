// the following is code I scrap but will keep just in case it's needed 

/*
function findElmPosXXX(X){
var obj = X;
var posX = obj.offsetLeft;
var posY = obj.offsetTop;
while(obj.offsetParent){
if(obj==qDoc.getElementsByTagName('body')[0]){break}
else{
posX+= obj.offsetParent.offsetLeft;
posY+= obj.offsetParent.offsetTop;
obj=obj.offsetParent;
}
}
//elm_doc_x = posX;
//elm_doc_y = posY;
//alert(elm_doc_x);
//var posArray=[posX,posY];
return [posX,posY];
}
*/

/*
// First paramter is the node, second is the CSS property you want ols ie needs work here
function getCSSProperty(obj, sProperty){// not used maybe it can but only good for px sizes
// does not work in sa 1.0 to ? but 2.0 sa up does works // this is a big mess
if(qDoc.defaultView){
//alert(qDoc.defaultView.getComputedStyle(obj, null).getPropertyValue(sProperty));
return qDoc.defaultView.getComputedStyle(obj, null).getPropertyValue(sProperty);
}
else if(obj.currentStyle){
var sProperty = sProperty.replace(/-\D/gi, function(sMatch){
return sMatch.charAt(sMatch.length - 1).toUpperCase();
});
return obj.currentStyle[sProperty];
}
else return null;
}
*/

/*
function detectQuirksMode(){ // testing 4 quirkmode // it works but it can't tell which boxmodel is being use
alert( /CSS.Compat/.test(qDoc.compatMode));
if(typeof qDoc.compatMode != "undefined" && /CSS.Compat/.test(qDoc.compatMode))
{
return false;
}
return true;
}
*/

/* I'm not using any of the following group stuff prefixes, but I'll keep it here until build 1 id done
<!-- start the array div the qs could be for gobal values found right on this array page-->
<!-- 
This group is needed on the master file
drSt=dirStatus: 0=unknown,  1=on, 2=off,  3=lock, 4=archive or public, protected or private
drTy=dirType: 0=unknown, 1=site,2=templetes, 2=btnImg,3=borderImg, 4=snipits
drSbTy= dirSubType:  0=unknown, 1 and up will get decribe in the arrays because there will be to many to list here
drNu=dirNumber: 
drNm=dirName:

siteNdHyLnk = siteNodehyperLink:
siteNdSt=siteNodeStatus: 0=unknown,  1=on, 2=off,  3=lock, 4=archive or public, protected or private
siteNdDrNu=siteNodeDirNumber: Q in front , could turn off Maybe I think it would be better on the array
siteNdNu=siteNodeNumber:  q+num=off, num=on number get assigned on add.
siteNdTy=siteNodeType:  0=unknown, 1=folder, 2=page, 3=folderPage, 4=homePage, 5=object, 6=JavaScriptFunctionCall
siteNdSbTy=siteNodeSubType:  0=unknown, 1 and up will get decribe in the arrays because there will be to many to list here
siteNdTmNu=siteNodeTempleteNumber or name: 0=unknown, none=1, 2 and up is the number assigned to it. 
siteNdTmNm=siteNodeTempleteName  0=unknown
siteNdBtnImgTy=siteNodeButtonImageType: none='', 0=unknown, 1=.svg, 2=png, 3=gif, 4=jpeg
siteNdBtnImgNu=siteNodeButtonImageNumber: 0=unknown,1 and up is the number assigned to it.
siteNdBtnImgNm=siteNodeButtonImageName: it just a name which can be given to it for the program to display

//hpTy=hyperType: 0=unknown, 1=none, 2=hyperlink, 3=JavaScriptFunctionCall
hpSbTy=hyperSubType: 0=unknown,

This group is needed on the document when loaded 
dcNu=documentNumber:  q+num=off, num=on number get assigned on add.

This group is needed when loading on each array object 
dcNu=documentNumber:  qq+num=off, q+num=on number get assigned on add.
btImgTy=buttonImageType: none='', 0=unknown, 1=.svg, 2=png, 3=gif, 4=jpeg
btImgNu=buttonImageNumber: 0=unknown,1 and up is the number assigned to it.

This group is needed on the link file
drTy=dirType: 1=arrary,2=
drNu=dirNumber: 
dcTy=dirType:  0=unknown, 1=folder, 2=page, 3=folderPage, 4=homePage, 5=object 
dcSbTy=dirSubType:  0=unknown, 1 and up will get decribe in the arrays because there will be to many to list here
tmNu=templeteNumber: 0=unknown,1 and up is the number assigned to it.
tmNm=templeteName:  0=unknown
hpLink = hyperLink:
hpTy=hyperType: 0=unknown, 1=none, 2=hyperlink, 3=JavaScriptFunctionCall, 4= MenuHeader, 5=MenuDivider
hpSbTy=hyperSubType: 0=unknown,
Public declared items can be accessed everywhere. Protected limits access
-->
*/
/*
//t.onmouseover=t.onmouseout=t.onmousedown=t.onmouseup=t.onclick= qMouse_Event_Table;
// it not work on windows. Window hate events on tables
function qMouse_Event_Table(e){ // for testing events fired on table
//alert("q6 |"+qWin.q6);
//////if(qDoc.scroller){return;}else null; // mac NS needs to write this line this way it hates using returns in returns in ()?: I don't think these line is needed anymore
// evt stands for Event. The Event is the actually Event that Fired. i.e. mouseover oe mouseclick 
var evt = (e)? e : top.event; // qWin.event; this may be needed for windows ie and other browser and added of course to the mix
var evtType = (e)? e.type : top.event.type; // qWin.event.type; this may be needed for windows ie and other browser and added of course to the mix
alert(evtType);
}
*/
/*
function findframeobject(qx){
var iFrameDoc;
var iFrameObj = (qDoc.frames)? qDoc.frames[qx] : qGBID(qx); // the qDoc.frames is for mac ie 5

if (iFrameObj.contentDocument) {iFrameDoc = iFrameObj.contentDocument;} // For NS6

if (iFrameObj.contentWindow) {iFrameDoc = iFrameObj.contentWindow.document;} // For IE5.5 and IE6

else if (iFrameObj.document){ iFrameDoc = iFrameObj.document;}// For IE5

//else {alert ("your browser is not supported try using InternetExployer 5.0 or higher");}
return iFrameDoc;
}
*/
/*
function qssAddCssLink(filename){
var cssfile = filename; // it needs to put on od relative link maybe to make it safer ie ../
var objHead = qDoc.getElementsByTagName('head');
//alert(qDoc.createElementNS);
var objHeadTest = qDoc.createElementNS && objHead[0].tagName == 'head';
if(objHead[0]){
var objCSS =(objHeadTest)?qDoc.createElementNS('http://www.w3.org/1999/xhtml','link'): qDoc.createElement('link');
// future UA may need to use setAttribute , for now it works on all UA without a setAttribute
objCSS.rel = 'stylesheet';
objCSS.href = cssfile;
objCSS.type = 'text/css';
//objCSS.setAttribute('href',cssfile);
//objCSS.setAttribute('rel','stylesheet');
//objCSS.setAttribute('type','text/css');
//objCSS.setAttribute("media", "screen");

objHead[0].appendChild(objCSS);
}

/*
old way
// I put this in the yard because it does have the old way I did it. Probally will never use this, but it does show the old way.
var cssfile = filename;
//alert(cssfile);
var nLink=qDoc.createElement('LINK');
if(is_ie){
//alert(cssfile);
qDoc.createStyleSheet(cssfile);
//alert(qDoc.getElementsByTagName('HEAD')[0]);
}
else if(qDoc.styleSheets || is_op){
nLink.setAttribute('rel','StyleSheet');
/////nLink.rel="StyleSheet";
nLink.setAttribute('type','text/css');
////////nLink.type="text/css";
nLink.setAttribute('href',cssfile);
//nLink.href=cssfile;
qDoc.getElementsByTagName('HEAD')[0].appendChild(nLink); // this works too 
}
//qDoc.childNodes[0].appendChild(nLink); // documentElement screwsup on sa
// needed for xhtml xml app
//if (qGBID) {
//var l=qDoc.createElementNS("http://www.w3.org/1999/xhtml","link");
//l.setAttribute("rel", "stylesheet");
//l.setAttribute("type", "text/css");
//l.setAttribute("href", "/css/js.css");
//l.setAttribute("media", "screen");
//qDoc.getElementsByTagName("head")[0].appendChild(l);
//}
else null;

}
*/

/*
function getAligns(x){// not being used
var preVal = (!is_nn)? "" : "-moz-";
var hAligns = ["left","center","right"];
var vAligns = ["top","center","bottom"];
var xVals = (x && x.indexOf("_")>-1)? x.split("_") : 0; // backGrounds
var hAlignVal = (xVals[0])? preVal + hAligns[xVals[0]] : 0;
var vAlignVal = (xVals[1])? preVal + hAligns[xVals[1]] : 0;
return hAlignVal +"_"+ vAlignVal;
}
*/

/*
function resignLinkAttributes1(eleID,thetagname, theattribute){//NOT USED//DEAD//CANBEREMOVED#########
// No longer use this function can be removed on next clean up
// this loop thought and resigns the herf or src for both the a and img element
//alert(eleID+"||"+eval(eleID));
var thetag = eval(eleID).getElementsByTagName(thetagname);
for(var c=0; c < thetag.length; c++){
(theattribute == "src")? thetag[c].src=thetag[c].src : thetag[c].href=thetag[c].href;
//eval("alert(thetag[ccc]."+theattribute+");");
//eval("thetag[c]."+theattribute+"=thetag[c]."+theattribute);
}
return (c)? thetag[c-1]:0;
} 
*/
/* this adds a new iframe to the document and some other stuff too
//--
//alert(selectedObj.attributes["qs"].value);
//alert(qGBID("bottomTag"));
//--
//var tempIFrame=qDoc.createElement('iframe');
//tempIFrame.setAttribute('id','RSIFrame');
//tempIFrame.style.border='0px';
//tempIFrame.style.width='0px';//tempIFrame.style.height='0px';
//tempIFrame.src='main.htm';
//IFrameObj = qDoc.body.appendChild(tempIFrame);
//tempIFrame.setAttribute('id','RSIFrame');
//---
//--
//for(i = 0; i<snpString.length;i++){
//var iframeHolder = qGBID("qqSnp"+snpString[i]);
//alert(iframeHolder.getElementsByTagName("A").length);
//qDoc.write(iframeHolder.innerHTML);
//alert(snpString+"|"+qGBID("qqSnp"+snpString[i]).innerHTML);
//}
//--
*/
/*
// this will be the new way, once I get thing labeled more with  load script
// I choose not to go this way for many reason, this function loads a js file to call a function to make a hyperlink . I don't think I will ever use any of this function or parts of it code for anything. It can be deleted from the junkyard when I have a final version for stacksite

// not using because adding a javascript file may turn out to have a tons of problems. Like the script may not update it self and end up using it's old js file instead of the updated one. Also calling a new script file could end up causing a load problem if the the user is not hook up to the internet at the time. Need more testing.

function qssMenuItem_click(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
Change_Element(objID,objLevel,0);
(qWin.EE)? clearTimeout(qWin.EE): null;
(qWin.E)? clearTimeout(qWin.E): null;
(qWin.E)? qWin.E = null: null;
var setLevelToThis = (objType!=9)? LastUsed_RootBtn_Lvel : objLevel;
menuOutTimeOut('qSSclick',setLevelToThis,0); // SA is a little crashy with this line May need looking into
//alert(setLevelToThis);
if( qDoc.createElement && qDoc.childNodes ) {
}
var findithere = findframeobject("stacksiteiframe");// not used anymore
var clickDocNum = findithere.getElementById("q1"+objID.substring(objID.indexOf("m")));
var scriptX = findithere.createElement('script');
scriptX.setAttribute('type','text/javascript');
///scriptX.setAttribute('src','someNewUrl.js'); // NOTE may need to use setAttribute
//alert(stackPath+"hyper/"+ clickDocNum.getAttribute('dcNu') + ".html");
scriptX.src = stackPath+"hyper/"+ clickDocNum.getAttribute('dcNu') + "/i.html"; // I think link should have it's own folder
//scriptX.src = stackPath+"link/"+ clickDocNum.getAttribute('dcNu') + ".html";
//alert(scriptX.src);
findithere.getElementsByTagName('HEAD')[0].appendChild(scriptX);
}
*/