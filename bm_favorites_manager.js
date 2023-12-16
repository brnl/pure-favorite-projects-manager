console.log("################################")
console.log("   START BM_FAVORITES_MANAGER   ")
console.log("################################")

// Helper function to get cookie by name
function bmfm_getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

// Helper function to set a cookie
function bmfm_setCookie(name, value, daysToExpire) {
    var d = new Date();
    d.setTime(d.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

// Load favorite projects from cookie
let bmfm_favorite_projects = bmfm_getCookie('bmfm_favorite_projects');
bmfm_favorite_projects = bmfm_favorite_projects ? JSON.parse(bmfm_favorite_projects) : [];

// Function to update the star icon
function bmfm_updateStarIcon(projectId, isFavorite) {
    let starIcon = document.querySelector(`.bmfm_star-icon[data-project="${projectId}"]`);
    if (starIcon) {
        starIcon.textContent = isFavorite ? '⭐' : '☆';
    }
}

// Function to toggle favorite status
function bmfm_toggleFavorite(customerId, projectId) {
    let index = bmfm_favorite_projects.findIndex(p => p.project === projectId && p.customer === customerId);
    if (index > -1) {
        bmfm_favorite_projects.splice(index, 1);
    } else {
        bmfm_favorite_projects.push({customer: customerId, project: projectId});
    }
    bmfm_setCookie('bmfm_favorite_projects', JSON.stringify(bmfm_favorite_projects), 30);
    bmfm_updateStarIcon(projectId, index === -1);
}

// Function to add star icons
function bmfm_addStarIcons() {
    let projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        let projectId = item.getAttribute('data-project');
        let customerId = item.getAttribute('data-customer');
        let isFavorite = bmfm_favorite_projects.some(p => p.project === projectId && p.customer === customerId);
        let editIcon = item.querySelector('.edit-icon.icondrop');
        let existingStar = item.querySelector('.bmfm_star-icon');

        if (editIcon && !existingStar) {
            let starIcon = document.createElement('span');
            starIcon.className = 'bmfm_star-icon';
            starIcon.textContent = isFavorite ? '⭐' : '☆';
            starIcon.setAttribute('data-project', projectId);
            starIcon.setAttribute('data-customer', customerId);
            starIcon.onclick = (event) => {
                event.stopPropagation();
                bmfm_toggleFavorite(customerId, projectId);
            };
            starIcon.title = "BM Favorites Manager: Click to " + (isFavorite ? "add to" : "remove from") + " your favorite projects."
            editIcon.parentNode.insertBefore(starIcon, editIcon.nextSibling);
        }
    });
}

// Assuming you have a way to simulate a click event
function bmfm_simulateClick(element) {
    if (element) {
        element.click();
    }
}

function bmfm_createNotificationElement() {
    let notification = document.createElement("div");
    notification.id = "bmfm_expandingFavoritesNotification";
    notification.style.position = "fixed";
    notification.style.top = "10px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.backgroundColor = "lightgoldenrodyellow";
    notification.style.padding = "10px";
    notification.style.border = "1px solid black";
    notification.style.borderRadius = "5px";
    notification.style.display = "none";
    notification.style.zIndex = "2000";
    notification.textContent = "BM ⭐ Favorites Manager - Expanding favorites...";
    document.body.appendChild(notification);
    return notification;
}

let bmfm_expandingFavoritesNotification = bmfm_createNotificationElement();

async function bmfm_selectFavoriteProjects(favorite_projects) {
    bmfm_expandingFavoritesNotification.style.display = "block";
    for (let favorite of favorite_projects) {
        let customerSelector = `.customer-row[data-customer="${favorite.customer}"]`;
        let customerRow = document.querySelector(customerSelector);

        if (customerRow && !customerRow.classList.contains('selected')) {
            bmfm_simulateClick(customerRow);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        let projectSelector = `.project-item[data-project="${favorite.project}"][data-customer="${favorite.customer}"]`;
        let projectRow = document.querySelector(projectSelector);

        if (projectRow && !projectRow.classList.contains('selected')) {
            bmfm_simulateClick(projectRow);
        }
    }
    bmfm_addStarIcons();

    bmfm_expandingFavoritesNotification.style.display = "none";
}

function bmfm_onDomChangeForFavorites(mutations, observer) {
    for (let mutation of mutations) {
        if (mutation.addedNodes) {
            for (let node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && node.matches('.day-today')) {
                    bmfm_selectFavoriteProjects(bmfm_favorite_projects);
                    observer.disconnect();
                    return;
                }
            }
        }
    }
}

const bmfm_observerFavoriteProjects = new MutationObserver(bmfm_onDomChangeForFavorites);
const bmfm_containerFavoriteProjects = document.querySelector('tbody.user-section');
bmfm_observerFavoriteProjects.observe(bmfm_containerFavoriteProjects, { childList: true, subtree: true });

function bmfm_handleMutations(mutations) {
    console.log("##BM: Mutation observed");
    mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
            console.log("##BM: Added nodes detected");
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE && node.matches('.project-item')) {
                    console.log("##BM: Adding star icons to new project item");
                    bmfm_addStarIcons();
                }
            });
        }
    });
}

const bmfm_observer = new MutationObserver(bmfm_handleMutations);

const bmfm_container = document.querySelector('tbody.user-section');
if (bmfm_container) {
    console.log("##BM: Observing container for mutations");
    bmfm_observer.observe(bmfm_container, { childList: true, subtree: true });
} else {
    console.log("##BM: Container not found for MutationObserver");
}

console.log("##############################")
console.log("   END BM_FAVORITES_MANAGER   ")
console.log("##############################")
