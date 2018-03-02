console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML="new value";
var marginLeft=0;
var img=document.getElementById('madi');
function moveRight(){
    marginLeft+=10;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
    var interval=setInterval(moveRight,50);
};
