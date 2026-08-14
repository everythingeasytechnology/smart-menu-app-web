import { r as __toESM } from "../_runtime.mjs";
import { A as wrapperRaf, P as useEvent, c as merge, f as toArray$1, l as set, u as get } from "./@ant-design/cssinjs-utils+[...].mjs";
import { g as require_react, l as isEqual, u as warningOnce } from "./@ant-design/cssinjs+[...].mjs";
import { t as Schema } from "./rc-component__async-validator.mjs";
//#region node_modules/@rc-component/form/es/FieldContext.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var HOOK_MARK = "RC_FORM_INTERNAL_HOOKS";
var warningFunc = () => {
	warningOnce(false, "Can not find FormContext. Please make sure you wrap Field under Form.");
};
var Context = /*#__PURE__*/ import_react.createContext({
	getFieldValue: warningFunc,
	getFieldsValue: warningFunc,
	getFieldError: warningFunc,
	getFieldWarning: warningFunc,
	getFieldsError: warningFunc,
	isFieldsTouched: warningFunc,
	isFieldTouched: warningFunc,
	isFieldValidating: warningFunc,
	isFieldsValidating: warningFunc,
	resetFields: warningFunc,
	setFields: warningFunc,
	setFieldValue: warningFunc,
	setFieldsValue: warningFunc,
	validateFields: warningFunc,
	submit: warningFunc,
	getInternalHooks: () => {
		warningFunc();
		return {
			dispatch: warningFunc,
			initEntityValue: warningFunc,
			registerField: warningFunc,
			useSubscribe: warningFunc,
			setInitialValues: warningFunc,
			destroyForm: warningFunc,
			setCallbacks: warningFunc,
			registerWatch: warningFunc,
			getFields: warningFunc,
			setValidateMessages: warningFunc,
			setPreserve: warningFunc,
			getInitialValue: warningFunc
		};
	}
});
//#endregion
//#region node_modules/@rc-component/form/es/ListContext.js
var ListContext = /*#__PURE__*/ import_react.createContext(null);
//#endregion
//#region node_modules/@rc-component/form/es/utils/typeUtil.js
function toArray(value) {
	if (value === void 0 || value === null) return [];
	return Array.isArray(value) ? value : [value];
}
function isFormInstance(form) {
	return form && !!form._init;
}
//#endregion
//#region node_modules/@rc-component/form/es/utils/messages.js
var typeTemplate = "'${name}' is not a valid ${type}";
var defaultValidateMessages = {
	default: "Validation error on field '${name}'",
	required: "'${name}' is required",
	enum: "'${name}' must be one of [${enum}]",
	whitespace: "'${name}' cannot be empty",
	date: {
		format: "'${name}' is invalid for format date",
		parse: "'${name}' could not be parsed as date",
		invalid: "'${name}' is invalid date"
	},
	types: {
		string: typeTemplate,
		method: typeTemplate,
		array: typeTemplate,
		object: typeTemplate,
		number: typeTemplate,
		date: typeTemplate,
		boolean: typeTemplate,
		integer: typeTemplate,
		float: typeTemplate,
		regexp: typeTemplate,
		email: typeTemplate,
		tel: typeTemplate,
		url: typeTemplate,
		hex: typeTemplate
	},
	string: {
		len: "'${name}' must be exactly ${len} characters",
		min: "'${name}' must be at least ${min} characters",
		max: "'${name}' cannot be longer than ${max} characters",
		range: "'${name}' must be between ${min} and ${max} characters"
	},
	number: {
		len: "'${name}' must equal ${len}",
		min: "'${name}' cannot be less than ${min}",
		max: "'${name}' cannot be greater than ${max}",
		range: "'${name}' must be between ${min} and ${max}"
	},
	array: {
		len: "'${name}' must be exactly ${len} in length",
		min: "'${name}' cannot be less than ${min} in length",
		max: "'${name}' cannot be greater than ${max} in length",
		range: "'${name}' must be between ${min} and ${max} in length"
	},
	pattern: { mismatch: "'${name}' does not match pattern ${pattern}" }
};
//#endregion
//#region node_modules/@rc-component/form/es/utils/validateUtil.js
var AsyncValidator = Schema;
/**
* Replace with template.
*   `I'm ${name}` + { name: 'bamboo' } = I'm bamboo
*/
function replaceMessage(template, kv) {
	return template.replace(/\\?\$\{\w+\}/g, (str) => {
		if (str.startsWith("\\")) return str.slice(1);
		return kv[str.slice(2, -1)];
	});
}
var CODE_LOGIC_ERROR = "CODE_LOGIC_ERROR";
async function validateRule(name, value, rule, options, messageVariables) {
	const cloneRule = { ...rule };
	delete cloneRule.ruleIndex;
	AsyncValidator.warning = () => void 0;
	if (cloneRule.validator) {
		const originValidator = cloneRule.validator;
		cloneRule.validator = (...args) => {
			try {
				return originValidator(...args);
			} catch (error) {
				console.error(error);
				return Promise.reject(CODE_LOGIC_ERROR);
			}
		};
	}
	let subRuleField = null;
	if (cloneRule && cloneRule.type === "array" && cloneRule.defaultField) {
		subRuleField = cloneRule.defaultField;
		delete cloneRule.defaultField;
	}
	const validator = new AsyncValidator({ [name]: [cloneRule] });
	const messages = merge(defaultValidateMessages, options.validateMessages);
	validator.messages(messages);
	let result = [];
	try {
		await Promise.resolve(validator.validate({ [name]: value }, { ...options }));
	} catch (errObj) {
		if (errObj.errors) result = errObj.errors.map(({ message }, index) => {
			const mergedMessage = message === CODE_LOGIC_ERROR ? messages.default : message;
			return /*#__PURE__*/ import_react.isValidElement(mergedMessage) ? /*#__PURE__*/ import_react.cloneElement(mergedMessage, { key: `error_${index}` }) : mergedMessage;
		});
	}
	if (!result.length && subRuleField && Array.isArray(value) && value.length > 0) return (await Promise.all(value.map((subValue, i) => validateRule(`${name}.${i}`, subValue, subRuleField, options, messageVariables)))).reduce((prev, errors) => [...prev, ...errors], []);
	const kv = {
		...rule,
		name,
		enum: (rule.enum || []).join(", "),
		...messageVariables
	};
	return result.map((error) => {
		if (typeof error === "string") return replaceMessage(error, kv);
		return error;
	});
}
/**
* We use `async-validator` to validate the value.
* But only check one value in a time to avoid namePath validate issue.
*/
function validateRules(namePath, value, rules, options, validateFirst, messageVariables) {
	const name = namePath.join(".");
	const filledRules = rules.map((currentRule, ruleIndex) => {
		const originValidatorFunc = currentRule.validator;
		const cloneRule = {
			...currentRule,
			ruleIndex
		};
		if (originValidatorFunc) cloneRule.validator = (rule, val, callback) => {
			let hasPromise = false;
			const wrappedCallback = (...args) => {
				Promise.resolve().then(() => {
					warningOnce(!hasPromise, "Your validator function has already return a promise. `callback` will be ignored.");
					if (!hasPromise) callback(...args);
				});
			};
			const promise = originValidatorFunc(rule, val, wrappedCallback);
			hasPromise = promise && typeof promise.then === "function" && typeof promise.catch === "function";
			/**
			* 1. Use promise as the first priority.
			* 2. If promise not exist, use callback with warning instead
			*/
			warningOnce(hasPromise, "`callback` is deprecated. Please return a promise instead.");
			if (hasPromise) promise.then(() => {
				callback();
			}).catch((err) => {
				callback(err || " ");
			});
		};
		return cloneRule;
	}).sort(({ warningOnly: w1, ruleIndex: i1 }, { warningOnly: w2, ruleIndex: i2 }) => {
		if (!!w1 === !!w2) return i1 - i2;
		if (w1) return 1;
		return -1;
	});
	let summaryPromise;
	if (validateFirst === true) summaryPromise = new Promise(async (resolve, reject) => {
		for (let i = 0; i < filledRules.length; i += 1) {
			const rule = filledRules[i];
			const errors = await validateRule(name, value, rule, options, messageVariables);
			if (errors.length) {
				reject([{
					errors,
					rule
				}]);
				return;
			}
		}
		resolve([]);
	});
	else {
		const rulePromises = filledRules.map((rule) => validateRule(name, value, rule, options, messageVariables).then((errors) => ({
			errors,
			rule
		})));
		summaryPromise = (validateFirst ? finishOnFirstFailed(rulePromises) : finishOnAllFailed(rulePromises)).then((errors) => {
			return Promise.reject(errors);
		});
	}
	summaryPromise.catch((e) => e);
	return summaryPromise;
}
async function finishOnAllFailed(rulePromises) {
	return Promise.all(rulePromises).then((errorsList) => {
		return [].concat(...errorsList);
	});
}
async function finishOnFirstFailed(rulePromises) {
	let count = 0;
	return new Promise((resolve) => {
		rulePromises.forEach((promise) => {
			promise.then((ruleError) => {
				if (ruleError.errors.length) resolve([ruleError]);
				count += 1;
				if (count === rulePromises.length) resolve([]);
			});
		});
	});
}
//#endregion
//#region node_modules/@rc-component/form/es/utils/valueUtil.js
/**
* Convert name to internal supported format.
* This function should keep since we still thinking if need support like `a.b.c` format.
* 'a' => ['a']
* 123 => [123]
* ['a', 123] => ['a', 123]
*/
function getNamePath(path) {
	return toArray(path);
}
/**
* Create a new store object that contains only the values referenced by
* the provided list of name paths.
*/
function cloneByNamePathList(store, namePathList) {
	let newStore = {};
	namePathList.forEach((namePath) => {
		const value = get(store, namePath);
		newStore = set(newStore, namePath, value);
	});
	return newStore;
}
/**
* Check if `namePathList` includes `namePath`.
* @param namePathList A list of `InternalNamePath[]`
* @param namePath Compare `InternalNamePath`
* @param partialMatch True will make `[a, b]` match `[a, b, c]`
*/
function containsNamePath(namePathList, namePath, partialMatch = false) {
	return namePathList && namePathList.some((path) => matchNamePath(namePath, path, partialMatch));
}
/**
* Check if `namePath` is super set or equal of `subNamePath`.
* @param namePath A list of `InternalNamePath[]`
* @param subNamePath Compare `InternalNamePath`
* @param partialMatch Default false. True will make `[a, b]` match `[a, b, c]`
*/
function matchNamePath(namePath, subNamePath, partialMatch = false) {
	if (!namePath || !subNamePath) return false;
	if (!partialMatch && namePath.length !== subNamePath.length) return false;
	return subNamePath.every((nameUnit, i) => namePath[i] === nameUnit);
}
function isSimilar(source, target) {
	if (source === target) return true;
	if (!source && target || source && !target) return false;
	if (!source || !target || typeof source !== "object" || typeof target !== "object") return false;
	const sourceKeys = Object.keys(source);
	const targetKeys = Object.keys(target);
	return [.../* @__PURE__ */ new Set([...sourceKeys, ...targetKeys])].every((key) => {
		const sourceValue = source[key];
		const targetValue = target[key];
		if (typeof sourceValue === "function" && typeof targetValue === "function") return true;
		return sourceValue === targetValue;
	});
}
function defaultGetValueFromEvent(valuePropName, ...args) {
	const event = args[0];
	if (event && event.target && typeof event.target === "object" && valuePropName in event.target) return event.target[valuePropName];
	return event;
}
/**
* Moves an array item from one position in an array to another.
*
* Note: This is a pure function so a new array will be returned, instead
* of altering the array argument.
*
* @param array         Array in which to move an item.         (required)
* @param moveIndex     The index of the item to move.          (required)
* @param toIndex       The index to move item at moveIndex to. (required)
*/
function move(array, moveIndex, toIndex) {
	const { length } = array;
	if (moveIndex < 0 || moveIndex >= length || toIndex < 0 || toIndex >= length) return array;
	const item = array[moveIndex];
	const diff = moveIndex - toIndex;
	if (diff > 0) return [
		...array.slice(0, toIndex),
		item,
		...array.slice(toIndex, moveIndex),
		...array.slice(moveIndex + 1, length)
	];
	if (diff < 0) return [
		...array.slice(0, moveIndex),
		...array.slice(moveIndex + 1, toIndex + 1),
		item,
		...array.slice(toIndex + 1, length)
	];
	return array;
}
//#endregion
//#region node_modules/@rc-component/form/es/hooks/useNotifyWatch.js
/**
* Call action with delay in macro task.
*/
var macroTask = (fn) => {
	const channel = new MessageChannel();
	channel.port1.onmessage = fn;
	channel.port2.postMessage(null);
};
var WatcherCenter = class {
	namePathList = [];
	taskId = 0;
	watcherList = /* @__PURE__ */ new Set();
	form;
	constructor(form) {
		this.form = form;
	}
	register(callback) {
		this.watcherList.add(callback);
		return () => {
			this.watcherList.delete(callback);
		};
	}
	notify(namePath) {
		namePath.forEach((path) => {
			if (this.namePathList.every((exist) => !matchNamePath(exist, path))) this.namePathList.push(path);
		});
		this.doBatch();
	}
	doBatch() {
		this.taskId += 1;
		const currentId = this.taskId;
		macroTask(() => {
			if (currentId === this.taskId && this.watcherList.size) {
				const formInst = this.form.getForm();
				const values = formInst.getFieldsValue();
				const allValues = formInst.getFieldsValue(true);
				this.watcherList.forEach((callback) => {
					callback(values, allValues, this.namePathList);
				});
				this.namePathList = [];
			}
		});
	}
};
//#endregion
//#region node_modules/@rc-component/form/es/utils/delayUtil.js
async function delayFrame() {
	return new Promise((resolve) => {
		macroTask(() => {
			wrapperRaf(() => {
				resolve();
			});
		});
	});
}
//#endregion
//#region node_modules/@rc-component/form/es/Field.js
function _extends$1() {
	_extends$1 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$1.apply(this, arguments);
}
var EMPTY_ERRORS = [];
var EMPTY_WARNINGS = [];
function requireUpdate(shouldUpdate, prev, next, prevValue, nextValue, info) {
	if (typeof shouldUpdate === "function") return shouldUpdate(prev, next, "source" in info ? { source: info.source } : {});
	return prevValue !== nextValue;
}
var Field = class extends import_react.PureComponent {
	static contextType = Context;
	state = { resetCount: 0 };
	cancelRegisterFunc = null;
	mounted = false;
	/**
	* Follow state should not management in State since it will async update by React.
	* This makes first render of form can not get correct state value.
	*/
	touched = false;
	/**
	* Mark when touched & validated. Currently only used for `dependencies`.
	* Note that we do not think field with `initialValue` is dirty
	* but this will be by `isFieldDirty` func.
	*/
	dirty = false;
	validatePromise;
	prevValidating;
	errors = EMPTY_ERRORS;
	warnings = EMPTY_WARNINGS;
	constructor(props) {
		super(props);
		if (props.fieldContext) {
			const { getInternalHooks } = props.fieldContext;
			const { initEntityValue } = getInternalHooks(HOOK_MARK);
			initEntityValue(this);
		}
	}
	componentDidMount() {
		const { shouldUpdate, fieldContext } = this.props;
		this.mounted = true;
		if (fieldContext) {
			const { getInternalHooks } = fieldContext;
			const { registerField } = getInternalHooks(HOOK_MARK);
			this.cancelRegisterFunc = registerField(this);
		}
		if (shouldUpdate === true) this.reRender();
	}
	componentWillUnmount() {
		this.cancelRegister();
		this.triggerMetaEvent(true);
		this.mounted = false;
	}
	cancelRegister = () => {
		const { preserve, isListField, name } = this.props;
		if (this.cancelRegisterFunc) this.cancelRegisterFunc(isListField, preserve, getNamePath(name));
		this.cancelRegisterFunc = null;
	};
	getNamePath = () => {
		const { name, fieldContext } = this.props;
		const { prefixName = [] } = fieldContext;
		return name !== void 0 ? [...prefixName, ...name] : [];
	};
	getRules = () => {
		const { rules = [], fieldContext } = this.props;
		return rules.map((rule) => {
			if (typeof rule === "function") return rule(fieldContext);
			return rule;
		});
	};
	reRender() {
		if (!this.mounted) return;
		this.forceUpdate();
	}
	refresh = () => {
		if (!this.mounted) return;
		/**
		* Clean up current node.
		*/
		this.setState(({ resetCount }) => ({ resetCount: resetCount + 1 }));
	};
	metaCache = null;
	triggerMetaEvent = (destroy) => {
		const { onMetaChange } = this.props;
		if (onMetaChange) {
			const meta = {
				...this.getMeta(),
				destroy
			};
			if (!isEqual(this.metaCache, meta)) onMetaChange(meta);
			this.metaCache = meta;
		} else this.metaCache = null;
	};
	onStoreChange = (prevStore, namePathList, info) => {
		const { shouldUpdate, dependencies = [], onReset } = this.props;
		const { store } = info;
		const namePath = this.getNamePath();
		const prevValue = this.getValue(prevStore);
		const curValue = this.getValue(store);
		const namePathMatch = namePathList && containsNamePath(namePathList, namePath);
		if (info.type === "valueUpdate" && info.source === "external" && !isEqual(prevValue, curValue)) {
			this.touched = true;
			this.dirty = true;
			this.validatePromise = null;
			this.errors = EMPTY_ERRORS;
			this.warnings = EMPTY_WARNINGS;
			this.triggerMetaEvent();
		}
		switch (info.type) {
			case "reset":
				if (!namePathList || namePathMatch) {
					this.touched = false;
					this.dirty = false;
					this.validatePromise = void 0;
					this.errors = EMPTY_ERRORS;
					this.warnings = EMPTY_WARNINGS;
					this.triggerMetaEvent();
					onReset?.();
					this.refresh();
					return;
				}
				break;
			/**
			* In case field with `preserve = false` nest deps like:
			* - A = 1 => show B
			* - B = 1 => show C
			* - Reset A, need clean B, C
			*/
			case "remove":
				if (shouldUpdate && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
					this.reRender();
					return;
				}
				break;
			case "setField": {
				const { data } = info;
				if (namePathMatch) {
					if ("touched" in data) this.touched = data.touched;
					if ("validating" in data && !("originRCField" in data)) this.validatePromise = data.validating ? Promise.resolve([]) : null;
					if ("errors" in data) this.errors = data.errors || EMPTY_ERRORS;
					if ("warnings" in data) this.warnings = data.warnings || EMPTY_WARNINGS;
					this.dirty = true;
					this.triggerMetaEvent();
					this.reRender();
					return;
				} else if ("value" in data && containsNamePath(namePathList, namePath, true)) {
					this.reRender();
					return;
				}
				if (shouldUpdate && !namePath.length && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
					this.reRender();
					return;
				}
				break;
			}
			case "dependenciesUpdate":
				if (dependencies.map(getNamePath).some((dependency) => containsNamePath(info.relatedFields, dependency))) {
					this.reRender();
					return;
				}
				break;
			default: if (namePathMatch || (!dependencies.length || namePath.length || shouldUpdate) && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
				this.reRender();
				return;
			}
		}
		if (shouldUpdate === true) this.reRender();
	};
	validateRules = (options) => {
		const namePath = this.getNamePath();
		const currentValue = this.getValue();
		const { triggerName, validateOnly = false, delayFrame: showDelayFrame } = options || {};
		const rootPromise = Promise.resolve().then(async () => {
			if (!this.mounted) return [];
			const { validateFirst = false, messageVariables, validateDebounce } = this.props;
			if (showDelayFrame) await delayFrame();
			let filteredRules = this.getRules();
			if (triggerName) filteredRules = filteredRules.filter((rule) => rule).filter((rule) => {
				const { validateTrigger } = rule;
				if (!validateTrigger) return true;
				return toArray(validateTrigger).includes(triggerName);
			});
			if (validateDebounce && triggerName) {
				await new Promise((resolve) => {
					setTimeout(resolve, validateDebounce);
				});
				if (this.validatePromise !== rootPromise) return [];
			}
			const promise = validateRules(namePath, currentValue, filteredRules, options, validateFirst, messageVariables);
			promise.catch((e) => e).then((ruleErrors = EMPTY_ERRORS) => {
				if (this.validatePromise === rootPromise) {
					this.validatePromise = null;
					const nextErrors = [];
					const nextWarnings = [];
					ruleErrors.forEach?.(({ rule: { warningOnly }, errors = EMPTY_ERRORS }) => {
						if (warningOnly) nextWarnings.push(...errors);
						else nextErrors.push(...errors);
					});
					this.errors = nextErrors;
					this.warnings = nextWarnings;
					this.triggerMetaEvent();
					this.reRender();
				}
			});
			return promise;
		});
		if (validateOnly) return rootPromise;
		this.validatePromise = rootPromise;
		this.dirty = true;
		this.errors = EMPTY_ERRORS;
		this.warnings = EMPTY_WARNINGS;
		this.triggerMetaEvent();
		this.reRender();
		return rootPromise;
	};
	isFieldValidating = () => !!this.validatePromise;
	isFieldTouched = () => this.touched;
	isFieldDirty = () => {
		if (this.dirty || this.props.initialValue !== void 0) return true;
		const { fieldContext } = this.props;
		const { getInitialValue } = fieldContext.getInternalHooks(HOOK_MARK);
		if (getInitialValue(this.getNamePath()) !== void 0) return true;
		return false;
	};
	getErrors = () => this.errors;
	getWarnings = () => this.warnings;
	isListField = () => this.props.isListField;
	isList = () => this.props.isList;
	isPreserve = () => this.props.preserve;
	getMeta = () => {
		this.prevValidating = this.isFieldValidating();
		return {
			touched: this.isFieldTouched(),
			validating: this.prevValidating,
			errors: this.errors,
			warnings: this.warnings,
			name: this.getNamePath(),
			validated: this.validatePromise === null
		};
	};
	getOnlyChild = (children) => {
		if (typeof children === "function") {
			const meta = this.getMeta();
			return {
				...this.getOnlyChild(children(this.getControlled(), meta, this.props.fieldContext)),
				isFunction: true
			};
		}
		const childList = toArray$1(children);
		if (childList.length !== 1 || !/*#__PURE__*/ import_react.isValidElement(childList[0])) return {
			child: childList,
			isFunction: false
		};
		return {
			child: childList[0],
			isFunction: false
		};
	};
	getValue = (store) => {
		const { getFieldsValue } = this.props.fieldContext;
		const namePath = this.getNamePath();
		return get(store || getFieldsValue(true), namePath);
	};
	getControlled = (childProps = {}) => {
		const { name, trigger = "onChange", validateTrigger, getValueFromEvent, normalize, valuePropName = "value", getValueProps, fieldContext } = this.props;
		const mergedValidateTrigger = validateTrigger !== void 0 ? validateTrigger : fieldContext.validateTrigger;
		const namePath = this.getNamePath();
		const { getInternalHooks, getFieldsValue } = fieldContext;
		const { dispatch } = getInternalHooks(HOOK_MARK);
		const value = this.getValue();
		const mergedGetValueProps = getValueProps || ((val) => ({ [valuePropName]: val }));
		const originTriggerFunc = childProps[trigger];
		const valueProps = name !== void 0 ? mergedGetValueProps(value) : {};
		const control = {
			...childProps,
			...valueProps
		};
		control[trigger] = (...args) => {
			this.touched = true;
			this.dirty = true;
			this.triggerMetaEvent();
			const curValue = this.getValue();
			let newValue;
			if (getValueFromEvent) newValue = getValueFromEvent(...args);
			else newValue = defaultGetValueFromEvent(valuePropName, ...args);
			if (normalize) newValue = normalize(newValue, curValue, getFieldsValue(true));
			if (newValue !== curValue) dispatch({
				type: "updateValue",
				namePath,
				value: newValue
			});
			if (originTriggerFunc) originTriggerFunc(...args);
		};
		toArray(mergedValidateTrigger || []).forEach((triggerName) => {
			const originTrigger = control[triggerName];
			control[triggerName] = (...args) => {
				if (originTrigger) originTrigger(...args);
				const { rules } = this.props;
				if (rules && rules.length) dispatch({
					type: "validateField",
					namePath,
					triggerName
				});
			};
		});
		return control;
	};
	render() {
		const { resetCount } = this.state;
		const { children } = this.props;
		const { child, isFunction } = this.getOnlyChild(children);
		let returnChildNode;
		if (isFunction) returnChildNode = child;
		else if (/*#__PURE__*/ import_react.isValidElement(child)) returnChildNode = /*#__PURE__*/ import_react.cloneElement(child, this.getControlled(child.props));
		else {
			warningOnce(!child, "`children` of Field is not validate ReactElement.");
			returnChildNode = child;
		}
		return /*#__PURE__*/ import_react.createElement(import_react.Fragment, { key: resetCount }, returnChildNode);
	}
};
function WrapperField({ name, ...restProps }) {
	const fieldContext = import_react.useContext(Context);
	const listContext = import_react.useContext(ListContext);
	const namePath = name !== void 0 ? getNamePath(name) : void 0;
	const isMergedListField = restProps.isListField ?? !!listContext;
	let key = "keep";
	if (!isMergedListField) key = `_${(namePath || []).join("_")}`;
	return /*#__PURE__*/ import_react.createElement(Field, _extends$1({
		key,
		name: namePath,
		isListField: isMergedListField
	}, restProps, { fieldContext }));
}
//#endregion
//#region node_modules/@rc-component/form/es/List.js
function List({ name, initialValue, children, rules, validateTrigger, isListField }) {
	const context = import_react.useContext(Context);
	const wrapperListContext = import_react.useContext(ListContext);
	const keyManager = import_react.useRef({
		keys: [],
		id: 0
	}).current;
	const prefixName = import_react.useMemo(() => {
		return [...getNamePath(context.prefixName) || [], ...getNamePath(name)];
	}, [context.prefixName, name]);
	const fieldContext = import_react.useMemo(() => ({
		...context,
		prefixName
	}), [context, prefixName]);
	const listContext = import_react.useMemo(() => ({ getKey: (namePath) => {
		const len = prefixName.length;
		const pathName = namePath[len];
		return [keyManager.keys[pathName], namePath.slice(len + 1)];
	} }), [keyManager, prefixName]);
	if (typeof children !== "function") {
		warningOnce(false, "Form.List only accepts function as children.");
		return null;
	}
	const shouldUpdate = (prevValue, nextValue, { source }) => {
		if (source === "internal") return false;
		return prevValue !== nextValue;
	};
	return /*#__PURE__*/ import_react.createElement(ListContext.Provider, { value: listContext }, /*#__PURE__*/ import_react.createElement(Context.Provider, { value: fieldContext }, /*#__PURE__*/ import_react.createElement(WrapperField, {
		name: [],
		shouldUpdate,
		rules,
		validateTrigger,
		initialValue,
		isList: true,
		isListField: isListField ?? !!wrapperListContext
	}, ({ value = [], onChange }, meta) => {
		const { getFieldValue } = context;
		const getNewValue = () => {
			return getFieldValue(prefixName || []) || [];
		};
		/**
		* Always get latest value in case user update fields by `form` api.
		*/
		const operations = {
			add: (defaultValue, index) => {
				const newValue = getNewValue();
				if (index >= 0 && index <= newValue.length) {
					keyManager.keys = [
						...keyManager.keys.slice(0, index),
						keyManager.id,
						...keyManager.keys.slice(index)
					];
					onChange([
						...newValue.slice(0, index),
						defaultValue,
						...newValue.slice(index)
					]);
				} else {
					keyManager.keys = [...keyManager.keys, keyManager.id];
					onChange([...newValue, defaultValue]);
				}
				keyManager.id += 1;
			},
			remove: (index) => {
				const newValue = getNewValue();
				const indexSet = new Set(Array.isArray(index) ? index : [index]);
				if (indexSet.size <= 0) return;
				keyManager.keys = keyManager.keys.filter((_, keysIndex) => !indexSet.has(keysIndex));
				onChange(newValue.filter((_, valueIndex) => !indexSet.has(valueIndex)));
			},
			move(from, to) {
				if (from === to) return;
				const newValue = getNewValue();
				if (from < 0 || from >= newValue.length || to < 0 || to >= newValue.length) return;
				keyManager.keys = move(keyManager.keys, from, to);
				onChange(move(newValue, from, to));
			}
		};
		let listValue = value || [];
		if (!Array.isArray(listValue)) listValue = [];
		return children(listValue.map((__, index) => {
			let key = keyManager.keys[index];
			if (key === void 0) {
				keyManager.keys[index] = keyManager.id;
				key = keyManager.keys[index];
				keyManager.id += 1;
			}
			return {
				name: index,
				key,
				isListField: true
			};
		}), operations, meta);
	})));
}
//#endregion
//#region node_modules/@rc-component/form/es/utils/asyncUtil.js
function allPromiseFinish(promiseList) {
	let hasError = false;
	let count = promiseList.length;
	const results = [];
	if (!promiseList.length) return Promise.resolve([]);
	return new Promise((resolve, reject) => {
		promiseList.forEach((promise, index) => {
			promise.catch((e) => {
				hasError = true;
				return e;
			}).then((result) => {
				count -= 1;
				results[index] = result;
				if (count > 0) return;
				if (hasError) reject(results);
				resolve(results);
			});
		});
	});
}
//#endregion
//#region node_modules/@rc-component/form/es/utils/NameMap.js
var SPLIT = "__@field_split__";
/**
* Convert name path into string to fast the fetch speed of Map.
*/
function normalize(namePath) {
	return namePath.map((cell) => `${typeof cell}:${cell}`).join(SPLIT);
}
/**
* NameMap like a `Map` but accepts `string[]` as key.
*/
var NameMap = class {
	kvs = /* @__PURE__ */ new Map();
	set(key, value) {
		this.kvs.set(normalize(key), value);
	}
	get(key) {
		return this.kvs.get(normalize(key));
	}
	getAsPrefix(key) {
		const normalizedKey = normalize(key);
		const normalizedPrefix = normalizedKey + SPLIT;
		const results = [];
		const current = this.kvs.get(normalizedKey);
		if (current !== void 0) results.push(current);
		this.kvs.forEach((value, itemNormalizedKey) => {
			if (itemNormalizedKey.startsWith(normalizedPrefix)) results.push(value);
		});
		return results;
	}
	update(key, updater) {
		const next = updater(this.get(key));
		if (!next) this.delete(key);
		else this.set(key, next);
	}
	delete(key) {
		this.kvs.delete(normalize(key));
	}
	map(callback) {
		return [...this.kvs.entries()].map(([key, value]) => {
			return callback({
				key: key.split(SPLIT).map((cell) => {
					const [, type, unit] = cell.match(/^([^:]*):(.*)$/);
					return type === "number" ? Number(unit) : unit;
				}),
				value
			});
		});
	}
	toJSON() {
		const json = {};
		this.map(({ key, value }) => {
			json[key.join(".")] = value;
			return null;
		});
		return json;
	}
};
//#endregion
//#region node_modules/@rc-component/form/es/hooks/useForm.js
var FormStore = class {
	formHooked = false;
	forceRootUpdate;
	subscribable = true;
	store = {};
	fieldEntities = [];
	initialValues = {};
	callbacks = {};
	validateMessages = null;
	preserve = null;
	lastValidatePromise = null;
	watcherCenter = new WatcherCenter(this);
	constructor(forceRootUpdate) {
		this.forceRootUpdate = forceRootUpdate;
	}
	getForm = () => ({
		getFieldValue: this.getFieldValue,
		getFieldsValue: this.getFieldsValue,
		getFieldError: this.getFieldError,
		getFieldWarning: this.getFieldWarning,
		getFieldsError: this.getFieldsError,
		isFieldsTouched: this.isFieldsTouched,
		isFieldTouched: this.isFieldTouched,
		isFieldValidating: this.isFieldValidating,
		isFieldsValidating: this.isFieldsValidating,
		resetFields: this.resetFields,
		setFields: this.setFields,
		setFieldValue: this.setFieldValue,
		setFieldsValue: this.setFieldsValue,
		validateFields: this.validateFields,
		submit: this.submit,
		_init: true,
		getInternalHooks: this.getInternalHooks
	});
	getInternalHooks = (key) => {
		if (key === "RC_FORM_INTERNAL_HOOKS") {
			this.formHooked = true;
			return {
				dispatch: this.dispatch,
				initEntityValue: this.initEntityValue,
				registerField: this.registerField,
				useSubscribe: this.useSubscribe,
				setInitialValues: this.setInitialValues,
				destroyForm: this.destroyForm,
				setCallbacks: this.setCallbacks,
				setValidateMessages: this.setValidateMessages,
				getFields: this.getFields,
				setPreserve: this.setPreserve,
				getInitialValue: this.getInitialValue,
				registerWatch: this.registerWatch
			};
		}
		warningOnce(false, "`getInternalHooks` is internal usage. Should not call directly.");
		return null;
	};
	useSubscribe = (subscribable) => {
		this.subscribable = subscribable;
	};
	/**
	* Record prev Form unmount fieldEntities which config preserve false.
	* This need to be refill with initialValues instead of store value.
	*/
	prevWithoutPreserves = null;
	/**
	* First time `setInitialValues` should update store with initial value
	*/
	setInitialValues = (initialValues, init) => {
		this.initialValues = initialValues || {};
		if (init) {
			let nextStore = merge(initialValues, this.store);
			this.prevWithoutPreserves?.map(({ key: namePath }) => {
				nextStore = set(nextStore, namePath, get(initialValues, namePath));
			});
			this.prevWithoutPreserves = null;
			this.updateStore(nextStore);
		}
	};
	destroyForm = (clearOnDestroy) => {
		if (clearOnDestroy) this.updateStore({});
		else {
			const prevWithoutPreserves = new NameMap();
			this.getFieldEntities(true).forEach((entity) => {
				if (!this.isMergedPreserve(entity.isPreserve())) prevWithoutPreserves.set(entity.getNamePath(), true);
			});
			this.prevWithoutPreserves = prevWithoutPreserves;
		}
	};
	getInitialValue = (namePath) => {
		const initValue = get(this.initialValues, namePath);
		return namePath.length ? merge(initValue) : initValue;
	};
	setCallbacks = (callbacks) => {
		this.callbacks = callbacks;
	};
	setValidateMessages = (validateMessages) => {
		this.validateMessages = validateMessages;
	};
	setPreserve = (preserve) => {
		this.preserve = preserve;
	};
	registerWatch = (callback) => {
		return this.watcherCenter.register(callback);
	};
	notifyWatch = (namePath = []) => {
		this.watcherCenter.notify(namePath);
	};
	timeoutId = null;
	warningUnhooked = () => {};
	updateStore = (nextStore) => {
		this.store = nextStore;
	};
	/**
	* Get registered field entities.
	* @param pure Only return field which has a `name`. Default: false
	*/
	getFieldEntities = (pure = false) => {
		if (!pure) return this.fieldEntities;
		return this.fieldEntities.filter((field) => field.getNamePath().length);
	};
	/**
	* Get a map of registered field entities with their name path as the key.
	* @param pure Only include fields which have a `name`. Default: false
	* @returns A NameMap containing field entities indexed by their name paths
	*/
	getFieldsMap = (pure = false) => {
		const cache = new NameMap();
		this.getFieldEntities(pure).forEach((field) => {
			const namePath = field.getNamePath();
			cache.set(namePath, field);
		});
		return cache;
	};
	/**
	* Get field entities based on a list of name paths.
	* @param nameList - Array of name paths to search for. If not provided, returns all field entities with names.
	* @param includesSubNamePath - Whether to include fields that have the given name path as a prefix.
	*/
	getFieldEntitiesForNamePathList = (nameList, includesSubNamePath = false) => {
		if (!nameList) return this.getFieldEntities(true);
		const cache = this.getFieldsMap(true);
		if (!includesSubNamePath) return nameList.map((name) => {
			const namePath = getNamePath(name);
			return cache.get(namePath) || { INVALIDATE_NAME_PATH: getNamePath(name) };
		});
		return nameList.flatMap((name) => {
			const namePath = getNamePath(name);
			const fields = cache.getAsPrefix(namePath);
			if (fields.length) return fields;
			return [{ INVALIDATE_NAME_PATH: namePath }];
		});
	};
	getFieldsValue = (nameList, filterFunc) => {
		this.warningUnhooked();
		let mergedNameList;
		let mergedFilterFunc;
		if (nameList === true || Array.isArray(nameList)) {
			mergedNameList = nameList;
			mergedFilterFunc = filterFunc;
		} else if (nameList && typeof nameList === "object") mergedFilterFunc = nameList.filter;
		if (mergedNameList === true && !mergedFilterFunc) return this.store;
		const fieldEntities = this.getFieldEntitiesForNamePathList(Array.isArray(mergedNameList) ? mergedNameList : null, true);
		const filteredNameList = [];
		const listNamePaths = [];
		fieldEntities.forEach((entity) => {
			const namePath = entity.INVALIDATE_NAME_PATH || entity.getNamePath();
			if (entity.isList?.()) {
				listNamePaths.push(namePath);
				return;
			}
			if (!mergedFilterFunc) filteredNameList.push(namePath);
			else {
				const meta = "getMeta" in entity ? entity.getMeta() : null;
				if (mergedFilterFunc(meta)) filteredNameList.push(namePath);
			}
		});
		let mergedValues = cloneByNamePathList(this.store, filteredNameList.map(getNamePath));
		listNamePaths.forEach((namePath) => {
			if (!get(mergedValues, namePath)) mergedValues = set(mergedValues, namePath, []);
		});
		return mergedValues;
	};
	getFieldValue = (name) => {
		this.warningUnhooked();
		const namePath = getNamePath(name);
		return get(this.store, namePath);
	};
	getFieldsError = (nameList) => {
		this.warningUnhooked();
		return this.getFieldEntitiesForNamePathList(nameList).map((entity, index) => {
			if (entity && !entity.INVALIDATE_NAME_PATH) return {
				name: entity.getNamePath(),
				errors: entity.getErrors(),
				warnings: entity.getWarnings()
			};
			return {
				name: getNamePath(nameList[index]),
				errors: [],
				warnings: []
			};
		});
	};
	getFieldError = (name) => {
		this.warningUnhooked();
		const namePath = getNamePath(name);
		return this.getFieldsError([namePath])[0].errors;
	};
	getFieldWarning = (name) => {
		this.warningUnhooked();
		const namePath = getNamePath(name);
		return this.getFieldsError([namePath])[0].warnings;
	};
	isFieldsTouched = (...args) => {
		this.warningUnhooked();
		const [arg0, arg1] = args;
		let namePathList;
		let isAllFieldsTouched = false;
		if (args.length === 0) namePathList = null;
		else if (args.length === 1) {
			if (Array.isArray(arg0)) {
				namePathList = arg0.map(getNamePath);
				isAllFieldsTouched = false;
			} else {
				namePathList = null;
				isAllFieldsTouched = arg0;
			}
		} else {
			namePathList = arg0.map(getNamePath);
			isAllFieldsTouched = arg1;
		}
		const fieldEntities = this.getFieldEntities(true);
		const isFieldTouched = (field) => field.isFieldTouched();
		if (!namePathList) return isAllFieldsTouched ? fieldEntities.every((entity) => isFieldTouched(entity) || entity.isList()) : fieldEntities.some(isFieldTouched);
		const map = new NameMap();
		namePathList.forEach((shortNamePath) => {
			map.set(shortNamePath, []);
		});
		fieldEntities.forEach((field) => {
			const fieldNamePath = field.getNamePath();
			namePathList.forEach((shortNamePath) => {
				if (shortNamePath.every((nameUnit, i) => fieldNamePath[i] === nameUnit)) map.update(shortNamePath, (list) => [...list, field]);
			});
		});
		const isNamePathListTouched = (entities) => entities.some(isFieldTouched);
		const namePathListEntities = map.map(({ value }) => value);
		return isAllFieldsTouched ? namePathListEntities.every(isNamePathListTouched) : namePathListEntities.some(isNamePathListTouched);
	};
	isFieldTouched = (name) => {
		this.warningUnhooked();
		return this.isFieldsTouched([name]);
	};
	isFieldsValidating = (nameList) => {
		this.warningUnhooked();
		const fieldEntities = this.getFieldEntities();
		if (!nameList) return fieldEntities.some((testField) => testField.isFieldValidating());
		const namePathList = nameList.map(getNamePath);
		return fieldEntities.some((testField) => {
			const fieldNamePath = testField.getNamePath();
			return containsNamePath(namePathList, fieldNamePath) && testField.isFieldValidating();
		});
	};
	isFieldValidating = (name) => {
		this.warningUnhooked();
		return this.isFieldsValidating([name]);
	};
	/**
	* Reset Field with field `initialValue` prop.
	* Can pass `entities` or `namePathList` or just nothing.
	*/
	resetWithFieldInitialValue = (info = {}) => {
		const cache = new NameMap();
		const fieldEntities = this.getFieldEntities(true);
		fieldEntities.forEach((field) => {
			const { initialValue } = field.props;
			const namePath = field.getNamePath();
			if (initialValue !== void 0) {
				const records = cache.get(namePath) || /* @__PURE__ */ new Set();
				records.add({
					entity: field,
					value: initialValue
				});
				cache.set(namePath, records);
			}
		});
		const resetWithFields = (entities) => {
			entities.forEach((field) => {
				const { initialValue } = field.props;
				if (initialValue !== void 0) {
					const namePath = field.getNamePath();
					if (this.getInitialValue(namePath) !== void 0) warningOnce(false, `Form already set 'initialValues' with path '${namePath.join(".")}'. Field can not overwrite it.`);
					else {
						const records = cache.get(namePath);
						if (records && records.size > 1) warningOnce(false, `Multiple Field with path '${namePath.join(".")}' set 'initialValue'. Can not decide which one to pick.`);
						else if (records) {
							const originValue = this.getFieldValue(namePath);
							if (!field.isListField() && (!info.skipExist || originValue === void 0)) this.updateStore(set(this.store, namePath, [...records][0].value));
						}
					}
				}
			});
		};
		let requiredFieldEntities;
		if (info.entities) requiredFieldEntities = info.entities;
		else if (info.namePathList) {
			requiredFieldEntities = [];
			info.namePathList.forEach((namePath) => {
				const records = cache.get(namePath);
				if (records) requiredFieldEntities.push(...[...records].map((r) => r.entity));
			});
		} else requiredFieldEntities = fieldEntities;
		resetWithFields(requiredFieldEntities);
	};
	resetFields = (nameList) => {
		this.warningUnhooked();
		const prevStore = this.store;
		if (!nameList) {
			this.updateStore(merge(this.initialValues));
			this.resetWithFieldInitialValue();
			this.notifyObservers(prevStore, null, { type: "reset" });
			this.notifyWatch();
			return;
		}
		const namePathList = nameList.map(getNamePath);
		namePathList.forEach((namePath) => {
			const initialValue = this.getInitialValue(namePath);
			this.updateStore(set(this.store, namePath, initialValue));
		});
		this.resetWithFieldInitialValue({ namePathList });
		this.notifyObservers(prevStore, namePathList, { type: "reset" });
		this.notifyWatch(namePathList);
	};
	setFields = (fields) => {
		this.warningUnhooked();
		const prevStore = this.store;
		const namePathList = [];
		fields.forEach((fieldData) => {
			const { name, ...data } = fieldData;
			const namePath = getNamePath(name);
			namePathList.push(namePath);
			if ("value" in data) this.updateStore(set(this.store, namePath, data.value));
			this.notifyObservers(prevStore, [namePath], {
				type: "setField",
				data: fieldData
			});
		});
		this.notifyWatch(namePathList);
	};
	getFields = () => {
		return this.getFieldEntities(true).map((field) => {
			const namePath = field.getNamePath();
			const fieldData = {
				...field.getMeta(),
				name: namePath,
				value: this.getFieldValue(namePath)
			};
			Object.defineProperty(fieldData, "originRCField", { value: true });
			return fieldData;
		});
	};
	/**
	* This only trigger when a field is on constructor to avoid we get initialValue too late
	*/
	initEntityValue = (entity) => {
		const { initialValue } = entity.props;
		if (initialValue !== void 0) {
			const namePath = entity.getNamePath();
			if (get(this.store, namePath) === void 0) this.updateStore(set(this.store, namePath, initialValue));
		}
	};
	isMergedPreserve = (fieldPreserve) => {
		return (fieldPreserve !== void 0 ? fieldPreserve : this.preserve) ?? true;
	};
	registerField = (entity) => {
		this.fieldEntities.push(entity);
		const namePath = entity.getNamePath();
		this.notifyWatch([namePath]);
		if (entity.props.initialValue !== void 0) {
			const prevStore = this.store;
			this.resetWithFieldInitialValue({
				entities: [entity],
				skipExist: true
			});
			this.notifyObservers(prevStore, [entity.getNamePath()], {
				type: "valueUpdate",
				source: "internal"
			});
		}
		return (isListField, preserve, subNamePath = []) => {
			this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
			if (!this.isMergedPreserve(preserve) && (!isListField || subNamePath.length > 1)) {
				const defaultValue = isListField ? void 0 : this.getInitialValue(namePath);
				if (namePath.length && this.getFieldValue(namePath) !== defaultValue && this.fieldEntities.every((field) => !matchNamePath(field.getNamePath(), namePath))) {
					const prevStore = this.store;
					this.updateStore(set(prevStore, namePath, defaultValue, true));
					this.notifyObservers(prevStore, [namePath], { type: "remove" });
					this.triggerDependenciesUpdate(prevStore, namePath);
				}
			}
			this.notifyWatch([namePath]);
		};
	};
	dispatch = (action) => {
		switch (action.type) {
			case "updateValue": {
				const { namePath, value } = action;
				this.updateValue(namePath, value);
				break;
			}
			case "validateField": {
				const { namePath, triggerName } = action;
				this.validateFields([namePath], { triggerName });
				break;
			}
		}
	};
	notifyObservers = (prevStore, namePathList, info) => {
		if (this.subscribable) {
			const mergedInfo = {
				...info,
				store: this.getFieldsValue(true)
			};
			this.getFieldEntities().forEach(({ onStoreChange }) => {
				onStoreChange(prevStore, namePathList, mergedInfo);
			});
		} else this.forceRootUpdate();
	};
	/**
	* Notify dependencies children with parent update
	* We need delay to trigger validate in case Field is under render props
	*/
	triggerDependenciesUpdate = (prevStore, namePath) => {
		const childrenFields = this.getDependencyChildrenFields(namePath);
		if (childrenFields.length) this.validateFields(childrenFields, { delayFrame: true });
		this.notifyObservers(prevStore, childrenFields, {
			type: "dependenciesUpdate",
			relatedFields: [namePath, ...childrenFields]
		});
		return childrenFields;
	};
	updateValue = (name, value) => {
		const namePath = getNamePath(name);
		const prevStore = this.store;
		this.updateStore(set(this.store, namePath, value));
		this.notifyObservers(prevStore, [namePath], {
			type: "valueUpdate",
			source: "internal"
		});
		this.notifyWatch([namePath]);
		const childrenFields = this.triggerDependenciesUpdate(prevStore, namePath);
		const { onValuesChange } = this.callbacks;
		if (onValuesChange) {
			const changedValues = cloneByNamePathList(this.store, [namePath]);
			const allValues = this.getFieldsValue();
			onValuesChange(changedValues, set(allValues, namePath, get(changedValues, namePath)));
		}
		this.triggerOnFieldsChange([namePath, ...childrenFields]);
	};
	setFieldsValue = (store) => {
		this.warningUnhooked();
		const prevStore = this.store;
		if (store) {
			const nextStore = merge(this.store, store);
			this.updateStore(nextStore);
		}
		this.notifyObservers(prevStore, null, {
			type: "valueUpdate",
			source: "external"
		});
		this.notifyWatch();
	};
	setFieldValue = (name, value) => {
		this.setFields([{
			name,
			value,
			errors: [],
			warnings: [],
			touched: true
		}]);
	};
	getDependencyChildrenFields = (rootNamePath) => {
		const children = /* @__PURE__ */ new Set();
		const childrenFields = [];
		const dependencies2fields = new NameMap();
		/**
		* Generate maps
		* Can use cache to save perf if user report performance issue with this
		*/
		this.getFieldEntities().forEach((field) => {
			const { dependencies } = field.props;
			(dependencies || []).forEach((dependency) => {
				const dependencyNamePath = getNamePath(dependency);
				dependencies2fields.update(dependencyNamePath, (fields = /* @__PURE__ */ new Set()) => {
					fields.add(field);
					return fields;
				});
			});
		});
		const fillChildren = (namePath) => {
			(dependencies2fields.get(namePath) || /* @__PURE__ */ new Set()).forEach((field) => {
				if (!children.has(field)) {
					children.add(field);
					const fieldNamePath = field.getNamePath();
					if (field.isFieldDirty() && fieldNamePath.length) {
						childrenFields.push(fieldNamePath);
						fillChildren(fieldNamePath);
					}
				}
			});
		};
		fillChildren(rootNamePath);
		return childrenFields;
	};
	triggerOnFieldsChange = (namePathList, filedErrors) => {
		const { onFieldsChange } = this.callbacks;
		if (onFieldsChange) {
			const fields = this.getFields();
			/**
			* Fill errors since `fields` may be replaced by controlled fields
			*/
			if (filedErrors) {
				const cache = new NameMap();
				filedErrors.forEach(({ name, errors }) => {
					cache.set(name, errors);
				});
				fields.forEach((field) => {
					field.errors = cache.get(field.name) || field.errors;
				});
			}
			const changedFields = fields.filter(({ name: fieldName }) => containsNamePath(namePathList, fieldName));
			if (changedFields.length) onFieldsChange(changedFields, fields);
		}
	};
	validateFields = (arg1, arg2) => {
		this.warningUnhooked();
		let nameList;
		let options;
		if (Array.isArray(arg1) || typeof arg1 === "string" || typeof arg2 === "string") {
			nameList = arg1;
			options = arg2;
		} else options = arg1;
		const provideNameList = !!nameList;
		const namePathList = provideNameList ? nameList.map(getNamePath) : [];
		const finalValueNamePathList = [...namePathList];
		const promiseList = [];
		const TMP_SPLIT = String(Date.now());
		const validateNamePathList = /* @__PURE__ */ new Set();
		const { recursive, dirty } = options || {};
		this.getFieldEntities(true).forEach((field) => {
			const fieldNamePath = field.getNamePath();
			if (!provideNameList) {
				if (!field.isList() || !namePathList.some((name) => matchNamePath(name, fieldNamePath, true))) finalValueNamePathList.push(fieldNamePath);
				namePathList.push(fieldNamePath);
			}
			if (!field.props.rules || !field.props.rules.length) return;
			if (dirty && !field.isFieldDirty()) return;
			validateNamePathList.add(fieldNamePath.join(TMP_SPLIT));
			if (!provideNameList || containsNamePath(namePathList, fieldNamePath, recursive)) {
				const promise = field.validateRules({
					validateMessages: {
						...defaultValidateMessages,
						...this.validateMessages
					},
					...options
				});
				promiseList.push(promise.then(() => ({
					name: fieldNamePath,
					errors: [],
					warnings: []
				})).catch((ruleErrors) => {
					const mergedErrors = [];
					const mergedWarnings = [];
					ruleErrors.forEach?.(({ rule: { warningOnly }, errors }) => {
						if (warningOnly) mergedWarnings.push(...errors);
						else mergedErrors.push(...errors);
					});
					if (mergedErrors.length) return Promise.reject({
						name: fieldNamePath,
						errors: mergedErrors,
						warnings: mergedWarnings
					});
					return {
						name: fieldNamePath,
						errors: mergedErrors,
						warnings: mergedWarnings
					};
				}));
			}
		});
		const summaryPromise = allPromiseFinish(promiseList);
		this.lastValidatePromise = summaryPromise;
		summaryPromise.catch((results) => results).then((results) => {
			const resultNamePathList = results.map(({ name }) => name);
			this.notifyObservers(this.store, resultNamePathList, { type: "validateFinish" });
			this.triggerOnFieldsChange(resultNamePathList, results);
		});
		const returnPromise = summaryPromise.then(() => {
			if (this.lastValidatePromise === summaryPromise) return Promise.resolve(this.getFieldsValue(finalValueNamePathList));
			return Promise.reject([]);
		}).catch((results) => {
			const errorList = results.filter((result) => result && result.errors.length);
			const errorMessage = errorList[0]?.errors?.[0];
			return Promise.reject({
				message: errorMessage,
				values: this.getFieldsValue(namePathList),
				errorFields: errorList,
				outOfDate: this.lastValidatePromise !== summaryPromise
			});
		});
		returnPromise.catch((e) => e);
		const triggerNamePathList = namePathList.filter((namePath) => validateNamePathList.has(namePath.join(TMP_SPLIT)));
		this.triggerOnFieldsChange(triggerNamePathList);
		return returnPromise;
	};
	submit = () => {
		this.warningUnhooked();
		this.validateFields().then((values) => {
			const { onFinish } = this.callbacks;
			if (onFinish) try {
				onFinish(values);
			} catch (err) {
				console.error(err);
			}
		}).catch((e) => {
			const { onFinishFailed } = this.callbacks;
			if (onFinishFailed) onFinishFailed(e);
		});
	};
};
function useForm(form) {
	const formRef = import_react.useRef(null);
	const [, forceUpdate] = import_react.useState({});
	if (!formRef.current) {
		if (form) formRef.current = form;
		else {
			const forceReRender = () => {
				forceUpdate({});
			};
			formRef.current = new FormStore(forceReRender).getForm();
		}
	}
	return [formRef.current];
}
//#endregion
//#region node_modules/@rc-component/form/es/FormContext.js
var FormContext = /*#__PURE__*/ import_react.createContext({
	triggerFormChange: () => {},
	triggerFormFinish: () => {},
	registerForm: () => {},
	unregisterForm: () => {}
});
var FormProvider = ({ validateMessages, onFormChange, onFormFinish, children }) => {
	const formContext = import_react.useContext(FormContext);
	const formsRef = import_react.useRef({});
	return /*#__PURE__*/ import_react.createElement(FormContext.Provider, { value: {
		...formContext,
		validateMessages: {
			...formContext.validateMessages,
			...validateMessages
		},
		triggerFormChange: (name, changedFields) => {
			if (onFormChange) onFormChange(name, {
				changedFields,
				forms: formsRef.current
			});
			formContext.triggerFormChange(name, changedFields);
		},
		triggerFormFinish: (name, values) => {
			if (onFormFinish) onFormFinish(name, {
				values,
				forms: formsRef.current
			});
			formContext.triggerFormFinish(name, values);
		},
		registerForm: (name, form) => {
			if (name) formsRef.current = {
				...formsRef.current,
				[name]: form
			};
			formContext.registerForm(name, form);
		},
		unregisterForm: (name) => {
			const newForms = { ...formsRef.current };
			delete newForms[name];
			formsRef.current = newForms;
			formContext.unregisterForm(name);
		}
	} }, children);
};
//#endregion
//#region node_modules/@rc-component/form/es/Form.js
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
var Form = (props, ref) => {
	const { name, initialValues, fields, form, preserve, children, component: Component = "form", validateMessages, validateTrigger = "onChange", onValuesChange, onFieldsChange, onFinish, onFinishFailed, clearOnDestroy, ...restProps } = props;
	const nativeElementRef = import_react.useRef(null);
	const formContext = import_react.useContext(FormContext);
	const [formInstance] = useForm(form);
	const { useSubscribe, setInitialValues, setCallbacks, setValidateMessages, setPreserve, destroyForm } = formInstance.getInternalHooks(HOOK_MARK);
	import_react.useImperativeHandle(ref, () => ({
		...formInstance,
		nativeElement: nativeElementRef.current
	}));
	import_react.useEffect(() => {
		formContext.registerForm(name, formInstance);
		return () => {
			formContext.unregisterForm(name);
		};
	}, [
		formContext,
		formInstance,
		name
	]);
	setValidateMessages({
		...formContext.validateMessages,
		...validateMessages
	});
	setCallbacks({
		onValuesChange,
		onFieldsChange: (changedFields, ...rest) => {
			formContext.triggerFormChange(name, changedFields);
			if (onFieldsChange) onFieldsChange(changedFields, ...rest);
		},
		onFinish: (values) => {
			formContext.triggerFormFinish(name, values);
			if (onFinish) onFinish(values);
		},
		onFinishFailed
	});
	setPreserve(preserve);
	const mountRef = import_react.useRef(null);
	setInitialValues(initialValues, !mountRef.current);
	if (!mountRef.current) mountRef.current = true;
	import_react.useEffect(() => () => destroyForm(clearOnDestroy), []);
	let childrenNode;
	const childrenRenderProps = typeof children === "function";
	if (childrenRenderProps) childrenNode = children(formInstance.getFieldsValue(true), formInstance);
	else childrenNode = children;
	useSubscribe(!childrenRenderProps);
	const prevFieldsRef = import_react.useRef(null);
	import_react.useEffect(() => {
		if (!isSimilar(prevFieldsRef.current || [], fields || [])) formInstance.setFields(fields || []);
		prevFieldsRef.current = fields;
	}, [fields, formInstance]);
	const formContextValue = import_react.useMemo(() => ({
		...formInstance,
		validateTrigger
	}), [formInstance, validateTrigger]);
	const wrapperNode = /*#__PURE__*/ import_react.createElement(ListContext.Provider, { value: null }, /*#__PURE__*/ import_react.createElement(Context.Provider, { value: formContextValue }, childrenNode));
	if (Component === false) return wrapperNode;
	return /*#__PURE__*/ import_react.createElement(Component, _extends({}, restProps, {
		ref: nativeElementRef,
		onSubmit: (event) => {
			event.preventDefault();
			event.stopPropagation();
			formInstance.submit();
		},
		onReset: (event) => {
			event.preventDefault();
			formInstance.resetFields();
			restProps.onReset?.(event);
		}
	}), wrapperNode);
};
//#endregion
//#region node_modules/@rc-component/form/es/hooks/useWatch.js
function stringify(value) {
	try {
		return JSON.stringify(value);
	} catch {
		return Math.random();
	}
}
function useWatch(...args) {
	const [dependencies, _form = {}] = args;
	const options = isFormInstance(_form) ? { form: _form } : _form;
	const form = options.form;
	const [value, setValue] = (0, import_react.useState)(() => typeof dependencies === "function" ? dependencies({}) : void 0);
	const valueStr = (0, import_react.useMemo)(() => stringify(value), [value]);
	const valueStrRef = (0, import_react.useRef)(valueStr);
	valueStrRef.current = valueStr;
	const fieldContext = (0, import_react.useContext)(Context);
	const formInstance = form || fieldContext;
	const isValidForm = formInstance && formInstance._init;
	const { getFieldsValue, getInternalHooks } = formInstance;
	const { registerWatch } = getInternalHooks(HOOK_MARK);
	const triggerUpdate = useEvent((values, allValues) => {
		const watchValue = options.preserve ? allValues ?? getFieldsValue(true) : values ?? getFieldsValue();
		const nextValue = typeof dependencies === "function" ? dependencies(watchValue) : get(watchValue, getNamePath(dependencies));
		if (stringify(value) !== stringify(nextValue)) setValue(nextValue);
	});
	const flattenDeps = typeof dependencies === "function" ? dependencies : JSON.stringify(dependencies);
	(0, import_react.useEffect)(() => {
		if (!isValidForm) return;
		triggerUpdate();
	}, [isValidForm, flattenDeps]);
	(0, import_react.useEffect)(() => {
		if (!isValidForm) return;
		return registerWatch((values, allValues) => {
			triggerUpdate(values, allValues);
		});
	}, [isValidForm]);
	return value;
}
//#endregion
//#region node_modules/@rc-component/form/es/index.js
var RefForm = /* @__PURE__ */ import_react.forwardRef(Form);
RefForm.FormProvider = FormProvider;
RefForm.Field = WrapperField;
RefForm.List = List;
RefForm.useForm = useForm;
RefForm.useWatch = useWatch;
//#endregion
export { List as a, Context as c, useForm as i, useWatch as n, WrapperField as o, FormProvider as r, ListContext as s, RefForm as t };
