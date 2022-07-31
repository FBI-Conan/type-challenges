/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #中等 #object
  
  ### 题目
  
  实现一个通用的`RequiredByKeys<T, K>`，它接收两个类型参数`T`和`K`。
  
  `K`指定应设为必选的`T`的属性集。当没有提供`K`时，它就和普通的`Required<T>`一样使所有的属性成为必选的。
  
  例如:
  
  ```ts
  interface User {
    name?: string
    age?: number
    address?: string
  }
  
  type UserRequiredName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }
  
  ```
  
  > 在 Github 上查看：https://tsch.js.org/2759/zh-CN
*/

/* _____________ 你的代码 _____________ */

// Pick<T, K> 会复制 T 的 readonly ? 等关键字

type RequiredByKeys_temp<T, K extends keyof T> = {
	[P in K]-?: T[P];
} & Pick<T, Exclude<keyof T, K>>;

type RequiredByKeys<T, K = keyof T> = RequiredByKeys_temp<T, keyof T & K>;

/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from "@type-challenges/utils";

interface User {
	name?: string;
	age?: number;
	address?: string;
}

interface UserRequiredName {
	name: string;
	age?: number;
	address?: string;
}

interface UserRequiredNameAndAge {
	name: string;
	age: number;
	address?: string;
}

type cases = [
	Expect<Alike<RequiredByKeys<User, "name">, UserRequiredName>>,
	Expect<Alike<RequiredByKeys<User, "name" | "unknown">, UserRequiredName>>,
	Expect<Alike<RequiredByKeys<User, "name" | "age">, UserRequiredNameAndAge>>,
	Expect<Alike<RequiredByKeys<User>, Required<User>>>
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/2759/answer/zh-CN
  > 查看解答：https://tsch.js.org/2759/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
