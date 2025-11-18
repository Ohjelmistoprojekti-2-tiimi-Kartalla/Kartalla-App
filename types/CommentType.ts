export type CommentType = {
    id: string;
    details: string;
    post: {
        id: string;
    };
};
export type PostType = {
    id: string;
    details: string;
    locationId: string;
};