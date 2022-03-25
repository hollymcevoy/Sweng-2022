declare type CognitiveServicesAuthorizationToken = {
    authorizationToken: string;
};
declare type CognitiveServicesSubscriptionKey = {
    subscriptionKey: string;
};
declare type CognitiveServicesRegion = {
    region: string;
};
declare type CognitiveServicesSovereignCloud = {
    customVoiceHostname: string;
    speechRecognitionHostname: string;
    speechSynthesisHostname: string;
};
declare type CognitiveServicesBaseCredentials = (CognitiveServicesAuthorizationToken | CognitiveServicesSubscriptionKey) & (CognitiveServicesRegion | CognitiveServicesSovereignCloud);
declare type CognitiveServicesCredentials = CognitiveServicesBaseCredentials | Promise<CognitiveServicesBaseCredentials> | (() => CognitiveServicesBaseCredentials) | (() => Promise<CognitiveServicesBaseCredentials>);
export default CognitiveServicesCredentials;
//# sourceMappingURL=CognitiveServicesCredentials.d.ts.map