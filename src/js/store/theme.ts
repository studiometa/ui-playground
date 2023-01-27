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
