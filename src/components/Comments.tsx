import { useEffect } from 'react';
import { useStore } from '../store';

export default function Comments() {
    const [loading, unparsedComments] = useStore((state) => [
        state.fetchingFromFlickr,
        state.unparsedComments
    ]);

    //const parsedComments = useEffect

    return loading ? (
        <h1>LOADING</h1>
    ) : (
        <div>
            {unparsedComments.map((c) => (
                <div key={c.id}>
                    <p>{c.content}</p>
                </div>
            ))}
        </div>
    );
}
