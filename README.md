# Whistle-Blower.js

## A Simple Javascript Validation Library

Contents
--------
[Installation](#installation)  
[Available Options](#options)  
[Available Rules](#rules)  
[Usage](#usage)  
[Examples](#examples)  
[Adding Custom Rules](#rules)  
[Contribute](#contribute)  


### Installation
**Installing using npm**  
 1. Install using ```npm install --```  
 2. Require `dist/app.js` using webpack or gulp.

After installing via npm dist/whistle.js should be required using gulp or webpack

**Build (compressed)**    
 1. Download and unzip the repository.  
 2. Copy dist/app.js into your project where scripts are loaded.  
 3. Include it on your page via js script tag. 
 ```javascript 
 <script src="project-dir-path/app.js"></script>
 ``` 

### Available rules

**accepted**  

The field under validation must be yes, on, 1, or true.  

**alpha**  

The field under validation must be entirely alphabetic characters.  

**alpha_dash**  

The field under validation may have alpha-numeric characters, as well as dashes and underscores.

**alpha_num**  

The field under validation must be entirely alpha-numeric characters.


**alpha_space**  

The field under validation must be entirely alpha and space. Good for validating full name e.g John Doe  
 

**before:date**  

The field under validation must be a date preceding the given date.
 Date allows any of the below date format
  
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
example usage before:2017-02-12 
```

**between:min:max**

The field under validation must have a size between the given min and max. 
 
 ```javascript
 example usages  
 'between:file:30:38'   #file must be between 30 - 38 kilobytes   
 'between:string:15:25' #string must be length between 15 - 25 characters  
 'between:number:8:12'  #number must be number between 8 and 12
 ```

**confirmed**


**contains**


- date
- email
- equal
- file
- max
- min
- not_equal
- numeric
- regex
- required
- size
- url

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

### Basic Usage

```javascript
_w(form,options).validate(rules,messages).then(function(data)  
{  
    //Do whatever (validation passed)  
}).catch(function(error)  
{  
    console.log(error);  
})
```

### Example Usage
 
#### Example I

```javascript
var form = document.getElementById('form');  
    form.addEventListener('submit',function(e)
    {  
        e.preventDefault();  
        var rules = {
            username: ['required','alpha_dash','before:2017-02-17'],
            password: ['required','alpha_num','alpha_space'],
        };  
        _w(form,{disabled: true}).validate(rules);  
        return false;  
    });
```