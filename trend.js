import http from 'k6/http'
import { Trend } from 'k6/metrics'

export const options = {
	vus: 50,
	iterations: 100,
}

const getApiDurationTrend = new Trend('trend_get_api_duration')
const getApiWaitingTrend = new Trend('trend_get_api_waiting')
const k6ApiDurationTrend = new Trend('trend_k6_api_duration')
const k6ApiResposeSizeTrend = new Trend('trend_k6_api_response_size')

export default () => {
	const response = http.get('https://google.com')
	// K6 will calculate statistics based in added values like avg, min and max.
	getApiDurationTrend.add(response.timings.duration)
	getApiWaitingTrend.add(response.timings.waiting)

	const k6Response = http.get('https://k6.io')
	k6ApiDurationTrend.add(k6Response.timings.duration)
	// This one probably will be all the same
	k6ApiResposeSizeTrend.add(k6Response.body.length)
}
