export type CommentType = {
    id: string;
    details: string;
    rating: number;
    post: {
        id: string;
    };
};
export type PostType = {
    id: string;
    details: string;
    locationId: string;
};