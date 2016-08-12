// ==UserScript==
// @name         Reader Mode
// @namespace    global
// @version      0.0.1
// @description  try to take over the world!
// @author       Mars Ultor
// @match        *://*/*
// @grant        none
// @updateURL    https://rawgit.com/somebody1234/userscripts/master/readerMode.user.js
// ==/UserScript==

(function readerView() {
	'use strict';
	let c = document.createElement.bind(document),
		style = c('style'),
		keys = ['ArrowLeft', 'ArrowRight', 'a', 'd'],
		currentElement,
		currentIndex = [0],
		changeCurrentElement = function changeCurrentElement() {
			currentIndex = (currentIndex + articles.length) % articles.length;
			currentElement.classList.remove('GM-reader-active');
			currentElement = articles[currentIndex];
			currentElement.classList.add('GM-reader-active');
		},
		config = localStorage.getItem('GM-reader-config'),
		center = c('div'),
		excludeClass = ['signature'];
	if (config)
		config = JSON.parse(config);
	else
		config = {};
	style.innerHTML = `\
#GM-reader-view > div > div:not(.GM-reader-ui):not(.GM-reader-active), #GM-reader-view.GM-reader-hidden, .GM-reader-hidden {
	display: none;
}

#GM-reader-view {
	overflow: auto;
	z-index: 1001;
	top: 0;
	display: flex;
	background: white;
	position: fixed;
	width: 100%;
	height: 100%;
}`;
	document.body.appendChild(style);
	if (!/\//.test(window.location.href))
		return;
	let articles = [...document.getElementsByTagName('div')].filter(div => div.innerText.length >= 15 &&
		excludeClass.every(exclusion => !div.classList.contains(exclusion)) &&
		[...div.children].filter(child => child.tagName === 'P').length > 1),
		next = [],
		parents = [],
		active = false;
	if (!articles.length)
		return;
	currentElement = articles[0];
	let div = c('div');
	window.addEventListener('keydown', function onkeydown (e) {
		if (!active || !keys.includes(e.key))
			return;
		if (e.key === 'a' || e.key === 'ArrowLeft')
			currentIndex--;
		else
			currentIndex++;
		changeCurrentElement();
	});
	center.classList.add('GM-reader-ui');
	let d1 = c('div'),
		d2 = c('div'),
		d4 = c('div'),
		d5 = c('div'),
		d6 = c('div'),
		left = c('div'),
		d7 = c('div'),
		d8 = c('div'),
		right = c('div'),
		d9 = c('div');
	d1.classList.add('GM-reader-ui');
	d2.classList.add('GM-reader-ui');
	d4.classList.add('GM-reader-ui');
	d5.classList.add('GM-reader-ui');
	d6.classList.add('GM-reader-ui');
	left.classList.add('GM-reader-ui');
	d7.classList.add('GM-reader-ui');
	d8.classList.add('GM-reader-ui');
	right.classList.add('GM-reader-ui');
	d9.classList.add('GM-reader-ui');
	left.innerHTML = `\
<svg fill="#000000" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
<path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
<path d="M0-.5h24v24H0z" fill="none"/>
</svg>`;
	right.innerHTML = `\
<svg fill="#000000" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
<path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
<path d="M0-.25h24v24H0z" fill="none"/>
</svg>`;
	d1.style.flex = center.style.flex = d5.style.flex = left.style.flex = right.style.flex = '0 1 auto';
	d2.style.flex = d4.style.flex = d6.style.flex = d7.style.flex = d8.style.flex = d9.style.flex = '1 0 auto';
	d1.style.display = d5.style.display = 'flex';
	d1.style.flexFlow = d5.style.flexFlow = 'column';
	div.appendChild(d1);
	div.appendChild(d2);
	div.appendChild(center);
	div.appendChild(d4);
	div.appendChild(d5);
	d1.appendChild(d6);
	d1.appendChild(left);
	d1.appendChild(d7);
	d5.appendChild(d8);
	d5.appendChild(right);
	d5.appendChild(d9);
	left.onclick = function onclick () {
		currentIndex--;
		changeCurrentElement();
	};
	right.onclick = function onclick () {
		currentIndex++;
		changeCurrentElement();
	};
	if (articles.length === 1) {
		d1.classList.add('GM-reader-hidden');
		d5.classList.add('GM-reader-hidden');
	}
	div.id = 'GM-reader-view';
	div.classList.add('GM-reader-hidden');
	document.body.appendChild(div);
	for (let i = 0; i < articles.length; i++) {
		let article = articles[i];
		next.push(articles[i].nextElementSibling);
		parents.push(articles[i].parentElement);
	}
	function toggleReaderMode (e) {
		active = !active;
		if (active) {
			div.classList.remove('GM-reader-hidden');
			for (let i = 0; i < articles.length; i++)
				center.appendChild(articles[i]);
			currentElement = articles[currentIndex];
			currentElement.classList.add('GM-reader-active');
		} else {
			div.classList.add('GM-reader-hidden');
			currentElement.classList.remove('GM-reader-active');
			currentElement = undefined;
			for (let i = articles.length - 1; i > -1; i--) {
				if (next[i])
					parents[i].insertBefore(articles[i], next[i]);
				else
					parents[i].appendChild(articles[i]);
			}
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	}
	let button = c('div');
	button.innerHTML = `\
<svg style="position: absolute; margin: auto; top: 0; bottom: 0; left: 0; right: 0;" fill="#000000" height="75%" viewBox="0 0 24 24" width="75%" xmlns="http://www.w3.org/2000/svg">
	<path d="M-74 29h48v48h-48V29zM0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/>
	<path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"/>
</svg>`;
	button.style.position = 'fixed';
	button.style.borderRadius = '50%';
	button.style.zIndex = 1001;
	button.style.background = config.height || 'rgba(128, 128, 128, .5)';
	button.style.width = button.style.height = config.size || '32px';
	button.style.top = config.top || '25px';
	button.style.left = config.left || '25px';
	button.pos = {
		top: parseInt(config.top || '0') || 25,
		left: parseInt(config.left || '0') || 25
	};
	let size = config.size || 32,
		halfSize = config.size ? config.size / 2  : 16;
	button.onmousedown = function onmousedown (e) {
		this.dragging = true;
		this.oldPos = {
			top: this.pos.top,
			left: this.pos.left
		};
		e.preventDefault();
		e.stopPropagation();
	};
	document.addEventListener('mousemove', function onmousemove (e) {
		if (!button.dragging)
			return true;
		button.pos.top += e.movementY;
		button.pos.left += e.movementX;
		button.style.top = button.pos.top + 'px';
		button.style.left = button.pos.left + 'px';
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	document.addEventListener('mouseup', function onmouseup (e) {
		if (!button.dragging)
			return true;
		button.dragging = false;
		if (button.pos.top === button.oldPos.top && button.pos.left === button.oldPos.left) {
			toggleReaderMode(e);
			return;
		}
		config.top = button.style.top;
		config.left = button.style.left;
		localStorage.setItem('GM-reader-config', JSON.stringify(config));
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	document.body.appendChild(button);
})();
