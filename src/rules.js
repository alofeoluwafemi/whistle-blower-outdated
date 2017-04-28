import _ from "underscore";
import moment from "moment";

/**
 * Available Validation rules
 */

//  accepted
//  alpha
//  alpha_dash
//  alpha_num
//  alpha_space
//  before
//  between
//  confirmed
//  contains
//  date
//  email
//  equal
//  file
//  max
//  min
//  not_equal
//  numeric
//  regex
//  required
//  size
//  url

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
        if(!moment(value).isValid() || !moment(date).isValid()) return false;

        return moment(value).valueOf() < moment(date).valueOf();
    },

    between: function(value,type,min,max)
    {
        var file,fileSize,number,string;

        //Set default min & max value
        min = min || 0;
        max = max || 1;

        switch (type)
        {
            case 'file':
                if(!window.FileReader) return false;

                file = document.querySelector('input[name=' + _w.validating + ']').files;

                if(_.isUndefined(file) || _.isUndefined(file[0])) return false;

                fileSize = file[0].size; console.log(fileSize);

                //Convert to approximate kb size
                fileSize = Math.ceil(fileSize / 1024);

                return !(fileSize < min || fileSize > max);
                break;
            case 'numeric':
                number = value;

                return !(number < min || fileSize > max);
                break;
            case 'string':
                string = value;

                return !(string.length < min || string.length > max);
                break;
        }

        return false;
    },

    confirmed: function(value,field)
    {
        return false;
    },

    contains: function(value,subject)
    {
        return false;
    },

    date: function(date)
    {
        return moment(date).isValid();
    }

};