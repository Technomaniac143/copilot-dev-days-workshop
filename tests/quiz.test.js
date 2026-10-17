// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  shuffle,
  isCorrect,
  calculatePercentage,
  isNewBestScore,
  getGrade
} = require("../src/quiz.js");

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("isNewBestScore returns true when no best score exists", () => {
  assert.equal(isNewBestScore(0, null), true);
});

test("isNewBestScore returns true when current score is higher", () => {
  assert.equal(isNewBestScore(81, 80), true);
});

test("isNewBestScore returns false when current score ties the best", () => {
  assert.equal(isNewBestScore(80, 80), false);
});

test("isNewBestScore returns false when current score is lower", () => {
  assert.equal(isNewBestScore(79, 80), false);
});

test("isNewBestScore accepts percentage boundaries", () => {
  assert.equal(isNewBestScore(100, 99), true);
  assert.equal(isNewBestScore(0, 0), false);
});

test("isNewBestScore returns false for invalid percentages", () => {
  assert.equal(isNewBestScore(-1, null), false);
  assert.equal(isNewBestScore(101, 100), false);
  assert.equal(isNewBestScore(81, "80"), false);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("getGrade gives an A for exactly 90%", () => {
  assert.equal(getGrade(90), "A");
});
