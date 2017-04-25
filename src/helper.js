import {each,isArray,isUndefined,every} from "underscore";

//Utility functions

function convert$ObjAsJson(objects)
{
    var json,key;

    json = {};

    //Loop through obj and nested
    //values to produce json obj equivalent
    each(objects,function(object)
    {
        key = object.name;

        if(object.name.match(/\[]$/))
        {
            key = key.replace('[]','');

            json[key] = [object.value];
        }else
        {
            if(json[key])
            {
                json[key].push(object.value);
            }else
            {
                json[key] = object.value;
            }
        }

    });

    return json;
}


export {convert$ObjAsJson};