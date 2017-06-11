// ==UserScript==
// @name         DH2 hide
// @namespace    http://www.diamondhunt.co
// @description  Improve Diamond Hunt 2
// @author       somebody
// @version      0.0.1
// @include      http://www.diamondhunt.co/game.php
// @updateURL    https://rawgit.com/somebody1234/userscripts/master/dh2hide.user.js
// ==/UserScript==
$('#tab-container-bar-skills,#cooks-book-back-btn,.energy-label,#shop-stardustBox1,#shop-stardustBox2,#shop-stardustBox3').hide();
$('#stardust-change').css('width','inherit');
setTimeout(_=>$($('.top-bar')[0]).find('td').each((i,e)=>e.style.textAlign=e.style.width=null),1e4);
td=$('<td>');
td.append($('#notifaction-area'));
$($('.top-bar')[0]).find('tr').append(td);
$($('.top-bar')[0]).find('tr').css('display','inline');
if(isHardcore)$('#tab-container-bar-shop').attr('onclick',"openTab('npcshop')||(this.style.background='linear-gradient(black, red)')");
$('#tab-container-bar-mining').one('click',_=>$('#item-box-emptyAnvil,#item-box-miner,#item-box-handheldOilPump,#item-box-boundOilPipe,#item-box-boundPumpjacks,#item-box-boundOilFactory').hide());
$('#tab-container-bar-cooking').one('click',_=>$('#item-box-cooksBook').hide());
$('#tab-container-bar-woodcutting').one('click',_=>$('.woodcutting-tree[style*=red]').hide());
$('#tab-container-bar-farming').one('click',_=>$('.farming-patch-locked').hide());
$('#tab-container-bar-brewing').on('click',_=>$('#table-brewing-recipe tr').each((i,e)=>e.style.backgroundColor=='rgb(255, 204, 224)'?$(e).hide():$(e).show()));
$('<td style="background: linear-gradient(black, grey);" id="tab-container-bar-recipes" onclick="openTab(\'cooksBook\')||(this.style.background=\'linear-gradient(black, red)\')"><img class="image-icon-50" src="images/cooksBook.png"><span id="tab-container-bar-recipes-label">Recipes</span></td>').appendTo('.tab-bar tr');
$('#tab-container-bar-recipes').on('click',_=>$('#table-cooksBook-recipe tr').each((i,e)=>e.style.backgroundColor=='rgb(255, 204, 224)'?$(e).hide():$(e).show()));
$('#dialogue-brewing input[value=Brew]').on('click',_=>setTimeout(_=>$('#table-brewing-recipe tr').each((i,e)=>e.style.backgroundColor=='rgb(255, 204, 224)'?$(e).hide():$(e).show()),2500));
$('#dialogue-cooksBook input[value=Prepare]').on('click',_=>setTimeout(_=>$('#table-cooksBook-recipe tr').each((i,e)=>e.style.backgroundColor=='rgb(255, 204, 224)'?$(e).hide():$(e).show()),2500));
$('.tab-bar td:not(#tab-container-bar-recipes),.top-links[onclick*=profile]').on('click',_=>$('#tab-container-bar-recipes').css('background','linear-gradient(black, grey)'));
$('#div-chat').css({position:'absolute',bottom:0,width:'100%'});
$('#div-chat-general').css('height','30vh');
