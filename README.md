# Whistle-Blower.js

## A Simple Javascript Validation Library

### Installation
```
npm install --
```

### Available rules
- accepted,
- alpha,
- alpha_dash,
- alpha_num,
- alpha_space,
- before,
- between,
- confirmed,
- contains,
- date,
- email,
- equal,
- file,
- max,
- min,
- not_equal
- numeric,
- regex
- required,
- size,
- url,

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
_w(form,options).validate(rules,messages);
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
            password: ['required','alpha_num','alpha_space']
        };
        _w(form,{disabled: true}).validate(rules);
        return false;
    });
```