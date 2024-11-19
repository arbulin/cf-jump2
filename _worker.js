export default {
    async fetch(request, env) {
        let url = new URL(request.url);
        if (url.pathname.startsWith('/')) {
            const hostname = url.hostname;
            if (hostname.includes('computer')){
                url.hostname = env.API;
            } else if (hostname.includes('index')){
                url.hostname = env.H5;
            } else if (hostname.includes('register')){
                url.hostname = env.REG;
            }
            let new_request = new Request(url, request);
            return fetch(new_request);
        }
        return env.ASSETS.fetch(request);
    },
};
