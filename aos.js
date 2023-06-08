const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        if(entry.isIntersecting){
            entry.target.classList.add("show")
        } else{
            entry.target.classList.remove("show")

        }
    })
})

const hiddenElem = document.querySelectorAll(".hidden")
hiddenElem.forEach((el) => observer.observe(el))