<?php
/**
 * User:
 * mail:
 * Date:
 * Des:
 * Generate: entityAuto@huabinglan@163.com
 */

namespace app\<%= rootpath%>\controller;
use app\<%= rootpath%>\model\<%= firstUpTableName%> as <%= firstUpTableName%>Model;

class <%= firstUpTableName%> extends Base
{
  /**
   * @api {get} /<%= url%>/:id 获取<%= china%>
   * @apiName get <%= tablename.toLowerCase()%>
   * @apiGroup <%= tablename.toLowerCase()%>
   * @apiVersion 1.0.0
   * @apiDescription 获取<%= china%>信息
   * @apiSampleRequest /<%= url%>/:id
   * @apiParam {int} id<%= china%>的id
   * @apiSuccess {json} data 数据
   * @apiSuccess {int} code 0成功，其他为错误码
   * @apiSuccess {string} message 错误信息<%for(var i=0,ll=data.length; i<ll;i++) {%>
   * @apiSuccess {<%= data[i].valtype%>} --<%= data[i].key%> <%= data[i].note%>(<%= data[i].validate%>)<%}%>
   */
  public function  read( <%= firstUpTableName%>Model $<%= tablename.toLowerCase()%>, $id=0)
  {
      $check = $this->validate($id,'<%= firstUpTableName%>.read');
      if($check !== true) {
        return apiJson([], -1, $check);
      }
      $json = $<%= tablename.toLowerCase()%>->read($id);
      return apiJson($json);
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
  public function  update(<%= firstUpTableName%>Model $<%= tablename.toLowerCase()%>, $id=0)
  {
    $param = input('put.');
    $check = $this->validate($param,'<%= firstUpTableName%>.update');
    if($check !== true) {
      return apiJson([], -1, $check);
    }
    $json =  $<%= tablename.toLowerCase()%>->editData($param, $id);
    return apiJson($json);
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
  public function  save(<%= firstUpTableName%>Model $<%= tablename.toLowerCase()%>)
  {
    $param = input('post.');
    $check = $this->validate($param,'<%= firstUpTableName%>.save');
    if($check !== true) {
      return apiJson([], -1, $check);
    }
      $data = $<%= tablename.toLowerCase()%>->saveData();
      return apiJson($data);
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
  public function  index(<%= firstUpTableName%>Model $<%= tablename.toLowerCase()%>)
  {
      $param = input('get.');
      $check = $this->validate($param,'<%= firstUpTableName%>.index');
      if($check !== true) {
        return apiJson([], -1, $check);
      }
      $json =  $<%= tablename.toLowerCase()%>->page($param['kw'],  $param['cp'], $param['mp']);
      return apiJson($json);
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
  public function  delete(<%= firstUpTableName%>Model $<%= tablename.toLowerCase()%>, $id=0)
  {
    $check = $this->validate($id,'<%= firstUpTableName%>.delete');
    if($check !== true) {
      return apiJson([], -1, $check);
    }
    $json =  $<%= tablename.toLowerCase()%>->remove($id);
    return apiJson($json);
  }

}
