const modalBtn = document.querySelector('.modal-btn')
const modaloverlay = document.querySelector('.modal-overlay')
const closeBtn = document.querySelector('.close-btn')

modalBtn.addEventListener('click',function(){
    modaloverlay.classList.add('open-modal')

})
closeBtn.addEventListener('click',function(){
    modaloverlay.classList.remove('open-modal')
})
