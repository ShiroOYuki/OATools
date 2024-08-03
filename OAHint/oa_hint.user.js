// ==UserScript==
// @name         Orangeapple Corp Hints
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  顯示課程章節進度
// @author       Shiro
// @match        https://corp.orangeapple.co/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=orangeapple.co
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.addEventListener('load', () => {
        let chapters = [
            ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "L10", "L11", "L12", "L13", "L14", "L15"],
            ["K", "H", "H", "I", "H", "H", "H", "G", "H", "H", "H", "H", "H", "H", "G"],
            ["G", "F", "G", "G", "G", "G", "F", "F", "I", "I", "F", "F", "I", "I", "G"],
            ["F", "G", "G", "H", "F", "I", "H", "G", "G", "H", "I", "G", "G", "F", "G"]
        ];
        let types = ["", "初階班", "進階班", "綜合應用班"]

        
        let paper = create_paper();
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
                    });
                    chapter.addEventListener("mouseout", function() {
                        this.style.backgroundColor = "transparent";
                        this.parentElement.parentElement.children[0].style.backgroundColor = "transparent";
                        document.querySelector(`[data-l="${j+1}"]`).style.backgroundColor = "transparent";
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
            page_body.appendChild(comp);
            console.log("Corp-Hint Loaded!");
        }
        else {
            console.log("Corp-Hint Error!")
        }
    });

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
        paper.style.padding = "5px";
        paper.style.borderRadius = "10px";
        paper.style.border = "1px solid black";
        paper.style.pointerEvents = "auto";
        paper.style.position = "relative";
        paper.style.visibility = "hidden";
        return paper;
    }

    function create_title(text) {
        let title_text = document.createTextNode(text);
        let title = document.createElement("p")
        title.appendChild(title_text);
        title.style.fontWeight = "bold";
        title.style.width = "100px";
        title.style.borderRight = "1px solid black"
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
        chapter.style.borderRight = "1px solid black";
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
})();