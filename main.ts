import {Editor, MarkdownView, Plugin } from 'obsidian';
import SeSettingTab, { IMyPluginSettings, DEFAULT_SETTINGS } from 'components/SettingsTab/SeSettingTab';
import SeModal from 'components/Modal/SeModal';
import * as se from './utils/seseapi'

export let currentSetting: IMyPluginSettings 

export default class MyPlugin extends Plugin {
	settings: IMyPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addCommand({
			id: '获取涩图',
			name: "获取涩图",
			callback: () => {
				new SeModal(this.app).open()
			}
		})
		this.addCommand({
			id: '插入涩图',
			name: '插入涩图',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				const res = await se.getR18()
				console.log(res)
				editor.replaceSelection(`![${res[0].title}](${res[0].urls[this.settings.size]})`);
			}
		});

		this.addCommand({
			id: '插入每日一言',
			name: "插入一言",
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				const res = await se.getYiYan()
				console.log(res)
				editor.replaceSelection(
					`> ${res.hitokoto}  
					《${res.from}》 ${res.from_who}`
				);
			}

		})
		this.addSettingTab(new SeSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		currentSetting = this.settings
	}

	async saveSettings() {
		currentSetting = this.settings
		await this.saveData(this.settings);
	}
}

