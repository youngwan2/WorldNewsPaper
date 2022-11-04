let line=document.querySelector('.line');
let main = document.querySelector('.main');
let userInput=document.getElementById('user-input');
let inputBtn=document.getElementById('input-btn');
const menuBtn=document.querySelectorAll('.container .menu button');




 
menuBtn.forEach((menu)=>{menu.addEventListener("click",(e)=>getTopic(e))});

menuBtn.forEach((btn)=>{
  btn.addEventListener('click',(e)=>{
   menuBtnLine(e)
  });
 });

 let pageNum =1        //현재페이지 임의값( 0이되면 오류가 뜨므로 1을 기본으로 설정)
 let total = 120;        //전체페이지




 let url;
//============== 중복 데이터 저장소=================================
const getDataStore = async()=>{
 
       try{
        url.searchParams.set('page',pageNum)
        console.log(url)
        let response = await fetch(url)
        let data = await response.json()    
        let getData = data.response.results
        let currentPage = data.response.currentPage



        if(response.status == 200){
          if(data.response.total==0){ //예외조건(오류가 아니지만 실행할)
            throw new Error('검색된 자료가 존재하지 않습니다.')
          };

          let temp=``
              temp= getData.map((getData)=>{
                  return `<div class="main-content">
                  <div class="main-text">
                    <h4><a style="text-decoration:none; color:rgb(230, 49, 155)" href="${getData.webUrl}">${getData.webTitle}</a></h4><br>
                    <p>제목을 클릭하시면 해당 기사의 사이트로 이동하여 자세한 정보를 확인하실 수 있습니다.</p><br>
                    <div class="date">${getData.webPublicationDate}</div>
                  </div>
                  </div>` });
              
                 main.innerHTML = temp.join(''); 
        } else {
           throw new Error(response.status)  // status 가 200이 아니라면 그 외 메시지는 오류 처리한다.
        };
       } catch(error){    
           alert(error)
           main.innerHTML =`<div id='not-find'>${error}</div>`
       };

       pagenation() 
       pageNum= 1
};


// ==============================메인뉴스 리스트가 보이는 곳==================================
let news = [];
const worldNews= async() =>{
   url =new URL(`https://content.guardianapis.com/search?api-key=e14f2dc3-7231-47da-900e-d38cc4d26542`)

    getDataStore();
    
};  


//================카테고리 별 주제 클릭 시 해당하는 키워드의 뉴스 리스트를 호출========================
const getTopic = async(e) => {
  console.log(e.target.textContent)
  let topic = e.target.textContent.toLowerCase()
  url= new URL(`https://content.guardianapis.com/search?q=${topic}&api-key=e14f2dc3-7231-47da-900e-d38cc4d26542`)



  getDataStore();

  };
 

//======================검색창에 키워드 입력 시 해당하는 키워드의 뉴스 리스트가 뜨도록 코딩=================
const searchNews = async() => {
  let search=userInput.value
  url=new URL(`https://content.guardianapis.com/search?q=${search}&api-key=e14f2dc3-7231-47da-900e-d38cc4d26542`)

 
  getDataStore();  
  
 }; inputBtn.addEventListener('click',searchNews) 


//====================================페이지네이션 함수-============================================
let firstPageShift = document.querySelector('.first-page')
let lastPageShift = document.querySelector('.last-page')


const pagenation = (firstBeforePage) => {
  
  // 총 페이지
  // 현재 페이지
  
  let pageGroup = Math.ceil(pageNum/5) //현재 페이지가 속한 그룹 = (현재 페이지 번호)/(한 화면에 보여줄 페이지 수)
  console.log(pageGroup)
  let lastPage = pageGroup * 5       //마지막 페이지 = 현재 페이지 그룹 * 한 화면에 보여줄 페이지 수
  let firstPage = lastPage -(5-1)    //첫 번째 페이지 = 마지막페이지 -(한 화면에 보여줄 페이지수 - 1)


  let pagenationHTML=`
  <li class="page-item"><a onclick="page(${1})" class="first-page" href="#"><<</a></li>
  <li class="page-item"><a onclick="page(${pageNum-1})" class="before" href="#"><</a></li>`
  
  for(let i=firstPage; i<=lastPage; i++){   //페이지네이션을 첫번째 페이지에서 마지막페이지 까지 그려준다.
    pagenationHTML += `<li class="page-item"><a class= ${pageNum===i? "action" : "normal"} onClick="pageChange(${i})" class="page-link" href="#">${i}</a></li>`
  }
  pagenationHTML+=`
  <li class="page-item"><a onClick="page(${pageNum+1})" class="after" href="#">></a></li>
  <li class="page-item"><a onclick="page(${total})" class="last-page" href="#">>></a></li>`
  document.querySelector('.pagenation').innerHTML = pagenationHTML

};


pagenation();

//페이지 숫자 클릭 시 해당 번호의 페이지로 이동
const pageChange=(num)=>{
  pageNum = num
  console.log(pageNum)

  getDataStore()
};

// 이전-이후 페이지, 첫-마지막 페이지 이동
const page=(num)=>{
  pageNum = num
  if(pageNum <1){
    return alert("페이지가 존재하지 않습니다.")
  }

  if(pageNum >total){
    return alert("마지막 페이지 입니다.")
  }

  getDataStore()
};








// -----------------------------------카테고리를 선택했을 때 해당하는 영역으로 라인이 이동하도록 코딩---------------------------------

function menuBtnLine(e){
  line.style.display='block'
  line.style.left= e.currentTarget.offsetLeft + 'px';
  line.style.width=e.currentTarget.offsetWidth + 'px';
  line.style.top=
       e.currentTarget.offsetLeftTop + e.currentTarget.offsetHeight + 'px';
};


worldNews();




