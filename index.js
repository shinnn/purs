'use strict';

const execa = require('execa');
const purescript = require('purescript');

function purs(subcommand, ...args) {
	const argLen = args.length;

	if (argLen === 0) {
		return execa(purescript, [subcommand]);
	}

	if (argLen === 1) {
		if (Array.isArray(args[0])) {
			return execa(purescript, [subcommand, ...args[0]]);
		}

		return execa(purescript, [subcommand], args[0]);
	}

	if (argLen === 2) {
		return execa(purescript, [subcommand, ...args[0]], args[1]);
	}

	throw new RangeError(`Expected 0 ~ 2 arguments ([<Array<string>>][, <Object>]), but got ${argLen} arguments.`);
}

function pursWithoutAdditionalArgumentSupport(subcommand, ...args) {
	const argLen = args.length;

	if (argLen > 1) {
		throw new RangeError(`Expected 0 or 1 argument ([<Object>]), but got ${argLen} arguments.`);
	}

	return execa.stdout(purescript, [subcommand], ...args);
}

exports.help = function pursHelp(...args) {
	return pursWithoutAdditionalArgumentSupport('--help', ...args);
};

exports.version = function pursVersion(...args) {
	return pursWithoutAdditionalArgumentSupport('--version', ...args);
};

exports.bundle = function pursBundle(...args) {
	return purs('bundle', ...args);
};

exports.compile = function pursCompile(...args) {
	return purs('compile', ...args);
};

exports.docs = function pursDocs(...args) {
	return purs('docs', ...args);
};

exports.hierarchy = function pursHierarchy(...args) {
	return purs('hierarchy', ...args);
};

exports.ide = function pursIde(...args) {
	return purs('ide', ...args);
};

exports.publish = function pursPublish(...args) {
	return purs('publish', ...args);
};
