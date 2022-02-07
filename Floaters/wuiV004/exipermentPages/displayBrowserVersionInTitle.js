showBrowserVer();

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