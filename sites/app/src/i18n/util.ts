export type NestedMessages = Map<string, string | NestedMessages>;

export function mappifyMessages(messages: object): NestedMessages {
    const nestedMessages = new Map<string, string | NestedMessages>();
    Object.entries(messages).forEach(([key, value]) => {
        if (typeof value === "string") {
            nestedMessages.set(key, value);
        } else if (typeof value === "object") {
            nestedMessages.set(key, mappifyMessages(value));
        }
    });
    return nestedMessages;
}

function flattenMessagesInner(messages: Record<string, string>, nestedMessages: NestedMessages, prefix = "") {
    nestedMessages.forEach((value, key) => {
        const prefixedKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "string") {
            messages[prefixedKey] = value;
        } else if (value instanceof Map) {
            flattenMessagesInner(messages, value, prefixedKey);
        }
    });
}

export function flattenMessages(
  nestedMessages: NestedMessages
): Record<string, string> {
  if (nestedMessages === null) {
    return {};
  }
  const messages: Record<string, string> = {};
  flattenMessagesInner(messages, nestedMessages);
  return messages;
}
