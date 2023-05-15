import { elementFunctions } from '../elementFunctionsFrontend';
import { getElement, GlobalElement, globalElements, GlobalElements } from './elementStore';

export interface ElementFunctions {
	element: string;
	handler: string;
	func: () => void;
}

for (const functionObject of elementFunctions) {
	assignFunction(functionObject);
}

export function assignFunction(dataObject: ElementFunctions): void {
	const { handler, func } = dataObject;
	const elementId = dataObject.element as keyof GlobalElements;
	const element = (() => {
		if (globalElements[elementId]) {
			return globalElements[elementId];
		}

		return getElement(elementId);
	})() as GlobalElement;
	const elementArray = [element];
	const flattenedArray = elementArray.flat();
	for (const element of flattenedArray) {
		element.addEventListener(handler, func);
	}
}