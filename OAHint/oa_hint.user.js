// ==UserScript==
// @name         Orangeapple Corp Hints
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  顯示課程章節進度
// @author       Shiro
// @match        https://corp.orangeapple.co/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=orangeapple.co
// @grant        none
// @required     https://github.com/ShiroOYuki/OATools/raw/main/OAHint/hint.js

(function() {
    'use strict';

    // Your code here...
    window.addEventListener('load', () => {
        load_hint();
    });
})();