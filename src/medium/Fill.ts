/*
  4518 - Fill
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple
  
  ### Question
  
  `Fill`, a common JavaScript function, now let us implement it with types.
  `Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
  The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.
  
  ```ts
  type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
  ```
  In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)
  
  > View on GitHub: https://tsch.js.org/4518
*/

/* _____________ Your Code Here _____________ */
type Fill<
	T extends unknown[],
	N,
	Start extends number = 0,
	End extends number = T['length'],
	Tf extends any[] = [],
	IsReplace extends boolean = Start extends 0 ? true : false
> = Start extends End
	? T
	: T extends [infer F, ...infer R]
	? Start extends Tf['length']
		? [N, ...Fill<R, N, Start, End, [...Tf, any], true>]
		: End extends Tf['length']
		? T
		: IsReplace extends true
		? [N, ...Fill<R, N, Start, End, [...Tf, any], IsReplace>]
		: [F, ...Fill<R, N, Start, End, [...Tf, any], IsReplace>]
	: [];

const fill = (
	arr: any[],
	val: any,
	s = 0,
	e = arr.length,
	index = 0,
	isReplace = false
): any[] => {
	if (s === e) {
		return arr;
	} else if (arr.length !== 0) {
		const F = arr[0];
		const R = arr.slice(1);
		if (s === index) {
			return [val, ...fill(R, val, s, e, ++index, true)];
		} else if (e === index) {
			return arr;
		} else {
			if (isReplace) {
				return [val, ...fill(R, val, s, e, ++index, isReplace)];
			} else {
				return [F, ...fill(R, val, s, e, ++index, isReplace)];
			}
		}
	} else {
		return [];
	}
};
console.log(fill([1, 2, 3], 0, 2, 2));

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
	Expect<Equal<Fill<[], 0>, []>>,
	Expect<Equal<Fill<[], 0, 0, 3>, []>>,
	Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
	Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
	Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
	Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
	Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
	Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
	Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
	Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4518/answer
  > View solutions: https://tsch.js.org/4518/solutions
  > More Challenges: https://tsch.js.org
*/
