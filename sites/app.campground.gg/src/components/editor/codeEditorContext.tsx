import { createContext, useContext } from "react";
import type { RichEditorCodeLine } from "./editor";

export const CodeEditorContext = createContext<RichEditorCodeLine[]>([]);
export const useCodeEditorContext = () => useContext(CodeEditorContext);

export function CodeEditorContextProvider({ codeLines, children }: React.PropsWithChildren & { codeLines: RichEditorCodeLine[] }) {
    return (
        <CodeEditorContext.Provider value={codeLines}>
            {children}
        </CodeEditorContext.Provider>
    )
}