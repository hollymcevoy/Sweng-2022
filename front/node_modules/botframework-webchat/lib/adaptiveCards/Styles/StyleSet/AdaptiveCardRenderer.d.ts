import FullBundleStyleOptions from '../../../types/FullBundleStyleOptions';
export default function ({ cardPushButtonBackgroundColor, cardPushButtonTextColor, accent, paddingRegular, primaryFont }: FullBundleStyleOptions): {
    '&.webchat__adaptive-card-renderer': {
        '& *': {
            boxSizing: string;
        };
        '& .ac-input, & .ac-inlineActionButton, & .ac-quickActionButton': {
            fontFamily: string;
        };
        '& .ac-multichoiceInput': {
            padding: number;
        };
        '& .ac-pushButton': {
            appearance: string;
            backgroundColor: string;
            borderStyle: string;
            borderWidth: number;
            color: string;
            fontWeight: number;
            padding: number;
        };
        '& .ac-pushButton.style-destructive': {
            backgroundColor: string;
            color: string;
        };
        '& .ac-pushButton.style-destructive:hover, & .ac-pushButton.style-destructive:active': {
            backgroundColor: string;
        };
        '& .ac-pushButton.style-positive': {
            backgroundColor: string;
            color: string;
        };
        '& .ac-pushButton.style-positive:hover, & .ac-pushButton.style-positive:active': {
            backgroundColor: string;
        };
        '& .ac-pushButton, & input, & select, & textarea': {
            '&[aria-disabled="true"]': {
                backgroundColor: string;
                borderColor: string;
                borderStyle: string;
                borderWidth: number;
                color: string;
            };
        };
        '& .ac-pushButton[aria-disabled="true"]': {
            backgroundColor: string;
            color: string;
        };
        '& .ac-pushButton[aria-pressed="true"]': {
            backgroundColor: string;
            borderColor: string;
            color: string;
        };
        '& input[aria-disabled="true"]': {
            padding: string;
        };
    };
};
//# sourceMappingURL=AdaptiveCardRenderer.d.ts.map