import type { MessageViewInChat } from '$lib/components/index.js';
import { createContext } from 'svelte';

export class TextTentContext {
	public messages: MessageViewInChat[] = $state([]);
	private editingMessageIndex: number = $state(-1);
	public editingMessage: MessageViewInChat | undefined = $derived(
		this.messages[this.editingMessageIndex],
	);

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
