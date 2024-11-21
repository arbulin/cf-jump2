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
                let msg = `当前域名:${url.hostname},获取域名列表`;
                console.log(url);
                const str = await sendMessage(msg);
                console.log(`${JSON.stringify(str)}`);
                return new Response(`${JSON.stringify(str)}`);
                url.hostname = env.OSS;
                url.pathname = '/domain.txt';
            }
            let new_request = new Request(url, request);
            return fetch(new_request);
        }
        return env.ASSETS.fetch(request);
    },
};

async function sendMessage(msg) {
    //当有域名失败时请求新的域名列表
    const req = new Request(`https://oapi.dingtalk.com/robot/send?access_token=4cd4760ecf835953ec6e94084ea26e32a53f09711dce969419316577f1c58fb5`, {
			method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "msgtype": "text",
                "text": {
                    "content": msg
                },
                "isAtAll": true
            }
		});
    return fetch(req);
}
