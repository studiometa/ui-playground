import { zip, unzip } from '../utils/zip.js';

const store = new URLSearchParams(location.hash.substr(1));

const storeSetter = store.set.bind(store);
const storeGetter = store.get.bind(store);

store.get = (key) => {
	return (store.has(key) ? unzip(storeGetter(key)) : '')
};

store.set = (key, value) => {
	storeSetter(key, zip(value));
	location.hash = store.toString();
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
