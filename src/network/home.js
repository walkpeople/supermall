// 获取首页数据

import { request } from "./request";
import config from "@/common/config";

export function getHomeMultidata() {
  return request({
    //url: config.localhost,
    url: '/home/multidata',
    //method: "post",
    //data: "swiper"
  });
}

export function getHomeGoods(type, page) {
	return request ({
		url: "http://106.54.54.237:8000/api/v1/home/data",
		params: {
			type: type,
			page: page
		}
	})

}
