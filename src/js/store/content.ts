const store = new URLSearchParams(location.hash.substr(1));
const storeSetter = store.set.bind(store);
const storeGetter = store.get.bind(store);
store.get = (key) => (store.has(key) ? atob(storeGetter(key)) : '');
store.set = (key, value) => {
	storeSetter(key, btoa(value));
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
	return store.get('html') ||
		`<div class="p-10 dark:text-white">
	Hello world!
</div>`;
}

export function setHtml(value) {
	console.log('setHtml', value);
	store.set('html', value);
}
