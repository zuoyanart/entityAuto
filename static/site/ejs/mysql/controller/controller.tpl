/**
 * @Author: 左盐
 * @Date:   2018-05-07 23:05:40
 * @Email:  huabinglan@163.com
 * @Project: xxx
 * @Last modified by:   左盐
 * @Last modified time: 2018-05-12 17:07:54
 */

const Base = require('./base.js');

module.exports = class extends Base {
  constructor(ctx) {
    super(ctx);
    this.<%= tablename.toLowerCase()%>S = this.service('<%= tablename.toLowerCase()%>');
    this.<%= tablename.toLowerCase()%>M = this.model('<%= tablename.toLowerCase()%>');
  }
  /**
   * @api {get} /<%= url%>/:id 获取<%= china%>
   * @apiName get <%= tablename.toLowerCase()%>
   * @apiGroup <%= tablename.toLowerCase()%>
   * @apiVersion 1.0.0
   * @apiDescription 获取<%= china%>信息
   * @apiSampleRequest /<%= url%>/:id
   * @apiParam {int} id<%= china%>的id
   * @apiSuccess {json} data 数据
   * @apiSuccess {int} code 200成功，其他为错误码
   * @apiSuccess {string} message 错误信息<%for(var i=0,ll=data.length; i<ll;i++) {%>
   * @apiSuccess {<%= data[i].valtype%>} --<%= data[i].key%> <%= data[i].note%>(<%= data[i].validate%>)<%}%>
   */
  async getAction() {
        let param = tools.xss(this.post());
        let doc = await this.<%= tablename.toLowerCase()%>M.get(param.id);
        return this.jsonOk(doc);
  }

  /**
  * @api {PUT} /<%= url%>/:id 更新<%= china%>
  * @apiName update <%= tablename.toLowerCase()%>
  * @apiGroup <%= tablename.toLowerCase()%>
  * @apiVersion 1.0.0
  * @apiDescription 更新<%= china%>信息
  * @apiSampleRequest /<%= url%>
  * @apiParam {<%= tablename%>} <%= tablename.toLowerCase()%>
  * @apiSuccess {json} data 数据
  * @apiSuccess {int} code 0成功，其他为错误码
  * @apiSuccess {string} message 错误信息
  * @apiPermission admin
   */
 async editNameAction() {
    const param = tools.xss(this.post());
    const uid = this.cookie('id');
    const doc = await this.this.<%= tablename.toLowerCase()%>M.edit(param.id, uid, {
      name: param.name
    });
    if(doc === 1) {
      return this.jsonOk(doc);
    } else {
      return this.jsonFail();
    }
  }
  /**
  * @api {post} /<%= url%> 创建<%= china%>
  * @apiName create <%= tablename.toLowerCase()%>
  * @apiGroup <%= tablename.toLowerCase()%>
  * @apiVersion 1.0.0
  * @apiDescription 创建<%= china%>信息
  * @apiSampleRequest /<%= url%>
  * @apiParam {<%= tablename%>} <%= tablename.toLowerCase()%> <%= china%>信息
  * @apiSuccess {json} data 数据
  * @apiSuccess {int} code 0成功，其他为错误码
  * @apiSuccess {string} message 错误信息
  * @apiPermission admin
   */
 async createAction() {
    const param = tools.xss(this.post());
    const uid = this.cookie('id');
    param['uid'] = uid;
    const doc = await this.<%= tablename.toLowerCase()%>M.create(param).catch(err => {
      return think.isError(err) ? err : new Error(err);
    });
    if (think.isError(doc)) {
      return this.jsonFail(doc);
    };
    return this.jsonOk(doc);
  }

  /**
  * @api {get} /<%= url%> 获取<%= china%>列表
  * @apiName page <%= tablename.toLowerCase()%>
  * @apiGroup <%= tablename.toLowerCase()%>
  * @apiVersion 1.0.0
  * @apiDescription page <%= tablename.toLowerCase()%>
  * @apiSampleRequest /<%= url%>/page
  * @apiParam {string} kw 关键字
  * @apiParam {int} cp cp
  * @apiParam {int} mp mp
  * @apiSuccess {json} data 数据
  * @apiSuccess {int} code 0成功，其他为错误码
  * @apiSuccess {string} message 错误信息
  * @apiPermission admin
   */
  async pageAction() {
      let param = tools.xss(this.post());
      let doc = await this.<%= tablename.toLowerCase()%>M.page(param.name, this.cookie('id'), param.cp, param.mp).catch(err => {
      return think.isError(err) ? err : new Error(err);
    });
    if (think.isError(doc)) {
      return this.jsonFail(doc);
    };
    return this.jsonOk(doc);
  }

  /**
  * @api {delete} /<%= url%>/:id 删除<%= china%>
  * @apiName delete <%= tablename.toLowerCase()%>
  * @apiGroup <%= tablename.toLowerCase()%>
  * @apiVersion 1.0.0
  * @apiDescription delete <%= tablename.toLowerCase()%> by id
  * @apiSampleRequest /<%= url%>
  * @apiParam {string} id <%= china%>id
  * @apiParam {int} uid 用户的uid
  * @apiSuccess {json} data 数据
  * @apiSuccess {int} code 0成功，其他为错误码
  * @apiSuccess {string} message 错误信息
  * @apiPermission admin
   */
  async delAction() {
    const param = tools.xss(this.post());
    const number = await this.<%= tablename.toLowerCase()%>M.del(param.id, this.cookie('id')).catch(err => {
      return think.isError(err) ? err : new Error(err);
    });
    if (think.isError(doc)) {
      return this.jsonFail(doc);
    };
    return this.jsonOk();
  }

}
