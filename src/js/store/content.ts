import { historyReplace } from '@studiometa/js-toolkit/utils';
import { zip, unzip } from '../utils/zip.js';

if (location.hash && !location.search) {
	try {
		const search = new URLSearchParams(location.hash.substr(1));
		historyReplace({ search });
		location.hash = '';
	} catch (err) {}
}

// Redirect to ui.studiometa.dev
const url = new URL(location.href);
url.host = 'ui.studiometa.dev';
url.pathname = '/play/';
location.href = url.href;

const store = new URLSearchParams(location.search || location.hash.substr(1));

const storeSetter = store.set.bind(store);
const storeGetter = store.get.bind(store);

store.get = (key) => {
	return (store.has(key) ? unzip(storeGetter(key)) : '')
};

store.set = (key, value) => {
	storeSetter(key, zip(value));
	historyReplace({ search: store });
};

export function getScript() {
	return (
		store.get('script') ||
		`import { Base, createApp } from 'https://cdn.skypack.dev/@studiometa/js-toolkit';

class App extends Base {
	static config = {
		name: 'App',
	};
}

createApp(App)
`
	);
}

export function setScript(value) {
	store.set('script', value);
}

export function getHtml() {
	return (
		store.get('html') ||
		`{% html_element 'div' with { class: 'p-10' } %}
	Hello world!
{% end_html_element %}`
	);
}

export function setHtml(value) {
	store.set('html', value);
}
