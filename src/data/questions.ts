export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
	input: unknown[]; // function arguments
	expected: unknown; // expected result
}

export interface Question {
	id: string;
	title: string;
	difficulty: Difficulty;
	description: string; // markdown/plain
	functionName: string; // function name to implement
	starterCode: string; // starter template (with solution)
	tests: TestCase[];
}

export const QUESTIONS: Question[] = [
	// 88. Merge Sorted Array
	{
		id: "merge-sorted-array-88",
		title: "88. Merge Sorted Array",
		difficulty: "Easy",
		functionName: "merge",
		description:
			"You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing how many elements in nums1 and nums2 are valid.\n\n" +
			"Merge nums2 into nums1 so that it becomes a single array sorted in non-decreasing order.\n\n" +
			"Interview harness note: return nums1 after merging (even though the merge should be in-place).\n\n" +
			"Examples:\n" +
			"- Input: nums1 = [1,2,3,0,0,0], m = 3; nums2 = [2,5,6], n = 3 → Output: [1,2,2,3,5,6]\n" +
			"- Input: nums1 = [1], m = 1; nums2 = [], n = 0 → Output: [1]\n" +
			"- Input: nums1 = [0], m = 0; nums2 = [1], n = 1 → Output: [1]",
		starterCode: `/**
 * Merge nums2 into nums1 in-place and return nums1.
 * Classic two-pointer from the end approach.
 */
function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }
  return nums1;
}
`,
		tests: [
			{
				input: [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
				expected: [1, 2, 2, 3, 5, 6],
			},
			{ input: [[1], 1, [], 0], expected: [1] },
			{ input: [[0], 0, [1], 1], expected: [1] },
		],
	},

	// 27. Remove Element
	{
		id: "remove-element-27",
		title: "27. Remove Element",
		difficulty: "Easy",
		functionName: "removeElement",
		description:
			"Given an integer array nums and an integer val, remove all occurrences of val in-place. The order of the remaining elements may change. Return the number of elements in nums which are not equal to val (k).\n\n" +
			"Interview harness note: return k only (we do not assert the in-place arrangement here).\n\n" +
			"Examples:\n" +
			"- Input: nums = [3,2,2,3], val = 3 → Output: 2\n" +
			"- Input: nums = [0,1,2,2,3,0,4,2], val = 2 → Output: 5",
		starterCode: `/**
 * Classic two-pointer overwrite approach.
 */
function removeElement(nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}
`,
		tests: [
			{ input: [[3, 2, 2, 3], 3], expected: 2 },
			{ input: [[0, 1, 2, 2, 3, 0, 4, 2], 2], expected: 5 },
		],
	},

	// 26. Remove Duplicates from Sorted Array
	{
		id: "remove-duplicates-26",
		title: "26. Remove Duplicates from Sorted Array",
		difficulty: "Easy",
		functionName: "removeDuplicates",
		description:
			"Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place so that each unique element appears only once. Keep the relative order. Return the number of unique elements (k).\n\n" +
			"Interview harness note: return k only (we do not check the in-place content here).\n\n" +
			"Examples:\n" +
			"- Input: nums = [1,1,2] → Output: 2\n" +
			"- Input: nums = [0,0,1,1,1,2,2,3,3,4] → Output: 5",
		starterCode: `/**
 * Classic slow/fast pointer technique.
 */
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
}
`,
		tests: [
			{ input: [[1, 1, 2]], expected: 2 },
			{ input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5 },
		],
	},

	// 169. Majority Element
	{
		id: "majority-element-169",
		title: "169. Majority Element",
		difficulty: "Easy",
		functionName: "majorityElement",
		description:
			"Given an array nums of size n, return the majority element — the one that appears more than floor(n/2) times. You may assume it always exists.\n\n" +
			"Examples:\n" +
			"- Input: nums = [3,2,3] → Output: 3\n" +
			"- Input: nums = [2,2,1,1,1,2,2] → Output: 2",
		starterCode: `/**
 * Boyer–Moore Majority Vote Algorithm.
 */
function majorityElement(nums) {
  let count = 0;
  let candidate = null;
  for (const num of nums) {
    if (count === 0) candidate = num;
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}
`,
		tests: [
			{ input: [[3, 2, 3]], expected: 3 },
			{ input: [[2, 2, 1, 1, 1, 2, 2]], expected: 2 },
		],
	},

	// 121. Best Time to Buy and Sell Stock
	{
		id: "best-time-to-buy-and-sell-stock-121",
		title: "121. Best Time to Buy and Sell Stock",
		difficulty: "Easy",
		functionName: "maxProfit",
		description:
			"You are given an array prices where prices[i] is the price on day i. Choose one day to buy and a later day to sell to maximize profit. Return the maximum profit; if no profit is possible, return 0.\n\n" +
			"Examples:\n" +
			"- Input: prices = [7,1,5,3,6,4] → Output: 5\n" +
			"- Input: prices = [7,6,4,3,1] → Output: 0",
		starterCode: `/**
 * Single pass: track min price and max profit.
 */
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const p of prices) {
    if (p < minPrice) minPrice = p;
    else if (p - minPrice > maxProfit) maxProfit = p - minPrice;
  }
  return maxProfit;
}
`,
		tests: [
			{ input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
			{ input: [[7, 6, 4, 3, 1]], expected: 0 },
		],
	},
];
