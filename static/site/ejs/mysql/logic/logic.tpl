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
        int: {
          min:1
        }
      },
    }
  }

  editNameAction() {
    this.rules = {
      id: {
        required: true,
        int: {
          min: 1
        },
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
        int: {
          min:1
        },
      },
      mp:{
        required: true,
        int: {
          min:1,
          max:100
        },
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
        int: {
          min:1
        },
        method: 'get'
      }
    }
  }



}