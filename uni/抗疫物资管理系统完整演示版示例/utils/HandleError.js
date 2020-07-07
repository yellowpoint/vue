/**
 * @name Handle error
 * @author SunSeekerX
 * @time 2019-11-27 15:18:44
 * @LastEditors SunSeekerX
 * @LastEditTime 2019-11-27 17:19:31
 */

export default {
	/**
	 * @name Handle api request exception
	 * @description when api request fail, you should using this in your catch block
	 * @param { Error } e exception object
	 * @returns void
	 */
	handleApiRequestException(e) {
		console.error(e)
	},

	/**
	 * @name Handle WebSocket exception
	 * @description when WebSocket exception, you should using this in your catch block
	 * @param { Error } e exception object
	 * @returns void
	 */
	handleWebSocketException(e) {
		console.error(e)
	},

	/**
	 * @name Handle application exception
	 * @description when Application exception, you should using this in your catch block
	 * @param { Error } e exception object
	 * @returns void
	 */
	handleApplicationException(e) {
		console.error(e)
	}
}
