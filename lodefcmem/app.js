'use strict';
var client = require('cheerio-httpcli')


//var url = "https://jp.finalfantasyxiv.com/lodestone/freecompany/[FCID]/member/"
//var url2 = "https://jp.finalfantasyxiv.com/lodestone/freecompany/[FCID]/member/?page=2"

var targetFC = "";
var lastpage = "";


var param = {};

var url = "https://jp.finalfantasyxiv.com/lodestone/freecompany/" + targetFC + "/member/"

var nextPage = "0";
var lastPage = "999";
var nextUrl = "";

function getFCMembers(url) {

    client.fetch(url, param, function (err, $, res) {
        if (err) { console.log("Error:", err); return; }
        // body•\Ž¦
        $(".ldst__main").each(function (idx) {

            $(this).find('.btn__pager__next').each(function (id, el) {
                //console.log($(this).attr("href"));
                nextPage = $(this).attr("href").slice(-1);
                //console.log(nextPage);
            });
            $(this).find('.btn__pager__next--all').each(function (id, el) {
                //console.log($(this).attr("href"));
                lastPage = $(this).attr("href").slice(-1);
                //console.log(lastPage);
                if (nextPage != lastPage) {
                    var nextUrl = "https://jp.finalfantasyxiv.com/lodestone/freecompany/" + targetFC + "/member/?page=" + nextPage
                    var timerID = setTimeout(function () { getFCMembers(nextUrl); }, 10000);
                }
            });
            $(this).find('.entry__name').each(function (id, el) {
                console.log($(this).text());
            });
        });
    });
}

getFCMembers(url);

