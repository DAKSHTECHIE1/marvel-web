
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
// async function heartt(str,len){
//     var icon=document.getElementsByClassName('heart');
//     // console.log(icon.length)
//     console.log('icon',icon);
//     if(str=='init'){
//         //ok
//     }
//     else{
//         var iconer=[];
//         for(var f=0;f<len;f++){
//             iconer.push(icon[f]);
//         }
//         icon=iconer;
//     }
//     console.log('iconer',icon)
//     for(obj of icon){
//         console.log('clickerrr')
//         console.log(obj.getAttribute('data-lol'))
//         obj.addEventListener('click',function(event){
//             console.log('clickeddd');
//             var id=event.target.id;
//             // console.log(id);
//             var dabbar=document.getElementsByClassName(`${id}`);
//             console.log('dabber',dabbar)
//             var min=1;
//             var dabba=dabbar[0];
//             if(dabbar.length==2){
//                 var dumb=dabbar[1];
//                 min=2;
//             }
//             for(var l=0;l<min;l++){
//                 // console.log('dabba',dabbar[l].classList[0]);
//                 var heart='empty';
//                 for(var h=0;h<4;h++){
//                     if(dabbar[l].classList[h]=='fa-solid')
//                     {
//                         heart='filled';
//                         break;
//                     }
//                 }
//                 if(heart=='empty'){
//                     dabbar[0].classList.remove('fa-regular');
//                     if(min==2){
//                         dabbar[1].classList.remove('fa-regular');
//                         dabbar[1].classList.add('fa-solid');
//                     }
                    
//                     dabbar[0].classList.add('fa-solid');
//                     fav.push(id);
//                     console.log('fav',fav)
//                     // console.log('favvv',fav)
                  
//                     //remove from fav
//                     break;
//                 }
//                 else{
//                     var index=fav.indexOf(id);
//                     fav.splice(index,1);
//                     dabbar[0].classList.remove('fa-solid');
//                     dabbar[0].classList.add('fa-regular');
//                     if(min==2){
//                         dabbar[1].classList.remove('fa-solid');
//                         dabbar[1].classList.add('fa-regular');
//                     }
//                     console.log('fav',fav)
//                     break;
//                     // console.log('favvv',fav)
//                 }
//             }
//         })
//     }
// }
async function initiallist(){
    var arr=['Iron Man/Tony Stark (MAA)','Hulk/Bruce Banner (MAA)','Captain America/Steve Rogers (MAA)','Black Widow/Natasha Romanoff (MAA)','Thor']
    for(var i=0;i<5;i++){
        const url=`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${public}&hash=${hash}&nameStartsWith=${arr[i]}`
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
        list=document.getElementById('list');
        var item=document.createElement('div')
        item.setAttribute('class','item');
        item.innerHTML=`    
                                <div class='left-item'>
                                </div>
                                <div class='right-item'>
                                    <div class='item-head'> </div>
                                    <div class='item-desc'></div>
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
    const url=`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${public}&hash=${hash}&nameStartsWith=${name.value}&limit=3`
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
            item.innerHTML=`
                                <div class="left-search"></div>      
                                <div class="right-search">
                                    <div class="naam">
                                   </div>
                                    <div class='chitra'></div>
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
    const url=`http://gateway.marvel.com/v1/public/characters/1009664?ts=${ts}&apikey=${public}&hash=${hash}`
    const response=await fetch(url);
    var info=response.json();
    info.then((data)=>{
        // console.log('indiv',data);
        search=data.data.results;

    })
}
// single();
document.querySelector("#name").addEventListener("input", function(event){
    searchlist(event);
});