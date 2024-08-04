function load_ex_info() {
    let b = document.querySelector("#dt-stage-show > ul > li:nth-child(2) > a");
    if (!b) load_student_info_embed();
    else {
        b.addEventListener("click", function(e) {
            const observer = new MutationObserver((mutationsList, observer) => {
                for(let mutation of mutationsList) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        load_student_info();
                        observer.disconnect();
                    }
                }
            });

            observer.observe(document.getElementById('lesson_reports'), { childList: true, subtree: true });
        });
    }
}

function load_student_info() {
    let record_btn = document.querySelectorAll("[id^=report_status] > div > a");
    let class_type = null;
    record_btn.forEach(function (e) {
        e.addEventListener("click", function () {
            let col = find_parent(this, "tr");
            class_type = col.childNodes[1].firstChild.textContent.split("(")[1].replace(")", "");
            
            const observer = new MutationObserver((mutationsList, observer) => {
                for(let mutation of mutationsList) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        let label = document.querySelector("#remote_modal h4#myModalLabel");
                        label.innerHTML = `${label.textContent} (${class_type})`;
                        observer.disconnect();
                    }
                }
            });

            observer.observe(document.getElementById('remote_modal'), { childList: true, subtree: true });
        });
    });
    console.log("Corp EX Info Loaded!");
}

function load_student_info_embed() {
    let record_btn = document.querySelectorAll("[id^=report_status] > div > a");
    let class_type = null;
    record_btn.forEach(function (e) {
        e.addEventListener("click", function () {
            let col = find_parent(this, "tr");
            class_type = col.childNodes[0].textContent.split("(")[1].replace(")", "");
            console.log(class_type);
            
            const observer = new MutationObserver((mutationsList, observer) => {
                for(let mutation of mutationsList) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        let label = document.querySelector("#remote_modal h4#myModalLabel");
                        label.innerHTML = `${label.textContent} (${class_type})`;
                        observer.disconnect();
                    }
                }
            });

            observer.observe(document.getElementById('remote_modal'), { childList: true, subtree: true });
        });
    });
    console.log("Corp EX Info Loaded!");
}

/**
 * @param {HTMLElement} element - Children element
 * @param {string} tagName - Target parent tag
 * @returns {HTMLElement|null}
 */
function find_parent(element, tagName) {
    tagName = tagName.toUpperCase();
    while (element) {
        if (element.tagName === tagName) {
            return element;
        }
        element = element.parentElement;
    }
    return null;
}