export default {
	async fetch(request, env) {
		let url = new URL(request.url);
		console.log(url);
		if (url.pathname.startsWith("/")) {
			if (url.pathname.includes("/computer/")) {
				url.hostname = env.API;
			} else if (url.pathname.includes("/h5/")) {
				url.hostname = env.H5;
			} else if (url.pathname.includes("/static/")) {
				url.hostname = env.H5;
				url.pathname = "/h5" + url.pathname;
			} else if (url.pathname.includes("/rg/")) {
				url.hostname = env.REG;
			} else if (url.pathname.includes("/assets/")) {
				url.hostname = env.REG;
				url.pathname = "/rg" + url.pathname;
			} else if (
				url.pathname.includes("/computer-lottery-image") ||
				url.pathname.includes("computer-lottery-avatar-image")
			) {
				url.hostname = env.OSS;
			} else if (url.pathname.includes("/domain")) {
				await sendMessage(request);
				//url.hostname = 'www.baidu.com';
				//url.pathname = '/index.html';
				//let msg = `当前域名:${url.hostname},获取域名列表`;
				//当有域名失败时请求新的域名列表
				//url.hostname = 'oapi.dingtalk.com';
				//url.pathname = '/robot/send';
				//url.search = '?access_token=4cd4760ecf835953ec6e94084ea26e32a53f09711dce969419316577f1c58fb5';
				//return new Response(`${request.method},${request.url},${request.body},${request.headers}`);
				//request.body = {
				//			msgtype: "text",
				//			text: {
				//				content: msg,
				//			},
				//			isAtAll: true,
				//		};
				//request.method = 'POST';
				//request.headers = {
				//			"Content-Type": "application/json",
				//		}
				//https://oapi.dingtalk.com/robot/send?access_token=4cd4760ecf835953ec6e94084ea26e32a53f09711dce969419316577f1c58fb5
				//let new_request1 = new Request('https://www.baidu.com', request);
				//const str = await fetch(new_request1);
				return new Response(`${JSON.stringify(str)}`);
				//return new Response(env.DOMAIN);
			}
			let new_request = new Request(url, request);
			return fetch(new_request);
		}
		return env.ASSETS.fetch(request);
	},
};

async function sendMessage(request) {
	//当有域名失败时请求新的域名列表
	let new_request = new Request('https://oapi.dingtalk.com/robot/send?access_token=4cd4760ecf835953ec6e94084ea26e32a53f09711dce969419316577f1c58fb5', request);
	return fetch(new_request);
}
