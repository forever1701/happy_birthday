const screens=[...document.querySelectorAll('.screen')];
let current=0;

function showScreen(n){
  current=Math.max(0,Math.min(n,screens.length-1));
  screens.forEach((s,i)=>s.classList.toggle('active',i===current));
  document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===current));
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-next]').forEach(btn=>{
  btn.addEventListener('click',()=>showScreen(Number(btn.dataset.next)-1));
});
document.getElementById('giftBtn').addEventListener('click',()=>{
  document.getElementById('giftBtn').animate([
    {transform:'scale(1)'},{transform:'scale(1.15) rotate(-4deg)'},{transform:'scale(0) rotate(20deg)'}
  ],{duration:550,easing:'ease-in-out'}).finished.then(()=>showScreen(1));
});

// Progress dots
const dots=document.getElementById('progressDots');
screens.forEach((_,i)=>{
  const d=document.createElement('span');d.className='dot'+(i===0?' active':'');
  d.onclick=()=>showScreen(i);dots.appendChild(d);
});

// Photo upload preview
document.getElementById('photoInput').addEventListener('change',e=>{
  const file=e.target.files[0]; if(!file)return;
  const url=URL.createObjectURL(file);
  document.getElementById('photoPreview').innerHTML=`<img src="${url}" alt="Your uploaded photo">`;
});

// Quiz
document.querySelectorAll('.quiz-option').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.quiz-option').forEach(x=>x.classList.remove('selected'));
    btn.classList.add('selected');
  });
});
document.getElementById('quizContinue').addEventListener('click',()=>{
  if(!document.querySelector('.quiz-option.selected')){
    document.querySelector('.quiz-option:last-child').classList.add('selected');
  }
  showScreen(5);
});

// Memory game
const symbols=['♥','✿','★','☀','♥','✿','★','☀'];
const shuffled=[...symbols].sort(()=>Math.random()-.5);
const grid=document.getElementById('memoryGrid');
let first=null, lock=false, matches=0;
shuffled.forEach((sym,i)=>{
  const card=document.createElement('button');
  card.className='memory-card';
  card.innerHTML=`<span class="face front">?</span><span class="face back">${sym}</span>`;
  card.dataset.symbol=sym;
  card.addEventListener('click',()=>{
    if(lock||card.classList.contains('flipped')||card.classList.contains('matched'))return;
    card.classList.add('flipped');
    if(!first){first=card;return}
    if(first.dataset.symbol===card.dataset.symbol){
      first.classList.add('matched');card.classList.add('matched');matches++;first=null;
      if(matches===4){
        const b=document.getElementById('memoryContinue');b.disabled=false;b.textContent='Continue ♥';
      }
    }else{
      lock=true;setTimeout(()=>{first.classList.remove('flipped');card.classList.remove('flipped');first=null;lock=false},700);
    }
  });
  grid.appendChild(card);
});
document.getElementById('memoryContinue').addEventListener('click',()=>showScreen(6));

// Music
const audio=document.getElementById('birthdayAudio'), musicBtn=document.getElementById('musicToggle');
musicBtn.addEventListener('click',()=>{
  if(audio.paused){audio.play().catch(()=>{});musicBtn.textContent='❚❚'}
  else{audio.pause();musicBtn.textContent='♫'}
});

// Falling petals
const petals=document.getElementById('petals');
function makePetal(){
  const p=document.createElement('span');p.className='petal';
  p.style.left=Math.random()*100+'%';
  p.style.setProperty('--x',(Math.random()*240-120)+'px');
  p.style.animationDuration=(5+Math.random()*6)+'s';
  p.style.animationDelay=(Math.random()*2)+'s';
  p.style.transform=`rotate(${Math.random()*180}deg)`;
  petals.appendChild(p);setTimeout(()=>p.remove(),13000);
}
setInterval(makePetal,420);
for(let i=0;i<12;i++)makePetal();

// Keyboard navigation
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight' && current<screens.length-1)showScreen(current+1);
  if(e.key==='ArrowLeft' && current>0)showScreen(current-1);
});

document.addEventListener("DOMContentLoaded", function () {
  const birthdayImage = document.getElementById("birthdayImage");

  if (!birthdayImage) return;

  // Detect mobile devices
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  if (isMobile) {
    // Mobile image
    birthdayImage.src = "assets/images/golden_Birthday.jpg";
  } else {
    // Laptop / desktop image
    birthdayImage.src = "assets/images/golden_Birthday_2.jpg";
  }
});
