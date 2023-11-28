
const track = document.querySelector('.carousel-track');
// console.log(track);

//carousel slides
const slides = Array.from(track.children);
// console.log(slides);

// left and right button
nextButton = document.querySelector('.button-right');
prevButton = document.querySelector('.button-left');

// carousel navigation
const dotsNav = document.querySelector('.carousel-nav');
// console.log(dotsNav);
const dots = Array.from(dotsNav.children);
// console.log(dots);

// arrange the slides next to one another (since each slide is in absolute property they are stacked together)
    // get the dynamic size of images as it respond based in screensize
    const slideWidth = slides[0].getBoundingClientRect().width;
    console.log(slideWidth);

// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide =  (track, currentSlide, targetSlide, currentSlideIndicator, targetSlideIndicator) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    currentSlideIndicator.classList.remove('active');
    targetSlideIndicator.classList.add('active');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length -1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}


// When I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentSlideIndicator = dotsNav.querySelector('.active');
    const nextSlideIndicator = currentSlideIndicator.nextElementSibling;

    const nextIndex = slides.findIndex(slide => slide === nextSlide)

    // move to next slide
    moveToSlide(track, currentSlide, nextSlide, currentSlideIndicator, nextSlideIndicator);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);

})

// When I click left, move slides to the left  
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const previousSlide = currentSlide.previousElementSibling;
    const currentSlideIndicator = dotsNav.querySelector('.active');
    const previousSlideIndicator = currentSlideIndicator.previousElementSibling;

    const previousIndex = slides.findIndex(slide => slide === previousSlide)


    // move to previous slide
    moveToSlide(track, currentSlide, previousSlide, currentSlideIndicator, previousSlideIndicator);
    hideShowArrows(slides, prevButton, nextButton, previousIndex);

})


// When I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    // What indicator was clicked on?
    const targetInidicator = e.target.closest('button');

    //If you click not a button stop the event
    if (!targetInidicator) return;

    // else continue

    const currentSlide = track.querySelector('.current-slide');
    const currentSlideIndicator = dotsNav.querySelector('.active');
    const targetIndex = dots.findIndex(dot => dot === targetInidicator);
    console.log(targetIndex);
    const targetSlide = slides[targetIndex];
    

    moveToSlide(track, currentSlide, targetSlide, currentSlideIndicator, targetInidicator)
    hideShowArrows(slides, prevButton, nextButton, targetIndex);

})