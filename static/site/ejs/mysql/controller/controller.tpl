package controller

import (
	"github.com/ivpusic/neo"
	"<%= rootpath%>/model"
)

/**
 * @api {get} /<%= url%>/:id 获取<%= china%>
 * @apiName get <%= tablename.toLowerCase()%>
 * @apiGroup <%= tablename.toLowerCase()%>
 * @apiVersion 1.0.0
 * @apiDescription 获取<%= china%>信息
 * @apiSampleRequest /<%= url%>/:id
 * @apiParam {int} id<%= china%>的id
 * @apiSuccess {bool} state 状态
 * @apiSuccess {String} msg 消息<%for(var i=0,ll=data.length; i<ll;i++) {%>
 * @apiSuccess {<%= data[i].valtype%>} --<%= data[i].key%> <%= data[i].note%><%}%>
 */
func <%= firstUpTableName%>Get(ctx *neo.Ctx) (int, error) {
	id := Tools.ParseInt(ctx.Req.Params.Get("id"), 0)
	err1 := validate.Field(id, <%- data[0].json.split('validate:')[1]%>)
	if err1 != nil {
		return 200, ctx.Res.Json(errorValidate())
	}
	return 200, ctx.Res.Json(model.<%= firstUpTableName%>Get(id))
}

/**
* @api {PUT} /<%= url%> 更新<%= china%>
* @apiName update <%= tablename.toLowerCase()%>
* @apiGroup <%= tablename.toLowerCase()%>
* @apiVersion 1.0.0
* @apiDescription 更新<%= china%>信息
* @apiSampleRequest /<%= url%>
* @apiParam {<%= tablename%>} <%= tablename.toLowerCase()%>
* @apiSuccess {bool} state 状态
* @apiSuccess {String} msg 消息
* @apiPermission admin
 */
func <%= firstUpTableName%>Update(ctx *neo.Ctx) (int, error) {
	var <%= tablename.toLowerCase()%> model.<%= firstUpTableName%>
	err := ctx.Req.JsonBody(&<%= tablename.toLowerCase()%>)
	if err != nil {
		return 200, ctx.Res.Json(model.ApiJson{State: false, Msg: err.Error()})
	}
	err1 := validate.Struct(<%= tablename.toLowerCase()%>)
	if err1 != nil {
		return 200, ctx.Res.Json(`{"state": false, "msg": ` + err1.Error() + `}`)
	}
	return 200, ctx.Res.Json(model.<%= firstUpTableName%>Update(<%= tablename.toLowerCase()%>))
}

/**
* @api {post} /<%= url%> 创建<%= china%>
* @apiName create <%= tablename.toLowerCase()%>
* @apiGroup <%= tablename.toLowerCase()%>
* @apiVersion 1.0.0
* @apiDescription 创建<%= china%>信息
* @apiSampleRequest /<%= url%>
* @apiParam {<%= tablename%>} <%= tablename.toLowerCase()%> <%= china%>信息
* @apiSuccess {bool} state 状态
* @apiSuccess {String} msg 消息
* @apiPermission admin
 */
func <%= firstUpTableName%>Create(ctx *neo.Ctx) (int, error) {
	var <%= tablename.toLowerCase()%> model.<%= firstUpTableName%>
	err := ctx.Req.JsonBody(&<%= tablename.toLowerCase()%>)
	if err != nil {
		return 200, ctx.Res.Json(model.ApiJson{State: false, Msg: err.Error()})
	}
	err1 := validate.Struct(<%= tablename.toLowerCase()%>)
	if err1 != nil {
		return 200, ctx.Res.Json(`{"state": false, "msg": ` + err1.Error() + `}`)
	}
	return 200, ctx.Res.Json(model.<%= firstUpTableName%>Create(<%= tablename.toLowerCase()%>))
}

/**
* @api {post} /<%= url%>/page 获取<%= china%>列表
* @apiName page <%= tablename.toLowerCase()%>
* @apiGroup <%= tablename.toLowerCase()%>
* @apiVersion 1.0.0
* @apiDescription page <%= tablename.toLowerCase()%>
* @apiSampleRequest /<%= url%>/page
* @apiParam {string} kw 关键字
* @apiParam {int} cp cp
* @apiParam {int} mp mp
* @apiSuccess {bool} state 状态
* @apiSuccess {String} msg 消息
* @apiPermission admin
 */
func <%= firstUpTableName%>Page(ctx *neo.Ctx) (int, error) {
	cp := Tools.ParseInt(ctx.Req.FormValue("cp"), 1)
	mp := Tools.ParseInt(ctx.Req.FormValue("mp"), 20)
	kw := ctx.Req.FormValue("kw")
	err1 := validate.Field(kw, "required, min=1,max=20")
	err2 := validate.Field(cp, "required,min=1")
	err3 := validate.Field(mp, "required,min=1,max=50")
	if err1 != nil || err2 != nil || err3 != nil {
		return 200, ctx.Res.Json(errorValidate())
	}
	return 200, ctx.Res.Json(model.<%= firstUpTableName%>Page(kw, cp, mp))
}

/**
* @api {delete} /<%= url%> 删除<%= china%>
* @apiName delete <%= tablename.toLowerCase()%>
* @apiGroup <%= tablename.toLowerCase()%>
* @apiVersion 1.0.0
* @apiDescription delete <%= tablename.toLowerCase()%> by id
* @apiSampleRequest /<%= url%>
* @apiParam {string} id <%= china%>id
* @apiParam {int} uid 用户的uid
* @apiSuccess {bool} state 状态
* @apiSuccess {String} msg 消息
* @apiPermission admin
 */
func <%= firstUpTableName%>Dele(ctx *neo.Ctx) (int, error) {
	ids := Tools.ParseInt(ctx.Req.Params.Get("id"), 0)
	uid := Tools.ParseInt(ctx.Req.Params.Get("uid"), 0)
	err1 := validate.Field(ids, "required, min=1")
	err2 := validate.Field(uid, "required, min=1")
	if err1 != nil || err2 != nil{
		return 200, ctx.Res.Json(errorValidate())
	}
	return 200, ctx.Res.Json(model.<%= firstUpTableName%>Del(ids, uid))

}
