// const urlParams = new URLSearchParams(window.location.search);
// const a=urlParams.get('hello');
// console.log('2x',a);
var charid=1009368;
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
var series=-1;
var comics=-1;
var stories=-1;
async function singlechar(){
   // console.log('')
    const url=`http://gateway.marvel.com/v1/public/characters/${charid}?ts=${ts}&apikey=${pub}&hash=${hash}`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        // console.log('indiv',data);
        char=data.data.results[0];
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
async function charseries(){
    //console.log('')
    const url=`http://gateway.marvel.com/v1/public/characters/${charid}/series?ts=${ts}&apikey=${pub}&hash=${hash}&limit=3`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        // console.log('indiv',data);
        series=data.data.results;
        //console.log('series',series)
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
charseries()
async function charcomics(){
   // console.log('')
    const url=`http://gateway.marvel.com/v1/public/characters/${charid}/comics?ts=${ts}&apikey=${pub}&hash=${hash}&limit=3`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        // console.log('indiv',data);
        comics=data.data.results;
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
charcomics();
var c=[]
function helper(a){
    //console.log('aaa',a);
    c.push(a);
    //console.log('c',c)
}
async function getimage(storyid){
    const url=`http://gateway.marvel.com/v1/public/stories/${storyid}/comics?ts=${ts}&apikey=${pub}&hash=${hash}&limit=3`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
       //console.log('story ki comics',data.data.results[0].thumbnail.path)
        helper(data.data.results[0].thumbnail.path);
    })
}
async function charstories(){
   // console.log('')
    const url=`http://gateway.marvel.com/v1/public/characters/${charid}/stories?ts=${ts}&apikey=${pub}&hash=${hash}&limit=3`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        // console.log('indiv',data);
        stories=data.data.results;
        //console.log('stories',stories)
        var storiesimgpaths=[];
        var storiestitles=[];
        var length=0;
        for(obj of stories){
            storiestitles.push(obj.title);
            var storyid=obj.id;
            console.log('storyid',storyid)
            getimage(storyid)
            //console.log('ccccccc',c)
            setTimeout(function(){
                //console.log('c',c)
            },1000)
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
         
        },1000)
    })
}
charstories();