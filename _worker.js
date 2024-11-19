export default {
    async fetch(request, env) {
        let url = new URL(request.url);
        console.log(url);
        if (url.pathname.startsWith('/')) {
            if (url.pathname.includes('computer')) {
                url.hostname = env.API;
            } else if (url.pathname.includes('index')) {
                url.hostname = env.H5;
            } else if (url.pathname.includes('register')) {
                url.hostname = env.REG;
            }
            // url.hostname = 'api-dev.laiguaba.com';
            let new_request = new Request(url, request);
            return fetch(new_request);
            // 添加允许跨域访问的响应头
            // response.headers.set('Access-Control-Allow-Origin', '*');
            // return response;
        }
        return env.ASSETS.fetch(request);
    },
};
