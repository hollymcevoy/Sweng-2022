import * as DirectLineExport from "./directLine";
import { TestScheduler } from "rxjs";
import { AjaxCreationMethod, AjaxRequest, AjaxResponse } from "rxjs/observable/dom/AjaxObservable";
export declare const mockActivity: (text: string) => DirectLineExport.Activity;
interface ActivitySocket {
    play: (start: number, after: number) => void;
}
export declare type Socket = WebSocket & ActivitySocket;
export interface Conversation {
    sockets: Set<Socket>;
    conversationId: string;
    history: Array<DirectLineExport.Activity>;
    token: string;
}
export interface Server {
    scheduler: TestScheduler;
    conversation: Conversation;
}
export declare const mockServer: (scheduler: TestScheduler) => Server;
export declare const injectClose: (server: Server) => void;
export declare const injectNewToken: (server: Server) => void;
declare type ajaxType = (urlOrRequest: string | AjaxRequest) => AjaxResponse;
export declare const mockAjax: (server: Server, customAjax?: ajaxType) => AjaxCreationMethod;
declare type WebSocketConstructor = typeof WebSocket;
export declare const mockWebSocket: (server: Server) => WebSocketConstructor;
export declare const mockServices: (server: Server, scheduler: TestScheduler) => DirectLineExport.Services;
export {};
