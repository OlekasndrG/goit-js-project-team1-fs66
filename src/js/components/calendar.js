const currentDate = document.querySelector('.current-date'),
daysTag = document.querySelector('.calendar-days'),
prevNextIcon = document.querySelectorAll('.calendar-img'),
nextYear = document.querySelector('#next__year'),
input = document.querySelector('.input-calendar'),
inputBtn = document.querySelector('.calendar-arrows'),
modalOpenBtn = document.querySelector('.input-date-form '),
modal = document.querySelector('.wrapper-calendar'),
iconCalendar = document.querySelector('.calendar-icon')



modalOpenBtn.addEventListener("click", toggleInput);
daysTag.addEventListener('click', hideModal);

function toggleInput(){
    modal.classList.toggle('is-hidden');
    input.classList.toggle('is-Active');
    iconCalendar.classList.toggle('change_color');
    inputBtn.classList.toggle('changeUp');
}

function hideModal(e){
   
    if(input.classList.contains('is-Active')) {
        modal.classList.add('is-hidden');
        input.classList.remove('is-Active');
        iconCalendar.classList.remove('change_color');
        inputBtn.classList.remove('changeUp');
        
        document.getElementById('input-picker').value = '';
        localStorage.removeItem('VALUE');
        localStorage.removeItem('Date_current');
    }
    

}


let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

const VALUE_DAY ="";

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth,0).getDay(),
     lastDateOfMonth = new Date(currYear, currMonth +1,0).getDate(),
     lastDayOfManth =new Date(currYear, currMonth, lastDateOfMonth-1).getDay(),
     lastDateOfLastManth =new Date(currYear, currMonth ,0).getDate(),
     renderTag = "";

    // розмітка "inactive"
    let counterlnactive =0;
    const arrayInactive =[6,7,13,14,20,21,27,28,34,35,41,42];
    

    for(let i=firstDayOfMonth; i>0; i-- ){
        counterlnactive +=1;
               
        renderTag += `<li class="calendar-days__list">${lastDateOfLastManth- i + 1} </li>`
    }
    

    for(let i=1; i<=lastDateOfMonth; i++ ) {
       
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && 
        currYear === new Date().getFullYear() ? 
        "today" : "";
        
        counterlnactive +=1;
        let inactivDay = ""
        arrayInactive.map(el => {
           
           if(el === counterlnactive) return inactivDay = "inactive";

        })
          
        renderTag += `<li class="calendar-days__list ${isToday} ${inactivDay}">${i}</li>`
               
    }
    
    for(let i=lastDayOfManth; i<6; i++ ) {

        counterlnactive +=1;
        let inactivDay = "";
        arrayInactive.map(el => {
            if(el === counterlnactive) return inactivDay = "inactive"
         
        })

        renderTag += `<li class="calendar-days__list ${inactivDay}">${i- lastDayOfManth + 1} </li>`
        
    }
   
    // розмітка поточного місяця, року  та днів 
    currentDate.textContent = `${months[ currMonth]} ${currYear}`;
    daysTag.innerHTML = renderTag;

    // клік по даті в календарі зі зміною "active"
    daysTag.addEventListener('click', e => {

        
        [...e.currentTarget.children].forEach(item => {
            item.classList.remove('active');
            
        });
        e.target.classList.add('active');

        // вибраний день календаря з збереження в сховище
        let newActiveDay = e.target.textContent;
        localStorage.setItem('VALUE', JSON.stringify(newActiveDay));

        // запис дати в інпут
        let month = (currMonth + 1).toString();
        document.getElementById('input-picker').value =
        currYear +
        '/' +
        month.padStart(2, '0') +
        '/' +
        newActiveDay.padStart(2, '0');

        

        // збереження дати в локальному сховищі
        let inputCurrentDateValue = document.querySelector('.input-calendar').value;
        localStorage.setItem('Date_current', JSON.stringify(inputCurrentDateValue));
    })
    
}
renderCalendar();

// зміна дати по кліку
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

        // оновлення класу active
        let saveDate = JSON.parse(localStorage.getItem('VALUE'));
        let rendCurrentDays = daysTag.childNodes;
        

        rendCurrentDays.forEach(el => {
            if(el.textContent === saveDate) {
                el.classList.add('active')
            }
        });
    });
});

nextYear.addEventListener("click",()=> {
    currYear +=1;
    renderCalendar();

    let saveDate = JSON.parse(localStorage.getItem('VALUE'));
    let rendCurrentDays = daysTag.childNodes;
    

    rendCurrentDays.forEach(el => {
        if(el.textContent === saveDate) {
            el.classList.add('active')
        }
    });
})

localStorage.removeItem('VALUE');
localStorage.removeItem('Date_current');
