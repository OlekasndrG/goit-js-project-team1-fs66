


const currentDate = document.querySelector('.current-date');
const daysTag = document.querySelector('.calendar-days');
const prevNextIcon = document.querySelectorAll('.calendar-img');
const nextYear = document.querySelector('#next__year');




let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();


const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];


const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth,0).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth +1,0).getDate();
    let lastDayOfManth =new Date(currYear, currMonth, lastDateOfMonth-1).getDay();
    let lastDateOfLastManth =new Date(currYear, currMonth ,0).getDate();
    let renderTag = "";

    // let styleInactive =1;

    for(let i=firstDayOfMonth; i>0; i-- ){
        // styleInactive +=1;
               
        renderTag += `<li class="calendar-days__list">${lastDateOfLastManth- i + 1} </li>`
    }
    

    for(let i=1; i<=lastDateOfMonth; i++ ) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && 
        currYear === new Date().getFullYear() ? 
        " active" : "";

        // styleInactive +=1;
        // console.log(styleInactive);
       
        // let inactivSat =  (styleInactive % 6 === 0) ?
        // "inactive" : "";
        // let inactivSun = styleInactive === (styleInactive % 6 === 0) || (styleInactive%7 ===0) ?
        // "inactive" : "";
       
        renderTag += `<li class="calendar-days__list ${isToday} ">${i}</li>`
        
    }
    // console.log(styleInactive);
    for(let i=lastDayOfManth; i<6; i++ ) {
       
        renderTag += `<li class="calendar-days__list">${i- lastDayOfManth + 1} </li>`
        
    }
   
    
  
    currentDate.textContent = `${months[ currMonth]} ${currYear}`;
    daysTag.innerHTML = renderTag;
    
}
renderCalendar();

prevNextIcon.forEach(icon =>{
    icon.addEventListener("click", ()=> {
        currMonth = icon.id === "prev" ? currMonth -1 : currMonth+1;
       
        if(currMonth < 0 || currMonth > 11){
            date = new Date(currYear,currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
           
        }
        else {
            date = new Date();
        }
        renderCalendar ();
    })
})

nextYear.addEventListener("click",()=> {
    currMonth +=1;
    renderCalendar();
})

