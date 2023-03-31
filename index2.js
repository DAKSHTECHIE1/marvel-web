const urlParams = new URLSearchParams(window.location.search);
const a=urlParams.get('hello');
console.log('2x',a);
var charid=a;
//console.log('fav index2',JSON.parse(localStorage.fav));
var fav=JSON.parse(localStorage.fav);
var index=fav.indexOf(charid.toString());
//console.log(index);
const currentDate = new Date(); 
const ts = currentDate.getTime(); 
const pub='8de8808be04038428a605f87e6285901';
//d7fc6cb16fa8dfb4551daca6d33634cd
//8de8808be04038428a605f87e6285901
const priv='6631b0448af8d6b136886c3d869c35b9906171ce';
//efa2fcf6a9375775e844c0ef12289756d7eb367b
//6631b0448af8d6b136886c3d869c35b9906171ce
var hash = md5(ts+priv+pub).toString();
var char=-1;
// var series=[];
// var comics=[];
// var stories=[];
var totalstories=-1;
var totalseries=-1;
var totalcomics=-1;
var comicslength=-1;
var storieslength=-1;
var serieslength=-1;
async function singlechar(){
   // console.log('')
    const url=`https://gateway.marvel.com/v1/public/characters/${charid}?ts=${ts}&apikey=${pub}&hash=${hash}`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        // console.log('indiv',data);
        char=data.data.results[0];
        console.log('char',char);
        totalcomics=char.comics.available;
        if(totalcomics<30){
            comicslength=totalcomics;
        }
        else{
            comicslength=30;
        }
        totalstories=char.stories.available;
        if(totalstories<30){
            storieslength=totalstories;
        }
        else{
            storieslength=30;
        }
        totalseries=char.series.available;
        if(totalseries<30){
            serieslength=totalseries;
        }
        else{
            serieslength=30;
        }
        //console.log('char',char)
        var imgpath=char.thumbnail.path+'/standard_large.jpg'
        var pic=document.getElementById('char-pic');
        pic.style.backgroundImage=`url(${imgpath})`
        var name=document.getElementById('char-name');
        if(index==-1){
           // console.log('index',index,'nananabaab')
            name.innerHTML=`${char.name}  <i class="fa-regular fa-heart heart ${charid}" id='${charid}' data-lol='init' ></i> `;
        }else{
            name.innerHTML=`${char.name}  <i class="fa-solid fa-heart heart ${charid}" id='${charid}' data-lol='init' ></i> `;
        }
        heartt('init')
    })

}
singlechar()












var left=document.getElementById('series-left');
left.style.visibility='hidden';
var right=document.getElementById('series-right');
right.style.visibility='hidden';
async function charseries(start,end){
    var series=[];
    const boxes = document.querySelectorAll('.series-item');
    boxes.forEach(box => {
    box.remove();
    });
    if(end==-1){
        return;
    }
    var left=document.getElementById('series-left');
    left.style.visibility='visible';
    var right=document.getElementById('series-right');
    right.style.visibility='visible';
    if(start==0){//ok
        left.style.visibility='hidden';
    }//ok
    if(end==serieslength-1){//ok
        right.style.visibility='hidden';
    }
    const url=`https://gateway.marvel.com/v1/public/characters/${charid}/series?ts=${ts}&apikey=${pub}&hash=${hash}&limit=30`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        var seriesa=data.data.results;
        for(let i=start;i<=end;i++){
            series.push(seriesa[i]);
        }//ok
        var seriesimgpaths=[];
        var seriestitles=[];
        var length=0;
        for(obj of series){
            seriesimgpaths.push(obj.thumbnail.path+'/standard_xlarge.jpg')
            seriestitles.push(obj.title);
            var list=document.getElementById('series-list');
            var item=document.createElement('div');
            item.classList.add('item');
            item.classList.add('series-item');
            item.innerHTML=`
                                <div class="series-image image"></div>
                                <div class="series-title title"></div>
                            `
            list.append(item);
            length++;
        }
        //console.log(seriesimgpaths);
        //console.log(seriestitles);
        for(var i=0;i<length;i++){
            var image=document.getElementsByClassName('series-image');
            //console.log('img',image[i])
            image[i].style.backgroundImage=`url('${seriesimgpaths[i]}')`
            var title=document.getElementsByClassName('series-title');
            //console.log('title',title);
            title[i].innerHTML=`${seriestitles[i]}`;
        }
    })
}
var gstartseries=-1;
var gendseries=-1;
setTimeout(function(){
    console.log('kk',serieslength)
    if(serieslength>3){
        console.log('kkkk')
        charseries(0,2);
        gstartseries=0;
        gendseries=2;
    }
    else{
        charseries(0,serieslength-1);
    }
},600)
function leftarrowseries(){
    console.log('leftftftftfttftf')
    gendseries=gstartseries-1;//ok
    gstartseries=gstartseries-3;//ok
    charseries(gstartseries,gendseries);
}
function rightarrowseries(){
    console.log('righttttttt')
    if(gendseries+3>serieslength-1){
        gendseries=serieslength-1;
    }
    else{
        gendseries=gendseries+3;
    }
    gstartseries=gstartseries+3;
    charseries(gstartseries,gendseries);
}









var left=document.getElementById('comics-left');
left.style.visibility='hidden';
var right=document.getElementById('comics-right');
right.style.visibility='hidden';
async function charcomics(start,end){
    var comics=[];
    const boxes = document.querySelectorAll('.comics-item');
    boxes.forEach(box => {
    box.remove();
    });
    if(end==-1){
        return;
    }
    var left=document.getElementById('comics-left');
    left.style.visibility='visible';
    var right=document.getElementById('comics-right');
    right.style.visibility='visible';
    if(start==0){//ok
        left.style.visibility='hidden';
    }//ok
    if(end==comicslength-1){
        right.style.visibility='hidden';
    }
   // console.log('')
    const url=`https://gateway.marvel.com/v1/public/characters/${charid}/comics?ts=${ts}&apikey=${pub}&hash=${hash}&limit=50`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        // console.log('indiv',data);
        var comicsa=data.data.results;
        for(let i=start;i<=end;i++){
            comics.push(comicsa[i]);
        }
        //console.log('comics',comics)
        var comicsimgpaths=[];
        var comicstitles=[];
        var length=0;
        for(obj of comics){
            comicsimgpaths.push(obj.thumbnail.path+'/standard_xlarge.jpg')
            comicstitles.push(obj.title);
            var list=document.getElementById('comics-list');
            var item=document.createElement('div');
            item.classList.add('item');
            item.classList.add('comics-item');
            item.innerHTML=`
                                <div class="comics-image image"></div>
                                <div class="comics-title title"></div>
                            `
            list.append(item);
            length++;
        }
        //console.log(comicsimgpaths);
       // console.log(comicstitles);
        for(var i=0;i<length;i++){
            var image=document.getElementsByClassName('comics-image');
            //console.log('img',image[i])
            image[i].style.backgroundImage=`url('${comicsimgpaths[i]}')`
            var title=document.getElementsByClassName('comics-title');
            //console.log('title',title);
            title[i].innerHTML=`${comicstitles[i]}`;
        }
    })
}
var gstartcomics=-1;
var gendcomics=-1;
setTimeout(function(){
    console.log('kk',comicslength)
    if(comicslength>3){
        console.log('kkkk')
        charcomics(0,2);
        gstartcomics=0;
        gendcomics=2;
    }
    else{
        charcomics(0,comicslength-1);
    }
},600)
function leftarrowcomics(){
    console.log('leftftftftfttftf')
    gendcomics=gstartcomics-1;//ok
    gstartcomics=gstartcomics-3;//ok
    charcomics(gstartcomics,gendcomics);
}
function rightarrowcomics(){
    console.log('righttttttt')
    if(gendcomics+3>comicslength-1){
        gendcomics=comicslength-1;
    }
    else{
        gendcomics=gendcomics+3;
    }
    gstartcomics=gstartcomics+3;
    charcomics(gstartcomics,gendcomics);
}











var c=[]//ok
function helper(a){
    //console.log('aaa',a);
    c.push(a);//ok
    //console.log('c',c)
}
async function getimage(storyid){//ok
    const url=`https://gateway.marvel.com/v1/public/stories/${storyid}/comics?ts=${ts}&apikey=${pub}&hash=${hash}&limit=1`
    const response=await fetch(url);
    var info=response.json();//okkkk
    info.then((data)=>{
       //console.log('story ki comics',data.data.results[0].thumbnail.path)
        helper(data.data.results[0].thumbnail.path);//ok
    })
}//okkkkkkkk
var left=document.getElementById('stories-left');
left.style.visibility='hidden';
var right=document.getElementById('stories-right');
right.style.visibility='hidden';
async function charstories(start,end){
    c=[];
    var stories=[];
    const boxes = document.querySelectorAll('.stories-item');
    boxes.forEach(box => {
    box.remove();
    });
    if(end==-1){
        return;
    }
    var left=document.getElementById('stories-left');
    left.style.visibility='visible';
    var right=document.getElementById('stories-right');
    right.style.visibility='visible';
    if(start==0){//ok
        left.style.visibility='hidden';
    }//ok
    if(end==storieslength-1){//ok
        right.style.visibility='hidden';
    }
    const url=`https://gateway.marvel.com/v1/public/characters/${charid}/stories?ts=${ts}&apikey=${pub}&hash=${hash}&limit=30`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        var storiesa=data.data.results;
        for(let i=start;i<=end;i++){
            stories.push(storiesa[i]);
        }//ok
        var storiesimgpaths=[];
        var storiestitles=[];
        var length=0;
        for(obj of stories){
            storiestitles.push(obj.title);
            var storyid=obj.id;
            console.log('storyid',storyid)
            getimage(storyid)
            //console.log('ccccccc',c)
            // setTimeout(function(){
            //     //console.log('c',c)
            // },1000)
        }
        setTimeout(function(){
             //console.log('iii',storiestitles)
            for(o of c){
                storiesimgpaths.push(o+'/standard_xlarge.jpg');
                var list=document.getElementById('stories-list');
                var item=document.createElement('div');
                item.classList.add('item');
                item.classList.add('stories-item');
                item.innerHTML=`
                                    <div class="stories-image image"></div>
                                    <div class="stories-title title"></div>
                                `
                list.append(item);
                length++;
            }
           console.log('l',length)
           for(var i=0;i<length;i++){
            var image=document.getElementsByClassName('stories-image');
            //console.log('img',image[i])
            image[i].style.backgroundImage=`url('${storiesimgpaths[i]}')`
            var title=document.getElementsByClassName('stories-title');
            //console.log('title',title);
            title[i].innerHTML=`${storiestitles[i]}`;
        }
         
        },600)
    })
}
var gstartstories=-1;
var gendstories=-1;
setTimeout(function(){
    console.log('kk',storieslength)
    if(storieslength>3){
        console.log('kkkk')
        charstories(0,2);
        gstartstories=0;
        gendstories=2;
    }
    else{
        charstories(0,storieslength-1);
    }
},600)
function leftarrowstories(){
    console.log('leftftftftfttftf')
    gendstories=gstartstories-1;//ok
    gstartstories=gstartstories-3;//ok
    charstories(gstartstories,gendstories);
}
function rightarrowstories(){
    console.log('righttttttt')
    if(gendstories+3>storieslength-1){
        gendstories=storieslength-1;
    }
    else{
        gendstories=gendstories+3;
    }
    gstartstories=gstartstories+3;
    charstories(gstartstories,gendstories);
}//ok
//done
