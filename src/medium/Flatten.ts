/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #中等 #array
  
  ### 题目
  
  在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。
  
  例如:
  
  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```
  
  > 在 Github 上查看：https://tsch.js.org/459/zh-CN
*/

/* _____________ 你的代码 _____________ */
// 遍历元组的另一种形式就是 {[P in keyof K]: K[P]}，但是这种形式改变不了元组的长度，与 Flatten 的功能相悖

type Flatten<T extends any[]> = T extends [infer F, ...infer R]
	? F extends any[]
		? [...Flatten<F>, ...Flatten<R>]
		: [F, ...Flatten<R>]
	: [];

type x = Flatten<[]>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
	Expect<Equal<Flatten<[]>, []>>,
	Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
	Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
	Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
	Expect<
		Equal<
			Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
			[{ foo: "bar"; 2: 10 }, "foobar"]
		>
	>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/459/answer/zh-CN
  > 查看解答：https://tsch.js.org/459/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
