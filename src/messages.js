export default
{
    accepted    : 'The {attribute} must be accepted',
    alpha       : 'The {attribute} may only contain letters.',
    alpha_dash  : 'The {attribute} may only contain letters, numbers, and dashes.',
    alpha_num   : 'The {attribute} may only contain letters and numbers.',
    alpha_space : 'The {attribute} may only contain letters and spaces.',
    before      : 'The {attribute} must be a date before {date}.',
    between     :
    {
        file    : 'The {attribute} must be between {min} and {max} kilobytes.',
        numeric : 'The {attribute} must be between {min} and {max}.',
        string  : 'The {attribute} must be between {min} and {max} characters.',
        array   : 'The {attribute} must have between {min} and {max} items.'
    },
    confirmed   : 'The {attribute} confirmation does not match.',
    contains    : 'The {attribute} does not contain some required values.',
    date        : 'The {attribute} is not a valid date.',
    email       : 'The {attribute} must be a valid email address.',
    ip          : 'The {attribute} must be a valid IP address.',
    max         :
    {
        file    : 'The {attribute} must be maximum size of {max} kilobytes.',
        numeric : 'The {attribute} must not be greater than {max}.',
        string  : 'The {attribute} must be maximum of {max} characters.',
        array   : 'The {attribute} must not contain more than {max} items.'
    },
    min         :
    {
        file    : 'The {attribute} must be minimum size of {min} kilobytes.',
        numeric : 'The {attribute} must not be less than {min}.',
        string  : 'The {attribute} must be minimum of {min} characters.',
        array   : 'The {attribute} must not contain less than {min} items.'
    },
    not_contains: 'The {attribute} should not contain some values.',
    regex       : 'The {attribute} format is invalid.',
    required    : 'The {attribute} field is required',
    size        :
    {
        'numeric' : 'The {attribute} must be {size}.',
        'file'    : 'The {attribute} must be {size} kilobytes.',
        'string'  : 'The {attribute} must be {size} characters.',
        'array'   : 'The {attribute} must contain {size} items.'
    },
    url         : 'The {attribute} format is invalid.'
}