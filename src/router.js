import Vue from "vue";
import Router from "vue-router";

/* Views aqui */
import Login from "./views/Login.vue";
import RecoverPassword from '@/views/RecoverPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'

import Home from "./views/Home.vue";

import FornecedorListar from '@/views/fornecedor/Listar'
import FornecedorCadastro from '@/views/fornecedor/Cadastro'

Vue.use(Router);

export default new Router({
	// mode: 'history',
	routes: [
		{
			path: "/login",
			name: "login",
			component: Login
		},
		{
			path: '/recuperar-senha',
			name: 'recoverPassword',
			component: RecoverPassword
		},
		{
			path: "/",
			name: "home",
			component: Home,
			children: [
				{
					path: "/fornecedores",
					name: "fornecedores",
					component: FornecedorListar
                },
                {
                    path: "/fornecedores/:id/cadastro",
                    name: "fornecedoresCadastro",
                    component: FornecedorCadastro,
                    props: true
                }
			]
		}
	]
});
