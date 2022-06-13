/*
  12 - 可串联构造器
  -------
  by Anthony Fu (@antfu) #中等 #application
  
  ### 题目
  
  在 JavaScript 中我们很常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给他附上类型吗？
  
  在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 `option(key, value)` 和 `get()`。在 `option` 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 `get` 获取最终结果。
  
  例如
  
  ```ts
  declare const config: Chainable
  
  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()
  
  // 期望 result 的类型是：
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```
  
  你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。
  
  你可以假设 `key` 只接受字符串而 `value` 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 `key` 只会被使用一次。
  
  > 在 Github 上查看：https://tsch.js.org/12/zh-CN
*/

/* _____________ 你的代码 _____________ */
// 怎么存储上一次的传入类型 --> 泛型
// 怎么解决非某种类型的提示  extends 
type Chainable<T = {}> = {
	option<K extends string, V>(
		key: K extends keyof T ? never : K,
		value: V
	): Chainable<T & Record<K, typeof value>>;
	get(): T;
};

/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from "@type-challenges/utils";

declare const a: Chainable;

const result1 = a
	.option("foo", 123)
	.option("bar", { value: "Hello World" })
	.option("name", "type-challenges")
	.get();

const result2 = a
	.option("name", "another name")
	// @ts-expect-error
	.option("name", "last name")
	.get();

type cases = [
	Expect<Alike<typeof result1, Expected1>>,
	Expect<Alike<typeof result2, Expected2>>
];

type Expected1 = {
	foo: number;
	bar: {
		value: string;
	};
	name: string;
};

type Expected2 = {
	name: string;
};

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/12/answer/zh-CN
  > 查看解答：https://tsch.js.org/12/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/