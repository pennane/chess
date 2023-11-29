import * as readline from 'readline'

export async function getInput(prompt: string): Promise<string> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	return new Promise<string>((resolve) => {
		rl.question(prompt, (input) => {
			rl.close()
			resolve(input)
		})
	})
}

export async function promptForGameType(): Promise<'w' | 'b' | 'c'> {
	const selectedColor = await getInput(
		'Choose side: (w / b / c) (c for computer vs computer) ',
	)

	if (!selectedColor) return promptForGameType()

	const color = selectedColor.toLowerCase()

	if (color === 'w' || color === 'b' || color === 'c') {
		return color
	}

	console.info('Invalid color.')
	return promptForGameType()
}
