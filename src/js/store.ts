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
	return store.get('html');
}

export function setHtml(value) {
	console.log('setHtml', value);
	store.set('html', value);
}

export type Themes = 'dark' | 'light';

let themeCallbacks = [];

export function getTheme(): Themes {
	return (localStorage.getItem('theme') || 'light') as Themes;
}

export function themeIsDark() {
	return getTheme() === 'dark';
}

export function themeIsLight() {
	return getTheme() === 'light';
}

export function setTheme(value: Themes) {
	localStorage.setItem('theme', value);
	document.documentElement.classList.toggle('dark', value === 'dark');
	themeCallbacks.forEach((callback) => callback(value));
}

export function watchTheme(callback) {
	const index = themeCallbacks.length;
	themeCallbacks.push(callback);

	return () => {
		themeCallbacks.splice(index, 1);
	}
}

export { store };
