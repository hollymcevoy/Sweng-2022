import { VFC } from 'react';
import { ReactWebChatProps } from 'botframework-webchat-component';
import { AddFullBundleProps } from './AddFullBundle';
declare type FullReactWebChatProps = ReactWebChatProps & Omit<AddFullBundleProps, 'children'>;
declare const FullReactWebChat: VFC<FullReactWebChatProps>;
export default FullReactWebChat;
export type { FullReactWebChatProps };
//# sourceMappingURL=FullReactWebChat.d.ts.map