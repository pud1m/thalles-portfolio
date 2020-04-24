//Delay function
const delay = ms => new Promise(res => setTimeout(res, ms));


window.onload = (event) => {

    //Home lang picker event listeners
    document.querySelectorAll('.lang-pick-home').forEach(element => element.addEventListener('click', shrinkMenu));

    //Portfolio read more event listeners
    document.querySelectorAll('.read-about-modal-link').forEach(element => element.addEventListener('click', openModalPortfolio));
};


//=======Menu

const setCurrentPage = (page) => {
    window.history.pushState("", "Thalles Salles", page);
    document.querySelectorAll('.-menu-item').forEach(item => {
        if(item.getAttribute('data-target') == page){
            item.classList.add('-current');
        }
        else{
            item.classList.remove('-current');
        }
    });
};

const shrinkMenu = async () => { 
    await animateTransition('up', 'in');
    document.querySelector('#navbar').classList.add('-shrunk');
    setCurrentPage('about');
    await animateTransition('up', 'out');
    clearAnimations();
};

const animateTransition = async (direction, type) => {
    let slides = document.querySelectorAll('.l-slide');

    for (let slide of slides) {
        slide.classList.add('-animate-' + direction + '-' + type);
        await delay(70);
    }

    await delay(250);
}

const clearAnimations = () => {
    document.querySelectorAll('.l-slide').forEach(slide => {
        let classes = slide.className.split(" ").filter(c => !c.startsWith('-animate-'));
        slide.className = classes.join(" ").trim();
    })
}




//=======Modal

const openModalPortfolio = (source) => {
    console.log(source.toElement);
}