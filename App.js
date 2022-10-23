let line=document.querySelector('.line')
let main = document.querySelector('.main')
const menuBtn=document.querySelectorAll('.container .menu button')
menuBtn.forEach((menu)=>{menu.addEventListener("click",(e)=>getTopic(e))})

menuBtn.forEach((btn)=>{
  btn.addEventListener('click',(e)=>{
   menuBtnLine(e)
  })
 })





let news = [];
const koreanNews= async() =>{
    let url =new URL('https://content.guardianapis.com/search?api-key=e14f2dc3-7231-47da-900e-d38cc4d26542')
    console.log(url)  //url 정보를 가져온다.

    let response = await fetch(url)      //url 로 부터 응답 정보를 받아온다.

    let data=await response.json();        //응답 정보로 부터 body 정보를 받아온다.
             
    
    let getResults=data.response.results
  

  
    let temp=``
        temp= getResults.map((getResults)=>{
            return `<div class="main-content">
            <div class="main-text">
              <h4><a style="text-decoration:none; color:rgb(230, 49, 155)" href="${getResults.webUrl}">${getResults.webTitle}</a></h4><br>
              <p>제목을 클릭하시면 해당 기사의 사이트로 이동하여 자세한 정보를 확인하실 수 있습니다.</p><br>
              <div class="date">${getResults.webPublicationDate}</div>
            </div>
            </div>` })
        
           main.innerHTML = temp.join(''); 
       
       
} 
koreanNews();

const getTopic=async(e)=>{
  console.log(e.target.textContent)
  let topic = e.target.textContent.toLowerCase()
  let url= new URL(`https://content.guardianapis.com/search?q=${topic}&api-key=e14f2dc3-7231-47da-900e-d38cc4d26542`)


  let response = await fetch(url)
  let data = await response.json()
  let getData=data.response.results


  let temp=''
  getData.map((getData)=>{
    return temp+=`<div class="main-content">
      <div class="main-text">
        <h4><a style="text-decoration:none; color:rgb(230, 49, 155)" href="${getData.webUrl}">${getData.webTitle}</a></h4><br>
        <p>제목을 클릭하시면 해당 기사의 사이트로 이동하여 자세한 정보를 확인하실 수 있습니다.</p><br>
        <div class="date">${getData.webPublicationDate}</div>
      </div>
      </div>` })
  
      main.innerHTML = temp
  }
 


// menu 라인

function menuBtnLine(e){
  line.display='block'
  line.style.left= e.currentTarget.offsetLeft + 'px';
  line.style.width=e.currentTarget.offsetWidth + 'px';
  line.style.top=
       e.currentTarget.offsetLeftTop + e.currentTarget.offsetHeight + 'px';
}







