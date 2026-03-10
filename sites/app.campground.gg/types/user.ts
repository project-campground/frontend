export interface ProfileView {
    did: string;
    handle: string;
    displayName: string | null;

    description: string | null;
    tagline: string | null;
    location: string | null;

    avatar: string | null;
    banner: string | null;

    createdAt: string | null;
    indexedAt: string | null;
}
export interface ProfileViewBasic extends ProfileView {
    
}
export interface ProfileViewDetailed extends ProfileView {
    description: string;
    indexedAt: string;
}
export interface ProfilePostView {
    uri: string;
    parentUri?: string | null;
    content: string;
    tags: string[];
    createdAt: string;
    indexedAt: string | null;
    updatedAt: string | null;
    author: ProfileView;
};
export interface ProfilePostViewWithParent extends ProfilePostView {
    parent: ProfilePostViewBasic | null;
}
export interface ProfilePostViewBasic extends ProfilePostView {
    replyCount: number;
};
export interface ProfilePostViewParented extends ProfilePostViewWithParent, ProfilePostViewBasic {
};
export interface ProfilePostViewDetailed extends ProfilePostViewWithParent {
    replies: ProfilePostViewBasic[];
};
export interface EitherProfilePostView extends ProfilePostViewBasic, ProfilePostViewParented, ProfilePostViewDetailed {

}