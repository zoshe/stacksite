//alert("c.js");
//NOTEs
// CHANGES
// objIdArray[4] was changed to objIdArray[5] for snipits
// objIdArray[4] is now for it's selector_name
//Testing
var qBodyIsOn = true;
var qReSizeOn = false;
var qTestOn = false;
//preLoad Varibles
var qDocBody =	qDoc.getElementsByTagName('BODY')[0];
//100013 var qDocBodyClassName = "";// hold the body classname until it can be appended to the body tag

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
//qDropMnuDiv.setAttribute("zs");
qDropMnuDiv.style.display = "block"; // *******Note this should be set to display none or reset to block after build
qDropMnuDiv.id = "qbodymen"; // not being used just here to to help coding, and may have a use some day
//qdiv.style.zIndex="5000"; // this may need tobe added 5000 

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
//alert("setSnipit"+Z);
var qSetArrayLength = qSetArray.length;
qSetArray[qSetArrayLength] = []; 
//NeedsWORK needs to test if it has two periods and foward (../) in 
// this may only be need if the snipit gets it's image from the same folder that's holding the snipit
var re = new RegExp("src"+ "[\\W]*", "ig"); //  this is it literially  /.tabs[\W]+\{[^}]+\}/i
X.replace(re, "src=\""+sitePath);
re = new RegExp("href"+ "[\\W]*", "ig"); //  this is it literially  /.tabs[\W]+\{[^}]+\}/i
qSetArray[qSetArrayLength].unshift(X.replace(re, "href=\""+sitePath));
//alert(qSetArray[qSetArrayLength]);
//qSetArray.setAttribute("qZNT"+arrayNum, arrayType);
qSetDiv.setAttribute("qN"+Z, qSetArrayLength);
return X;
}


function qssSetLayout(layoutObjs){
//alert(layoutObjs);
//(1)q1=on/off(2)q1=type(3)q1=objSubType(4)q0=snipitName(5)q1=borderType(6)q0=borderImageName(7)q11111111=borderImageSwitches(8)q1=isItaCenterForHeightorWidth (9)q1=centerMenuObj(10)q1=use menuArray 1 (11)1=start from menuArrayLevel at 1

//alert(qSnpVar);
//qLayouts.appendChild(qGBID("content1"));
//alert(qLayouts.innerHTML);
/*0073
// create a hidden element  on top of the document to place a elm to test it size every 2 seconds
var qdiv0 = qDoc.createElement('div'); 
qdiv0.id = "qsizeBox";
qdiv0.style.position="absolute";
qdiv0.style.top="-9999px";
// maybe it can be put into qbodymen div and meassured there. This will also make less code because it will not need top
qdiv0.style.width = "10%"; // 100% seems to mess up ie. It add extra width space when appling left margin to the body table
qdiv0.style.fontSize="100%";
qdiv0.innerHTML="X<br />X";
(qDocBody.firstChild)? qDocBody.insertBefore(qdiv0,qDocBody.firstChild) : qGBID("qBody").appendChild(qdiv0);
*/

// create a hidden element  on top of the document to place the pull down menus in
// I'm thinking this could go, by placing the menus in the doc by themselves
/*0073
var qdiv = qDoc.createElement('div');
qdiv.style.display = "block"; // *******Note this should be set to display none or reset to block after build
qdiv.id = "qbodymen"; // not being used just here to to help coding, and may have a use some day
(qDocBody.firstChild)? qDocBody.insertBefore(qdiv,qDocBody.firstChild) : qGBID("qBody").appendChild(qdiv);
//qdiv.style.position = "absolute";
//qdiv.style.zIndex="5000"; // this may need to add 5000 
*/
//alert(layoutObjs);
//var d = qDoc.createElement("DIV");
qLayoutArray.innerHTML = layoutObjs;
//qLayoutArray.appendChild(d);

// Build the Template Objects
// function varibles Needed
//0062 var curNavLevId = 0; // keeps count of the current Nav level ID
var curNavLevObj = 0; // current Nav level Object
var curParentQNum = 0; // current parent qNum
var template = qLayoutArray; // contains the menu arrays of div's and their a elements
//alert(qLayoutArray.innerHTML);
//0073var template = qtdnStackSiteC; // contains the menu arrays of div's and their a elements
var templateObjs = template.getElementsByTagName("B"); // gets the Template Objects
var templateObjLength = templateObjs.length;
//alert(templateObjLength);
template.childQty = 0;
////NOTE// template.childsWithMaxWdSet = 0;// MAYBE NEEDED
////NOTE///template.childsWithMaxHtSet = 0; // may not be needed because the body obj I believe should always be 1
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
var isLiquidWidth = (objIdArray[8] == "2")? 2 : false;
var isLiquidHeight = (objIdArray[9] == "2")? 2 : false;

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
//alert(qDocBody.innerHTML);
//alert(qLayoutDiv.outerHTML);
//alert(objX.getAttribute("errormsgs"));
//qDocBody.insertBefore(pElm,qDocBody.firstChild);
//(qDocBody.firstChild)? qDocBody.insertBefore(pElm,qDocBody.firstChild) : qDocBody.appendChild(pElm);
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
var checkTrQty = 3; // tr qty
var checkTdQty =1; // td qty
//0296 changed if(objX.hasChildNodes()){
if(objX.getElementsByTagName("b")[0]){
// it used to pass along parent align classname to child to set css text and vertical align . It allows Parent box objects to children content boxes. 
objX.alignClassName = "q"+ objX.qNum + "ctda"; 
//100012 qssBuildTable(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum, checkTrQty, checkTdQty,"notBeingUsed","notBeingUsed"); // make the table
}
// window.document.body.zs = objId;
//100013 qDocBodyClassName =  "q"+objX.qNum+"cz";
////////qDocBody.className =   "q"+objX.qNum+"cz"; //NOTE this will probally need tobe moved to onload
//alert(qDocBody.outerHTML);
}

else if(objType==4 || objType==20 || objType==50 || objType==60|| objType==7){
//4-Box, 7-Page, 20-menuBox, 50-crumbBox, 60-SnipitBox 
// alignClassName is used to pass along the parent align classname to child to set the css text and vertical align. Basically, it allows the Parent box objects to set the children content boxes css text and vertical align.
objX.alignClassName = "q"+objX.qNum + "ctda " + objParent.alignClassName;
//alert(objX.childQty+"|"+objParent.qNum +" | "+ objX.parentSubNum);
// **** (1)q1=on/off (2)q1=type (3)q1=objSubType (4)q0=snipitName (5)q1=borderType (6)q0=borderImageName (7)q11111111=borderImageSwitches *****
//alert(objIdArray[2]+ " | "+ objX.qNum +"|"+ 11+"|"+objX+"|"+0+"|"+objIdArray[5]+"|"+objIdArray[6]+"|"+objIdArray[7]);
 // if current div has child qty use it otherwise build it with 1 child
var checkChildQty = (objX.childQty)? objX.childQty : 1;
 // checks if the obj is set vertically or hort and set the tr qty.
 // For pages and Boxes: 0=hort(w/rows) and 1-up=vert(w/columns)
 // For menu ?
var checkTrQty = (objSubType==0)? checkChildQty : 1;
 // checks if the obj is set vertically or hort and set the td qty.
 // For pages and Boxes: 0=hort(w/rows) and 1-up=vert(w/columns)
 // For menu ?
var checkTdQty = (objSubType!=0)? checkChildQty : 1;
//if(objType==20){
//checkTrQty = 3;
//}
//alert(objSubType +"|"+ checkTdQty);
//NOTE the qssBuildTableFills could return the div to place the qssBuildTable
//alert("1:"+objType+" objSubType:"+objSubType+" checkChildQty:"+checkChildQty);
qssBuildTableFills(objX.qNum, objType, objSubType, 4, objX, 0, objId, "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for main frame object
//00009 qssBuildTableFills(objX.qNum, objType, objSubType, 6, objX, 0, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for main frame object
//00001 qssBuildTableFills(objX.qNum, objType, objSubType, 14, objX, 0, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for main frame object
//alert("last:"+objType);
//alert("objX.qNum:"+objX.qNum +" objType:"+objType +" objSubType:"+objSubType +" objParent.qNum:"+objParent.qNum +" objX.parentSubNum:"+objX.parentSubNum+ " checkTrQty:"+checkTrQty +" checkTdQty:"+checkTdQty);
//100012  qssBuildTable(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum,checkTrQty, checkTdQty,"notBeingUsed","notBeingUsed"); // make the table
/*
// set the size
var placeItHereSubNum = (objType!=7)? objX.parentSubNum : objX.parentSubNum + 1;
var placeItHereObj =  qssGetElmInVar(qLayoutDiv,"q"+objParent.qNum+"t"+placeItHereSubNum,"TD");
//0073var placeItHereObj = qGBID("q"+objParent.qNum+"t"+placeItHereSubNum);
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
*/
// obj is empty then do this
 // just here for testing. a blank space needs to go here instead
var spaceName = (objType==4)? "Box": (objType==20)? "menuBox" : (objType==60)? "SnipitBox": (objType==7)?"Page":"CrumbBox";
var objDiv =  qssGetElmInVar(qLayoutDiv,"q"+objX.qNum+"Ld","div");
//var objTd =  qssGetElmInVar(placeItHereObj,"q"+objX.qNum+"t"+0,"TD");
//var objTd =  qssGetElmInVar(qLayoutDiv,"q"+objX.qNum+"t"+0,"TD");
//0073var objTd = qGBID("q"+objX.qNum+"t"+0);
//alert(objX.outerHTML);
//alert(objX.hasChildNodes());
if(!objX.getElementsByTagName("b")[0]){
//if(!objX.hasChildNodes()){
objDiv.innerHTML = spaceName;
// I DO NOT think this is needed anymore : objDiv.className = objX.alignClassName;
}
//alert(arrayLevelMenuIds +"****"+qGBID(arrayLevelMenuIds[0][1]).selectedmenu);
//alert(objIdArray[10] +"|||||"+objIdArray[11]);
}

else if(objType==61){ //SnipitItem
//NEEDED objTd.className = objX.alignClassName;
// a if objX.parentSubNum<1 then it could build a snipitBox with muiltible snipits and content
qssBuildTable(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum,1, 1,"notBeingUsed","notBeingUsed"); // make the table
//alert("q"+objX.qNum+"t"+objX.parentSubNum);
var placeItHereObj =  qssGetElmInVar(qLayoutDiv,"q"+objX.qNum+"t"+objX.parentSubNum,"TD");
//0073var placeItHereObj = qGBID("q"+objX.qNum+"t"+objX.parentSubNum);
///////var placeItHereObj = qGBID("q"+objParent.qNum+"t"+objX.parentSubNum);
placeItHereObj.className =  placeItHereObj.className +" "+ objParent.alignClassName;// it used to pass along parent align classname to child to set css text and vertical align . It allows Parent box objects to children  content boxes.
var snipitNum = qSetDiv.getAttribute("qN"+objIdArray[4]);
//alert("snipitNum: " + objIdArray[4]);
//alert(qSetDiv.outerHTML);
placeItHereObj.innerHTML = (parseInt(snipitNum)>-1)?qSetArray[snipitNum] :"Snipit-Item-Here";//table into it;s location
/////div0.id = "q" + objX.qNum + "i" + "0"; // the 0 may not be needed but maybe it's a good idea to be on the safeSide
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
//100013 qssBuildTable(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum,checkTrQty, checkTdQty,"notBeingUsed","notBeingUsed"); // make the table

qssBuildTableFills(objX.qNum, checkType, objSubType, 4, curNavLevObj, pullmenuIsneeded, objId, "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,selectIsNeeded); // make the buttons
//00009 qssBuildTableFills(objX.qNum, checkType, objSubType, 6, curNavLevObj, pullmenuIsneeded, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,selectIsNeeded); // make the buttons
//00001 qssBuildTableFills(objX.qNum, checkType, objSubType, 14, curNavLevObj, pullmenuIsneeded, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,selectIsNeeded); // make the buttons

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
//alert(objParent.parentNode.qNum +"|"+ curNavLevId +"|"+ selectIsNeeded +"|"+ objX.qNum);
// not sure it should get the num from parent or grand parent here
//NEEDSWORK objParent  would be better IO believe
//alert("objCssSelector:"+objCssSelector);
qssBuildDropMenuBoxes(objParent.parentNode.qNum,9,objSubType,curNavLevObj,selectIsNeeded,curParentCssSelector,curParentSubTypeAndSelector,objId);

// NOTE scroll Btn could make qWin.q  confussing if it ever needs to find this number,
//eval("qWin.q"+(objParent.qNum+1)+"="+9+";"); // this holds the type of object it is or off if not used
eval("qWin.q"+(objParent.parentNode.qNum+1)+"="+9+";"); // this holds the type of object it is or off if not used
}

else if(objType==55){ // breadCrumb Menus Items
//100014 var separatorChar = objIdArray[5]; //NOTE this will be replace with css content 
//100014 var genClassNam = "q"+objX.qNum + "cz";
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
// var placeItHereObj =  qssGetElmInVar(qLayoutDiv,"q"+objParent.qNum+"t"+objX.parentSubNum,"TD");
//0073 var placeItHereObj = qGBID("q"+objParent.qNum+"t"+objX.parentSubNum);

//build the before node
//100014 if(objIdArray[6]){
var beforeSpace = qDoc.createElement('span');
beforeSpace.setAttribute("zs",objId.replace("c.$","cb$"));

//100014 beforeSpace.className ="q"+objX.qNum+"cbz " + genClassNam;
// beforeSpace.style = 
//00002 var beforeSpaceText = qDoc.createTextNode(objIdArray[6]); // this extra space may need to go
//00002 beforeSpace.appendChild(beforeSpaceText);
placeItHere.appendChild(beforeSpace);
//alert(placeItHereObj.innerHTML);
//100014 }
//alert(placeItHere.outerHTML);

// build the crumbs
for(var ibc=0;ibc<mnuArrayLength;ibc++){
var selNavArrayElm = mnuArray[ibc];
//alert(selNavArrayElm.outerHTML);
if(selNavArrayElm.getAttribute("dcnu")){//ifdcnu
var dcNum = selNavArrayElm.getAttribute("dcnu").split("|");//  features
var textContent =  qDoc.createTextNode(dcNum[1]);
if(mnuArrayLength!=1 && ibc < mnuArrayLength-1){// crumbs
//alert(ibc +"|||"+mnuArrayLength +"||||"+ selNavArrayElm.getAttribute("dcnu") +"||||"+ selNavArrayElm.id);
var separator = qDoc.createElement('span');
//00002 var separatorText = qDoc.createTextNode(separatorChar);//don't no about the extra space
//00002 separator.appendChild(separatorText);
//  var newObjId = objId.replace("c.^","cs^"); // this might need to be cz
separator.setAttribute("zs",objId.replace("c.$","cs$"));

//100014 separator.className ="q"+objX.qNum+"csz " + genClassNam;
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
//100014 aElm.className ="q"+objX.qNum+"clz "+genClassNam;
aElm.appendChild(textContent);
placeItHere.appendChild(aElm);
}
//alert(placeItHere.innerHTML);
}//ifdcnu
// alert(mnuArrayLength);
}//endFor
//-- 
//var div0className = (cc == tdSelected && selectIsNeeded)? ("q"+objQumber+"cs "+"q"+objQumber+"c"): ("q"+objQumber+"c"); // the selected class most come first on selected objs
//--
}//end55


else if(objType==80){ // this builds a snipit Box  

qssBuildTableFills(objX.qNum, objType, objSubType, 4, objX, 0, objId, "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for the object
//00009 qssBuildTableFills(objX.qNum, objType, objSubType, 6, objX, 0, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for the object
//00001 qssBuildTableFills(objX.qNum, objType, objSubType, 11, objX, 0, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for the object

qssBuildTable(objX.qNum, objType, objSubType, objParent.qNum , objX.parentSubNum,1,1,"notBeingUsed","notBeingUsed"); // make a table for the object
var placeItHereObj = qGBID("q"+objX.qNum+"t"+0);
var snipitVar = (eval("qWin.qqSnpw"+objIdArray[4])=="t")? eval("qqSnp" + objIdArray[4]) : false;
var div0=qDoc.createElement('div');  	// - create a div element 
div0.id = "q" + objX.qNum + "i" + "0"; // the 0 may not be needed but maybe it's a good idea to be on the safeSide
//div0.getElementById(placeItHere).className = "";
div0.innerHTML = (snipitVar)?snipitVar.innerHTML:"SnipitHere";
//alert(div0.innerHTML);
placeItHereObj.appendChild(div0); // put the table into its location
//NOTE: Not sure if isLiquidWidth is correct here. Might be going on the wrong td.
// I believe two width need to be set. One on the outer TD and the other on the inner TD.
//--
// this does it without a div
//var snipitVar = (eval("qWin.qqSnpw"+objIdArray[4])=="t")? eval("qqSnp" + objIdArray[4]) : false;
//var snipitCode = (snipitVar)?snipitVar.innerHTML:"<div>SnipitHere</div>";
//placeItHereObj.
//qGBID("q"+objX.qNum+"i"+0).innerHTML = snipitCode;
//--
}

else if(objType==90){ //this builds a snipit object // content object needs to go here
alert("snipit90");
var placeItHere = "q"+objX.qNum+"i"+0;
var snipitName = objIdArray[4];
var snipitCode = (qGBID("qqSnp"+snipitName) != null)? qGBID("qqSnp"+snipitName) : qDoc.createElement('div');

qssBuildTableFills(objX.qNum, objType, objSubType, 4, objX, 0, objId, "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for the object
//00009 qssBuildTableFills(objX.qNum, objType, objSubType, 6, objX, 0, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for the object
//00001 qssBuildTableFills(objX.qNum, objType, objSubType, 11, objX, 0, "notUsed", "notUsed", objIdArray[7], objParent.qNum, objX.parentSubNum,0); // make the borders for the object

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


// RESIZE BOX
// THIS WILL probally go in the next few builds.
if(qReSizeOn){
// create a hidden element  on top of the document to place a elm to test it size every 2 seconds
// display none may be needed// maybe putting a class name change tied to the body element would work the best
// this way it would set all the displays at once to view, and redraw may increse in speed
// the nested with a padding right setting is to test the isStandardBoxMode
var qSizeDiv =qDoc.createElement("DIV");
qSizeDiv.innerHTML="<div style='width:1px;padding-right:1px;height:0px;position:absolute;'><\/div>X<br />X";
qSizeDiv.id = "qsizeBox";
qSizeDiv.style.position="absolute";
qSizeDiv.style.top="-9999px";
qSizeDiv.style.width = "10%"; // 100% NG in ie. It adds extra width space when appling left margin to the body table
qSizeDiv.style.fontSize="100%";
Frag1.appendChild(qSizeDiv);
}
//Layout
var t = qLayoutDiv.firstChild;
if(t){ 
Frag1.appendChild(qDropMnuDiv);
Frag1.appendChild(qLayoutDiv.firstChild);
}
qDocBody.insertBefore(Frag1,qGBID("qBody"));

//Body class
// macSa1.5+ bug adding className to body before some appends causes it to create double inserts of the elements // not sure if this should go before the insertBefores for speed, but it could also mess up the  insertBefores if it is put before the insertBefores needs testing
//100013 qDocBody.className = qDocBodyClassName;
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
//alert("qssBuildLayoutPart2-2");
if(qReSizeOn){
//alert(qReSizeOn);
qssResizeLayoutOnChange("firstTime");
var old_window_onload = (window.onload) ? window.onload :  function(){};
window.onload = function(){old_window_onload();qssResizeLayoutOnChange("firstTime");}
}
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
//menuselect parts only here to see it to help code building// maybe can have a use or removed from final build
//100018 d0.className = "menuselect";
//100018 d0.className = "qDmnuSubSizer menuselect";
d0.setAttribute("trace","menuSelectBox"); // just here to help me find this div during development , it can be removed on final build
d0.setAttribute("zs",curParentSubTypeAndSelector);

var menuBox_Levl = menu[c].id.match(/m/gi).length + 1;
//alert(menuBox_Levl +"||"+scrollBoxesNeeded);
// build a menubox if needed qDropMnuDiv  qssGetElmInVar(qLayoutDiv,placeithereId,"TD")
(menuBox_Levl > scrollBoxesNeeded)? qssBuildDropMenuBox(qDropMnuDiv,"q"+(objQumber+1),menuBox_Levl,curParentCssSelector): null; 
qssGetElmInVar(qDropMnuDiv,"q"+(objQumber+1)+"bodymen"+menuBox_Levl,"DIV").appendChild(d0);
//100016 qssGetElmInVar(qDropMnuDiv,"q"+(objQumber+1)+"bodymen"+menuBox_Levl+"holderdiv","DIV").appendChild(d0);
//0073 (menuBox_Levl > scrollBoxesNeeded)? qssBuildDropMenuBox('qbodymen',"q"+(objQumber+1),menuBox_Levl): null; 
//0073qGBID("q"+(objQumber+1)+"bodymen"+menuBox_Levl+"holderdiv").appendChild(d0);
//alert(qGBID("q"+(objQumber+1)+"bodymen"+menuBox_Levl+"holderdiv").innerHTML);
}
else{
null;
//alert("helloworld1234");
}

//alert(objType);
qssBuildTableFills(objQumber+1,objType,objSubType,4, menu[c],true,objId,"notUsed",0,0,0,selectIsNeeded); // this fills in the menus for each box built
//00009 qssBuildTableFills(objQumber+1,objType,objSubType,6, menu[c],true,"notUsed","notUsed",0,0,0,selectIsNeeded); // this fills in the menus for each box built
} // end of for loop
scrollBoxesNeeded = 0;
}

// qssBuildDropMenuBox
function qssBuildDropMenuBox(putObjHere,objQumber,menuBox_Levl,objCssSelector){ // this makes a scrollbox
scrollBoxesNeeded = menuBox_Levl;

var d00 = qDoc.createElement('div');  	// - start by creating the MB_outer div element
var d1 = qDoc.createElement('div');     	//  MB_btnT top scroll button
//100016 var d2 = qDoc.createElement('div');     	//  MB_holder
var d3 = qDoc.createElement('div');     	//  MB_btnB bottom scroll button
////var d1Text=qDoc.createTextNode(" \/\\ ");//  MB_btnT text node
//var d3Text=qDoc.createTextNode(" \\\/ ");//  MB_btnB text node
// alert(objCssSelector);
d00.onmouseover = qssMenuDrop_mouseover;
d00.onmouseout = qssMenuDrop_mouseout;
d00.setAttribute("zs",objCssSelector+"_diBo_boSiBo_boOrVe_poAb_cuPo_allSizesAuto");
//d00.style.top = "-10000px";
//d00.style.left = "0px";

// Could be just pointer if I decide not to support ie5.5. also the following works too //d00.style.cursor = (qDocElm.clientWidth)? "pointer" : "hand";// only is_ie ie5to5.5 needs hand
// clientWidth could fail if documentElement is set to 0 on some UA // also this works too, but ie6+ will use hand, cssText seem to work the best on all UA // //d00.setAttribute("style","cursor:pointer")
//100015 d00.style.cssText = "cursor:pointer";// sa op, ff, ie6+
//d00.style.cssText = "cursor:pointer;display:none;position:absolute;left:0px;top:-10000px";// sa op, ff, ie6+ op hates this not sure why
//100015 if(d00.style.cursor != "pointer"){
//100015 d00.style.cursor = "hand";//ie5-
//100015 }
//alert(d00.style.cursor);
// NOTE objCssSelector is probally wrong it needs the objQumber
// needs testing  
// alert("curParentCssSelector/objCssSelector:"+objCssSelector);
//100016 (objCssSelector)? d00.setAttribute("zs",objCssSelector.replace(".","menuBox")) : null;
//100015 d00.className = "menuBlock ";// currently menuBlock class is not being used
//d00.className = "menuBlock "+objQumber+"cmenuBox ";// currently menuBlock class is not being used
//d00.style.cursor = (is_ie)? "hand" : "pointer";
///d00.style.cssText = "display:none;position:absolute;left:0px;top:-10000px;"+d00.style.cssText;// op hate this, not sure why 
//alert(d00.style.cssText);
d00.id = objQumber+"bodymen"+menuBox_Levl;
//alert(d00.id);

d1.setAttribute("zs","_diBo_boSiBo_poAb_allSizesAuto_LeRiTo0px_diNo_cuDe_ovHi");
d3.setAttribute("zs","_diBo_boSiBo_poAb_allSizesAuto_LeRiBo0px_diNo_cuDe_ovHi");
d1.info = d3.info = menuBox_Levl;//this is for scrollbox's level
d1.onmousemove = d3.onmousemove = qssMenuDropScroll_mousemove;
d1.onmouseover = d3.onmouseover = qssMenuDropScroll_mouseover;
d1.onmouseout = d3.onmouseout = qssMenuDropScroll_mouseout;
d1.className = d3.className = objQumber+"cScrollBtn";
//100015 d1.className = d3.className = objQumber+"cScrollBtn menuScrollBtn";
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


//100016 d2.id = objQumber+"bodymen"+menuBox_Levl+"holderdiv";
//100016 d2.className = "qDmnuSubSizer holder";
//100016 d00.appendChild(d2); // - put the holder into the outerbox element

putObjHere.appendChild(d00);// this places the MB_outer
}

function qssBuildTable(objQumber,objType,objSubType,parentqNum, parentSubNum,trs,tds,notUsed0,notUsed1){
//alert(objType);
//NOTE objSubType is not in use // maybe it can be removed 
var curTdCount = 0; // not being used
var t = qDoc.createElement('table');  	// - start by creating the table element
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

var tb=qDoc.createElement('tbody');  	// - create a tbody element TO WORK IN WIN IE5+ !!
//tb.className=objQumber+"c"+"tb";  	 // maybe tb can be put to use, but it's buggy on styles

// - now create the td and tr elements with a for loop inside a for loop
//This puts the td in the tr elements and the tr in the tb element with a for loop inside a for loop
for(var c=0;c<trs;c++){ // the total tr qty needed // 1-for
var tr=qDoc.createElement('tr'); // - this creates a var tr element

for(var cc=0;cc<tds;cc++){ // the total td qty needed // 2-for
var td=qDoc.createElement('td'); //this create one td element
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
var putItHere = qssGetElmInVar(qLayoutDiv,"q"+objQumber+"Ld","DIV");
}
else{
var putItHere = qssGetElmInVar(qLayoutDiv,"q"+parentqNum+"t"+ parentSubNum,"TD");
}
putItHere.appendChild(t);
//alert(putItHere.innerHTML);

if(objType==5||objType==61){// menu items and snipit // I don't think this will be needed since it's going to use td as align
putItHere.className =  "q" + objQumber +"ctd"; // NOTE I don't think qreSizer is needed maybe to keep the button from moving the box size when resized on hover // this may need the parent q number
}

//alert(qLayoutDiv.innerHTML);
} // makeTable05-end

function qssBuildTableFills(objQumber,objType,objSubType, divqty, divObject, pointer_isneeded, objId, notUsed1, borderImg, parentqNum, parentSubNum, selectIsNeeded){
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
var brderStyle = 0;
//var brderStyle = parseInt(borderImg);
/*00001
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
////////var borderNames = [0,"T","B","R","L","TL","TR","BL","BR"]; // not used not sure to use numbers or chars
//var borderNames = ["TL","T","TR","R","BR","B","BL","L"];
}
*/

var isObjTypeDivBtn = objType == 5 || objType == 8 || objType == 9; // objType.indexOf("bt");
var isObjTypeDivBox =  !isObjTypeDivBtn&&(objType==4||objType==20||objType==50||objType==60||objType==7);  // objType.indexOf("bx");
 // this makes sure there is tabs and also buttons and menus
if(divObject){
var tdSelected = (divObject.selectedmenu!=null)? divObject.selectedmenu : -1;
var tdQTY = (isObjTypeDivBtn)? divObject.childDivs: 1; // this get the number of tds needed // boxes only 1
//alert(objType +"|||"+ divObject.id +"|||");
//alert(objType +"|"+ tdSelected+"|"+selectIsNeeded);
//alert(objType +"|||"+tdQTY);
for(var cc=0; cc < tdQTY;cc++){//
//alert(cc+"|||"+objType +"|||"+tdQTY);
var divX = qDoc.createElement(isObjTypeDivBox && "div" || "a");
//(objType == 9)? alert(divX) : null;
// var divX = qDoc.createElement("div");
//100013 var classFront = "q"+objQumber+"c";
//100013 divX.className = (useSelected)? classFront+"p "+ classFront : classFront;
// divX.setAttribute("zs",objId);
//alert("objId: "+objId);
if(isObjTypeDivBtn){ // for button objects // 5 6 8 9
var useSelected = cc == tdSelected && selectIsNeeded;
if(useSelected){
var newObjId = objId.replace("c.$","cp$");
divX.setAttribute("zs",newObjId);
}
else{
divX.setAttribute("zs",objId);
}
//the last nested div, and it sit's on top of everything.
//100013 var lastDiv = eval("div"+trueDivQty);
//alert(divObject.id +"||"+ cc);
var mnuObj = qssGetElmInVar(divObject,divObject.id+"m"+cc,"B");
var dcNum = mnuObj.getAttribute("dcnu").split("|");//  features
//var div0issub = mnuObj.childDivs && pointer_isneeded; //check if a pointer is needed
//alert(parseInt(mnuObj.getAttribute("dcnu")) +"|||||"+ pgNum);
var tdImage = "";
var tdText =  dcNum[1];
// going to use css content for this
var tdPointer = (mnuObj.childDivs && pointer_isneeded)? (objType == 5)? "&#9660;" : "&#9658;" :  ""; //9660 is the down
//var useClassOrSize = (objType == 9)? "class='SSnone'":"width:100%";
// q6ccz q6chz q6cpz q6ccz q6chz q6cz
if(objType == 5){
//var taXClass = lastDiv.className.replace(/z/g,"x");
var tableCode = tdText;
/// var tableCode = "<div>$B"+ tdImage+"</div><div>"+tdText+"</div><div>"+tdPointer+"$E</div>";
//100013 var tableCode = "<table class='"+lastDiv.className+"' style='' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='width:0%'>"+ tdImage+"</td><td style='width:auto'>"+tdText+"</td><td style='font-size:50%;vertical-align:bottom; width:0%'>"+tdPointer+"</td></tr></tbody></table>";
//var tableCode = "<table style='width:auto' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='width:0%'>"+ tdImage+"</td><td style='width:100%'>"+tdText+"</td><td style='font-size:50%;vertical-align:bottom; width:0%'>"+tdPointer+"</td></tr></tbody></table>";
//////div0.className = "EEE"; // JUST FOR TESTING
//alert(div0.className);
//100013 lastDiv.className = "";
//div0.style.marginTop ="100px";
//alert(objId);
}
else{// type 9 drop down menus
//var displayType = "dd";
var tableCode = tdText;
/// var tableCode = "<div>$B"+ tdImage+"</div><div>"+tdText+"</div><div>"+tdPointer+"$E</div>";
// var tableCode = "<table class='SSnone' style='width:auto' border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='width:0%'>"+ tdImage+"</td><td class='SSnone'>"+tdText+"</td><td style='font-size:50%; vertical-align:bottom; width:0%'>"+tdPointer+"</td></tr></tbody></table>";
//100013 div0.className = "EEE"; // JUST FOR TESTING
}
divX.innerHTML = tableCode;
//100013 lastDiv.innerHTML = tableCode;
// this changes the div to and a aElm to allow right clicking to open a link in a new window or tab UA
/* this worked but putting it on div2 below is a far better solution
var getDiv3Class = div3.className;// grad the className off the div that was built
var getDiv3Bkg = div3.style.background;
div3 = qDoc.createElement('A');// change div two into a aElm
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
//100013 var getDiv2Class = div2.className; // grad the className off the div that was built
//var getDiv2Bkg = div2.style.background;
//100013 div2 = qDoc.createElement("A");// change div two into a aElm
//:link    { color: red }
//100013 div2.className = getDiv2Class;
// Could be just pointer if I decide not to support ie5.5.
//100013 div2.style.cssText = "cursor:pointer";// sa op, ff, ie6+
//100013 if(div2.style.cursor != "pointer"){
//100013 div2.style.cursor = "hand";//ie5-
//100013 }
////div2.style.background = getDiv2Bkg;
//100013 div2.style.display = "block"; // not sure this is needed, but it should stay to keep with dom specs
// inherit turns off the :link color but ie still keeps the :link color and it needs cssText or it throws an error.I think making the color black would help then the developer can change it to what ever they want, transparent work on ie but other browsers make it really trans parent // trans parent could work if I make btns require a color or I could right the program that sets this setting automaticalyy by looking at it's parent nodes to see what color they r set. this will need a solution at some point, but for now I'll set it to black
//////div2.style.color = "black"; // inherit
//100013 div2.style.color = "black";

// add the link
//NOTE $$$$$ hLink IS OFF TO MAKE IT SIMPLE TO WORK WITH CODING
// IT CAN GO BACK ON WHEN I GET MORE CODING DONE
var hLink = mnuObj.getAttribute("zx") && "OFF";
divX.href = hLink;

//div0.style.width = "auto";
// Putting the id on div2 is ok. If moved to div1, then dropmenu boxes id will need to change to, because it gets it's id from the parent holding the event it was fired on too. Not sure anymore if that's all true. I moved this id around so much on each build, I'm not sure where the events get there ids on the menu box anymore.  
///alert("objQumber|||||"+objQumber);
divX.id = "q"+objQumber+"i"+divObject.id+"m"+cc;
//alert("divObject.id:::"+divObject.id+"||||"+"div2.id::::"+div2.id);
//(objType == 9)? alert(div2.id):null;
divX.onmouseover=divX.onmouseout=divX.onmousedown=divX.onmouseup=divX.onclick= qssMenuItem_event;
divX.qHasChild = mnuObj.childDivs;
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
//div0.href = qGBID(divObject.id+cc).href;
// BOX sizing is out for the moment but I may put it in to set the size to the outside of the border someday
//.backnone,.backnie6{cursor:pointer;cursor:hand;box-sizing:border-box;-moz-box-sizing:border-box}
}//endBtn

else if(isObjTypeDivBox){ // boxes
divX.setAttribute("zs",objId);
 // puts a id onto the last nested div // the id is put on tempalary to help place the table
divX.id = "q"+objQumber+"Ld"; //make it last elm id in the table building function
/// divX.className = divX.className + " qreSizer"; //NOTE its for the resizing ftn may not need
/// "q"+objQumber+"i"+divObject.id+"m"+cc +"a";

}
/* 100013 
if(objType == 9){//else9 this is for the scroll menus
//overflow = "hidden" in objType 9 loses width in FF 
////lastDiv.className =  'SSnone '+lastDiv.className;
/////(is_ie)? div0.style.height = "auto" : null; // this fixes a win ie bug with holding the correct bottom margins when set to auto width
}//else9

else if(objType == 5 || objType == 6 || objType==8){ // 5==tabs,6==bars, 8=sidemenu
// this is to make the open in a tab to work
//NOTE putting a Aelm over a btn did not work. The Events below it would not fire.  I could put all the events on the a element and size it to fit on top of each btn. I don't like this idea, I think ie will support links around blocks someday. Everyone supports it accept ie. Sizing it over a button would work, but it might have problems on drop down menus.  Putting a Aelm around a button in a drop down menu may have the same problems. Needs testing to see if it would. Also I could test for right click or key presses but how does one know what key is pressed. 
//
//var aElm =qDoc.createElement('A');
//aElm.innerHTML = "";
//aElm.href = "/";
//aElm.style.top = "100px";
//aElm.style.left = "100px";
//aElm.style.position = "absolute";
//aElm.style.padding = "10px 5px";
//aElm.style.zIndex = "0";
//aElm.style.paddingBottom = "33px";
//aElm.style.background = "yellow";
//aElm.style.display = "block";

// I made sa use a block now because of a scaling bug 
// Since 8.0 works i'm just going to get ride of this
if(is_op){ // is_op does not care if it's block or table, and if relative or static // 8.00 and above does not need this
// mac op7.6 needs this other wise the menuItems don't show up
// op likes this line for some odd reason // not sure why it needs the condtions
//sa hates haveing a block or table it has scaling problems
lastDiv.style.display =(is_nn7 || is_nn6 || is_op)? "table" : "block"; // when element is sized to ex ns needs this, also em does not work at all in ns 6.2 and below //sa hates having a block or table it has scaling problems
div3.style.position =(is_nn7 || is_op || is_sa)? "relative" : "static"; // when element is in a table and needs cords info this is required for element // some sa ver browsers might hat this
//lastDiv.style.width = "100%";
}
} // 5
*/

if(objType == 7){
//alert(qLayoutDiv);
qLayoutDiv.appendChild(divX);
}
else if(objType== 4 || objType == 20 || objType == 50){
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
else{
alert("error wrong this else should not be used");
var placeithereId = (objType == 9)? "q"+objQumber+"i"+divObject.id +"m" : (objType== 5||objType== 8)?  "q"+objQumber+"t"+ cc : (objType == 7)? "q"+parentqNum+"t1" : (isObjTypeDivBox)? "q"+parentqNum+"t"+parentSubNum :"q"+objQumber+"i"+cc; // get the location it needs to be put in
//alert(qDocBody.outerHTML);
//(objType == 7)?alert("placeithereId|||||||| "+placeithereId):null;
//alert(qLayoutDiv.innerHTML);
var useTagName = (objType != 9)?"TD": "DIV";
var inTheDiv = (objType != 9)?qLayoutDiv: qDropMnuDiv;
var placeithere = qssGetElmInVar(inTheDiv,placeithereId,useTagName);
//0073var placeithere = qGBID(placeithereId);
//(objType == 7)?alert(placeithere):null;
placeithere.trueDivQty = trueDivQty;
//alert("2:"+objType +" div0:"+div0.outerHTML);
//$$$$$$$DIES HERE $$$$$$$alert("2:"+objType +" placeithereId:"+placeithereId);
//alert("2:"+objType +" placeithere:"+placeithere.outerHTML);
placeithere.appendChild(div0);//this put the divs in the td element
////if(objType == 5 || objType == 6 || objType==8){// WQE 5==tabs,6==bars, 8=sidemenu // NOTE I think boxes could have a links too// not sure what to use them for or if they will mess up other surface a links
///////placeithere.appendChild(aElm);
////}//WQE
//(objType == 5)?alert(placeithere.innerHTML):null;
}
// (objType == 9)? alert(objType) : null;
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


function qssGetPosAll(e, elm_obj,testFromFunction){
// testing for top might work instead of sniffing for each browser here or test for top.pageXOffset or winelm.pageXOffset
// I don't no if pageXOffset is dom and if khtml supports it or not. Needs checking.
// ns needs top node here. If miners don't like this then (top)? top: window; var is needed before this code
//var winSelf = parent.self; // I think self can be used now it should work with parentWin

// older browsers need to use qDoc.body newer and compilant ones use documentElement
var docElm =(e.pageX || qDocElm.clientWidth)?qDocElm:qDoc.body;
elm_doc_x = elm_doc_y =  elm_win_x = elm_win_y = doc_win_x = doc_win_y = 0;

// e.page is everyone and ie is e.client
mouse_doc_x = e.pageX || (e.clientX + (qDocElm.scrollLeft || qDoc.body.scrollLeft));
mouse_doc_y = e.pageY || (e.clientY + (qDocElm.scrollTop || qDoc.body.scrollTop));
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


var posArray=qssGetPosElm(elm_obj);
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
//qWin.status=("doc_win_x:"+doc_win_x);	
//alert("elm_doc_x :"+elm_doc_x+" |mouse_doc_x :"+mouse_doc_x+" |mouse_ele_x :"+mouse_ele_x+" |mouse_win_x :"+mouse_win_x+" |win_w :"+win_w +" |elm_win_x :"+elm_win_x +" |doc_win_x :"+doc_win_x);	
//qWin.status=("elm_doc_x :"+elm_doc_x+" |mouse_doc_x :"+mouse_doc_x+" |mouse_ele_x :"+mouse_ele_x+" |mouse_win_x :"+mouse_win_x+" |win_w :"+win_w +" |elm_win_x :"+elm_win_x +" |doc_win_x :"+doc_win_x);	
//qWin.status=(" elm_doc_y:"+elm_doc_y+"mouse_doc_y:"+mouse_doc_y+" mouse_ele_y:"+mouse_ele_y+" mouse_win_y:"+mouse_win_y+" win_h:"+win_h +"elm_win_y:"+elm_win_y );	
//qWin.status=(" _docLt:"+elm_doc_x+"_docX:"+mouse_doc_x+" _eleX:"+mouse_ele_x+" _winX:"+mouse_win_x+" _winW:"+win_w +"_docTp:"+elm_doc_y+"_docY:"+mouse_doc_y+" _eleY:"+mouse_ele_y+" _winY:"+mouse_win_y+" _winH:"+win_h );	
//qWin.status=("the window height: "+ win_h);
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

function qssResizeLayoutOnChange(X){
// Try putting the two functions together ie make qssResizeLayoutOnChange and qssResizeLayout the same unless the onresize wont work then keep it two functions
var bx = qGBID("qsizeBox");
if(bx){//if1
var bxoffsetWidth = bx.offsetWidth;
var bxoffsetHeight = bx.offsetHeight;
var bxLastWidth = bx.lastWidth;
var bxLastHeight = bx.lastHeight;
if(bxoffsetWidth!= bxLastWidth || bxoffsetHeight != bxLastHeight || X=="firstTime"){
isStandardBoxMode = (parseInt(bx.firstChild.offsetWidth) == 1)? 0 : 1; // 2 or 0(0 is ns7.2-only) r for w3c mode
//alert("isStandardBoxMode:"+isStandardBoxMode + " width:"+parseInt(bx.firstChild.offsetWidth));
qssResizeLayout("setSize",isStandardBoxMode);
bx.lastWidth = bxoffsetWidth;
bx.lastHeight = bxoffsetHeight;
//alert(" bxoffsetWidth:"+bxoffsetWidth+" bxoffsetHeight:"+bxoffsetHeight);
}
}//if1
qWin.sizeFunTimout = setTimeout("qssResizeLayoutOnChange()", 1000);
}

function qssResizeLayout(DoIt,isStandardBoxMode){
//alert(DoIt);
//return;
// THIS might also work on dropmenu boxes too. 
var template = qLayoutArray; // containing the document's Template Objects
//0073 var template = qtdnStackSiteC; // containing the document's Template Objects
var templateObjs = template.getElementsByTagName("B"); // gets the Template Objects
//NOTE: qDocBodyClass is not in use. It was used to set the height to auto, maybe it can set verticalAlign and 4 other uses
///////var qDocBodyClass = qDocBody.className;
///////qDocBody.className =  "qBodyreSizer " +qDocBodyClass;// sets any needed heights back to auto before sizing
if(qGBID("qBodyTable")){//ifqBodyTable
var qBody = qGBID("qBodyTable");
qBody.style.visibility = "hidden";// // FF1.5+? UA flickers somewhat, and this cools it down somewhat 

// set any needed heights back to auto before sizing 
for(i=0;i<templateObjs.length;i++){ //for1
var obj = templateObjs[i]; // get the current div element which repersents a single Template Object
var objOn = parseInt(obj.isOn); // get the on or off value for the current object
var objType = parseInt(obj.objType); // get the type for this current object
if(objOn && (objType == 3 || objType == 4 || objType == 7)){ //if1 only the body children and up needs this for now
//0296 changed var chd = (obj.childQty)? obj.firstChild : 0; //sib = sibling
// using firstChild will pick up a blank space as a textnode it's best to use
// getElementsByTagName("b") bc some nestings could end up with blanks between elements
// later build wont have these spaces, but it's best to use tagname just in case
var chd = (obj.childQty)? obj.getElementsByTagName("b")[0] : 0; //sib = sibling
for(var ii = 0; ii<obj.childQty;ii++){//for2 loop the siblings and change their heights to auto
//00009 var chdTdIdEnd = (objType != 3)? ii : 1;
var chdTd = qGBID("q"+obj.qNum+"t"+((objType != 3)? ii : 1));
//var chdTd = qGBID("q"+obj.qNum+"t"+chdTdIdEnd);
var chdLastDiv = chdTd.getElementsByTagName("DIV")[chdTd.trueDivQty];
var chdTa = chdTd.getElementsByTagName("TABLE")[0];
//alert(chdLastDiv);
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
var objIdArray = objId.split("$"); // split the current object Id into an array
var objOn = parseInt(obj.isOn); // get the on or off value for the current object
var objType = parseInt(obj.objType); // get the type for this current object
var objSubType = parseInt(obj.objSubType); // get the sub type for this current object
//3-body, 4-Box, 20-menuBox, 50-crumbBox, 60-SnipitBox 
if(objOn && (objType == 3 || objType == 4 || objType == 7)){// obj.hasChildNodes()

var objTaId = (obj.objType != "3")? "q"+obj.qNum+"ita" : "qBodyTable";
var objTa = qGBID(objTaId);//Ta=Table
var objChildQty = obj.childQty;
//0296 changed var chd = (obj.childQty)? obj.firstChild : 0; //sib = sibling
// using firstChild will pick up a blank space as a textnode it's best to use
// getElementsByTagName("b") bc some nestings could end up with blanks between elements
// later build wont have these spaces, but it's best to use tagname just in case
var chd = (obj.childQty)? obj.getElementsByTagName("b")[0] : 0; //sib = sibling
//alert("obj.outerHTML:"+obj.outerHTML +" chd:"+chd);
var colectChdTdHeights = 0;//Used so a last row can get the corect height. See comments below.
for(var ii = 0; ii<objChildQty;ii++){//for2 loop the siblings
//00009 var chdTdIdEnd = (objType != 3)? ii : 1;
var chdTd = qGBID("q"+obj.qNum+"t"+((objType != 3)? ii : 1));
// var chdTd = qGBID("q"+obj.qNum+"t"+chdTdIdEnd);
var chdTdTb= chdTd.parentNode.parentNode;
var chdDiv1 = chdTd.firstChild; // ce
var chdDiv2 = chdDiv1.firstChild; //cm
var chdDiv3 = chdDiv2.firstChild; //cb
var chdLastDiv = chdTd.getElementsByTagName("DIV")[chdTd.trueDivQty]; // cz
var chdTa = chdTd.getElementsByTagName("TABLE")[0]; /// NOTE this will become cz
//chdTa.setAttribute("XXXXXXX","XXX");

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

// vAlign sa1to3+? and FF1.5+? UA fix for getting the correct offset height on table cells. Sa was getting the size of the content, instead of the table-cell. I still can't figure out what FF was doing with it's extra spaces above, and weird overflow problem when a alert was fired in this function. All of sa UAs seem to get it messed up to on alerts and randomly too. sa 1.0 to 4+ all leave a extra 1px space when page is aligned to the top and page height is set to less than 100%. At least at 80% height. qssGetPosElm(chdTd.parentNode)[1] keeps return 1px when it should be reurning 0.
chdTdTb.vAlign = "top";

//NEEDED Maybe weed out the browser UAs that don't need to use this method to uptain the table-cells offsetHeight..
// I don't think weeding out is a good idea right now, all the browser have some problems, maybe a small effort is worth while, but I would not hold my breath
var getChdTdHeight = 0;
//alert(objChildQty);
//alert("objChildQty:"+objChildQty);
//alert("objTa.offsetHeight:"+objTa.offsetHeight);
//alert("objType:"+objType);
// has only one table row || is a col(objSubType==1)
if(objType != 3 && (objChildQty==1 || objSubType==1)){
getChdTdHeight = objTa.offsetHeight;
//alert("one table row: " +getChdTdHeight);
}
// first table Row || bodyTable || middleRows
// lots of problems with finding the right subtractHeightBy for webkit 3.2 in CS4 versin 10 of
// Dreamweaver and sa 1to3.2 UA.
// sa 1to3.2 UA needs to use the parentNode(tr elm) of chdTd to find it's correct position 
// so far all the other browser don't mind this, but ie and other browser may need to get
// chdTd poistion the old way, like this qssGetPosElm(chdTd)[1] Also, sa 1to3.2 UA needs
// chdNextTrTd to get it's postion from the tr element too. So ie and other browser may need to
// chdNextTrTd = chdTd.parentNode.nextSibling.firstChild because it can't use the tr element
// which would be chdTd.parentNode.nextSibling . Needs testing
else if(ii == 0 || objType == 3 || ii < objChildQty-1){
var chdNextTrTd = chdTd.parentNode.nextSibling;
var subtractHeightBy=(ii==0&&objType!=3)?qssGetPosElm(objTa)[1]:qssGetPosElm(chdTd.parentNode)[1];
getChdTdHeight =  qssGetPosElm(chdNextTrTd)[1] - subtractHeightBy;
colectChdTdHeights = colectChdTdHeights + getChdTdHeight;
//alert(chdTd.offsetHeight);
//alert(ii);
//alert(ii==0&&objType!=3);
//alert("qssGetPosElm(objTa)[1]:"+qssGetPosElm(objTa)[1]);
//alert("qssGetPosElm(chdTd)[1]:"+qssGetPosElm(chdTd)[1]);
//firstRow:bodyTable,middleRows
//alert("getChdTdHeight:"+getChdTdHeight);
//alert(chdNextTrTd);
//(objType == 3)?alert("hello") : null; // still buggy here with FF
//alert("first||Middle||body table Row getChdTdHeight= "+ qssGetPosElm(chdNextTrTd)[1] +" - "+  subtractHeightBy +" = "+ getChdTdHeight);
//alert(chdNextTrTd +"|||"+ chdNextTrTd.offsetTop);
}
// last table row
// since the next tr does not exist on the last row w/box and etc, I use the colected heights
// of all the pervious row heights and subtract that from the object's overall height. 
// this also fixes any odd divisions of td cells which would require figuring out how each UA
// calculates the division of object sizes when there is not a even number of pixels to be divided
// for each object.
// As the same as above, sa UA has problems with getting the correct offsetHeight of a table cell
// element. The older the SA UA browser is, the worst the problem. So, collecting the pervious row height
// fixes this problem well, and works well as a cross browser solution too, and fixes any pixel
// division problems that may occur by letting the browser UA decide what the last row should be
// in pixels to make up for any pixel divisionly problems.
// the following line worked but it did work in SA because of the table-cell offsetheight problem.
// getChdTdHeight =  (qssGetPosElm(objTa)[1] + objTa.offsetHeight) - qssGetPosElm(chdTd)[1];
    
else{
getChdTdHeight = objTa.offsetHeight - colectChdTdHeights;
//alert(getChdTdHeight);
//0299 alert(objTa.outerHTML);
//0299 getChdTdHeight =  (qssGetPosElm(objTa)[1] + objTa.offsetHeight) - qssGetPosElm(chdTd)[1];
//0299 var test1 = (qssGetPosElm(objTa)[1] + objTa.firstChild.clientHeight) - qssGetPosElm(chdTd)[1];
//0299 var test2 = objTa.clientHeight;
//0299 alert("last table row: "+ getChdTdHeight +"||||"+(qssGetPosElm(objTa)[1] + objTa.offsetHeight) +"||-||"+ qssGetPosElm(chdTd)[1]);
//0299 alert(test1);
//alert(objTa.clientHeight);
}
//alert("getChdTdHeight:"+getChdTdHeight);
chdTdTb.vAlign = "";
//NOTE: if border and background is on chdDiv2 or chdDiv3 then some settings here will be off
var getSpaceHeight = chdTdOffsetHeight - chdDiv1OffsetHeight; // not used yet // outerbox maybe
var getMarginBoxHeight = chdDiv1OffsetHeight - chdDiv2OffsetHeight; // not used yet,
var getChdLastDivExtraBoxHeight = (isStandardBoxMode)?chdDiv1OffsetHeight -chdLastDivClientHeight: 0;
//alert("getChdLastDivExtraBoxHeight:"+getChdLastDivExtraBoxHeight);
var useBoxHt = getChdTdHeight - (chdDiv1OffsetHeight - chdLastDivOffsetHeight);
//alert("getChdTdHeight:"+getChdTdHeight+" chdDiv1OffsetHeight:"+chdDiv1OffsetHeight +" /chdLastDivOffsetHeight:"+chdLastDivOffsetHeight);
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
//NOTE: qDocBodyClass may not be needed, it's here just in case it's needed
///////////qDocBody.className = qDocBodyClass;// blank may not work in all browsers
qBody.style.visibility = "visible";
}//ifqBodyTable
}

//qssMenuItem_event
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

// it could use regEx here  (/\ceh\b/.exec(objX.parentNode.parentNode.className)) // i think indexOf is faster
var is_Hover_off = objX.className.indexOf("ceh")<0; // this checks if the mouse is already over the element
//100014 var is_Hover_off = objX.parentNode.parentNode.className.indexOf("ceh")<0; // this checks if the mouse is already over the element
//alert(is_Hover_off);
(is_Hover_off)? qssMenuItem_changeClass(objID,objLevel,objClass+"h"): null; // if mouse is not already over the element it runs this function. "h" stands for hover
//alert(subMB_select_Type);
//(subMB_select_Type==9)? alert(subMB_select.style.display): null;
//alert(subMB_select);
var subMB_select_Isclosed = (subMB_select_Type==9)? subMB_select.style.display!="block" : 0;// this checks to see if the element's sub menubox is closed or open // 
//alert(subMB_select_Isclosed);
if(subMB_select_Isclosed){// if there is a element sub menubox, this checks to see if it needs to be open 

//qssMenuItem_changeClass(objID,objLevel,objClass+"h");
//alert("objLevel:" +objLevel +" | "+ "subMB_Array_level:"+ subMB_Array_level );
var isSdeMnuItm = (objType==8); // test if this is a side menu Item in a vertical menuBox
var isDrpMnuItm = (objType == 9); // this test if this is a menu Item in a pop out scrolling dropMenuBox
var is_RootBtn_aSide = (Crnt_RtBtn_Type==8); // this test if the RootBtn is a side button in a vertical menu box.
var isDrpOrSdeMnuItm = isDrpMnuItm || isSdeMnuItm;
//alert("objType"+objType+"|"+"isSdeMnuItm"+isSdeMnuItm+"|"+"isDrpMnuItm"+isDrpMnuItm+"|"+"is_RootBtn_aSide"+is_RootBtn_aSide);
//alert(subMB_select_qNum+"bodymen"+objLevel);
eval("qWin.LastM"+objLevel+"='"+ objID+"'"); // it set's it to the elm id // this line can go at the beggining of this if()


//#### Size Up the MenuBox that needs opening in a hidden box and get all the sizes 
///alert(subMB_select_qNum+"bodymen"+(objLevel+1));
var subMB_outer = qGBID(subMB_select_qNum+"bodymen"+(objLevel+1));
//alert(subMB_select.outerHTML);
var subMB_btnT = subMB_outer.firstChild; // first or top scroll button
var subMB_btnB = subMB_outer.childNodes[1];//last or bottom scroll button // this will need to change to next sibling if it works in all browsers
//100018 var subMB_holder = subMB_outer.lastChild;

//var subMB_outerClass = subMB_outer.className;
//subMB_outer.className = "qDmnuSizer " +subMB_outerClass;
// putting the outer's class on holder helps find the real padding
// I think I should just support 1.3 safari and up. ns6.8 and up and ie5.5 and up and opera 8 and up
// then I can get the computed style sizes, get ride of absolute on the holder, maybe get ride of holder altogether
// I think this would be a plus to get ride of a lot of code// more thinking is needed
//100018 subMB_holder.className = "qDmnuSubSizer qholderSizer " + subMB_select_qNum+"cmenuBox"; // Helps finds the padding
//100018 subMB_outer.className = "qDmnuSizer " +subMB_select_qNum+"cmenuBox"; // I think menuBox is ready to get out of here, absolute and display none could be put on the build div// I moved menuBlock to the div, I'm keeping it here it only here now to help with code testing
//100015 subMB_outer.className = "qDmnuSizer menuBlock " +subMB_select_qNum+"cmenuBox"; // I think menuBox is ready to get out of here, absolute and display none could be put on the build div// I moved menuBlock to the div, I'm keeping it here it only here now to help with code testing
//box-sizing: border-box
//subMB_holder.style.padding = "0px";
/////////subMB_outer.style.border = "0px"; 
//subMB_holder.style.paddingLeft="0px";
//subMB_holder.style.borderLeft="red solid 50px";
//subMB_holder.style.paddingRight = subMB_holder.style.paddingBottom = "0px";

subMB_btnT.style.display = "none"; //this hides the top scroll button
subMB_btnB.style.display = "none"; // this shows the bottom scroll button so it can be messure
subMB_select.scrollTop = "0px"; // this resets any scrolling that may have been done prior
// subMB_btnB.style.display = "block"; // this shows the bottom scroll button so it can be messure
//100018 subMB_btnB.style.width = "1px";// fixes a mac ns bug when measuring the outerboxoffset below //does not work from CSS 
//subMB_btnB.style.top = "0px";

//100018 subMB_holder.style.position = "static"; // if it works move it to css on the build // static maybe better
//alert(subMB_select.style.marginTop);
// sa hates setting top button to 0px but it can go to -1px first than 0px
//subMB_select.style.marginTop = "-1px"; // this resets any scrolling that may have been done prior
//subMB_select.style.top = "0px";
///subMB_select.style.marginTop = "-1px"; // this resets any scrolling that may have been done prior
//alert(subMB_select.style.marginTop);
//subMB_select.setAttribute("style","margin-top:0px"); 
//100018 subMB_select.style.display="box"; //########## needs to be moved below the elm sizing
// sa bug fix it needs to reset the height and margintop between the blocks because of a bug going from drop menu to a perivous menu and it would keep any negtive marginTop set before and mess up subMB_outer_Tborder and what uses  subMB_outer_Tborder  
// NOTE maybe it would be better to somehow not use display none on subMB_select instead subMB_select.qOn 
// Putting the class here might work too.
//100018 subMB_select.style.height = subMB_select.offsetHeight +"px"; 
//100018 subMB_select.style.marginTop = "0px"; // this resets any scrolling that may have been done prior


//100018 subMB_outer.style.display="block"; // this displays the subMB in a hidden area to get size information
qssGetPosAll(evt, objX,"objX"); // this function produces and sets the positioning cords var for the elm
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
// and it would not need to get qssGetPosAll again
//NOTE ########## I don't think putting it to the elmBox edge is needed anymore. It's going to put it to the menu Items edge.
var elmMB_outer = qGBID(subMB_select_qNum+"bodymen"+objLevel); // this get the current elmMB containing the button or the button it was fired on 
qssGetPosAll(evt,elmMB_outer,"MBX"); // this function produces and sets the positioning cords var for the elm
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
subMB_btnT.style.display = "none"; 
subMB_btnB.style.display = "none"; 
//alert("subMB_btnT_Height:"+subMB_btnT_Height);
//100018 var subMB_btn_Height = subMB_btnB.offsetHeight;
//100018 var subMB_btn_Width = subMB_btnB.offsetWidth;

// size the menu box
subMB_select.style.display = ""; // this shows the menuItems so the menuBox can be messured with them
subMB_outer.style.display = ""; // this shows the menuBox with the menuItems in them so it messure them
var subMB_outer_Height = subMB_outer.offsetHeight; 
var subMB_outer_Width = subMB_outer.offsetWidth;
var subMB_select_Height = subMB_select.offsetHeight;
var subMB_select_Width = subMB_select.offsetWidth;
//alert("subMB_outer_Height:"+subMB_outer_Height);
//100018 var subMB_holder_Height = subMB_holder.offsetHeight;
//100018 var subMB_holder_Width = subMB_holder.offsetWidth;
//alert(subMB_btn_Width);
//100018 var W3CboxSizing = subMB_btn_Width==2;
var subMB_outer_Pos=qssGetPosElm(subMB_outer);// left and top positions
//100018 var subMB_holder_Pos=qssGetPosElm(subMB_holder);// left and top positions
var subMB_select_Pos=qssGetPosElm(subMB_select);// left and top positions
//100018 var subMB_outer_Lpadding = subMB_holder_Pos[0];
//100018 var subMB_outer_Tpadding = subMB_holder_Pos[1] - subMB_outer_Pos[1];
//100018 var subMB_outer_Lborder = subMB_select_Pos[0] - subMB_holder_Pos[0];
//100018 var subMB_outer_Tborder = subMB_select_Pos[1] - subMB_holder_Pos[1];
//100018  var subMB_outer_Rpadding = subMB_outer_Width  - (subMB_holder_Width+ subMB_outer_Lpadding);
//100018  var subMB_outer_Bpadding = subMB_outer_Height - (subMB_holder_Height + subMB_outer_Tpadding);
//100018 var subMB_outer_Rborder = subMB_holder_Width  - (subMB_select_Width+ subMB_outer_Lborder);
//100018 var subMB_outer_Bborder = subMB_holder_Height  - (subMB_select_Height+ subMB_outer_Tborder);

//100018 var subMB_holder_Lspace = subMB_outer_Lborder + subMB_outer_Lpadding;
//100018 var subMB_holder_Tspace = subMB_outer_Tborder + subMB_outer_Tpadding;
//alert(subMB_outer_Tborder +"|||"+ subMB_outer_Tpadding);
//100018 var subMB_holder_Rspace = subMB_outer_Rborder + subMB_outer_Rpadding; 
//100018 var subMB_holder_Bspace = subMB_outer_Bborder + subMB_outer_Bpadding;
//////////alert(subMB_select_Pos[1]  +"|||"+ subMB_holder_Pos[1]+"|||"+ subMB_outer_Tborder);
//alert(subMB_select_Pos[0]  +"|||"+ subMB_holder_Pos[0]+"|||"+ subMB_outer_Lborder);
//alert(subMB_outer.getStyle("borderLeftWidth"));
//alert(subMB_outer.style.borderLeftWidth);
subMB_outer.style.display="none"; //this hides the subMB in a hidden area // NS needs it to apply the size info to the subMB and to not eat up time doing it
//100018 subMB_btnB.style.display = "none"; // this hides the bottom scroll button in case it does not need it
//subMB_btnT.style.display = "none"; // this hides the Top scroll button // mac ie bug needs both btn to display to size them correctly 
// set the widths
//100018 subMB_outer.style.width = (W3CboxSizing)? subMB_select_Width+ "px" :subMB_outer_Width+ "px";
//100018 subMB_holder.style.width = subMB_select.style.width = subMB_select_Width + "px";
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
qssGetPosAll(evt, elmMB_outer,"itnum3"); // this function produces and sets the positioning cords var for the elm
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
//alert("first_elm_Height_test:"+first_elm_Height_test);
if(first_elm_Height_test){ // the following makes a scroll box if needed
setTP_to= (is_RootBtn_aSide)? doc_win_y : (isDrpMnuItm)? folMB_outer_Top : elm_Bot;
//setTP_to= (is_RootBtn_aSide)? elm_Top : (isDrpMnuItm)? folMB_outer_Top : elm_Bot;
subMB_outer.openboxid =subMB_select.id;
//100018 subMB_outer.btnheight = subMB_btn_Height;
//alert(first_elm_Height_test +"|||"+ win_h);
//100018 (is_nn || is_op || is_sa)? subMB_holder.style.position = "absolute": null; // this fixes the ns 6<>7.2 and up bug and others // Needed on sa 1.00 to ? (sa2works) // Need to test 1.2 and above, also need to test opera too 
/////var setbtnW = subMB_select_Width;
//var setbtnW = (is_ie6c || is_sa)? subMB_holder_Width -(subMB_btn_Width - 1):subMB_holder_Width;
//alert(subMB_outer_Tpadding +"|||"+ subMB_holder_Tspace +"|||"+ subMB_holder_Bspace);
//###### NOTE may want to do something else with finding the realtop ##############################
//alert("setTP_to:"+setTP_to);
subMB_btnT.realtop = subMB_select_Pos[1] - subMB_outer_Pos[1];
//100018 subMB_btnT.realtop = subMB_outer_Tpadding; // subMB_select_Pos[1]
//100018 subMB_btnT.style.top  =  subMB_outer_Tpadding +"px";
//100018 subMB_btnT.style.left  =  subMB_outer_Lpadding+"px";
//100018 subMB_btnT.style.width = subMB_select_Width+"px";

//subMB_btnB.style.position = "relative";
///alert(subMB_btnB_Height);
subMB_btnB.realtop = first_elm_Height_space - subMB_btnB_Height;
//100018 subMB_btnB.realtop = first_elm_Height_space - (subMB_btn_Height+subMB_outer_Tborder+subMB_holder_Bspace);
//100018 subMB_btnB.style.top =  subMB_btnB.realtop +"px";
//100018 subMB_btnB.style.left = subMB_outer_Lpadding+"px";
//100018 subMB_btnB.style.width = subMB_select_Width+"px";
// subMB_btnB.style.height is needed to fix a bug in ie not seeing it with a transparent bg in the middle of the button
subMB_btnB.style.display = ""; // this displays the button so it can be seen for scrolling
//alert(subMB_btnB.style.display);
//alert(subMB_btnB.realtop +"||||"+ subMB_outer_Tborder +"|||"+ subMB_holder_Bspace);
}

else if(second_elm_Height_test){ // the following slides the subMB up to fit
var setTP_to = elm_Top - (subMB_outer_Height - avalSpaceTpToWinBt);
}
else { // this places the subMB by lining up to the menus side or below the bar
var setTP_to= (isDrpOrSdeMnuItm)? elm_Top : elm_Bot;
}
//alert(setLT_to +"***"+setTP_to);
// needs work heights don't add up the same with each browser may need to put the styles in a div between outer and holder
//NOTE : subMB_select is the only one which needs to be sized, or it can just use bottom 0px if the menu btns R used
//100018 subMB_outer.style.height = (W3CboxSizing)? (first_set_height_too - (subMB_holder_Tspace + subMB_holder_Bspace))  + "px" : first_set_height_too +"px";
//alert(subMB_outer.style.height+"||||"+ first_set_height_too +"|||"+subMB_holder_Tspace+"|||"+subMB_holder_Bspace+"|||"+avalSpaceBt);
//alert(subMB_outer.style.height);
//subMB_outer.style.height = (is_ie6c || is_sa)? (first_set_height_too - (subMB_holder_Tspace + subMB_holder_Bspace))  + "px" : first_set_height_too + "px" ;
//100018  subMB_holder.style.height = (first_set_height_too - (subMB_holder_Tspace + subMB_holder_Bspace)) + "px";
//##### NOTE this will probally need work, the following line probally will not work.. 
subMB_select.style.height = (first_set_height_too - (subMB_outer_Height - subMB_select_Height)) + "px";
//100018 subMB_select.style.height = subMB_select_Height  + "px";
//alert(avalSpaceBt+"||||"+ first_set_height_too +"|||"+first_set_height_too+"|||"+subMB_outer.style.height+"|||"+subMB_holder_Tspace+"|||"+subMB_holder_Bspace);


// the following sets the top and left position for the subMB
subMB_outer.style.left = setLT_to+"px";
subMB_outer.style.top = setTP_to+"px";
//100018 subMB_holder.className = "qDmnuSubSizer holder"; // Helps finds the padding// and gets removed here it really has no need 4 qDmnuSubSizer here, maybe 
//100018 subMB_outer.className = "noneMB "+subMB_select_qNum+"cmenuBox";
//100017 subMB_outer.className = "noneMB menuBlock "+subMB_select_qNum+"cmenuBox";
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
eval("qWin.LastM"+menubox_level+"="+0); // this normally holds the id of a button for that level, but it now needs to be zeroed out to false

// the follow removes any setting that were set to these elements and also hides this menubox
cseMB_outer.style.display = "none";
cseMB_select.style.display = "none"; // NEEDED I'm thinking this could maybe moved to the onmouseover function
cseMB_select.style.height = ""; // NEEDED I'm thinking this could maybe moved to the onmouseover function

// put the menu box up here so the next time it is used it can be opened and meassured where it can't be seen
cseMB_outer.style.top = "-10000px"; //It could go but I rather keep it can control the pan outs
cseMB_outer.style.left = "0px";  //It could go but I rather keep it can control the pan outs
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
//-- might be needed
//if(qDoc.scroller == "on"){null;
//}
//else{
//clearTimeout(timerID);
//return;
//}
//--
//qssMenuDropScroll_it("Top",Scroll_Active,Scroll_qnumber);
//var scoMB_outer = qGBID(Scroll_qnumber+"bodymen" + Scroll_Active);

//alert(Scroll_qnumber);
//scoMB stands for "scrollmenubox"
var scoMB_outer = qGBID(Scroll_qnumber+"bodymen" + Scroll_Active);
var scoMB_holder = scoMB_outer.lastChild; // this is the MB_holder
var scoMB_btnT = scoMB_outer.firstChild;
var scoMB_btnB = scoMB_btnT.nextSibling;
var scoMB_select = qGBID(scoMB_outer.openboxid);

var scoMB_holder_Height = parseInt(scoMB_holder.style.height);
var scoMB_select_Height = parseInt(scoMB_select.style.height);
var scoMB_select_Tmargin = parseInt(scoMB_select.style.marginTop);
var scoMB_btnT_Height = (scoMB_btnT.style.display != "block")?0:scoMB_outer.btnheight;
var scoMB_btnB_Height = (scoMB_btnB.style.display != "block")?0:scoMB_outer.btnheight;
var scoMB_outer_Top = parseInt(scoMB_outer.style.top);
var scoMB_btnT_mou_elmY = mouse_doc_y - (scoMB_outer_Top + scoMB_btnT.realtop);
var scoMB_btnB_mou_elmY = mouse_doc_y - (scoMB_outer_Top + scoMB_btnB.realtop);

//qWin.status = (scoMB_outer_Top + scoMB_btnB.realtop) + " | " + mouse_doc_y + " | " + scoMB_btnB_mou_elmY + " | " + scoMB_btnT_Height;
//qWin.status = qWin.status + " |||| " + (scoMB_outer_Top + scoMB_btnT.realtop) + " | " + mouse_doc_y + " | " + scoMB_btnT_mou_elmY + " | " + scoMB_btnB_Height;

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
qDoc.scroller = 0;
//qDoc.scroller = "off";
}
else null;

if (!scroll_it_again && Scroll_Direction=="Top"){
scoMB_btnT.style.display = "none";
qDoc.scroller = 0;
}
else null;
if(scroll_it_again){
eval("qWin.timerID = setTimeout(\"qssMenuDropScroll_it('"+Scroll_Direction+"',"+Scroll_Active+",'"+Scroll_qnumber+"');\",250)");
}
else null; // mac ie needs to check for timerid sometimes and maybe some others browser too when menu is a tiny scroll to go

}

function qssMenuDropScroll_mousemove(elm){
var evt = (elm)? elm : top.event; // qWin.event; this may be needed for windows ie and other browser and added of course to the mix
qssGetPosAll(evt, this); // this function produces and sets the positioning cords var for the scroll buttons
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
//qBodyElm.appendChild(txNode("structueArray ||"+ qtdnStackSiteC.innerHTML));
//addHrSeperator();
//qBodyElm.appendChild(txNode("qBodyTable ||"+ qGBID('qBodyTable').innerHTML));
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
var d0 = qDoc.createElement('div'); // start by creating a box for each group of menus
d0.innerHTML = "uniTestBtn";
d0.onclick = qssResizeLayout;
var beforeHere =  qDocBody;
if(qDocBody.hasChildNodes()){
beforeHere = beforeHere.firstChild;
qDocBody.insertBefore(d0,beforeHere);
}
else{ qDocBody.appendChild(d0);
}
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
// create a hidden element  on top of the document to place a elm to test it size every 2 seconds
// NOTE a width of 100% and display:table Might be able to detect qWin.onresize
//alert(qDoc.body.offsetWidth);
var qdiv0 = qDoc.createElement('div'); 
qdiv0.id = "qsizeBox";
qdiv0.style.position="absolute";
qdiv0.style.top="-9999px";
(qDocBody.firstChild)? qDocBody.insertBefore(qdiv0,qDocBody.firstChild) : qGBID("qBody").appendChild(qdiv0);
//widthway
qdiv0.style.width = "1px";
qdiv0.style.height = "1px";// ns7.2- needs a height set, otherwise it reads out 0 for isStandardBoxMode
qdiv0.style.paddingRight="1px";
qWin.isStandardBoxMode = (parseInt(qdiv0.offsetWidth) == 2)? 1 : 0;
qdiv0.innerHTML="X<br />X";
qdiv0.style.paddingRight="0px";
qdiv0.style.width = "100%";
qdiv0.style.height = "auto";
qdiv0.style.fontSize="100%";
*/
/*
function qssMenuDrop_close(menubox_id, menubox_level,objsNumber){
//NEEDSWORK needs cleaning an pan out effects 
// note LastUsed_MenuBoxes_qNum may need to be used when going to different jumps on menu boxes
MenuEventTestLUBL("CloseMenBox1",LastUsed_Btn_Lvel);//4Testing

// cseMB stands for "closemenubox"
var cseMB_select = qGBID("q" + objsNumber + menubox_id.substring(menubox_id.lastIndexOf("i")) + "m"); // this is the openmenu 
//alert(cseMB_select.id);
//alert(menubox_id.substring(menubox_id.lastIndexOf("i")));
//c0var cseMB_holder = cseMB_select.parentNode;
//c0035// var cseMB_btnB = cseMB_holder.previousSibling;
//c0035// var cseMB_btnT = cseMB_btnB.previousSibling;
var cseMB_outer = qGBID("q"+objsNumber+"bodymen"+ (menubox_level + 1));
//var cseMB_outerClass = cseMB_outer.clasName;
eval("qWin.LastM"+menubox_level+"="+0); // this normally holds the id of a button for that level, but it now needs to be zeroed out to false
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
*/
/*

var buildTimeNum = 0;

function qssBuildLayout(){
qDocBody =	qDoc.getElementsByTagName('BODY')[0];
// needed qDoc. what ever could be added to the function instead ie buildTime.buildTimeSeconds
if(buildTimeNum == 0){
buildTimeNum = 1;
qDoc.buildTimeSeconds = 0; //allow time to increase on each pass. so far op7.5 windows needed this 
qDoc.buildTimeTrys = 0; // max of time it can try, then it should dump a failed screen browser error 
}

//alert("buildTimeNum:"+ buildTimeNum + " start:"+ qDoc.buildTimeSeconds);
var xElm = qGBID("stacksitejsB");
var xElmTest =xElm &&xElm.className&&xElm.className=="part"+buildTimeNum&&qGBID("qBody");
//NOTE it should be set at 80 insteat of 8 which is for testing
if(qDoc.buildTimeTrys<8&& xElmTest&&eval("qssBuildLayoutPart"+buildTimeNum+"();")){
//alert("buildTimeNum:"+ buildTimeNum + " if:"+ qDoc.buildTimeSeconds);
buildTimeNum++;
xElm.className = "part"+buildTimeNum;
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
// it's for the build two function, to turn on an appended table placed in a body element, not using it anymore but I'll keep it around for a little bit more because createDocumentFragment works much better
var t = qGBID("qBodyTable");
if(t){
/// The following is a fix to get ride of  is_ie in the t.style.display = (is_ie)? "block" : "table"; // ie+? crashes on block and its the only browser that understands display:block on a table element. The following is the fix. ie removes the display altogether because it does not understand display:table. All others change it, accept op7.5+? which keeps the "none" value. So the fix for op7.5+? is to test for "none" and use style.display=table
t.style.cssText  = t.style.cssText.replace("none","");//.replace("none","") Works too
(t.style.display=="none")? t.style.display="" : null; //op7.5+? // display="table" Works too
// t.style.display = (is_ie)? "block" : "table"; 
}
*/