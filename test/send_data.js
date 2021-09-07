import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
	vus: 50,
	iterations: 100,
	summaryTrendStats: ['avg', 'min', 'med', 'max', 'count'],
}

export default () => {
	const payload = JSON.stringify({
		email: 'fake@gmail.com',
		password: '12345678',
	})

	const options = {
		headers: {
			'content-type': 'application/json',
		},
	}

	const response = http.post(
		'https://run.mocky.io/v3/1dbe6542-c552-4c8a-940d-964fa3f4856e',
		payload,
		options,
	)

	check(response, {
		'response status is 200': response => response.status === 200,
	})

	sleep(1)
}
