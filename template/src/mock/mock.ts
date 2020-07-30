import Mock from 'mockjs'
import BaseResponse from '@/model/common/BaseResponse'
import config from '@/config'
import ListModel from '@/model/example/ListModel'
const Random = Mock.Random

/**
 * 使用mockjs进行拦截请求模拟数据，具体使用方法可至http://mockjs.com/进行查看
 */

/**
 * 获取基础单据列表
 */
const getList = function () {
    let resp = new BaseResponse()
    let list: ListModel[] = []
    for (let i = 0; i < 10; i++) {
        let item: ListModel = new ListModel()
        item.appId = Random.string('number', 10)
        item.consignee = Random.string('number', 10)
        item.created = Random.string('number', 10)
        item.flowNo = Random.string('number', 10)
        item.memberInfo = Random.string('number', 10)
        item.realAmount = Random.string('number', 10)
        item.sysState = Random.string('number', 10)
        item.type = Random.string('number', 10)
        list.push(item)
    }
    resp.code = 200
    resp.data = list
    resp.fields = '你嘿嘿嘿嘿嘿'
    resp.more = true
    resp.msg = '事实上事实上'
    resp.success = true
    resp.total = Random.natural(60, 100)
    return resp
}

/**
 * 获取商品列表
 */
const getSkuList = function () {
    let resp = new BaseResponse()
    let list: ListModel[] = []
    for (let i = 0; i < 10; i++) {
        let item: ListModel = new ListModel()
        item.appId = 'https://img.yzcdn.cn/vant/cat.jpeg'
        item.consignee = Random.string('number', 10)
        item.created = Random.string('number', 10)
        item.flowNo = Random.string('number', 10)
        item.memberInfo = Random.string('number', 10)
        item.realAmount = Random.string('number', 10)
        item.sysState = Random.string('number', 10)
        item.type = Random.string('number', 10)
        list.push(item)
    }
    resp.code = 200
    resp.data = list
    resp.fields = '你嘿嘿嘿嘿嘿'
    resp.more = true
    resp.msg = '事实上事实上'
    resp.success = true
    resp.total = Random.natural(60, 100)
    return resp
}
Mock.mock(`${config.SERVICE_URL}example/getList`, getList)
Mock.mock(`${config.SERVICE_URL}example/getSkuList`, getSkuList)
