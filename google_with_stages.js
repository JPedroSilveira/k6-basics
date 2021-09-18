import http from 'k6/http'
import { check, sleep } from 'k6'

// to export results use "k6 run --out json=report.json test/google_with_stages.js"
export const options = {
	stages: [
		{ duration: '20s', target: 20 },
		{ duration: '10s', target: 50 },
		{ duration: '5s', target: 100 },
		{ duration: '20s', target: 0 },
	],
	summaryTrendStats: ['avg', 'min', 'med', 'max', 'count'],
}

export default () => {
	const res = http.get('https://www.google.com/')
	check(res, {
		'status was 200': r => {
			const statusOk = r.status === 200
			const statusTooManyRequests = r.status
			const isSuccessful = statusOk || statusTooManyRequests
			return isSuccessful
		},
	})
	sleep(1)
}
