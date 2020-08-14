<template>
    <LayoutDashboard title="Fornecedores">
        <v-tabs
        app
        grow
        v-model="tabs"
        class="hidden-sm-and-down"
        outlined
        >
        <v-tab>
            Não Verificados ({{fornecedoresNaoVerificados.length}})
        </v-tab>
        
        
        <v-tab>
            Verificados ({{fornecedoresVerificados.length}})
        </v-tab>
    </v-tabs>
    
    <v-tabs-items v-model="tabs">
        <v-tab-item>
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
                    :items="fornecedoresNaoVerificados"
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
</v-tab-item>
<v-tab-item>
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
        :items="fornecedoresVerificados"
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
</v-tab-item>
</v-tabs-items>


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
    <v-btn color="info" outlined @click="modalCadastro = true, modalVisualizar = false">Editar</v-btn>
    <v-btn color="success" outlined @click="modalVerificarCadastro = true" v-if="!fornecedor.verificado">Ativar cadastro</v-btn>
</v-card-actions>
</v-card>
</v-dialog>

<v-dialog v-model="modalVerificarCadastro" max-width="720px">
    <v-card>
        <v-card-title>Ativar cadastro</v-card-title>
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

<v-dialog v-model="modalCadastro" max-width="720px">
    <v-card>
        <v-card-title>Cadastro de fornecedor</v-card-title>
        <form @submit.prevent="atualizar">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 md12>
                        <v-text-field class="mr-2 ml-2" label="Nome" v-model="fornecedor.nome"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md12>
                        <v-text-field class="mr-2 ml-2" label="Nome fantasia" v-model="fornecedor.nome_fantasia"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md12>
                        <v-text-field class="mr-2 ml-2" label="CPF/CNPJ" v-model="fornecedor.cpf_cnpj"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field class="mr-2 ml-2" label="WhatsApp" v-model="fornecedor.telefone_whatsapp"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field class="mr-2 ml-2" label="Telefone" v-model="fornecedor.telefone"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field class="mr-2 ml-2" label="E-mail" v-model="fornecedor.email"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md3>
                        <v-text-field class="mr-2 ml-2" label="CEP" v-model="fornecedor.cep"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md5>
                        <v-text-field class="mr-2 ml-2" label="Logradouro" v-model="fornecedor.logradouro"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md1>
                        <v-text-field class="mr-2 ml-2" label="Número" v-model="fornecedor.numero_local"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md3>
                        <v-text-field class="mr-2 ml-2" label="Bairro" v-model="fornecedor.bairro"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-btn color="default" outlined @click="modalCadastro = false">Fechar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="success" type="submit" outlined>Salvar</v-btn>
            </v-card-actions>
        </form>
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
                fornecedoresNaoVerificados: [],
                fornecedoresVerificados: [],
                fornecedor: {},
                modalVisualizar: false,
                modalVerificarCadastro: false,
                modalCadastro: false,
                tabs: 0
            }
        },
        methods: {
            listarNaoVerificados(){
                this.$store.commit('setOverlay', true)
                FornecedorService.listarNaoVerificados()
                .then(res => {
                    this.$store.commit('setOverlay', false)
                    this.fornecedoresNaoVerificados = res.data
                    console.log(res.data)
                }) 
                .catch(e => {
                    this.$store.commit('setOverlay', false)
                    console.log(e)
                })
            },
            listarVerificados(){
                this.$store.commit('setOverlay', true)
                FornecedorService.listar()
                .then(res => {
                    this.$store.commit('setOverlay', false)
                    this.fornecedoresVerificados = res.data
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
                    this.$store.commit('setOverlay', false)
                })
            },
            atualizar(){
                this.modalCadastro = false
                this.$store.commit('setOverlay', true)
                FornecedorService.atualizar(this.fornecedor)
                .then(res => {
                    this.listarNaoVerificados()
                    this.listarVerificados()
                    this.$store.commit('setOverlay', false)
                    this.$store.commit('snackbarInfo', 'Fornecedor atualizado.')
                })
                .cath(e => {
                    console.log(e)
                    this.$store.commit('setOverlay', false)
                    this.$store.commit('snackbarError', 'Erro ao atualizar fornecedor.')
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
                    this.listarVerificados()
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
            this.listarVerificados()
        }
    }
</script>