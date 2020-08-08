import { http } from './config'

export default {
    listar: () => {
        return http.get('/fornecedor')
    },
    listarNaoVerificados: () => {
        return http.get(`/dashboard/fornecedor`)
    },
    cadastrar: (data) => {
        return http.post(`/fornecedor`, data)
    },
    visualizar: (id) => {
        return http.get(`/fornecedor/${id}`)
    },
    atualizar: (data, id) => {
        return http.put(`/fornecedor/${id}`, data)
    },
    verificarCadastro: (id) => {
        return http.put(`/fornecedor/${id}`, {
            verificado: true
        })
    },

}