export type UnparsedComment = {
    authorId: string;
    authorName: string;
    content: string;
    id: string;
};

export type Vote = {
    prefix: string;
    position: number;
    photoNumber: string;
};

export enum CommentType {
    Ignore,
    Submission,
    StartVoting,
    Vote
}

type Common = {
    authorId: string;
    authorName: string;
    content: string;
};

export type SubmissionComment = Common & {
    type: CommentType.Submission;
    photoUrl: string;
    photoNumber: string;
};

export type StartVotingComment = Common & {
    type: CommentType.StartVoting;
};

export type VoteComment = Common & {
    type: CommentType.Vote;
    votes: Vote[];
};

export type IgnoreComment = Common & { type: CommentType.Ignore };

export type ParsedComment =
    | IgnoreComment
    | SubmissionComment
    | StartVotingComment
    | VoteComment;
