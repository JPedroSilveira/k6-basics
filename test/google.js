import http from 'k6/http'
import { sleep } from 'k6'

// init-code
export default () => {
	// vu code
	http.get('https://www.google.com/')
	sleep(1)
}

// Simple test: k6 run test/google.js
// Using 10 virtual users during 10 seconds: k6 run --vus 10 --duration 10s test/google.js
