import {
    CommentType,
    ParsedComment,
    SubmissionComment,
    StartVotingComment,
    UnparsedComment
} from '../types';

type ParserState = 'submissions' | 'votes';

class WrongTypeCommentError extends Error {
    constructor(message: string, readonly expectedType: CommentType) {
        super(message);
    }
}

export function parseComment(
    unparsedComment: UnparsedComment,
    state: ParserState
): ParsedComment {
    if (state === 'submissions') {
        try {
            return parseSubmission(unparsedComment);
        } catch (err) {
            if (err instanceof WrongTypeCommentError) {
                try {
                    return parseStartVoting(unparsedComment);
                } catch (errInner) {
                    if (errInner instanceof WrongTypeCommentError)
                        return { ...unparsedComment, type: CommentType.Ignore };
                    else throw errInner;
                }
            } else throw err;
        }
    } else if (state === 'votes') {
        try {
            return parseVotes(unparsedComment);
        } catch (err) {
            if (err instanceof WrongTypeCommentError) {
                return { ...unparsedComment, type: CommentType.Ignore };
            } else throw err;
        }
    } else
        return {
            ...unparsedComment,
            type: CommentType.Ignore
        };
}

function parseSubmission(comment: UnparsedComment): SubmissionComment {
    // Should include a # followed by numbers +
    // a link to a picture
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(comment.content, 'text/html');
    const imgElement = parsedHtml.querySelector('img');

    const hashNumberPattern = /#([0-9]+)/;
    const matches = hashNumberPattern.exec(comment.content);

    if (matches && matches[1] && imgElement) {
        const photoNumber = matches[1];
        const photoUrl = imgElement.src;

        return {
            ...comment,
            type: CommentType.Submission,
            photoNumber,
            photoUrl
        };
    } else
        throw new WrongTypeCommentError(
            'Wrong comment type!',
            CommentType.Submission
        );
}

function parseStartVoting(comment: UnparsedComment): StartVotingComment {
    if (comment.content.includes('#######')) {
        return {
            ...comment,
            type: CommentType.StartVoting
        };
    } else
        throw new WrongTypeCommentError(
            'Wrong comment type!',
            CommentType.StartVoting
        );
}
function parseVotes(unparsedComment: UnparsedComment): ParsedComment {
    throw new Error('Function not implemented.');
}
