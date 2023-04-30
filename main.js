let carousel = document.querySelector(".container")
let navBtns = document.querySelectorAll("i")
let img = document.querySelector("img")

let isDraging = false,
    prevScrollLeft,
    prevmouse,
    posDiff

const showHiddenIcon = ()=>{
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth
    navBtns[1].style.display = carousel.scrollLeft == 0? "none" : "block"
    navBtns[0].style.display = carousel.scrollLeft == scrollWidth? "none" : "block"
    // carousel.scrollLeft == 0 ? navBtns[1].style.display = "block" : navBtns[1].style.display = "none"
}


navBtns.forEach(ele=>{
    ele.addEventListener("click",()=>{
        ele.classList.contains("right") ? carousel.scrollLeft += img.width + 14 : carousel.scrollLeft -= img.width + 14
        setTimeout(()=>{
            showHiddenIcon()
        },600)
    })
})

const autoSlide = ()=>{
    posDiff = Math.abs(posDiff)
    let imgSize = img.width + 14
    let valdDiffrence = imgSize - posDiff
    if(carousel.scrollLeft > prevScrollLeft){
       return carousel.scrollLeft += posDiff > (imgSize / 3) ? valdDiffrence : -posDiff
    }
    carousel.scrollLeft -= posDiff > (imgSize / 3) ? valdDiffrence : -posDiff
}

startDrag = (e)=>{
    isDraging = true
    prevScrollLeft = carousel.scrollLeft
    prevmouse = e.pageX || e.touches[0].pageX
    carousel.classList.add("drigging")
}

draging = (e)=>{
    if(!isDraging)  return
    e.preventDefault()
    posDiff = (e.pageX || e.touches[0].pageX) - prevmouse
    carousel.scrollLeft = prevScrollLeft - posDiff
    showHiddenIcon()
}

stopDrag = (e)=>{

    isDraging = false
    carousel.classList.remove("drigging")
    autoSlide()

}

carousel.addEventListener("mousedown",startDrag)
carousel.addEventListener("touchstart",startDrag)

carousel.addEventListener("mousemove",draging)
carousel.addEventListener("touchmove",draging)

carousel.addEventListener("mouseup",stopDrag)
carousel.addEventListener("mouseleave",stopDrag)
carousel.addEventListener("touchend",stopDrag)




// console.log(carousel)