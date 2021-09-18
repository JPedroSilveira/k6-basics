import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate } from 'k6/metrics'

const errorRate = new Rate('errors')

export const options = {
	vus: 50,
	iterations: 100,
	thresholds: {
		errors: ['rate<0.1'], // 10% error are allowed
	},
}

export default () => {
	const response = http.get('https://www.google.com/')

	const passed = check(response, {
		'response status is 200': r => r.status === 200,
	})

	errorRate.add(!passed)

	sleep(1)
}
