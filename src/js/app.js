import {
	debounce,
	nextTick,
} from 'https://cdn.skypack.dev/@studiometa/js-toolkit/utils';

const win = __iframe.contentWindow;
const doc = win.document;

const store = new URLSearchParams(location.hash.substr(1));
const storeSetter = store.set.bind(store);
const storeGetter = store.get.bind(store);
store.get = (key) => (store.has(key) ? atob(storeGetter(key)) : '');
store.set = (key, value) => {
	storeSetter(key, btoa(value));
	location.hash = store;
};
const initialHtml = store.get('html');
__html.textContent = initialHtml;
const initialStyle = store.get('style');
__style.textContent = initialStyle;
const initialScript = store.get('script');
__script.textContent = initialScript;

doc.documentElement.innerHTML = `
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<style id="style">${initialStyle}</style>
</head>
<body>
	${initialHtml}
</body>`;

const script = doc.createElement('script');
script.type = 'module';
script.id = 'script';
doc.head.appendChild(script.cloneNode());

async function updateHtml() {
	doc.body.innerHTML = __html.innerText;
	store.set('html', __html.innerText);
	await nextTick();
	updateScript(false);
}

function updateStyle() {
	win.style.textContent = __style.innerText;
	store.set('style', __style.innerText);
}

async function updateScript(resetHtml = true) {
	if (resetHtml) {
		doc.body.replaceWith(doc.body.cloneNode(true));
		await nextTick();
	}

	const clone = script.cloneNode();
	clone.textContent = __script.innerText;
	win.script.replaceWith(clone);
	store.set('script', __script.innerText);
}

function update() {
	updateHtml();
	updateStyle();
}

update();

// __run.onclick = update;

__html.oninput = debounce(updateHtml, 500);
__style.oninput = debounce(updateStyle, 500);
__script.oninput = debounce(updateScript, 500);
