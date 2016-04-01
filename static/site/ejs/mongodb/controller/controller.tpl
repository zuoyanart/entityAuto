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
 * @apiParam {string} id<%= china%>的id
 * @apiSuccess {bool} state 状态
 * @apiSuccess {String} msg 消息<%for(var i=0,ll=data.length; i<ll;i++) {%>
 * @apiSuccess {<%= data[i].valtype%>} --<%= data[i].key%> <%= data[i].note%><%}%>
 */
func <%= tablename%>Get(ctx *neo.Ctx) (int, error) {
	id := ctx.Req.Params.Get("id")
	err1 := validate.Field(id, <%- data[0].json.split('validate:')[1]%>)
	if err1 != nil {
		return 200, ctx.Res.Json(errorValidate())
	}
	return 200, ctx.Res.Json(model.<%= tablename%>Get(id))
}

/**
* @api {PUT} /<%= url%> 更新<%= china%>
* @apiName update <%= tablename.toLowerCase()%>
* @apiGroup <%= tablename.toLowerCase()%>
* @apiVersion 1.0.0
* @apiDescription 更新<%= china%>信息
* @apiSampleRequest /<%= url%>
* @apiParam {<%= tablename%>} <%= tablename.toLowerCase()%> <%= china%>信息
* @apiSuccess {bool} state 状态
* @apiSuccess {String} msg 消息
* @apiPermission admin
 */
func <%= tablename%>Update(ctx *neo.Ctx) (int, error) {
	var <%= tablename.toLowerCase()%> model.<%= tablename%>
	err := ctx.Req.JsonBody(&<%= tablename.toLowerCase()%>)
	if err != nil {
		return 200, ctx.Res.Json(model.ApiJson{State: false, Msg: err.Error()})
	}
	err1 := validate.Struct(<%= tablename.toLowerCase()%>)
	if err1 != nil {
		return 200, ctx.Res.Json(`{"state": false, "msg": ` + err1.Error() + `}`)
	}
	return 200, ctx.Res.Json(`{"state": false}`)
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
func <%= tablename%>Create(ctx *neo.Ctx) (int, error) {
	var <%= tablename.toLowerCase()%> model.<%= tablename%>
	err := ctx.Req.JsonBody(&<%= tablename.toLowerCase()%>)
	if err != nil {
		return 200, ctx.Res.Json(model.ApiJson{State: false, Msg: err.Error()})
	}
	err1 := validate.Struct(<%= tablename.toLowerCase()%>)
	if err1 != nil {
		return 200, ctx.Res.Json(`{"state": false, "msg": ` + err1.Error() + `}`)
	}
	return 200, ctx.Res.Json(model.<%= tablename%>Create(<%= tablename.toLowerCase()%>))
}

/**
* @api {post} /<%= url%>/page 获取<%= china%>列表
* @apiName page <%= tablename.toLowerCase()%>
* @apiGroup <%= tablename.toLowerCase()%>
* @apiVersion 1.0.0
* @apiDescription page <%= tablename.toLowerCase()%>
* @apiSampleRequest /<%= url%>/page
* @apiParam {bson.ObjectId}  uid  用户id
* @apiParam {int} cp cp
* @apiParam {int} mp mp
* @apiSuccess {bool} state 状态
* @apiSuccess {String} msg 消息
* @apiPermission admin
 */
func <%= tablename%>Page(ctx *neo.Ctx) (int, error) {
	cp := Tools.ParseInt(ctx.Req.FormValue("cp"), 1)
	mp := Tools.ParseInt(ctx.Req.FormValue("mp"), 20)
	uid := ctx.Req.FormValue("uid")

	err1 := validate.Field(uid, "required, min=24,max=24")
	err2 := validate.Field(cp, "required,min=1")
	err3 := validate.Field(mp, "required,min=1,max=50")
	if err1 != nil || err2 != nil || err3 != nil {
		return 200, ctx.Res.Json(errorValidate())
	}
	return 200, ctx.Res.Json(model.<%= tablename%>Page(uid, cp, mp))
}

/**
* @api {delete} /<%= url%> 删除<%= china%>
* @apiName delete <%= tablename.toLowerCase()%>
* @apiGroup <%= tablename.toLowerCase()%>
* @apiVersion 1.0.0
* @apiDescription delete <%= tablename.toLowerCase()%> by ids[]
* @apiSampleRequest /<%= url%>
* @apiParam {string} id <%= china%>id，可传多个用逗号隔开
* @apiParam {bson.ObjectId} uid 用户id
* @apiSuccess {bool} state 状态
* @apiSuccess {String} msg 消息
* @apiPermission admin
 */
func <%= tablename%>Del(ctx *neo.Ctx) (int, error) {
	ids := ctx.Req.FormValue("id")
	uid := ctx.Req.FormValue("uid")
	err1 := validate.Field(ids, "required, min=24,max=300")
	err2 := validate.Field(uid, "required, min=24,max=24")
	if err1 != nil || err2 != nil{
		return 200, ctx.Res.Json(errorValidate())
	}
	return 200, ctx.Res.Json(model.<%= tablename%>Del(ids, uid))

}
