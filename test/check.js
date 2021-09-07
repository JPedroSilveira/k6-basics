// https://run.mocky.io/v3/00d2eb53-615f-4ca8-8de7-cbe8adfab8df
// Using Mocky.io to generate mock API with empty body and status code 200

import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
	vus: 10,
	iterations: 500,
	summaryTrendStats: ['avg', 'min', 'med', 'max', 'count'],
}

const response = http.get(
	'https://run.mocky.io/v3/00d2eb53-615f-4ca8-8de7-cbe8adfab8df',
)

export default () => {
	const res = http.get(
		'https://run.mocky.io/v3/00d2eb53-615f-4ca8-8de7-cbe8adfab8df',
	)

	// __VU is the virtual user number
	// __ITER is the current iteration
	console.log(
		`response body length ${res.body.length} for VU=${__VU} ITER=${__ITER}`,
	)

	// Check don't stop the execution, they are done in parallel
	check(res, {
		'response status is 200': r => r.status === 200,
		'response status is 400': r => r.status === 400,
		'body size is 0': r => r.body.length === 0,
	})

	sleep(1)
}
