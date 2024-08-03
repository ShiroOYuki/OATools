// ==UserScript==
// @name         Orangeapple Corp Hints
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  顯示課程章節進度
// @author       Shiro
// @match        https://corp.orangeapple.co/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=orangeapple.co
// @grant        none
// @require      https://github.com/ShiroOYuki/OATools/raw/main/OAHint/hint.js
// @require      https://github.com/ShiroOYuki/OATools/raw/main/OAHint/ex_info.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.addEventListener('load', () => {
        load_hint();
        load_ex_info();
    });

    function load_ex_info() {
        let record_btn = document.querySelectorAll("[id^=report_status] > div > a");
        console.log(record_btn);
    }
})();