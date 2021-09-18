/*
Threashod define pass and fail criteria.

Examples:
- System doesn't have more than 1% of errors.
- Response time for 95% of requests should be below 200ms
- Response time for 99% of requests should be below 400ms
*/

import http from 'k6/http'
import { check } from 'k6'
import { Rate, Trend } from 'k6/metrics'

const failRate = new Rate('failed_requests')
const requestDurationRate = new Trend('request_duration')

export const options = {
	vus: 50,
	iterations: 1000,
	thresholds: {
		failed_requests: ['rate<0.1'],
		request_duration: ['p(50)<800', 'p(99)<1500'],
		checks: ['rate>0.9'], // 90% of checks should be true
	},
}

export default function () {
	const response = http.get('https://google.com')

	requestDurationRate.add(response.timings.duration)

	const requestFail = response.status !== 200
	failRate.add(requestFail)

	check(response, {
		'response without error': response => response.status < 400,
	})
}
