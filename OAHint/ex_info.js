function load_ex_info() {
    let b = document.querySelector("#dt-stage-show > ul > li:nth-child(2) > a");
    if (!b) load_student_info(0);
    else {
        b.addEventListener("click", function(e) {
            const observer = new MutationObserver((mutationsList, observer) => {
                for(let mutation of mutationsList) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        load_student_info(1);
                        observer.disconnect();
                    }
                }
            });

            observer.observe(document.getElementById('lesson_reports'), { childList: true, subtree: true });
        });
    }
}

/**
 * @param {string} class_type
 * @param {Element} stage 
 * @param {Element} status 
 * @param {Element} start 
 * @param {Element} end 
 * @param {Element} pr
 * @param {Element} od
 */
function auto_fill(class_type, stage) {
    const chapters = [
        ["K", "H", "H", "I", "H", "H", "H", "G", "H", "H", "H", "H", "H", "H", "G"],
        ["G", "F", "G", "G", "G", "G", "F", "F", "I", "I", "F", "F", "I", "I", "G"],
        ["F", "G", "G", "H", "F", "I", "H", "G", "G", "H", "I", "G", "G", "F", "G"]
    ];
    const types = ["初階班", "進階班", "綜合應用班"]
    let status = document.querySelector("#dt_admission_lesson_report_completion_status");
    let start = document.querySelector("#dt_admission_lesson_report_start_from");
    let end = document.querySelector("#dt_admission_lesson_report_end_to");
    let pr = document.querySelector("#participation_start_10");
    let od = document.querySelector("#order_start_10");
    let contact = document.querySelector("#dt_admission_lesson_report_contact");

    class_type = types.indexOf(class_type);
    stage = stage.selectedIndex - 1;
    if (stage == -1) return
    console.log("Auto filled.");

    let end_index = chapters[class_type][stage].charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    let is_done = status.selectedIndex != 2;
    start.selectedIndex = 1;
    pr.checked = true;
    od.checked = true;
    contact.value = "無。";
    
    if (is_done) {
        status.selectedIndex = 1;
        end.selectedIndex = end_index;
    }
}

/**
 * 
 * @param {string} class_type 
 */
function create_observer(class_type) {
    const observer = new MutationObserver((mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                let label = document.querySelector("#remote_modal h4#myModalLabel");
                label.innerHTML = `${label.textContent} (${class_type})`;

                let stage = document.querySelector("#dt_admission_lesson_report_learning_stage");
                
                stage.onchange = () => auto_fill(class_type, stage);

                observer.disconnect();
            }
        }
    });
    return observer;
}

function load_student_info(node_num) {
    let record_btn = document.querySelectorAll("[id^=report_status] > div > a");
    let class_type = null;
    record_btn.forEach(function (e) {
        e.addEventListener("click", function () {
            let col = find_parent(this, "tr");
            if (node_num == 0) class_type = col.childNodes[0].textContent.split("(")[1].replace(")", "");
            else  class_type = col.childNodes[1].firstChild.textContent.split("(")[1].replace(")", "");
           
            const observer = create_observer(class_type);
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