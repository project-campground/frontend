export interface User {
    did: string;
    handle: string;
    displayName: string;

    description: string | null;
    tagline: string | null;
    location: string | null;

    avatar: string | null;
    banner: string | null;

    createdAt: string;
}
export interface UserPost {
    id: string;
    title: string;
    content: string;
    tags: string[];
    comments: number;
    createdAt: Date;
    author: User;
    profileUser: User;
};
export interface UserPostComment {
    id: string;
    content: string;
    createdAt: Date;
    author: User;
};