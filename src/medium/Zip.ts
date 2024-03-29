/*
  4471 - Zip
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple
  
  ### Question
  
  In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
  ```ts
  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
  ```
  
  > View on GitHub: https://tsch.js.org/4471
*/

/* _____________ Your Code Here _____________ */

type Zip<
	T1 extends any[],
	T2 extends any[],
	Z extends any[] = []
> = T1 extends [infer F1, ...infer R1]
	? T2 extends [infer F2, ...infer R2]
		? Zip<R1, R2, [...Z, [F1, F2]]>
		: Z
	: Z;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
	Expect<Equal<Zip<[], []>, []>>,
	Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
	Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
	Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
	Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4471/answer
  > View solutions: https://tsch.js.org/4471/solutions
  > More Challenges: https://tsch.js.org
*/
