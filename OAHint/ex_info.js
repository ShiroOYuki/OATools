function load_ex_info() {
    let b = document.querySelector("#dt-stage-show > ul > li:nth-child(2) > a");
    b.addEventListener("click", function(e) {
        const observer = new MutationObserver((mutationsList, observer) => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // 在這裡你可以添加其他檢查來確保是你期待的元素已經載入
                    load_student_info();
                    // 停止觀察
                    observer.disconnect();
                }
            }
        });
        // 開始觀察 #content 容器的變化
        observer.observe(document.getElementById('lesson_reports'), { childList: true, subtree: true });
    });
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
                        // 在這裡你可以添加其他檢查來確保是你期待的元素已經載入
                        console.log(class_type);
                        let label = document.querySelector("#remote_modal h4#myModalLabel");
                        label.innerHTML = `${label.textContent} (${class_type})`;
                        // 停止觀察
                        observer.disconnect();
                    }
                }
            });
            // 開始觀察 #content 容器的變化
            observer.observe(document.getElementById('remote_modal'), { childList: true, subtree: true });
        });
    });
    console.log("Corp EX Info Loaded!");
}

/**
 * 查找具有特定標籤名的父元素
 * @param {HTMLElement} element - 起始元素
 * @param {string} tagName - 父元素的標籤名
 * @returns {HTMLElement|null} - 找到的父元素或 null
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