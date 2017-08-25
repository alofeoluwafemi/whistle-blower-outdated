# *Whistle-Blower.js*

## A Simple Javascript Validation Library

:fire: Inspired by [laravel](https://laravel.com/docs/5.4/validation) validator library  

Contents
--------
* [Installation](#installation)  
* [Available Options](#available-options)  
* [Available Rules](#available-rules)  
* [Basic Usage](#basic-usage)  
* [Examples](#example-usage)  
* [Adding Custom Rules](#adding-custom-rules)  
* [Contribute](#contribute)  


### Installation

**Installing using npm**  
 1. Install using ```npm install --save whistle-blower```  
 2. Include library using webpack or gulp.  
 3. Require whistle-blower.js in your code `require("whistle-blower")`;

**NB: laravel 5.4** in your webpack.mix.js file simply do  
 ```javascript
 mix.js(['resources/assets/js/app.js',], 'public/js').extract(['whistle-blower']);`
 ```
 The `_w` object becomes available to you globally.
     
**Build (compressed)**    
 1. Download and unzip the repository.  
 2. Copy dist/whistle.js into your project where your scripts are loaded, am guessing your public folder.  
 3. Include it on your page via js script tag. 
 ```javascript 
 <script src="project-dir-path/whistle.js"></script>
 ``` 

### Available Options

<table>
    <thead>
        <th>Option</th>
        <th>Default</th>
        <th>Type</th>
        <th>Desc</th>
    </thead>
    <tbody>
        <tr>
            <td>disabled</td>
            <td>false</td>
            <td>bool</td>
            <td>if true, disabled fields will also be serialized</td>
        </tr>
        <tr>
            <td>empty</td>
            <td>false</td>
            <td>bool</td>
            <td>if true, empty fields will also be serialized</td>
         </tr>
    </tbody>
</table>

### Available rules

There a suite of default validation rules which you can take advantage of, to validate string,number,array,url,email,file and more. whistle-blower.js uses the name attributes of elements from the form passed to it to select fields to validate.  

>*whistle-blower.js* also provides a way for developer to extend and add custom **validation rule** and **message**, this will be discussed shortly.

**accepted**  
The field under validation must be yes, on, 1, or true.  

**alpha**  
The field under validation must be entirely alphabetic characters. `e.g 'John'`  

**alpha_dash**  
The field under validation may have alpha-numeric characters, as well as dashes and underscores. `e.g 'John-Doe'`

**alpha_num**  
The field under validation must be entirely alpha-numeric characters. `e.g 'john_doe99'`


**alpha_space**  
The field under validation must be entirely alpha and space. Good for validating full name `e.g John Doe`  
 

**before:date**  
The field under validation must be a date preceding the given date.  

Accepts any of the below date format
  
```javascript
2013-02-08T09            # An hour time part separated by a T  
2013-02-08 09            # An hour time part separated by a space  
2013-02-08 09:30         # An hour and minute time part  
2013-02-08 09:30:26      # An hour, minute, and second time part  
2013-02-08 09:30:26.123  # An hour, minute, second, and millisecond time part  
2013-02-08 24:00:00.000  # hour 24, minute, second, millisecond equal 0 means next day at midnight   
20130208T080910,123      # Short date and time up to ms, separated by comma  
20130208T080910.123      # Short date and time up to ms  
20130208T080910          # Short date and time up to seconds  
20130208T0809            # Short date and time up to minutes  
20130208T08              # Short date and time, hours only  

example usage:  

before:2017-02-12  
```

**between:min:max**  
The field under validation must have a size between the given min and max. 
 
 ```javascript
 example usages: 
 
 'between:file:30:38'   #file must be between 30 - 38 kilobytes   
 'between:string:15:25' #string must be length between 15 - 25 characters  
 'between:numeric:8:12'  #must be number between 8 and 12
 ```

**confirmed**  
The field under validation must have a matching field of foo_confirmation.  
For example, if the field under validation is password, a matching password_confirmation field must be present in the input, and equal the value of password field.

**contains:z:b**  
The field under validation must contain the given list of values.Usually suitable for array fields.  

```javascript
 example usage: 
 
 payment_methods: ['required','contains:payoneer:direct'] 
 ```

**date**  
The field under validation must be a valid date.  

Accept formats from any of the given formats as [before](#before:date) validation rule

**email**  
The field under validation must be formatted as an e-mail address.

**equal:field**  
Field under validation must have a value equal to the given field 


**ip**  
Field under validation must be a valid ip address

```javascript
example of valid ip
* 115.42.150.37  
* 192.168.0.1  
* 110.234.52.124  

example of invalid ip  
* 210.110 – must have 4 octets  
* 255 – must have 4 octets  
* y.y.y.y – only digit has allowed  
* 255.0.0.y – only digit has allowed  
* 666.10.10.20 – digit must between [0-255]  
* 4444.11.11.11 – digit must between [0-255]  
* 33.3333.33.3 – digit must between [0-255  
```

**max**
The field under validation must not be more than max 
 
 ```javascript
 example usages: 
 
 'max:file:30'   	#file must be maximum size of 30 kilobytes.   
 'max:string:15' 	#string must be maximum of 15 characters
 'max:numeric:8:'  	#number must not be greater than 8
 'max:array:3:'  	#must not contain more than 3 items
 ```

**min**
The field under validation must not be less than min.  

*Example usage same as max.*  

**not_contains:c:d:e**  
The field under validation must not be included in the given list of values.Usually suitable for array fields.  

```javascript
 example usage: 
 
  payment_methods: ['required','contains:payoneer:direct','not_contains:paypal:cheque']   
 ```

**numeric**  
The field under validation must be numeric.


**regex:pattern**  
The field under validation must match the given regular expression.


**required**  
The field under validation must not be empty.  

A field is considered "empty" if one of the following conditions are true:  

1. The value is null.  
2. The value is an empty string.  
3. The value is an empty array (fields that are array).

**size**

The field under validation must have a size matching the given value.  
For string data, value corresponds to the number of characters.  
For numeric data, value corresponds to a given integer value.  
For files, size corresponds to the file size in kilobytes.

**url**  

The field under validation must be a valid URL.


### Basic Usage

whistle-blower.js uses the name attributes to select fields to validate.

```javascript
var rules = {  
            start: ['required','before:2017-01-12'],  
            password: ['required'],  
            upload  : ['between:file:30:38']  
        };  

var messages = {
				'start:required': 'is a required field',
				'upload:between': 'kindly upload the correct file size'
                };  
                
_w(form,options).validate(rules,messages).then(function(data)  
{  
	//Validation passes
    //Do whatever
}).catch(function(errors)  
{  
	//Validation fails
    console.log(errors);  
})
```

### Example Usage

#### Basic Usage

```js
 var rules,params;
                
 rules = {
          name: ['required','between:string:20:255'],
          password: ['required']
         };

 params = {
           name: 'whistle blower',
           password: '',
          };
                
 _w(params).validate(rules)
            .then(function() 
            {
                //validation passes
            })
            .catch(function(errors)
            {
                //validation fails
              console.log(errors);
            });
```

#### Example I

```
<form action="" id="form" enctype="multipart/form-data">
    <input type="text" name="username" value="oluwaslim" placeholder="username">
    <br>
    <input type="text" name="date" value="2017-01-11" placeholder="date">
    <br>
    <input type="text" name="slug" value="post-on-next" placeholder="url slug">
    <br>
    <input type="text" name="url" value="http://www.google.com" placeholder="url">
    <br>
    <input type="text" name="mime" value="application/pdf" placeholder="url">
    <br>
    <input type="file" name="upload">
    <br>
    <input type="password" name="password" value="password_" placeholder="password">
    <br>
    <input type="password" name="password_confirmation" value="password_" placeholder="confirm password">
    <br>
    <fieldset>
        <label for="ch1">Direct</label>
        <input type="checkbox" name="payment_method[]" value="direct" id="ch1">
        <br>
        <label for="ch2">Paypal</label>
        <input type="checkbox" name="payment_method[]" value="paypal" checked="checked" id="ch2">
        <br>
        <label for="ch4">Payoneer</label>
        <input type="checkbox" name="payment_method[]" value="payoneer" checked="checked" id="ch4">
        <br>
        <label for="ch3">Cheque</label>
        <input type="checkbox" name="payment_method[]" value="cheque" checked="checked" id="ch3">
    </fieldset>
    <br>
    <select multiple style="width:auto">
        <option selected value="a">Option A</option>
        <option selected value="b">Option B</option>
        <option selected value="c">Option C</option>
    </select>
    <br>
    <button type="submit">Validate</button>
</form>
```

```javascript
var form = document.getElementById('form');  
    form.addEventListener('submit',function(e)
    {  
        e.preventDefault();  
        
         var rules = {
                    date            : ['required','before:2017-01-12','date'],
                    username        : ['required','alpha_space'],
                    password        : ['required','confirmed'],
                    upload          : ['max:file:25'],
                    payment_method  : ['required','contains:payoneer','not_contains:direct'],
                    slug            : ['required','regex:^[a-zA-Z\-]+$'],
                    url             : ['required','url']
                };  
                
         var messages = {'username:required': 'username must be provided'}; 
         
        _w(form,{disabled: true}).validate(rules,messages).then(function(data)  
        {  
        	//Validation passes
            //Do whatever
        }).catch(function(errors)  
        {  
        	//Validation fails
            console.log(errors);  
        });
        
        return false;
    });
```

### Adding Custom Rules

Here we would create a simple validation rule to check if the value of a field is a valid mime type. *whistle-blower.js* provides a convinient way to do this.

```javascript
		/**
         * Validate if value is a valid mime
         *
         * @param value
         * @param mime
         * @returns {boolean}
         */
        customRules =
        {
            mime : function(value,mime)
            {
                var type = ['audio/aac','application/x-abiword','text/css','text/csv'];

                return !(type.indexOf(value) == -1);    //return true if validation passes or false otherwise
            }
        };

        customMessages =
        {
            mime: 'The {attribute} must be a valid mime type'
        };
```

Then we can use it like below:

```javascript
var rules = 
{
  mime : ['required','mime']
};

_w(form)
       .extend(customRules,customMessages)
       .validate(rules,messages)
       .then(function(passed)
            {
                //Validation passes
                //Do whatever
            }).catch(function(errors)
            {
                //Validation fails
                console.log(errors);
            });

  
        return false;
    });
```

**NB:** Several rules can be added at once, order of precedence for adding rule and messages does not matter.Likewise the param passed to the validation rule function would be in the order of value and option passed to rule separated by `:`.  

```javascript
//Example 
{rule : 'mime:param1:param2'}

//Your function would receive
mime : function(value,param1,param2)
```

Your validation message would have access to the following in order of precedence; field name,param1,param2

```javascript
//Example
{mime: 'The {field name} must be a valid mime type but {param1} and {param2} supplied instead'}
```

### Contribute

We would love for you to contribute and hear from you, and would appreciate :+1: if you share this repo. 