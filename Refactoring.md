# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I've started with introducing more tests that cover 100% of the branches of the initial function to make sure that refactoring doesn't break anything. I've also added `test:coverage` npm script for convenience.

The next step was refactoring itself:
- I moved constants `TRIVIAL_PARTITION_KEY` and `MAX_PARTITION_KEY_LENGTH` from the function scope. They don't need to be defined on every function call so I like it better this way. Although it's not that important because the main purpose of them is to eliminate magic numbers.
- I extracted `createHash` and `stringifyIfNeeded` to separate functions, this removes low-level details from the function, which improves readability.
- I eliminated the use of `candidate` variable, instead directly returning the result whenever possible. This was done to comply with the principle of immutability which makes the code more predictable and easier to reason about.
- The original function had nested condition checks which made the code harder to follow. I simplified this by using early returns which reduced its cognitive complexity.
- I created partition key validity check as a separate function: the condition check to validate the partitionKey (i.e., checking if it's not an empty string or other falsy value, except for 0 which i assume is valid) was moved into a separate function `isValidPartitionKey`. This encapsulates low-level validation logic into a specific function, making the code easier to underestand.
- And finally I've added JSDoc comments for `deterministicPartitionKey` function and the `Event` type. The `@typedef` annotation was used to define the `Event` structure. These comments serve as important documentation, helping other developers who may interact with this function in the future.
