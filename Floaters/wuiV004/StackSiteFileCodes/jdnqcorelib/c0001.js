// varibles needed when loading the document 
//alert("c.js");
var checkForParent = (parent != this)? true: false;//NOTE notUsed
var win = window;
var doc = document;
//var docHead = doc.getElementsByTagName('HEAD')[0];//notUsed
//var docBody = doc.getElementsByTagName('BODY')[0];//notUsed
var parentDoc = parent.document; // this determines the frame to build the tabbar
var parentDocElement = parentDoc.documentElement || parentDoc.body;
var parentHead =	parentDoc.getElementsByTagName('HEAD')[0]; 
var parentBody =	parentDoc.getElementsByTagName('BODY')[0];

//alert(parentBody);
// Test for different Browsers
var is_sa = navigator.userAgent.indexOf('AppleWebKit/') > -1;// var name should be webkit
var is_sas = (is_sa)? navigator.userAgent.split("AppleWebKit/") :0;
var is_saVer = (is_sas)? parseFloat(is_sas[1]):0;
var is_op = (window.opera)?true:false;
var is_op7 = is_op && document.createComment; //also document.childNodes works too
var is_nn = (navigator.product == 'Gecko')&& !is_op;
var is_nn6 = is_nn && (!window.find)?true:false;
var is_nn7 = is_nn && (window.find)?true:false;
var is_ie = document.all && !is_op;
var is_ie6 = is_ie && document.fireEvent && document.createComment;
var is_complaint = (document.compatMode != 'undefined' && document.compatMode == 'CSS1Compat');
var is_ie6c = (is_ie6  && is_complaint );
var is_ie7 = document.documentElement && typeof document.documentElement.style.maxHeight!="undefined";
var Not_macIE =(document.mimeType || !document.all) || is_op; // not BEINGUSED
var isDocXML = document.contentType && document.contentType.indexOf("application/xhtml+xml") > -1;
//var isCanvas = !!(document.createElement('canvas').getContext); //Firefox, Opera, Safari //this causes bugs for //op7.5mac  
var isXMLHttpR = !!(window.XMLHttpRequest); //Firefox, Opera, Safari, IE7 // not in use
//alert(isCanvas +"|||||"+ isXMLHttpR);
//alert(is_saVer>419.3);
//alert(document.getElementsByTagName("body")[0].offsetParent == null); // this might work to weeds out nn5 to nn6.9
//other detections: navigator.product == 'Gecko' or navigator.vendor == 'Apple Computer, Inc.'
// also navigator.productSub,10) >= 20020826 is for geckos too
//is_sa=((document.childNodes)&&(!document.all)&&(!navigator.taintEnabled)&&(!navigator.accentColorName))?true:false;
// FIREFOX STUFF maybe needed for iframes
//var getFFVersion=navigator.userAgent.substring(navigator.userAgent.indexOf("Firefox")).split("/")[1]
//var FFextraHeight=parseFloat(getFFVersion)>=0.1? 16 : 0 //extra height in px to add to iframe in FireFox 1.0+ browsers

//preLoad Varibles
var jsTag = parentDoc.getElementById("stacksitejs");
var jsTagScr = (jsTag)? jsTag.src : 0;
var jsTagScrS =  jsTagScr.split(/loader/);
var stacksiteFolder = jsTagScrS[0];
var hostFolder = stacksiteFolder.substring(0,stacksiteFolder.indexOf("stacksite"));
var jsTagClassNames  = jsTag.className.split("_");
var jsTagClassNameLength = jsTagClassNames.length;
var pgIframe = parentDoc.getElementById("stacksiteiframe");
var isStandardBoxMode = (parseInt(pgIframe.offsetWidth) == 1)? 0 : 1; // 2 or 0(0 is ns7.2-only) r for w3c mode
//alert(pgIframe.offsetWidth +"||||"+ detectQuirksMode() +"|||"+ document.compatMode);
//alert(jsTagClassNames[3]);

// setDiv is used to create a temp nested dom of <b> elements for menus. setDiv also acts as a goblal object to set values that can be retrieved later with the getAttribute function. Both setmenu's and setsnipit's use it set and get values this way. 
var setDiv = parentDoc.createElement("DIV");
var setArray = [];//holds the selected Nested setMenu Objects, and setSnipits
var qLayoutArray = parentDoc.createElement("DIV");
// create a hidden element  on top of the document to place the layoutTable in
var qLayoutDiv =parentDoc.createElement("DIV");// this might be better is it was a table
var qSnpVar ="";

// create a hidden element  on top of the document to place a elm to test it size every 2 seconds
// display none may be needed// maybe putting a class name chane tied to the body element would work the best
// this way it would set all the displays at once to view, and redraw may increse in speed
var qSizeDiv =parentDoc.createElement("DIV");
qSizeDiv.innerHTML="X<br />X";
qSizeDiv.id = "qsizeBox";
qSizeDiv.style.position="absolute";
qSizeDiv.style.top="-9999px";
// maybe it can be put into qbodymen div and meassured there. This will also make less code because it will not need top
qSizeDiv.style.width = "10%"; // 100% seems to mess up ie. It add extra width space when appling left margin to the body table
qSizeDiv.style.fontSize="100%";

// create a hidden element  on top of the document to place the pull down menus in
// I'm thinking this could go, by placing the menus in the doc by themselves
var qDropMnuDiv =parentDoc.createElement("DIV");
qDropMnuDiv.style.display = "block"; // *******Note this should be set to display none or reset to block after build
qDropMnuDiv.id = "qbodymen"; // not being used just here to to help coding, and may have a use some day
//qdiv.style.zIndex="5000"; // this may need to add 5000 

//Load the snipits
if(jsTagClassNameLength>=15){
var snipitNumberLength = 0;
var snipitNumbers = jsTagClassNames[15];
if(snipitNumbers.indexOf("-")>-1){
snipitNumbers = snipitNumbers.split("-");
snipitNumberLength = snipitNumbers.length;
}
else if(parseInt(snipitNumbers)){
snipitNumbers = [snipitNumbers];
snipitNumberLength = 1;
}
for(var i = 0; i <snipitNumberLength;i++){// for(var i = 0; i <snipitNumberLength && parseInt(snipitNumbers[i]) ;i++){
addJS("n/"+parseInt(snipitNumbers[i])+"/s.js?"+parseInt(jsTagClassNames[5]));
}
}

//Load the Menu
if(jsTagClassNameLength>=14){
var menuNumberLength = 0;
var menuNumbers = jsTagClassNames[14];
if(menuNumbers.indexOf("-")>-1){
menuNumbers = menuNumbers.split("-");
menuNumberLength = menuNumbers.length;
}
else if(parseInt(menuNumbers)){
snipitNumbers = [menuNumbers];
menuNumberLength = 1;
}
for(var i = 0; i <menuNumberLength;i++){
addJS("m/"+parseInt(menuNumbers[i])+"/m.html?"+parseInt(jsTagClassNames[6]));
}
}

//Load the Layout
// Currently there is no use for muilt layouts but I think there could be
if(jsTagClassNameLength>=11){
var layoutNumberLength = 0;
var layoutNumbers = jsTagClassNames[11];
if(layoutNumbers.indexOf("-")>-1){
layoutNumbers = layoutNumbers.split("-");
layoutNumberLength = layoutNumbers.length;
}
else if(jsTagClassNames[11]){
snipitNumbers = [layoutNumbers];
layoutNumberLength = 1;
}
for(var i = 0; i <layoutNumberLength;i++){
addJS("t/"+parseInt(layoutNumbers[i])+"/c.js?"+parseInt(jsTagClassNames[4]));
}
}


function setSnipit(Z,X){
//alert("setSnipit"+Z);
var setArrayLength = setArray.length;
setArray[setArrayLength] = []; 
//NeedsWORK needs to test if it has two periods and foward (../) in 
// this may only be need if the snipit gets it's image from the same folder that's holding the snipit
var re = new RegExp("src"+ "[\\W]*", "ig"); //  this is it literially  /.tabs[\W]+\{[^}]+\}/i
X.replace(re, "src=\""+hostFolder);
re = new RegExp("href"+ "[\\W]*", "ig"); //  this is it literially  /.tabs[\W]+\{[^}]+\}/i
setArray[setArrayLength].unshift(X.replace(re, "href=\""+hostFolder));
//alert(setArray[setArrayLength]);
//setArray.setAttribute("qZNT"+arrayNum, arrayType);
setDiv.setAttribute("qN"+Z, setArrayLength);
return X;
}

function addJS(urlPath){
// alought most browser don't load scripts outside of it's domain, putting a relative ../ in front of the url here would add some extra securitiy  . Also I believe this will need createElm not sure what the specs r or not r for doc.write anymore with concerns to xhtml and html5
// anyway I put in createElement too, and document.write, 4 the old browsers
// needs a way to test if 4 sa1.0+? which can't use createElement for script tag
//BUG sa1.0+? Doesn't seem to work when src starts with  a local "file://"  sa1.0 works with doc.write,  NEEDSWORK
//alert(document.getElementsByTagName('head')[0]);
// sa1+? needs document.write to work 2.0 works without document.write
//NEEDSWORK 
//alert(urlPath);
if(document.createElement && document.childNodes && !is_sa||is_saVer>=412.7){
var sElm = document.createElement('script');
//sElm.src = "../../"+urlPath;
//alert(sElm.getAttribute('src'));
//sElm.setAttribute('type','text/javascript');
//sElm.setAttribute('src',"../../"+urlPath);
sElm.language='javascript';
sElm.type='text/javascript';
sElm.src = jsTagScrS[0]+urlPath; // jsTagScrS[0]
//sElm.src = "../../"+urlPath; // jsTagScrS[0]
//sElm.id = "qscr";
//sElm.src = "stacksite/"+urlPathsElm.src = "../../"+urlPath;
document.getElementsByTagName('head')[0].appendChild(sElm);
}

else{// sa1.0+? needs this
document.write("<sc"+"ript language='JavaScript1.2'type='text/javascript'sr"+"c='"+jsTagScrS[0]+urlPath+"'></sc"+"ript>");
//document.write("<sc"+"ript language='JavaScript1.2'type='text/javascript'sr"+"c='../../"+urlPath+"'></sc"+"ript>");
//document.write("<sc"+"ript language='JavaScript1.2'type='text/javascript'sr"+"c='../../"+"s/1/m.js?2.96a5b0c&"+"'></sc"+"ript>");
}
// this is just a way to add a script in of a href
//javascript:(function(){with(j=(d=document).createElement(s='script')){type='text/'+(language='java'+s);src='http://whatEver.js';}d.body.appendChild(j);})()
}

function qSetArray(arrayType,arrayNum,arrayObjs){//converts mnuArrays to dom
// arrayType: 3=nav 4=custom
// FF1.5+ needs the html custom arrayObjs tags to be in smaller case for innerHTML to work. This could be a problem for older KDE browsers. Might need to test for it like the follows:
// var useTagChar = (d.getElementsByTagName("B")[0])? "B" : "b";
// ie can't process cutom tags put into a createElement(X) using innerHTML the arrayObjs tags can be a <div>or <b>
// Also p tags don't work in ff or sa they get pulled out of nesting order and into a messed up order.
//alert(arrayObjs);
var pgNum = parseInt(jsTagClassNames[1]);//ns6.2-ns6.6 needs parseInt only
var setArrayLength = setArray.length;
setArray[setArrayLength] = [];

var d = parentDoc.createElement("DIV");
d.innerHTML = arrayObjs;
setDiv.appendChild(d);// op7.5+ requires a var obj outside this function to work

 //NOTE what happens when there is no mnuNode1 
var mnuNode1 = d.getElementsByTagName("B")[0]; // this is the first div found in the array
var mnuNodes = mnuNode1.getElementsByTagName("B"); // this is all the divs found in the array
var mnuNodesLength = mnuNodes.length;

var selMnuNode = 0;
var homeMnuNode = 0;
var homeMnuNum = (mnuNode1.getAttribute("homePg"))? mnuNode1.getAttribute("homePg") : -1;

if(mnuNodesLength > 0){//if-01 I don't think this will be needed because the site element will always be there
mnuNode1.childDivs = 0; // this should be called childs(c)
mnuNode1.id =  "q1"; // sets the first Div id 

//setUp each mnuNode 
for(var ii=0;ii<mnuNodesLength;ii++){ //for-02 counts each div and add the id's and etc..
var mnuNode = mnuNodes[ii];
var mnuParentNode = mnuNode.parentNode;
mnuNode.childDivs = 0;
mnuNode.id =  mnuParentNode.id +"m" + mnuParentNode.childDivs;
(!selMnuNode && parseInt(mnuNode.getAttribute("dcnu")) ==pgNum)? selMnuNode = mnuNode: null;
(!homeMnuNode && parseInt(mnuNode.getAttribute("dcnu")) == homeMnuNum)? homeMnuNode = mnuNode: null;
//alert(parseInt(mnuNode.getAttribute("dcnu")) +"||||"+ pgNum);
mnuParentNode.childDivs++;

//set the hyperLink for each mnuNode
var zxLink = mnuNode.getAttribute("ZX");
///if(zxLink && (zxLink.charAt(0)=="."|| zxLink.charAt(0)=="/")){//ifZX is a link
if(zxLink !=null&& (zxLink.charAt(0)=="."|| zxLink.charAt(0)=="/")){//ifZX is a link
re = new RegExp("[\\W]*", "ig"); //  this is it literially  /.tabs[\W]+\{[^}]+\}/i
zxLink = zxLink.replace(re, hostFolder);
mnuNode.ZX = zxLink;
}//ifZX is a link
else{//javascript // this needs thinking
mnuNode.ZX = "";
}
}//for-02

// Put the selected level Node and it's parents into a mnuDomArraySet
// I think adding the getElementsByTagName[number] to the setDiv.setAttribute("qA"+arrayNum+"Sub", holdSelNum); 
// this might add more speed and keep the generated javascript size down too.
// var holdSelNum = "";
// the while loop can add to holdSelNum = holdSelNum + selMnuNode+",";
// then it can be splited later to get the layer 
// also should I detremine the breadcrumb levels in this function by testing the homepage against the selMnuNode 
while(selMnuNode.id != d.id){//while-01 keep going back until it hits the qarray div
//alert(selMnuNode +"||||"+ selMnuNode.id);
var selMnuParentNode = selMnuNode.parentNode;
selMnuParentNode.selectedmenu = selMnuNode.id.substring(selMnuParentNode.id.length+1); //parent id length
setArray[setArrayLength].unshift(selMnuNode);
selMnuNode = selMnuParentNode;
//alert(d.selectedLength+"||||"+selMnuNode.id);
}//while-01
}//if-01
else{ // this handle all the divs
//if no selMnuNode is found then what? NEEDED MAYBE an ERROR
// if no array do what
}

(homeMnuNode)? null : homeMnuNode = mnuNode1; //NOTE what happens when there is no mnuNode1 
setArray[setArrayLength].unshift(homeMnuNode);
setDiv.setAttribute("qAT"+arrayNum, arrayType);
setDiv.setAttribute("qA"+arrayNum, setArrayLength);
return null;
}//endOfFunct

function textSizeChange(X){
//return true;
// Try putting the two functions together ie make textSizeChange and reSizeLayout the same unless the onresize want work then keep it two functions
var bx = parentDoc.getElementById("qsizeBox");
if(bx){//if1
var bxoffsetWidth = bx.offsetWidth;
var bxoffsetHeight = bx.offsetHeight;
var bxLastWidth = bx.lastWidth;
var bxLastHeight = bx.lastHeight;
if(bxoffsetWidth!= bxLastWidth || bxoffsetHeight != bxLastHeight || X=="firstTime"){
reSizeLayout("setSize");
bx.lastWidth = bxoffsetWidth;
bx.lastHeight = bxoffsetHeight;
//alert(" bxoffsetWidth:"+bxoffsetWidth+" bxoffsetHeight:"+bxoffsetHeight);
}
}//if1
window.sizeFunTimout = setTimeout("textSizeChange()", 1000);
}

function reSizeLayout(DoIt){
//return;
// THIS might also work on dropmenu boxes too. 
var template = qLayoutArray; // containing the document's Template Objects
//0073 var template = qtdnStackSiteC; // containing the document's Template Objects
var templateObjs = template.getElementsByTagName("B"); // gets the Template Objects
//NOTE: parentBodyClass is not in use. It was used to set the height to auto, maybe it can set verticalAlign and 4 other uses
///////var parentBodyClass = parentBody.className;
///////parentBody.className =  "qBodyreSizer " +parentBodyClass;// sets any needed heights back to auto before sizing
if( parentDoc.getElementById("qBodyTable")){//ifqBodyTable
var qBody = parentDoc.getElementById("qBodyTable");
qBody.style.visibility = "hidden";// // FF1.5+? UA flickers somewhat, and this cools it down somewhat 

// set any needed heights back to auto before sizing 
for(i=0;i<templateObjs.length;i++){ //for1
var obj = templateObjs[i]; // get the current div element which repersents a single Template Object
var objOn = parseInt(obj.isOn); // get the on or off value for the current object
var objType = parseInt(obj.objType); // get the type for this current object
if(objOn && (objType == 3 || objType == 4 || objType == 7)){ //if1 the body children and up only needs this for now
var chd = (obj.childQty)? obj.firstChild : 0; //sib = sibling Child(Chd)
for(var ii = 0; ii<obj.childQty;ii++){//for loop the siblings
var chdTdIdEnd = (objType != 3)? ii : 1;
var chdTd = parentDoc.getElementById("q"+obj.qNum+"t"+chdTdIdEnd);
var chdLastDiv = chdTd.getElementsByTagName("DIV")[chdTd.trueDivQty];
var chdTa = chdTd.getElementsByTagName("TABLE")[0];
chdLastDiv.style.height = "auto"; // I don't think the last div is needed
chdTa.style.height = "auto";
chd = chd.nextSibling;
}//for2
}//if1
}//for1

// reset any needed heights
for(i=0;i<templateObjs.length;i++){ //for1 
var obj = templateObjs[i]; // get the current div element which repersents a single Template Object
var objId = obj.getAttribute("zs"); // get the current div zsId .getAttribute("dcnu")
var objIdArray = objId.split("^"); // split the current object Id into an array
var objOn = parseInt(obj.isOn); // get the on or off value for the current object
var objType = parseInt(obj.objType); // get the type for this current object
var objSubType = parseInt(obj.objSubType); // get the sub type for this current object

//3-body, 4-Box, 20-menuBox, 50-crumbBox, 60-SnipitBox 
if(objOn && (objType == 3 || objType == 4 || objType == 7)){// obj.hasChildNodes()

var objTaId = (obj.objType != "3")? "q"+obj.qNum+"ita" : "qBodyTable";
var objTa = parentDoc.getElementById(objTaId);//Ta=Table
var chd = (obj.childQty)? obj.firstChild : 0; //sib = sibling
var objChildQty = obj.childQty;

for(var ii = 0; ii<objChildQty;ii++){//for loop the siblings
var chdTdIdEnd = (objType != 3)? ii : 1;
var chdTd = parentDoc.getElementById("q"+obj.qNum+"t"+chdTdIdEnd);
var chdTdTb= chdTd.parentNode.parentNode;
var chdDiv1 = chdTd.firstChild;
var chdDiv2 = chdDiv1.firstChild;
var chdDiv3 = chdDiv2.firstChild;
var chdLastDiv = chdTd.getElementsByTagName("DIV")[chdTd.trueDivQty];
var chdTa = chdTd.getElementsByTagName("TABLE")[0];

//offsetHeight
var chdTdOffsetHeight = chdTd.offsetHeight;
var chdDiv1OffsetHeight = chdDiv1.offsetHeight;
var chdDiv2OffsetHeight = chdDiv2.offsetHeight;
var chdDiv3OffsetHeight = chdDiv3.offsetHeight;
var chdLastDivOffsetHeight = chdLastDiv.offsetHeight;
var chdTaOffsetHeight = chdTa.offsetHeight;
//clientHeight
var chdLastDivClientHeight = chdLastDiv.clientHeight;// OffsetHeight should work not sure why I used it,
//var getboxHeight = (chdLastDivOffsetHeight < chdDiv2OffsetHeight)? chdLastDivOffsetHeight : 

//alert("objType:"+objType+" objChildQty:"+objChildQty+" objSubType:"+objSubType);

// vAlign sa1to3+? and FF1.5+? UA fix for getting the correct offset height on table cells. Sa was getting the size of the content, instead of the table-cell. I still can't figure out what FF was doing with it's extra spaces above, and weird overflow problem when a alert was fired in this function.   
chdTdTb.vAlign = "top";

//NEEDED Maybe weed out the browser UAs that don't need to use this method to uptain the table-cells offsetHeight..
// I don't think weeding out is a good idea right now, all the browser have a some problem problem, maybe a small effort is worth while, but I would not hold my breath
var getChdTdHeight = 0;
if(objType != 3 && (objChildQty==1 || objSubType==1)){// has only one table row || is a col(objSubType==1)
getChdTdHeight = objTa.offsetHeight;
//alert("one table row: " +getChdTdHeight);
}
else if(ii == 0 || objType == 3 || ii < objChildQty-1){// first table Row || bodyTable || middleRows
var chdNextTrTd = chdTd.parentNode.nextSibling.firstChild;
var subtractHeightBy=(ii==0&&objType!=3)?findElmPos(objTa)[1]:findElmPos(chdTd)[1];//firstRow:bodyTable,middleRows
getChdTdHeight =  findElmPos(chdNextTrTd)[1] - subtractHeightBy;
//(objType == 3)?alert("hello") : null; // still buggy here with FF
//alert("first||Middle||body table Row: "+ getChdTdHeight +"||||"+  findElmPos(chdNextTrTd) +"||||"+ subtractHeightBy);
//alert(chdNextTrTd +"|||"+ chdNextTrTd.offsetTop);
}
else{// last table row
getChdTdHeight =  (findElmPos(objTa)[1] + objTa.offsetHeight) - findElmPos(chdTd)[1];
//alert("last table row: "+ getChdTdHeight +"||||"+(findElmPos(objTa)[1] + objTa.offsetHeight) +"||||"+ findElmPos(chdTd)[1]);
}

chdTdTb.vAlign = "";

var getSpaceHeight = chdTdOffsetHeight - chdDiv1OffsetHeight; // not used yet // outerbox maybe
var getMarginBoxHeight = chdDiv1OffsetHeight - chdDiv2OffsetHeight; // not used yet,
var getChdLastDivExtraBoxHeight = (isStandardBoxMode)?chdDiv1OffsetHeight -chdLastDivClientHeight: 0;
var useBoxHt = getChdTdHeight - (chdDiv1OffsetHeight - chdLastDivOffsetHeight);
var getMargin = chdTdOffsetHeight - chdDiv2OffsetHeight; // not used yet
//var getLdHeight =  getMargin + chdTaOffsetHeight;
//var getLdHeight =  objTa.offsetHeight - (chdTdOffsetHeight-chdTaOffsetHeight);

if(DoIt=="setSize"){//ifdd
//alert(objType +"|||"+ getChdTdHeight +"|||"+ chdDiv1OffsetHeight +"||||"+ chdLastDivOffsetHeight);
//alert(isStandardBoxMode +"|||"+chdLastDiv +"||||"+ useBoxHt);
chdLastDiv.style.height = useBoxHt + "px";
chdTa.style.height = useBoxHt + "px";
//alert(useBoxHt);
}//ifdd

//alert("objTaOffsetHeight:"+objTa.offsetHeight + ", chdTdOffsetHeight:"+chdTdOffsetHeight +", chdDiv1OffsetHeight:"+chdDiv1OffsetHeight+", chdDiv2OffsetHeight:"+chdDiv2OffsetHeight +", chdDiv3OffsetHeight:"+chdDiv3OffsetHeight +", chdLastDivOffsetHeight:"+chdLastDivOffsetHeight+", chdTaOffsetHeight:"+chdTaOffsetHeight+", useBoxHt:"+useBoxHt);

chd = chd.nextSibling;
}//for2
}//if1
}//for1
//NOTE: parentBodyClass may not be needed, it's here just in case it's needed
///////////parentBody.className = parentBodyClass;// blank may not work in all browsers
qBody.style.visibility = "visible";
}//ifqBodyTable
}

// varibles needed when loading a document
var scrollBoxesNeeded = 0; // holds the amount of menu boxes needed to be created on document loading
//alert("hhhh|||||"+buildTimeNum);
window.timerID = null; // this is for holding open menu boxes
// needed setting after document has loaded
var mouseoutTimeOutValue = 1000; // The alotted time to keep a menubox open before closing it.
parentDoc.scroller = 0;

function findIdInOfVar(ArrayX,idNum,fTagName){
//finds a <b> element in a var of nested <b> elements using the id
// it can start from the begining of the nesting or form a selected <b> element
var elms = ArrayX.getElementsByTagName(fTagName);
var elmLength = elms.length;
//alert(elmLength);
for(var i = 0; i<elmLength;i++){
if(elms[i].id==idNum){
return elms[i];
}
}
return false
}

function qSetLayout(layoutObjs){
//(1)q1=on/off(2)q1=type(3)q1=objSubType(4)q0=snipitName(5)q1=borderType(6)q0=borderImageName(7)q11111111=borderImageSwitches(8)q1=isItaCenterForHeightorWidth (9)q1=centerMenuObj(10)q1=use menuArray 1 (11)1=start from menuArrayLevel at 1

//alert(qSnpVar);
//qLayouts.appendChild(parentDoc.getElementById("content1"));
//alert(qLayouts.innerHTML);
/*0073
// create a hidden element  on top of the document to place a elm to test it size every 2 seconds
var qdiv0 = parentDoc.createElement('div'); 
qdiv0.id = "qsizeBox";
qdiv0.style.position="absolute";
qdiv0.style.top="-9999px";
// maybe it can be put into qbodymen div and meassured there. This will also make less code because it will not need top
qdiv0.style.width = "10%"; // 100% seems to mess up ie. It add extra width space when appling left margin to the body table
qdiv0.style.fontSize="100%";
qdiv0.innerHTML="X<br />X";
(parentBody.firstChild)? parentBody.insertBefore(qdiv0,parentBody.firstChild) : parentDoc.getElementById("qBody").appendChild(qdiv0);
*/

// create a hidden element  on top of the document to place the pull down menus in
// I'm thinking this could go, by placing the menus in the doc by themselves
/*0073
var qdiv = parentDoc.createElement('div');
qdiv.style.display = "block"; // *******Note this should be set to display none or reset to block after build
qdiv.id = "qbodymen"; // not being used just here to to help coding, and may have a use some day
(parentBody.firstChild)? parentBody.insertBefore(qdiv,parentBody.firstChild) : parentDoc.getElementById("qBody").appendChild(qdiv);
//qdiv.style.position = "absolute";
//qdiv.style.zIndex="5000"; // this may need to add 5000 
*/
//var d = parentDoc.createElement("DIV");
qLayoutArray.innerHTML = layoutObjs;
//qLayoutArray.appendChild(d);

// Build the Template Objects
// function varibles Needed
//0062 var curNavLevId = 0; // keeps count of the current Nav level ID
var curNavLevObj = 0; // current Nav level Object
var template = qLayoutArray; // contains the menu arrays of div's and their a elements
//0073var template = qtdnStackSiteC; // contains the menu arrays of div's and their a elements
var templateObjs = template.getElementsByTagName("B"); // gets the Template Objects
var templateObjLength = templateObjs.length;
template.childQty = 0;
////NOTE// template.childsWithMaxWdSet = 0;// MAYBE NEEDED
////NOTE///template.childsWithMaxHtSet = 0; // may not be needed because the body obj I believe should always be 1

// loop the Templete Object div elements and mark up it's structure
for(i=0;i<templateObjLength;i++){ // for 1 
var objX = templateObjs[i]; // get the current div element which repersents a single Template Object
var objId = objX.getAttribute("zs"); // get the current div zsId .getAttribute("dcnu")
if(objId.indexOf("zz^") == 0){ // test if obj is on and it's a site obj //stasitq
//if(objId.indexOf("zzq") == 0){ // test if obj is on and it's a site obj //stasitq
objX.qNum = i; //keeps the parent qnum for placing it's children obj 
var objIdArray = objId.split("^"); // split the current object Id into an array
//alert(objIdArray);
var objOn = parseInt(objIdArray[1]); // get the on or off value for the current object
var objType = parseInt(objIdArray[2]); // get the type for this current object
var objSubType = parseInt(objIdArray[3]); // get the sub type for this current object
var objParent = objX.parentNode; // get the parent node for this object

objX.isOn = (objParent.isOn||i<1)?  objOn :0; // if both parent and current Div is on, then current div is on
objX.objType = objType;
objX.objSubType = objSubType;
objX.childQty = 0; // put a childQty on the current div so it's children can use it
objX.childsWithMaxWdSet = 0;// children with Max Width set
objX.childsWithMaxHtSet = 0;// children with Max Height set

if(objX.isOn && objType > 3){ //ift the body children and up only needs this for now
objX.parentSubNum = objParent.childQty; //holds the child number for the parent on the current div for it self i.e. q1q1
objParent.childQty++; // if current Div is on, add one to its parent's child qty
//alert(objParent.id + "|" + objParent.childQty);
if(parseInt(objIdArray[8])==2){//add to Max Width set qty
objParent.childsWithMaxWdSet++;  
}
if(parseInt(objIdArray[9])==2){//add to Max Height set qty
objParent.childsWithMaxHtSet++; 
}

if(objParent.objType == 5 || objParent.objType == 8){//if5/8 test to see if it's a buttonObject
(objType == 30)? objParent.pointerIsNeeded = 1: null; // see if a buttonObject has a subMenuObject
////killed0014///(objType == 31)? objParent.selectIsNeeded = 1: null; // see if a buttonObject has a selectButtonObject
//alert(objType == 30);
}//if5/8
if(objParent.objType == 35){ //if35  test to see if it's a subbuttonObject
//alert("jjjjh");
(objId.indexOf("q1") == 0)? objParent.pointerIsNeeded = 1: null; // this just turns it on all the time
////killed0014///(objType == 36)? objParent.selectIsNeeded = 1: null; // see if a subButtonObject has a subSelectButtonObject
}//if35
//if(objType == 60){ // test to see if it's a spaceObject, Then put iy 
//(objId.indexOf("q1") == 0)? objParent.pointerIsNeeded = 1: null; // this just turns it on all the time
//(objType == 36)? objParent.selectIsNeeded = 1: null; // see if a subButtonObject has a subSelectButtonObject
//}
}//ift
//alert(objX.parentNode.childQty + " | " + objX.parentNode.id);
//alert((objIdArray[1]==0) + " | " + objIdArray);
//alert(objX.qIsOn + "|" + objId.indexOf("q") + " | " + objX.parentNode.id);
} // end if 1
} // end for 1

// start building the Template Objects
for(i=0;i<templateObjLength;i++){ // for 1
var objX = templateObjs[i]; // get the current div
if(objX.isOn){ // if 1
var objId = objX.getAttribute("zs"); // get the current div zsId .getAttribute("dcnu")
var objParent = objX.parentNode; // get the current div's parent
var objParentChildQty = objParent.childQty; // get the current div's parent's Chlidren Qty
var objParentType = objParent.objType; // get the parent type
var objParentSubType = objParent.objSubType; // get the parent sub type

// **** (1)q1=on/off (2)q1=type (3)q1=objSubType (4)q0=snipitName (5)q1=borderType (6)q0=borderImageName (7)q11111111=borderImageSwitches *****
var objIdArray = objId.split("^"); // split the current Div Id into an array
var objType = parseInt(objIdArray[2]); // get the type this current object is
var objSubType = parseInt(objIdArray[3]); // get the subtype this current object is
var isLiquidWidth = (objIdArray[8] == "2")? 2 : false;
var isLiquidHeight = (objIdArray[9] == "2")? 2 : false;

if(objType==101){ //Window Node 
// this needs to be change to 1 or 1W
// current it does nothing, but one day it will allow the type of document tobe built in a var and a xml doc too 
}

else if(objType==1){ //HTML Element Node
// this needs to be change to 2 or 2D
// current it does nothing, but one day it will allow the type of document tobe built in a var and a xml doc too 
}

else if(objType==2){ //Head Element Node
// this needs to be change to 3 or 3H
// current it does nothing, but it could be used to set the title bar, include css files and meta tags and etc. 
}

else if(objType==3){ //Body Element Node
//alert(objType);
var checkTrQty = 3; // tr qty
var checkTdQty =1; // td qty
if(objX.hasChildNodes()){
objX.alignClassName = "q"+ objX.qNum + "ctda"; // it used to pass along parent align classname to child to set css text and vertical align . It allows Parent box objects to children  content boxes. 
makeTable07(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum, checkTrQty, checkTdQty,"notBeingUsed","notBeingUsed"); // make the table
}
//alert(parentBody);
parentBody.className =   "q"+objX.qNum+"cz"; //NOTE this will probally need tobe moved to onload
//alert(parentBody.outerHTML);
}

else if(objType==4 || objType==20 || objType==50 || objType==60|| objType==7){
objX.alignClassName = "q"+objX.qNum + "ctda " + objParent.alignClassName;// it used to pass along parent align classname to child to set css text and vertical align . It allows Parent box objects to children  content boxes.
//4-Box, 7-Page, 20-menuBox, 50-crumbBox, 60-SnipitBox 
//alert(objX.childQty+"|"+objParent.qNum +" | "+ objX.parentSubNum);
// **** (1)q1=on/off (2)q1=type (3)q1=objSubType (4)q0=snipitName (5)q1=borderType (6)q0=borderImageName (7)q11111111=borderImageSwitches *****
//alert(objIdArray[2]+ " | "+ objX.qNum +"|"+ 11+"|"+objX+"|"+0+"|"+objIdArray[5]+"|"+objIdArray[6]+"|"+objIdArray[7]);
var checkChildQty = (objX.childQty)? objX.childQty : 1; // if current div has child qty use it otherwise build it with 1 child
var checkTrQty = (objSubType==0)? checkChildQty : 1; // checks if the obj is set vertically or hort and set the tr qty
var checkTdQty = (objSubType==1)? checkChildQty : 1; // checks if the obj is set vertically or hort and set the td qty
//if(objType==20){
//checkTrQty = 3;
//}
//alert(objSubType +"|"+ checkTdQty);
//NOTE the fillBtnTD02 could return the div to place the makeTable07
fillBtnTD02(objX.qNum, objType, objSubType, 14, objX, 0, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for main frame object

makeTable07(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum,checkTrQty, checkTdQty,"notBeingUsed","notBeingUsed"); // make the table

// set the size
var placeItHereSubNum = (objType!=7)? objX.parentSubNum : objX.parentSubNum + 1;
var placeItHereObj =  findIdInOfVar(qLayoutDiv,"q"+objParent.qNum+"t"+placeItHereSubNum,"TD");
//0073var placeItHereObj = parentDoc.getElementById("q"+objParent.qNum+"t"+placeItHereSubNum);
//placeItHereObj.style.width = "auto";
if(objType!=7){//height
//objParentSubType==0 is rows //objParentSubType==1 is cols
// netscape 6 to 7.2 bug fix. Can't handle percentages of  4 .XXXX didget or greater
var useHt = (objParentSubType==1)? 100 : (objParent.childQty==1 || !objParent.childsWithMaxHtSet)? 100/objParent.childQty : (isLiquidHeight)? 100/objParent.childsWithMaxHtSet : 0 ;//height
var useWd = (objParentSubType==0)? 100 : (objParent.childQty==1 || !objParent.childsWithMaxWdSet)? 100/objParent.childQty : (isLiquidWidth)? 100/objParent.childsWithMaxWdSet : 0 ;//width
//alert("q"+objParent.qNum+"t"+placeItHereSubNum +"|||"+ objType +"||"+ isLiquidWidth +"|||"+ placeItHereObj.style.width +"|||"+ useWd);
(useWd)? placeItHereObj.style.width = useWd +"%": null;
(useHt)? placeItHereObj.style.height = useHt +"%": null;
/////alert("plaseItHereId: "+"q"+objParent.qNum+"t"+placeItHereSubNum+" objX.qNum:"+objX.qNum +" objParentSubType:"+objParentSubType+" objParent.childQty:"+objParent.childQty +" objParent.childsWithMaxHtSet:"+ objParent.childsWithMaxHtSet +" isLiquidHeight:"+ isLiquidHeight +" useHt:"+ useHt);
}

// obj is empty then do this
var spaceName = (objType==4)? "Box": (objType==20)? "menuBox" : (objType==60)? "SnipitBox": (objType==7)?"Page":"CrumbBox"; // just here for testing. a blank space needs to go here instead
//alert(spaceName);
var objTd =  findIdInOfVar(placeItHereObj,"q"+objX.qNum+"t"+0,"TD");
//var objTd =  findIdInOfVar(qLayoutDiv,"q"+objX.qNum+"t"+0,"TD");
//0073var objTd = parentDoc.getElementById("q"+objX.qNum+"t"+0);
if(!objX.hasChildNodes()){
objTd.innerHTML = spaceName;
objTd.className = objX.alignClassName;
}

//alert(arrayLevelMenuIds +"****"+document.getElementById(arrayLevelMenuIds[0][1]).selectedmenu);
//alert(objIdArray[10] +"|||||"+objIdArray[11]);
}

else if(objType==61){ //SnipitItem
//NEEDED objTd.className = objX.alignClassName;
// a if objX.parentSubNum<1 then it could build a snipitBox with muiltible snipits and content
makeTable07(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum,1, 1,"notBeingUsed","notBeingUsed"); // make the table
//alert("q"+objX.qNum+"t"+objX.parentSubNum);
var placeItHereObj =  findIdInOfVar(qLayoutDiv,"q"+objX.qNum+"t"+objX.parentSubNum,"TD");
//0073var placeItHereObj = parentDoc.getElementById("q"+objX.qNum+"t"+objX.parentSubNum);
///////var placeItHereObj = parentDoc.getElementById("q"+objParent.qNum+"t"+objX.parentSubNum);
placeItHereObj.className =  placeItHereObj.className +" "+ objParent.alignClassName;// it used to pass along parent align classname to child to set css text and vertical align . It allows Parent box objects to children  content boxes.
var snipitNum = setDiv.getAttribute("qN"+objIdArray[4]);
//alert("snipitNum: " + objIdArray[4]);
//alert(setDiv.outerHTML);
placeItHereObj.innerHTML = (parseInt(snipitNum)>-1)?setArray[snipitNum] :"Snipit-Item-Here";//table into it;s location
/////div0.id = "q" + objX.qNum + "i" + "0"; // the 0 may not be needed but maybe it's a good idea to be on the safeSide
}

else if(objType==5){//if1 menuItems
var mnuArrayNumIs = parseInt(objIdArray[10]);
var mnuArrayNum = (mnuArrayNumIs>=0)? setDiv.getAttribute("qA"+mnuArrayNumIs) : -1;
//alert(setDiv.getAttribute("qA"+mnuArrayNumIs));
var mnuArray = (mnuArrayNum>=0)? setArray[mnuArrayNum] : -1;
var mnuLevel = parseInt(objIdArray[11]);
if(mnuArray && mnuArray[mnuLevel]){
curNavLevObj =  mnuArray[mnuLevel];
//alert("curNavLevObj.outerHTML: "+curNavLevObj.outerHTML);
//alert(curNavLevObj.outerHTML);
}
else{//else1
curNavLevObj = false;
alert("arrayLevObjs[objIdArray[11] was not found");
// NOTE: ERROR PAGE DIRECTION, MIGHT BE NEEDED HERE
}//else1

var childDivs = (curNavLevObj)? curNavLevObj.childDivs : 0;
if(childDivs){//if2
//Switch the compare to boxes and body to keep logic
var checkTrQty = (objSubType==0)? 1 : childDivs; //if vert or hort and set the tr qty. 
var checkTdQty = (objSubType==1)? 1 : childDivs; //if vert or hort and set the td qty
var checkType = (objSubType < 1)? 5 : 8; // 5 hort and 8 vert
var pullmenuIsneeded = (objX.pointerIsNeeded != null)? (objX.pointerIsNeeded==1 )? true:false:false; // finds out if buttons have pullmenus option on
var selectIsNeeded = true; // ***NEEDSWORK finds out if buttons have selected menu option on
//////var selectIsNeeded = (objX.selectIsNeeded != null)? (objX.selectIsNeeded==1 )? true:false:false; // finds out if buttons have selected menu option on
makeTable07(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum,checkTrQty, checkTdQty,"notBeingUsed","notBeingUsed"); // make the table

fillBtnTD02(objX.qNum, checkType, objSubType, 14, curNavLevObj, pullmenuIsneeded, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,selectIsNeeded); // make the buttons

eval("window.q"+objX.qNum+"="+checkType+";"); // this holds the type of object it is or off if not used
}//if2
else{//NEEDSWORK HERE has no array or menus do what
curNavLevObj = false;
}
}//if1

else if(objType==30){ // dropMenuBox
// this get skipped for now but it could be used for something else later maybe 
}

else if(objType==35){ // dropMenu Items Makes the boxes and buttons
//alert(objParent.parentNode.qNum+1);
// selectIsNeeded could be handled by adding chars to (objIdArray[6].indexOf("s"))?
var selectIsNeeded = true; // ***NEEDSWORK finds out if buttons have selected menu option on
//killed0014//var selectIsNeeded = (objX.selectIsNeeded != null)? (objX.selectIsNeeded==1 )? true:false:false; // finds out if buttons have selected menu option on
//alert(objParent.parentNode.qNum +"|"+ curNavLevId +"|"+ selectIsNeeded +"|"+ objX.qNum);
// not sure it should get the num from parent or grand parent here
//NEEDSWORK objParent  would be better IO believe
qbuildmenus(objParent.parentNode.qNum,9,objSubType,curNavLevObj,selectIsNeeded);
//0062 qbuildmenus(objParent.parentNode.qNum,9,objSubType,curNavLevId,selectIsNeeded);
//qbuildmenus(objParent.qNum,9,objSubType,curNavLevId,selectIsNeeded);
// NOTE scroll Btn could make window.q  confussing if it ever needs to find this number,
//eval("window.q"+(objParent.qNum+1)+"="+9+";"); // this holds the type of object it is or off if not used
eval("window.q"+(objParent.parentNode.qNum+1)+"="+9+";"); // this holds the type of object it is or off if not used
}

else if(objType==55){ // breadCrumb Menus Items
var separatorChar = objIdArray[5];
var genClassNam = "q"+objX.qNum + "cz";
var mnuArrayNumIs = parseInt(objIdArray[10]);
var mnuArrayNum = (mnuArrayNumIs>=0)? setDiv.getAttribute("qA"+mnuArrayNumIs) : -1;
var mnuArray = (mnuArrayNum>=0)? setArray[mnuArrayNum] : -1;
//NOTE var mnuLevel = parseInt(objIdArray[11]);//maybe it can be used for sub levels
var mnuArrayLength = mnuArray.length;
var homeMnu = mnuArray[0]; // sould be called homePgMnu
var homeMnuId = homeMnu.id;
var selectMnu = mnuArray[mnuArrayLength-1];
var selectMnuId = selectMnu.id;

// NEEDS a way to test for no levels and use the home page with a link
mnuArrayLength = (homeMnuId==selectMnuId)? 1 : mnuArrayLength;
var placeItHereObj =  findIdInOfVar(qLayoutDiv,"q"+objParent.qNum+"t"+objX.parentSubNum,"TD");
//0073 var placeItHereObj = parentDoc.getElementById("q"+objParent.qNum+"t"+objX.parentSubNum);

//build the before node
if(objIdArray[6]){
var beforeSpace = parentDoc.createElement('span');
beforeSpace.className ="q"+objX.qNum+"cbz " + genClassNam;
var beforeSpaceText = parentDoc.createTextNode(objIdArray[6]); // this extra space may need to go
beforeSpace.appendChild(beforeSpaceText);
placeItHereObj.appendChild(beforeSpace);
//alert(placeItHereObj.innerHTML);
}

// build the crumbs
for(var ibc=0;ibc<mnuArrayLength;ibc++){
var selNavArrayElm = mnuArray[ibc];
//alert(selNavArrayElm.outerHTML);
if(selNavArrayElm.getAttribute("dcnu")){//ifdcnu
var dcNum = selNavArrayElm.getAttribute("dcnu").split("|");//  features
var textContent =  parentDoc.createTextNode(dcNum[1]);
if(mnuArrayLength!=1 && ibc < mnuArrayLength-1){// crumbs
//alert(ibc +"|||"+mnuArrayLength +"||||"+ selNavArrayElm.getAttribute("dcnu") +"||||"+ selNavArrayElm.id);
var separator = parentDoc.createElement('span');
var separatorText = parentDoc.createTextNode(separatorChar);//don't no about the extra space
separator.appendChild(separatorText);
separator.className ="q"+objX.qNum+"csz " + genClassNam;
var aElm = parentDoc.createElement('a');
aElm.className = "q"+objX.qNum+"caz " + "q"+objX.qNum+"chz " + genClassNam;

// add the link
var hLink = selNavArrayElm.getAttribute("ZH");
aElm.href = (hLink)?  hLink : "javascript:null";
aElm.appendChild(textContent);
placeItHereObj.appendChild(aElm);
placeItHereObj.appendChild(separator);
}
else{// last crumb 
var aElm = parentDoc.createElement('span');
aElm.className ="q"+objX.qNum+"clz "+genClassNam;
aElm.appendChild(textContent);
placeItHereObj.appendChild(aElm);
}
//alert(placeItHere.innerHTML);
}//endFor
}//ifdcnu
//--
//var div0className = (cc == tdSelected && selectIsNeeded)? ("q"+objQumber+"cs "+"q"+objQumber+"c"): ("q"+objQumber+"c"); // the selected class most come first on selected objs
//--
}//end55


else if(objType==80){ // this builds a snipit Box  

fillBtnTD02(objX.qNum, objType, objSubType, 11, objX, 0, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for the object

makeTable07(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum,1,1,"notBeingUsed","notBeingUsed"); // make a table for the object
var placeItHereObj = parentDoc.getElementById("q"+objX.qNum+"t"+0);
var snipitVar = (eval("window.qqSnpw"+objIdArray[4])=="t")? eval("qqSnp" + objIdArray[4]) : false;
var div0=parentDoc.createElement('div');  	// - create a div element 
div0.id = "q" + objX.qNum + "i" + "0"; // the 0 may not be needed but maybe it's a good idea to be on the safeSide
//div0.getElementById(placeItHere).className = "";
div0.innerHTML = (snipitVar)?snipitVar.innerHTML:"SnipitHere";
//alert(div0.innerHTML);
placeItHereObj.appendChild(div0); // put the table into its location
//NOTE: Not sure if isLiquidWidth is correct here. Might be going on the wrong td.
// I believe two width need to be set. One on the outer TD and the other on the inner TD.
//--
// this does it without a div
//var snipitVar = (eval("window.qqSnpw"+objIdArray[4])=="t")? eval("qqSnp" + objIdArray[4]) : false;
//var snipitCode = (snipitVar)?snipitVar.innerHTML:"<div>SnipitHere</div>";
//placeItHereObj.
//parentDoc.getElementById("q"+objX.qNum+"i"+0).innerHTML = snipitCode;
//--
}

else if(objType==90){ // this builds a snipit object // content object needs to go here
alert("snipit90");
var placeItHere = "q"+objX.qNum+"i"+0;
var snipitName = objIdArray[4];
var snipitCode = (parentDoc.getElementById("qqSnp"+snipitName) != null)? parentDoc.getElementById("qqSnp"+snipitName) : parentDoc.createElement('div');

fillBtnTD02(objX.qNum, objType, objSubType, 11, objX, 0, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for the object

makeTable07(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum,1,1,"notBeingUsed","notBeingUsed"); // make a table for the object
parentDoc.getElementById(placeItHere).appendChild(snipitCode);
}
else null;
} // end if 1
} // end for 1
//alert(qLayoutDiv.innerHTML);
return true;
}

function buildarraysPart1(){
// (buildTimeNum==1)? alert(qLayoutDiv.innerHTML) : null;
//alert(qLayoutDiv.innerHTML);
// macSa1.5+ bug adding className to body here causes it to create double inserts of the elements below// needs more testing
//CSS
//alert(stacksiteFolder +"t/"+jsTagClassNames[11] + "/g.css");
qadlnk( stacksiteFolder +"t/"+jsTagClassNames[11] + "/g.css?"+jsTagClassNames[4]);
parentBody.insertBefore(qSizeDiv, parentDoc.getElementById("qBody"));
var t = qLayoutDiv.firstChild;
//alert(qDropMnuDiv.innerHTML);
//alert(qLayoutDiv);
//alert(qLayoutDiv.innerHTML);

//alert(t);
if(t){ 

parentBody.insertBefore(qDropMnuDiv, parentDoc.getElementById("qBody"));
parentBody.insertBefore(qLayoutDiv.firstChild, parentDoc.getElementById("qBody"));
}
/*00NOTE
var t = parentDoc.getElementById("qBodyTable");
if(t){
/// The following is a fix to get ride of  is_ie in the t.style.display = (is_ie)? "block" : "table"; // ie+? crashes on block and its the only browser that understands display:block on a table element. The following is the fix. ie removes the display altogether because it does not understand display:table. All others change it, accept op7.5+? which keeps the "none" value. So the fix for op7.5+? is to test for "none" and use style.display=table
t.style.cssText  = t.style.cssText.replace("none","");//.replace("none","") Works too
(t.style.display=="none")? t.style.display="" : null; //op7.5+? // display="table" Works too
// t.style.display = (is_ie)? "block" : "table"; 
}
*/
parentDoc.getElementById("qBody").style.display = "block";
return true;
}

function buildarraysPart2(){

//alert("HHH"+qLayoutDiv.innerHTML);
qqSnp = null;
//alert("dddddddd");
//qArray = setDiv = null; // To cut down on memory code. Not sure if this will have any benifit, Needs testing
textSizeChange("firstTime");
setTimeout("testcode()",4000);
//testBtn();
showBrowserVer();
//setTimeout("showBrowserVer()",3000);
return true;
}

function buildarraysPart3(){
alert("it went to far. There should not be a buildarraysPart2");
}

function makeTable07(objQumber,objType,objSubType,parentqNum, parentSubNum,trs,tds,notUsed0,notUsed1){
//NOTE objSubType is not in use // maybe it can be removed 
var curTdCount = 0; // not being used
var t = parentDoc.createElement('table');  	// - start by creating the table element
t.style.fontSize="100%";// ie5.5 and maybe others in quirkmode need this to maintain text size, I don't know if inheit works
t.cellSpacing = "0";
t.cellPadding = "0"; // mixed may need a css fix or setAttr 
t.border = "0";

//3-Body, 4-Box, 7-Page, 20-menuBox, 50-crumbBox, 60-SnipitBox 
// 5-menuitem, 61-snipititem
if(objType==3){
t.id = "qBodyTable";
t.className =  "q" + (objQumber + 1) +"cta"; // not sure if it 
t.style.height = "100%";
//NOTE 0073 t.style.display = "none"; // maybe a body class .displayOn table{display:table} can turn on the tables onload
}
else if(objType==4||objType==20||objType==50||objType==60){
t.id = "q" + objQumber + "ita";
//t.className =  "qreSizer"; //qreSizer is being used
t.style.height = (!is_ie6 && is_ie)? "0%" : "auto";// needs testing auto should work/
t.style.width = "100%";
}
else if(objType==5 || objType==61){//if1 // menuitem//snipititem
t.id = "q" + objQumber + "ita";
;// NOTE####I don't think qreSizer is being used here and can be remove. If it does then a qBody vAlign should fix it.
t.className = "q" + objQumber +"cta";
///t.className =  "qreSizer " +  "q" + objQumber +"cta"
t.style.height = (!is_ie6 && is_ie)? "0%" : "auto";// needs testing auto should work/
t.style.width = "auto";
}//if1

else if(objType==7){
t.id = "q" + objQumber + "ita";
t.style.height = (!is_ie6 && is_ie)? "0%" : "auto";// needs testing auto should work/
//alert(t.style.height);
t.style.width = "100%";
}

//t.className =  (objType==3)?  "q" + (objQumber + 1) +"cta" : "qreSizer";
//t.style.height = (!is_ie6 && is_ie)? "0%" : "auto";  // SA might hate this on scaling // ie might need 0% it might be on ie5 only needs testing
//t.id = (objType==3)? "qBodyTable" : "q" + objQumber + "ita";
//t.style.display = "block";
//t.style.background = "orange";
//t.style.textAlign = "right";
//alert(t.style.textAlign);
//t.style.width = "0%";
//t.style.margin = "0px auto";
//t.style.marginLeft = "auto";
//t.style.marginRight = "auto";
//t.style.marginTop = "auto";
//t.style.position ="relative";
//t.align = "center";
//t.style.height = "0px";  // SA browsers might hate this on scaling // ie might need 0% it might be on ie5 only needs testing
//t.onmouseover=t.onmouseout=t.onmousedown=t.onmouseup=t.onclick= qMouse_Event_Table;

var tb=parentDoc.createElement('tbody');  	// - create a tbody element TO WORK IN WIN IE5+ !!
//tb.className=objQumber+"c"+"tb";  	 // maybe tb can be put to use, but it's buggy on styles

// - now create the td and tr elements with a for loop inside a for loop
//This puts the td in the tr elements and the tr in the tb element with a for loop inside a for loop
for(var c=0;c<trs;c++){ // the total tr qty needed // 1-for
var tr=parentDoc.createElement('tr'); // - this creates a var tr element

for(var cc=0;cc<tds;cc++){ // the total td qty needed // 2-for
var td=parentDoc.createElement('td'); //this create one td element
td.id="q"+objQumber+"t"+curTdCount; // may need "t" change to "i" hover elements may need this
//td.class = "q"+objQumber+"ct"
if(objType!=3 && objType!=20){
td.style.height = (!is_ie6 && is_ie)? "0%" : "auto";
}
//(objType==4)?td.style.verticalAlign="top":null;

//(objType==5)? td.className  = "q"+objQumber+"cetd": null;
//(objType==61)? td.className  = "q"+objQumber+"cy": null; // this is 4 text align may be it should be cz to match the others
if(objType==3){// crumb, menu and (snipitBox and box don't need this
//td.style.height = "100%";
td.className  = "q"+(objQumber+1)+"ctd"+c;
//(c == 0)? td.style.verticalAlign="bottom" : null;
//(c == 2)? td.style.verticalAlign="top" : null;
// It's here for testing only
//(c == 0)? td.style.background="red" : null;//for testing
//(c == 1)? td.style.background="white" : null;//for testing
//(c == 2)? td.style.background="blue" : null;//for testing
}
else if(objType==4){
td.style.fontSize="100%";
}
else if(objType==5){// menuItems
td.className  = "q"+objQumber+"cetd";
}
else if(objType==20){// menuBox
td.className  = "q"+(objQumber+1)+"ctd"+c;
//td.style.background = "green";
//t.className =  "q" + objQumber +"ctd"; // NOTE I don't think qreSizer is needed maybe to keep the button from moving the box size when resized on hover // this may need the parent q number
/////////////td.setAttribute("imHEREimHERE", "ZZZZZZZZZZ");
////////td.style.verticalAlign = "bottom";
//t.style.lineHeight = "0%";
}
else if(objType==61){// snipitItem
td.className  = "q"+objQumber+"cy";
}

if(objType==50 || objType==60){// crumb, menu //snipit box may need this
}
curTdCount++;
tr.appendChild(td);
//tr.appendChild(tabtd04(c,cc,objQumber,objType,objSubType,tds,trs,"notUsed","notUsed","notused","notused"));
} // for 2
tb.appendChild(tr); //puts the tr elements into the tbody // the eval is not needed
} // for 1

t.appendChild(tb);	// - put the tbody into the table

if(objType==3){//Body
var putItHere = qLayoutDiv;
}
else if(objType!=5 && objType!=61){
var putItHere = findIdInOfVar(qLayoutDiv,"q"+objQumber+"Ld","DIV");
}
else{
var putItHere = findIdInOfVar(qLayoutDiv,"q"+parentqNum+"t"+ parentSubNum,"TD");
}
putItHere.appendChild(t);
//alert(putItHere.innerHTML);

if(objType==5||objType==61){// menu items and snipit // I don't think this will be need since is's goning to use td as align
putItHere.className =  "q" + objQumber +"ctd"; // NOTE I don't think qreSizer is needed maybe to keep the button from moving the box size when resized on hover // this may need the parent q number
}
//alert(qLayoutDiv.innerHTML);
} // makeTable05-end

function fillBtnTD02(objQumber,objType,objSubType, divqty, divObject, pointer_isneeded, notUsed0, notUsed1, borderImg, parentqNum, parentSubNum, selectIsNeeded){
//alert("divObject.outerHTML: "+divObject.outerHTML);
//NOTE: the follow could work by using the this statement to change some classes:
// I think this would be taxing on the elements if it was used, but maybe. Needs thinking and testing
//<div class="startClass"
//onmouseover="this.className='Hover'"
//onmouseout="this.className='out'"
//onmousedown="this.className='Active'"
//onmouseup="this.className='up'"
//>
//</div> 
var bgType = parseInt(borderImg); // 0= off  i don't think this is needed
var bgs = (borderImg && borderImg.indexOf("_")>-1)? borderImg.split("_") : 0; // backGrounds
var bgImageFolder = 0;
var bgFill = 0;
var bgFillType = 0;
var bgBorders = 0;
var bgBorderType = 0;
if(bgs && bgs[0]&&bgs[1]&&bgs[2]){
bgBorderType = bgs[0];
bgImageFolder = bgs[1];
bgBorders = bgs[2];
//(bgs[2])? bgFill = bgs[2] : null;
//bgBorders
}
var imgCssPostion = ["top repeat-x","bottom repeat-x","left repeat-y","right repeat-y","left top no-repeat","right top no-repeat","left bottom no-repeat","right bottom no-repeat"];

var isObjTypeDivBtn = objType == 5 || objType == 8 || objType == 9; // objType.indexOf("bt");
var isObjTypeDivBox =  !isObjTypeDivBtn&&(objType==4||objType==20||objType==50||objType==60||objType==7);  // objType<5 || objType>12 // // objType.indexOf("bx");
////////var borderNames = [0,"T","B","R","L","TL","TR","BL","BR"]; // not used not sure to use numbers or chars
//var borderNames = ["TL","T","TR","R","BR","B","BL","L"];
// I think spliting Names below would save code space below ie. m|b1|b2| and so on
///////var classNms = ["m","e","b1","b2","b3","b4","b5","b6","b7","b8","b9","b","p","l"];// the c get put on front on the for loop
//var idNames = ["cm","cb1","cb2","cb3","cb4","cb5","cb6","cb7","cb8","cb9","cb","cp","c"];
if(divObject){ // this makes sure there is tabs and also buttons and menus
//window.status=(divObject +" | " + divqty + " | " + divlevel);
//alert(objType +"|||"+ divObject.id +"|||");
var tdSelected = (divObject.selectedmenu!=null)? divObject.selectedmenu : -1; // I think Netscape hates null 
//alert(objType +"|"+ tdSelected+"|"+selectIsNeeded);
var tdQTY = (isObjTypeDivBtn)? divObject.childDivs: 1; // this get the number of tds needed // boxes only 1
//alert(objType +"|||"+tdQTY);
for(var cc=0; cc < tdQTY;cc++){//
//alert(cc+"|||"+objType +"|||"+tdQTY);
var useSelected = cc == tdSelected && selectIsNeeded;
var bgBorderStrType = (bgBorderType>0 && tdQTY>1)? (cc == 0)? (objType!=8)?'1010': '1100': (cc + 1 != tdQTY)? '0000': (objType!=8)?'0101':'0011':'1111'; // create a string for a tube
// It is posfible to put objType9 in emkbz where p is moved into b basically padding is moved into border 
var divStr = (objType!=9)? "emk"+"1111"+bgBorderStrType + "bpz" : "emkbpz"; // divString
var trueDivQty = -1;
var trueBdrQty = -1;
//alert(divStr);
for(var ccc=0; ccc < divqty;ccc++){//forDivs
var divStrX = divStr.charAt([ccc]);
var isDivStrXaNum = (parseInt(divStrX)>-1)? true : false;
(isDivStrXaNum)? trueBdrQty++ : null;
// check if border is on for tube and settings
var isBgImgOn=(divStrX=="1"&&bgBorders&&bgBorders.charAt(trueBdrQty)=='1')?1:0; 
if((!isDivStrXaNum && !isBgImgOn)  || isBgImgOn){//ifDiv
//alert("objType:"+objType +"**"+"divStrX:"+divStrX+"**"+"isBgImgOn:"+isBgImgOn+"**"+"isBgImgOn:"+isBgImgOn+"**"+"isDivStrXaNum:"+isDivStrXaNum);
trueDivQty++; // added this on build 49
eval("var div"+(trueDivQty)+"=parentDoc.createElement('div');");
var divX = eval("div"+trueDivQty);
var classMid = (isBgImgOn)? "b" + trueBdrQty : divStrX;
//var classMid = (isBgImgOn)? "b" + ccc-2 : divStrX;
//selected class most come first
var classFront =(isObjTypeDivBtn)?"q"+objQumber+"cc"+classMid+" q"+objQumber+"ch"+classMid+" q"+objQumber+"c": "q"+objQumber+"c";
divX.className = (useSelected)? classFront+"p"+classMid+" "+ classFront+classMid : classFront+classMid;
(ccc>0)? null : (isObjTypeDivBtn)? divX.className = "q"+objQumber+"ce":null; // may need to put in something to test if blank qe_e // stands for blank
//alert(trueDivQty +"***"+divX.className);
if(isBgImgOn){//isBorder
divX.style.background="url("+stacksiteFolder+"b/"+bgImageFolder+"/"+(trueBdrQty+1)+".gif) "+imgCssPostion[trueBdrQty]; }//isBorder
/*
else if (isObjTypeDivBtn){//ifBtn
if(divStrX == "p"){//ifDivP
//divX.className = divX.className 
}//ifDivP
}//ifBtn
*/
}//ifDiv

}//forDivs

//alert("objType:"+objType +"****"+ trueDivQty);
//the last nested div, and it sit's on top of everything.
var lastDiv = eval("div"+trueDivQty);

if(isObjTypeDivBtn){ // for button objects // 5 6 8 9
//alert(divObject.id +"||"+ cc);
var mnuObj = findIdInOfVar(divObject,divObject.id+"m"+cc,"B");
var dcNum = mnuObj.getAttribute("dcnu").split("|");//  features
//var div0issub = mnuObj.childDivs && pointer_isneeded; //check if a pointer is needed
//alert(parseInt(mnuObj.getAttribute("dcnu")) +"|||||"+ pgNum);
var tdImage = "";
var tdText =  dcNum[1];
var tdPointer = (mnuObj.childDivs && pointer_isneeded)? (objType == 5)? "&#9660;" : "&#9658;" :  ""; //9660 is the down
//var useClassOrSize = (objType == 9)? "class='SSnone'":"width:100%";
// q6ccz q6chz q6cpz q6ccz q6chz q6cz
if(objType == 5){
//var taXClass = lastDiv.className.replace(/z/g,"x");
var tableCode = "<table class='"+lastDiv.className+"' style='' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='width:0%'>"+ tdImage+"</td><td style='width:auto'>"+tdText+"</td><td style='font-size:50%;vertical-align:bottom; width:0%'>"+tdPointer+"</td></tr></tbody></table>";
//var tableCode = "<table style='width:auto' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='width:0%'>"+ tdImage+"</td><td style='width:100%'>"+tdText+"</td><td style='font-size:50%;vertical-align:bottom; width:0%'>"+tdPointer+"</td></tr></tbody></table>";
//////div0.className = "EEE"; // JUST FOR TESTING
//alert(div0.className);
lastDiv.className = "";
//div0.style.marginTop ="100px";
}
else{
//var displayType = "dd";
var tableCode = "<table class='SSnone' style='width:auto' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='width:0%'>"+ tdImage+"</td><td class='SSnone'>"+tdText+"</td><td style='font-size:50%; vertical-align:bottom; width:0%'>"+tdPointer+"</td></tr></tbody></table>";
div0.className = "EEE"; // JUST FOR TESTING

}
lastDiv.innerHTML = tableCode;
// this changes the div to and a aElm to allow right clicking to open a link in a new window or tab UA
/* this worked but putting it on div2 below is a far better solution
var getDiv3Class = div3.className;// grad the className off the div that was built
var getDiv3Bkg = div3.style.background;
div3 = parentDoc.createElement('A');// change div two into a aElm
div3.className = getDiv3Class;
// Could be just pointer if I decide not to support ie5.5.
div3.style.cssText = "cursor:pointer";// sa op, ff, ie6+
if(div3.style.cursor != "pointer"){
div3.style.cursor = "hand";//ie5-
}
div3.style.background = getDiv3Bkg;
div3.style.display = "block";
div3.href = "/";
*/
// this changes the div to and of aElm to allow right clicking to open up a link in a new window or a tab UA
// ie8-beta below does not support the use of a aElm around block elements, nor does it care it's being nested around a block. 
// NEEDED a way to test if the browser supports a block nested in a aElement. 
var getDiv2Class = div2.className;// grad the className off the div that was built
//var getDiv2Bkg = div2.style.background;
div2 = parentDoc.createElement("A");// change div two into a aElm
//:link    { color: red }
div2.className = getDiv2Class;
// Could be just pointer if I decide not to support ie5.5.
div2.style.cssText = "cursor:pointer";// sa op, ff, ie6+
if(div2.style.cursor != "pointer"){
div2.style.cursor = "hand";//ie5-
}
////div2.style.background = getDiv2Bkg;
div2.style.display = "block"; // not sure this is needed, but it should stay to keep with dom specs
// inherit turns off the :link color but ie still keeps the :link color and it needs cssText or it throws an error.I think making the color black would help then the developer can change it to what ever they want, transparent work on ie but other browsers make it really trans parent // trans parent could work if I make btns require a color or I could right the program that sets this setting automaticalyy by looking at it's parent nodes to see what color they r set. this will need a solution at some point, but for now I'll set it to black
//////div2.style.color = "black"; // inherit
div2.style.color = "black";

// add the link
var hLink = mnuObj.getAttribute("ZH");
div2.href = hLink;

//div0.style.width = "auto";
// Putting the id on div2 is ok. If moved to div1, then dropmenu boxes id will need to change to, because it gets it's id from the parent holding the event it was fired on too. Not sure anymore if that's all true. I moved this id around so much on each build, I'm not sure where the events get there ids on the menu box anymore.  
///alert("objQumber|||||"+objQumber);
div2.id = "q"+objQumber+"i"+divObject.id+"m"+cc;
//alert("divObject.id:::"+divObject.id+"||||"+"div2.id::::"+div2.id);
//(objType == 9)? alert(div2.id):null;
div2.onmouseover=div2.onmouseout=div2.onmousedown=div2.onmouseup=div2.onclick= qMouse_Event;
div2.qHasChild = mnuObj.childDivs;
//div2.you = "div2XX";
/* off for testing the aElm change above for tab opening
// Could be just pointer if I decide not to support ie5.5.
div2.style.cssText = "cursor:pointer";// sa op, ff, ie6+
if(div2.style.cursor != "pointer"){
div2.style.cursor = "hand";//ie5-
}
*/

//div2.style.cursor = (is_ie)? "hand" : "pointer";

// Note : lineHeight does not work with none by adding it here,. It does work by putting it in a css sheet. Also I don't think it's is a valid prop by the w3c specs.  1 does cut it down some, but not like none in the css sheet
//////lastDiv.style.lineHeight = "1";// NEEDED MAYBE better to put this in cz in CSS and let them decide
///NOTE//gets the href value from the a element from auto select // its better to find frame instead, but this could change back
//div0.href = document.getElementById(divObject.id+cc).href;
// BOX sizing is out for the moment but I may put it in to set the size to the outside of the border someday
//.backnone,.backnie6{cursor:pointer;cursor:hand;box-sizing:border-box;-moz-box-sizing:border-box}
}

else if(isObjTypeDivBox){ // boxes
 // puts a id onto the last nested div // the id is put on tempalary to help place the table then I 
lastDiv.id = "q"+objQumber+"Ld"; //make it last elm id in the table building function
lastDiv.className = lastDiv.className + " qreSizer";
"q"+objQumber+"i"+divObject.id+"m"+cc +"a";
//lastDiv.style.height="auto";
// NOTE MAYBE NEEDED ie6 may need width:auto on lastDiv
//lastDiv.style.display =(is_nn7 || is_nn6 || is_op)? "table" : "inline"; 
//div3.style.position =(is_nn7 || is_op || is_sa)? "relative" : "static"; // when element is in a table and needs cords info this is required for element // some sa ver browsers might hat this

}

if(objType == 9){//else9 this is for the scroll menus
//overflow = "hidden" in objType 9 loses width in FF 
////lastDiv.className =  'SSnone '+lastDiv.className;
/////(is_ie)? div0.style.height = "auto" : null; // this fixes a win ie bug with holding the correct bottom margins when set to auto width
}//else9

else if(objType == 5 || objType == 6 || objType==8){ // 5==tabs,6==bars, 8=sidemenu
// this is to make the open in a tab to work
//NOTE putting a Aelm over a btn did not work. The Events below it would not fire.  I could put all the events on the a element and size it to fit on top of each btn. I don't like this idea, I think ie will support links around blocks someday. Everyone supports it accept ie. Sizing it over a button would work, but it might have problems on drop down menus.  Putting a Aelm around a button in a drop down menu may have the same problems. Needs testing to see if it would. Also I could test for right click or key presses but how does one know what key is pressed. 
//
/*
var aElm =parentDoc.createElement('A');
aElm.innerHTML = "";
aElm.href = "/";
aElm.style.top = "100px";
aElm.style.left = "100px";
aElm.style.position = "absolute";
aElm.style.padding = "10px 5px";
aElm.style.zIndex = "0";
//aElm.style.paddingBottom = "33px";
aElm.style.background = "yellow";
//aElm.style.display = "block";
*/
// I made sa use a block now because of a scaling bug 
// Since 8.0 works i'm just going to get ride of this
if(is_op){ // is_op does not care if it's block or table, and if relative or static // 8.00 and above does not need this
// mac op7.6 needs this other wise the menuItems don't show up
// op likes this line for some odd reason // not sure why it needs the condtions
//sa hates haveing a block or table it has scaling problems
lastDiv.style.display =(is_nn7 || is_nn6 || is_op)? "table" : "block"; // when element is sized to ex ns needs this, also em does not work at all in ns 6.2 and below //sa hates haveing a block or table it has scaling problems
div3.style.position =(is_nn7 || is_op || is_sa)? "relative" : "static"; // when element is in a table and needs cords info this is required for element // some sa ver browsers might hat this
//lastDiv.style.width = "100%";
}
} // 5

//alert(objType);
//eval("div"+trueDivQty).appendChild(div0); //this put the div) element in the last div numbered by the # trueDivQty
//alert(trueDivQty);
for(var ccc=trueDivQty; ccc > 0;ccc--){
//alert(ccc+1);
eval("div"+(ccc-1)).appendChild(eval("div"+(ccc)));//this put the divs in the divs
}
//eval("div"+trueDivQty).appendChild(div0); //this put the div) element in the last div numbered by the # trueDivQty
//for(var ccc=trueDivQty; ccc > 1;ccc--){
//eval("div"+(ccc-1)).appendChild(eval("div"+ccc));//this put the divs in the divs
//}
//(objType == 9)? alert("divObject.id|||||| "+divObject.id) : null;
//alert(div1.innerHTML);
//alert(objType +"|||"+ objQumber +"|||"+ cc );
//alert(cc +"|||"+ objType +"|||"+ objQumber +"|||"+ parentDoc.getElementById("qBody").innerHTML);

var placeithereId = (objType == 9)? "q"+objQumber+"i"+divObject.id +"m" : (objType== 5||objType== 8)?  "q"+objQumber+"t"+ cc : (objType == 7)? "q"+parentqNum+"t1" : (isObjTypeDivBox)? "q"+parentqNum+"t"+parentSubNum :"q"+objQumber+"i"+cc; // get the location it needs to be put in
//alert(parentBody.outerHTML);
//(objType == 7)?alert("placeithereId|||||||| "+placeithereId):null;
//alert(qLayoutDiv.innerHTML);
var useTagName = (objType != 9)?"TD": "DIV";
var inTheDiv = (objType != 9)?qLayoutDiv: qDropMnuDiv;
var placeithere = findIdInOfVar(inTheDiv,placeithereId,useTagName);
//0073var placeithere = parentDoc.getElementById(placeithereId);
//(objType == 7)?alert(placeithere):null;
placeithere.trueDivQty = trueDivQty;
placeithere.appendChild(div0);//this put the divs in the td element
////if(objType == 5 || objType == 6 || objType==8){// WQE 5==tabs,6==bars, 8=sidemenu // NOTE I think boxes could have a links too// not sure what to use them for or if they will mess up other surface a links
///////placeithere.appendChild(aElm);
////}//WQE
//(objType == 5)?alert(placeithere.innerHTML):null;

} // this is the end of the for(var cc=0; cc < tdQTY;cc++)
//alert(placeithere);
} // this ends the if (divObject)
else null;
//alert(qLayoutDiv.innerHTML);
} // this is the end of the fillBtnTD function 

function qbuildmenus(objQumber,objType,objSubType,curNavLevObj,selectIsNeeded){
var menu = curNavLevObj.getElementsByTagName("B");
var menuQTY =  menu.length;
//alert("menuQTY: "+ menuQTY);
for(var c=0; c < menuQTY;c++){ // this starts the loop for the first menu tree

if (menu[c].childDivs){
var d0 = parentDoc.createElement('div'); // start by creating a box for each group of menus
d0.id = "q"+(objQumber+1)+"i"+menu[c].id +"m";
//alert(d0.id +"||||"+ d0 +"||||"+menu[c].id);
d0.style.display = "none"; // I don't think this is needed because the outer is already at none, not sure
//menuselect parts only here to see it to help code building// maybe can have a use or removed from final build
d0.className = "qDmnuSubSizer menuselect";
var menuBox_Levl = menu[c].id.match(/m/gi).length + 1;
//alert(menuBox_Levl +"||"+scrollBoxesNeeded);
// build a menubox if needed qDropMnuDiv  findIdInOfVar(qLayoutDiv,placeithereId,"TD")
(menuBox_Levl > scrollBoxesNeeded)? qmakescrollbox(qDropMnuDiv,"q"+(objQumber+1),menuBox_Levl): null; 
findIdInOfVar(qDropMnuDiv,"q"+(objQumber+1)+"bodymen"+menuBox_Levl+"holderdiv","DIV").appendChild(d0);
//0073 (menuBox_Levl > scrollBoxesNeeded)? qmakescrollbox('qbodymen',"q"+(objQumber+1),menuBox_Levl): null; 
//0073parentDoc.getElementById("q"+(objQumber+1)+"bodymen"+menuBox_Levl+"holderdiv").appendChild(d0);
//alert(parentDoc.getElementById("q"+(objQumber+1)+"bodymen"+menuBox_Levl+"holderdiv").innerHTML);
}
else{
null;
//alert("helloworld1234");
}
fillBtnTD02(objQumber+1,objType,objSubType,6, menu[c],true,"notUsed","notUsed",0,0,0,selectIsNeeded); // this fills in the menus for each box built
} // end of for loop
scrollBoxesNeeded = 0;
}

function qmakescrollbox(putObjHere,objQumber,menuBox_Levl){ // this makes a scrollbox
//0073function qmakescrollbox(putObjHereID,objQumber,menuBox_Levl){ // this makes a scrollbox
//alert(putObjHereID);
scrollBoxesNeeded = menuBox_Levl;

var d00 = parentDoc.createElement('div');  	// - start by creating the MB_outer div element
var d1 = parentDoc.createElement('div');     	//  MB_btnT top scroll button
var d2 = parentDoc.createElement('div');     	//  MB_holder
var d3 = parentDoc.createElement('div');     	//  MB_btnB bottom scroll button
////var d1Text=parentDoc.createTextNode(" \/\\ ");//  MB_btnT text node
//var d3Text=parentDoc.createTextNode(" \\\/ ");//  MB_btnB text node

d00.onmouseover = MenBoxOver;
d00.onmouseout = MenBoxOut;
// Could be just pointer if I decide not to support ie5.5. also the following works too //d00.style.cursor = (parentDoc.documentElement.clientWidth)? "pointer" : "hand";// only is_ie ie5to5.5 needs hand
// clientWidth could fail if documentElement is set to 0 on some UA // also this works too, but ie6+ will use hand, cssText seem to work the best on all UA // //d00.setAttribute("style","cursor:pointer")
d00.style.cssText = "cursor:pointer";// sa op, ff, ie6+
//d00.style.cssText = "cursor:pointer;display:none;position:absolute;left:0px;top:-10000px";// sa op, ff, ie6+ op hates this not sure why
if(d00.style.cursor != "pointer"){
d00.style.cursor = "hand";//ie5-
}
//alert(d00.style.cursor);

//d00.style.cursor = (is_ie)? "hand" : "pointer";
d00.className = "menuBlock "+objQumber+"cmenuBox ";// currently menuBlock class is not being used
///d00.style.cssText = "display:none;position:absolute;left:0px;top:-10000px;"+d00.style.cssText;// op hate this, not sure why 
//alert(d00.style.cssText);
d00.id = objQumber+"bodymen"+menuBox_Levl;
//alert(d00.id);


d1.info = d3.info = menuBox_Levl;//this is for scrollbox's level
d1.onmousemove = d3.onmousemove = ScrollMove;
d1.onmouseover = d3.onmouseover = ScrollOver;
d1.onmouseout = d3.onmouseout = StopScroll;
d1.className = d3.className = objQumber+"cScrollBtn menuScrollBtn";
d1.style.zIndex= d3.style.zIndex=menuBox_Levl; // this may need to add 5000 + menuBox_Levl to cover all bases and fix any errors with other things on developers work
//d1.style.zIndex= "5000";
//d3.style.zIndex="5000"; // this may need to add 5000 + menuBox_Levl to cover all bases and fix any errors with other things on developers work

d1.innerHTML =  "&#9650;";//  Up Pointer this put the d1text element in the d1 element up button /// might NEED the &# 
d1.id = objQumber+"scot"+menuBox_Levl;
//d1.appendChild(d1Text);//this put the d1text element in the d1 element
d00.appendChild(d1); // - put the top button into the holder element
d3.innerHTML = "&#9660;";// this put the d3text element in the d4 down button ////// might NEED the &# 
d3.id = objQumber+"scob"+menuBox_Levl;
//d3.appendChild(d3Text);//this put the d3text element in the d4
d00.appendChild(d3); // - put the bottom button into the holder element


d2.id = objQumber+"bodymen"+menuBox_Levl+"holderdiv";
d2.className = "qDmnuSubSizer holder";
d00.appendChild(d2); // - put the holder into the outerbox element

putObjHere.appendChild(d00);// this places the MB_outer
//0073parentDoc.getElementById(putObjHereID).appendChild(d00);// this places the MB_outer

//parentDoc.body.insertBefore(d00,parentDoc.getElementById("qHeader"));
//d3.style.display="none"; // this fixes a ie mac bug I believe it can be moved up to the CSS
//(Not_macIE)? d3a.className = "menuScrollBtn" : "menuScrollBtn";
///////(!Not_macIE)? d0.style.overflow = "hidden": null;
//d2.style.display="none"; // this might help speed up load time and may also fixes a ie mac bug I believe it can be moved up to the CSS

}

function qMouse_Event(e){
// evt stands for Event. It's the Event that Fired. i.e. mouseover oe mouseclick 
var evt = (e)? e : top.event; // window.event; this may be needed for win_ie and other browsers too.
var evtType = (e)? e.type : top.event.type; // window.event.type may be needed for win_ie and other browsers too
var objX = this; // this holds the current object the event fired on // on buttons this the second nested element

//The object that the event fired on
var objID = objX.id; // this is the Id of the 3rd nested div element on a Button.
var objIDs = objID.split("i");//this splits and gives the objQNum(q5 and ect) and the MenuNum(q1m0mo and etc)
var objNumber = parseInt(objID.substring(1)); // The Object's Number, the number that follows the q . i.e. 5 or 9 or etc.
var objQumber = objIDs[0]; // The Object's Q Number, is share number used by it's objects. i.e. q1q1q1q1
var objClass = objQumber +"c"; // The element name. Basically the classname from the ID
var objLevel = objID.match(/m/gi).length;//Counts how many m's are found in the id, basically it's the MenuArrayId number
var objType = eval("window."+objQumber+";"); // this holds the type of object it is

// sub Menu Box
//NOTE this could check and see if the pointer has content or something like that. Then it would not need qHasChild
var subMB_check = parseInt(objX.qHasChild); // this checks for sub Menu Box
//alert(objNumber + " | " + objID + " | " + subMB_check);

if(objType != 9 && subMB_check){
// Current_RootBtn
///////killed20b////Crnt_RtBtn_Id = objID; // this is the current RootBtn Id.
var Crnt_RtBtn_Num = objNumber; // this is the current RootBtn objQumber.
Crnt_RtBtn_qNum = objQumber; // this is the current RootBtn objQumber.
Crnt_RtBtn_Lvel = objLevel; // this is the current RootBtn Level
Crnt_RtBtn_Type = objType; // this is the current RootBtn Type.

// Current_MenuBoxes_qNum
Crnt_MnuBoxes_Num = (Crnt_RtBtn_Num + 1); // this is the number after the q of the Next MenuBox.
Crnt_MnuBoxes_qNum = "q" + Crnt_MnuBoxes_Num; // this is the objQumber of the Next MenuBox Id.
//alert(Crnt_MnuBoxes_qNum +"||"+Crnt_RtBtn_qNum);
//Current_NextMenuBox_Type = (subMB_check)? eval("window."+subMB_select_qNum): 0; // this is the current NextMenuBox Type.
}
var subMB_select_Type = (subMB_check)? eval("window."+"q"+(Crnt_MnuBoxes_Num)): 0; // this checks and gets the sub Menu Box Type
var subMB_select = (subMB_select_Type == 9)? parentDoc.getElementById("q"+(Crnt_MnuBoxes_Num)+"i"+objIDs[1]+"m"): 0; // this checks and gets the next sub Menu Box to be opened
//alert(eval("window."+"q"+(Crnt_MnuBoxes_Num)));
//alert(subMB_select_Type+" | "+subMB_select);
//alert("subMB_select_qNum | "+subMB_select_qNum);
//alert(subMB_select_Type + " | " + subMB_select_qNum);
//  RootBtns are use to keep track of the first button(Root), used to open a Menu at a certain Level. // subTreeBtn maybe a better name
eval("qSS"+evtType+"(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,Crnt_MnuBoxes_qNum,subMB_select_Type)");
} // end qMouse_Event

// Current_RootBtn
///////killed20b//// var Crnt_RtBtn_Id = 0; // this will hold the objQumber of the button which opened a pop out menu // name should be Current Root Button(CurtRootBtn_Qnum)
var Crnt_RtBtn_qNum = 0; // this will hold the objQumber of the button which opened a pop out menu // name should be Current Root Button(CurtRootBtn_)
var Crnt_RtBtn_Lvel = 0; // this will hold the Level of button which opened a sub menu
var Crnt_RtBtn_Type = 0; // this will hold the type of button which opened a sub menu
// Crnt_MnuBoxes_qNum
var Crnt_MnuBoxes_Num = 0; // this is the objQumber of the Next MenuBox Id.
var Crnt_MnuBoxes_qNum = 0;
//var Current_NextMenuBox_Type = 0;
//LastUsed_Btn
var LastUsed_Btn_Id = 0; // this will hold the Id of the last used button anywhere
var LastUsed_Btn_qNum = 0; // this will hold the objQumber of the last used button anywhere
var LastUsed_Btn_Lvel = 0; // this will hold the Level of the last used button anywhere
//LastUsed_RootBtn
var LastUsed_RootBtn_Id = 0; // this will hold the Id of the last used button which opened a MenuBox
var LastUsed_RootBtn_qNum = 0; // this will hold the objQumber of the last used button which opened a MenuBox
var LastUsed_RootBtn_Lvel = 0; // this will hold the Level of the last used button which opened a MenuBox
// LastUsed_MenuBoxes
///killed 20a///// var LastUsed_MenuBoxes_qNum = 0; // this will hold the Level of the last used button which opened a MenuBox
var LastUsed_MenuBoxes_IsAnyOpen = 0;

// First paramter is the node, second is the CSS property you want ols ie needs work here
function getCSSProperty(obj, sProperty){// not used maybe it can but only good for px sizes
if(parentDoc.defaultView){
//alert(parentDoc.defaultView.getComputedStyle(obj, null).getPropertyValue(sProperty));
return parentDoc.defaultView.getComputedStyle(obj, null).getPropertyValue(sProperty);
}
else if(obj.currentStyle){
var sProperty = sProperty.replace(/-\D/gi, function(sMatch){
return sMatch.charAt(sMatch.length - 1).toUpperCase();
});
return obj.currentStyle[sProperty];
}
else return null;
}


function qSSmouseover(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
//test to see if any button has every been opened yet with a LastUsed varible and check to see if any timeouts need to be canceled or if anything needs to be closed right away
// this test is needed basically to by pass this statement when the first button is used after the page has loaded 
if(LastUsed_Btn_Lvel){ // START_IF_LUBL
var level_value01 = eval("window.LastM"+objLevel);//holds the id of the last used button at this level that is still open or zero if it has been closed already at some point
//alert(level_value01);
//alert(level_value01);
var level_value02 = (subMB_select)? eval("window.LastM"+(objLevel+1)): 0; //// this test if the next level up has a last used button id still open or zero if it has been closed already at some point
var test_level = (objID == level_value01); // if this is true then it is over the same elm
//(objType!=9)? alert(objID +"|"+ LastUsed_RootBtn_Id +"|"+ objType +"|"+ LastUsed_Btn_Lvel +"|"+ eval("window.LastM"+LastUsed_Btn_Lvel)): null;
// if this is not a btn in a scroll menu box and it's Id does not match the LastUsed_Btn_Id, basically it's for moving from a btn in scroll menu box to a different btn in a scroll menubox or other buttons not in a scroll menu box
// it works by turning off any timeouts that it needs to, and closes any menuboxs that need to be close too
if(objID != LastUsed_Btn_Id && LastUsed_MenuBoxes_IsAnyOpen >0){
MenuEventTestLUBL("MouseOver1",LastUsed_Btn_Lvel+objLevel);//4Testing
(window.EE)?clearTimeout(window.EE):null;// this clears the setTimeout of the botton mouseout
(window.E)?clearTimeout(window.E):null; // this clears the setTimeout of the menubox mouseout
(window.E)?window.E = null:null; // some browsers need to clear this out so it can be used again as a empty variable with a null value
var setLevelToThis = (objType!=9)? LastUsed_RootBtn_Lvel : objLevel;
(LastUsed_Btn_Lvel >= objLevel  || objType!=9 )? Menu_Out_TimeOut('qSSmouseover1',setLevelToThis,0): null; // this function is shared by others functions
}
else if(objID == LastUsed_Btn_Id && LastUsed_Btn_Lvel > objLevel){ // this is for menus in the same level going back to lower levels
MenuEventTestLUBL("MouseOver2",LastUsed_Btn_Lvel);//4Testing
(window.EE)?clearTimeout(window.EE):null; // this clear may need a (window.EE)? and nulling set to it
(window.E)? clearTimeout(window.E):null;// this is set to the menu out
(window.E)? window.E = null:null;// this is set to the menubox out
(level_value02)? Menu_Out_TimeOut('qSSmouseover2',objLevel,0): null; // this function is shared by others functions
}
// I believe this can be killed soon
else if( LastUsed_Btn_Lvel <= objLevel + 1 && LastUsed_MenuBoxes_IsAnyOpen >0){ // this is for menus in the same level but going back to the higher levels //a test_level && might be needed for the bar level
//else if(objID == LastUsed_Btn_Id){ // this is for menus in the same level but going back to the higher levels //a test_level && might be needed for the bar level
MenuEventTestLUBL("mouseOver3",LastUsed_Btn_Lvel);//4Testing
(window.EE)?clearTimeout(window.EE):null;// this is set to the menu out
(window.E)? clearTimeout(window.E):null;// this is set to the menu out // this line is for the menuboxe levels and up
(window.E)? window.E = null:null;// this is set to the menu out // this line is for the menuboxe levels and up
}
else{//NOTNEEDED only here 4 testing can be removed on final build
MenuEventTestLUBL("mouseOver4",LastUsed_Btn_Lvel);//4Testing
}
} // END_IF_LUBL
else{//NOTNEEDED only here 4 testing can be removed on final build
MenuEventTestLUBL("mouseOver5",LastUsed_Btn_Lvel);//4Testing
}

var is_Hover_off = objX.parentNode.parentNode.className.indexOf("ceh")<0; // this checks if the mouse is already over the element
//alert(is_Hover_off);
(is_Hover_off)? Change_Element(objID,objLevel,objClass+"h"): null; // if mouse is not already over the element it runs this function. "h" stands for hover
//alert(subMB_select_Type);
// (subMB_select_Type==9)? alert(subMB_select.style.display): null;
//alert(subMB_select);
var subMB_select_Isclosed = (subMB_select_Type==9)? subMB_select.style.display!="block" : 0;// this checks to see if the element's sub menubox is closed or open // 
//alert(subMB_select_Isclosed);
if(subMB_select_Isclosed){// if there is a element sub menubox, this checks to see if it needs to be open 

//Change_Element(objID,objLevel,objClass+"h");
//alert("objLevel:" +objLevel +" | "+ "subMB_Array_level:"+ subMB_Array_level );
var isSdeMnuItm = (objType==8); // test if this is a side menu Item in a vertical menuBox
var isDrpMnuItm = (objType == 9); // this test if this is a menu Item in a pop out scrolling dropMenuBox
var is_RootBtn_aSide = (Crnt_RtBtn_Type==8); // this test if the RootBtn is a side button in a vertical menu box.
var isDrpOrSdeMnuItm = isDrpMnuItm || isSdeMnuItm;
//alert("objType"+objType+"|"+"isSdeMnuItm"+isSdeMnuItm+"|"+"isDrpMnuItm"+isDrpMnuItm+"|"+"is_RootBtn_aSide"+is_RootBtn_aSide);
//alert(subMB_select_qNum+"bodymen"+objLevel);
eval("window.LastM"+objLevel+"='"+ objID+"'"); // it set's it to the elm id // this line can go at the beggining of this if()


//#### Size Up the MenuBox that needs opening in a hidden box and get all the sizes 
///alert(subMB_select_qNum+"bodymen"+(objLevel+1));
var subMB_outer = parentDoc.getElementById(subMB_select_qNum+"bodymen"+(objLevel+1));
var subMB_btnT = subMB_outer.firstChild;
var subMB_btnB = subMB_outer.childNodes[1]; // this will need to change to next sibling if it works in all browsers
var subMB_holder = subMB_outer.lastChild;

//var subMB_outerClass = subMB_outer.className;
//subMB_outer.className = "qDmnuSizer " +subMB_outerClass;
// putting the outer's class on holder helps find the real padding
// I think I should just support 1.3 safari and up. ns6.8 and up and ie5.5 and up and opera 8 and up
// then I can get the computed style sizes, get ride of absolute on the holder, maybe get ride of holder altogether
// I think this would be a plus to get ride of a lot of code// more thinking is needed
subMB_holder.className = "qDmnuSubSizer qholderSizer " + subMB_select_qNum+"cmenuBox"; // Helps finds the padding
subMB_outer.className = "qDmnuSizer menuBlock " +subMB_select_qNum+"cmenuBox"; // I think menuBox is ready to get out of here, absolute and display none could be put on the build div// I moved menuBlock to the div, I'm keeping it here it only here now to help with code testing
//box-sizing: border-box
//subMB_holder.style.padding = "0px";
/////////subMB_outer.style.border = "0px"; 
//subMB_holder.style.paddingLeft="0px";
//subMB_holder.style.borderLeft="red solid 50px";
//subMB_holder.style.paddingRight = subMB_holder.style.paddingBottom = "0px";

subMB_btnT.style.display = "none"; //this hides the top scroll button
subMB_btnB.style.display = "block"; // this shows the bottom scroll button so it can be messure
subMB_btnB.style.width = "1px";// fixes a mac ns bug when measuring the outerboxoffset below //does not work from CSS 
//subMB_btnB.style.top = "0px";

subMB_holder.style.position = "static"; // if it works move it to css on the build // static maybe better
//alert(subMB_select.style.marginTop);
// sa hates setting top button to 0px but it can go to -1px first than 0px
//subMB_select.style.marginTop = "-1px"; // this resets any scrolling that may have been done prior
//subMB_select.style.top = "0px";
///subMB_select.style.marginTop = "-1px"; // this resets any scrolling that may have been done prior
//alert(subMB_select.style.marginTop);
//subMB_select.setAttribute("style","margin-top:0px"); 
subMB_select.style.display="block";
// sa bug fix it needs to reset the height and margintop between the blocks because of a bug going from drop menu to a perivous menu and it would keep any negtive marginTop set before and mess up subMB_outer_Tborder and what uses  subMB_outer_Tborder  
// NOTE maybe it would be better to somehow not use display none on subMB_select instead subMB_select.qOn 
// Putting the class here might work too.
subMB_select.style.height = subMB_select.offsetHeight +"px"; 
subMB_select.style.marginTop = "0px"; // this resets any scrolling that may have been done prior


subMB_outer.style.display="block"; // this displays the subMB in a hidden area to get size information
Elmposition(evt, objX,"objX"); // this function produces and sets the positioning cords var for the elm
var elm_Width = objX.offsetWidth;
var elm_Height = objX.offsetHeight;
var elm_Lef = elm_doc_x;
var elm_Top = elm_doc_y;
var elm_Rht =  elm_Lef +  elm_Width;
var elm_Bot =  elm_Top +  elm_Height;
//var elmWinTop = elm_win_y;
// this needs to put the -3 MnuBoxOverlap on each one it's now just for testing
var avalSpaceLt = elm_win_x; // elm left edge to window's left edge
var avalSpaceTp = elm_win_y; // elm top edge to window's top edge
var avalSpaceRt = win_w - (elm_win_x + elm_Width); // elm right edge to window's right edge
var avalSpaceBt =  win_h - (elm_win_y + elm_Height); // elm bottom edge to window's bottom edge
var avalSpaceLtToWinRh = avalSpaceRt + elm_Width; // elm left edge to window's right edge
var avalSpaceRhToWinLh = avalSpaceLt + elm_Width; // elm right edge to window's left edge
var avalSpaceTpToWinBt = win_h - elm_win_y;

var folMB_outer_Top = 0;//this gets the top of the currently first opened level(fol) subMB(MB)

if(isDrpMnuItm){// basically menuItems in a drop menu uses the width of the dropmenuBox
// NOTE^^^^ it could just get the outer left position here and make the changes below with that info
// and it would not need to get Elmposition again
var elmMB_outer = parentDoc.getElementById(subMB_select_qNum+"bodymen"+objLevel); // this get the current elmMB containing the button or the button it was fired on 
Elmposition(evt,elmMB_outer,"MBX"); // this function produces and sets the positioning cords var for the elm
elm_Width = elmMB_outer.offsetWidth;
//var elmMB_outer_Height = elmMB_outer.offsetHeight ;
elm_Lef = elm_doc_x;
//var elmMB_outer_Top = elm_doc_y;
elm_Rht =  elm_Lef +  elm_Width;
//var elmMB_outer_Bot =  elmMB_outer_Top +  elmMB_outer_Height;
avalSpaceLt = elm_win_x; // elm left edge to window's left edge
//var avalSpaceTp = elm_win_y; // elm top edge to window's top edge
avalSpaceRt = win_w - (elm_win_x + elm_Width); // elm right edge to window's right edge
//var avalSpaceBt =  win_h - (elm_win_y + elm_Height); // elm bottom edge to window's bottom edge
/////avalSpaceLtToWinRh = avalSpaceRt + elm_Width; // elm left edge to window's right edge // not used
//////avalSpaceRhToWinLh = avalSpaceLt + elm_Width; // elm right edge to window's left edge // nit used

(Crnt_RtBtn_Type != isSdeMnuItm)? folMB_outer_Top = parseInt(parentDoc.getElementById(subMB_select_qNum+"bodymen"+(Crnt_RtBtn_Lvel+1)).style.top) : null; // this gets the top of the currently first opened level MB(subMB)// this might be needed Crnt_RtBtn_Lvel+1<objLevel

}

// size the menu box
var subMB_btn_Height = subMB_btnB.offsetHeight;
var subMB_btn_Width = subMB_btnB.offsetWidth;
var subMB_outer_Height = subMB_outer.offsetHeight; 
var subMB_outer_Width = subMB_outer.offsetWidth;
var subMB_select_Height = subMB_select.offsetHeight;
var subMB_select_Width = subMB_select.offsetWidth;
var subMB_holder_Height = subMB_holder.offsetHeight;
var subMB_holder_Width = subMB_holder.offsetWidth;
//alert(subMB_btn_Width);
var W3CboxSizing = subMB_btn_Width==2;
var subMB_outer_Pos=findElmPos(subMB_outer);// left and top positions
var subMB_holder_Pos=findElmPos(subMB_holder);// left and top positions
var subMB_select_Pos=findElmPos(subMB_select);// left and top positions
var subMB_outer_Lpadding = subMB_holder_Pos[0];
var subMB_outer_Tpadding = subMB_holder_Pos[1] - subMB_outer_Pos[1];
var subMB_outer_Lborder = subMB_select_Pos[0] - subMB_holder_Pos[0];
var subMB_outer_Tborder = subMB_select_Pos[1] - subMB_holder_Pos[1];
var subMB_outer_Rpadding = subMB_outer_Width  - (subMB_holder_Width+ subMB_outer_Lpadding);
var subMB_outer_Bpadding = subMB_outer_Height - (subMB_holder_Height + subMB_outer_Tpadding);
var subMB_outer_Rborder = subMB_holder_Width  - (subMB_select_Width+ subMB_outer_Lborder);
var subMB_outer_Bborder = subMB_holder_Height  - (subMB_select_Height+ subMB_outer_Tborder);

var subMB_holder_Lspace = subMB_outer_Lborder + subMB_outer_Lpadding;
var subMB_holder_Tspace = subMB_outer_Tborder + subMB_outer_Tpadding;
//alert(subMB_outer_Tborder +"|||"+ subMB_outer_Tpadding);
var subMB_holder_Rspace = subMB_outer_Rborder + subMB_outer_Rpadding; 
var subMB_holder_Bspace = subMB_outer_Bborder + subMB_outer_Bpadding;
//////////alert(subMB_select_Pos[1]  +"|||"+ subMB_holder_Pos[1]+"|||"+ subMB_outer_Tborder);
//alert(subMB_select_Pos[0]  +"|||"+ subMB_holder_Pos[0]+"|||"+ subMB_outer_Lborder);
//alert(getCSSProperty(subMB_outer,"padding-left"));
// alert(getCSSProperty(subMB_outer,"border-left-width")); // does not work in sa 1.0 to ? but 2.0 up works
//alert(subMB_outer.getStyle("borderLeftWidth"));
//alert(subMB_outer.style.borderLeftWidth);
subMB_outer.style.display="none"; //this hides the subMB in a hidden area // NS needs it to apply the size info to the subMB and to not eat up time doing it
subMB_btnB.style.display = "none"; // this hides the bottom scroll button in case it does not need it
//subMB_btnT.style.display = "none"; // this hides the Top scroll button // mac ie bug needs both btn to display to size them correctly 
// set the widths
subMB_outer.style.width = (W3CboxSizing)? subMB_select_Width+ "px" :subMB_outer_Width+ "px";
subMB_holder.style.width = subMB_select.style.width = subMB_select_Width + "px";
//alert(subMB_select_Width +"|||"+subMB_outer_Width +"|||"+ subMB_outer.style.width);

var MnuBoxOverlap = 0; //NEEDSWORK the menu box overlap by the padding and border 

//alert(avalSpaceLtToWinRh +"||||"+subMB_outer_Width +"|||"+subMB_select_Width+"|||"+subMB_holder_Width);

// the following is for placing the left and top position of subMB
// these following vars will help in positioning the element by testing the space available
var ifWidthFitsInWin = win_w >= subMB_outer_Width;
// this test if a space is available RT of the current menubox or opening horizontal element
var test_RT_of_elm=ifWidthFitsInWin&&((isDrpOrSdeMnuItm)?avalSpaceRt:avalSpaceLtToWinRh)>=subMB_outer_Width;
// this test if a space is available LF of the current menubox or opening horizontal element
var test_LF_of_elm=ifWidthFitsInWin&&((isDrpOrSdeMnuItm)?avalSpaceLt:avalSpaceRhToWinLh)>=subMB_outer_Width;
// this test if element is partly right of the current window's right edge
var test_if_RT_of_win_edge = (elm_win_x + elm_Width) > win_w;
// this test if element is partly left of the current window's left edge
var test_if_LF_of_win_edge = doc_win_x  > elm_doc_x;
// this test if a space is available left of the mouse position 
var test_RT_of_mouse = win_w - (mouse_win_x + 3)  > subMB_outer_Width;
// this test if a space is available right of the mouse position 
var test_LF_of_mouse =  (mouse_win_x - 3) > subMB_outer_Width;

// the following is for placing the left position of subMB
var setLT_to = 0;
if(!isDrpOrSdeMnuItm){//ifAA1
if(test_RT_of_elm){// places it to the right
setLT_to=(test_if_LF_of_win_edge)? doc_win_x : elm_Lef;
//alert("M1:"+setLT_to);
}
else if(test_LF_of_elm){// places it to the left
setLT_to=(test_if_RT_of_win_edge)?  (doc_win_x + win_w) - subMB_outer_Width : elm_Rht - subMB_outer_Width;
//alert("M2:"+setLT_to);
}
}//ifAA1

else if(isDrpOrSdeMnuItm){//ifAA2
if(test_RT_of_elm){// places it to the right
setLT_to = elm_Rht - MnuBoxOverlap;
//alert("DS1:"+setLT_to);
}
else if(test_LF_of_elm){// places it to the left
setLT_to= elm_Lef - (subMB_outer_Width-MnuBoxOverlap);
//alert(elm_Lef+"|||"+ subMB_outer_Width +"|||"+ elm_Width );
//alert("DS2:"+setLT_to);
}
else if(test_RT_of_mouse){//right of the mouse position //NEEDSWORK
setLT_to=  (doc_win_x + win_w) - (subMB_outer_Width-MnuBoxOverlap);
//setLT_to= mouse_win_x;
//alert("DS3:"+setLT_to);
}
else if(test_LF_of_mouse){//left of the mouse position  //NEEDSWORK
setLT_to = doc_win_x;
//alert("DS4:"+setLT_to);
}
}//ifAA2

//alert(setLT_to);
/* ##### killed on build c0035 I'll try it, and see if it works without it 4 awhile
// NOTE although it's being killed I'll keep it here 4 a bunch more builds until I'm cerntain it is not needed
// I don't think this "if" is needed anymore because sizing up above is sort of handling it maybe testing is needed
// this is needed if menubox is wider than the window so it can recalculate the scroll bars in for correct height
if((setLT_to + subMB_outer_Width) - doc_win_x > win_w){
subMB_outer.style.display="block";
Elmposition(evt, elmMB_outer,"itnum3"); // this function produces and sets the positioning cords var for the elm
subMB_outer.style.display="none";
}
*/

// The following is for testing for heights possibilities
// this get the height for the space available next to menuItem, below the root menuItem or below the menuItem
var first_elm_Height_space = (is_RootBtn_aSide)? win_h: (isDrpMnuItm)? win_h - (folMB_outer_Top - doc_win_y) : avalSpaceBt; 
//alert(first_elm_Height_space);
// this test if there is space underneath the bar or tab for the subMB
var first_elm_Height_test = subMB_outer_Height > first_elm_Height_space; 
// this test if the menubox is higher then the menu position 
var second_elm_Height_test = (isDrpOrSdeMnuItm)? subMB_outer_Height >  avalSpaceTpToWinBt : 0;
// this figure out the height for the outer box 
var first_set_height_too = (first_elm_Height_test)? first_elm_Height_space : subMB_outer_Height; 
var setTP_to= 0;
if(first_elm_Height_test){ // the following makes a scroll box if needed
setTP_to= (is_RootBtn_aSide)? doc_win_y : (isDrpMnuItm)? folMB_outer_Top : elm_Bot;
//setTP_to= (is_RootBtn_aSide)? elm_Top : (isDrpMnuItm)? folMB_outer_Top : elm_Bot;
subMB_outer.openboxid =  subMB_select.id;
subMB_outer.btnheight = subMB_btn_Height;
//alert(first_elm_Height_test +"|||"+ win_h);

(is_nn || is_op || is_sa)? subMB_holder.style.position = "absolute": null; // this fixes the ns 6<>7.2 and up bug and others // Needed on sa 1.00 to ? (sa2works) // Need to test 1.2 and above, also need to test opera too 
/////var setbtnW = subMB_select_Width;
//var setbtnW = (is_ie6c || is_sa)? subMB_holder_Width -(subMB_btn_Width - 1):subMB_holder_Width;
//alert(subMB_outer_Tpadding +"|||"+ subMB_holder_Tspace +"|||"+ subMB_holder_Bspace);
subMB_btnT.realtop = subMB_outer_Tpadding;
subMB_btnT.style.top  =  subMB_outer_Tpadding +"px";
subMB_btnT.style.left  =  subMB_outer_Lpadding+"px";
subMB_btnT.style.width = subMB_select_Width+"px";

//subMB_btnB.style.position = "relative";
subMB_btnB.realtop = first_elm_Height_space - (subMB_btn_Height+subMB_outer_Tborder+subMB_holder_Bspace);
subMB_btnB.style.top =  subMB_btnB.realtop +"px";
subMB_btnB.style.left = subMB_outer_Lpadding+"px";
subMB_btnB.style.width = subMB_select_Width+"px";
// subMB_btnB.style.height is needed to fix a bug in ie not seeing it with a transparent bg in the middle of the button
subMB_btnB.style.display = "block"; // this displays the button so it can be seen for scrolling
//alert(subMB_btnB.realtop +"||||"+ subMB_outer_Tborder +"|||"+ subMB_holder_Bspace);
}

else if(second_elm_Height_test){ // the following slides the subMB up to fit
var setTP_to = elm_Top - (subMB_outer_Height - avalSpaceTpToWinBt);
}
else { // this places the subMB by lining up to the menus side or below the bar
var setTP_to= (isDrpOrSdeMnuItm)? elm_Top : elm_Bot;
}
// needs work heights don't add up the same with each browser may need to put the styles in a div between outer and holder
subMB_outer.style.height = (W3CboxSizing)? (first_set_height_too - (subMB_holder_Tspace + subMB_holder_Bspace))  + "px" : first_set_height_too +"px";
//alert(subMB_outer.style.height+"||||"+ first_set_height_too +"|||"+subMB_holder_Tspace+"|||"+subMB_holder_Bspace+"|||"+avalSpaceBt);
//alert(subMB_outer.style.height);
//subMB_outer.style.height = (is_ie6c || is_sa)? (first_set_height_too - (subMB_holder_Tspace + subMB_holder_Bspace))  + "px" : first_set_height_too + "px" ;
subMB_holder.style.height = (first_set_height_too - (subMB_holder_Tspace + subMB_holder_Bspace)) + "px";
subMB_select.style.height = subMB_select_Height  + "px";
//alert(avalSpaceBt+"||||"+ first_set_height_too +"|||"+first_set_height_too+"|||"+subMB_outer.style.height+"|||"+subMB_holder_Tspace+"|||"+subMB_holder_Bspace);


// the following sets the top and left position for the subMB
subMB_outer.style.left = setLT_to+"px";
subMB_outer.style.top = setTP_to+"px";
//alert(setLT_to +"***"+setTP_to);
subMB_holder.className = "qDmnuSubSizer holder"; // Helps finds the padding// and gets removed here it really has no need 4 qDmnuSubSizer here, maybe 
subMB_outer.className = "noneMB menuBlock "+subMB_select_qNum+"cmenuBox";
LastUsed_MenuBoxes_IsAnyOpen = objLevel;
} // this is the end of if(subMB_select_Isclosed){
else null;

(subMB_select_Isclosed && subMB_select_Type==9)? subMB_outer.style.display="block": null;
LastUsed_Btn_Id = objID; // set the Id of the last used button 
LastUsed_Btn_qNum = objQumber; // set the objQumber of the last used button 
LastUsed_Btn_Lvel = objLevel; // set the Level of the last used button
if(objType != 9 && LastUsed_MenuBoxes_IsAnyOpen>0){
LastUsed_RootBtn_Id = objID; // set the Id of the last used button which opened a MenuBox
LastUsed_RootBtn_qNum = Crnt_RtBtn_qNum; // set the objQumber of the last used button which opened a MenuBox
LastUsed_RootBtn_Lvel = Crnt_RtBtn_Lvel; // set the Level of the last used button which opened a MenuBox
///killed 20a///// LastUsed_MenuBoxes_qNum = subMB_select_qNum;
}

}

function getElmOffsets(elm_obj,allOrOne){// not used yet
var elmOffsetTop = elm_obj.offsetTop; // top relative to what ever it's parent is 
var elmOffsetLeft = elm_obj.offsetLeft; // left relative to what ever it's parent is
var elmOffsetHeight = elm_obj.offsetHeight; // width with no-margin/ old box model no-border & no-padding
var elmOffsetWidth = elm_obj.offsetWidth;// width with no-margin/ old box model no-border & no-padding

var elmParent = elm_obj.parentNode; // par
var parOffsetTop = elmParent.offsetTop; // top relative to what ever it's parent is 
var parOffsetLeft = elmParent.offsetLeft; // left relative to what ever it's parent is
var parOffsetWidth = elmParent.offsetWidth;// width with no-margin/ old box model no-border & no-padding
var parOffsetHeight = elmParent.offsetHeight; // width with no-margin/ old box model no-border & no-padding

}

var mouse_doc_x = 0; // gets the current mouse's position to the document's left edge
var mouse_doc_y = 0; // gets the current mouse's position to the document's top edge
var mouse_ele_x = 0; //  gets the current mouse's position to the element's left edge
var mouse_ele_y = 0; //  gets the current mouse's position to the element's top edge
var mouse_win_x = 0; // gets the current mouse's position to the window's left visual edge
var mouse_win_y = 0; // gets the current mouse's position to the window's top visual edge
var win_w = 0;  //             gets the current window's visual width
var win_h = 0;  //              gets the current window's visual height
var doc_w = 0;  //             gets the current document's width //not used
var doc_h = 0;  //              gets the current document's height // not used
var elm_doc_x = 0; //      gets the current element's position to the document's left edge
var elm_doc_y = 0; //      gets the current element's position to the document's top edge
var elm_win_x = 0; //      gets the current element's position to the window's left visual edge  
var elm_win_y = 0; //      get the current element's position to the window's top visual edge
var doc_win_x = 0; //     gets the current left space between the document's left edge and the window's visual left edge 
var doc_win_y = 0; //     gets the current Top space between the document's top edge and the window's visual top edge 
// not used yet
var pageHeight = 0;
var pageWidth = 0;
var windowHeight = 0;
var windowWidth = 0;
var pageScrollTop = 0;
var pageScrollLeft = 0;

function findElmPos(obj){
var posLeft = posTop = 0;
//alert(obj +"||||"+obj.offsetTop+"||||"+obj.offsetParent +"||||"+obj.parentNode.tagName);

if (obj.offsetParent || (obj.offsetTop || obj.offsetLeft)){//ie8b1 has no offsetParents anymore //others might follow// it just goes right to the top or left in beta1 // anyway this works with out driving the others nuts
do{
posLeft += obj.offsetLeft;
posTop += obj.offsetTop;
}while (obj = obj.offsetParent);
}
return [posLeft,posTop];
}

function Elmposition(e, elm_obj,testFromFunction){
// testing for top might work instead of sniffing for each browser here or test for top.pageXOffset or winelm.pageXOffset
// I don't no if pageXOffset is dom and if khtml supports it or not. Needs checking.
// ns needs top node here. If miners don't like this then (top)? top: window; var is needed before this code
//var winSelf = parent.self; // I think self can be used now it should work with parentWin

// older browsers need to use parentDoc.body newer and compilant ones use documentElement
var docElm =(e.pageX || parentDoc.documentElement.clientWidth)?parentDoc.documentElement:parentDoc.body;
elm_doc_x = elm_doc_y =  elm_win_x = elm_win_y = doc_win_x = doc_win_y = 0;

// e.page is everyone and ie is e.client
mouse_doc_x = e.pageX || (e.clientX + (parentDoc.documentElement.scrollLeft || parentDoc.body.scrollLeft));
mouse_doc_y = e.pageY || (e.clientY + (parentDoc.documentElement.scrollTop || parentDoc.body.scrollTop));
mouse_win_x = (e.pageX)? e.pageX -  parent.self.pageXOffset : (e.clientX)? e.clientX :0; // old ns&op mayNeed top|self
mouse_win_y = (e.pageY)? e.pageY -  parent.self.pageYOffset : (e.clientY)? e.clientY :0; // top.pageYOffset works too

var docInnerHeight = win_h = parent.self.innerHeight; // mostly everyone accept ie
var docInnerWidth = win_w = parent.self.innerWidth; // mostly everyone accept ie
var docOffsetHeight = docElm.offsetHeight;
var docOffsetWidth = docElm.offsetWidth;
var docClientHeight =docElm.clientHeight; // ie mostly
//docClientHeight = docElm.clientHeight; // ieWin needs to read this line twice, more testing ie5 maybe, maybeNone
var docClientWidth = docElm.clientWidth;
(win_h < docOffsetHeight)? null : win_h = docOffsetHeight;
(win_h < docClientHeight)? null : win_h = docClientHeight;
(win_w < docOffsetWidth)? null : win_w = docOffsetWidth;
(win_w < docClientWidth)? null : win_w = docClientWidth;

 // ns < 7.0 scrollBar present bug of divs with a css width:auto having position:relativeORabsolute this normally happens when measuring the dropmenus when the UA shows a scrollBar  
if(!win_w){
win_w = (docInnerWidth == docOffsetWidth)? docInnerWidth : docInnerWidth - 15;
}
if(!win_h){

win_h = (docInnerHeight == docOffsetHeight)? docInnerHeight : docInnerHeight - 15;
}


var posArray=findElmPos(elm_obj);
elm_doc_x = posArray[0];
elm_doc_y = posArray[1];

mouse_ele_x = mouse_doc_x - elm_doc_x;
mouse_ele_y = mouse_doc_y - elm_doc_y;
elm_win_x = mouse_win_x - mouse_ele_x;
elm_win_y = mouse_win_y - mouse_ele_y;
doc_win_x = mouse_doc_x-mouse_win_x;
doc_win_y = mouse_doc_y-mouse_win_y;

//alert(posArray.length);
//alert(docClientWidth==null);
//alert(docClientWidth+"|||"+win_w +"||||"+docElm);
//alert( win_w +"|||"+docInnerWidth +"||||"+ docOffsetWidth +"|||"+ docClientWidth +"|||");
//alert( win_h +"|||"+docInnerHeight +"||||"+ docOffsetHeight +"|||"+ docClientHeight +"|||");
//alert(mouse_doc_x  +"****"+ mouse_ele_x);
//alert(doc_win_x  +"****"+ elm_doc_x);
//alert("doc_win_x:"+doc_win_x+ " | "+ mouse_doc_x+ " - "+mouse_win_x);	
//alert("doc_win_x:"+doc_win_x);	
//window.status=("doc_win_x:"+doc_win_x);	
//alert("elm_doc_x :"+elm_doc_x+" |mouse_doc_x :"+mouse_doc_x+" |mouse_ele_x :"+mouse_ele_x+" |mouse_win_x :"+mouse_win_x+" |win_w :"+win_w +" |elm_win_x :"+elm_win_x +" |doc_win_x :"+doc_win_x);	
//window.status=("elm_doc_x :"+elm_doc_x+" |mouse_doc_x :"+mouse_doc_x+" |mouse_ele_x :"+mouse_ele_x+" |mouse_win_x :"+mouse_win_x+" |win_w :"+win_w +" |elm_win_x :"+elm_win_x +" |doc_win_x :"+doc_win_x);	
//window.status=(" elm_doc_y:"+elm_doc_y+"mouse_doc_y:"+mouse_doc_y+" mouse_ele_y:"+mouse_ele_y+" mouse_win_y:"+mouse_win_y+" win_h:"+win_h +"elm_win_y:"+elm_win_y );	
//window.status=(" _docLt:"+elm_doc_x+"_docX:"+mouse_doc_x+" _eleX:"+mouse_ele_x+" _winX:"+mouse_win_x+" _winW:"+win_w +"_docTp:"+elm_doc_y+"_docY:"+mouse_doc_y+" _eleY:"+mouse_ele_y+" _winY:"+mouse_win_y+" _winH:"+win_h );	
//window.status=("the window height: "+ win_h);
}


function qSSmouseout(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
if (subMB_select && LastUsed_MenuBoxes_IsAnyOpen > 0){ // this is for leaving a button with a menuBox opened
//alert("it needs to close fired");
MenuEventTestLUBL("MouseOut1",LastUsed_Btn_Lvel);//4Testing
eval("window.EE = setTimeout(\"Menu_Out_TimeOut('qSSmouseout',"+objLevel+",0);\","+ mouseoutTimeOutValue + ")");
}
/////else(objLevel >= LastUsed_RootBtn_Lvel){ // currently menus and bars and tabs
//else(objLevel >= LastUsed_RootBtn_Lvel && LastUsed_MenuBoxes_IsAnyOpen > 0){ // currently menus and bars
else{ // currently menus and bars // currently any button with out a menuBox opened // this could be optimized once it proves a statement is not needed here
MenuEventTestLUBL("MouseOut2",LastUsed_Btn_Lvel);//4Testing
// eval("window.EE = setTimeout(\"Change_Element("+objID+","+0+");\","+ 100 + ")");
(objType != 9)? eval("window.LastM"+objLevel+"="+0): null;
Change_Element(objID,objLevel,0);
}
}

function Change_Element(objID,elm_level,change){ // this needs more optimizing
var objX = parentDoc.getElementById(objID); // get the elment button were working with
///var objNumber = parseInt(objID.substring(1)); // The Object's Number, the number that follows the q . i.e. 5 or 9 or etc.
var objChangeX = objX.parentNode.parentNode;
var objChangeClass = objChangeX.className; // get the current class name used on the button
var objQumberLength = objID.indexOf("i"); // gets the objQumber length from the id 
////0027////var elm_div = objX.getElementsByTagName("DIV"); // count up the nested divs
////0027/////var elm_div_last = elm_div.length - 1; // find the last nested div in the button
if(elm_level > 0 && !change){ //normal
var objClass = objChangeClass.split(" ")
objChangeX.className =  objClass[0];// NEEDEd I THINK IT COULD BE JUST be BLANK// some browser may hate blank
}
else if(elm_level > 0 && change.indexOf("h")>-1){//hover
var objClass = change.split("c");//this just uses the q for now, not sure to get rid of it and just use q or zs or zzq or qz
objChangeX.className = objChangeClass +" "+objClass[0]+"ceh";
}
else if(elm_level > 0 && change.indexOf("a")>-1){//active
var objClass = change.split("c");
objChangeX.className = objChangeClass +" "+objClass[0]+"cea "+objClass[0]+"ceh";
}
else null;

}

function Menu_Out_TimeOut(fromfunction,current_level,close_level){
//alert(fromfunction);
var current_level_value = eval("window.LastM"+current_level);
var LastBar_Has_Sub = 1;
if (current_level_value ){  /////////// needs to bb added && current_level_value > LastUsed_RootBtn_Lvel
var levelSplit = current_level_value.split("i"); // This splits into a Q Number into an array. i.e. q1 , m0
var getLevelType = eval("window."+levelSplit[0]); // this get the current_level_value type  
var levelType = (getLevelType == 5 || getLevelType == 8)? 1: 0; // i.e. 5|8 is root buttons 9 is a menu button but these number may change over time
var objNumber = parseInt(current_level_value.substring(1)); // finds the obj number. this is the number that follows the q
LastBar_Has_Sub = (parentDoc.getElementById(current_level_value).qHasChild)? 0: 1; // this checks for subarray
//alert("LastBar_Has_Sub|||"+ LastBar_Has_Sub );
//alert(current_level_value);
}
else null;
for(var c = (LastUsed_Btn_Lvel - LastBar_Has_Sub); c >= current_level - close_level;c--){
//alert(LastUsed_Btn_Lvel +"|"+LastBar_Has_Sub+"|"+c+"|"+current_level+"|"+close_level);
var check_level = eval("window.LastM"+c);
//alert(check_level);
//window.status=((window.status + LastMen));
(check_level)? Close_MenuBox(check_level,c,objNumber+levelType): null;
(check_level)? Change_Element(check_level,c,0): null;
LastUsed_Btn_Lvel = c; // not sure about this here
//window.status=((window.status + LastMen));
}
}

function Close_MenuBox(menubox_id, menubox_level,objsNumber){
//NEEDSWORK needs cleaning an pan out effects 
// note LastUsed_MenuBoxes_qNum may need to be used when going to different jumps on menu boxes
MenuEventTestLUBL("CloseMenBox1",LastUsed_Btn_Lvel);//4Testing

// cseMB stands for "closemenubox"
var cseMB_select = parentDoc.getElementById("q" + objsNumber + menubox_id.substring(menubox_id.lastIndexOf("i")) + "m"); // this is the openmenu 
//alert(cseMB_select.id);
//alert(menubox_id.substring(menubox_id.lastIndexOf("i")));
//c0var cseMB_holder = cseMB_select.parentNode;
//c0035// var cseMB_btnB = cseMB_holder.previousSibling;
//c0035// var cseMB_btnT = cseMB_btnB.previousSibling;
var cseMB_outer = parentDoc.getElementById("q"+objsNumber+"bodymen"+ (menubox_level + 1));
//var cseMB_outerClass = cseMB_outer.clasName;
eval("window.LastM"+menubox_level+"="+0); // this normally holds the id of a button for that level, but it now needs to be zeroed out to false
////cseMB_holder.style.position = "static"; // this is for NS THE removeAtribute is works, but needs test on win ns and some earlier ver.

// the follow removes any setting that were set to these elements and also hides this menubox
//cseMB_select.style.marginTop = "-1px !important";
/////////////cseMB_select.style.marginTop = "0px";
//cseMB_select.style.position = "absolute";
cseMB_outer.style.display = "none";
cseMB_select.style.display = "none"; // NEEDED I'm thinking this could be moved to the onmouseover function
//cseMB_select.style.marginTop = "0px";
//c0035// cseMB_select.style.height = "auto";
//c0035// cseMB_select.style.width = "auto";

//////////cseMB_holder.style.position = "static"; // this is for NS THE removeAtribute is works, but needs test on win ns and some earlier ver.
//c0035// cseMB_holder.style.height = "auto"; // this is mostly for scrolling
//c0035// cseMB_holder.style.width = "auto"; // this is mostly for scrolling

//c0035// cseMB_outer.style.width = "auto"; // this reset the win ie bug fix when a scroll box is needed
//c0035// cseMB_outer.style.height = "auto"; // this reset the win ie bug fix when a scroll box is needed

////////cseMB_btnT.style.display='none'; //  top scroll button
////////cseMB_btnB.style.display='none'; // bottom scroll button
///////////////cseMB_btnT.style.width="auto"; // bottom scroll button
//////////cseMB_btnB.style.width="auto"; // bottom scroll button

// put the menu box up here so the next time it is used it can be opened and meassured where it can't be seen
cseMB_outer.style.top = "-10000px"; //It could go but I rather keep it can control the pan outs
cseMB_outer.style.left = "0px";  //It could go but I rather keep it can control the pan outs
//alert("LastUsed_MenuBoxes_IsAnyOpen | "+LastUsed_MenuBoxes_IsAnyOpen+ "|menubox_level:"+menubox_level+"|LastUsed_RootBtn_Lvel:"+LastUsed_RootBtn_Lvel+"|"+ (menubox_level == LastUsed_RootBtn_Lvel));
LastUsed_MenuBoxes_IsAnyOpen = (menubox_level == LastUsed_RootBtn_Lvel)? 0: menubox_level;
//alert(LastUsed_MenuBoxes_IsAnyOpen);
}

function MenBoxOver(elm){
//parentDoc.scroller = "off";
var MenuBox = this;
var MenuBox_id = MenuBox.id;
var MenuBox_Array_Length = parseInt(MenuBox_id.substring(MenuBox_id.lastIndexOf("n")+1));
var LastMen = LastUsed_Btn_Lvel; // this was LastBarObject
//alert(MenuBox_Array_Length);
//window.status = MenuBox_Array_Length;
//window.status=(window.status + LastMen);

if(MenuBox_Array_Length == LastUsed_Btn_Lvel){
MenuEventTestLUBL("MenBoxOver1",LastUsed_Btn_Lvel);//4Testing
(window.E)? clearTimeout(window.E): null;
(window.E)? window.E = null: null;
LastUsed_Btn_Lvel = MenuBox_Array_Length;
}
else if(MenuBox_Array_Length > LastUsed_Btn_Lvel){
MenuEventTestLUBL("MenBoxOver2",LastUsed_Btn_Lvel);//4Testing
(window.E)? clearTimeout(window.E): null;
(window.E)? window.E = null: null;
clearTimeout(window.EE);
LastUsed_Btn_Lvel = MenuBox_Array_Length;
}
else if(MenuBox_Array_Length < LastUsed_Btn_Lvel){
MenuEventTestLUBL("MenBoxOver3",LastUsed_Btn_Lvel);//4Testing
(window.E)? clearTimeout(window.E): null;
(window.E)? window.E = null: null;
clearTimeout(window.EE);
}
else{//NOTNEEDED here 4 testing only can be removed on final build
MenuEventTestLUBL("MenBoxOver4",LastUsed_Btn_Lvel);//4Testing
}
}

function MenBoxOut(){
MenuEventTestLUBL("MenBoxOut1",LastUsed_Btn_Lvel);//4Testing
eval("window.E = setTimeout(\"Menu_Out_TimeOut('MenBoxOut',"+LastUsed_RootBtn_Lvel+",1);\","+ mouseoutTimeOutValue + ")");
}

function qHf(x){
// I think Link should have it's own folder and file. Basically, just take the link info out of the hyper file and put it into Link file to create two files. I believe this makes more sence and two functions with the same name would not exist.  Needs more thinking
//alert("cfile$"+x);
x = x.split('"');
var x3 = x[2].split('|');
var x32 = parseInt(x3[2]);
var x33 = parseInt(x3[3]);

//x = x.substring(x.indexOf(
//alert("qLf"+X);
//var fnctnX = fnctn.substring(fnctn.indexOf("=")+2,fnctn.lastIndexOf(">"));
//(fnctnType==1)?parentDoc.location.href= fnctnX:null;
//(fnctnType==1)?parentDoc.location.href= stacksiteFolder + fnctn:null;
//alert(fnctnType);
//eval(x);
if(x32 ==2){
// NEEDS WORK THE elmA should go because ie7 is always going to return what every goes into it I believe
// a new way is needed 
// The elmA var has been removed from the script needs new way  because ie7 don't accept this no more
elmA.href = x[1];
alert(elmA.href );
(x33==1)?parentDoc.location.href= elmA.href:null;
}
}
// this will be the new way, once I get thing labeled more with the load script
function qSSclick(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
Change_Element(objID,objLevel,0);
(window.EE)? clearTimeout(window.EE): null;
(window.E)? clearTimeout(window.E): null;
(window.E)? window.E = null: null;
var setLevelToThis = (objType!=9)? LastUsed_RootBtn_Lvel : objLevel;
Menu_Out_TimeOut('qSSclick',setLevelToThis,0); // SA is a little crashy with this line May need looking into
//alert(setLevelToThis);
if( document.createElement && document.childNodes ) {
}
var findithere = findframeobject("stacksiteiframe");
var clickDocNum = findithere.getElementById("q1"+objID.substring(objID.indexOf("m")));
var scriptX = findithere.createElement('script');
scriptX.setAttribute('type','text/javascript');
///scriptX.setAttribute('src','someNewUrl.js'); // NOTE may need to use setAttribute
//alert(stacksiteFolder+"hyper/"+ clickDocNum.getAttribute('dcNu') + ".html");
scriptX.src = stacksiteFolder+"hyper/"+ clickDocNum.getAttribute('dcNu') + "/i.html"; // I think link should have it's own folder
//scriptX.src = stacksiteFolder+"link/"+ clickDocNum.getAttribute('dcNu') + ".html";
//alert(scriptX.src);
findithere.getElementsByTagName('HEAD')[0].appendChild(scriptX);
}

// this works fine. It's the old way of using the href. I still may go back to it, because adding a javascript file may turn out to have a tons of problems. Like the script may not update it self and end up using it's old js file instead of the updated one. Also calling a new script file could end up causing a load problem if the the user is not hook up to the internet at the time. Need more testing.

// dcNu = documentNumber
// hpTy = functionType
// tmNu = templeteLayout
//tmNm = templeteLayoutNumber

function qSSclickXXXX(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
Change_Element(objID,objLevel,0);
(window.EE)? clearTimeout(window.EE): null;
(window.E)? clearTimeout(window.E): null;
(window.E)? window.E = null: null;
var setLevelToThis = (objType!=9)? LastUsed_RootBtn_Lvel : objLevel;

Menu_Out_TimeOut('qSSclick',setLevelToThis,0);
findithere = findframeobject("stacksiteiframe");
//alert(objID.substring(objID.indexOf("m")));
//alert(objID +"|"+ findithere.getElementById("q1"+objID.substring(objID.indexOf("m"))).href); // 
var menuTag = findithere.getElementById("q1"+objID.substring(objID.indexOf("m")));
var menuFnctnType = parseInt(menuTag.getAttribute("hpTy")); //nn6 needs to parse. This could be used to detect NN browser maybe and others too.
var menuHref = menuTag.href;
//alert(menuFnctnType+"|"+ (menuFnctnType == 2));
if(menuFnctnType == 2){ // hyperlink
//alert(menuTag.href);
parent.location.href = menuHref;
}
// for security reasons.this needs to be called by the function name only
else if(menuFnctnType == 3){// javascriptFunction
var functnName = menuHref.substring(menuHref.lastIndexOf("/")+1);
//alert(functnName);
(functnName.length)? eval(functnName+"()") : null;
//eval(functnName);
}
}

function qSSmouseup(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
Change_Element(objID,objLevel,0);
//clearTimeout(window.EE); // this may be needed for menus because NS MAC has a problem with holding foucus a clear foucus could be used but 
//clearTimeout(window.E); // it seems to work ok with it like this because it just holds the menu open until the mouse is moved
//window.E = null;
}

function qSSmousedown(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
Change_Element(objID,objLevel,objClass+"a"); // "a" stands for active
}

function Scroll(Scroll_Direction,Scroll_Active,Scroll_qnumber){
//-- might be needed
//if(parentDoc.scroller == "on"){null;
//}
//else{
//clearTimeout(timerID);
//return;
//}
//--
//Scroll("Top",Scroll_Active,Scroll_qnumber);
//var scoMB_outer = parentDoc.getElementById(Scroll_qnumber+"bodymen" + Scroll_Active);

//alert(Scroll_qnumber);
//scoMB stands for "scrollmenubox"
var scoMB_outer = parentDoc.getElementById(Scroll_qnumber+"bodymen" + Scroll_Active);
var scoMB_holder = scoMB_outer.lastChild; // this is the MB_holder
var scoMB_btnT = scoMB_outer.firstChild;
var scoMB_btnB = scoMB_btnT.nextSibling;
var scoMB_select = parentDoc.getElementById(scoMB_outer.openboxid);

var scoMB_holder_Height = parseInt(scoMB_holder.style.height);
var scoMB_select_Height = parseInt(scoMB_select.style.height);
var scoMB_select_Tmargin = parseInt(scoMB_select.style.marginTop);
var scoMB_btnT_Height = (scoMB_btnT.style.display != "block")?0:scoMB_outer.btnheight;
var scoMB_btnB_Height = (scoMB_btnB.style.display != "block")?0:scoMB_outer.btnheight;
var scoMB_outer_Top = parseInt(scoMB_outer.style.top);
var scoMB_btnT_mou_elmY = mouse_doc_y - (scoMB_outer_Top + scoMB_btnT.realtop);
var scoMB_btnB_mou_elmY = mouse_doc_y - (scoMB_outer_Top + scoMB_btnB.realtop);

//window.status = (scoMB_outer_Top + scoMB_btnB.realtop) + " | " + mouse_doc_y + " | " + scoMB_btnB_mou_elmY + " | " + scoMB_btnT_Height;
//window.status = window.status + " |||| " + (scoMB_outer_Top + scoMB_btnT.realtop) + " | " + mouse_doc_y + " | " + scoMB_btnT_mou_elmY + " | " + scoMB_btnB_Height;

//var scroll_it=(Scroll_Direction=="Bot")? (scoMB_select_Tmargin + scoMB_select_Height)-(scoMB_holder_Height):  (scoMB_select_Tmargin < 0)? scoMB_select_Tmargin/-1 :0;
var scroll_it=(Scroll_Direction=="Bot")? (scoMB_select_Tmargin + scoMB_select_Height)-(scoMB_holder_Height):  scoMB_select_Tmargin/-1;
if(scroll_it){
var cleanspeed = (Scroll_Direction=="Bot")? (scoMB_btnB_mou_elmY >= 0)? scoMB_btnB_mou_elmY : 0 : (scoMB_btnT_Height-scoMB_btnT_mou_elmY >= 1)? scoMB_btnT_Height-scoMB_btnT_mou_elmY : 0; // this fixes any negative numbers
var Set_Speed = (cleanspeed< scoMB_btnB_Height/2)? 1:2;
var Var_speed = (cleanspeed*Set_Speed) + 1;
var speed = (scroll_it >= Var_speed)? Var_speed: scroll_it ;
}
else{
var speed = 0;
}
//var scoMB_select_Tmargin_top_setto = scoMB_select_Tmargin + speed;
var scroll_it_again = (Scroll_Direction=="Bot")? ((scoMB_select_Tmargin - speed) + scoMB_select_Height) -  (scoMB_holder_Height) : (scoMB_select_Tmargin + speed)/-1;
//alert(Scroll_Direction + " | " + scoMB_btnT_mou_elmY+ "|"+ scoMB_select_Tmargin + " | " + scroll_it +" | "+scroll_it_again + " | " + speed);

if(scroll_it){
scoMB_select.style.marginTop = (Scroll_Direction=="Bot")? scoMB_select_Tmargin - speed + "px" : (scoMB_select_Tmargin+speed!=0 || scoMB_select_Tmargin==-1)? scoMB_select_Tmargin+speed+"px" : "-1px"; // sa hates setting top button to 0px but it can go to -1px first than 0px
}
else alert("ohcrap"); // this needs to be change back to null; It's here for testing. NS bombs when a alert box is call during scrolling

if (scoMB_btnT.style.display != "block" && Scroll_Direction=="Bot" ){
scoMB_btnT.style.display = "block";
}
else null;

if(scoMB_btnB.style.display == "none" && Scroll_Direction=="Top" ){
scoMB_btnB.style.display = "block";
}
else null;


if(!scroll_it_again && Scroll_Direction=="Bot"){
scoMB_btnB.style.display = "none";
parentDoc.scroller = 0;
//parentDoc.scroller = "off";
}
else null;

if (!scroll_it_again && Scroll_Direction=="Top"){
scoMB_btnT.style.display = "none";
parentDoc.scroller = 0;
}
else null;
if(scroll_it_again){
eval("window.timerID = setTimeout(\"Scroll('"+Scroll_Direction+"',"+Scroll_Active+",'"+Scroll_qnumber+"');\",250)");
}
else null; // mac ie needs to check for timerid sometimes and maybe some others browser too when menu is a tiny scroll to go

}

function ScrollOver(){
var btn_id = this.id;
if(btn_id != parentDoc.scroller){
//window.status = this.id + " | " + parentDoc.scroller ;

//window.timerID = null;
parentDoc.scroller = btn_id;
var Scroll_qnumber = btn_id.substring(0,btn_id.lastIndexOf("s")); // This is the Object's Q Number, the component's share number used by it's objects. i.e. q1q1q1q1
//alert(Scroll_qnumber +"|"+parentDoc.scroller);

//parentDoc.scroller = "on";
Scroll_Active = this.info;
Scroll_Direction = (this.previousSibling)? "Bot" : "Top";
Scroll(Scroll_Direction,Scroll_Active,Scroll_qnumber); // this starts the scrolling action
}
else{
null;
// window.status = this.id + " | " + parentDoc.scroller ;
}
}

function StopScroll(){
// window.status = this.id + " | " + parentDoc.scroller ;
parentDoc.scroller = 0;
(window.timerID)? clearTimeout(timerID) : null; // mac ie needs to check for timerid sometimes and maybe some others browser too when menu has a tiny more scrolling to go
window.timerID = null;
}
function ScrollMove(elm){
var evt = (elm)? elm : top.event; // window.event; this may be needed for windows ie and other browser and added of course to the mix
Elmposition(evt, this); // this function produces and sets the positioning cords var for the scroll buttons
}

function qadlnk(filename){
var cssfile = filename; // it needs to put on od relative link maybe to make it safer ie ../
var objHead = parentDoc.getElementsByTagName('head');
//alert(parentDoc.createElementNS);
var objHeadTest = parentDoc.createElementNS && objHead[0].tagName == 'head';
if(objHead[0]){
var objCSS =(objHeadTest)?parentDoc.createElementNS('http://www.w3.org/1999/xhtml','link'): parentDoc.createElement('link');
// future UA may need to use setAttribute , for now it works on all UA without a setAttribute
objCSS.rel = 'stylesheet';
objCSS.href = cssfile;
objCSS.type = 'text/css';
//objCSS.setAttribute('href',cssfile);
//objCSS.setAttribute('rel','stylesheet');
//objCSS.setAttribute('type','text/css');
objHead[0].appendChild(objCSS);
}

/* old way
var cssfile = filename;
//alert(cssfile);
var nLink=parentDoc.createElement('LINK');
if(is_ie){
//alert(cssfile);
parentDoc.createStyleSheet(cssfile);
//alert(parentDoc.getElementsByTagName('HEAD')[0]);
}
else if(parentDoc.styleSheets || is_op){
nLink.setAttribute('rel','StyleSheet');
/////nLink.rel="StyleSheet";
nLink.setAttribute('type','text/css');
////////nLink.type="text/css";
nLink.setAttribute('href',cssfile);
//nLink.href=cssfile;
parentDoc.getElementsByTagName('HEAD')[0].appendChild(nLink); // this works too 
//parentDoc.getElementsByTagName('HEAD').item(0).appendChild(nLink); // this works too 
//0003//parentDoc.documentElement.childNodes[0].appendChild(nLink); // documentElement screwedup on both sa and head
}
//parentDoc.childNodes[0].appendChild(nLink); // documentElement screwsup on sa
// needed for xhtml xml app
//if (document.getElementById) {
//var l=document.createElementNS("http://www.w3.org/1999/xhtml","link");
//l.setAttribute("rel", "stylesheet");
//l.setAttribute("type", "text/css");
//l.setAttribute("href", "/css/js.css");
//l.setAttribute("media", "screen");
//document.getElementsByTagName("head")[0].appendChild(l);
//}
else null;
*/
}

function MenuEventTestLUBL(functionnNamLevNum, LastUsedLevInfo){
if(1==2){// turned off only on when testing
// this is for testing only and can be removed from production
// also the functions calls should be removed too.
//TESTING eventbox holds events fired. Remove on final products
var eventbox = (parentDoc.getElementById("eventbox") != null)? parentDoc.getElementById("eventbox") : false;
(eventbox)?eventbox.innerHTML = eventbox.innerHTML + functionnNamLevNum +":"+LastUsedLevInfo+" || ":alert("eventBoxMissing");
//eventTestValue = eventbox.innerHTML + "MenBoxOut1:"+LastUsed_Btn_Lvel+" || ";
//eventbox.innerHTML = eventTestValue;
}
}

function testcode(string){
//alert("kljhgg");
var qBodyElm = parentDoc.getElementById('qBody');
addHrSeperator();
/////////qBodyElm.appendChild(txNode("Arrays ||"+setDiv.innerHTML));
//addHrSeperator();
//qBodyElm.appendChild(txNode("structueArray ||"+ qtdnStackSiteC.innerHTML));
//addHrSeperator();
//qBodyElm.appendChild(txNode("qBodyTable ||"+ parentDoc.getElementById('qBodyTable').innerHTML));
addHrSeperator();
addHrSeperator();
qBodyElm.appendChild(txNode("Body ||"+ parentBody.innerHTML));
//addHrSeperator();
//qBodyElm.appendChild(txNode("Menus ||"+ parentDoc.getElementById('qbodymen').innerHTML));
//addHrSeperator();
//qBodyElm.appendChild(txNode("qBody ||"+ parentDoc.getElementById('qBody').innerHTML));
//alert("helloTesting22222");

function txNode(Txt){
return parentDoc.createTextNode(Txt);
}

function addHrSeperator(){
var h1 = parentDoc.createElement('hr');     	//  MB_btnT top scroll button
parentDoc.getElementById('qBody').appendChild(h1);
}
}

function showBrowserVer(){
// when using multi-browser this will put the browser version on the web page's title
if (document.all || is_sa){//if1
//alert(navigator.userAgent.toLowerCase().indexOf(string) + 1);
var detect = navigator.userAgent.toLowerCase();
var browser = "";
var thestring = "";
var version = 0;

if (checkIt('msie') || is_sa) {//2
browser = "IE ";
browser += detect.substr(place + thestring.length,3);
parentDoc.title = (is_sa)? parentDoc.title + " Safari": browser + " - " + parentDoc.title;
//alert(parentDoc.title);
}//if2
}//if1

function checkIt(string){
place = detect.indexOf(string) + 1;
thestring = string;
return place;
}
}

function testBtn(){
var d0 = parentDoc.createElement('div'); // start by creating a box for each group of menus
d0.innerHTML = "uniTestBtn";
d0.onclick = reSizeLayout;
var beforeHere =  parentBody;
if(parentBody.hasChildNodes()){
beforeHere = beforeHere.firstChild;
parentBody.insertBefore(d0,beforeHere);
}
else{ parentBody.appendChild(d0);
}
}

function detectQuirksMode(){ // testing 4 quirkmode
alert( /CSS.Compat/.test(document.compatMode));
if(typeof document.compatMode != "undefined" && /CSS.Compat/.test(document.compatMode))
{
return false;
}
return true;
}

// buildTime function may need a page onload to work
// windowonload should set off buildtime() unless there is a way to trigger it with counting pieses of the script needed
var buildTimeNum = 0;

function buildTime(){

//buildTimeNum = 0;
//alert(buildTimeNum);
//alert(parentDoc.getElementById("qBody"));
//window.weeee = setTimeout("buildTime();",1000);
// needed document. what ever could be added to the function instead ie buildTime.buildTimeSeconds
if(buildTimeNum == 0){

buildTimeNum = 1;
document.buildTimeSeconds = 0; //allow time to increase on each pass. so far op7.5 windows needed this 
document.buildTimeTrys = 0; // max of time it can try, then it should dump a failed screen browser error 
//document.buildTimeMaxTrys = 0;
//window.onload = buildTime; // sa does not work qbodTable 
}
//alert(document.getElementById("bottomTag"));
//alert("buildTimeNum:"+ buildTimeNum + " start:"+ document.buildTimeSeconds);
var testbottom0 = (document.getElementById("bottomTag"))? (document.getElementById("bottomTag").className)? document.getElementById("bottomTag").className == "part"+buildTimeNum : 0 : 0;
//alert(testbottom0);
//alert(document.getElementById("bottomTag"));
//NOTE it should be set at 80 insteat of 8 which is for testing
if(document.buildTimeTrys < 8 && parentDoc.getElementById("qBody")&& testbottom0&&eval("buildarraysPart"+buildTimeNum+"();")){ // if 001
//(buildTimeNum==2)? alert(qLayoutDiv.innerHTML) : null;

//alert("buildTimeNum:"+ buildTimeNum + " if:"+ document.buildTimeSeconds);
///////eval("buildarraysPart"+buildTimeNum+"();");
buildTimeNum++;
document.getElementById("bottomTag").className = "part"+buildTimeNum;
document.buildTimeTrys = 0;
document.buildTimeSeconds = 0;
(buildTimeNum < 3)? setTimeout("buildTime();",0) : null;
}
//NOTE it should be set at 80 insteat of 8 which is for testing
else if(document.buildTimeTrys < 8){// it's about 35 seconds per cycle build
//alert(document.buildTimeSeconds);
//else if(document.buildTimeMaxTrys < 6000){
//alert("buildTimeNum:"+ buildTimeNum + " else:"+ document.buildTimeSeconds);
document.buildTimeTrys++;
document.buildTimeSeconds = document.buildTimeSeconds + 10;
//setTimeout("buildTime();",3000);
//setTimeout("alert('fddddd');",document.buildTimeSeconds);
window.status = document.buildTimeTrys +" ||| "+ document.buildTimeSeconds;
setTimeout("buildTime();",document.buildTimeSeconds);
//alert(document.buildTimeSeconds);
}
else{
alert("page loading failed");
return;
// needs to load the browser page
}
}

buildTime(); // may need window.buildTime = setTimeout(buildTime(),document.buildTimeSeconds);
//buildTimeOnLoad();

//buildarraysPart1();
//buildarraysPart2();
//alert(qLayoutDiv.innerHTML);
//buildTimeOnLoad(buildarraysPart1);

//buildTimeOnLoad(buildarraysPart2);
//buildTimeOnLoad(buildarraysPart1);


//alert(parentBody);
// OLD Code and other code not being used
//-- never really worked // add events is one more thing to do and maybe use it for other things
//NEEDED add a onresize to trigger the page resize
//if(typeof window.addEventListener != 'undefined'){ //.. gecko, safari, konqueror and standard
//window.addEventListener('load', buildCSS, false);
///////////setTimeout("window.addEventListener('load', buildCSS, false)",4000);
//}
//else if(typeof document.addEventListener != 'undefined'){ //.. opera 7
//document.addEventListener('load', buildCSS, false);
//}
//else if(typeof window.attachEvent != 'undefined'){//.. win/ie
//window.attachEvent('onload', buildCSS);
//}
/*
function setStyle( object, styleText ) { if( object.style.setAttribute ) { object.style.setAttribute("cssText", styleText ); } else { object.setAttribute("style", styleText ); } }
*/

/*
// create a hidden element  on top of the document to place a elm to test it size every 2 seconds
// NOTE a width of 100% and display:table Might be able to detect window.onresize
//alert(document.body.offsetWidth);
var qdiv0 = parentDoc.createElement('div'); 
qdiv0.id = "qsizeBox";
qdiv0.style.position="absolute";
qdiv0.style.top="-9999px";
(parentBody.firstChild)? parentBody.insertBefore(qdiv0,parentBody.firstChild) : parentDoc.getElementById("qBody").appendChild(qdiv0);
//widthway
qdiv0.style.width = "1px";
qdiv0.style.height = "1px";// ns7.2- needs a height set, otherwise it reads out 0 for isStandardBoxMode
qdiv0.style.paddingRight="1px";
window.isStandardBoxMode = (parseInt(qdiv0.offsetWidth) == 2)? 1 : 0;
qdiv0.innerHTML="X<br />X";
qdiv0.style.paddingRight="0px";
qdiv0.style.width = "100%";
qdiv0.style.height = "auto";
qdiv0.style.fontSize="100%";
*/
/*
function findframeobject(qx){
var iFrameDoc;
var iFrameObj = (parentDoc.frames)? parentDoc.frames[qx] : parentDoc.getElementById(qx); // the document.frames is for mac ie 5

if (iFrameObj.contentDocument) {iFrameDoc = iFrameObj.contentDocument;} // For NS6

if (iFrameObj.contentWindow) {iFrameDoc = iFrameObj.contentWindow.document;} // For IE5.5 and IE6

else if (iFrameObj.document){ iFrameDoc = iFrameObj.document;}// For IE5

//else {alert ("your browser is not supported try using InternetExployer 5.0 or higher");}
return iFrameDoc;
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
//--
//alert(selectedObj.attributes["qs"].value);
//alert(document.getElementById("bottomTag"));
//--
//var tempIFrame=document.createElement('iframe');
//tempIFrame.setAttribute('id','RSIFrame');
//tempIFrame.style.border='0px';
//tempIFrame.style.width='0px';//tempIFrame.style.height='0px';
//tempIFrame.src='main.htm';
//IFrameObj = document.body.appendChild(tempIFrame);
//tempIFrame.setAttribute('id','RSIFrame');
//---
//--
//for(i = 0; i<snpString.length;i++){
//var iframeHolder = document.getElementById("qqSnp"+snpString[i]);
//alert(iframeHolder.getElementsByTagName("A").length);
//document.write(iframeHolder.innerHTML);
//alert(snpString+"|"+document.getElementById("qqSnp"+snpString[i]).innerHTML);
//}
//--
/*
function qMouse_Event_Table(e){ // for testing events fired on table
//alert("q6 |"+window.q6);
//////if(parentDoc.scroller){return;}else null; // mac NS needs to write this line this way it hates using returns in returns in ()?: I don't think these line is needed anymore
// evt stands for Event. The Event is the actually Event that Fired. i.e. mouseover oe mouseclick 
var evt = (e)? e : top.event; // window.event; this may be needed for windows ie and other browser and added of course to the mix
var evtType = (e)? e.type : top.event.type; // window.event.type; this may be needed for windows ie and other browser and added of course to the mix
alert(evtType);
}
*/

/*
function findElmPosXXX(X){
var obj = X;
var posX = obj.offsetLeft;
var posY = obj.offsetTop;
while(obj.offsetParent){
if(obj==document.getElementsByTagName('body')[0]){break}
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
function setBaseElm(){
// this is only needed when the browser is offline ans accessing the page from the computer file system
var b = parentDoc.createElement("base");
var hostFolder = stacksiteFolder.substring(0,stacksiteFolder.indexOf("stacksite"));
b.href = hostFolder;
parentHead.appendChild(b);
var baseElm = parentDoc.getElementsByTagName("base")[0];
//alert(baseElm.outerHTML);
}
*/

//alert(docBody);
//var docBody = doc.getElementsByTagName('BODY')[0];
//alert(doc.getElementsByTagName('BODY')[0]);