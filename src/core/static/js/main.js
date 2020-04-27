//Delay function
const delay = ms => new Promise(res => setTimeout(res, ms));

//Remove classes from element by prefix
const removeClassesByPrefix = (element, prefix) => {
    let classes = element.className.split(" ").filter(c => !c.startsWith(prefix));
    element.className = classes.join(" ").trim();
}

//Mutation observer
const processPageLoad = (mutationsList, observer) => {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            pageLoadCheck();
        }
    }
}

const observerConfig = { attributes: true, childList: true, subtree: true };
const mainObserver = new MutationObserver(processPageLoad);
const portfolioObserver = new MutationObserver(processPageLoad);

//Onload

const pageLoadCheck = () => {
    setElementsColor();

    //Home lang picker event listener
    document.querySelectorAll('.lang-pick-home').forEach(element => element.addEventListener('click', shrinkMenu));

    //Menu event listener
    document.querySelectorAll('.navbar.-menu-item').forEach(element => element.addEventListener('click', changeToPage));
    document.querySelector('#topbar_lang_switch').addEventListener('click', switchPageLanguage);

    //Page history event listener
    window.addEventListener('popstate', whenPageHistory);

    //Portfolio read-more event listeners
    addPortfolioListeners();

    //Skills moving-lamp event listener
    addBulbListener();

    //Sets the menu language
    setMenuLanguage();
    document.querySelector('#topbar_lang_switch').setAttribute('ic-get-from', window.location.pathname);
    document.querySelector('#topbar_lang_switch').setAttribute('ic-src', window.location.pathname);

    let portfolioListNode = document.querySelector('#portfolio_list');
    let mainNode = document.querySelector('main');

    if (portfolioListNode) {
        portfolioObserver.observe(portfolioListNode, observerConfig);
    }
    else if (mainNode) {
        mainObserver.observe(mainNode, observerConfig);
    }
}

window.onload = (event) => pageLoadCheck ();

const addPortfolioListeners = () => {
    if (document.querySelector('#portfolio_modal_main')) {
        document.querySelectorAll('.read-about-modal-link').forEach(element => element.addEventListener('click', openModalPortfolio));
        document.querySelectorAll('#portfolio_modal_close').forEach(element => element.addEventListener('click', closeModalPortfolio));
        document.querySelectorAll('video').forEach(video => video.play());
    }
}

const addBulbListener = () => {
    if (document.querySelector('.-bulb')) {
        if ( parseInt(window.innerWidth) > 768 ){
            window.addEventListener('mousemove', moveLampDesktop);
        }
        else {
            window.addEventListener('deviceorientation', moveLampMobile);
        }
    }
    else {
        if ( parseInt(window.innerWidth) > 768 ){
            window.removeEventListener('mousemove', moveLampDesktop);
        }
        else {
            window.removeEventListener('deviceorientation', moveLampMobile);
        }
    }
}


//=======Page switching

const whenPageHistory = async () => {
    await delay(400);
    await animateTransition('right', 'out');

    setCurrentPage(window.location.pathname.replace('/', ''));
    setElementsColor();
    document.querySelectorAll('.lang-pick-home').forEach(element => element.addEventListener('click', shrinkMenu));
    document.querySelectorAll('.navbar.-menu-item').forEach(element => element.addEventListener('click', changeToPage));
    window.addEventListener('popstate', whenPageHistory);

    addPortfolioListeners();
    addBulbListener();
    clearAnimations();
}

const changeToPage = async (e) => {
    let targetPage = e.toElement.getAttribute('data-target');

    await animateTransition('right', 'in');
    setCurrentPage(targetPage);
    setElementsColor();
    await animateTransition('right', 'out');

    addPortfolioListeners();
    addBulbListener();

    clearAnimations();
}

const setElementsColor = () => {
    let colorToUse;

    if (!document.querySelector('nav.navbar.-main').classList.contains('-shrunk')) {
        colorToUse = 's1'
    }
    else {
        colorToUse = document.querySelector('h1.title')
        .className.split(" ").filter(
            c => c.includes('c-')
            )[0].replace('c-', '');
    }
    
    document.querySelectorAll('.social.-icon').forEach(icon => {
        removeClassesByPrefix(icon, 'c-b-to-');
        icon.classList.add('c-b-to-' + colorToUse);
    })

    let nameStamp = document.querySelector('.name-stamp');
    let langPicker = document.querySelector('.-lang-pick');
    removeClassesByPrefix(nameStamp, 'c-');
    removeClassesByPrefix(langPicker, 'c-');
    if (colorToUse == 's1') {
        nameStamp.classList.add('d-none');
        langPicker.classList.add('c-' + colorToUse);
    }
    else {
        nameStamp.classList.remove('d-none');
        nameStamp.classList.add('c-' + colorToUse);
        langPicker.classList.add('c-' + colorToUse);
    }
}

const setCurrentPage = (page) => {
    document.querySelectorAll('.-menu-item').forEach(item => {
        if(item.getAttribute('data-target') == page){
            item.classList.add('-current');
        }
        else{
            item.classList.remove('-current');
        }
    });
    setMenuLanguage();
    document.querySelector('#topbar_lang_switch').setAttribute('ic-get-from', '/' + page);
    document.querySelector('#topbar_lang_switch').setAttribute('ic-src', '/' + page);
    
    menuInAnimation();
}

//=======Menu

const setMenuLanguage = () => {
    let language = document.querySelector('#lang').value;

    if (language != 'pt' && language != 'en') {
        language = 'en';
    }

    let menuButtonText = {
        pt: {
            about: 'sobre',
            portfolio: 'portfólio',
            skills: 'skills',
            contact: 'contato',
            picker: 'change<br>language'
        },
        en: {
            about: 'about',
            portfolio: 'portfolio',
            skills: 'skills',
            contact: 'contact',
            picker: 'trocar<br>idioma'
        }
    }
    
    document.querySelectorAll('span.-menu-item[data-target]').forEach(menuItem => {
        let buttonName = menuItem.getAttribute('data-target');
        menuItem.innerHTML = menuButtonText[language][buttonName];
    });

    document.querySelector('#topbar_lang_switch').innerHTML = menuButtonText[language].picker;
}

const switchPageLanguage = async () => {
    //Intercooler.refresh(window.location.pathname);
    await animateTransition('up', 'in');
    setCurrentPage(window.location.pathname.replace('/', ''));
    setElementsColor();
    await animateTransition('up', 'out');

    addPortfolioListeners();
    addBulbListener();

    clearAnimations();
}



//=======Menu utilities

const shrinkMenu = async () => { 
    await animateTransition('up', 'in');
    setElementsColor();
    document.querySelector('#navbar').classList.add('-shrunk');
    setCurrentPage('about');
    await animateTransition('up', 'out');
    clearAnimations();
}

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
        removeClassesByPrefix(slide, '-animate-');
    });
    document.querySelector('div.navbar.-menu').classList.remove('-animate-in');
    document.querySelector('div.navbar.-container.-topbar').classList.remove('-animate-in');
}

const menuInAnimation = () => {
    document.querySelector('div.navbar.-menu').classList.add('-animate-in');
    document.querySelector('div.navbar.-container.-topbar').classList.add('-animate-in');
}




//=======Modal

const buildSelectorString = (jobId, type) => {
    let partOne = "[data-job-id='" + String(jobId) + "']";
    let partTwo = "[data-job-type='" + String(type) + "']";

    return partOne + partTwo
}

const openModalPortfolio = async (source) => {
    let jobId = source.toElement.getAttribute('data-job-id');

    let dataName = document.querySelector(buildSelectorString(jobId, 'name')).innerHTML;
    let dataVideo = document.querySelector(buildSelectorString(jobId, 'video')).getAttribute('src');
    let dataDescription = document.querySelector(buildSelectorString(jobId, 'description')).innerHTML;
    let dataWebsite = document.querySelector(buildSelectorString(jobId, 'website')).innerHTML;

    document.querySelector('#portfolio_modal_name').innerHTML = dataName;
    document.querySelector('#portfolio_modal_video').setAttribute('src', dataVideo);
    document.querySelector('#portfolio_modal_description').innerHTML = dataDescription;
    document.querySelector('#portfolio_modal_website').innerHTML = dataWebsite;
    document.querySelector('#portfolio_modal_website').setAttribute('href', 'https://' + dataWebsite);

    document.querySelector('#portfolio_modal_video').play();

    document.querySelector('#portfolio_modal_main').classList.add('-on');
    document.querySelector('.navbar.-container').classList.add('hide-send-up');
    document.querySelector('.navbar.-menu').classList.add('hide-send-up-high');

    await delay(400);
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
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

    let axisTranslation = {
        x: (mousePos.w - vPort.w/2)/vPort.w,
        y: (mousePos.h - vPort.h/2)/vPort.h,
    }

    let styleRotation = `transform: skew(${axisTranslation.x}deg, 0deg) translate(${axisTranslation.x * 4}px, ${axisTranslation.y * 4}px)`;
    document.querySelector('.-bulb').setAttribute('style', styleRotation);
}

const moveLampMobile = (event) => {

    let orientationRange = {
        b: 180, //beta  (x axis)
        y: 90   //gamma (y axis)
    }

    let betaValue, gammaValue;

    if (!event.beta) {
        betaValue = orientationRange.b;
        gammaValue = 0;
    }
    else {
        betaValue = event.beta;
        gammaValue = event.gamma;
    }
    
    let maxRotation = 5;
    
    let deviceRotation = {
        b: String(maxRotation/orientationRange.b * parseFloat(betaValue)),
        y: String(maxRotation/orientationRange.y * parseFloat(gammaValue)),
    }

    let styleRotation = `transform: skew(${deviceRotation.y}deg, 0deg) translateY(${deviceRotation.b*10}px)`;
    document.querySelector('.-bulb').setAttribute('style', styleRotation);

}