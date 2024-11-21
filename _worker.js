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
            } else if (url.pathname.includes('/domain')) {
                //当有域名失败时请求新的域名列表
                let msg = `当前域名${url.hostname}\n获取域名列表`;
                let url1 = "https://api.telegram.org/bot" + env.TG_TOKEN + "/sendMessage?chat_id=" + TG_CHATID + "&parse_mode=HTML&text=" + encodeURIComponent(url.hostname);
                fetch(url1, {
                    method: 'get',
                    headers: {
                        'Accept': 'text/html,application/xhtml+xml,application/xml;',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
                    }
                });
                url.hostname = env.OSS;
                url.pathname = '/domain.txt';
            }
            let new_request = new Request(url, request);
            return fetch(new_request);
        }
        return env.ASSETS.fetch(request);
    },
};
