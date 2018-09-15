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
    this.<%= firstUpTableName%>S = this.service('<%= firstUpTableName%>', this);
    this.<%= firstUpTableName%>M = this.model('<%= firstUpTableName%>');
  }
  /**
   * @api {get} /<%= url%>/:id 获取<%= china%>
   * @apiName get <%= firstUpTableName%>
   * @apiGroup <%= firstUpTableName%>
   * @apiVersion 1.0.0
   * @apiDescription 获取<%= china%>信息
   * @apiSampleRequest /<%= url%>/:id
   * @apiParam {int} id<%= china%>的id
   * @apiSuccess {json} data 数据
   * @apiSuccess {int} code 
   * @apiSuccess {string} message 错误信息<%for(var i=0,ll=data.length; i<ll;i++) {%>
   * @apiSuccess {<%= data[i].valtype%>} --<%= data[i].key%> <%= data[i].note%>&nbsp;&nbsp;&nbsp;(<%= data[i].validate%>)<%}%>
   * @apiPermission owner
   */
  async getAction() {
        let param = tools.xss(this.get());
        const userInfo = super.getUserInfo();
        let doc = await this.<%= firstUpTableName%>M.get(param.id, userInfo.ownerid);
        return this.jsonOk(doc);
  }

  /**
  * @api {PUT} /<%= url%> 更新<%= china%>
  * @apiName update <%= firstUpTableName%>
  * @apiGroup <%= firstUpTableName%>
  * @apiVersion 1.0.0
  * @apiDescription 更新<%= china%>信息
  * @apiSampleRequest /<%= url%>
  * @apiParam {<%= tablename%>} <%= firstUpTableName%>
  * @apiSuccess {json} data 数据
  * @apiSuccess {int} code 
  * @apiSuccess {string} message 错误信息
  * @apiPermission owner
   */
 async editNameAction() {
    const param = tools.xss(this.post());
    const userInfo = super.getUserInfo();
    const doc = await this.this.<%= firstUpTableName%>M.edit(param.id, userInfo.ownerid, {
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
  * @apiName create <%= firstUpTableName%>
  * @apiGroup <%= firstUpTableName%>
  * @apiVersion 1.0.0
  * @apiDescription 创建<%= china%>信息
  * @apiSampleRequest /<%= url%>
  * @apiParam {<%= tablename%>} <%= firstUpTableName%> <%= china%>信息
  * @apiSuccess {json} data 数据
  * @apiSuccess {int} code 
  * @apiSuccess {string} message 错误信息
  * @apiPermission owner
   */
 async createAction() {
    const param = tools.xss(this.post());
    const userInfo = super.getUserInfo();
    param['uid'] = userInfo.id;
    param['ownerid'] = userInfo.ownerid;
    const doc = await this.<%= firstUpTableName%>M.create(param).catch(err => {
      return think.isError(err) ? err : new Error(err);
    });
    if (think.isError(doc)) {
      return this.jsonFail(doc);
    };
    return this.jsonOk(doc);
  }

  /**
  * @api {get} /<%= url%> 获取<%= china%>列表
  * @apiName page <%= firstUpTableName%>
  * @apiGroup <%= firstUpTableName%>
  * @apiVersion 1.0.0
  * @apiDescription page <%= firstUpTableName%>
  * @apiSampleRequest /<%= url%>
  * @apiParam {string} kw 关键字
  * @apiParam {int} cp cp
  * @apiParam {int} mp mp
  * @apiSuccess {json} data 数据
  * @apiSuccess {int} code 
  * @apiSuccess {string} message 错误信息
  * @apiPermission owner
   */
  async pageAction() {
      let param = tools.xss(this.get());
      const userInfo = super.getUserInfo();
      let doc = await this.<%= firstUpTableName%>M.page(param.name, userInfo.ownerid, param.cp, param.mp).catch(err => {
      return think.isError(err) ? err : new Error(err);
    });
    if (think.isError(doc)) {
      return this.jsonFail(doc);
    };
    return this.jsonOk(doc);
  }

  /**
  * @api {delete} /<%= url%>/:id 删除<%= china%>
  * @apiName delete <%= firstUpTableName%>
  * @apiGroup <%= firstUpTableName%>
  * @apiVersion 1.0.0
  * @apiDescription delete <%= firstUpTableName%> by id
  * @apiSampleRequest /<%= url%>/:id
  * @apiParam {string} id <%= china%>id
  * @apiSuccess {json} data 数据
  * @apiSuccess {int} code 
  * @apiSuccess {string} message 错误信息
  * @apiPermission owner
   */
  async delAction() {
    const param = tools.xss(this.post());
    const userInfo = super.getUserInfo();
    const doc = await this.<%= firstUpTableName%>M.del(param.id, userInfo.ownerid).catch(err => {
      return think.isError(err) ? err : new Error(err);
    });
    if (think.isError(doc)) {
      return this.jsonFail(doc);
    };
    return this.jsonOk(doc);
  }

}
