import type { UserPostComment } from "types/user";

export type Post = {
    id: string;
    title: string;
    content: string;
    tags: string[];
    comments: number;
    createdAt: Date;
};

export const examplePosts: Post[] = [
    {
        id: "abcdABCD",
        title: "Example post",
        content: "Hey, this is an example post.",
        tags: ["example", "post", "test"],
        comments: 2,
        createdAt: new Date(Date.now() - 30000),
    },
    {
        id: "efghEFGH",
        title: "Another post",
        content: "Hey, this is another example post that you might see. This one tests Markdown: `a`, **b**, *c*",
        tags: ["markdown", "example", "post"],
        comments: 0,
        createdAt: new Date(Date.now() - 720000)
    },
    {
        id: "ijklIJKL",
        title: "Hey hey",
        content:
`I made a severe lapse in judgement. Damn.

# Example

- **bold**
- *italic*
- \`inline code\`
- ~~Strike through~~

# To-do
- [ ] Markdown
- [x] Markdown

# HTML Examples

<div>a</div>
<strong>a</strong>

# Tables

|   | a  | b  |
|---|----|----|
| a | aa | ab |
| b | ba | bb |

|   | a  | b  | c                  |  d                | e                                                         |
|---|----|----|--------------------|-------------------|-----------------------------------------------------------|
| a | aa | ab | aaaaaaaaaaaaaaaaaa | aaaaaaaaaaaaaaaaa | aaaaaaaaaa \`aaaaaaaaaaaaaaa\`aaaaaaaaaaaaaaaaaaaaaaaaaaa |
| b | ba | bb |                    |                   |                                                           |

> Example quote
> \`\`\`
> Hello
> aaaa
> \`\`\`

\`\`\`ts
Another example codeblock
Like here
const a = "b";
/*
comment here
*/
type Props = {
    a: string[];
};
const b = \`a: \${{
    "a": 2
}} <- a\`;

export default class Example extends React.Component {

    render() {
        return (
            <span>{this.props.a}</span>
        );
    }
}
\`\`\`

\`\`\`js another {"example": "here"}
aaaa
bbb
\`\`\`

\`\`\`js {"start": 4, "fileName": "example.ts", "languageName": "Example name", "highlight": [2]}
With proper meta now
Notice the starting line is 4
And this one is marked
And this one is not
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
\`\`\`

\`\`\`diff
+ example
- example
! example
!!! example
@ example
@@@ example
\`\`\`
`,
        tags: ["markdown", "example", "post"],
        comments: 0,
        createdAt: new Date(Date.now() - 8900000)
    },
];

export const exampleComments: Omit<UserPostComment, "author">[] = [
    {
        id: "12345678",
        content: "This is a comment.",
        createdAt: new Date(Date.now() - 20000),
    },
    {
        id: "87654321",
        content: "This is another comment.",
        createdAt: new Date(Date.now() - 10000),
    }
];