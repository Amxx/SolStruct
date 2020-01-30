#!/usr/bin/python3

import json
import os
import re
import solidity

SRC      = './contracts/templates'
DST      = './contracts/libs'
PATTERNS = './patterns.txt'

def ensure_dir(path):
	directory = os.path.dirname(path)
	if not os.path.exists(directory):
		os.makedirs(directory)

def generate(entry):
	try:
		m       = re.search('^(.+)<(.+)>$', entry)
		type    = m.group(1)
		args    = m.group(2).split(',')
		code    = open('{}/{}.sol.templated'.format(SRC, type), 'r').read()
		target  = '{}/{}.{}.sol'.format(DST, type, '.'.join(args))
		details = json.load(open('{}/{}.sol.templated.json'.format(SRC, type), 'r'))

		if 'dependencies' in details:
			for dep in details['dependencies']:
				for (key, type) in zip(details['args'], args):
					dep = dep.replace('<{}>'.format(key), '<{}>'.format(type))
				generate(dep)

		for (key, type) in zip(details['args'], args):
			code = code.replace('<{}>'.format(key), type)
			code = code.replace('<{}_LOCATION>'.format(key), 'memory' if solidity.types[type]['reference'] else '')

		ensure_dir(target)
		open(target, 'w').write(code)
		print('→ {} generated'.format(target))
	except:
		print('Error: invalid pattern `{}`'.format(entry))

if __name__ == '__main__':
	with open(PATTERNS) as file:
		for line in file:
			generate(line[:-1])
