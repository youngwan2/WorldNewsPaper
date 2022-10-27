let line=document.querySelector('.line')
let main = document.querySelector('.main')
let userInput=document.getElementById('user-input')
let inputBtn=document.getElementById('input-btn')
const menuBtn=document.querySelectorAll('.container .menu button')


menuBtn.forEach((menu)=>{menu.addEventListener("click",(e)=>getTopic(e))})
menuBtn.forEach((btn)=>{
  btn.addEventListener('click',(e)=>{
   menuBtnLine(e)
  })
 })


let url;


const getDataStore=async()=>{
  let response = await fetch(url)      
  let data=await response.json();       
  let getData=data.response.results

  let temp=``
      temp= getData.map((getData)=>{
          return `<div class="main-content">
          <div class="main-text">
            <h4><a style="text-decoration:none; color:rgb(230, 49, 155)" href="${getData.webUrl}">${getData.webTitle}</a></h4><br>
            <p>제목을 클릭하시면 해당 기사의 사이트로 이동하여 자세한 정보를 확인하실 수 있습니다.</p><br>
            <div class="date">${getData.webPublicationDate}</div>
          </div>
          </div>` })
      
         main.innerHTML = temp.join(''); 

       try{
        if(getData==''){
          throw new Error("찾고자 하는 자료가 존재하지 않습니다.")
        }
       } catch(error){
           alert(error)
       }
}


// 메인뉴스 리스트가 보이는 곳
let news = [];
const worldNews= async() =>{
    url =new URL('https://content.guardianapis.com/search?api-key=e14f2dc3-7231-47da-900e-d38cc4d26542')
 
    getDataStore();
         
}  worldNews();


//카테고리 별 주제 클릭 시 해당하는 키워드의 뉴스 리스트를 호출
const getTopic=async(e)=>{
  console.log(e.target.textContent)
  let topic = e.target.textContent.toLowerCase()
  url= new URL(`https://content.guardianapis.com/search?q=${topic}&api-key=e14f2dc3-7231-47da-900e-d38cc4d26542`)

  getDataStore();

  }
 

//검색창에 키워드 입력 시 해당하는 키워드의 뉴스 리스트가 뜨도록 코딩
const searchNews=async()=>{
  let search=userInput.value
  url=new URL(`https://content.guardianapis.com/search?q=${search}&api-key=e14f2dc3-7231-47da-900e-d38cc4d26542`)
 
  getDataStore();  

 } inputBtn.addEventListener('click',searchNews)








// 카테고리를 선택했을 때 해당하는 영역으로 라인이 이동하도록 코딩

function menuBtnLine(e){
  line.style.display='block'
  line.style.left= e.currentTarget.offsetLeft + 'px';
  line.style.width=e.currentTarget.offsetWidth + 'px';
  line.style.top=
       e.currentTarget.offsetLeftTop + e.currentTarget.offsetHeight + 'px';
}







