/**
 * @Author: 左盐
 * @Date:   2018-06-06 23:39:27
 * @Email:  huabinglan@163.com
 * @Project: xxx
 * @Last modified by:   左盐
 * @Last modified time: 2018-06-06 23:39:27
 */
/**
 * 数据源
 */
module.exports = class extends think.Model {
  /**
   * 获取列表
   * @param  {[type]}  kw [description]
   * @param  {[type]}  cp [description]
   * @param  {[type]}  mp [description]
   * @return {Promise}    [description]
   */
  async page(uid, cp = 1, mp = 30) {
    const where = {
      uid: uid
    };
    const rows = await this.where(where)
      .field('id,name')
      .order('id desc')
      .limit((cp - 1) * mp, mp).countSelect();
    return {
      data: rows.data,
      total: rows.count
    };
  }
  /**
   * 创建
   * @method create
   * @param  {[type]} node [description]
   * @return {[type]}      [description]
   */
  async create(json) {
    const id = await this.add(json);
    return id;
  }

  /**
   * 获取
   * @method get
   * @param  {[type]} nodeid [description]
   * @return {[type]}        [description]
   */
  async get(id, uid) {
    const row = await this.where({
      id: id,
      uid: uid
    }).find();
    return row;
  }
  /**
   *
   * @param  {[type]}  json [description]
   * @return {Promise}      [description]
   */
  async edit(uid, json) {
    const row = await this.where({
      uid
    }).update(json);
    return row;
  }
  /**
   * 删除
   * @param  {[type]}  id [description]
   * @return {Promise}    [description]
   */
  async del(id, uid) {
    const row = await this.where({
      id: id,
      uid: uid
    }).delete();
    return row;
  }
};
