import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
	vus: 50,
	iterations: 100,
	summaryTrendStats: ['avg', 'min', 'med', 'max', 'count'],
}

export default () => {
	const options = {
		headers: {
			'content-type': 'application/json',
		},
	}

	const response = http.get(
		'https://run.mocky.io/v3/8e654afb-78a5-4dc4-8bbf-ef54541c0c25',
		options,
	)

	check(response, {
		'response status is 200': response => response.status === 200,
	})

	const body = JSON.parse(response.body)

	check(body, {
		'response body is valid': body => {
			const message = body.message
			return message === 'success'
		},
	})

	sleep(1)
}
