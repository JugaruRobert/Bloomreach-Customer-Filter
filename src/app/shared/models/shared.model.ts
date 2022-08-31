export class Filter {
    name: string;
    event: string;
    rules: FilterRule[];

    constructor(name = DEEFAULT_STEP_NAME,
        event: string = '',
        rules: FilterRule[] = []) {
        this.name = name;
        this.event = event;
        this.rules = rules;
    }

    copy(): Filter {
        const filterCopy = JSON.parse(JSON.stringify(this));
        return Object.assign(new Filter(), filterCopy);
    }
}

export class FilterRule {
    attribute: string;
    operator: string;
    value: string | number | Array<number>;

    constructor (attribute = '', operator = '', value = '') {
        this.attribute = attribute;
        this.operator = operator;
        this.value = value;
    }
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
}

export interface CustomerEventResponse {
    events: CustomerEvent[];
}

export interface CustomerEvent {
    type: string;
    properties: EventProperty[];
}

export interface EventProperty {
    property: string;
    type: string;
}

export interface OperatorTab {
    icon: string;
    title: string;
    options: string[];
}

export const OPERATOR_TABS: OperatorTab[] = [
    {
        icon: 'title',
        title: 'string',
        options: [
            'equals',
            'does not equal',
            'contains',
            'does not contain'
        ]
    },
    {
        icon: 'tag',
        title: 'number',
        options: [
            'equal to',
            'in between',
            'less than',
            'greater than'
        ]
    }
];

export const DEEFAULT_STEP_NAME = 'Unnamed Step';
