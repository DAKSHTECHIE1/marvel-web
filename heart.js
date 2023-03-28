var fav= JSON.parse(localStorage.fav);
async function heartt(str,len){
    var icon=document.getElementsByClassName('heart');
    // console.log(icon.length)
   // console.log('icon',icon);
    if(str=='init'){
        //ok
    }
    if(str=='search'){
        var iconer=[];
        for(var f=0;f<len;f++){
            iconer.push(icon[f]);
        }
        icon=iconer;
    }
   // console.log('iconer',icon)
    for(obj of icon){
       // console.log('clickerrr')
       // console.log(obj.getAttribute('data-lol'))
        obj.addEventListener('click',function(event){
            console.log('clickeddd');
            var id=event.target.id;
            // console.log(id);
            var dabbar=document.getElementsByClassName(`${id}`);
            console.log('dabber',dabbar)
            var min=1;
            var dabba=dabbar[0];
            if(dabbar.length==2){
                var dumb=dabbar[1];
                min=2;
            }
            for(var l=0;l<min;l++){
                // console.log('dabba',dabbar[l].classList[0]);
                var heart='empty';
                for(var h=0;h<4;h++){
                    if(dabbar[l].classList[h]=='fa-solid')
                    {
                        heart='filled';
                        break;
                    }
                }
                if(heart=='empty'){
                    dabbar[0].classList.remove('fa-regular');
                    if(min==2){
                        dabbar[1].classList.remove('fa-regular');
                        dabbar[1].classList.add('fa-solid');
                    }
                    
                    dabbar[0].classList.add('fa-solid');
                    fav.push(id);
                    console.log('fav',fav)
                    // console.log('favvv',fav)
                  
                    //remove from fav
                    abc(fav); 
                    break;

                }
                else{
                    var index=fav.indexOf(id);
                    fav.splice(index,1);
                    dabbar[0].classList.remove('fa-solid');
                    dabbar[0].classList.add('fa-regular');
                    if(min==2){
                        dabbar[1].classList.remove('fa-solid');
                        dabbar[1].classList.add('fa-regular');
                    }
                    console.log('fav',fav)
                    abc(fav); 
                    break;
                    // console.log('favvv',fav)
                }
            }
          
        })
    }
}