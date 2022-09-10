
import { currentSetting } from '../main'
import { requestUrl } from "obsidian"
import { size } from 'components/SettingsTab/SeSettingTab'

export async function getYiYan():Promise<IYiYan> {
	const res = await requestUrl("https://v1.hitokoto.cn?c=a")
	return await res.json
}
export interface IYiYan {
	id: number;
	length: number;
	uuid: string;
	type: string;
	reviewer: number;
	from: string;
	from_who: string;
	hitokoto: string;
}

export async function getR18(): Promise<IseImage[]> {
	let mark = 0
	if (currentSetting.R18 == true)
		mark = 1
	const url = `https://api.lolicon.app/setu/v2?size=regular&size=small&size=thumb&size=mini&size=original&size=original?r18=${mark}${"?" + currentSetting.pictype}`
	const res = await requestUrl(url)
	return res.json.data as IseImage[]
}

type IUrl =  {
	[key in size]?: string
}

export interface IseImage {
	pid: number;
	p: number;
	uid: number;
	title: string;
	author: string;
	r18: boolean;
	width: number;
	height: number;
	tags: string[];
	ext: string;
	uploadDate: number;
	urls: IUrl;
}

