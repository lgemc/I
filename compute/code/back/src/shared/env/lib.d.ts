declare function string(varName: string, defaultValue?: string): string | undefined;
declare const env: {
    string: typeof string;
};
export default env;
