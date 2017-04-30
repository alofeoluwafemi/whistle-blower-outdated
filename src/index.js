//     Whistle-blower.js 1.0.0
//     http://nexus.com.ng
//     (c) 2017 Alofe Oluwafemi
//     PrimeNexus

import serialize from "form-serialize";
import _ from "underscore";
import rules from "./rules";
import validationMsgs from "./messages";
import {convert$ObjAsJson,deduceOriginalRule,aggregateRulesAndParams} from "./helper"

(function()
{
    var
        root        = this,
        inputs      = {},
        errors      = {},
        messages    = {},
        userMsgs    = {};

    /**
     * Save reference to whistle object
     * @param culprit : object| jquery instance | DOMElement
     * @param options
     * @returns {whistle}
     * @private
     */
    var _w = function(culprit,options)
    {
        options = options || {};

        return new whistle(culprit,options);
    };

    _w.version = '1.0.0';

    /**
     * Field under validation
     * @type {string}
     */
    _w.validating = '';

    _w.rules       = rules;

    _w.messages    = messages;

    /**
     * Reference to the whistle object
     * @param culprit
     * @param options
     * @returns {_w}
     * @private
     */
    var whistle = function(culprit,options)
    {
        var type;

        if(arguments.length > 0)
        {
            _.culprit       = culprit;
            _.culpritType   = type = toString.call(culprit);

            if (culprit instanceof _w) return culprit;

            if (culprit.jquery)                              //Jquery instance
            {
                inputs = convert$ObjAsJson(culprit.serializeArray());
            } else if (type === "[object Object]")            //Instance of Object e.g {}
            {
                inputs = culprit;
            } else if (type === "[object HTMLFormElement]")   //Instance of DOM e.g using document.getElement
            {
                inputs = serialize(culprit, _.extend({hash: true}, options));
            } else {
                console.error('#sad# Cannot handle type of form ', type, ' passed to whistler');
            }

            _w.inputs = inputs;

            return _w;
        }

        console.error('#sad# whistler expects at least one argument');

    };

    /**
     * Extend own property
     * Allows to add custom validation methods
     *
     * @param methods
     * @param messages
     */
    _w.extend = function(methods,messages)
    {
        _.extend(rules,methods);
        _.extend(validationMsgs,messages);

        return this;
    };

    //Export to Window Object
    root._w = _w;

    _w.validate = function(rules,msgs)
    {
        //Empty errors from previous
        //validation
        errors      = {};
        messages    = {};

        _.extend(userMsgs,msgs);

        if(_.isEmpty(rules) || !_.isObject(rules))
        {
            console.error('#sad# No rules supplied for validation');

            return false;
        }

        loopRules(rules);

        return new Promise(function(resolve,reject)
        {
            if(_.isEmpty(errors))
            {
                resolve(true);
            }else
            {
                reject({errors: errors, messages: messages,size: _.size(errors)});
            }
        });
    };

    /**
     * Loop through validation rules
     * @param rules
     */
    function loopRules(rules)
    {
        _.each(rules,function(rule,field)
        {
            if(_.isArray(rule))
            {
                _.each(rule,function(validator)
                {
                    performValidation(validator,field);
                })
            }else
            {
                performValidation(rule,field);
            }
        });
    }

    /**
     * Call validator method
     * @param rule
     * @param field
     */
    function performValidation(rule,field)
    {
        var value,passed,computed,params;

        //Set field under validation
        _w.validating = field;

        //Check if field under validation exist
        if(_.isUndefined(inputs[field])) inputs[field] = "";

        value       = inputs[field];
        computed    = deduceOriginalRule(rule);
        params      = aggregateRulesAndParams(rule);

        if(!_.isUndefined(rules[computed]))
        {
            params.unshift(value);

            //If rule has param
            passed = rules[computed].apply(_w, params);

            //If Validation fails
            if (!passed)
            {
                applyErrors(field, computed);
                applyMessages(field, rule);
            }
        }else
        {
            console.info('#worried# No such rule as ',rule);
        }
    }

    /**
     * Append field error into errors Object
     *
     * Object
     * @param field
     * @param rule
     */
    function applyErrors(field,rule)
    {
        if(!_.isEmpty(errors[field])) errors[field].push(rule);

        if(_.isEmpty(errors[field])) errors[field] =  [rule];
    }

    /**
     * Append field messages into messages Object
     *
     * @param field
     * @param rule
     */
    function applyMessages(field,rule)
    {
        var computed,params,msgIdentifier,message,param;

        computed    = deduceOriginalRule(rule);
        params      = aggregateRulesAndParams(rule);

        //Append field to message
        params.unshift(field);

        msgIdentifier = field + ':' + computed;

        message     = _.isEmpty(userMsgs[msgIdentifier])
            ? (_.isEmpty(validationMsgs[computed]) ? computed : validationMsgs[computed])
            : userMsgs[msgIdentifier];

        if(_.isObject(message))
        {
            var f,t;

            //Swap field and value in params array
            //If validation message is an object
            f = params[0];
            t = params[1];

            params[0] = t;
            params[1] = f;
        }

        //Substitute place holders in error messages
        //with actual values
        for(param in params)
        {
            //Check if nested messages are available else
            //we just simply match it
            if(_.isObject(message))
            {
                message = message[params[param]];
            }else
            {
                message = message.replace(/({[a-z]+})/,params[param]);
            }
        }

        if(!_.isEmpty(messages[field])) messages[field].push(message);

        if(_.isEmpty(messages[field])) messages[field] = [message];
    }

}.call(window));