export function ifDefined<Value, ReturnValue>(
	optionalValue: Value | null | undefined,
	block: (value: Value) => ReturnValue
): ReturnValue | undefined {
	if (optionalValue === undefined || optionalValue === null) {
		return undefined
	}

	return block(optionalValue)
}

export function ifFound<ReturnValue>(findReturnValue: number, block: (index: number) => ReturnValue): ReturnValue | undefined {
	if (findReturnValue === -1) {
		return undefined
	}

	return block(findReturnValue)
}

interface ReduceBlock<Value> {
	then: (block: (value: Value) => Value) => ReduceBlock<Value>
	resolve: () => Value
}

export function reduce<Value>(value: Value): ReduceBlock<Value> {
	return {
		then: thenValueBlock => {
			return reduce<Value>(thenValueBlock(value))
		},
		resolve: () => value
	}
}
