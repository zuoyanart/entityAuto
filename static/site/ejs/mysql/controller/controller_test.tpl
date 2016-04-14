package restest

import (
	"encoding/json"
	. "github.com/smartystreets/goconvey/convey"
	"pizzaCmsApi/model"
	"testing"
)

type json<%= firstUpTableName%> struct {
	State bool
	Msg   model.<%= firstUpTableName%>
}

type json<%= firstUpTableName%>Get struct {
	State bool
	Msg   int
}

type json<%= firstUpTableName%>List struct {
	State bool
	Msg   []model.<%= firstUpTableName%>
	Count int
}

func Test<%= firstUpTableName%>Create(t *testing.T) {
	Convey("创建<%= china%>", t, func() {
		_, body, _ := request.Post(Url + "<%= url%>").Send(`{<%for(var i=1,ll=data.length;i<ll;i++) {%><% if(data[i].valtype == "string") {%>"<%= data[i].key.toLowerCase()%>": "<%= data[i].key.toLowerCase()%>",<%} else {%>"<%= data[i].key.toLowerCase()%>": 1,<%}%><%}%>"1":"1"}`).End()
		var jsonEnt json<%= firstUpTableName%>Get
		json.Unmarshal([]byte(body), &jsonEnt) //转换成struct
		id = jsonEnt.Msg                       //赋值id
		So(jsonEnt.State, ShouldEqual, true)
		Convey("创建后验证", func() {
			_, body, _ := request.Get(Url + "<%= url%>/" + Tools.ParseString(id)).End()
			var jsonEnt json<%= firstUpTableName%>
			json.Unmarshal([]byte(body), &jsonEnt)
			So(jsonEnt.State, ShouldEqual, true)
      <%for(var i=1,ll=data.length;i<ll;i++) {%><% if(data[i].valtype == "string") {%>So(jsonEnt.Msg.<%= data[i].key.toLowerCase().replace(/^\S/,function(s){return s.toUpperCase();})%>, ShouldEqual, "<%= data[i].key.toLowerCase()%>")<%} else {%>So(jsonEnt.Msg.<%= data[i].key.toLowerCase().replace(/^\S/,function(s){return s.toUpperCase();})%>, ShouldEqual, 0)<%}%>
      <%}%>
		})
	})
}

func Test<%= firstUpTableName%>Get(t *testing.T) {
	Convey("获取<%= china%>", t, func() {
		_, body, _ := request.Get(Url + "<%= url%>/" + Tools.ParseString(id)).End()
		var jsonEnt json<%= firstUpTableName%>
		json.Unmarshal([]byte(body), &jsonEnt)
		So(jsonEnt.State, ShouldEqual, true)
		So(jsonEnt.Msg.Id, ShouldEqual, id)
	})
}

func Test<%= firstUpTableName%>Update(t *testing.T) {
	Convey("更新<%= china%>", t, func() {
		_, body, _ := request.Put(Url + "<%= url%>").Send(`{"id":`+Tools.ParseString(id)+`,<%for(var i=1,ll=data.length;i<ll;i++) {%><% if(data[i].valtype == "string"){%>"<%= data[i].key.toLowerCase()%>": "<%= data[i].key.toLowerCase()%>",<%} else {%>"<%= data[i].key.toLowerCase()%>": 1,<%}%><%}%>"1":"1"}`).End()
		var jsonEnt json<%= firstUpTableName%>
		json.Unmarshal([]byte(body), &jsonEnt)
		So(jsonEnt.State, ShouldEqual, true)
		Convey("更新后验证", func() {
			_, body, _ := request.Get(Url + "<%= url%>/" + Tools.ParseString(id)).End()
			var jsonEnt json<%= firstUpTableName%>
			json.Unmarshal([]byte(body), &jsonEnt)
			So(jsonEnt.State, ShouldEqual, true)
      <%for(var i=1,ll=data.length;i<ll;i++) {%><% if(data[i].valtype == "string") {%>So(jsonEnt.Msg.<%= data[i].key.toLowerCase().replace(/^\S/,function(s){return s.toUpperCase();})%>, ShouldEqual, "<%= data[i].key.toLowerCase()%>")<%} else {%>So(jsonEnt.Msg.<%= data[i].key.toLowerCase().replace(/^\S/,function(s){return s.toUpperCase();})%>, ShouldEqual, 0)<%}%>
      <%}%>
		})
	})
}

func Test<%= firstUpTableName%>Page(t *testing.T) {
	Convey("获取列表<%= china%>", t, func() {
		_, body, _ := request.Post(Url + "<%= url%>/page").Send("cp=1&mp=10&kw=11").End()
		var jsonEnt json<%= firstUpTableName%>List
		json.Unmarshal([]byte(body), &jsonEnt)
		So(jsonEnt.State, ShouldEqual, true)
		So(jsonEnt.Count, ShouldNotEqual, 0)
	})
}

func Test<%= firstUpTableName%>Dele(t *testing.T) {
	Convey("删除<%= china%>", t, func() {
		_, body, _ := request.Delete(Url + "<%= url%>").Query("id=" + Tools.ParseString(id)).End()
		var jsonEnt json<%= firstUpTableName%>
		json.Unmarshal([]byte(body), &jsonEnt)
		So(jsonEnt.State, ShouldEqual, true)
		Convey("获取验证", func() {
			_, body, _ := request.Get(Url + "<%= url%>/" + Tools.ParseString(id)).End()
			var jsonEnt json<%= firstUpTableName%>
			json.Unmarshal([]byte(body), &jsonEnt)
			So(jsonEnt.State, ShouldEqual, false)
		})
	})
}
