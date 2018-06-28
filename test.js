'use strict';

const purs = require('.');
const test = require('tape');

test('purs', async t => {
	t.plan(10);

	const fail = t.fail.bind(t, 'Unexpectedly succeeded.');

	(async () => {
		t.ok(
			(await purs.help()).includes('Available commands:'),
			'should show help with `help` method.'
		);
	})();

	(async () => {
		t.equal(
			await purs.version(),
			'0.11.7',
			'should show version with `version` method.'
		);
	})();

	(async () => {
		try {
			await purs.bundle([__dirname]);
			fail();
		} catch ({message}) {
			t.ok(
				message.includes('openBinaryFile: inappropriate type (is a directory)'),
				'should spawn `purs bundle` command with `bundle` method.'
			);
		}
	})();

	(async () => {
		try {
			await purs.compile(['none']);
			fail();
		} catch ({message}) {
			t.ok(
				message.includes('No files found using pattern: none'),
				'should spawn `purs compile` command with `compile` method.'
			);
		}
	})();

	(async () => {
		try {
			await purs.docs();
			fail();
		} catch ({message}) {
			t.ok(
				message.includes('purs docs: no input files.'),
				'should spawn `purs docs` command with `docs` method.'
			);
		}
	})();

	(async () => {
		try {
			await purs.hierarchy(['--output']);
			fail();
		} catch ({message}) {
			t.ok(
				message.includes('The option `--output` expects an argument.'),
				'should spawn `purs hierarchy` command with `hierarchy` method.'
			);
		}
	})();

	(async () => {
		try {
			await purs.ide(['foo'], {maxBuffer: 1});
			fail();
		} catch ({message}) {
			t.ok(
				message.includes('stderr maxBuffer exceeded'),
				'should spawn `purs ide` command with `ide` method.'
			);
		}
	})();

	(async () => {
		t.ok(
			(await purs.publish({reject: false})).stderr.includes('Missing: --manifest FILE --resolutions FILE'),
			'should spawn `purs publish` command with `publish` method.'
		);
	})();

	try {
		await purs.help({}, {});
	} catch ({message}) {
		t.equal(
			message,
			'Expected 0 or 1 argument ([<Object>]), but got 2 arguments.',
			'should fail when `help` or `version` method receives more than 2 arguments.'
		);
	}

	try {
		await purs.compile([], {}, {});
	} catch ({message}) {
		t.equal(
			message,
			'Expected 0 ~ 2 arguments ([<Array<string>>][, <Object>]), but got 3 arguments.',
			'should fail when a method receives more than 3 arguments.'
		);
	}
});
