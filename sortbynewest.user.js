// ==UserScript==
// @name         Sort By Newest SE
// @namespace    https://github.com/soscripted/sox
// @version      0.0.1
// @description  Sort by newest option for Stack Exchange
// @contributor  somebody1234
// @updateURL    https://rawgit.com/somebody1234/userscripts/master/sortbynewest.user.js

// @match        *://*.stackoverflow.com/*
// @match        *://*.stackexchange.com/*
// @match        *://*.superuser.com/*
// @match        *://*.serverfault.com/*
// @match        *://*.askubuntu.com/*
// @match        *://*.stackapps.com/*
// @match        *://*.mathoverflow.net/*
// @match        *://github.com/soscripted/*
// @match        *://soscripted.github.io/sox/*

// @exclude      *://data.stackexchange.com/*
// @exclude      *://api.stackexchange.com/*
// ==/UserScript==
var max=+$('.page-numbers').eq(-1).text()||+$('.page-numbers').eq(-2).text(),current=max+1-((window.location.href.match(/page=(\d+)/)||[])[1]||'1'),prefix=window.location.href.split('?')[0].replace(/https?:\/\/.+?.com/,'');
$('#tabs a[data-value=oldest]').after('<a href="https://codegolf.stackexchange.com'+prefix+'?page='+max+'&tab=oldest&sort-newest=true#tab-top" title="Answers in the opposite order to the order they were provided" data-value="newest" data-shortcut="N">newest</a>');
if (!/sort-newest=true/.test(window.location.href))throw 'Not sorted by newest, sort by newest userscript aborting.';
$('#tabs a[data-value=oldest]')[0].classList.remove('youarehere');
$('#tabs a[data-value=newest]')[0].classList.add('youarehere');
var offset=current<5?3-current:current>max-4?max-2-current:0;
function link(n){return'<a href="'+prefix+'?page='+(max+1-n)+'&amp;tab=oldest&amp;sort-newest=true#tab-top" title="go to page '+n+'"> <span class="page-numbers">'+n+'</span> </a>';}
$('.pager-answers').html(
(current>1?'<a href="'+prefix+'?page='+(current-1)+'&amp;tab=oldest#tab-top" rel="prev" title="go to page '+(current-1)+'"><span class="page-numbers prev">prev</span></a>'+link(1):'')+
'<span class="page-numbers dots">…</span>'.repeat(current>4)+
[-2,-1,0,1,2].map(function(n){n+=current+offset;if(n==current)return('<span class="page-numbers current">'+n+'</span>');else if(n>1&&n<max)return link(n);else return'';}).join('')+
'<span class="page-numbers dots">…</span>'.repeat(current<max-3)+
(current<max?link(max)+'<a href="'+prefix+'?page='+(current+1)+'&amp;tab=oldest#tab-top" rel="prev" title="go to page '+(current+1)+'"><span class="page-numbers next">next</span></a>':'')
);
var answers=$('.answer'),a=$('#answers > a'),after=$('.pager-answers').eq(1);
for(var i=answers.length-1;i>-1;i--){after.before(a[i+1]);after.before(answers[i]);}
