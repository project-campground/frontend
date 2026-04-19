export interface CampgroundProfileRecord {
    displayName: string | null;
    labels: any[];
    tagline: string | null;
    location: string | null;
    createdAt: string;
    description: string | null;
    socialConnections: any[];
    avatar: string | null;
}
export interface ProfileViewEmpty {
    did: string;
    handle: string;
}
export interface ProfileViewBasic extends ProfileViewEmpty {
    displayName: string | null;
    
    description: string | null;
    tagline: string | null;
    location: string | null;
    
    avatar: string | null;
    banner: string | null;
    
    createdAt: string | null;
}
export interface ProfileViewDetailed extends ProfileViewBasic {
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
    author: ProfileViewEmpty;
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