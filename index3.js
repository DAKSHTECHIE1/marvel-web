var fav=JSON.parse(localStorage.fav);
console.log('fav',fav);
const currentDate = new Date(); 
const ts = currentDate.getTime(); 
const pub='8de8808be04038428a605f87e6285901';
//d7fc6cb16fa8dfb4551daca6d33634cd
//8de8808be04038428a605f87e6285901
const priv='6631b0448af8d6b136886c3d869c35b9906171ce';
//efa2fcf6a9375775e844c0ef12289756d7eb367b
//6631b0448af8d6b136886c3d869c35b9906171ce
var hash = md5(ts+priv+pub).toString();
var left=document.getElementById('left-icon');
left.style.visibility='hidden';
var right=document.getElementById('right-icon');
right.style.visibility='hidden';
async function favlist(start,end){
    var intel=[];
    console.log('start',start)
    console.log('end',end)
    const boxes = document.querySelectorAll('.item');
    //saare item vle delete ho rahe honge!!!!!
    boxes.forEach(box => {
    box.remove();
    });
    if(end==-1){
        return;
    }
    var left=document.getElementById('left-icon');
    left.style.visibility='visible';
    var right=document.getElementById('right-icon');
    right.style.visibility='visible';
    if(start==0){
        left.style.visibility='hidden';
    }
    if(end==fav.length-1){
        right.style.visibility='hidden';
    }
   for(var i=start;i<=end;i++){
        const url=`http://gateway.marvel.com/v1/public/characters/${parseInt(fav[i])}?ts=${ts}&apikey=${pub}&hash=${hash}`
        const response=await fetch(url);
        var info=response.json();
        info.then((data)=>{
            intel.push(data.data.results[0]);//ok
           
        })
    }
   
    var name=[];
    var imgpath=[];
    setTimeout(function(){
        console.log('intel',intel);
        for(obj of intel){
            name.push(obj.name);
            imgpath.push(obj.thumbnail.path+'/portrait_medium.jpg');//ok
            list=document.getElementById('fav-list');
            var item=document.createElement('div')
            item.setAttribute('class','item');
            item.innerHTML=`
                                <div class="left-item"></div>
                                <div class="right-item">
                                    <div class="char-name"></div>
                                    <div class="char-info"></div>
                                    <div class="dil"></div>
                                </div>
                            `
            list.append(item);
        }
        var length=end -start+1;
        for(var k=0;k<length;k++){
            var object=document.getElementsByClassName('left-item');
            object[k].style.backgroundImage=`url(${imgpath[k]})`;
            object=document.getElementsByClassName('char-name');
            object[k].innerHTML=`${name[k]}`;
            object=document.getElementsByClassName('char-info');
            object[k].innerHTML=`More info`;
            object=document.getElementsByClassName('dil');
            object[k].innerHTML=`<i class="fa-solid fa-heart heart ${parseInt(fav[start+k])}" id='${parseInt(fav[start+k])}' data-lol='init' data-visited='false'></i>`
        } 
        //heart ke liye
        var hearts=document.getElementsByClassName('heart');
        var icon=[];
        var idlist=[];
        for(k=0;k<length;k++){
           console.log( hearts[k].dataset.visited)
           if(hearts[k].dataset.visited=='false'){
                icon.push(hearts[k]);
                idlist.push(parseInt(hearts[k].id))
                hearts[k].dataset.visited='true';
           }
        }
        //console.log('idlist',idlist)
        var len=icon.length;
        for(var i=0;i<len;i++){
            icon[i].addEventListener('click',function(event){
                console.log('kkkkk');
                var id=event.target.id;
                console.log('id',id)
                // console.log('id',obj.id) listener baad mai call hoga isliye tab tak obj.id last vli hogyi hogi
                var index=fav.indexOf(id)
                var totallists=parseInt(fav.length/3);
                if(fav.length % 3!=0){
                    totallists++;
                }
                console.log('tl',totallists);
                var currlistnum=parseInt((index+1)/3);
                if(index+1%3!=0){
                    currlistnum++;
                }
                if(currlistnum==totallists){
                    //lst list hai
                    var en=end-1;
                    if(start==end){
                        var st=start-3;
                    }
                    else{
                        var st=start;
                    }
                }
                else{
                    var st=start;
                    var en=end;
                }
                fav.splice(index,1);
                favlist(st,en);
                abc(fav);
            })
        }



        
    },100)
}
if(fav.length>3){
    favlist(0,2);
    var gstart=0;
    var gend=2;
}
else{
    favlist(0,fav.length-1);
}
function leftarrow(){
    console.log('leftftftftfttftf')
    gend=gstart-1;//ok
    gstart=gstart-3;//ok
    favlist(gstart,gend);
}
function rightarrow(){
    console.log('righttttttt')
    if(gend+3>fav.length-1){
        gend=fav.length-1;
    }
    else{
        gend=gend+3;
    }
    gstart=gstart+3;
    favlist(gstart,gend);
}





// var left=document.getElementById('left-icon')








