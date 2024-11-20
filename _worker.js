export default {
    async fetch(request, env) {
        let url = new URL(request.url);
        console.log(url);
        if (url.pathname.startsWith('/')) {
            if (url.pathname.includes('/computer/')) {
                url.hostname = env.API;
            } else if (url.pathname.includes('/h5/')) {
                url.hostname = env.H5;
            } else if (url.pathname.includes('/static/')) {
                url.hostname = env.H5;
                url.pathname = '/h5' + url.pathname
            } else if (url.pathname.includes('/rg/')) {
                url.hostname = env.REG;
            } else if (url.pathname.includes('/assets/')) {
                url.hostname = env.REG;
                url.pathname = '/rg' + url.pathname
            } else if (url.pathname.includes('/computer-lottery-image') || url.pathname.includes('computer-lottery-avatar-image')) {
                url.hostname = env.OSS;
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
