import http from 'k6/http'

export const options = {
	rps: 10, // Requests per second
	vus: 100,
	duration: '5s',
}

export default function () {
	http.get('https://google.com')
}
