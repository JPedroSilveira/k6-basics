import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate } from 'k6/metrics'

const errorRate = new Rate('errors')

export const options = {
	vus: 50,
	iterations: 250,
	summaryTrendStats: ['avg', 'min', 'med', 'max', 'count'],
	thresholds: {
		errors: ['rate<0.1'], // 10% error are allowed
	},
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max)
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

	const randomNumber = getRandomInt(20)

	// Check don't stop the execution, they are done in parallel
	const isValidResponse = check(res, {
		'response status is 200': r => r.status === 200,
		'body size is 26': r => r.body.length === 26,
	})

	errorRate.add(!isValidResponse)

	const isRandomSuccess = check(res, {
		'random success': () => randomNumber > 1,
	})

	errorRate.add(!isRandomSuccess)

	sleep(1)
}
