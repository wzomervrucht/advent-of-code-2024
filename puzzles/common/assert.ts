export function assert(value: unknown, message?: string): asserts value {
  value || assert.fail(message);
}

assert.fail = function fail(message?: string): never {
  // eslint-disable-next-line prefer-template
  throw new Error('Invalid input' + (message ? `: ${message}` : ''));
};

export function assume(value: unknown, message?: string): asserts value {
  value || assume.fail(message);
}

assume.fail = function fail(message?: string): never {
  // eslint-disable-next-line prefer-template
  throw new Error('Invalid assumption' + (message ? `: ${message}` : ''));
};
