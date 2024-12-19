<p align="center"><img  src="https://github.com/user-attachments/assets/08e56c19-08c2-4f33-8d88-39e001b2305d" alt="smartparse logo"></p>


## [💐🎉👉python版本，结合自然语言处理、深度学习识别，识别率更加准确](https://github.com/wzc570738205/smartParsePro-py)

<p align="center">
  <a href="https://www.npmjs.com/package/address-smart-parse"><img src="https://img.shields.io/npm/v/address-smart-parse.svg?sanitize=true" alt="Version"></a>
  <a href="https://github.com/wzc570738205/smartParsePro"><img src="https://img.shields.io/github/stars/wzc570738205/smartParsePro?style=social" alt="stars"></a>
  	  <a href="https://github.com/wzc570738205/smartParsePro"><img alt="GitHub forks" src="https://img.shields.io/github/forks/wzc570738205/smartParsePro?label=Fork&style=social"></a>
</p>

# 智能识别收货地址（支持🇨🇳省市区县街道/姓名/电话/邮编识别）

### [🧷在线预览](http://47.97.123.182/smartParsePro) 

![image](https://github.com/user-attachments/assets/ce252a73-5980-4154-a457-2b3701c8f51f)


### 支持以下数据格式
#### 注意：地址、姓名、电话、邮编用空格或者特殊字符分开

特殊字符：
```
~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“’。，、？-

```
### js支持地址格式
```
1. 广东省珠海市香洲区盘山路28号幸福茶庄,陈景勇，13593464918
2. 马云，陕西省西安市雁塔区丈八沟街道高新四路高新大都荟  13593464918
3. 陕西省西安市雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918
4. 西安市雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918
5. 雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918
6. 收货人: 李节霁
手机号码: 15180231234
所在地区: 浙江省金华市婺城区西关街道
详细地址: 金磐路上坞街
7. 收货人: 马云
手机号码: 150-3569-6956
详细地址: 河北省石家庄市新华区中华北大街68号鹿城商务中心6号楼1413室
```
## 使用方法

### 🌏1.api调用
> 单IP调用3条/s限制，自行部署可查看`./node`目录
> 公共接口服务到期时间为2025-10-19 00:00

```js
request url：https://wangzc.wang/smAddress
request methods: POST
request payload: 
{
    "address": "新疆阿克苏温宿县博孜墩柯尔克孜族乡吾斯塘博村一组306号 150-3569-6956 马云",//单条地址识别
    "addressList": [//多条地址识别
        "新疆阿克苏温宿县博孜墩柯尔克孜族乡吾斯塘博村一组306号 150-3569-6956 马云",
        "雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918 211381198512096810"
    ]
}
//address 字段为单条识别
//addressList 字段为集合识别  返回在response的list字段中
response： 
{
    "province": "新疆维吾尔自治区",
    "provinceCode": "65",
    "city": "阿克苏地区",
    "cityCode": "6529",
    "county": "温宿县",
    "countyCode": "652922",
    "street": "博孜墩柯尔克孜族乡",
    "streetCode": "652922207",
    "address": "吾斯塘博村一组306号",
    "phone": "15035696956",
    "name": "马云",
    "requestNumber": 7,
    "list": [
        {
            "province": "新疆维吾尔自治区",
            ...
            "name": "马云"
        },
        {
            "zipCode": "710061",
             ...
            "idCard": "211381198512096810"
        }
    ]
}

```

### 🌍1.1 基于[huggingface接口](https://huggingface.co/spaces/wzc2334234/address)调用
```
npm i -D @gradio/client
```
```js
import { client } from "@gradio/client";

client("wzc2334234/address").then((res) => {
  res
    .predict("/predict", [
      "收货人: 李节霁 手机号码: 15180231234 所在地区: 浙江省金华市婺城区西关街道详细地址: 金磐路上坞街",
    ])
    .then((e) => {
      console.log(JSON.parse(e.data[0]), "data");
    });
});
```
### 🌵2.NPM
>🎉3.0版本更新，支持外部引入地址信息，减小包体积

```sh
npm install address-smart-parse
```

```js
/**
 * smart 解析地址
 * @param event-识别的地址
 * @param address(3.0版本支持)-地址列表 数据格式请参考 https://github.com/modood/Administrative-divisions-of-China/blob/master/dist/streets.json
 * address 可不传，不传则默认识别到省/市/区县 三级信息
 * @returns <obj>
 */
// 使用包自带的地址数据,这里务必引入address，将参数传入，不然只会识别到省市区县三级信息
import  {smart, address} from 'address-smart-parse'
smart("陕西省西安市雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918 211381198512096810", address)

// 使用自己的数据
import  {smart} from 'address-smart-parse'
const myAddress = [...]// 数据格式请参考 https://github.com/modood/Administrative-divisions-of-China/blob/master/dist/streets.json
smart("陕西省西安市雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918 211381198512096810", myAddress)
```
### 🌗3.script引入(todo: 需支持地址信息外挂)
[在codepen中在线预览](https://codepen.io/wzc570738205/pen/RwrjLbq)
```
//文件在dist中
<script src="address_parse.min.js.js"></script>

//jsdelivr
<script src="https://cdn.jsdelivr.net/npm/address-smart-parse/js/address_parseV2017.min.js"></script>

smart("陕西省西安市雁塔区丈八沟街道高新四路高新大都荟710061 刘国良 13593464918 211381198512096810")
```

##### 地址数据来源：[中华人民共和国行政区划](https://github.com/modood/Administrative-divisions-of-China)
##### 邮编数据来源：[中华人民共和国邮编](https://github.com/xieranmaya/china-city-area-zip-data/blob/master/china-city-area-zip.json)
#### LICENSE：[Apache License](https://github.com/wzc570738205/smartParsePro/blob/master/LICENSE)


#### qq交流群

![image](https://github.com/user-attachments/assets/2f995a19-3826-4349-a191-886d0406d86b)


#### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wzc570738205/smartParsePro&type=Date)](https://star-history.com/#wzc570738205/smartParsePro&Date)


