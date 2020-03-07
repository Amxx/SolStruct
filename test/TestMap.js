var TestMap = artifacts.require('TestMap')

const { BN, expectEvent, expectRevert } = require('openzeppelin-test-helpers');

contract('TestMap', async (accounts) => {

	let TestMapInstance = null;

	before("configure", async () => {
		console.log("# web3 version:", web3.version);
		TestMapInstance = await TestMap.deployed();
	});

	it("initial", async () => {
		assert.equal(await TestMapInstance.length(), 0);
		await expectRevert.assertion(TestMapInstance.at(0));
		await expectRevert.assertion(TestMapInstance.at(1));
		await expectRevert.assertion(TestMapInstance.at(2));
		await expectRevert.assertion(TestMapInstance.at(3));
		assert.equal(await TestMapInstance.indexOf(10), 0);
		assert.equal(await TestMapInstance.indexOf(11), 0);
		assert.equal(await TestMapInstance.indexOf(12), 0);
		assert.equal(await TestMapInstance.contains(10), false);
		assert.equal(await TestMapInstance.contains(11), false);
		assert.equal(await TestMapInstance.contains(12), false);
		assert.deepEqual(await TestMapInstance.keys(), []);
	});

	it("add", async () => {
		assert.equal(await TestMapInstance.length(), 0);
		await expectRevert.assertion(TestMapInstance.at(0));
		await expectRevert.assertion(TestMapInstance.at(1));
		await expectRevert.assertion(TestMapInstance.at(2));
		await expectRevert.assertion(TestMapInstance.at(3));
		assert.equal(await TestMapInstance.indexOf(10), 0);
		assert.equal(await TestMapInstance.indexOf(11), 0);
		assert.equal(await TestMapInstance.indexOf(12), 0);
		assert.equal(await TestMapInstance.contains(10), false);
		assert.equal(await TestMapInstance.contains(11), false);
		assert.equal(await TestMapInstance.contains(12), false);
		assert.deepEqual(await TestMapInstance.keys(), []);

		await TestMapInstance.set(10, "10");

		assert.equal(await TestMapInstance.length(), 1);
		await expectRevert.assertion(TestMapInstance.at(0));
		assert.equal(await TestMapInstance.keyAt(1),  10);
		assert.equal((await TestMapInstance.at(1))[1], "10");
		await expectRevert.assertion(TestMapInstance.at(2));
		await expectRevert.assertion(TestMapInstance.at(3));
		assert.equal(await TestMapInstance.indexOf(10), 1);
		assert.equal(await TestMapInstance.indexOf(11), 0);
		assert.equal(await TestMapInstance.indexOf(12), 0);
		assert.equal(await TestMapInstance.contains(10), true);
		assert.equal(await TestMapInstance.contains(11), false);
		assert.equal(await TestMapInstance.contains(12), false);
		assert.deepEqual((await TestMapInstance.keys()).map(bn => Number(bn)), [10]);

		await TestMapInstance.set(11, "11");

		assert.equal(await TestMapInstance.length(), 2);
		await expectRevert.assertion(TestMapInstance.at(0));
		assert.equal(await TestMapInstance.keyAt(1), 10);
		assert.equal(await TestMapInstance.keyAt(2), 11);
		assert.equal((await TestMapInstance.at(1))[1], "10");
		assert.equal((await TestMapInstance.at(2))[1], "11");
		await expectRevert.assertion(TestMapInstance.at(3));
		assert.equal(await TestMapInstance.indexOf(10), 1);
		assert.equal(await TestMapInstance.indexOf(11), 2);
		assert.equal(await TestMapInstance.indexOf(12), 0);
		assert.equal(await TestMapInstance.contains(10), true);
		assert.equal(await TestMapInstance.contains(11), true);
		assert.equal(await TestMapInstance.contains(12), false);
		assert.deepEqual((await TestMapInstance.keys()).map(bn => Number(bn)), [10, 11]);

		await TestMapInstance.set(12, "12");

		assert.equal(await TestMapInstance.length(), 3);
		await expectRevert.assertion(TestMapInstance.at(0));
		assert.equal(await TestMapInstance.keyAt(1), 10);
		assert.equal(await TestMapInstance.keyAt(2), 11);
		assert.equal(await TestMapInstance.keyAt(3), 12);
		assert.equal((await TestMapInstance.at(1))[1], "10");
		assert.equal((await TestMapInstance.at(2))[1], "11");
		assert.equal((await TestMapInstance.at(3))[1], "12");
		assert.equal(await TestMapInstance.indexOf(10), 1);
		assert.equal(await TestMapInstance.indexOf(11), 2);
		assert.equal(await TestMapInstance.indexOf(12), 3);
		assert.equal(await TestMapInstance.contains(10), true);
		assert.equal(await TestMapInstance.contains(11), true);
		assert.equal(await TestMapInstance.contains(12), true);
		assert.deepEqual((await TestMapInstance.keys()).map(bn => Number(bn)), [10, 11, 12]);
	});

	it("remove", async () => {
		assert.equal(await TestMapInstance.length(), 3);
		await expectRevert.assertion(TestMapInstance.at(0));
		assert.equal(await TestMapInstance.keyAt(1), 10);
		assert.equal(await TestMapInstance.keyAt(2), 11);
		assert.equal(await TestMapInstance.keyAt(3), 12);
		assert.equal((await TestMapInstance.at(1))[1], "10");
		assert.equal((await TestMapInstance.at(2))[1], "11");
		assert.equal((await TestMapInstance.at(3))[1], "12");
		assert.equal(await TestMapInstance.indexOf(10), 1);
		assert.equal(await TestMapInstance.indexOf(11), 2);
		assert.equal(await TestMapInstance.indexOf(12), 3);
		assert.equal(await TestMapInstance.contains(10), true);
		assert.equal(await TestMapInstance.contains(11), true);
		assert.equal(await TestMapInstance.contains(12), true);
		assert.deepEqual((await TestMapInstance.keys()).map(bn => Number(bn)), [10, 11, 12]);

		await TestMapInstance.del(10);

		assert.equal(await TestMapInstance.length(), 2);
		await expectRevert.assertion(TestMapInstance.at(0));
		assert.equal(await TestMapInstance.keyAt(1), 12);
		assert.equal(await TestMapInstance.keyAt(2), 11);
		assert.equal((await TestMapInstance.at(1))[1], "12");
		assert.equal((await TestMapInstance.at(2))[1], "11");
		await expectRevert.assertion(TestMapInstance.at(3));
		assert.equal(await TestMapInstance.indexOf(10), 0);
		assert.equal(await TestMapInstance.indexOf(11), 2);
		assert.equal(await TestMapInstance.indexOf(12), 1);
		assert.equal(await TestMapInstance.contains(10), false);
		assert.equal(await TestMapInstance.contains(11), true);
		assert.equal(await TestMapInstance.contains(12), true);
		assert.deepEqual((await TestMapInstance.keys()).map(bn => Number(bn)), [12, 11]);

		await TestMapInstance.del(11);

		assert.equal(await TestMapInstance.length(), 1);
		await expectRevert.assertion(TestMapInstance.at(0));
		assert.equal(await TestMapInstance.keyAt(1), 12);
		assert.equal((await TestMapInstance.at(1))[1], "12");
		await expectRevert.assertion(TestMapInstance.at(2));
		await expectRevert.assertion(TestMapInstance.at(3));
		assert.equal(await TestMapInstance.indexOf(10), 0);
		assert.equal(await TestMapInstance.indexOf(11), 0);
		assert.equal(await TestMapInstance.indexOf(12), 1);
		assert.equal(await TestMapInstance.contains(10), false);
		assert.equal(await TestMapInstance.contains(11), false);
		assert.equal(await TestMapInstance.contains(12), true);
		assert.deepEqual((await TestMapInstance.keys()).map(bn => Number(bn)), [12]);
	});

	it("remove", async () => {
		assert.equal(await TestMapInstance.length(), 1);
		await expectRevert.assertion(TestMapInstance.at(0));
		assert.equal(await TestMapInstance.keyAt(1), 12);
		assert.equal((await TestMapInstance.at(1))[1], "12");
		await expectRevert.assertion(TestMapInstance.at(2));
		await expectRevert.assertion(TestMapInstance.at(3));
		assert.equal(await TestMapInstance.indexOf(10), 0);
		assert.equal(await TestMapInstance.indexOf(11), 0);
		assert.equal(await TestMapInstance.indexOf(12), 1);
		assert.equal(await TestMapInstance.contains(10), false);
		assert.equal(await TestMapInstance.contains(11), false);
		assert.equal(await TestMapInstance.contains(12), true);
		assert.deepEqual((await TestMapInstance.keys()).map(bn => Number(bn)), [12]);

		await TestMapInstance.set(10, "10");
		await TestMapInstance.set(11, "11");
		await TestMapInstance.set(12, "12");
		await TestMapInstance.set(13, "13");
		await TestMapInstance.set(14, "14");

		assert.equal(await TestMapInstance.length(), 5);
		await expectRevert.assertion(TestMapInstance.at(0));
		assert.equal(await TestMapInstance.keyAt(1), 12);
		assert.equal(await TestMapInstance.keyAt(2), 10);
		assert.equal(await TestMapInstance.keyAt(3), 11);
		assert.equal(await TestMapInstance.keyAt(4), 13);
		assert.equal(await TestMapInstance.keyAt(5), 14);
		assert.equal((await TestMapInstance.at(1))[1], "12");
		assert.equal((await TestMapInstance.at(2))[1], "10");
		assert.equal((await TestMapInstance.at(3))[1], "11");
		assert.equal((await TestMapInstance.at(4))[1], "13");
		assert.equal((await TestMapInstance.at(5))[1], "14");
		assert.equal(await TestMapInstance.indexOf(10), 2);
		assert.equal(await TestMapInstance.indexOf(11), 3);
		assert.equal(await TestMapInstance.indexOf(12), 1);
		assert.equal(await TestMapInstance.indexOf(13), 4);
		assert.equal(await TestMapInstance.indexOf(14), 5);
		assert.equal(await TestMapInstance.contains(10), true);
		assert.equal(await TestMapInstance.contains(11), true);
		assert.equal(await TestMapInstance.contains(12), true);
		assert.equal(await TestMapInstance.contains(13), true);
		assert.equal(await TestMapInstance.contains(14), true);
		assert.deepEqual((await TestMapInstance.keys()).map(bn => Number(bn)), [12, 10, 11, 13, 14]);

		await TestMapInstance.clear();

		assert.equal(await TestMapInstance.length(), 0);
		await expectRevert.assertion(TestMapInstance.at(0));
		await expectRevert.assertion(TestMapInstance.at(1));
		await expectRevert.assertion(TestMapInstance.at(2));
		await expectRevert.assertion(TestMapInstance.at(3));
		await expectRevert.assertion(TestMapInstance.at(4));
		await expectRevert.assertion(TestMapInstance.at(5));
		assert.equal(await TestMapInstance.indexOf(10), 0);
		assert.equal(await TestMapInstance.indexOf(11), 0);
		assert.equal(await TestMapInstance.indexOf(12), 0);
		assert.equal(await TestMapInstance.indexOf(13), 0);
		assert.equal(await TestMapInstance.indexOf(14), 0);
		assert.equal(await TestMapInstance.contains(10), false);
		assert.equal(await TestMapInstance.contains(11), false);
		assert.equal(await TestMapInstance.contains(12), false);
		assert.equal(await TestMapInstance.contains(13), false);
		assert.equal(await TestMapInstance.contains(14), false);
		assert.deepEqual((await TestMapInstance.keys()).map(bn => Number(bn)), []);
	});
});
