import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
	vus: 10,
	iterations: 500,
	summaryTrendStats: ['avg', 'min', 'med', 'max', 'count'],
}

export default () => {
	const res = http.get(
		'https://run.mocky.io/v3/0485a69f-277b-4ddd-883e-a644dbda2bff',
	)

	// __VU is the virtual user number
	// __ITER is the current iteration
	console.log(
		`response body length ${res.body.length} for VU=${__VU} ITER=${__ITER}`,
	)

	// Check don't stop the execution, they are done in parallel
	check(res, {
		'response status is 200': r => r.status === 200,
		'body size is 26': r => r.body.length === 26,
	})

	sleep(1)
}
