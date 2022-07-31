/*
  5821 - MapTypes
  -------
  by Krzysztof "Wokay" Łokaj (@wokayme) #medium #map #object #utils
  
  ### Question
  
  Implement `MapTypes<T, R>` which will transform types in object T to different types defined by type R which has the following structure
  
  ```ts
  type StringToNumber = {
    mapFrom: string; // value of key which value is string
    mapTo: number; // will be transformed for number
  }
  ```
  
  ## Examples:
  
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  MapTypes<{iWillBeANumberOneDay: string}, StringToNumber> // gives { iWillBeANumberOneDay: number; }
  ```
  
  Be aware that user can provide a union of types:
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  type StringToDate = { mapFrom: string; mapTo: Date;}
  MapTypes<{iWillBeNumberOrDate: string}, StringToDate | StringToNumber> // gives { iWillBeNumberOrDate: number | Date; }
  ```
  
  If the type doesn't exist in our map, leave it as it was:
  ```ts
  type StringToNumber = { mapFrom: string; mapTo: number;}
  MapTypes<{iWillBeANumberOneDay: string, iWillStayTheSame: Function}, StringToNumber> // // gives { iWillBeANumberOneDay: number, iWillStayTheSame: Function }
  ```
  
  > View on GitHub: https://tsch.js.org/5821
*/

/* _____________ Your Code Here _____________ */
interface TransformRule<F = any, T = any> {
	mapFrom: F;
	mapTo: T;
}
type MapTypesBase<R extends TransformRule, T> = R extends {
	mapFrom: infer X;
	mapTo: infer Y;
}
	? Equal<X, T> extends true
		? Y
		: never
	: never;
type MapTypes<T, R extends TransformRule> = {
	[P in keyof T]: MapTypesBase<R, T[P]> extends never
		? T[P]
		: MapTypesBase<R, T[P]>;
};
type X = MapTypes<
	{ name: string; date: Date },
	{ mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }
>;
type x = MapTypesBase<
	{ mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string },
	string
>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
	Expect<
		Equal<
			MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }>,
			{ stringToArray: [] }
		>
	>,
	Expect<
		Equal<
			MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }>,
			{ stringToNumber: number }
		>
	>,
	Expect<
		Equal<
			MapTypes<
				{ stringToNumber: string; skipParsingMe: boolean },
				{ mapFrom: string; mapTo: number }
			>,
			{ stringToNumber: number; skipParsingMe: boolean }
		>
	>,
	Expect<
		Equal<
			MapTypes<
				{ date: string },
				{ mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }
			>,
			{ date: null | Date }
		>
	>,
	Expect<
		Equal<
			MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }>,
			{ date: null | Date }
		>
	>,
	Expect<
		Equal<
			MapTypes<
				{ fields: Record<string, boolean> },
				{ mapFrom: Record<string, boolean>; mapTo: string[] }
			>,
			{ fields: string[] }
		>
	>,
	Expect<
		Equal<
			MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }>,
			{ name: string }
		>
	>,
	Expect<
		Equal<
			MapTypes<
				{ name: string; date: Date },
				{ mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }
			>,
			{ name: boolean; date: string }
		>
	>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/5821/answer
  > View solutions: https://tsch.js.org/5821/solutions
  > More Challenges: https://tsch.js.org
*/
