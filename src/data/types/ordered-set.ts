export class OrderedSet<Value> {
	private valuesInOrder: Value[] = []
	private valueSet: Set<Value> = new Set()

	constructor(values?: Value[]) {
		if (values) {
			this.add(...values)
		}
	}

	add(...values: Value[]): void {
		values.forEach(value => {
			if (!this.valueSet.has(value)) {
				this.valuesInOrder.push(value)
				this.valueSet.add(value)
			}
		})
	}

	delete(value: Value): void {
		if (this.valueSet.has(value)) {
			this.valuesInOrder.splice(this.valuesInOrder.indexOf(value), 1)
			this.valueSet.delete(value)
		}
	}

	has(value: Value): boolean {
		return this.valueSet.has(value)
	}

	clear(): void {
		this.valuesInOrder = []
		this.valueSet.clear()
	}

	get size(): number {
		return this.valuesInOrder.length
	}

	[Symbol.iterator](): IterableIterator<Value> {
		return this.valuesInOrder[Symbol.iterator]()
	}
}
