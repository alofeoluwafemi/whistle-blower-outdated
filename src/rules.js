import _ from "underscore";
/**
 * Available Validation rules
 */

//  accepted,
//  alpha,
//  alpha_dash,
//  alpha_num,
//  alpha_space,
//  before,
//  between,
//  confirmed,
//  contains,
//  date,
//  email,
//  equal,
//  file,
//  max,
//  min,
//  not_equal
//  numeric,
//  regex
//  required,
//  size,
//  url,


export default
{
    accepted: function(value)
    {
        value = value.toString();

        var found = ['yes','on','1','true'].indexOf(value);

        return found != -1;
    },

    alpha: function(value)
    {
        return /^[a-zA-Z]+$/.test(value);
    },

    alpha_dash: function(value)
    {
        return /^[a-zA-Z\-]+$/.test(value);
    },

    alpha_num: function(value)
    {
        return /^\w+$/.test(value);
    },

    alpha_space: function(value)
    {
        return /^[a-zA-Z\s]+$/.test(value);
    },

    required: function(value)
    {
        return !_.isEmpty(value);
    },

    before: function(value,date)
    {
        return false;
    }

};