package model

import (
	"gopkg.in/mgo.v2/bson"
)

type <%= tablename %> struct {<%for(var i=0,ll=data.length;i<ll;i++) {%>
	<%= data[i].key.toLowerCase().replace(/^\S/,function(s){return s.toUpperCase();})%>  <%= data[i].valtype%> `<%- data[i].json%>`  //<%= data[i].note%><%}%>
}

/**
 * 创建<%= tablename.toLowerCase()%>
 * @method <%= tablename%>Create
 * @param  {[type]}   <%= tablename.toLowerCase()%> <%= tablename%> [description]
 */
func <%= tablename%>Create(<%= tablename.toLowerCase()%> <%= tablename%>) ApiJson {
	session, c := Modb.SwitchC("<%= tablename.toLowerCase()%>")
	defer session.Close()
	<%= tablename.toLowerCase()%>.Id = bson.NewObjectId()
	err := c.Insert(<%= tablename.toLowerCase()%>)
	if err != nil {
		return ApiJson{State: false, Msg: err.Error()}
	} else {
		return ApiJson{State: true, Msg: <%= tablename.toLowerCase()%>.Id.Hex()}
	}
}

/**
 * 获取一条<%= tablename.toLowerCase()%>
 * @method <%= tablename%>Get
 * @param  {[type]} id string [description]
 */
func <%= tablename%>Get(id string) ApiJson {
	var <%= tablename.toLowerCase()%> <%= tablename%>
	objid := bson.ObjectIdHex(id)
	session, c := Modb.SwitchC("<%= tablename.toLowerCase()%>")
	defer session.Close()
	err := c.FindId(objid).One(&<%= tablename.toLowerCase()%>)
	if err != nil {
		return ApiJson{State: false, Msg: err.Error()}
	} else {
		return ApiJson{State: true, Msg: <%= tablename.toLowerCase()%>}
	}
}

/**
 * 获取<%= china%>列表
 * @method <%= tablename%>Page
 * @param  {[type]} id string [description]
 */
func <%= tablename%>Page(uid string, cp int, mp int) ApiJson {
	var <%= tablename.toLowerCase()%>s []<%= tablename%>
	session, c := Modb.SwitchC("<%= tablename.toLowerCase()%>")
	defer session.Close()
	err := c.Find(bson.M{"uid": bson.ObjectIdHex(uid)}).Skip((cp-1)*mp).Sort("-_id").Limit(mp).All(&<%= tablename.toLowerCase()%>s) //降序
	if err != nil {
		return ApiJson{State: false, Msg: err.Error()}
	} else {
		return ApiJson{State: true, Msg: <%= tablename.toLowerCase()%>s}
	}
}

//删除一条<%= china%>
func <%= tablename%>Del(id string, uid string) ApiJson {
	session, c := Modb.SwitchC("<%= tablename.toLowerCase()%>")
	defer session.Close()
	err := c.Remove(bson.M{"_id": bson.ObjectIdHex(id), "uid": bson.ObjectIdHex(uid)})
	if err != nil {
		return ApiJson{State: false, Msg: err.Error()}
	} else {
		return ApiJson{State: true}
	}
}

/**
 * 更新<%= tablename.toLowerCase()%>数据
 * @method Update<%= tablename%>
 * @param  {[type]}   query  bson.M [description]
 * @param  {[type]}   change bson.M [description]
 */
func <%= tablename%>Update(query bson.M, change bson.M) ApiJson {
	session, c := Modb.SwitchC("<%= tablename.toLowerCase()%>")
	defer session.Close()
	err := c.Update(query, change)
	if err != nil {
		return ApiJson{State: false, Msg: err.Error()}
	} else {
		return ApiJson{State: true}
	}
}
