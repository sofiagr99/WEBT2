var pic=document.querySelectorAll('.center__image');
  var button=document.querySelector('.interaction__glasstouch');
  var text=document.querySelectorAll('.interaction__caracteristic');
  var count=0;
  
  
  
  



setInterval(SwitchPic,4000);

button.addEventListener('click',Information);

function Information(){
    console.log('holi');
    for(var i=0;i<text.length;i++){
        text[i].style.opacity=1;
    }
    
    setInterval(hideTexts,10000);
    
    
}

function hideTexts(){
    for(var i=0;i<text.length;i++){
        text[i].style.opacity=0;
    }
}

function SwitchPic() {
    switch(count){
        case 0:
        pic[count].style.opacity=0;
        pic[count+1].style.opacity=1;
        pic[count+2].style.opacity=0;
        break;
        case 1:
        console.log('xd');
        pic[count+1].style.opacity=1;
        pic[count].style.opacity=0;
        pic[count-1].style.opacity=0;
        
        break;
        case 2:
        pic[count-2].style.opacity=1;
        pic[count].style.opacity=0;
        pic[count-1].style.opacity=0;
        break;
        
        
    }
    console.log(count);
    
    count++;
    console.log(count);
    
    if(count>2){
        count=0;
    }
    console.log(count);
    
    
    
}