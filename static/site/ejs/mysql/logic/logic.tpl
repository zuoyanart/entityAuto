/**
 * logic
 * @param  {} []
 * @return {}     []
 */
module.exports = class extends think.Logic {

  getAction() {
    this.rules = {
      id: {
        required: true,
        int: true,
        min:1
      },
    }
  }

  editNameAction() {
    this.rules = {
      id: {
        required: true,
        int: true,
      },
      name: {
        required: true,
        length: {
          min: 1,
          max: 20
        }
      },
    }
  }

  createAction() {
    this.rules = {
      <%for(var i=0,ll=data.length; i<ll;i++) {%>
       <%= data[i].key%>:<%= data[i].validate%>,
      <%}%>
    }
  }

pageAction() {
    this.rules = {
      cp: {
        required: true,
        int: true,
      },
      mp:{
        required: true,
        int: true,
      },
      name: {
        required: true,
        length: {
          min: 1,
          max: 20
        }
      },
    }
  }

delAction() {
    this.rules = {
      id: {
        required: true,
        int: true,
        min:1
      }
    }
  }



}