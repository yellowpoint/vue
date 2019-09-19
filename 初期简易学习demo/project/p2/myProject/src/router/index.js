import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index.vue'
import pageQuiButton from '@/pages/pageQuiButton.vue'
import pageQuiList from '../pages/pageQuiList.vue'
import pageQuiNav from '../components/quiNav.vue'
import pageDetails from '../pages/pageDetails.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'btn',
			component: pageQuiButton

		},
		{
			path: '/btn',
			name: 'btn',
			component: pageQuiButton,
			children: [
				{
					path: 'details',
					component: pageDetails
				}
			]
		},
		{
			path: '/list',
			name: 'list',
			component: pageQuiList
		},
		{
			path: '/nav',
			name: 'nav',
			component: pageQuiNav
		}
	]
})