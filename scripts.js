/* Get Our Elements */ 
//player :"over all card"
const player = document.querySelector(".player");
// video:"video tag"
const video = player.querySelector(".viewer");
// progress:"progress div"
const progress = player.querySelector(".progress");
//progress_filled:"div with progress filled"
const progressBar = player.querySelector(".progress__filled");
//toggle:"button toggle"
const toggle = player.querySelector(".toggle");
//data-skip:"skip backword and forward"
const skipButtons = player.querySelectorAll("[data-skip]");
//player-slider:"slide the range"
const ranges = player.querySelectorAll(".player__slider");

/* build out functions */
function togglePlay(){
    const method=video.paused ? 'play' : 'pause';
    // console.log(method);/    
    video[method]();
    
}
function updateButton(){ 
    const icon = this.paused ? "►" : "❚ ❚";
    console.log(icon);
    toggle.textContent = icon; // changing the icon play or pause
    //textContent or innerText both use.
}   
function skip(){
    console.log(this.dataset.skip);
    video.currentTime +=parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){

    // video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);

}
function handleProgress(){
    const percent=(video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis= `${percent}%`;
}
function scrub(e){
    const scrubTime=(e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime=scrubTime;
}
/* Hook up the event listeners */
video.addEventListener('click',togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate))
ranges.forEach((range) => range.addEventListener('mousemove', handleRangeUpdate));
let mousedown= false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
progress.addEventListener('mousedown',() => mousedown =true);
progress.addEventListener('mouseup',() => mousedown =false); 
 