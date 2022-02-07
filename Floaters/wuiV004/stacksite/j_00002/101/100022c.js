//alert("c.js");
//NOTEs
// CHANGES
// objIdArray[4] was changed to objIdArray[5] for snipits
// objIdArray[4] is now for it's selector_name
//Testing
var qBodyIsOn = true;
var qTestOn = false;
//preLoad Varibles
var qDocBody =	qDoc.getElementsByTagName('BODY')[0];

//dropDownMenu vars
//NOTE  this could be added to the js file that loads for pages that need a drop down menu
var scrollBoxesNeeded = 0; // holds the amount of menu boxes needed to be created on document loading
qWin.timerID = null; // this is for holding open menu boxes
// needed setting after document has loaded
var mouseoutTimeOutValue = 1000; // The alotted time to keep a menubox open before closing it.
qDoc.scroller = 0;


// create a hidden element  on top of the document to place the pull down menus in
// I'm thinking this could go, by placing the menus in the doc by themselves
var qDropMnuDiv =qDoc.createElement("DIV");
qDropMnuDiv.style.display = "block"; // *******Note this should be set to display none or reset to block after build
qDropMnuDiv.id = "qbodymen"; // not being used just here to to help coding, and may have a use some day
//qDropMnuDiv.style.zIndex="5000"; // this may need tobe added 5000 

//Load the snipits
qAddScriptFiles("n",17,"s.js",7);//inFolder,folderArrayNum,fileName,filesearchNum
//Load the Menu
qAddScriptFiles("m",16,"m.html",8);//inFolder,folderArrayNum,fileName,filesearchNum
//Load the Layout
qAddScriptFiles("t",13,"c.js",6);//inFolder,folderArrayNum,fileName,filesearchNum

function qssAddCssLink(filename){
var objHeadTest = qDoc.createElementNS && qHead.tagName == 'head';// needed for xhtml xml app
if(qHead){
var objCSS=(objHeadTest)?qDoc.createElementNS('http://www.w3.org/1999/xhtml','link'): qDoc.createElement('link');
objCSS.rel = 'stylesheet';
objCSS.href = filename;// it needs to put on od relative link maybe to make it safer ie ../
objCSS.type = 'text/css';
qHead.appendChild(objCSS);

// future UA may need to use setAttribute , for now it works on all UA without a setAttribute
//objCSS.setAttribute('href',cssfile);
//objCSS.setAttribute('rel','stylesheet');
//objCSS.setAttribute('type','text/css');
//objCSS.setAttribute("media", "screen");
}
}


// needs to be changed to qSetMenu
function qssSetMenu(menuType,arrayNum,arrayObjs){//converts mnuArrays to dom
//alert(menuType);
// menuType: 3=nav 4=custom
// FF1.5+ needs the html custom arrayObjs tags to be in smaller case for innerHTML to work. This could be a problem for older KDE browsers. Might need to test for it like the follows:
// var useTagChar = (d.getElementsByTagName("B")[0])? "B" : "b";
// ie can't process cutom tags put into a createElement(X) using innerHTML the arrayObjs tags can be a <div>or <b>
// Also p tags don't work in ff or sa they get pulled out of nesting order and into a messed up order.
//alert(arrayObjs);
var pgNum = parseInt(qFileArray[1]);//ns6.2-ns6.6 needs parseInt only
var qSetArrayLength = qSetArray.length;
qSetArray[qSetArrayLength] = [];

var d = qDoc.createElement("DIV");
d.innerHTML = arrayObjs;
qSetDiv.appendChild(d);// op7.5+ requires a var obj outside this function to work

 //NOTE what happens when there is no mnuNode1 
var mnuNode1 = d.getElementsByTagName("B")[0]; // this is the first div found in the array
var mnuNodes = mnuNode1.getElementsByTagName("B"); // this is all the divs found in the array
var mnuNodesLength = mnuNodes.length;

var selMnuNode = 0;
var homeMnuNode = 0;
var homeMnuNum = (mnuNode1.getAttribute("home_pg"))? mnuNode1.getAttribute("home_pg") : -1;

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
var zxLink = mnuNode.getAttribute("zx");
///if(zxLink && (zxLink.charAt(0)=="."|| zxLink.charAt(0)=="/")){//ifZX is a link
if(zxLink !=null&& (zxLink.charAt(0)=="."|| zxLink.charAt(0)=="/")){//ifZX is a link
re = new RegExp("[\\W]*", "ig"); //  this is it literially  /.tabs[\W]+\{[^}]+\}/i
zxLink = zxLink.replace(re, sitePath);
mnuNode.zx = zxLink;
}//ifZX is a link
else{//javascript // this needs thinking
mnuNode.zx = "";
}
}//for-02

// Put the selected level Node and it's parents into a mnuDomArraySet
// I think adding the getElementsByTagName[number] to the qSetDiv.setAttribute("qA"+arrayNum+"Sub", holdSelNum); 
// this might add more speed and keep the generated javascript size down too.
// var holdSelNum = "";
// the while loop can add to holdSelNum = holdSelNum + selMnuNode+",";
// then it can be splited later to get the layer 
// also should I detremine the breadcrumb levels in this function by testing the homepage against the selMnuNode 
while(selMnuNode.id != d.id){//while-01 keep going back until it hits the qarray div
//alert(selMnuNode +"||||"+ selMnuNode.id);
var selMnuParentNode = selMnuNode.parentNode;
selMnuParentNode.selectedmenu = selMnuNode.id.substring(selMnuParentNode.id.length+1); //parent id length
qSetArray[qSetArrayLength].unshift(selMnuNode);
selMnuNode = selMnuParentNode;
//alert(d.selectedLength+"||||"+selMnuNode.id);
}//while-01
}//if-01
else{ // this handle all the divs
//if no selMnuNode is found then what? NEEDED MAYBE an ERROR
// if no array do what
}

(homeMnuNode)? null : homeMnuNode = mnuNode1; //NOTE what happens when there is no mnuNode1 
qSetArray[qSetArrayLength].unshift(homeMnuNode);
qSetDiv.setAttribute("qAT"+arrayNum, menuType);
qSetDiv.setAttribute("qA"+arrayNum, qSetArrayLength);
return null;
}//endOfFunct


function qssSetSnipit(Z,X){
var qSetArrayLength = qSetArray.length;
qSetArray[qSetArrayLength] = []; 
//NeedsWORK needs to test if it has two periods and foward (../) in 
// this may only be need if the snipit gets it's image from the same folder that's holding the snipit
var re = new RegExp("src"+ "[\\W]*", "ig");
X.replace(re, "src=\""+sitePath);
re = new RegExp("href"+ "[\\W]*", "ig");
qSetArray[qSetArrayLength].unshift(X.replace(re, "href=\""+sitePath));
//alert(qSetArray[qSetArrayLength]);
//qSetArray.setAttribute("qZNT"+arrayNum, arrayType);
qSetDiv.setAttribute("qN"+Z, qSetArrayLength);
return X;
}


function qssSetLayout(layoutObjs){
//alert(layoutObjs);
//(1)q1=on/off(2)q1=type(3)q1=objSubType(4)q0=snipitName(5)q1=borderType(6)q0=borderImageName(7)q11111111=borderImageSwitches(8)q1=isItaCenterForHeightorWidth (9)q1=centerMenuObj(10)q1=use menuArray 1 (11)1=start from menuArrayLevel at 1

qLayoutArray.innerHTML = layoutObjs;
//qLayoutArray.appendChild(d);

// Build the Template Objects
// function varibles Needed
var curNavLevObj = 0; // current Nav level Object
var curParentQNum = 0; // current parent qNum
var template = qLayoutArray; // contains the menu arrays of div's and their a elements
var templateObjs = template.getElementsByTagName("B"); // gets the Template Objects
var templateObjLength = templateObjs.length;
template.childQty = 0;
//alert(qLayoutArray.innerHTML);
//alert(templateObjLength);

// loop the Templete Object div elements and mark up it's structure
for(i=0;i<templateObjLength;i++){ // for 1 
var objX = templateObjs[i]; // get the current b element which repersents a single Template Object
//alert(objX.getAttribute("zs"));
//alert(objX.outerHTML);
objX.qNum = i; //keeps the parent qnum for placing it's children obj 

var objId = objX.getAttribute("zs"); // get the current b zsId .getAttribute("dcnu")
if(objId.indexOf("zz$") == 0){ // test if obj is on and it's a site obj //stasitq
var objIdArray = objId.split("$"); // split the current object Id into an array
var objOn = parseInt(objIdArray[1]); // get the on or off value for the current object
var objType = parseInt(objIdArray[2]); // get the type for this current object
var objSubType = parseInt(objIdArray[3]); // get the sub type for this current object
var objParent = objX.parentNode; // get the parent node for this object

objX.isOn = (objParent.isOn||i<1)?  objOn :0; // if both parent and current Div is on, then current div is on
objX.objType = objType;
objX.objSubType = objSubType;
objX.childQty = 0; // put a childQty on the current div so it's children can use it

if(objX.isOn && objType > 3){ //ift the body children and up only needs this for now
objX.parentSubNum = objParent.childQty; //holds the child number for the parent on the current div for it self i.e. q1q1
objParent.childQty++; // if current Div is on, add one to its parent's child qty
//alert(objParent.id + "|" + objParent.childQty);

if(objParent.objType == 5 || objParent.objType == 8){//if5/8 test to see if it's a buttonObject
(objType == 30)? objParent.pointerIsNeeded = 1: null; // see if a buttonObject has a subMenuObject
}//if5/8
if(objParent.objType == 35){ //if35  test to see if it's a subbuttonObject
(objId.indexOf("q1") == 0)? objParent.pointerIsNeeded = 1: null; // this just turns it on all the time
}//if35
}//ift
//alert(objX.parentNode.childQty + " | " + objX.parentNode.id);
//alert((objIdArray[1]==0) + " | " + objIdArray);
//alert(objX.qIsOn + "|" + objId.indexOf("q") + " | " + objX.parentNode.id);
} // end if 1
} // end for 1

//alert(layoutObjs);
var curParentCssSelector = "";
var curParentSubTypeAndSelector = "";

// start building the Template Objects
for(i=0;i<templateObjLength;i++){ // for 1
//alert("total: " + templateObjLength);
var objX = templateObjs[i]; // get the current div
if(objX.isOn){ // if 1
var objId = objX.getAttribute("zs"); // get the current div zsId .getAttribute("dcnu")
var objParent = objX.parentNode; // get the current div's parent
var objParentChildQty = objParent.childQty; // get the current div's parent's Chlidren Qty
var objParentType = objParent.objType; // get the parent type
var objParentSubType = objParent.objSubType; // get the parent sub type

// **** (1)q1=on/off (2)q1=type (3)q1=objSubType (4)q0=snipitName (5)q1=borderType (6)q0=borderImageName (7)q11111111=borderImageSwitches *****
var objIdArray = objId.split("$"); // split the current Div Id into an array
var objType = parseInt(objIdArray[2]); // get the type this current object is
var objSubType = parseInt(objIdArray[3]); // get the subtype this current object is
var objCssSelector = objIdArray[4] || ""; // NOTE maybe using false is better

if(objType==101){ //Window Node
// this needs to be change to 1 or 1W
// current it does nothing, but one day it will allow the type of document tobe built in a var and a xml doc too

// if the layout has an error, then stop loading and show error messages in the web page
if(objX.getAttribute("errormsgs")!="false"){
var pElm = document.createElement("p");
pElm.innerHTML = objX.getAttribute("errormsgs");
qLayoutDiv.appendChild(pElm);
return true;
}
}

else if(objType==1){ //HTML Element Node
// this needs to be change to 2 or 2D
// window.document.documentElement.setAttribute("zs", objId); // this works but I'm useing the tag name in the css
}

else if(objType==2){ //Head Element Node
// this needs to be change to 3 or 3H 
// current it does nothing, but it could be used to set the title bar, include css files and meta tags and etc.
}

else if(objType==3){ //Body Element Node
if(objX.getElementsByTagName("b")[0]){
}
}

else if(objType==4 || objType==20 || objType==50 || objType==60|| objType==7){
//4-Box, 7-Page, 20-menuBox, 50-crumbBox, 60-SnipitBox 
//alert(objX.childQty+"|"+objParent.qNum +" | "+ objX.parentSubNum);
// **** (1)q1=on/off (2)q1=type (3)q1=objSubType (4)q0=snipitName (5)q1=borderType (6)q0=borderImageName (7)q11111111=borderImageSwitches *****

qssBuildTableFills(objX.qNum, objType, objSubType, 4, objX, 0, objId, "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for main frame object

// obj is empty then do this
 // just here for testing. a blank space needs to go here instead
var spaceName = (objType==4)? "Box": (objType==20)? "menuBox" : (objType==60)? "SnipitBox": (objType==7)?"Page":"CrumbBox";
var objDiv =  qssGetElmInVar(qLayoutDiv,"q"+objX.qNum+"Ld","div");
if(!objX.getElementsByTagName("b")[0]){
objDiv.innerHTML = spaceName;
}
}

else if(objType==61){ //SnipitItem
var placeItHere = qssGetElmInVar(qLayoutDiv,"q"+objParent.qNum + "Ld","DIV");
var snipitNum = qSetDiv.getAttribute("qN"+objIdArray[5]);
placeItHere.innerHTML = (parseInt(snipitNum)>-1)?qSetArray[snipitNum] :"Snipit-Item-Here";//table into it;s location
}

else if(objType==5){//if1 menuItems
var mnuArrayNumIs = parseInt(objIdArray[10]);
var mnuArrayNum = (mnuArrayNumIs>=0)? qSetDiv.getAttribute("qA"+mnuArrayNumIs) : -1;
//alert(qSetDiv.getAttribute("qA"+mnuArrayNumIs));
var mnuArray = (mnuArrayNum>=0)? qSetArray[mnuArrayNum] : -1;
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

qssBuildTableFills(objX.qNum, checkType, objSubType, 4, curNavLevObj, pullmenuIsneeded, objId, "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,selectIsNeeded); // make the buttons

eval("qWin.q"+objX.qNum+"="+checkType+";"); // this holds the type of object it is or off if not used
}//if2
else{//NEEDSWORK HERE has no array or menus do what
curNavLevObj = false;
}
}//if1

else if(objType==30){ // dropMenuBox
//alert("ddd");
// NOTE THIS NEEDS TO SET A var in the ftn so items nested in it can grab it's css_selector_number and
// maybe a number it shares with it nested items to build it menu. The latter needs more thinking
// this get skipped for now but it could be used for something else later maybe 
curParentCssSelector = objCssSelector;
curParentSubTypeAndSelector = objIdArray[3];
}

else if(objType==35){ // dropMenu Items Makes the boxes and buttons
//alert(objX.outerHTML);
//alert(objParent.parentNode.qNum+1);
// selectIsNeeded could be handled by adding chars to (objIdArray[6].indexOf("s"))?
var selectIsNeeded = true; // ***NEEDSWORK finds out if buttons have selected menu option on
//killed0014//var selectIsNeeded = (objX.selectIsNeeded != null)? (objX.selectIsNeeded==1 )? true:false:false; // finds out if buttons have selected menu option on
//NEEDSWORK objParent  would be better IO believe
//alert("objCssSelector:"+objCssSelector);
qssBuildDropMenuBoxes(objParent.parentNode.qNum,9,objSubType,curNavLevObj,selectIsNeeded,curParentCssSelector,curParentSubTypeAndSelector,objId);

// NOTE scroll Btn could make qWin.q  confussing if it ever needs to find this number,
//eval("qWin.q"+(objParent.qNum+1)+"="+9+";"); // this holds the type of object it is or off if not used
eval("qWin.q"+(objParent.parentNode.qNum+1)+"="+9+";"); // this holds the type of object it is or off if not used
}

else if(objType==55){ // breadCrumb Menus Items
var mnuArrayNumIs = parseInt(objIdArray[10]);
var mnuArrayNum = (mnuArrayNumIs>=0)? qSetDiv.getAttribute("qA"+mnuArrayNumIs) : -1;
var mnuArray = (mnuArrayNum>=0)? qSetArray[mnuArrayNum] : -1;
//NOTE var mnuLevel = parseInt(objIdArray[11]);//maybe it can be used for sub levels
var mnuArrayLength = mnuArray.length;
var homeMnu = mnuArray[0]; // sould be called homePgMnu
var homeMnuId = homeMnu.id;
var selectMnu = mnuArray[mnuArrayLength-1];
var selectMnuId = selectMnu.id;

// NEEDS a way to test for no levels and use the home page with a link
mnuArrayLength = (homeMnuId==selectMnuId)? 1 : mnuArrayLength;
var placeItHere = qssGetElmInVar(qLayoutDiv,"q"+objParent.qNum + "Ld","DIV");

//build the before node
var beforeSpace = qDoc.createElement('span');
beforeSpace.setAttribute("zs",objId.replace("c.$","cb$"));
placeItHere.appendChild(beforeSpace);

// build the crumbs
for(var ibc=0;ibc<mnuArrayLength;ibc++){
var selNavArrayElm = mnuArray[ibc];
//alert(selNavArrayElm.outerHTML);
if(selNavArrayElm.getAttribute("dcnu")){//ifdcnu
var dcNum = selNavArrayElm.getAttribute("dcnu").split("|");//  features
var textContent =  qDoc.createTextNode(dcNum[1]);
if(mnuArrayLength!=1 && ibc < mnuArrayLength-1){// crumbs
//alert(ibc +"|||"+mnuArrayLength +"||||"+ selNavArrayElm.getAttribute("dcnu") +"||||"+ selNavArrayElm.id);

// create separator
var separator = qDoc.createElement('span');
separator.setAttribute("zs",objId.replace("c.$","cs$"));

// create crumbs
var aElm = qDoc.createElement('a');
aElm.setAttribute("zs",objId.replace("c.$","ca$"));
// aElm.className = "q"+objX.qNum+"caz " + "q"+objX.qNum+"chz " + genClassNam;

// add the link
var hLink = selNavArrayElm.getAttribute("ZH");
aElm.href = (hLink)?  hLink : "javascript:null";
aElm.appendChild(textContent);
placeItHere.appendChild(aElm);
placeItHere.appendChild(separator);
}
else{// last crumb
var aElm = qDoc.createElement('span');
aElm.setAttribute("zs",objId.replace("c.$","cl$"));
aElm.appendChild(textContent);
placeItHere.appendChild(aElm);
}
//alert(placeItHere.innerHTML);
}//ifdcnu
}//endFor
}//end55

else if(objType==90){ //this builds a snipit object // content object needs to go here
alert("snipit90");
var placeItHere = "q"+objX.qNum+"i"+0;
var snipitName = objIdArray[4];
var snipitCode = (qGBID("qqSnp"+snipitName) != null)? qGBID("qqSnp"+snipitName) : qDoc.createElement('div');

qssBuildTableFills(objX.qNum, objType, objSubType, 4, objX, 0, objId, "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for the object

qssBuildTable(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum,1,1,"notBeingUsed","notBeingUsed"); // make a table for the object
qGBID(placeItHere).appendChild(snipitCode);
}
else{ // error
// page loading script should halt loading and produce a error meassage in the body of the page
// when layout contains a objType which does not exist and understands. This could also be a e elm too.
var pElm = document.createElement("p");
pElm.innerHTML = "error: page objType-"+objType+" is unknown and does not exist";
qLayoutDiv.appendChild(pElm);
return true;
}
} // end if 1

} // end for 1
//alert(qLayoutDiv.innerHTML);
return true;
}


// qssBuildLayout function may need a page onload to work on resizing for the delayed images
/*
function qssBuildLayout(){
qDocBody =	qDoc.getElementsByTagName('BODY')[0];
//alert(qDocBody);
qssBuildLayoutPart1();
qssBuildLayoutPart2();
}
*/

var buildTimeNum = 0;

function qssBuildLayout(){
//alert("qssBuildLayout: " + buildTimeNum);
qDocBody =	qDoc.getElementsByTagName('BODY')[0];
// needed qDoc. what ever could be added to the function instead ie buildTime.buildTimeSeconds
if(buildTimeNum == 0){
buildTimeNum = 1;
qDoc.buildTimeSeconds = 0; //allow time to increase on each pass. so far op7.5 windows needed this 
qDoc.buildTimeTrys = 0; // max of time it can try, then it should dump a failed screen browser error 
}

//alert("buildTimeNum:"+ buildTimeNum + " start:"+ qDoc.buildTimeSeconds);
var xElm = (qDocBody)? qGBID("stacksitejsB") : false;
var xElmTest =xElm &&xElm.className&&xElm.className=="stacksitepart"+buildTimeNum&&qGBID("qBody");
//NOTE it should be set at 80 insteat of 8 which is for testing
if(qDoc.buildTimeTrys<8&& xElmTest&&eval("qssBuildLayoutPart"+buildTimeNum+"();")){
//alert("buildTimeNum:"+ buildTimeNum + " if:"+ qDoc.buildTimeSeconds);
buildTimeNum++;
xElm.className = "stacksitepart"+buildTimeNum;
qDoc.buildTimeTrys = 0;
qDoc.buildTimeSeconds = 0;
(buildTimeNum < 3)? setTimeout("qssBuildLayout();",0) : null;
}
//NOTE it should be set at 80 insteat of 8 which is for testing
else if(qDoc.buildTimeTrys < 8){// it's about 35 seconds per cycle build
//alert("buildTimeNum:"+ buildTimeNum + " else:"+ qDoc.buildTimeSeconds);
qDoc.buildTimeTrys++;
qDoc.buildTimeSeconds = qDoc.buildTimeSeconds + 10;
qWin.status = qDoc.buildTimeTrys +" ||| "+ qDoc.buildTimeSeconds;
setTimeout("qssBuildLayout();",qDoc.buildTimeSeconds);
}
else{
alert("page loading failed");
return;
// needs to load the browser page
}
}


function qssBuildLayoutPart1(){
//alert("qssBuildLayoutPart1");
var Frag1 = document.createDocumentFragment();// NOTE adding css element link only works in moz+ 

//CSS
qssAddCssLink( stackPath +"t/"+qFileArray[13] + "/g.css?"+qFileArray[6]);


//Layout
var t = qLayoutDiv.firstChild;
if(t){ 
Frag1.appendChild(qDropMnuDiv);
Frag1.appendChild(qLayoutDiv.firstChild);
}
qDocBody.insertBefore(Frag1,qGBID("qBody"));

if(qBodyIsOn){
qGBID("qBody").style.display = "block";
}
//alert("qssBuildLayoutPart1-2");

return true;

//alert(qDropMnuDiv.innerHTML);
//alert(qLayoutDiv);
//alert(qLayoutDiv.innerHTML);
}

function qssBuildLayoutPart2(){
//alert("qssBuildLayoutPart2");

//alert("HHH"+qLayoutDiv.innerHTML);
qqSnp = null;
//qArray = qSetDiv = null; // To cut down on memory code. Not sure if this will have any benifit, Needs testing
if(qTestOn){
setTimeout("testcode()",4000);
//testBtn();
showBrowserVer();
}
return true;
}

function qssBuildLayoutPart3(){
alert("hello");
}

function qssBuildDropMenuBoxes(objQumber,objType,objSubType,curNavLevObj,selectIsNeeded,curParentCssSelector,curParentSubTypeAndSelector,objId){
var menu = curNavLevObj.getElementsByTagName("B");
var menuQTY =  menu.length;
//alert("menuQTY: "+ menuQTY);
//alert(curParentSubTypeAndSelector);
for(var c=0; c < menuQTY;c++){ // this starts the loop for the first menu tree

if (menu[c].childDivs){
var d0 = qDoc.createElement('div'); // start by creating a box for each group of menus
d0.id = "q"+(objQumber+1)+"i"+menu[c].id +"m";
//alert(d0.id +"||||"+ d0 +"||||"+menu[c].id);
d0.style.display = "none"; // I don't think this is needed because the outer is already at none, not sure
d0.setAttribute("trace","menuSelectBox"); // just here to help me find this div during development , it can be removed on final build
d0.setAttribute("zs",curParentSubTypeAndSelector);

var menuBox_Levl = menu[c].id.match(/m/gi).length + 1;
//alert(menuBox_Levl +"||"+scrollBoxesNeeded);
// build a menubox if needed
(menuBox_Levl > scrollBoxesNeeded)? qssBuildDropMenuBox(qDropMnuDiv,"q"+(objQumber+1),menuBox_Levl,curParentCssSelector): null; 
qssGetElmInVar(qDropMnuDiv,"q"+(objQumber+1)+"bodymen"+menuBox_Levl,"DIV").appendChild(d0);
}
else{
null;
//alert("helloworld1234");
}

// this fills in the menus for each box built
qssBuildTableFills(objQumber+1,objType,objSubType,4, menu[c],true,objId,"notUsed",0,0,0,selectIsNeeded); 
} // end of for loop
scrollBoxesNeeded = 0;
}

function qssBuildDropMenuBox(putObjHere,objQumber,menuBox_Levl,objCssSelector){
// this makes a scrollbox

scrollBoxesNeeded = menuBox_Levl;
var d00 = qDoc.createElement('div');  	// - start by creating the MB_outer div element
var d1 = qDoc.createElement('div');     	//  MB_btnT top scroll button
var d3 = qDoc.createElement('div');     	//  MB_btnB bottom scroll button
////var d1Text=qDoc.createTextNode(" \/\\ ");//  MB_btnT text node
//var d3Text=qDoc.createTextNode(" \\\/ ");//  MB_btnB text node
// alert(objCssSelector);
d00.onmouseover = qssMenuDrop_mouseover;
d00.onmouseout = qssMenuDrop_mouseout;
d00.setAttribute("zs",objCssSelector+"_diBo_boSiBo_boOrVe_poAb_cuPo_allSizesAuto_Le0TopNeg10000");
d00.style.display = "none";
d00.id = objQumber+"bodymen"+menuBox_Levl;

d1.setAttribute("zs","_diBo_boSiBo_poAb_allSizesAuto_LeRiTo0px_diNo_cuDe_ovHi");
d3.setAttribute("zs","_diBo_boSiBo_poAb_allSizesAuto_LeRiBo0px_diNo_cuDe_ovHi");
d1.info = d3.info = menuBox_Levl;//this is for scrollbox's level
d1.onmousemove = d3.onmousemove = qssMenuDropScroll_mousemove;
d1.onmouseover = d3.onmouseover = qssMenuDropScroll_mouseover;
d1.onmouseout = d3.onmouseout = qssMenuDropScroll_mouseout;
d1.className = d3.className = objQumber+"cScrollBtn";
d1.style.zIndex= d3.style.zIndex=menuBox_Levl; // this may need to add 5000 + menuBox_Levl to cover all bases and fix any errors with other things on developers work

d1.innerHTML =  "&#9650;";//  Up Pointer this put the d1text element in the d1 element up button /// might NEED the &# 
d1.id = objQumber+"scot"+menuBox_Levl;
//d1.appendChild(d1Text);//this put the d1text element in the d1 element
d00.appendChild(d1); // - put the top button into the holder element
d3.innerHTML = "&#9660;";// this put the d3text element in the d4 down button ////// might NEED the &# 
d3.id = objQumber+"scob"+menuBox_Levl;
//d3.appendChild(d3Text);//this put the d3text element in the d4
d00.appendChild(d3); // - put the bottom button into the holder element

putObjHere.appendChild(d00);// this places the MB_outer
}


function qssBuildTableFills(objQumber,objType,objSubType, divqty, divObject, pointer_isneeded, objId, notUsed1, borderImg, parentqNum, parentSubNum, selectIsNeeded){

// might be better to add a bx or bt to the objType or somewhere and use objType.indexOf("bt") and objType.indexOf("bx")
var isObjTypeDivBtn = objType == 5 || objType == 8 || objType == 9;
var isObjTypeDivBox =  !isObjTypeDivBtn&&(objType==4||objType==20||objType==50||objType==60||objType==7);

// divObject makes sure there is tabs and also buttons and menus
if(divObject){
var tdSelected = (divObject.selectedmenu!=null)? divObject.selectedmenu : -1;
var tdQTY = (isObjTypeDivBtn)? divObject.childDivs: 1; // this get the number of btns needed // boxes only 1
//alert(objType +"|||"+ divObject.id +"|||");
//alert(objType +"|"+ tdSelected+"|"+selectIsNeeded);
//alert(objType +"|||"+tdQTY);
//alert("objId: "+objId);

for(var cc=0; cc < tdQTY;cc++){//
var divX = qDoc.createElement(isObjTypeDivBox && "div" || "a");
//(objType == 9)? alert(divX) : null;
if(isObjTypeDivBtn){ // for button objects // 5 6 8 9
var useSelected = cc == tdSelected && selectIsNeeded;
if(useSelected){
var newObjId = objId.replace("c.$","cp$");
divX.setAttribute("zs",newObjId);
}
else{
divX.setAttribute("zs",objId);
}

var mnuObj = qssGetElmInVar(divObject,divObject.id+"m"+cc,"B");
var dcNum = mnuObj.getAttribute("dcnu").split("|");//  features
//var div0issub = mnuObj.childDivs && pointer_isneeded; //check if a pointer is needed
//alert(parseInt(mnuObj.getAttribute("dcnu")) +"|||||"+ pgNum);
var tdImage = "";
var tdText =  dcNum[1];
// going to use css content for this
var tdPointer = (mnuObj.childDivs && pointer_isneeded)? (objType == 5)? "&#9660;" : "&#9658;" :  ""; //9660 is the down

if(objType == 5){ // menu Item
//var taXClass = lastDiv.className.replace(/z/g,"x");
var tableCode = tdText;
/// var tableCode = "<div>$B"+ tdImage+"</div><div>"+tdText+"</div><div>"+tdPointer+"$E</div>";
}
else{// type 9 drop down menus
//var displayType = "dd";
var tableCode = tdText;
/// var tableCode = "<div>$B"+ tdImage+"</div><div>"+tdText+"</div><div>"+tdPointer+"$E</div>";
}
divX.innerHTML = tableCode;

// add the link
//NOTE $$$$$ hLink IS OFF TO MAKE IT SIMPLE TO WORK WITH CODING
// IT CAN GO BACK ON WHEN I GET MORE CODING DONE
var hLink = mnuObj.getAttribute("zx") && "OFF";
divX.href = hLink;
divX.id = "q"+objQumber+"i"+divObject.id+"m"+cc;
divX.onmouseover=divX.onmouseout=divX.onmousedown=divX.onmouseup=divX.onclick= qssMenuItem_event;
divX.qHasChild = mnuObj.childDivs;
}//endBtn

else if(isObjTypeDivBox){ // boxes
divX.setAttribute("zs",objId);
 // puts a id onto the last nested div // the id is put on tempalary to help place the table
divX.id = "q"+objQumber+"Ld"; //make it last elm id in the table building function
/// "q"+objQumber+"i"+divObject.id+"m"+cc +"a";
}


if(objType == 7){
//alert(qLayoutDiv);
qLayoutDiv.appendChild(divX);
}
else if(objType== 4 || objType == 20 || objType == 50 || objType == 60){
var useTagName = "DIV";
var inTheDiv = qLayoutDiv;
var placeithereId = "q"+parentqNum + "Ld";
var placeithere = qssGetElmInVar(inTheDiv,placeithereId,useTagName);
placeithere.appendChild(divX);
}
else if(objType== 5 || objType == 8){
//alert(cc);
var useTagName = "DIV";
var inTheDiv = qLayoutDiv;
var placeithereId = "q"+parentqNum + "Ld";
var placeithere = qssGetElmInVar(inTheDiv,placeithereId,useTagName);
placeithere.appendChild(divX);
}
else if(objType== 9){
var useTagName = "DIV";
var inTheDiv = qDropMnuDiv;
var placeithereId = "q"+objQumber+"i"+divObject.id +"m";
var placeithere = qssGetElmInVar(inTheDiv,placeithereId,useTagName);
placeithere.appendChild(divX);
}

} // this is the end of the for(var cc=0; cc < tdQTY;cc++)
//alert(placeithere);
} // this ends the if (divObject)
else null;
//alert(qLayoutDiv.innerHTML);
} // this is the end of the fillBtnTD function 

function qssGetElmInVar(ArrayX,idNum,fTagName){
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

function qssGetPosAll(e, elm_obj,testFromFunction){
// the list of the returned array of values for the supplied event, element and windows
// mouse_doc_x    : gets the current mouse's position to the document's left edge
// mouse_doc_y    : gets the current mouse's position to the document's top edge
// mouse_ele_x     : gets the current mouse's position to the element's left edge
// mouse_ele_y     : gets the current mouse's position to the element's top edge
// mouse_win_x    : gets the current mouse's position to the window's left visual edge
// mouse_win_y    : gets the current mouse's position to the window's top visual edge
// win_w                : gets the current window's visual width
// win_h                 : gets the current window's visual height
// elm_doc_x         : gets the current element's position to the document's left edge
// elm_doc_y         : gets the current element's position to the document's top edge
// elm_win_x          : gets the current element's position to the window's left visual edge  
// elm_win_y          : get the current element's position to the window's top visual edge
// doc_win_x          : gets the current left space between the document's left edge and the window's visual left edge 
// doc_win_y          : gets the current Top space between the document's top edge and the window's visual top edge 
// not used yet
// doc_w                : gets the current document's width //not used
// doc_h                 : gets the current document's height // not used
// pageHeight        : not used
// pageWidth         : not used
// windowHeight    : not used
// windowWidth     : not used
// pageScrollTop   : not used
// pageScrollLeft   : not used

// testing for top might work instead of sniffing for each browser here or test for top.pageXOffset or winelm.pageXOffset
// I don't no if pageXOffset is dom and if khtml supports it or not. Needs checking.
// ns needs top node here. If miners don't like this then (top)? top: window; var is needed before this code
//var winSelf = parent.self; // I think self can be used now it should work with parentWin
var a = {};
// older browsers need to use qDoc.body newer and compilant ones use documentElement
var docElm =(e.pageX || qDocElm.clientWidth)?qDocElm:qDoc.body;
a.elm_doc_x = a.elm_doc_y =  a.elm_win_x = a.elm_win_y = a.doc_win_x = a.doc_win_y = 0;

// e.page is everyone and ie is e.client
a.mouse_doc_x = e.pageX || (e.clientX + (qDocElm.scrollLeft || qDoc.body.scrollLeft));
a.mouse_doc_y = e.pageY || (e.clientY + (qDocElm.scrollTop || qDoc.body.scrollTop));
a.mouse_win_x = (e.pageX)? e.pageX -  parent.self.pageXOffset : (e.clientX)? e.clientX :0; // old ns&op mayNeed top|self
a.mouse_win_y = (e.pageY)? e.pageY -  parent.self.pageYOffset : (e.clientY)? e.clientY :0; // top.pageYOffset works too

var docInnerHeight = a.win_h = parent.self.innerHeight; // mostly everyone accept ie
var docInnerWidth = a.win_w = parent.self.innerWidth; // mostly everyone accept ie
var docOffsetHeight = docElm.offsetHeight;
var docOffsetWidth = docElm.offsetWidth;
var docClientHeight =docElm.clientHeight; // ie mostly
//docClientHeight = docElm.clientHeight; // ieWin needs to read this line twice, more testing ie5 maybe, maybeNone
var docClientWidth = docElm.clientWidth;
(a.win_h < docOffsetHeight)? null : a.win_h = docOffsetHeight;
(a.win_h < docClientHeight)? null : a.win_h = docClientHeight;
(a.win_w < docOffsetWidth)? null : a.win_w = docOffsetWidth;
(a.win_w < docClientWidth)? null : a.win_w = docClientWidth;

 // ns < 7.0 scrollBar present bug of divs with a css width:auto having position:relativeORabsolute this normally happens when measuring the dropmenus when the UA shows a scrollBar  
if(!a.win_w){
a.win_w = (docInnerWidth == docOffsetWidth)? docInnerWidth : docInnerWidth - 15;
}
if(!a.win_h){
a.win_h = (docInnerHeight == docOffsetHeight)? docInnerHeight : docInnerHeight - 15;
}

var posArray=qssGetPosElm(elm_obj);
a.elm_doc_x = posArray[0];
a.elm_doc_y = posArray[1];

a.mouse_ele_x = a.mouse_doc_x - a.elm_doc_x;
a.mouse_ele_y = a.mouse_doc_y - a.elm_doc_y;
a.elm_win_x = a.mouse_win_x - a.mouse_ele_x;
a.elm_win_y = a.mouse_win_y - a.mouse_ele_y;
a.doc_win_x = a.mouse_doc_x - a.mouse_win_x;
a.doc_win_y = a.mouse_doc_y - a.mouse_win_y;

return a;
}

function qssGetPosElm(obj){
var posLeft = posTop = 0;
//alert(obj +"||||"+obj.offsetTop+"||||"+obj.offsetParent +"||||"+obj.parentNode.tagName);
//ie8b1 has no offsetParents anymore //others might follow// it just goes right to the top or left in beta1 // anyway this works with out driving the others nuts
if (obj.offsetParent || (obj.offsetTop || obj.offsetLeft)){
do{
posLeft += obj.offsetLeft;
posTop += obj.offsetTop;
}while (obj = obj.offsetParent);
}
return [posLeft,posTop];
}

function qssGetPosOffsets(elm_obj,allOrOne){// not used yet
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

function qssMenuItem_event(e){
// evt stands for Event. It's the Event that Fired. i.e. mouseover oe mouseclick 
var evt = (e)? e : top.event; // qWin.event; this may be needed for win_ie and other browsers too.
var evtType = (e)? e.type : top.event.type; // qWin.event.type may be needed for win_ie and other browsers too
var objX = this; // this holds the current object the event fired on // on buttons this the second nested element

//The object that the event fired on
var objID = objX.id; // this is the Id of the 3rd nested div element on a Button.
var objIDs = objID.split("i");//this splits and gives the objQNum(q5 and ect) and the MenuNum(q1m0mo and etc)
var objNumber = parseInt(objID.substring(1)); // The Object's Number, the number that follows the q . i.e. 5 or 9 or etc.
var objQumber = objIDs[0]; // The Object's Q Number, is share number used by it's objects. i.e. q1q1q1q1
var objClass = objQumber +"c"; // The element name. Basically the classname from the ID
var objLevel = objID.match(/m/gi).length;//Counts how many m's are found in the id, basically it's the MenuArrayId number
var objType = eval("qWin."+objQumber+";"); // this holds the type of object it is

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
//Current_NextMenuBox_Type = (subMB_check)? eval("qWin."+subMB_select_qNum): 0; // this is the current NextMenuBox Type.
}
var subMB_select_Type = (subMB_check)? eval("qWin."+"q"+(Crnt_MnuBoxes_Num)): 0; // this checks and gets the sub Menu Box Type
var subMB_select = (subMB_select_Type == 9)? qGBID("q"+(Crnt_MnuBoxes_Num)+"i"+objIDs[1]+"m"): 0; // this checks and gets the next sub Menu Box to be opened
//alert(eval("qWin."+"q"+(Crnt_MnuBoxes_Num)));
//alert(subMB_select_Type+" | "+subMB_select);
//alert("subMB_select_qNum | "+subMB_select_qNum);
//alert(subMB_select_Type + " | " + subMB_select_qNum);
//  RootBtns are use to keep track of the first button(Root), used to open a Menu at a certain Level. // subTreeBtn maybe a better name
eval("qssMenuItem_"+evtType+"(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,Crnt_MnuBoxes_qNum,subMB_select_Type)");
} // end qssMenuItem_event

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

//qSSmouseover
function qssMenuItem_mouseover(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
//test to see if any button has every been opened yet with a LastUsed varible and check to see if any timeouts need to be canceled or if anything needs to be closed right away
// this test is needed basically to by pass this statement when the first button is used after the page has loaded 
if(LastUsed_Btn_Lvel){ // START_IF_LUBL
var level_value01 = eval("qWin.LastM"+objLevel);//holds the id of the last used button at this level that is still open or zero if it has been closed already at some point
//alert(level_value01);
var level_value02 = (subMB_select)? eval("qWin.LastM"+(objLevel+1)): 0; //// this test if the next level up has a last used button id still open or zero if it has been closed already at some point
var test_level = (objID == level_value01); // if this is true then it is over the same elm
//(objType!=9)? alert(objID +"|"+ LastUsed_RootBtn_Id +"|"+ objType +"|"+ LastUsed_Btn_Lvel +"|"+ eval("qWin.LastM"+LastUsed_Btn_Lvel)): null;
// if this is not a btn in a scroll menu box and it's Id does not match the LastUsed_Btn_Id, basically it's for moving from a btn in scroll menu box to a different btn in a scroll menubox or other buttons not in a scroll menu box
// it works by turning off any timeouts that it needs to, and closes any menuboxs that need to be close too
if(objID != LastUsed_Btn_Id && LastUsed_MenuBoxes_IsAnyOpen >0){
MenuEventTestLUBL("MouseOver1",LastUsed_Btn_Lvel+objLevel);//4Testing
(qWin.EE)?clearTimeout(qWin.EE):null;// this clears the setTimeout of the botton mouseout
(qWin.E)?clearTimeout(qWin.E):null; // this clears the setTimeout of the menubox mouseout
(qWin.E)?qWin.E = null:null; // some browsers need to clear this out so it can be used again as a empty variable with a null value
var setLevelToThis = (objType!=9)? LastUsed_RootBtn_Lvel : objLevel;
(LastUsed_Btn_Lvel >= objLevel  || objType!=9 )? qssMenuOut_timeout('qSSmouseover1',setLevelToThis,0): null; // this function is shared by others functions
}
else if(objID == LastUsed_Btn_Id && LastUsed_Btn_Lvel > objLevel){ // this is for menus in the same level going back to lower levels
MenuEventTestLUBL("MouseOver2",LastUsed_Btn_Lvel);//4Testing
(qWin.EE)?clearTimeout(qWin.EE):null; // this clear may need a (qWin.EE)? and nulling set to it
(qWin.E)? clearTimeout(qWin.E):null;// this is set to the menu out
(qWin.E)? qWin.E = null:null;// this is set to the menubox out
(level_value02)? qssMenuOut_timeout('qSSmouseover2',objLevel,0): null; // this function is shared by others functions
}
// I believe this can be killed soon
else if( LastUsed_Btn_Lvel <= objLevel + 1 && LastUsed_MenuBoxes_IsAnyOpen >0){ // this is for menus in the same level but going back to the higher levels //a test_level && might be needed for the bar level
//else if(objID == LastUsed_Btn_Id){ // this is for menus in the same level but going back to the higher levels //a test_level && might be needed for the bar level
MenuEventTestLUBL("mouseOver3",LastUsed_Btn_Lvel);//4Testing
(qWin.EE)?clearTimeout(qWin.EE):null;// this is set to the menu out
(qWin.E)? clearTimeout(qWin.E):null;// this is set to the menu out // this line is for the menuboxe levels and up
(qWin.E)? qWin.E = null:null;// this is set to the menu out // this line is for the menuboxe levels and up
}
else{//NOTNEEDED only here 4 testing can be removed on final build
MenuEventTestLUBL("mouseOver4",LastUsed_Btn_Lvel);//4Testing
}
} // END_IF_LUBL
else{//NOTNEEDED only here 4 testing can be removed on final build
MenuEventTestLUBL("mouseOver5",LastUsed_Btn_Lvel);//4Testing
}

var is_Hover_off = objX.className.indexOf("ceh")<0; // this checks if the mouse is already over the element
//alert(is_Hover_off);
(is_Hover_off)? qssMenuItem_changeClass(objID,objLevel,objClass+"h"): null; // if mouse is not already over the element it runs this function. "h" stands for hover
//alert(subMB_select_Type);
//(subMB_select_Type==9)? alert(subMB_select.style.display): null;
var subMB_select_Isclosed = (subMB_select_Type==9)? subMB_select.style.display=="none" : 0;// this checks to see if the element's sub menubox is closed or open // 
//alert(subMB_select_Isclosed);
if(subMB_select_Isclosed){// if there is a element sub menubox, this checks to see if it needs to be open 

//alert("objLevel:" +objLevel +" | "+ "subMB_Array_level:"+ subMB_Array_level );
var isSdeMnuItm = objType==8; // test if this is a side menu Item in a vertical menuBox
var isDrpMnuItm = objType == 9; // this test if this is a menu Item in a pop out scrolling dropMenuBox
var is_RootBtn_aSide = Crnt_RtBtn_Type==8; // this test if the RootBtn is a side button in a vertical menu box.
var isDrpOrSdeMnuItm = isDrpMnuItm || isSdeMnuItm;
//alert("objType"+objType+"|"+"isSdeMnuItm"+isSdeMnuItm+"|"+"isDrpMnuItm"+isDrpMnuItm+"|"+"is_RootBtn_aSide"+is_RootBtn_aSide);
//alert(subMB_select_qNum+"bodymen"+objLevel);
eval("qWin.LastM"+objLevel+"='"+ objID+"'"); // it set's it to the elm id // this line can go at the beggining of this if()


//#### Size Up the MenuBox that needs opening in a hidden box and get all the sizes 
///alert(subMB_select_qNum+"bodymen"+(objLevel+1));
var subMB_outer = qGBID(subMB_select_qNum+"bodymen"+(objLevel+1));
var subMB_btnT = subMB_outer.firstChild; // first or top scroll button
var subMB_btnB = subMB_outer.childNodes[1];//last or bottom scroll button // this will need to change to next sibling if it works in all browsers
subMB_btnT.style.display = "none"; //this hides the top scroll button
subMB_btnB.style.display = "none"; //this hides the bottom scroll button
subMB_select.scrollTop = "0px"; // this resets any scrolling that may have been done prior



var getPos = qssGetPosAll(evt, objX,"objX"); // this function produces and sets the positioning cords var for the elm
var elm_Width = objX.offsetWidth;
var elm_Height = objX.offsetHeight;
var elm_Lef = getPos.elm_doc_x;
var elm_Top = getPos.elm_doc_y;
var elm_Rht =  elm_Lef +  elm_Width;
var elm_Bot =  elm_Top +  elm_Height;
//var elmWinTop = getPos.elm_win_y;
// this needs to put the -3 MnuBoxOverlap on each one it's now just for testing
var avalSpaceLt = getPos.elm_win_x; // elm left edge to window's left edge
var avalSpaceTp = getPos.elm_win_y; // elm top edge to window's top edge
var avalSpaceRt = getPos.win_w - (getPos.elm_win_x + elm_Width); // elm right edge to window's right edge
var avalSpaceBt =  getPos.win_h - (getPos.elm_win_y + elm_Height); // elm bottom edge to window's bottom edge
var avalSpaceLtToWinRh = avalSpaceRt + elm_Width; // elm left edge to window's right edge
var avalSpaceRhToWinLh = avalSpaceLt + elm_Width; // elm right edge to window's left edge
var avalSpaceTpToWinBt = getPos.win_h - getPos.elm_win_y;

var folMB_outer_Top = 0;//this gets the top of the currently first opened level(fol) subMB(MB)

if(isDrpMnuItm){// basically menuItems in a drop menu uses the width of the dropmenuBox
// NOTE^^^^ it could just get the outer left position here and make the changes below with that info
// and it would not need to get qssGetPosAll again
//NOTE ########## I don't think putting it to the elmBox edge is needed anymore. It's going to put it to the menu Items edge.
var elmMB_outer = qGBID(subMB_select_qNum+"bodymen"+objLevel); // this get the current elmMB containing the button or the button it was fired on 
getPos = qssGetPosAll(evt,elmMB_outer,"MBX"); // this function produces and sets the positioning cords var for the elm
elm_Width = elmMB_outer.offsetWidth;
//var elmMB_outer_Height = elmMB_outer.offsetHeight ;
elm_Lef = getPos.elm_doc_x;
//var elmMB_outer_Top = getPos.elm_doc_y;
elm_Rht =  elm_Lef +  elm_Width;
//var elmMB_outer_Bot =  elmMB_outer_Top +  elmMB_outer_Height;
avalSpaceLt = getPos.elm_win_x; // elm left edge to window's left edge
//var avalSpaceTp = getPos.elm_win_y; // elm top edge to window's top edge
avalSpaceRt = getPos.win_w - (getPos.elm_win_x + elm_Width); // elm right edge to window's right edge
//var avalSpaceBt =  getPos.win_h - (getPos.elm_win_y + elm_Height); // elm bottom edge to window's bottom edge
/////avalSpaceLtToWinRh = avalSpaceRt + elm_Width; // elm left edge to window's right edge // not used
//////avalSpaceRhToWinLh = avalSpaceLt + elm_Width; // elm right edge to window's left edge // nit used

(Crnt_RtBtn_Type != isSdeMnuItm)? folMB_outer_Top = parseInt(qGBID(subMB_select_qNum+"bodymen"+(Crnt_RtBtn_Lvel+1)).style.top) : null; // this gets the top of the currently first opened level MB(subMB)// this might be needed Crnt_RtBtn_Lvel+1<objLevel

}


// size the menu box scroll buttons and the menuBox with the scroll buttons displaying
subMB_btnT.style.display = ""; 
subMB_btnB.style.display = ""; 
subMB_outer.style.display = ""; // this shows the menuBox with the menuItems in them so it messure them
var subMB_btnT_Height = subMB_btnT.offsetHeight;
var subMB_btnT_Width = subMB_btnT.offsetWidth;
var subMB_btnB_Height = subMB_btnB.offsetHeight;
var subMB_btnB_Width = subMB_btnB.offsetWidth;
var subMB_select_with_only_scroll_btns_Height = subMB_outer.offsetHeight;
var subMB_select_with_only_scroll_btns_Width = subMB_outer.offsetWidth;
subMB_outer.style.display = "none"; // this shows the menuBox with the menuItems in them so it messure them
subMB_btnT.style.display = "none"; 
subMB_btnB.style.display = "none"; 

// size the menu box
subMB_select.style.display = ""; // this shows the menuItems so the menuBox can be messured with them
subMB_outer.style.display = ""; // this shows the menuBox with the menuItems in them so it messure them
var subMB_outer_Height = subMB_outer.offsetHeight; 
var subMB_outer_Width = subMB_outer.offsetWidth;
var subMB_select_Height = subMB_select.offsetHeight;
var subMB_select_Width = subMB_select.offsetWidth;
subMB_outer.style.display="none"; //this hides the subMB in a hidden area // NS needs it to apply the size info this way, so it does not eat up time doing it

var MnuBoxOverlap = 0; //NEEDSWORK the menu box overlap by the padding and border 

// the following is for placing the left and top position of subMB
// these following vars will help in positioning the element by testing the space available
var ifWidthFitsInWin = getPos.win_w >= subMB_outer_Width;
// this test if a space is available RT of the current menubox or opening horizontal element
var test_RT_of_elm=ifWidthFitsInWin&&((isDrpOrSdeMnuItm)?avalSpaceRt:avalSpaceLtToWinRh)>=subMB_outer_Width;
// this test if a space is available LF of the current menubox or opening horizontal element
var test_LF_of_elm=ifWidthFitsInWin&&((isDrpOrSdeMnuItm)?avalSpaceLt:avalSpaceRhToWinLh)>=subMB_outer_Width;
// this test if element is partly right of the current window's right edge
var test_if_RT_of_win_edge = (getPos.elm_win_x + elm_Width) > getPos.win_w;
// this test if element is partly left of the current window's left edge
var test_if_LF_of_win_edge = getPos.doc_win_x  > getPos.elm_doc_x;
// this test if a space is available left of the mouse position 
var test_RT_of_mouse = getPos.win_w - (getPos.mouse_win_x + 3)  > subMB_outer_Width;
// this test if a space is available right of the mouse position 
var test_LF_of_mouse =  (getPos.mouse_win_x - 3) > subMB_outer_Width;

// the following is for placing the left position of subMB
var setLT_to = 0;
if(!isDrpOrSdeMnuItm){//ifAA1
if(test_RT_of_elm){// places it to the right
setLT_to=(test_if_LF_of_win_edge)? getPos.doc_win_x : elm_Lef;
//alert("M1:"+setLT_to);
}
else if(test_LF_of_elm){// places it to the left
setLT_to=(test_if_RT_of_win_edge)?  (getPos.doc_win_x + getPos.win_w) - subMB_outer_Width : elm_Rht - subMB_outer_Width;
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
setLT_to=  (getPos.doc_win_x + getPos.win_w) - (subMB_outer_Width-MnuBoxOverlap);
//setLT_to= getPos.mouse_win_x;
//alert("DS3:"+setLT_to);
}
else if(test_LF_of_mouse){//left of the mouse position  //NEEDSWORK
setLT_to = getPos.doc_win_x;
//alert("DS4:"+setLT_to);
}
}//ifAA2

//alert(setLT_to);
/* ##### killed on build c0035 I'll try it, and see if it works without it 4 awhile
// NOTE although it's being killed I'll keep it here 4 a bunch more builds until I'm cerntain it is not needed
// I don't think this "if" is needed anymore because sizing up above is sort of handling it maybe testing is needed
// this is needed if menubox is wider than the window so it can recalculate the scroll bars in for correct height
if((setLT_to + subMB_outer_Width) - getPos.doc_win_x > getPos.win_w){
subMB_outer.style.display="block";
qssGetPosAll(evt, elmMB_outer,"itnum3"); // this function produces and sets the positioning cords var for the elm
subMB_outer.style.display="none";
}
*/

// The following is for testing for heights possibilities
// this get the height for the space available next to menuItem, below the root menuItem or below the menuItem
var first_elm_Height_space = (is_RootBtn_aSide)? getPos.win_h: (isDrpMnuItm)? getPos.win_h - (folMB_outer_Top - getPos.doc_win_y) : avalSpaceBt; 
//alert(first_elm_Height_space);
// this test if there is space underneath the bar or tab for the subMB
var first_elm_Height_test = subMB_outer_Height > first_elm_Height_space; 
// this test if the menubox is higher then the menu position 
var second_elm_Height_test = (isDrpOrSdeMnuItm)? subMB_outer_Height >  avalSpaceTpToWinBt : 0;
// this figure out the height for the outer box 
var first_set_height_too = (first_elm_Height_test)? first_elm_Height_space : subMB_outer_Height; 
var setTP_to= 0;
//alert("first_elm_Height_test:"+first_elm_Height_test);
if(first_elm_Height_test){ // the following makes a scroll box if needed
setTP_to= (is_RootBtn_aSide)? getPos.doc_win_y : (isDrpMnuItm)? folMB_outer_Top : elm_Bot;
//setTP_to= (is_RootBtn_aSide)? elm_Top : (isDrpMnuItm)? folMB_outer_Top : elm_Bot;
subMB_outer.openboxid =subMB_select.id;
subMB_btnB.style.display = ""; // this displays the button so it can be seen for scrolling
}
else if(second_elm_Height_test){ // the following slides the subMB up to fit
var setTP_to = elm_Top - (subMB_outer_Height - avalSpaceTpToWinBt);
}
else { // this places the subMB by lining up to the menus side or below the bar
var setTP_to= (isDrpOrSdeMnuItm)? elm_Top : elm_Bot;
}

// needs work heights don't add up the same with each browser may need to put the styles in a div between outer and holder
//NOTE : subMB_select is the only one which needs to be sized, or it can just use bottom 0px if the menu btns R used
//##### NOTE this will probally need work, the following line probally will not work.. 
subMB_select.style.height = (first_set_height_too - (subMB_outer_Height - subMB_select_Height)) + "px";

// the following sets the top and left position for the subMB
subMB_outer.style.left = setLT_to+"px";
subMB_outer.style.top = setTP_to+"px";
LastUsed_MenuBoxes_IsAnyOpen = objLevel;
} // this is the end of if(subMB_select_Isclosed){
else{
 null;
//alert(subMB_select_Isclosed);
}
(subMB_select_Isclosed && subMB_select_Type==9)? subMB_outer.style.display="": null;
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


function qssMenuItem_mouseout(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
if (subMB_select && LastUsed_MenuBoxes_IsAnyOpen > 0){ // this is for leaving a button with a menuBox opened
//alert("it needs to close fired");
MenuEventTestLUBL("MouseOut1",LastUsed_Btn_Lvel);//4Testing
eval("qWin.EE = setTimeout(\"qssMenuOut_timeout('qSSmouseout',"+objLevel+",0);\","+ mouseoutTimeOutValue + ")");
}
/////else(objLevel >= LastUsed_RootBtn_Lvel){ // currently menus and bars and tabs
//else(objLevel >= LastUsed_RootBtn_Lvel && LastUsed_MenuBoxes_IsAnyOpen > 0){ // currently menus and bars
else{ // currently menus and bars // currently any button with out a menuBox opened // this could be optimized once it proves a statement is not needed here
MenuEventTestLUBL("MouseOut2",LastUsed_Btn_Lvel);//4Testing
// eval("qWin.EE = setTimeout(\"qssMenuItem_changeClass("+objID+","+0+");\","+ 100 + ")");
(objType != 9)? eval("qWin.LastM"+objLevel+"="+0): null;
qssMenuItem_changeClass(objID,objLevel,0);
}
}

function qssMenuItem_mouseup(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
qssMenuItem_changeClass(objID,objLevel,0);
//clearTimeout(qWin.EE); // this may be needed for menus because NS MAC has a problem with holding foucus a clear foucus could be used but 
//clearTimeout(qWin.E); // it seems to work ok with it like this because it just holds the menu open until the mouse is moved
//qWin.E = null;
}

function qssMenuItem_mousedown(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
qssMenuItem_changeClass(objID,objLevel,objClass+"a"); // "a" stands for active
}

function qssMenuItem_click(evt,objX,objClass,objID,objLevel,objQumber,objType,subMB_select,subMB_select_qNum,subMB_select_Type){
// hpTy = functionType
qssMenuItem_changeClass(objID,objLevel,0);
(qWin.EE)? clearTimeout(qWin.EE): null;
(qWin.E)? clearTimeout(qWin.E): null;
(qWin.E)? qWin.E = null: null;
var setLevelToThis = (objType!=9)? LastUsed_RootBtn_Lvel : objLevel;
qssMenuOut_timeout('qSSclick',setLevelToThis,0);

//NOTE nothing belows this is really not being used since I'm putting href's on the link themselves
var findithere = findframeobject("stacksiteiframe");// not used anymore
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
//alert(objID.substring(objID.indexOf("m")));
//alert(objID +"|"+ findithere.getElementById("q1"+objID.substring(objID.indexOf("m"))).href); // 
}

function qssMenuItem_changeClass(objID,elm_level,change){ // this needs more optimizing
var objX = qGBID(objID); // get the elment button were working with
///var objNumber = parseInt(objID.substring(1)); // The Object's Number, the number that follows the q . i.e. 5 or 9 or etc.
var objChangeX = objX; // this is the id of the first div or the td
//100014 var objChangeX = objX.parentNode.parentNode; // this id the first div or the td
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


function qssMenuOut_timeout(fromfunction,current_level,close_level){
// This function is shared and used by various menu functions. 
// It closes dropmenu boxes that need to be closed, and changes the menu item's class if needed.
//NOTE fromfunction is only used to let me know where it's going from. It should be moved to the end, and totally removed on the final build. 
var current_level_value = eval("qWin.LastM"+current_level);
var LastBar_Has_Sub = 1;
if (current_level_value ){  /////////// needs to be added// && current_level_value > LastUsed_RootBtn_Lvel
var levelSplit = current_level_value.split("i"); // This splits into a Q Number into an array. i.e. q1 , m0
var getLevelType = eval("qWin."+levelSplit[0]); // this get the current_level_value type  
// i.e. 5|8 is root buttons. 9 is a menubox button but these number may change over time
var levelType = (getLevelType == 5 || getLevelType == 8)? 1: 0; 
var objNumber = parseInt(current_level_value.substring(1)); // finds the obj number. this is the number that follows the q
LastBar_Has_Sub = (qGBID(current_level_value).qHasChild)? 0: 1; // this checks for subarray
//alert("LastBar_Has_Sub|||"+ LastBar_Has_Sub +" current_level_value:"+ current_level_value);
}
else null;
//if needed, close any open menu boxes and change the menuItems class
for(var c = (LastUsed_Btn_Lvel - LastBar_Has_Sub); c >= current_level - close_level;c--){
//alert(LastUsed_Btn_Lvel +"|"+LastBar_Has_Sub+"|"+c+"|"+current_level+"|"+close_level);
var check_level = eval("qWin.LastM"+c);
//alert(check_level);
(check_level)? qssMenuDrop_close(check_level,c,objNumber+levelType): null;
(check_level)? qssMenuItem_changeClass(check_level,c,0): null;
LastUsed_Btn_Lvel = c; // not sure about this here
}
}

function qssMenuDrop_close(menubox_id, menubox_level,objsNumber){
//Thsi could go into the  qssMenuOut_timeout function, just keeping it here if I add some effects to it. But I think effect should be done with css, which I can handle by changing the css, like pan out effects . If css does not have it I'll add it in this code.
// note LastUsed_MenuBoxes_qNum may need to be used when going to different jumps on menu boxes
// cseMB stands for "closemenubox" and cseMB_select is the openmenu
MenuEventTestLUBL("CloseMenBox1",LastUsed_Btn_Lvel);//4Testing
var cseMB_select = qGBID("q" + objsNumber + menubox_id.substring(menubox_id.lastIndexOf("i")) + "m"); 
//alert(cseMB_select.id);
//alert(menubox_id.substring(menubox_id.lastIndexOf("i")));
var cseMB_outer = qGBID("q"+objsNumber+"bodymen"+ (menubox_level + 1));

// this normally holds the id of a button for that level, but it now needs to be zeroed out to false
eval("qWin.LastM"+menubox_level+"="+0);

// the follow removes any setting that were set to these elements and also hides this menubox
cseMB_outer.setAttribute("style","display:none");
cseMB_select.setAttribute("style","display:none");

//alert("LastUsed_MenuBoxes_IsAnyOpen | "+LastUsed_MenuBoxes_IsAnyOpen+ "|menubox_level:"+menubox_level+"|LastUsed_RootBtn_Lvel:"+LastUsed_RootBtn_Lvel+"|"+ (menubox_level == LastUsed_RootBtn_Lvel));
LastUsed_MenuBoxes_IsAnyOpen = (menubox_level == LastUsed_RootBtn_Lvel)? 0: menubox_level;
//alert(LastUsed_MenuBoxes_IsAnyOpen);
}

function qssMenuDrop_mouseout(){
MenuEventTestLUBL("qssMenuDrop_mouseout1",LastUsed_Btn_Lvel);//4Testing
eval("qWin.E = setTimeout(\"qssMenuOut_timeout('qssMenuDrop_mouseout',"+LastUsed_RootBtn_Lvel+",1);\","+ mouseoutTimeOutValue + ")");
}

function qssMenuDrop_mouseover(elm){
//qDoc.scroller = "off";
var MenuBox = this;
var MenuBox_id = MenuBox.id;
var MenuBox_Array_Length = parseInt(MenuBox_id.substring(MenuBox_id.lastIndexOf("n")+1));
var LastMen = LastUsed_Btn_Lvel; // this was LastBarObject
//alert(MenuBox_Array_Length);
//qWin.status = MenuBox_Array_Length;
//qWin.status=(qWin.status + LastMen);

if(MenuBox_Array_Length == LastUsed_Btn_Lvel){
MenuEventTestLUBL("qssMenuDrop_mouseover1",LastUsed_Btn_Lvel);//4Testing
(qWin.E)? clearTimeout(qWin.E): null;
(qWin.E)? qWin.E = null: null;
LastUsed_Btn_Lvel = MenuBox_Array_Length;
}
else if(MenuBox_Array_Length > LastUsed_Btn_Lvel){
MenuEventTestLUBL("qssMenuDrop_mouseover2",LastUsed_Btn_Lvel);//4Testing
(qWin.E)? clearTimeout(qWin.E): null;
(qWin.E)? qWin.E = null: null;
clearTimeout(qWin.EE);
LastUsed_Btn_Lvel = MenuBox_Array_Length;
}
else if(MenuBox_Array_Length < LastUsed_Btn_Lvel){
MenuEventTestLUBL("qssMenuDrop_mouseover3",LastUsed_Btn_Lvel);//4Testing
(qWin.E)? clearTimeout(qWin.E): null;
(qWin.E)? qWin.E = null: null;
clearTimeout(qWin.EE);
}
else{//NOTNEEDED here 4 testing only can be removed on final build
MenuEventTestLUBL("qssMenuDrop_mouseover4",LastUsed_Btn_Lvel);//4Testing
}
}


function qssMenuDropScroll_it(Scroll_Direction,Scroll_Active,Scroll_qnumber){
//scoMB stands for "scrollmenubox"
var scoMB_outer = qGBID(Scroll_qnumber+"bodymen" + Scroll_Active);
var scoMB_btnT = scoMB_outer.firstChild;
var scoMB_btnB = scoMB_btnT.nextSibling;
var scoMB_select = qGBID(scoMB_outer.openboxid);

var scoMB_select_OffsetHeight = parseInt(scoMB_select.offsetHeight);
var scoMB_select_ScrollHeight = parseInt(scoMB_select.scrollHeight);
var scoMB_select_ScrollTop = parseInt(scoMB_select.scrollTop);
var scoMB_btnT_Height = parseInt(scoMB_btnT.offsetHeight) || 0;
var scoMB_btnB_Height = parseInt(scoMB_btnB.offsetHeight)  || 0;
var scrollBtnMouseOffsetBoxTop = parseInt(qssMenuDropScroll_it.scrollBtnMouseOffsetBoxTop) || 0;

//alert(scoMB_select_ScrollHeight > (scoMB_select_ScrollTop + scoMB_select_OffsetHeight));
var scroll_it=(Scroll_Direction=="Bot")? scoMB_select_ScrollHeight > (scoMB_select_ScrollTop + scoMB_select_OffsetHeight) : scoMB_select_ScrollTop>0;
if(scroll_it){
var cleanspeed = (Scroll_Direction=="Bot")? scrollBtnMouseOffsetBoxTop : scoMB_btnT_Height - scrollBtnMouseOffsetBoxTop || 0;
var Set_Speed = (cleanspeed< scoMB_btnB_Height/2)? 1:2;
var speed = (cleanspeed*Set_Speed) + 1;
//alert("cleanspeed:"+cleanspeed +" scoMB_btnB_Height:"+scoMB_btnB_Height);
}
else{
var speed = 0;
}

var scroll_it_again = (Scroll_Direction=="Bot")?scoMB_select_ScrollHeight > (scoMB_select_ScrollTop + scoMB_select_OffsetHeight+speed) : (scoMB_select_ScrollTop - speed) > 0;

if(scroll_it){
scoMB_select.scrollTop = (Scroll_Direction=="Bot")? (scoMB_select_ScrollTop+speed < scoMB_select_ScrollHeight)? scoMB_select_ScrollTop+speed : scoMB_select_ScrollHeight :  scoMB_select_ScrollTop - speed || 0;
}
else alert("ohNoError"); // this needs to be change back to null; It's here for testing. NS bombs when a alert box is call during scrolling

if (scoMB_btnT.style.display == "none" && Scroll_Direction=="Bot" ){
scoMB_btnT.style.display = "";
}
if(scoMB_btnB.style.display == "none" && Scroll_Direction=="Top" ){
scoMB_btnB.style.display = "";
}

if(!scroll_it_again && Scroll_Direction=="Bot"){
scoMB_btnB.style.display = "none";
qDoc.scroller = 0;
}
if (!scroll_it_again && Scroll_Direction=="Top"){
scoMB_btnT.style.display = "none";
qDoc.scroller = 0;
}

if(scroll_it_again){
eval("qWin.timerID = setTimeout(\"qssMenuDropScroll_it('"+Scroll_Direction+"',"+Scroll_Active+",'"+Scroll_qnumber+"');\",250)");
}

}

function qssMenuDropScroll_mousemove(elm){
var evt = elm || top.event; // qWin.event; this may be needed for windows ie and other browser and added of course to the mix
// FireFox 3.6- does not support offsetX and offsetY and if any other browser does not support it, it will set to a defualt value of 5
qssMenuDropScroll_it.scrollBtnMouseOffsetBoxLeft = (evt.offsetX)? evt.offsetX : 5;
qssMenuDropScroll_it.scrollBtnMouseOffsetBoxTop = (evt.offsetY)? evt.offsetY : 5;
///alert(qssMenuDropScroll_it.scrollBtnMouseOffsetBoxTop);
}

function qssMenuDropScroll_mouseout(){
// qWin.status = this.id + " | " + qDoc.scroller ;
qDoc.scroller = 0;
(qWin.timerID)? clearTimeout(timerID) : null; // mac ie needs to check for timerid sometimes and maybe some others browser too when menu has a tiny more scrolling to go
qWin.timerID = null;
}

function qssMenuDropScroll_mouseover(){
var btn_id = this.id;
if(btn_id != qDoc.scroller){
//qWin.status = this.id + " | " + qDoc.scroller ;

//qWin.timerID = null;
qDoc.scroller = btn_id;
var Scroll_qnumber = btn_id.substring(0,btn_id.lastIndexOf("s")); // This is the Object's Q Number, the component's share number used by it's objects. i.e. q1q1q1q1
//alert(Scroll_qnumber +"|"+qDoc.scroller);

//qDoc.scroller = "on";
Scroll_Active = this.info;
Scroll_Direction = (this.previousSibling)? "Bot" : "Top";
qssMenuDropScroll_it(Scroll_Direction,Scroll_Active,Scroll_qnumber); // this starts the scrolling action
}
else{
null;
// qWin.status = this.id + " | " + qDoc.scroller ;
}
}


function MenuEventTestLUBL(functionnNamLevNum, LastUsedLevInfo){
if(1==2){// turned off only on when testing
// this is for testing only and can be removed from production
// also the functions calls should be removed too.
//TESTING eventbox holds events fired. Remove on final products
var eventbox = (qGBID("eventbox") != null)? qGBID("eventbox") : false;
(eventbox)?eventbox.innerHTML = eventbox.innerHTML + functionnNamLevNum +":"+LastUsedLevInfo+" || ":alert("eventBoxMissing");
//eventTestValue = eventbox.innerHTML + "qssMenuDrop_mouseout1:"+LastUsed_Btn_Lvel+" || ";
//eventbox.innerHTML = eventTestValue;
}
}

function testcode(string){
//alert("kljhgg");
var qBodyElm = qGBID('qBody');
var div = document.createElement("DIV");
//addHrSeperator();
/////////qBodyElm.appendChild(txNode("Arrays ||"+qSetDiv.innerHTML));
//addHrSeperator();
//addHrSeperator();
div.appendChild(addHrSeperator());
div.appendChild(txNode("HeadSSSS ||"+ qHead.innerHTML));
div.appendChild(addHrSeperator());
div.appendChild(txNode("BodyXX ||"+ qDocBody.innerHTML));
qBodyElm.appendChild(div);
//qBodyElm.appendChild(txNode("HeadSSSS ||"+ qHead.innerHTML));
//qBodyElm.appendChild(txNode("BodyXX ||"+ qDocBody.innerHTML));
//alert(qDocBody);
//addHrSeperator();
//qBodyElm.appendChild(txNode("Menus ||"+ qGBID('qbodymen').innerHTML));
//addHrSeperator();
//qBodyElm.appendChild(txNode("qBody ||"+ qGBID('qBody').innerHTML));
//alert("helloTesting22222");

function txNode(Txt){// only used for testing
//alert(Txt);
return qDoc.createTextNode(Txt);
}

function addHrSeperator(){
var h1 = qDoc.createElement('hr'); 
return h1;
///////qGBID('qBody').appendChild(h1);
}
}

function showBrowserVer(){
// when using multi-browser this will put the browser version on the web page's title
if (qDoc.all || is_sa){//if1
var detect = qUserAgent.toLowerCase();
var browser = "";
var thestring = "";
var version = 0;

if (checkIt('msie') || is_sa) {//2
browser = "IE ";
browser += detect.substr(place + thestring.length,3);
qDoc.title = (is_sa)? qDoc.title + " Safari": browser + " - " + qDoc.title;
//alert(qDoc.title);
}//if2
}//if1

function checkIt(string){
place = detect.indexOf(string) + 1;
thestring = string;
return place;
}
}

function testBtn(){
}

//(window.isDomLoaded)? alert(window.isDomLoaded) : null;
qssBuildLayout();
//(window.isDomLoaded)? qssBuildLayout() : window.isScriptsLoaded = true;
//c0006 qssBuildLayout(); // may need qWin.buildTime = setTimeout(buildTime(),qDoc.buildTimeSeconds);
//qssBuildLayoutPart1();
//qssBuildLayoutPart2();


// OLD Code and other code not being used
//-- never really worked // add events is one more thing to do and maybe use it for other things
//NEEDED add a onresize to trigger the page resize
//if(typeof qWin.addEventListener != 'undefined'){ //.. gecko, safari, konqueror and standard
//qWin.addEventListener('load', buildCSS, false);
///////////setTimeout("qWin.addEventListener('load', buildCSS, false)",4000);
//}
//else if(typeof qDoc.addEventListener != 'undefined'){ //.. opera 7
//qDoc.addEventListener('load', buildCSS, false);
//}
//else if(typeof qWin.attachEvent != 'undefined'){//.. win/ie
//qWin.attachEvent('onload', buildCSS);
//}
/*
function setStyle( object, styleText ) { if( object.style.setAttribute ) { object.style.setAttribute("cssText", styleText ); } else { object.setAttribute("style", styleText ); } }
*/

/*
function addEvent(obj, evType, fn){ 
 if (obj.addEventListener){ 
   obj.addEventListener(evType, fn, false); 
   return true; 
 } else if (obj.attachEvent){ 
   var r = obj.attachEvent("on"+evType, fn); 
   return r; 
 } else { 
   return false; 
 } 
}

addEvent(window, 'load', extractBlockquoteCitations);
*/

/*00NOTE
to add a function to the onload
var old_window_onload = (window.onload) ? window.onload :  function(){};
window.onload = function(){old_window_onload();qssResizeLayoutOnChange("firstTime");}
*/