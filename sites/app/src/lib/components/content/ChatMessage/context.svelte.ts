import type HTTPBackendClient from '$lib/api/http/HTTPBackendClient.ts';
import { MessageState, type MessageViewInChat } from '$lib/components/index.js';
import type { MessageViewWithReplies } from '$lib/types/campground/content.js';
import { createContext } from 'svelte';

export class TextTentContext {
	public messages: MessageViewInChat[] = $state([]);

	public replyingTo: MessageViewWithReplies[] = $state([]);

	private editingMessageIndex: number = $state(-1);
	public editingMessage: MessageViewInChat | undefined = $derived(
		this.messages[this.editingMessageIndex],
	);

	constructor(public appview: HTTPBackendClient) {}

	public async deleteMessage(tentId: string, messageId: string) {
		const loadedMessage = this.messages.findIndex((x) => x.id === messageId);

		// Can't really cancel fetch
		// It is safe to index -1, since it will just give undefined
		if (this.messages[loadedMessage]?.state === MessageState.Creating) return;
		// Since it is kept in the client side, it is safe to remove from the list
		else if (this.messages[loadedMessage]?.state === MessageState.Failed)
			return this.messages.splice(loadedMessage, 1);

		return this.appview.messages.delete(tentId, messageId);
	}

	public addReplyingTo(message: MessageViewWithReplies) {
		return this.replyingTo.push(message);
	}
	public removeReplyingTo(messageId: string) {
		return (this.replyingTo = this.replyingTo.filter((x) => x.id !== messageId));
	}
	public isReplyingTo(messageId: string) {
		return this.replyingTo.some((x) => x.id === messageId);
	}
	public clearReplies() {
		return (this.replyingTo = []);
	}

	public setEditingMessage(messageId: string) {
		this.editingMessageIndex = this.messages.findIndex((x) => x.id === messageId);
	}
	public clearEditingMessage() {
		return (this.editingMessageIndex = -1);
	}
	// Since the messages are listed newest first
	public setEditingPreviousMessage() {
		return this.editingMessageIndex++;
	}
	public setEditingNextMessage() {
		return this.editingMessageIndex--;
	}
}

export const [getTextTent, setTextTent] = createContext<TextTentContext>();
