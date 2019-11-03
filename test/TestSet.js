var TestSet = artifacts.require('TestSet')

const { BN, expectEvent, expectRevert } = require('openzeppelin-test-helpers');

contract('TestSet', async (accounts) => {

	let TestSetInstance = null;

	before("configure", async () => {
		console.log("# web3 version:", web3.version);
		TestSetInstance = await TestSet.deployed();
	});

	it("initial", async () => {
		assert.equal(await TestSetInstance.length(), 0);
		await expectRevert.assertion(TestSetInstance.at(0));
		await expectRevert.assertion(TestSetInstance.at(1));
		await expectRevert.assertion(TestSetInstance.at(2));
		await expectRevert.assertion(TestSetInstance.at(3));
		assert.equal(await TestSetInstance.indexOf(10), 0);
		assert.equal(await TestSetInstance.indexOf(11), 0);
		assert.equal(await TestSetInstance.indexOf(12), 0);
		assert.equal(await TestSetInstance.contains(10), false);
		assert.equal(await TestSetInstance.contains(11), false);
		assert.equal(await TestSetInstance.contains(12), false);
		assert.deepEqual(await TestSetInstance.content(), []);
	});

	it("add", async () => {
		assert.equal(await TestSetInstance.length(), 0);
		await expectRevert.assertion(TestSetInstance.at(0));
		await expectRevert.assertion(TestSetInstance.at(1));
		await expectRevert.assertion(TestSetInstance.at(2));
		await expectRevert.assertion(TestSetInstance.at(3));
		assert.equal(await TestSetInstance.indexOf(10), 0);
		assert.equal(await TestSetInstance.indexOf(11), 0);
		assert.equal(await TestSetInstance.indexOf(12), 0);
		assert.equal(await TestSetInstance.contains(10), false);
		assert.equal(await TestSetInstance.contains(11), false);
		assert.equal(await TestSetInstance.contains(12), false);
		assert.deepEqual(await TestSetInstance.content(), []);

		await TestSetInstance.add(10);

		assert.equal(await TestSetInstance.length(), 1);
		await expectRevert.assertion(TestSetInstance.at(0));
		assert.equal(await TestSetInstance.at(1), 10);
		await expectRevert.assertion(TestSetInstance.at(2));
		await expectRevert.assertion(TestSetInstance.at(3));
		assert.equal(await TestSetInstance.indexOf(10), 1);
		assert.equal(await TestSetInstance.indexOf(11), 0);
		assert.equal(await TestSetInstance.indexOf(12), 0);
		assert.equal(await TestSetInstance.contains(10), true);
		assert.equal(await TestSetInstance.contains(11), false);
		assert.equal(await TestSetInstance.contains(12), false);
		assert.deepEqual((await TestSetInstance.content()).map(bn => Number(bn)), [10]);

		await TestSetInstance.add(11);

		assert.equal(await TestSetInstance.length(), 2);
		await expectRevert.assertion(TestSetInstance.at(0));
		assert.equal(await TestSetInstance.at(1), 10);
		assert.equal(await TestSetInstance.at(2), 11);
		await expectRevert.assertion(TestSetInstance.at(3));
		assert.equal(await TestSetInstance.indexOf(10), 1);
		assert.equal(await TestSetInstance.indexOf(11), 2);
		assert.equal(await TestSetInstance.indexOf(12), 0);
		assert.equal(await TestSetInstance.contains(10), true);
		assert.equal(await TestSetInstance.contains(11), true);
		assert.equal(await TestSetInstance.contains(12), false);
		assert.deepEqual((await TestSetInstance.content()).map(bn => Number(bn)), [10, 11]);

		await TestSetInstance.add(12);

		assert.equal(await TestSetInstance.length(), 3);
		await expectRevert.assertion(TestSetInstance.at(0));
		assert.equal(await TestSetInstance.at(1), 10);
		assert.equal(await TestSetInstance.at(2), 11);
		assert.equal(await TestSetInstance.at(3), 12);
		assert.equal(await TestSetInstance.indexOf(10), 1);
		assert.equal(await TestSetInstance.indexOf(11), 2);
		assert.equal(await TestSetInstance.indexOf(12), 3);
		assert.equal(await TestSetInstance.contains(10), true);
		assert.equal(await TestSetInstance.contains(11), true);
		assert.equal(await TestSetInstance.contains(12), true);
		assert.deepEqual((await TestSetInstance.content()).map(bn => Number(bn)), [10, 11, 12]);
	});

	it("remove", async () => {
		assert.equal(await TestSetInstance.length(), 3);
		await expectRevert.assertion(TestSetInstance.at(0));
		assert.equal(await TestSetInstance.at(1), 10);
		assert.equal(await TestSetInstance.at(2), 11);
		assert.equal(await TestSetInstance.at(3), 12);
		assert.equal(await TestSetInstance.indexOf(10), 1);
		assert.equal(await TestSetInstance.indexOf(11), 2);
		assert.equal(await TestSetInstance.indexOf(12), 3);
		assert.equal(await TestSetInstance.contains(10), true);
		assert.equal(await TestSetInstance.contains(11), true);
		assert.equal(await TestSetInstance.contains(12), true);
		assert.deepEqual((await TestSetInstance.content()).map(bn => Number(bn)), [10, 11, 12]);

		await TestSetInstance.remove(10);

		assert.equal(await TestSetInstance.length(), 2);
		await expectRevert.assertion(TestSetInstance.at(0));
		assert.equal(await TestSetInstance.at(1), 12);
		assert.equal(await TestSetInstance.at(2), 11);
		await expectRevert.assertion(TestSetInstance.at(3));
		assert.equal(await TestSetInstance.indexOf(10), 0);
		assert.equal(await TestSetInstance.indexOf(11), 2);
		assert.equal(await TestSetInstance.indexOf(12), 1);
		assert.equal(await TestSetInstance.contains(10), false);
		assert.equal(await TestSetInstance.contains(11), true);
		assert.equal(await TestSetInstance.contains(12), true);
		assert.deepEqual((await TestSetInstance.content()).map(bn => Number(bn)), [12, 11]);

		await TestSetInstance.remove(11);

		assert.equal(await TestSetInstance.length(), 1);
		await expectRevert.assertion(TestSetInstance.at(0));
		assert.equal(await TestSetInstance.at(1), 12);
		await expectRevert.assertion(TestSetInstance.at(2));
		await expectRevert.assertion(TestSetInstance.at(3));
		assert.equal(await TestSetInstance.indexOf(10), 0);
		assert.equal(await TestSetInstance.indexOf(11), 0);
		assert.equal(await TestSetInstance.indexOf(12), 1);
		assert.equal(await TestSetInstance.contains(10), false);
		assert.equal(await TestSetInstance.contains(11), false);
		assert.equal(await TestSetInstance.contains(12), true);
		assert.deepEqual((await TestSetInstance.content()).map(bn => Number(bn)), [12]);
	});

	it("remove", async () => {
		assert.equal(await TestSetInstance.length(), 1);
		await expectRevert.assertion(TestSetInstance.at(0));
		assert.equal(await TestSetInstance.at(1), 12);
		await expectRevert.assertion(TestSetInstance.at(2));
		await expectRevert.assertion(TestSetInstance.at(3));
		assert.equal(await TestSetInstance.indexOf(10), 0);
		assert.equal(await TestSetInstance.indexOf(11), 0);
		assert.equal(await TestSetInstance.indexOf(12), 1);
		assert.equal(await TestSetInstance.contains(10), false);
		assert.equal(await TestSetInstance.contains(11), false);
		assert.equal(await TestSetInstance.contains(12), true);
		assert.deepEqual((await TestSetInstance.content()).map(bn => Number(bn)), [12]);

		await TestSetInstance.add(10);
		await TestSetInstance.add(11);
		await TestSetInstance.add(12);
		await TestSetInstance.add(13);
		await TestSetInstance.add(14);

		assert.equal(await TestSetInstance.length(), 5);
		await expectRevert.assertion(TestSetInstance.at(0));
		assert.equal(await TestSetInstance.at(1), 12);
		assert.equal(await TestSetInstance.at(2), 10);
		assert.equal(await TestSetInstance.at(3), 11);
		assert.equal(await TestSetInstance.at(4), 13);
		assert.equal(await TestSetInstance.at(5), 14);
		assert.equal(await TestSetInstance.indexOf(10), 2);
		assert.equal(await TestSetInstance.indexOf(11), 3);
		assert.equal(await TestSetInstance.indexOf(12), 1);
		assert.equal(await TestSetInstance.indexOf(13), 4);
		assert.equal(await TestSetInstance.indexOf(14), 5);
		assert.equal(await TestSetInstance.contains(10), true);
		assert.equal(await TestSetInstance.contains(11), true);
		assert.equal(await TestSetInstance.contains(12), true);
		assert.equal(await TestSetInstance.contains(13), true);
		assert.equal(await TestSetInstance.contains(14), true);
		assert.deepEqual((await TestSetInstance.content()).map(bn => Number(bn)), [12, 10, 11, 13, 14]);

		await TestSetInstance.clear();

		assert.equal(await TestSetInstance.length(), 0);
		await expectRevert.assertion(TestSetInstance.at(0));
		await expectRevert.assertion(TestSetInstance.at(1));
		await expectRevert.assertion(TestSetInstance.at(2));
		await expectRevert.assertion(TestSetInstance.at(3));
		await expectRevert.assertion(TestSetInstance.at(4));
		await expectRevert.assertion(TestSetInstance.at(5));
		assert.equal(await TestSetInstance.indexOf(10), 0);
		assert.equal(await TestSetInstance.indexOf(11), 0);
		assert.equal(await TestSetInstance.indexOf(12), 0);
		assert.equal(await TestSetInstance.indexOf(13), 0);
		assert.equal(await TestSetInstance.indexOf(14), 0);
		assert.equal(await TestSetInstance.contains(10), false);
		assert.equal(await TestSetInstance.contains(11), false);
		assert.equal(await TestSetInstance.contains(12), false);
		assert.equal(await TestSetInstance.contains(13), false);
		assert.equal(await TestSetInstance.contains(14), false);
		assert.deepEqual((await TestSetInstance.content()).map(bn => Number(bn)), []);
	});
});
