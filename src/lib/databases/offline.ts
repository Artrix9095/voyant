import { Store } from 'tauri-plugin-store-api';

export const settings = new Store('settings.json');

export const data = new Store('data.json');
