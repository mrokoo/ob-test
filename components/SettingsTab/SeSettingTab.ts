import { App, Setting, PluginSettingTab} from 'obsidian'
import MyPlugin from '../../main'

export type size = "original" | "regular" | "small" | "thumb" | "mini"

export const DEFAULT_SETTINGS: IMyPluginSettings = {
	pictype: "黑丝|白丝",
	R18: false,
	size: "small"
}

export interface IMyPluginSettings {
	pictype: string;
	R18: boolean;
	size: size;
}

export default class SeSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: '涩涩图设置' });

		new Setting(containerEl)
			.setName("图片类型")
			.setDesc('使用 "|" 分割。例如:黑丝|白丝')
			// .setHeading()
			.addTextArea(e => e
				.setPlaceholder('输入图片类型')
				.setValue(this.plugin.settings.pictype)
				.onChange(async (value) => {
					this.plugin.settings.pictype = value;
					await this.plugin.saveSettings();
				})
			)
			
		new Setting(containerEl)
			.setName("是否开启R18")
			.setDesc("老司机懂得~!")
			.addToggle(e => e
				.setValue(this.plugin.settings.R18)
				.onChange(async (value) => {
					this.plugin.settings.R18 = value;
					await this.plugin.saveSettings();
				})
			)
		new Setting(containerEl)
			.setName("图片尺寸大小")
			.setDesc("尺寸越大,加载时间越长")
			.addDropdown( e => e
				.addOptions(
					{
						"original": "original",
						"regular": "regular",
						"small": "small",
						"thumb": "thumb",
						"mini": "mini"
					}
				)
				.setValue(this.plugin.settings.size)
				.onChange(async (value:size) => {
					this.plugin.settings.size = value
					await this.plugin.saveSettings()
					console.log(this.plugin.settings)
				})
			)
		
	}
}
