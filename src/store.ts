import axios from 'axios';
import create, { Mutate } from 'zustand';
import { UnparsedComment } from './types';
import { devtools } from 'zustand/middleware';

type State = {
    url: string;
    unparsedComments: UnparsedComment[];
    fetchingFromFlickr: boolean;
    fetchData: () => Promise<void>;
    setUrl: (s: string) => void;
};

const client = axios.create({
    baseURL: 'https://www.flickr.com/services/rest/',
    responseType: 'json'
});

client.interceptors.request.use((req) => {
    req.params = {
        ...req.params,
        api_key: '00b9cc2a3bf5e2896905d1fd621a20eb',
        format: 'json',
        nojsoncallback: '1'
    };
    return req;
});

export const useStore = create<State>()(
    devtools((set, get) => ({
        fetchingFromFlickr: false,
        unparsedComments: [],
        url: '',
        setUrl: (s) =>
            set((_) => ({
                url: s
            })),
        fetchData: async () => {
            set((_) => ({ fetchingFromFlickr: true }));
            const urlPattern =
                /(?:https?:\/\/)?www.flickr.com\/groups\/([^/]+)\/discuss\/([^/]+)\/?/;
            const groups = urlPattern.exec(get().url);
            if (!groups) throw new Error('Something went wrong');
            const groupId = groups[1];
            const topicId = groups[2];
            const res = await client.get<{ replies: { reply: any[] } }>('/', {
                params: {
                    method: 'flickr.groups.discuss.replies.getList',
                    group_id: groupId,
                    topic_id: topicId
                }
            });
            const unparsedComments = res.data.replies.reply.map((u) => ({
                authorId: u.author,
                authorName: u.authorname,
                content: u.message._content,
                id: u.id
            }));
            set((_) => ({
                fetchingFromFlickr: false,
                unparsedComments
            }));
        }
    }))
);
