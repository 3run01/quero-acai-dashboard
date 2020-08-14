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
    atualizar: (data) => {
        return http.put(`/dashboard/fornecedor/${data.id}`, data)
    },
    verificarCadastro: (id) => {
        return http.put(`/dashboard/fornecedor/${id}`, {
            verificado: true
        })
    },

}