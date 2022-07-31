/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array
  
  ### Question
  
  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`
  
  Negative numbers do not need to be considered.
  
  For example
  
  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```
  
  Good Luck!
  
  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */
// 比较个位数的大小，如 '1' 和 '2'
type GreaterThanBase<
	S1 extends string,
	S2 extends string,
	T extends any[] = []
> = S2 extends '9'
	? false
	: S1 extends never
	? false
	: S2 extends never
	? false
	: S1 extends `${T['length']}`
	? false
	: S2 extends `${T['length']}`
	? true
	: GreaterThanBase<S1, S2, [...T, any]>;

// 一位一位的比较
type GreaterThan<
	N1 extends number,
	N2 extends number,
	S1 extends string = `${N1}`,
	S2 extends string = `${N2}`
> = S1 extends `${infer F1}${infer R1}`
	? S2 extends `${infer F2}${infer R2}`
		? F1 extends F2
			? GreaterThan<never, never, R1, R2>
			: GreaterThanBase<F1, F2>
		: true
	: false;

// type X<T> = T extends infer

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
	Expect<Equal<GreaterThan<1, 0>, true>>,
	Expect<Equal<GreaterThan<5, 4>, true>>,
	Expect<Equal<GreaterThan<4, 5>, false>>,
	Expect<Equal<GreaterThan<0, 0>, false>>,
	Expect<Equal<GreaterThan<20, 20>, false>>,
	Expect<Equal<GreaterThan<10, 100>, false>>,
	Expect<Equal<GreaterThan<111, 11>, true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
