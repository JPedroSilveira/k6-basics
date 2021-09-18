import http from 'k6/http'
import { sleep } from 'k6'

// Same of "run k6 --vus 10 --duration 30s test/google.js"
export const options = {
	vus: 10,
	duration: '30s',
}

export default () => {
	http.get('https://www.google.com/')
	sleep(1)
}
