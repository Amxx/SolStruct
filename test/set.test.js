const { BN, expectEvent, expectRevert } = require('openzeppelin-test-helpers');

var SetMock = artifacts.require('SetMock')

contract('SetMock', async (accounts) => {

	before("configure", async () => {
		console.log("# web3 version:", web3.version);
		this.instance = await SetMock.new();
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
		assert.deepEqual(await this.instance.content(), []);
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
		assert.deepEqual(await this.instance.content(), []);

		await this.instance.add(10);

		assert.equal(await this.instance.length(), 1);
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.at(1), 10);
		await expectRevert.unspecified(this.instance.at(2));
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 1);
		assert.equal(await this.instance.indexOf(11), 0);
		assert.equal(await this.instance.indexOf(12), 0);
		assert.equal(await this.instance.contains(10), true);
		assert.equal(await this.instance.contains(11), false);
		assert.equal(await this.instance.contains(12), false);
		assert.deepEqual((await this.instance.content()).map(bn => Number(bn)), [10]);

		await this.instance.add(11);

		assert.equal(await this.instance.length(), 2);
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.at(1), 10);
		assert.equal(await this.instance.at(2), 11);
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 1);
		assert.equal(await this.instance.indexOf(11), 2);
		assert.equal(await this.instance.indexOf(12), 0);
		assert.equal(await this.instance.contains(10), true);
		assert.equal(await this.instance.contains(11), true);
		assert.equal(await this.instance.contains(12), false);
		assert.deepEqual((await this.instance.content()).map(bn => Number(bn)), [10, 11]);

		await this.instance.add(12);

		assert.equal(await this.instance.length(), 3);
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.at(1), 10);
		assert.equal(await this.instance.at(2), 11);
		assert.equal(await this.instance.at(3), 12);
		assert.equal(await this.instance.indexOf(10), 1);
		assert.equal(await this.instance.indexOf(11), 2);
		assert.equal(await this.instance.indexOf(12), 3);
		assert.equal(await this.instance.contains(10), true);
		assert.equal(await this.instance.contains(11), true);
		assert.equal(await this.instance.contains(12), true);
		assert.deepEqual((await this.instance.content()).map(bn => Number(bn)), [10, 11, 12]);
	});

	it("remove", async () => {
		assert.equal(await this.instance.length(), 3);
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.at(1), 10);
		assert.equal(await this.instance.at(2), 11);
		assert.equal(await this.instance.at(3), 12);
		assert.equal(await this.instance.indexOf(10), 1);
		assert.equal(await this.instance.indexOf(11), 2);
		assert.equal(await this.instance.indexOf(12), 3);
		assert.equal(await this.instance.contains(10), true);
		assert.equal(await this.instance.contains(11), true);
		assert.equal(await this.instance.contains(12), true);
		assert.deepEqual((await this.instance.content()).map(bn => Number(bn)), [10, 11, 12]);

		await this.instance.remove(10);

		assert.equal(await this.instance.length(), 2);
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.at(1), 12);
		assert.equal(await this.instance.at(2), 11);
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 0);
		assert.equal(await this.instance.indexOf(11), 2);
		assert.equal(await this.instance.indexOf(12), 1);
		assert.equal(await this.instance.contains(10), false);
		assert.equal(await this.instance.contains(11), true);
		assert.equal(await this.instance.contains(12), true);
		assert.deepEqual((await this.instance.content()).map(bn => Number(bn)), [12, 11]);

		await this.instance.remove(11);

		assert.equal(await this.instance.length(), 1);
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.at(1), 12);
		await expectRevert.unspecified(this.instance.at(2));
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 0);
		assert.equal(await this.instance.indexOf(11), 0);
		assert.equal(await this.instance.indexOf(12), 1);
		assert.equal(await this.instance.contains(10), false);
		assert.equal(await this.instance.contains(11), false);
		assert.equal(await this.instance.contains(12), true);
		assert.deepEqual((await this.instance.content()).map(bn => Number(bn)), [12]);
	});

	it("remove", async () => {
		assert.equal(await this.instance.length(), 1);
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.at(1), 12);
		await expectRevert.unspecified(this.instance.at(2));
		await expectRevert.unspecified(this.instance.at(3));
		assert.equal(await this.instance.indexOf(10), 0);
		assert.equal(await this.instance.indexOf(11), 0);
		assert.equal(await this.instance.indexOf(12), 1);
		assert.equal(await this.instance.contains(10), false);
		assert.equal(await this.instance.contains(11), false);
		assert.equal(await this.instance.contains(12), true);
		assert.deepEqual((await this.instance.content()).map(bn => Number(bn)), [12]);

		await this.instance.add(10);
		await this.instance.add(11);
		await this.instance.add(12);
		await this.instance.add(13);
		await this.instance.add(14);

		assert.equal(await this.instance.length(), 5);
		await expectRevert.unspecified(this.instance.at(0));
		assert.equal(await this.instance.at(1), 12);
		assert.equal(await this.instance.at(2), 10);
		assert.equal(await this.instance.at(3), 11);
		assert.equal(await this.instance.at(4), 13);
		assert.equal(await this.instance.at(5), 14);
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
		assert.deepEqual((await this.instance.content()).map(bn => Number(bn)), [12, 10, 11, 13, 14]);

		await this.instance.clear();

		assert.equal(await this.instance.length(), 0);
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
		assert.deepEqual((await this.instance.content()).map(bn => Number(bn)), []);
	});
});
