import _ from "underscore";
/**
 * Available Validation rules
 */

//  accepted,
//  alpha,
//  alpha_space,
//  equal,
//  array,
//  alpha_dash,
//  contains,
//  not_equal
//  confirmed,
//  date,
//  between,
//  required,
//  min,
//  max,
//  numeric,
//  size,
//  url,
//  email,
//  file,
//  regex

export default
{
    /**
     * Field under validation must
     * be yes,on,1 or true
     *
     * @param value
     */
    accepted: function(value)
    {
        value = value.toString();

        var found = ['yes','on','1','true'].indexOf(value);

        return found != -1;
    },

    alpha_num: function(value)
    {
        return false;
    },

    /**
     * Validate if string or array
     * is not empty
     * @param value
     * @returns {boolean}
     */
    required: function(value)
    {
        return !_.isEmpty(value);
    }

};