(function(){
    const titleQuestions = [...document.querySelectorAll('.questions_title')];


    titleQuestions.forEach(question =>{
        question.addEventListener('click',()=>{

            let mostrar = question.childNodes;
            let className=mostrar[1].classList[1];
            let classText=question.nextElementSibling

            let height=classText.scrollHeight
            
            
            mostrar[1].classList.toggle('questions_arrow--rotate');
            question.parentElement.parentElement.classList.toggle('questions_padding--add')
            
            
            if (classText.clientHeight === 0){
                classText.style.height=`${height}px`;
            }else{
                classText.style.height='0';         
            }

        })
    })

})();