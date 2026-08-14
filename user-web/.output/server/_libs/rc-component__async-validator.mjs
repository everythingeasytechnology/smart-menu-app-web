import processModule from "node:process";
//#region node_modules/@rc-component/async-validator/es/messages.js
function newMessages() {
	return {
		default: "Validation error on field %s",
		required: "%s is required",
		enum: "%s must be one of %s",
		whitespace: "%s cannot be empty",
		date: {
			format: "%s date %s is invalid for format %s",
			parse: "%s date could not be parsed, %s is invalid ",
			invalid: "%s date %s is invalid"
		},
		types: {
			string: "%s is not a %s",
			method: "%s is not a %s (function)",
			array: "%s is not an %s",
			object: "%s is not an %s",
			number: "%s is not a %s",
			date: "%s is not a %s",
			boolean: "%s is not a %s",
			integer: "%s is not an %s",
			float: "%s is not a %s",
			regexp: "%s is not a valid %s",
			email: "%s is not a valid %s",
			tel: "%s is not a valid %s",
			url: "%s is not a valid %s",
			hex: "%s is not a valid %s"
		},
		string: {
			len: "%s must be exactly %s characters",
			min: "%s must be at least %s characters",
			max: "%s cannot be longer than %s characters",
			range: "%s must be between %s and %s characters"
		},
		number: {
			len: "%s must equal %s",
			min: "%s cannot be less than %s",
			max: "%s cannot be greater than %s",
			range: "%s must be between %s and %s"
		},
		array: {
			len: "%s must be exactly %s in length",
			min: "%s cannot be less than %s in length",
			max: "%s cannot be greater than %s in length",
			range: "%s must be between %s and %s in length"
		},
		pattern: { mismatch: "%s value %s does not match pattern %s" },
		clone() {
			const cloned = JSON.parse(JSON.stringify(this));
			cloned.clone = this.clone;
			return cloned;
		}
	};
}
var messages = newMessages();
//#endregion
//#region node_modules/@rc-component/async-validator/es/util.js
var formatRegExp = /%[sdj%]/g;
var warning = () => {};
if (typeof processModule !== "undefined" && processModule.env && false);
function convertFieldsError(errors) {
	if (!errors || !errors.length) return null;
	const fields = {};
	errors.forEach((error) => {
		const field = error.field;
		fields[field] = fields[field] || [];
		fields[field].push(error);
	});
	return fields;
}
function format(template, ...args) {
	let i = 0;
	const len = args.length;
	if (typeof template === "function") return template.apply(null, args);
	if (typeof template === "string") return template.replace(formatRegExp, (x) => {
		if (x === "%%") return "%";
		if (i >= len) return x;
		switch (x) {
			case "%s": return String(args[i++]);
			case "%d": return Number(args[i++]);
			case "%j": try {
				return JSON.stringify(args[i++]);
			} catch (_) {
				return "[Circular]";
			}
			default: return x;
		}
	});
	return template;
}
function isNativeStringType(type) {
	return type === "string" || type === "url" || type === "hex" || type === "email" || type === "date" || type === "pattern" || type === "tel";
}
function isEmptyValue(value, type) {
	if (value === void 0 || value === null) return true;
	if (type === "array" && Array.isArray(value) && !value.length) return true;
	if (isNativeStringType(type) && typeof value === "string" && !value) return true;
	return false;
}
function asyncParallelArray(arr, func, callback) {
	const results = [];
	let total = 0;
	const arrLength = arr.length;
	function count(errors) {
		results.push(...errors || []);
		total++;
		if (total === arrLength) callback(results);
	}
	arr.forEach((a) => {
		func(a, count);
	});
}
function asyncSerialArray(arr, func, callback) {
	let index = 0;
	const arrLength = arr.length;
	function next(errors) {
		if (errors && errors.length) {
			callback(errors);
			return;
		}
		const original = index;
		index = index + 1;
		if (original < arrLength) func(arr[original], next);
		else callback([]);
	}
	next([]);
}
function flattenObjArr(objArr) {
	const ret = [];
	Object.keys(objArr).forEach((k) => {
		ret.push(...objArr[k] || []);
	});
	return ret;
}
var AsyncValidationError = class extends Error {
	errors;
	fields;
	constructor(errors, fields) {
		super("Async Validation Error");
		this.errors = errors;
		this.fields = fields;
	}
};
function asyncMap(objArr, option, func, callback, source) {
	if (option.first) {
		const pending = new Promise((resolve, reject) => {
			const next = (errors) => {
				callback(errors);
				return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
			};
			asyncSerialArray(flattenObjArr(objArr), func, next);
		});
		pending.catch((e) => e);
		return pending;
	}
	const firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
	const objArrKeys = Object.keys(objArr);
	const objArrLength = objArrKeys.length;
	let total = 0;
	const results = [];
	const pending = new Promise((resolve, reject) => {
		const next = (errors) => {
			results.push.apply(results, errors);
			total++;
			if (total === objArrLength) {
				callback(results);
				return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
			}
		};
		if (!objArrKeys.length) {
			callback(results);
			resolve(source);
		}
		objArrKeys.forEach((key) => {
			const arr = objArr[key];
			if (firstFields.indexOf(key) !== -1) asyncSerialArray(arr, func, next);
			else asyncParallelArray(arr, func, next);
		});
	});
	pending.catch((e) => e);
	return pending;
}
function isErrorObj(obj) {
	return !!(obj && obj.message !== void 0);
}
function getValue(value, path) {
	let v = value;
	for (let i = 0; i < path.length; i++) {
		if (v == void 0) return v;
		v = v[path[i]];
	}
	return v;
}
function complementError(rule, source) {
	return (oe) => {
		let fieldValue;
		if (rule.fullFields) fieldValue = getValue(source, rule.fullFields);
		else fieldValue = source[oe.field || rule.fullField];
		if (isErrorObj(oe)) {
			oe.field = oe.field || rule.fullField;
			oe.fieldValue = fieldValue;
			return oe;
		}
		return {
			message: typeof oe === "function" ? oe() : oe,
			fieldValue,
			field: oe.field || rule.fullField
		};
	};
}
function deepMerge(target, source) {
	if (source) {
		for (const s in source) if (source.hasOwnProperty(s)) {
			const value = source[s];
			if (typeof value === "object" && typeof target[s] === "object") target[s] = {
				...target[s],
				...value
			};
			else target[s] = value;
		}
	}
	return target;
}
//#endregion
//#region node_modules/@rc-component/async-validator/es/rule/enum.js
var ENUM$1 = "enum";
var enumerable$1 = (rule, value, source, errors, options) => {
	rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
	if (rule[ENUM$1].indexOf(value) === -1) errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/rule/pattern.js
var pattern$2 = (rule, value, source, errors, options) => {
	if (rule.pattern) {
		if (rule.pattern instanceof RegExp) {
			rule.pattern.lastIndex = 0;
			if (!rule.pattern.test(value)) errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
		} else if (typeof rule.pattern === "string") {
			if (!new RegExp(rule.pattern).test(value)) errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
		}
	}
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/rule/range.js
var range = (rule, value, source, errors, options) => {
	const len = typeof rule.len === "number";
	const min = typeof rule.min === "number";
	const max = typeof rule.max === "number";
	const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	let val = value;
	let key = null;
	const num = typeof value === "number";
	const str = typeof value === "string";
	const arr = Array.isArray(value);
	if (num) key = "number";
	else if (str) key = "string";
	else if (arr) key = "array";
	if (!key) return false;
	if (arr) val = value.length;
	if (str) val = value.replace(spRegexp, "_").length;
	if (len) {
		if (val !== rule.len) errors.push(format(options.messages[key].len, rule.fullField, rule.len));
	} else if (min && !max && val < rule.min) errors.push(format(options.messages[key].min, rule.fullField, rule.min));
	else if (max && !min && val > rule.max) errors.push(format(options.messages[key].max, rule.fullField, rule.max));
	else if (min && max && (val < rule.min || val > rule.max)) errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/rule/required.js
var required$1 = (rule, value, source, errors, options, type) => {
	if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) errors.push(format(options.messages.required, rule.fullField));
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/rule/url.js
var urlReg;
var url_default = (() => {
	if (urlReg) return urlReg;
	const word = "[a-fA-F\\d:]";
	const b = (options) => options && options.includeBoundaries ? `(?:(?<=\\s|^)(?=${word})|(?<=${word})(?=\\s|$))` : "";
	const v4 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
	const v6seg = "[a-fA-F\\d]{1,4}";
	const v6 = `(?:${[
		`(?:${v6seg}:){7}(?:${v6seg}|:)`,
		`(?:${v6seg}:){6}(?:${v4}|:${v6seg}|:)`,
		`(?:${v6seg}:){5}(?::${v4}|(?::${v6seg}){1,2}|:)`,
		`(?:${v6seg}:){4}(?:(?::${v6seg}){0,1}:${v4}|(?::${v6seg}){1,3}|:)`,
		`(?:${v6seg}:){3}(?:(?::${v6seg}){0,2}:${v4}|(?::${v6seg}){1,4}|:)`,
		`(?:${v6seg}:){2}(?:(?::${v6seg}){0,3}:${v4}|(?::${v6seg}){1,5}|:)`,
		`(?:${v6seg}:){1}(?:(?::${v6seg}){0,4}:${v4}|(?::${v6seg}){1,6}|:)`,
		`(?::(?:(?::${v6seg}){0,5}:${v4}|(?::${v6seg}){1,7}|:))`
	].join("|")})(?:%[0-9a-zA-Z]{1,})?`;
	const v46Exact = new RegExp(`(?:^${v4}$)|(?:^${v6}$)`);
	const v4exact = new RegExp(`^${v4}$`);
	const v6exact = new RegExp(`^${v6}$`);
	const ip = (options) => options && options.exact ? v46Exact : new RegExp(`(?:${b(options)}${v4}${b(options)})|(?:${b(options)}${v6}${b(options)})`, "g");
	ip.v4 = (options) => options && options.exact ? v4exact : new RegExp(`${b(options)}${v4}${b(options)}`, "g");
	ip.v6 = (options) => options && options.exact ? v6exact : new RegExp(`${b(options)}${v6}${b(options)}`, "g");
	const regex = `(?:(?:(?:[a-z]+:)?//)|www\\.)(?:\\S+(?::\\S*)?@)?(?:localhost|${ip.v4().source}|${ip.v6().source}|(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:[/?#][^\\s"]*)?`;
	urlReg = new RegExp(`(?:^${regex}$)`, "i");
	return urlReg;
});
//#endregion
//#region node_modules/@rc-component/async-validator/es/rule/type.js
var pattern$1 = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
	/**
	* Phone number regex, support country code, brackets, spaces, and dashes (or non-breaking hyphen \u2011).
	* @see https://regexr.com/3c53v
	* @see https://ihateregex.io/expr/phone/
	* @see https://developers.google.com/style/phone-numbers using non-breaking hyphen \u2011
	*/
	tel: /^(\+[0-9]{1,3}[-\s\u2011]?)?(\([0-9]{1,4}\)[-\s\u2011]?)?([0-9]+[-\s\u2011]?)*[0-9]+$/,
	hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
	integer(value) {
		return types.number(value) && parseInt(value, 10) === value;
	},
	float(value) {
		return types.number(value) && !types.integer(value);
	},
	array(value) {
		return Array.isArray(value);
	},
	regexp(value) {
		if (value instanceof RegExp) return true;
		try {
			return !!new RegExp(value);
		} catch (e) {
			return false;
		}
	},
	date(value) {
		return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
	},
	number(value) {
		if (isNaN(value)) return false;
		return typeof value === "number";
	},
	object(value) {
		return typeof value === "object" && !types.array(value);
	},
	method(value) {
		return typeof value === "function";
	},
	email(value) {
		return typeof value === "string" && value.length <= 320 && !!value.match(pattern$1.email);
	},
	tel(value) {
		return typeof value === "string" && value.length <= 32 && !!value.match(pattern$1.tel);
	},
	url(value) {
		return typeof value === "string" && value.length <= 2048 && !!value.match(url_default());
	},
	hex(value) {
		return typeof value === "string" && !!value.match(pattern$1.hex);
	}
};
var type$1 = (rule, value, source, errors, options) => {
	if (rule.required && value === void 0) {
		required$1(rule, value, source, errors, options);
		return;
	}
	const custom = [
		"integer",
		"float",
		"array",
		"regexp",
		"object",
		"method",
		"email",
		"tel",
		"number",
		"date",
		"url",
		"hex"
	];
	const ruleType = rule.type;
	if (custom.indexOf(ruleType) > -1) {
		if (!types[ruleType](value)) errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
	} else if (ruleType && typeof value !== rule.type) errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/rule/whitespace.js
/**
*  Rule for validating whitespace.
*
*  @param rule The validation rule.
*  @param value The value of the field on the source object.
*  @param source The source object being validated.
*  @param errors An array of errors that this rule may add
*  validation errors to.
*  @param options The validation options.
*  @param options.messages The validation messages.
*/
var whitespace = (rule, value, source, errors, options) => {
	if (/^\s+$/.test(value) || value === "") errors.push(format(options.messages.whitespace, rule.fullField));
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/rule/index.js
var rule_default = {
	required: required$1,
	whitespace,
	type: type$1,
	range,
	enum: enumerable$1,
	pattern: pattern$2
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/any.js
var any = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/array.js
var array = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if ((value === void 0 || value === null) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options, "array");
		if (value !== void 0 && value !== null) {
			rule_default.type(rule, value, source, errors, options);
			rule_default.range(rule, value, source, errors, options);
		}
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/boolean.js
var boolean = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (value !== void 0) rule_default.type(rule, value, source, errors, options);
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/date.js
var date = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value, "date") && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (!isEmptyValue(value, "date")) {
			let dateObject;
			if (value instanceof Date) dateObject = value;
			else dateObject = new Date(value);
			rule_default.type(rule, dateObject, source, errors, options);
			if (dateObject) rule_default.range(rule, dateObject.getTime(), source, errors, options);
		}
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/enum.js
var ENUM = "enum";
var enumerable = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (value !== void 0) rule_default[ENUM](rule, value, source, errors, options);
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/float.js
var floatFn = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (value !== void 0) {
			rule_default.type(rule, value, source, errors, options);
			rule_default.range(rule, value, source, errors, options);
		}
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/integer.js
var integer = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (value !== void 0) {
			rule_default.type(rule, value, source, errors, options);
			rule_default.range(rule, value, source, errors, options);
		}
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/method.js
var method = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (value !== void 0) rule_default.type(rule, value, source, errors, options);
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/number.js
var number = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (value === "") value = void 0;
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (value !== void 0) {
			rule_default.type(rule, value, source, errors, options);
			rule_default.range(rule, value, source, errors, options);
		}
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/object.js
var object = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (value !== void 0) rule_default.type(rule, value, source, errors, options);
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/pattern.js
var pattern = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value, "string") && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (!isEmptyValue(value, "string")) rule_default.pattern(rule, value, source, errors, options);
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/regexp.js
var regexp = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options);
		if (!isEmptyValue(value)) rule_default.type(rule, value, source, errors, options);
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/required.js
var required = (rule, value, callback, source, options) => {
	const errors = [];
	const type = Array.isArray(value) ? "array" : typeof value;
	rule_default.required(rule, value, source, errors, options, type);
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/string.js
var string = (rule, value, callback, source, options) => {
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value, "string") && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options, "string");
		if (!isEmptyValue(value, "string")) {
			rule_default.type(rule, value, source, errors, options);
			rule_default.range(rule, value, source, errors, options);
			rule_default.pattern(rule, value, source, errors, options);
			if (rule.whitespace === true) rule_default.whitespace(rule, value, source, errors, options);
		}
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/type.js
var type = (rule, value, callback, source, options) => {
	const ruleType = rule.type;
	const errors = [];
	if (rule.required || !rule.required && source.hasOwnProperty(rule.field)) {
		if (isEmptyValue(value, ruleType) && !rule.required) return callback();
		rule_default.required(rule, value, source, errors, options, ruleType);
		if (!isEmptyValue(value, ruleType)) rule_default.type(rule, value, source, errors, options);
	}
	callback(errors);
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/validator/index.js
var validator_default = {
	string,
	method,
	number,
	boolean,
	regexp,
	integer,
	float: floatFn,
	array,
	object,
	enum: enumerable,
	pattern,
	date,
	url: type,
	hex: type,
	email: type,
	tel: type,
	required,
	any
};
//#endregion
//#region node_modules/@rc-component/async-validator/es/index.js
/**
*  Encapsulates a validation schema.
*
*  @param descriptor An object declaring validation rules
*  for this schema.
*/
var Schema = class Schema {
	static register = function register(type, validator) {
		if (typeof validator !== "function") throw new Error("Cannot register a validator by type, validator is not a function");
		validator_default[type] = validator;
	};
	static warning = warning;
	static messages = messages;
	static validators = validator_default;
	rules = null;
	_messages = messages;
	constructor(descriptor) {
		this.define(descriptor);
	}
	define(rules) {
		if (!rules) throw new Error("Cannot configure a schema with no rules");
		if (typeof rules !== "object" || Array.isArray(rules)) throw new Error("Rules must be an object");
		this.rules = {};
		Object.keys(rules).forEach((name) => {
			const item = rules[name];
			this.rules[name] = Array.isArray(item) ? item : [item];
		});
	}
	messages(messages) {
		if (messages) this._messages = deepMerge(newMessages(), messages);
		return this._messages;
	}
	validate(source_, o = {}, oc = () => {}) {
		let source = source_;
		let options = o;
		let callback = oc;
		if (typeof options === "function") {
			callback = options;
			options = {};
		}
		if (!this.rules || Object.keys(this.rules).length === 0) {
			if (callback) callback(null, source);
			return Promise.resolve(source);
		}
		function complete(results) {
			let errors = [];
			let fields = {};
			function add(e) {
				if (Array.isArray(e)) errors = errors.concat(...e);
				else errors.push(e);
			}
			for (let i = 0; i < results.length; i++) add(results[i]);
			if (!errors.length) callback(null, source);
			else {
				fields = convertFieldsError(errors);
				callback(errors, fields);
			}
		}
		if (options.messages) {
			let messages$1 = this.messages();
			if (messages$1 === messages) messages$1 = newMessages();
			deepMerge(messages$1, options.messages);
			options.messages = messages$1;
		} else options.messages = this.messages();
		const series = {};
		(options.keys || Object.keys(this.rules)).forEach((z) => {
			const arr = this.rules[z];
			let value = source[z];
			arr.forEach((r) => {
				let rule = r;
				if (typeof rule.transform === "function") {
					if (source === source_) source = { ...source };
					value = source[z] = rule.transform(value);
					if (value !== void 0 && value !== null) rule.type = rule.type || (Array.isArray(value) ? "array" : typeof value);
				}
				if (typeof rule === "function") rule = { validator: rule };
				else rule = { ...rule };
				rule.validator = this.getValidationMethod(rule);
				if (!rule.validator) return;
				rule.field = z;
				rule.fullField = rule.fullField || z;
				rule.type = this.getType(rule);
				series[z] = series[z] || [];
				series[z].push({
					rule,
					value,
					source,
					field: z
				});
			});
		});
		const errorFields = {};
		return asyncMap(series, options, (data, doIt) => {
			const rule = data.rule;
			let deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
			deep = deep && (rule.required || !rule.required && data.value);
			rule.field = data.field;
			function addFullField(key, schema) {
				return {
					...schema,
					fullField: `${rule.fullField}.${key}`,
					fullFields: rule.fullFields ? [...rule.fullFields, key] : [key]
				};
			}
			function cb(e = []) {
				let errorList = Array.isArray(e) ? e : [e];
				if (!options.suppressWarning && errorList.length) Schema.warning("async-validator:", errorList);
				if (errorList.length && rule.message !== void 0 && rule.message !== null) errorList = [].concat(rule.message);
				let filledErrors = errorList.map(complementError(rule, source));
				if (options.first && filledErrors.length) {
					errorFields[rule.field] = 1;
					return doIt(filledErrors);
				}
				if (!deep) doIt(filledErrors);
				else {
					if (rule.required && !data.value) {
						if (rule.message !== void 0) filledErrors = [].concat(rule.message).map(complementError(rule, source));
						else if (options.error) filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
						return doIt(filledErrors);
					}
					let fieldsSchema = {};
					if (rule.defaultField) Object.keys(data.value).map((key) => {
						fieldsSchema[key] = rule.defaultField;
					});
					fieldsSchema = {
						...fieldsSchema,
						...data.rule.fields
					};
					const paredFieldsSchema = {};
					Object.keys(fieldsSchema).forEach((field) => {
						const fieldSchema = fieldsSchema[field];
						paredFieldsSchema[field] = (Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema]).map(addFullField.bind(null, field));
					});
					const schema = new Schema(paredFieldsSchema);
					schema.messages(options.messages);
					if (data.rule.options) {
						data.rule.options.messages = options.messages;
						data.rule.options.error = options.error;
					}
					schema.validate(data.value, data.rule.options || options, (errs) => {
						const finalErrors = [];
						if (filledErrors && filledErrors.length) finalErrors.push(...filledErrors);
						if (errs && errs.length) finalErrors.push(...errs);
						doIt(finalErrors.length ? finalErrors : null);
					});
				}
			}
			let res;
			if (rule.asyncValidator) res = rule.asyncValidator(rule, data.value, cb, data.source, options);
			else if (rule.validator) {
				try {
					res = rule.validator(rule, data.value, cb, data.source, options);
				} catch (error) {
					console.error?.(error);
					if (!options.suppressValidatorError) setTimeout(() => {
						throw error;
					}, 0);
					cb(error.message);
				}
				if (res === true) cb();
				else if (res === false) cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || `${rule.fullField || rule.field} fails`);
				else if (res instanceof Array) cb(res);
				else if (res instanceof Error) cb(res.message);
			}
			if (res && res.then) res.then(() => cb(), (e) => cb(e));
		}, (results) => {
			complete(results);
		}, source);
	}
	getType(rule) {
		if (rule.type === void 0 && rule.pattern instanceof RegExp) rule.type = "pattern";
		if (typeof rule.validator !== "function" && rule.type && !validator_default.hasOwnProperty(rule.type)) throw new Error(format("Unknown rule type %s", rule.type));
		return rule.type || "string";
	}
	getValidationMethod(rule) {
		if (typeof rule.validator === "function") return rule.validator;
		const keys = Object.keys(rule);
		const messageIndex = keys.indexOf("message");
		if (messageIndex !== -1) keys.splice(messageIndex, 1);
		if (keys.length === 1 && keys[0] === "required") return validator_default.required;
		return validator_default[this.getType(rule)] || void 0;
	}
};
//#endregion
export { Schema as t };
