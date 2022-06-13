/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal
  
  ### Question
  
  `FooBarBaz` -> `foo-bar-baz`
  
  > View on GitHub: https://tsch.js.org/612
*/

/* _____________ Your Code Here _____________ */

// 怎么判断是一个字母 ? A | B | ... | Z

type _KebabCase<S extends string> = S extends `${infer F}${infer R}`
	? Lowercase<F> extends Uppercase<F> // 是否是字母
		? `${F}${_KebabCase<R>}`
		: Lowercase<F> extends F
		? `${F}${_KebabCase<R>}` // 小写
		: `-${Lowercase<F>}${_KebabCase<R>}` // 大写
	: "";

type KebabCase<T extends string> = T extends `${infer F}${infer R}`
	? `${Lowercase<F>}${_KebabCase<R>}`
	: "";

type X = _KebabCase<"fooBarBaz">;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
	Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
	Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
	Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
	Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
	Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
	Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
	Expect<Equal<KebabCase<"-">, "-">>,
	Expect<Equal<KebabCase<"">, "">>,
	Expect<Equal<KebabCase<"😎">, "😎">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/612/answer
  > View solutions: https://tsch.js.org/612/solutions
  > More Challenges: https://tsch.js.org
*/
