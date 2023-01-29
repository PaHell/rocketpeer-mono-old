export interface ValidationRule {
	name: ValidationRuleName;
	translationName: string;
	predicate: (val: string | number, ...args: number[]) => boolean;
}

export enum ValidationRuleName {
	_MissingRuleFunction,
	Required,
	Range,
	Email
}

export const validationRules: ValidationRule[] = [
	{
		name: ValidationRuleName.Required,
		translationName: 'required',
		predicate: (val) => !!val
	},
	{
		name: ValidationRuleName.Email,
		translationName: 'email',
		predicate: (val) => {
			const regExpr =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regExpr.test(String(val).toLowerCase());
		}
	},
	{
		name: ValidationRuleName.Range,
		translationName: 'range',
		predicate: (val, min, max) => {
			return typeof val == 'number'
				? val >= min && val <= max
				: val.length >= min && val.length <= max;
		}
	}
];

export function validate(
	value: string | number,
	ruleArgGroups: [ValidationRuleName, ...number[]][]
): [string, ...number[]][] {
	const invalidRules: [string, ...number[]][] = [];
	for (const ruleArgGroup of ruleArgGroups) {
		const args = ruleArgGroup.slice(1);
		const rule = validationRules.find((o) => o.name === ruleArgGroup[0]);
		if (!rule)
			invalidRules.push([
				`Missing validation object for rule App.General.ValidationRule[${ruleArgGroup[0]}]`
			]);
		else if (!rule.predicate(value, ...args)) invalidRules.push([rule.translationName, ...args]);
	}
	return invalidRules;
}
