<?php
/**
 * User: 
 * mail:
 * Date:
 * Des:
 * Generate: entityAuto@huabinglan@163.com
 */

namespace app\<%= rootpath%>\model;
use think\Model;

/**
  *
  * @param $id
  * @return array|false|\PDOStatement|string|Model
  */
class <%= firstUpTableName%> extends Model
{
	public function read($id) {
		return $this->find($id);
}
/**
 *
 * @param $useradminInfo
 * @return false|int
 */
	public function saveData($<%= tablename.toLowerCase()%>Info)
	{
		return $this->allowField(true)->save($<%= tablename.toLowerCase()%>Info);
  }
  /**
   *
   * @param $useradminInfo
   * @return false|int
   */
		 public function editData($<%= tablename.toLowerCase()%>Info,$id) {
		     return $this->allowField(true)->save($<%= tablename.toLowerCase()%>Info, ['id'=>$id]);
		 }
     /**
       *
       * @param $id
       * @return int
       */
		 public function remove($id) {
		  return $this->where('id','in', explode(',', $id))->delete();
		}
    /**
     *
     * @param mixed $kw
     * @param mixed|null $cp
     * @param $mp
     * @return false|\PDOStatement|string|\think\Collection
     */
		public function page($kw, $cp, $mp) {
				return $this->where('title', 'like', '%'.$kw.'%')->select();
		}

	 }
