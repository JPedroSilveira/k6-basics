import { sleep } from 'k6'
import { Counter } from 'k6/metrics'

export const options = {
	vus: 50,
	iterations: 100,
}

const myCounter = new Counter('my counter')

export default () => {
	// Can count when some event happen during the tests
	myCounter.add(1)
	sleep(1)
}
