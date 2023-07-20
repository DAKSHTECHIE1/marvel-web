
const currentDate = new Date(); 
const ts = currentDate. getTime(); 
const public='8de8808be04038428a605f87e6285901';
const private='6631b0448af8d6b136886c3d869c35b9906171ce';
var hash = md5(ts+private+public).toString();
//array of objects
//var fav=[];
var intel=[];
var search=-1;
var initialid=[1017104,1017107,1017105,1017109];

async function initiallist(){
    var arr=['Iron Man','Hulk','Captain America/Steve Rogers (MAA)','Black Widow']
    for(var i=0;i<5;i++){
        const url=`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${public}&hash=${hash}&nameStartsWith=${arr[i]}`
        const response=await fetch(url);
        var info=response.json();
        info.then((data)=>{
            intel.push(data.data.results[0]);
        })
         
    }
    var name=[];
    var desc=['Tony Stark is the genius billionaire owner of Stark Industries. With his high-tech Iron Man suit, he is practically indestructible.',
     'Scientist Bruce Banner was transformed into the Hulk due to gamma radiation exposure. Hulk is the strongest hero in the Marvel Universe!',          
     'During World War II, Steve Rogers enlisted in the military and was injected with a serum that turned him into super-soldier Captain America!',
     'Black Widow Natasha Romanoff, also known as Black Widow, is a world-renowned super spy and one of S.H.I.E.L.D.s top agents'];
    var imgpath=[];
    var charid=[];
    // console.log('intel',intel);
    // console.log('1111322323',intel[4])
    for(obj of intel){
        name.push(obj.name.split('/')[0]);
        imgpath.push(obj.thumbnail.path+'/standard_medium.jpg');
        charid.push(obj.id);
        // console.log('charid',charid);
        var list=document.getElementById('list');
        var item=document.createElement('div')
        item.setAttribute('class','item');
        item.setAttribute('id',`${obj.id}`)
        item.addEventListener('click',function(event){
            console.log('data-lol',event.target.dataset.lol)
            console.log('idddd',event.target);
            if(event.target.dataset.lol=='init'){
                console.log('111111111111111111111')
                event.stopPropagation();
                return;
            }
            else
            {
                window.location.href=`./index2.html?hello=${event.target.id}`;
            }
        })
        item.innerHTML=`    
                                <div class='left-item' id=${obj.id}>
                                </div>
                                <div class='right-item' id=${obj.id}>
                                    <div class='item-head' id=${obj.id} > </div>
                                    <div class='item-desc' id=${obj.id}></div>
                                </div>
                        `
        list.append(item);
    }
    // let newww=desc[0].split['.'][0];
    // console.log('cid',charid);
    for(var k=0;k<4;k++){
        var object=document.getElementsByClassName('left-item');
        object[k].style.backgroundImage=`url(${imgpath[k]})`;
        object=document.getElementsByClassName('item-head');
        var index=fav.indexOf(charid[k].toString());
        if(index==-1){
            console.log('not fav')
            object[k].innerHTML=`${name[k]} <i class="fa-regular fa-heart heart ${charid[k]}" id='${charid[k]}' data-lol='init' ></i>`
        }
        else{
            console.log(' fav')
            object[k].innerHTML=`${name[k]} <i class="fa-solid fa-heart heart ${charid[k]}" id='${charid[k]}' data-lol='init'></i>`
        }
        // object[k].innerHTML=`${name[k]} <i class="fa-regular fa-heart heart ${charid[k]}" id='${charid[k]}' data-lol='init'></i>`;
        object=document.getElementsByClassName('item-desc');
        object[k].innerText=`${desc[k]}`;
    }  
    heartt('init');

}
initiallist();
async function searchlist(e){
    var naam=[];
    var imgpath=[];
    var charid=[];
    // e.preventDefault();
    console.log('kakkakakka')
    // var name='da';
    var name=document.getElementById('name')
    if(name.value==''){
        const boxes = document.querySelectorAll('.search-item');

        boxes.forEach(box => {
        box.remove();
        });
    //    initiallist();
    heartt('search',0)
        return;
    }
    const url=`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${public}&hash=${hash}&nameStartsWith=${name.value}&limit=3`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        console.log(data.data.results);
        search=data.data.results;
        const boxes = document.querySelectorAll('.search-item');

        boxes.forEach(box => {
        box.remove();
        });
        var length=0;
        for(let obj of search){
            naam.push(obj.name);
            imgpath.push(obj.thumbnail.path+'/standard_medium.jpg');
            charid.push(obj.id);
            let heart='unfilled';
            list=document.getElementById('search-list');
            var item=document.createElement('div')
            item.setAttribute('class','search-item');
            item.setAttribute('id',`{obj.id}`)
            item.addEventListener('click',function(event){
                console.log('idddd',event.target);
                if(event.target.dataset.lol=='search'){
                    event.stopPropagation();
                    return;
                }
                window.location.href=`./index2.html?hello=${event.target.id}`;
               
            })
            item.innerHTML=`
                                <div class="left-search" id=${obj.id}></div>      
                                <div class="right-search" id=${obj.id}>
                                    <div class="naam" id=${obj.id}>
                                    </div>
                                    <div class='chitra' id=${obj.id}>
                                    </div>
                                </div>     
            
                            `
            list.append(item);
            length++;
            console.log('andarararrarara');
        }
        console.log('length',length);
        for(let k=0;k<length;k++){
            var object=document.getElementsByClassName('left-search');
            object[k].style.backgroundImage=`url(${imgpath[k]})`;
            object=document.getElementsByClassName('naam');
            object[k].innerHTML=`${naam[k]} `;
            object=document.getElementsByClassName('chitra');
            var index=fav.indexOf(charid[k].toString());
            console.log('index',index,'favour',fav,'charid',charid[k])
            if(index==-1){
                console.log('not fav')
                object[k].innerHTML=`<i class="fa-regular fa-heart heart ${charid[k]}" id='${charid[k]}' data-lol='search' ></i>`
            }
            else{
                console.log(' fav')
                object[k].innerHTML=`<i class="fa-solid fa-heart heart ${charid[k]}" id='${charid[k]}' data-lol='search'></i>`
            }
       }
      heartt('search',length);
    //   initiallist();
    })


}
async function single(){
    console.log('')
    const url=`https://gateway.marvel.com/v1/public/characters/1009664?ts=${ts}&apikey=${public}&hash=${hash}`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        // console.log('indiv',data);
        search=data.data.results;

    })
}
// single();
var searcher=document.getElementById('search-list');
document.querySelector("#name").addEventListener("input", function(event){
    if(searcher.style.display=='none'){
        searcher.style.display='block';
    }
    searchlist(event);
});
document.addEventListener('click',function(){
    searcher.style.display='none'
})