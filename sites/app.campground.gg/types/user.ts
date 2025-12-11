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
    uri: string;
    parentUri?: string | null;
    content: string;
    tags: string[];
    createdAt: string;
    indexedAt: string | null;
    updatedAt: string | null;
    author: User;
};
export interface UserPostWithParent extends UserPost {
    parent: UserPostBasic | null;
}
export interface UserPostBasic extends UserPost {
    replyCount: number;
};
export interface UserPostParented extends UserPostWithParent, UserPostBasic {
};
export interface UserPostDetailed extends UserPostWithParent {
    replies: UserPostBasic[];
};
export interface EitherUserPost extends UserPostBasic, UserPostDetailed {

}