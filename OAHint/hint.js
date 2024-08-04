function load_hint() {
    const chapters = [
        ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12", "L13", "L14", "L15"],
        ["K", "H", "H", "I", "H", "H", "H", "G", "H", "H", "H", "H", "H", "H", "G"],
        ["G", "F", "G", "G", "G", "G", "F", "F", "I", "I", "F", "F", "I", "I", "G"],
        ["F", "G", "G", "H", "F", "I", "H", "G", "G", "H", "I", "G", "G", "F", "G"]
    ];
    const types = ["", "初階班", "進階班", "綜合應用班"]
    const lessons = [
        [
            "認識麥塊", "認識 Agent", "螺旋樓梯", "建造高塔", "引爆 TNT",
            "自動化西瓜農場", "發射煙火", "鵝卵石生產線", "TNT 大砲", "火焰發射器",
            "紅石電路", "自動販賣機", "自動化生產線", "雲霄飛車", "看誰愛跳水"
        ],
        [
            "觀察者自動農場", "金字塔守衛", "美妙音符方塊", "智能大考驗", "藥水魔法師",
            "麥田圈印表機", "狩獵遊戲", "超人換裝間", "猜拳遊戲", "彩色隱藏門",
            "秘密圖書館", "解謎達人", "快速傳輸器", "計時跑酷賽", "成功破關王"
        ],
        [
            "攤販製造機", "中央噴水池", "遊戲攤販", "壽司攤販", "商店街導覽員",
            "射箭運動會", "超級障礙賽", "怪物闖關賽", "幸運跑酷賽", "急速礦車手",
            "雙人大富翁", "機會與命運", "道具商店", "星星兌換站", "大富翁機制"
        ]
    ];

    let paper = create_paper();
    let info_container = create_lesson_info();
    for (let i=0; i<4; i++) {
        let title = create_title(types[i]);
        title.addEventListener("mouseover", function() {
            this.style.backgroundColor = "wheat";
        });
        title.addEventListener("mouseout", function() {
            this.style.backgroundColor = "transparent";
        });

        let row = create_row();
        row.appendChild(title);

        let chapters_container = create_chapter_container()
        for (let j=0; j<15; j++) {
            let chapter = create_chapter(chapters[i][j]);

            if (i === 0) {
                chapter.style.fontWeight = "bold";
                chapter.dataset.l = j+1;
                chapter.addEventListener("mouseover", function() {
                    this.style.backgroundColor = "wheat";
                });
                chapter.addEventListener("mouseout", function() {
                    this.style.backgroundColor = "transparent";
                });
            }
            else {
                chapter.addEventListener("mouseover", function() {
                    this.style.backgroundColor = "wheat";
                    this.parentElement.parentElement.children[0].style.backgroundColor = "wheat";
                    document.querySelector(`[data-l="${j+1}"]`).style.backgroundColor = "wheat";
                    info_container.innerHTML = lessons[i-1][j];
                    info_container.style.visibility = "visible";
                });
                chapter.addEventListener("mouseout", function() {
                    this.style.backgroundColor = "transparent";
                    this.parentElement.parentElement.children[0].style.backgroundColor = "transparent";
                    document.querySelector(`[data-l="${j+1}"]`).style.backgroundColor = "transparent";
                    info_container.innerHTML = "";
                    info_container.style.visibility = "hidden";
                });
            }

            chapters_container.appendChild(chapter);
        }
        row.appendChild(chapters_container);
        paper.appendChild(row);
    }

    let btn = create_btn();
    btn.addEventListener("click", function () {
        paper.style.visibility = paper.style.visibility === "hidden"? "visible":"hidden";
    });

    const btn_icon = create_icon();
    btn.appendChild(btn_icon);

    let comp = create_comp();
    let page_body = document.body;
    if (page_body) {
        comp.appendChild(btn);
        comp.appendChild(paper);
        comp.appendChild(info_container);
        page_body.appendChild(comp);
        console.log("Corp-Hint Loaded!");
    }
    else {
        console.log("Corp-Hint Error!")
    }
}

function create_btn() {
    let btn = document.createElement("button");
    btn.style.zIndex = 2000;
    btn.style.position = "relative";
    btn.style.width = "max-content";
    btn.style.pointerEvents = "auto";
    btn.style.padding = 0;
    btn.style.backgroundColor = "transparent";
    btn.style.border = "none";
    return btn;
}

function create_paper() {
    let paper = document.createElement("div");
    paper.style.zIndex = 2000;
    paper.style.backgroundColor = "white";
    paper.style.width = "min-content";
    paper.style.borderRadius = "10px";
    paper.style.border = "1px solid black";
    paper.style.pointerEvents = "auto";
    paper.style.position = "relative";
    paper.style.visibility = "hidden";
    paper.style.overflow = "hidden";
    return paper;
}

function create_title(text) {
    let title_text = document.createTextNode(text);
    let title = document.createElement("p")
    title.appendChild(title_text);
    title.style.fontWeight = "bold";
    title.style.width = "100px";
    title.style.userSelect = "none";
    title.style.margin = "0px";
    title.style.padding = "5px";
    return title;
}

function create_row() {
    let row = document.createElement("div");
    row.style.display = "flex";
    return row;
}

function create_chapter(text) {
    let chapter_text = document.createTextNode(text);
    let chapter = document.createElement("p");
    chapter.appendChild(chapter_text);
    chapter.style.width = "50px";
    chapter.style.borderLeft = "1px solid black";
    chapter.style.textAlign = "center";
    chapter.style.userSelect = "none";
    chapter.style.margin = "0px";
    chapter.style.padding = "5px";
    return chapter
}

function create_chapter_container() {
    let chapters_container = document.createElement("div");
    chapters_container.style.display = "flex";
    return chapters_container;
}

function create_comp() {
    let comp = document.createElement("div");
    comp.style.position = "fixed";
    comp.style.top = "0px";
    comp.style.right = "0px";
    comp.style.padding = "10px";
    comp.style.display = "flex";
    comp.style.flexDirection = "column";
    comp.style.alignItems = "flex-end";
    comp.style.pointerEvents = "none";
    comp.style.gap = "5px";
    comp.style.boxSizing = "border-box";
    comp.style.zIndex = 2000;
    return comp;
}

function create_icon() {
    let btn_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    btn_icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    btn_icon.setAttribute("fill", "white");
    btn_icon.setAttribute("viewBox", "0 0 24 24");
    btn_icon.setAttribute("stroke-width", "1.5");
    btn_icon.setAttribute("stroke", "#34a8eb");
    btn_icon.style.width = "35px";
    btn_icon.style.height = "35px";

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("d", "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z");

    btn_icon.appendChild(path);

    return btn_icon;
}

function create_lesson_info() {
    let info_container = document.createElement("div");
    info_container.style.borderRadius = "10px";
    info_container.style.backgroundColor = "white";
    info_container.style.border = "1px solid black";
    info_container.style.padding = "5px";
    info_container.style.visibility = "hidden";
    return info_container;
}