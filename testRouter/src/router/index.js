import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import list from '@/components/list'

Vue.use(Router)
const pipe = x => () =>
	import(`@/components/${x}`);
export default new Router({
//	mode: 'history',
//	base: '/gameother',
	routes: [{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/list',
			name: 'list',
			component: list
		},
		{
			path: '/count',
			name: 'count',
			component: pipe('count')
		}
		,
		{
			path: '/testFixed',
			name: 'testFixed',
			component: pipe('testFixed')
		},
		{
			path: '/picker',
			name: 'picker',
			component: pipe('picker')
		},
		{
			path: '/tilt',
			name: 'tilt',
			component: pipe('tilt')
		}
	]
})