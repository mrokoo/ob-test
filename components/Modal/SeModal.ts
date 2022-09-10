import { App, Modal } from "obsidian";
import { currentSetting } from "main";
import * as se from '../../utils/seseapi'

export default class SeModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	async onOpen() {
		const { contentEl } = this;
		const res = await se.getR18()
		console.log(res)
		contentEl.createEl('img', {
			attr: {
				"src": res[0].urls[currentSetting.size] as string,
				"id": "se-targe"
			}
		})
		contentEl.createEl('h2', {
			text: `作品标题: ${res[0].title}`
		})
		contentEl.createEl('p', {
			text: `作者:${res[0].author}`
		})
		contentEl.addClass('Modal-center')
		const savebtn = contentEl.createEl('button')
		savebtn.addEventListener("click", (e) => {
			const imgs = document.querySelector('#se-targe') as HTMLImageElement
			const a = document.createElement('a');
			a.download = 'xds' + new Date().getTime() || '下载图片名称';//这边是文件名，可以自定义
			a.href = imgs.src;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		})
		savebtn.setText("保存图片")

	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
