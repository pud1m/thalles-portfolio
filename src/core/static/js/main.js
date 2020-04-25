//Delay function
const delay = ms => new Promise(res => setTimeout(res, ms));

window.onload = (event) => {

    //Home lang picker event listener
    document.querySelectorAll('.lang-pick-home').forEach(element => element.addEventListener('click', shrinkMenu));

    //Portfolio read-more event listeners
    document.querySelectorAll('.read-about-modal-link').forEach(element => element.addEventListener('click', openModalPortfolio));
    document.querySelectorAll('#portfolio_modal_close').forEach(element => element.addEventListener('click', closeModalPortfolio));

    //Skills moving-lamp event listener
    if (document.querySelector('.-bulb')) {
        if ( parseInt(window.innerWidth) > 768 ){
            window.addEventListener('mousemove', moveLampDesktop);
        }
        else {
            window.addEventListener('deviceorientation', moveLampMobile);
        }
    }
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

const buildSelectorString = (jobId, type) => {
    let partOne = "[data-job-id='" + String(jobId) + "']";
    let partTwo = "[data-job-type='" + String(type) + "']";

    return partOne + partTwo
}

const openModalPortfolio = (source) => {
    let jobId = source.toElement.getAttribute('data-job-id');

    let dataName = document.querySelector(buildSelectorString(jobId, 'name')).innerHTML;
    let dataVideo = document.querySelector(buildSelectorString(jobId, 'video')).getAttribute('src');
    let dataDescription = document.querySelector(buildSelectorString(jobId, 'description')).innerHTML;
    let dataWebsite = document.querySelector(buildSelectorString(jobId, 'website')).innerHTML;

    document.querySelector('#portfolio_modal_name').innerHTML = dataName;
    document.querySelector('#portfolio_modal_video').setAttribute('src', dataVideo);
    document.querySelector('#portfolio_modal_description').innerHTML = dataDescription;
    document.querySelector('#portfolio_modal_website').innerHTML = dataWebsite;

    document.querySelector('#portfolio_modal_main').classList.add('-on');
    document.querySelector('.navbar.-container').classList.add('hide-send-up');
    document.querySelector('.navbar.-menu').classList.add('hide-send-up-high');
}

const closeModalPortfolio = async () => {
    document.querySelector('.navbar.-container').classList.remove('hide-send-up');
    document.querySelector('.navbar.-menu').classList.remove('hide-send-up-high');

    let modalMain = document.querySelector('#portfolio_modal_main');
    modalMain.classList.add('-off');
    await delay(500);
    modalMain.classList.remove('-on');
    modalMain.classList.remove('-off');

    document.querySelector('#portfolio_modal_name').innerHTML = '';
    document.querySelector('#portfolio_modal_video').setAttribute('src', '');
    document.querySelector('#portfolio_modal_description').innerHTML = '';
    document.querySelector('#portfolio_modal_website').innerHTML = '';
}


//=======Skills

const moveLampDesktop = (event) => {
    let vPort = {
        w: window.innerWidth,
        h: window.innerHeight
    };
    let mousePos = {
        w: event.clientX,
        h: event.clientY
    };

    let axisRotation = {
        x: mousePos.w/vPort.w,
        y: mousePos.h/vPort.h
    }

    let axisTranslation = {
        x: (mousePos.w - vPort.w/2)/vPort.w,
        y: (mousePos.h - vPort.h/2)/vPort.h,
    }

    let styleRotation = `transform: rotateY(${Math.abs(axisRotation.x) * 8}deg) rotateX(${Math.abs(axisRotation.y) * 6}deg) translate(${axisTranslation.x * 4}px, ${axisTranslation.y * 4}px)`;
    document.querySelector('.-bulb').setAttribute('style', styleRotation);
}

const moveLampMobile = (event) => {

    let styleRotation = `transform: rotateY(${parseFloat(event.gamma) }deg) rotateX(${parseFloat(event.beta) }deg)`;
    document.querySelector('.-bulb').setAttribute('style', styleRotation);

}