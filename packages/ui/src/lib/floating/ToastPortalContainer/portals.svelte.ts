import { v4 as uuid } from 'uuid';
import { Portal, PortalInstance } from '$lib/floating/portals.svelte.js';
import { createContext } from 'svelte';
import type { ComponentColor } from '$lib/types/attributes.js';

type ToastValue = string | number | boolean;

export class ToastPortalInstance extends PortalInstance<ToastPortal> {
	public disappearAt: number;

	constructor(
		key: string,
		portal: ToastPortal,
		public color: ComponentColor,
		public message: ToastValue,
		timeShown?: number,
	) {
		super(key, portal);

		this.disappearAt = Date.now() + (timeShown ?? ToastPortalInstance.getTimeFromMessage(message));
	}

	public static getTimeFromMessage(message: ToastValue): number {
		const str = message.toString();

		return 2000 + str.length * 8;
	}
}
export class ToastPortal extends Portal<ToastPortalInstance> {
	public notify(
		color: ComponentColor,
		message: ToastValue,
		timeShown?: number,
		key: string = uuid(),
	): ToastPortalInstance {
		const instance = new ToastPortalInstance(key, this, color, message, timeShown);
		this.items.push(instance);
		return instance;
	}
	public notifyError(
		message: ToastValue,
		timeShown?: number,
		key: string = uuid(),
	): ToastPortalInstance {
		return this.notify('danger', message, timeShown, key);
	}
	public notifySuccess(
		message: ToastValue,
		timeShown?: number,
		key: string = uuid(),
	): ToastPortalInstance {
		return this.notify('success', message, timeShown, key);
	}
	public notifyInfo(
		message: ToastValue,
		timeShown?: number,
		key: string = uuid(),
	): ToastPortalInstance {
		return this.notify('info', message, timeShown, key);
	}
	public notifyWarning(
		message: ToastValue,
		timeShown?: number,
		key: string = uuid(),
	): ToastPortalInstance {
		return this.notify('warning', message, timeShown, key);
	}
	public notifyRecommendation(
		message: ToastValue,
		timeShown?: number,
		key: string = uuid(),
	): ToastPortalInstance {
		return this.notify('primary', message, timeShown, key);
	}
}
export const [getToastPortal, setToastPortal] = createContext<ToastPortal>();
