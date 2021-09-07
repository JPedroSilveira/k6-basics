// 1) Init
// Initialize variables, import things, define options, etc
export const options = {
	vus: 50,
	iterations: 100,
}

// 2) Setup
//  Called once before load test starts
export function setup() {
	const list = [1, 2, 3, 4]
	// Prepare data and environment for test
	console.log(`Inside setup: ${JSON.stringify(list)}`)

	return list
}

// 3) Default
// Entry point for virtual users (test function)
export default function (list) {
	// Test something
	console.log(`Inside test: ${JSON.stringify(list)} VU=${__VU} ITER=${__ITER}`)
}

// 4) Teardown
// Called once after default function (tests completed)
export function teardown(list) {
	// Save something
	// Clean data
	console.log(`Inside teadown: ${JSON.stringify(list)}`)
}
