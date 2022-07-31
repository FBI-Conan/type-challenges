/*
  4499 - Chunk
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple
  
  ### Question
  
  Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
  `Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`
  
  ```ts
  type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
  type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
  type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
  ```
  
  > View on GitHub: https://tsch.js.org/4499
*/

/* _____________ Your Code Here _____________ */
// 从元祖中取出前 N 位组成元组，剩余的也组成元组，两个元组再组成新的元组
// Slice<[1, 2, 3, 4, 5], 2> --> [[1, 2], [3, 4, 5]]
type Slice<
	T extends any[],
	N extends number,
	U extends any[] = []
> = U['length'] extends N
	? [U, T]
	: T extends [infer F, ...infer R]
	? Slice<R, N, [...U, F]>
	: [U, T];

type Chunk<T extends any[], N extends number, U extends any[] = []> = Slice<
	T,
	N
> extends [infer F, infer S]
	? S extends []
		? F extends []
			? U
			: [...U, F]
		: S extends any[]
		? Chunk<S, N, [...U, F]>
		: never
	: never;
type x = Chunk<[], 1>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
	Expect<Equal<Chunk<[], 1>, []>>,
	Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
	Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
	Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
	Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
	Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4499/answer
  > View solutions: https://tsch.js.org/4499/solutions
  > More Challenges: https://tsch.js.org
*/
