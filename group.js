import { group, check } from 'k6'
import http from 'k6/http'
import { Trend, Rate } from 'k6/metrics'

const groupDuration = new Trend('groupDuration')
const uolDurationTrend = new Trend('uolDurationTrend')
const g1DurationTrend = new Trend('g1DurationTrend')
const errorRate = new Rate('errors')

export const options = {
	vus: 50,
	duration: '30s',
	thresholds: {
		errors: ['rate<0.1'],
		uolDurationTrend: ['p(90)<2000'],
		'groupDuration{groupName:uol}': ['avg < 3000'],
		'groupDuration{groupName:g1}': ['avg < 4000'],
		g1DurationTrend: ['p(90)<3700'],
		'http_req_duration{type:G1}': ['p(95)<4500'],
		'http_req_duration{type:UOL}': ['p(95)<2500'],
	},
}

function groupWithMetrics(groupName, groupFunction) {
	const start = new Date()
	group(groupName, groupFunction)
	const end = new Date()
	groupDuration.add(end - start, { groupName })
}

export default () => {
	groupWithMetrics('uol', function () {
		const response = http.get('https://www.uol.com.br', {
			tags: {
				type: 'UOL',
			},
		})
		const checkResult = check(response, {
			'is uol response 200: ': response => response.status === 200,
			tags: {
				type: 'UOL',
			},
		})
		errorRate.add(!checkResult)
		uolDurationTrend.add(response.timings.duration)
	})

	groupWithMetrics('g1', function () {
		const response = http.get('https://g1.globo.com/', {
			tags: {
				type: 'G1',
			},
		})
		const checkResult = check(response, {
			'is g1 response 200: ': response => response.status === 200,
			tags: {
				type: 'G1',
			},
		})
		errorRate.add(!checkResult)
		g1DurationTrend.add(response.timings.duration)
	})
}
