<template>
    <LayoutDashboard title="Fornecedores">
        <v-card outlined>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="fornecedores"
            :search="search"
            >
            <template v-slot:item._contato="{ item }">
                {{ item.telefone }}<span v-if="item.telefone_whatsapp"> / {{item.telefone_whatsapp}}</span>
            </template>
            <template v-slot:item._verificado="{ item }">
                    <span v-if="item.verificado">
                        <v-chip
                        class="ma-2"
                        color="success"
                        outlined
                        small
                        >
                        VERIFICADO
                    </v-chip>
                    </span>
                    <span v-if="!item.verificado">
                        <v-chip
                        class="ma-2"
                        color="error"
                        outlined
                        small
                        >
                        NÃO VERIFICADO
                    </v-chip>
                </span>
            </template>
            
    <template v-slot:item._actions="{ item }">
        <v-btn color="primary" small outlined @click="visualizar(item.id)">Visualizar</v-btn>
    </template>
</v-data-table>
</v-card>

<v-dialog v-model="modalVisualizar" max-width="720px">
    <v-card outlined>
        <v-card-title>Visualizar fornecedor</v-card-title>
        <v-card-text>
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                        <tr>
                            <td><strong>Nome:</strong></td>
                            <td>{{fornecedor.nome}}</td>
                        </tr>
                        <tr>
                            <td><strong>Nome Fantasia:</strong></td>
                            <td>{{fornecedor.nome_fantasia}}</td>
                        </tr>
                        <tr>
                            <td><strong>CPF/CNPJ:</strong></td>
                            <td>{{fornecedor.nome_fantasia}}</td>
                        </tr>
                        <tr>
                            <td><strong>WhatsApp:</strong></td>
                            <td>{{fornecedor.telefone_whatsapp}}</td>
                        </tr>
                        <tr>
                            <td><strong>Telefone:</strong></td>
                            <td>{{fornecedor.telefone}}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>{{fornecedor.email}}</td>
                        </tr> 
                        <tr>
                            <td><strong>Endereço:</strong></td>
                            <td>{{fornecedor.logradouro}} {{fornecedor.numero_local}}, {{fornecedor.bairro}} - {{fornecedor.cep}}</td>
                        </tr>
                        <tr>
                            <td><strong>Taxa Delivery:</strong></td>
                            <td>{{fornecedor.taxa_delivery}}</td>
                        </tr>
                        <tr>
                            <td><strong>Situação:</strong></td>
                            <td>
                                <span v-if="fornecedor.verificado">
                                    <v-chip
                                    class="ma-2"
                                    color="success"
                                    outlined
                                    small
                                    >
                                    Verificado
                                </v-chip>
                            </span>
                            <span v-if="!fornecedor.verificado">
                                <v-chip
                                class="ma-2"
                                color="error"
                                outlined
                                small
                                >
                                Não verificado
                            </v-chip>
                        </span>
                    </td>
                </tr>
                <tr v-for="a in fornecedor.arquivos">
                    <td><strong>Arquivo:</strong></td>  
                    <td><a :href="a.url" target="_blank"><v-btn color="default" outlined small>Visualizar</v-btn></a></td>  
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</v-card-text>
<v-card-actions>
    <v-btn color="default" @click="modalVisualizar = false" outlined>Fechar</v-btn>
    <v-spacer></v-spacer>
    <v-btn color="success" outlined @click="modalVerificarCadastro = true">Ativar cadastro</v-btn>
</v-card-actions>
</v-card>
</v-dialog>

<v-dialog v-model="modalVerificarCadastro" max-width="720px">
    <v-card>
        <v-card-title>Ativar Cadastro</v-card-title>
        <v-card-text>
            <h3 align="center">Tem certeza que deseja ativar este fornecedor?</h3>
        </v-card-text>
        <v-card-actions>
            <v-btn color="default" @click="modalVerificarCadastro = false" outlined>Não</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="verificarCadastro" outlined>Sim</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</LayoutDashboard>


</template>
<script>
    import LayoutDashboard from '@/components/shared/LayoutDashboard'
    import FornecedorService from '@/services/fornecedorService'
    
    export default {
        components: {
            LayoutDashboard
        },
        data() {
            return {
                search: '',
                headers: [
                { text: 'Nome', value: 'nome' },
                { text: 'E-mail', value: 'email' },
                { text: 'CPF/CNPJ', value: 'cpf_cnpj' },
                { text: 'Telefone / WhatsApp', value: '_contato' },
                { text: 'Situação', value: '_verificado'},
                { text: '', value: '_actions' },
                ],
                fornecedores: [],
                fornecedor: {},
                modalVisualizar: false,
                modalVerificarCadastro: false,
            }
        },
        methods: {
            listarNaoVerificados(){
                this.$store.commit('setOverlay', true)
                FornecedorService.listarNaoVerificados()
                .then(res => {
                    this.$store.commit('setOverlay', false)
                    this.fornecedores = res.data
                    console.log(res.data)
                }) 
                .catch(e => {
                    this.$store.commit('setOverlay', false)
                    console.log(e)
                })
            },
            visualizar(id){
                this.$store.commit('setOverlay', true)
                FornecedorService.visualizar(id)
                .then(res => {
                    this.fornecedor = res.data
                    this.$store.commit('setOverlay', false)
                    this.modalVisualizar = true
                    console.log('visualizando fornecedor', this.fornecedor)
                })
                .catch(e => {
                    this.$store.commit('setOverlay', true)
                })
            },
            verificarCadastro(){
                this.modalVerificarCadastro = false
                this.modalVisualizar = false
                this.$store.commit('setOverlay', true)
                FornecedorService.verificarCadastro(this.fornecedor.id)
                .then(res => {
                    this.$store.commit('setOverlay', false)
                    this.$store.commit('snackbarSuccess', 'Fornecedor verificado com sucesso.')
                    this.listarNaoVerificados()
                })
                .catch(e => {
                    console.log(e)
                    this.$store.commit('setOverlay', false)
                    this.$store.commit('snackbarError', 'Erro ao verificar o cadastro do fornecedor.')
                })
            }
        },
        created(){
            this.listarNaoVerificados()
        }
    }
</script>