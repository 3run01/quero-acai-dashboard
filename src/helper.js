import moment from 'moment'
export default class Helper {

  formatReal( n ) {
      // parseFloat(n)
      return n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
  }

  firstName(name) {
    let firstName = name.split(' ')
    return firstName[0]
  }

  cleanFormatReal(n){
    return n.replace('.', '').replace(',', '.')
    // return data
  }

  firstName(name) {
    let firstName = name.split(' ')
    return firstName[0]
  }

  cleanFormatReal(value){
    var data = value.replace(".", "").replace(",",".")
    return data
  }

  // showErrors(data){
  //   let stringErrors = [];
  //   Object.keys(data).map(value => {
  //        return stringErrors.push(`${data[value]}`);
  //   });

  //   store.commit('alertError', stringErrors)
  // }

  // verificaPermissao(permissao){
  //   let permissoes = store.getters.getUser.perfil.permissoes.filter((item) => {
  //     return item.permissao == permissao
  //   })

  //   if(permissoes.length > 0){
  //     return true
  //   }
    
  //   if(store.getters.getUser.perfil.perfil == 'Suporte'){
  //     return true
  //   }
  // }

  // permissaoView(permissao){
  //   if(!this.verificaPermissao(permissao)){
  //     store.commit('snackbarError', 'Sem permissão.')
  //     router.push({name: 'inicio'})
  //   }
  // }

  formatDateTime(n) {
    return moment(n, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm')
  }


}
