var windowWidth, windowHeight;

window.addEventListener('resize', getWindowSize);
window.addEventListener('load', getWindowSize);
function getWindowSize(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    er((dc('left-nav').offsetWidth/windowWidth));
   
}
//helper functions
function doc(id){
    return document.getElementById(id);
}

function dc(className){
    return document.getElementsByClassName(className)[0];
}

function er(msg){
    console.log(msg);
}

function animate({timing, draw, duration}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      // calculate the current animation state
      let progress = timing(timeFraction)
      
      draw(progress); // draw it
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
  }

doc('side-hamburger').addEventListener('click', sideNavAnimate);
function sideNavAnimate(){
    var self = this;
    animate({
        duration: 1500,
        timing: function(timeFraction) {
            var val = (1/(1+Math.exp(-(30*timeFraction-5))));
            if(doc('side-hamburger').checked == true)
                return val;
            else
                return 1 - val;
        },
        draw: function(progress) {
            
            if(windowWidth>767){
                
                dc('left-nav').style.width = 20*progress + '%';  
                if(self.checked)
                    dc('main').style.width = (100 - (20*progress)) + '%';
                else
                    dc('main').style.width = (80 + 15*(1-progress)) + '%';
            }else{
                    dc('left-nav').style.height = 50*progress + '%';   
                }
                var angle = Math.round(progress*180);
            
                doc('hamburger-icon').style.transform = 'rotate('+(angle)+'deg)';
                
        }
    });
}

var radioArray = document.getElementsByClassName("inv-radio")
for(var item in radioArray){
    if(radioArray[item].id)
            radioArray[item].addEventListener('change', function(){
            er(this.id)
        })
}
