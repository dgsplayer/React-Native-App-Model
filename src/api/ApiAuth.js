import apisauce from 'apisauce';

const create = (bearer = "", baseURL = 'https://suburban.com.br/painel/theme/json/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ bearer 
    },
    timeout: 300000
  });
   
  const list = (tabela,campo,valor) => api.get('jsonLista.php', {tabela:tabela, campo: campo, valor: valor})
  const listPromo = (tabela,campo,valor) => api.get('jsonListaPromo.php', {tabela:tabela, campo: campo, valor: valor})
  const listbusca = (tabela,cidade,estado,nome) => api.get('jsonListaBusca.php', {tabela:tabela, cidade: cidade, estado: estado, nome:nome})
  const get_login = (celular) => api.post('jsonLogin.php', {celular:celular})
  const save = (tabela, input) => api.post('jsonSave.php', {tabela:tabela, ColValue: input})

  return {
    list,
    listPromo,
    listbusca,
    save,
    get_login
  }
}

export default {
  create
}
