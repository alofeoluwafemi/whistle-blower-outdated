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
//  ip
//  max
//  min
//  not_contains
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

    before: function(value,date)
    {
        if(!moment(value).isValid() || !moment(date).isValid()) return false;

        return moment(value).valueOf() < moment(date).valueOf();
    },

    between: function(value,type,min,max)
    {
        var file,fileSize,number,string,array;

        //Set default min & max value
        min = min || 0;
        max = max || 1;

        switch (type)
        {
            case 'file':
                if(!window.FileReader) return false;

                file = document.querySelector('input[name=' + _w.validating + ']').files;

                if(_.isUndefined(file) || _.isUndefined(file[0])) return false;

                fileSize = file[0].size;

                //Convert to approximate kb size
                fileSize = Math.ceil(fileSize / 1024);

                return (fileSize >= min && fileSize <= max);
                break;
            case 'numeric':
                number = value;

                return (number >= min && number <= max);
                break;
            case 'string':
                string = value;

                return (string.length >= min && string.length <= max);
                break;
            case 'array':
                array = value;

                return (array.length >= min && array.length <= max);

        }

        console.info('#worried# option ',type,' not available try file,numeric,string,array');

        return false;
    },

    confirmed: function(value)
    {
        var confirm = _w.inputs[_w.validating + '_confirmation'];

        if(_.isUndefined(confirm) || _.isEmpty(confirm)) return false;

        return (value == confirm);
    },

    contains: function(value)
    {
        var payload = [];

        _.each(arguments, function(input,index)
        {
            if(index != 0) payload.unshift(input);
        });

        var intersection = _.intersection(value,payload);

        return intersection.length == payload.length;
    },

    date: function(date)
    {
        return moment(date).isValid();
    },

    email: function(value)
    {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    },

    equal: function(value,subject)
    {
        value   = _.isArray(value)  ? value.sort() : value;
        subject = _.isArray(subject)? subject.sort() : subject;

        return JSON.stringify(value) == JSON.stringify(subject);
    },

    ip: function(value)
    {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
    },

    max: function(value,type,max)
    {
        var payload = _.toArray(arguments);

        payload.pop();
        payload.push(-Infinity);
        payload.push(max);

        return this.rules.between.apply(this,payload);
    },

    min: function(value,type,min)
    {
        var payload = _.toArray(arguments);

        payload.push(Infinity);

        return this.rules.between.apply(this,payload);
    },

    not_contains: function(value)
    {
        var payload = _.toArray(arguments);

        return !this.rules.contains.apply(this,payload);
    },

    numeric: function(value)
    {
        return /^[0-9]+$/.test(value);
    },

    regex: function(value,pattern)
    {
        var regex = new RegExp(pattern);

        return regex.test(value);
    },

    required: function(value)
    {
        return !_.isEmpty(value);
    },

    size: function(value,type,size)
    {
        var file,fileSize,number,string,array;

        //Cohesion of type to Number
        size = Number(size);

        switch (type)
        {
            case 'file':
                if(!window.FileReader) return false;

                file = document.querySelector('input[name=' + _w.validating + ']').files;

                if(_.isUndefined(file) || _.isUndefined(file[0])) return false;

                fileSize = file[0].size;

                //Convert to approximate kb size
                fileSize = Math.ceil(fileSize / 1024);

                return (fileSize == size);
                break;
            case 'numeric':
                number = value;

                return (number == size);
                break;
            case 'string':
                string = value;

                return (string.length == size);
                break;
            case 'array':
                array = value;

                return (array.length == size);
        }

        console.info('#worried# option ',type,' not available try file,numeric,string,array');

        return false;
    },

    url: function(value)
    {
        return /(((http|ftp|https):\/{2})+(([0-9a-z_-]+\.)+(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?))\b/i.test(value);
    }
};