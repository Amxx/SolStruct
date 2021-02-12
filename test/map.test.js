const { BN, expectEvent, expectRevert } = require('openzeppelin-test-helpers');

var MapMock = artifacts.require('MapMock')

contract('MapMock', async (accounts) => {

	before("configure", async () => {
		console.log("# web3 version:", web3.version);
		this.instance = await MapMock.new();
	});

	it("initial", async () => {
		assert.equal(await this.instance.length(), 0);
		await expectRevert.unspecified(this.instance.at(0));
		await expectRevert.unspecified(this.instance.at(1));
		await expectRevert.unspecified(this.instance.at(2));
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 0);
		assert.equal(await this.instance.indexOf(11), 0);
		assert.equal(await this.instance.indexOf(12), 0);
		assert.equal(await this.instance.contains(10), false);
		assert.equal(await this.instance.contains(11), false);
		assert.equal(await this.instance.contains(12), false);
		assert.deepEqual(await this.instance.keys(), []);
	});

	it("add", async () => {
		assert.equal(await this.instance.length(), 0);
		await expectRevert.unspecified(this.instance.at(0));
		await expectRevert.unspecified(this.instance.at(1));
		await expectRevert.unspecified(this.instance.at(2));
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 0);
		assert.equal(await this.instance.indexOf(11), 0);
		assert.equal(await this.instance.indexOf(12), 0);
		assert.equal(await this.instance.contains(10), false);
		assert.equal(await this.instance.contains(11), false);
		assert.equal(await this.instance.contains(12), false);
		assert.deepEqual(await this.instance.keys(), []);

		await this.instance.set(10, "10");

		assert.equal(await this.instance.length(), 1);
		assert.equal(await this.instance.get(10), "10");
		await expectRevert(this.instance.get(11), "LibMap_uint256_string: key not found");
		await expectRevert(this.instance.get(12), "LibMap_uint256_string: key not found");
		assert.deepEqual(await this.instance.tryGet(10), { 0: true,  1: "10" });
		assert.deepEqual(await this.instance.tryGet(11), { 0: false, 1: "" });
		assert.deepEqual(await this.instance.tryGet(12), { 0: false, 1: "" });
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.keyAt(1),  10);
		assert.equal((await this.instance.at(1))[1], "10");
		await expectRevert.unspecified(this.instance.at(2));
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 1);
		assert.equal(await this.instance.indexOf(11), 0);
		assert.equal(await this.instance.indexOf(12), 0);
		assert.equal(await this.instance.contains(10), true);
		assert.equal(await this.instance.contains(11), false);
		assert.equal(await this.instance.contains(12), false);
		assert.deepEqual((await this.instance.keys()).map(bn => Number(bn)), [10]);

		await this.instance.set(11, "11");

		assert.equal(await this.instance.length(), 2);
		assert.equal(await this.instance.get(10), "10");
		assert.equal(await this.instance.get(11), "11");
		await expectRevert(this.instance.get(12), "LibMap_uint256_string: key not found");
		assert.deepEqual(await this.instance.tryGet(10), { 0: true,  1: "10" });
		assert.deepEqual(await this.instance.tryGet(11), { 0: true,  1: "11" });
		assert.deepEqual(await this.instance.tryGet(12), { 0: false, 1: "" });
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.keyAt(1), 10);
		assert.equal(await this.instance.keyAt(2), 11);
		assert.equal((await this.instance.at(1))[1], "10");
		assert.equal((await this.instance.at(2))[1], "11");
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 1);
		assert.equal(await this.instance.indexOf(11), 2);
		assert.equal(await this.instance.indexOf(12), 0);
		assert.equal(await this.instance.contains(10), true);
		assert.equal(await this.instance.contains(11), true);
		assert.equal(await this.instance.contains(12), false);
		assert.deepEqual((await this.instance.keys()).map(bn => Number(bn)), [10, 11]);

		await this.instance.set(12, "12");

		assert.equal(await this.instance.length(), 3);
		assert.equal(await this.instance.get(10), "10");
		assert.equal(await this.instance.get(11), "11");
		assert.equal(await this.instance.get(12), "12");
		assert.deepEqual(await this.instance.tryGet(10), { 0: true, 1: "10" });
		assert.deepEqual(await this.instance.tryGet(11), { 0: true, 1: "11" });
		assert.deepEqual(await this.instance.tryGet(12), { 0: true, 1: "12" });
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.keyAt(1), 10);
		assert.equal(await this.instance.keyAt(2), 11);
		assert.equal(await this.instance.keyAt(3), 12);
		assert.equal((await this.instance.at(1))[1], "10");
		assert.equal((await this.instance.at(2))[1], "11");
		assert.equal((await this.instance.at(3))[1], "12");
		assert.equal(await this.instance.indexOf(10), 1);
		assert.equal(await this.instance.indexOf(11), 2);
		assert.equal(await this.instance.indexOf(12), 3);
		assert.equal(await this.instance.contains(10), true);
		assert.equal(await this.instance.contains(11), true);
		assert.equal(await this.instance.contains(12), true);
		assert.deepEqual((await this.instance.keys()).map(bn => Number(bn)), [10, 11, 12]);
	});

	it("remove", async () => {
		assert.equal(await this.instance.length(), 3);
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.keyAt(1), 10);
		assert.equal(await this.instance.keyAt(2), 11);
		assert.equal(await this.instance.keyAt(3), 12);
		assert.equal((await this.instance.at(1))[1], "10");
		assert.equal((await this.instance.at(2))[1], "11");
		assert.equal((await this.instance.at(3))[1], "12");
		assert.equal(await this.instance.indexOf(10), 1);
		assert.equal(await this.instance.indexOf(11), 2);
		assert.equal(await this.instance.indexOf(12), 3);
		assert.equal(await this.instance.contains(10), true);
		assert.equal(await this.instance.contains(11), true);
		assert.equal(await this.instance.contains(12), true);
		assert.deepEqual((await this.instance.keys()).map(bn => Number(bn)), [10, 11, 12]);

		await this.instance.del(10);

		assert.equal(await this.instance.length(), 2);
		await expectRevert(this.instance.get(10), "LibMap_uint256_string: key not found");
		assert.equal(await this.instance.get(11), "11");
		assert.equal(await this.instance.get(12), "12");
		assert.deepEqual(await this.instance.tryGet(10), { 0: false, 1: "" });
		assert.deepEqual(await this.instance.tryGet(11), { 0: true,  1: "11" });
		assert.deepEqual(await this.instance.tryGet(12), { 0: true,  1: "12" });
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.keyAt(1), 12);
		assert.equal(await this.instance.keyAt(2), 11);
		assert.equal((await this.instance.at(1))[1], "12");
		assert.equal((await this.instance.at(2))[1], "11");
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 0);
		assert.equal(await this.instance.indexOf(11), 2);
		assert.equal(await this.instance.indexOf(12), 1);
		assert.equal(await this.instance.contains(10), false);
		assert.equal(await this.instance.contains(11), true);
		assert.equal(await this.instance.contains(12), true);
		assert.deepEqual((await this.instance.keys()).map(bn => Number(bn)), [12, 11]);

		await this.instance.del(11);

		assert.equal(await this.instance.length(), 1);
		await expectRevert(this.instance.get(10), "LibMap_uint256_string: key not found");
		await expectRevert(this.instance.get(11), "LibMap_uint256_string: key not found");
		assert.equal(await this.instance.get(12), "12");
		assert.deepEqual(await this.instance.tryGet(10), { 0: false, 1: "" });
		assert.deepEqual(await this.instance.tryGet(11), { 0: false, 1: "" });
		assert.deepEqual(await this.instance.tryGet(12), { 0: true,  1: "12" });
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.keyAt(1), 12);
		assert.equal((await this.instance.at(1))[1], "12");
		await expectRevert.unspecified(this.instance.at(2));
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 0);
		assert.equal(await this.instance.indexOf(11), 0);
		assert.equal(await this.instance.indexOf(12), 1);
		assert.equal(await this.instance.contains(10), false);
		assert.equal(await this.instance.contains(11), false);
		assert.equal(await this.instance.contains(12), true);
		assert.deepEqual((await this.instance.keys()).map(bn => Number(bn)), [12]);
	});

	it("clear", async () => {
		assert.equal(await this.instance.length(), 1);
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.keyAt(1), 12);
		assert.equal((await this.instance.at(1))[1], "12");
		await expectRevert.unspecified(this.instance.at(2));
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 0);
		assert.equal(await this.instance.indexOf(11), 0);
		assert.equal(await this.instance.indexOf(12), 1);
		assert.equal(await this.instance.contains(10), false);
		assert.equal(await this.instance.contains(11), false);
		assert.equal(await this.instance.contains(12), true);
		assert.deepEqual((await this.instance.keys()).map(bn => Number(bn)), [12]);

		await this.instance.set(10, "10");
		await this.instance.set(11, "11");
		await this.instance.set(12, "12");
		await this.instance.set(13, "13");
		await this.instance.set(14, "14");

		assert.equal(await this.instance.length(), 5);
		assert.equal(await this.instance.get(10), "10");
		assert.equal(await this.instance.get(11), "11");
		assert.equal(await this.instance.get(12), "12");
		assert.equal(await this.instance.get(13), "13");
		assert.equal(await this.instance.get(14), "14");
		assert.deepEqual(await this.instance.tryGet(10), { 0: true,  1: "10" });
		assert.deepEqual(await this.instance.tryGet(11), { 0: true,  1: "11" });
		assert.deepEqual(await this.instance.tryGet(12), { 0: true,  1: "12" });
		assert.deepEqual(await this.instance.tryGet(13), { 0: true,  1: "13" });
		assert.deepEqual(await this.instance.tryGet(14), { 0: true,  1: "14" });
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.keyAt(1), 12);
		assert.equal(await this.instance.keyAt(2), 10);
		assert.equal(await this.instance.keyAt(3), 11);
		assert.equal(await this.instance.keyAt(4), 13);
		assert.equal(await this.instance.keyAt(5), 14);
		assert.equal((await this.instance.at(1))[1], "12");
		assert.equal((await this.instance.at(2))[1], "10");
		assert.equal((await this.instance.at(3))[1], "11");
		assert.equal((await this.instance.at(4))[1], "13");
		assert.equal((await this.instance.at(5))[1], "14");
		assert.equal(await this.instance.indexOf(10), 2);
		assert.equal(await this.instance.indexOf(11), 3);
		assert.equal(await this.instance.indexOf(12), 1);
		assert.equal(await this.instance.indexOf(13), 4);
		assert.equal(await this.instance.indexOf(14), 5);
		assert.equal(await this.instance.contains(10), true);
		assert.equal(await this.instance.contains(11), true);
		assert.equal(await this.instance.contains(12), true);
		assert.equal(await this.instance.contains(13), true);
		assert.equal(await this.instance.contains(14), true);
		assert.deepEqual((await this.instance.keys()).map(bn => Number(bn)), [12, 10, 11, 13, 14]);

		await this.instance.clear();

		assert.equal(await this.instance.length(), 0);
		await expectRevert(this.instance.get(10), "LibMap_uint256_string: key not found");
		await expectRevert(this.instance.get(11), "LibMap_uint256_string: key not found");
		await expectRevert(this.instance.get(12), "LibMap_uint256_string: key not found");
		await expectRevert(this.instance.get(13), "LibMap_uint256_string: key not found");
		await expectRevert(this.instance.get(14), "LibMap_uint256_string: key not found");
		assert.deepEqual(await this.instance.tryGet(10), { 0: false,  1: "" });
		assert.deepEqual(await this.instance.tryGet(11), { 0: false,  1: "" });
		assert.deepEqual(await this.instance.tryGet(12), { 0: false,  1: "" });
		assert.deepEqual(await this.instance.tryGet(13), { 0: false,  1: "" });
		assert.deepEqual(await this.instance.tryGet(14), { 0: false,  1: "" });
		await expectRevert.unspecified(this.instance.at(0));
		await expectRevert.unspecified(this.instance.at(1));
		await expectRevert.unspecified(this.instance.at(2));
		await expectRevert.unspecified(this.instance.at(3));
		await expectRevert.unspecified(this.instance.at(4));
		await expectRevert.unspecified(this.instance.at(5));
		assert.equal(await this.instance.indexOf(10), 0);
		assert.equal(await this.instance.indexOf(11), 0);
		assert.equal(await this.instance.indexOf(12), 0);
		assert.equal(await this.instance.indexOf(13), 0);
		assert.equal(await this.instance.indexOf(14), 0);
		assert.equal(await this.instance.contains(10), false);
		assert.equal(await this.instance.contains(11), false);
		assert.equal(await this.instance.contains(12), false);
		assert.equal(await this.instance.contains(13), false);
		assert.equal(await this.instance.contains(14), false);
		assert.deepEqual((await this.instance.keys()).map(bn => Number(bn)), []);
	});
});
