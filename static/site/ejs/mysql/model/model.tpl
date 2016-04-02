package model

import ()

type <%= firstUpTableName%> struct {<%for(var i=0,ll=data.length;i<ll;i++) {%>
	<%= data[i].key.toLowerCase().replace(/^\S/,function(s){return s.toUpperCase();})%>  <%= data[i].valtype%> `<%- data[i].json%>`  //<%= data[i].note%><%}%>
}

func (u <%= firstUpTableName%>) TableName() string {
	return "<%= reltablename%>"
}
/**
 * 获取<%= tablename.toLowerCase()%>
 * @method <%= firstUpTableName%>Get
 * @param  {[type]} id int [description]
 */
func <%= firstUpTableName%>Get(id int) ApiJson {
	var <%= tablename.toLowerCase()%> <%= firstUpTableName%>
	DB.First(&<%= tablename.toLowerCase()%>, id)
	return ApiJson{State: true, Msg:<%= tablename.toLowerCase()%>}
}
/**
 * 更新<%= tablename.toLowerCase()%>
 * @method <%= firstUpTableName%>Update
 * @param  {[type]}    <%= tablename.toLowerCase()%> <%= firstUpTableName%> [description]
 */
func <%= firstUpTableName%>Update(<%= tablename.toLowerCase()%> <%= firstUpTableName%>) ApiJson {
	 err := DB.Model(&<%= tablename.toLowerCase()%>).UpdateColumns(map[string]interface{}{<%for(var i=1,ll=data.length;i<ll;i++) {%>"<%= data[i].key.toLowerCase()%>": <%= tablename.toLowerCase()%>.<%= data[i].key.toLowerCase().replace(/^\S/,function(s){return s.toUpperCase();})%>, <%}%>}).Error
	 if err != nil {
		 return ApiJson{State: false, Msg: err}
	 } else {
		 return ApiJson{State: true}
	 }
}
/**
 * 创建<%= tablename.toLowerCase()%>
 * @method <%= firstUpTableName%>Create
 * @param  {[type]}    <%= tablename.toLowerCase()%> <%= firstUpTableName%> [description]
 */
func <%= firstUpTableName%>Create(<%= tablename.toLowerCase()%> <%= firstUpTableName%>) ApiJson {
	DB.Save(&<%= tablename.toLowerCase()%>)
	return ApiJson{State:true, Msg:<%= tablename.toLowerCase()%>.Id}
}
/**
 * page <%= tablename.toLowerCase()%>
 * @method <%= firstUpTableName%>Page
 * @param  {[type]}  kw string [description]
 * @param  {[type]}  cp int    [description]
 * @param  {[type]}  mp int    [description]
 */
func <%= firstUpTableName%>Page(kw string, cp int, mp int) ApiJson {
	var <%= tablename.toLowerCase()%>s []<%= firstUpTableName%>
	var count int
	DB.Table("<%= reltablename%>").Select("*").Where("title like ?",  "%"+kw+"%").Count(&count).Offset((cp - 1) * mp).Limit(mp).Find(&<%= tablename.toLowerCase()%>s)
	return ApiJson{State: true, Msg:<%= tablename.toLowerCase()%>s,Count:count}
}

/**
 * 删除<%= china%>
 * @method <%= firstUpTableName%>Dele
 * @param  {[type]} ids int[] [description]
 */
func <%= firstUpTableName%>Del(id int, uid int) ApiJson {
	err := DB.Where("id = ? and uid = ?", id, uid).Delete(<%= firstUpTableName%>{}).Error
	if err != nil {
		return ApiJson{State: false, Msg: err.Error()}
	} else {
		return ApiJson{State: true}
	}
}
