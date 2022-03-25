import { DirectLine } from 'botframework-directlinejs';
declare type CreateDirectLineOptions = {
    botAgent?: string;
    conversationId?: string;
    conversationStartProperties?: any;
    domain?: string;
    fetch?: typeof window.fetch;
    pollingInterval?: number;
    secret?: string;
    streamUrl?: string;
    token?: string;
    watermark?: string;
    webSocket?: typeof WebSocket;
};
export default function createDirectLine({ botAgent, conversationId, conversationStartProperties, domain, fetch, pollingInterval, secret, streamUrl, token, watermark, webSocket }: CreateDirectLineOptions): DirectLine;
export {};
//# sourceMappingURL=createDirectLine.d.ts.map