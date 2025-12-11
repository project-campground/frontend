import { createContext, useContext } from "react";
import type { EditorCodeLine } from "../../editor/editor";

export const CodeEditorContext = createContext<EditorCodeLine[]>([]);
export const useCodeEditorContext = () => useContext(CodeEditorContext);

export function CodeEditorContextProvider({ codeLines, children }: React.PropsWithChildren & { codeLines: EditorCodeLine[] }) {
    return (
        <CodeEditorContext.Provider value={codeLines}>
            {children}
        </CodeEditorContext.Provider>
    )
}