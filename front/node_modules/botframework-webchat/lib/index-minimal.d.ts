import { Constants, createStore, createStoreWithDevTools, version } from 'botframework-webchat-core';
import { StrictStyleOptions, StyleOptions } from 'botframework-webchat-api';
import ReactWebChat, { Components, concatMiddleware, connectToWebChat, createStyleSet, hooks } from 'botframework-webchat-component';
import createBrowserWebSpeechPonyfillFactory from './createBrowserWebSpeechPonyfillFactory';
declare const renderWebChat: any;
export declare const createDirectLine: (options: any) => import("botframework-directlinejs").DirectLine;
export declare const createDirectLineAppServiceExtension: (options: any) => Promise<any>;
export default ReactWebChat;
export { Components, concatMiddleware, connectToWebChat, Constants, createBrowserWebSpeechPonyfillFactory, createStore, createStoreWithDevTools, createStyleSet, hooks, renderWebChat, version };
export type { StyleOptions, StrictStyleOptions };
//# sourceMappingURL=index-minimal.d.ts.map