<?php
/**
 * User:
 * mail:
 * Date:
 * Des:
 * Generate: entityAuto@huabinglan@163.com
 */

namespace app\<%= rootpath%>\validate;
use think\Validate;

class <%= firstUpTableName%> extends Validate
{
//规则
    protected $rule = [
          <%for(var i=0,ll=data.length;i<ll;i++) {%>
            '<%=data[i].key.toLowerCase()%>'=>  '<%- data[i].validate%>',<%}%>
            'cp'=>'',
            'mp'=>''
        ];

//场景不同场景验证不同的字段
    protected $scene = [
        'read'    => ['id'],
        'index' =>['cp'=>'require|min:1','mp'=>'require|min:1'],
        'delete' =>['id'],
        'save'=>[<%for(var i=0,ll=data.length;i<ll;i++) {%><%if(data[i].key.toLowerCase() != 'id'){%>'<%= data[i].key.toLowerCase()%>',<%}}%>]
    ];
}
