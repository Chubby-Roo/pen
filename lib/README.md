# Methods
these are the methods that makes pen what it is.


## main: pen
  returns the main object

## Class
  Handles the class takes one parameter which is a string.

## Id
  Handles the id takes one parameter which is a string.

## Html
  Handles the innerHTML takes two parameters
  if the element that is being handled has the tag name of input or textarea
  then it'll change the value instead of the innerHTML
  if no parameter is passed then it will only return the innerHTML
  or the value again checking for the tag name.
  example:
  ```js
  pen("p").Html("text") // <p>text</p>
  pen("input").Html("text") // <input>text</input>
  ```
  if the second parameter is passed it must be a boolean
  if it's false then it'll overwrite the text that is already set
  else if it's true then it'll append to the text that is already set.

## Css
  Handles the style, takes two parameters. Secondary parameter is optional if first parameter is an object
  If the first parameter is an object then all values from it's parent are parsed
  example:
  ```json
  {
    "background-color": "rgba(255,55,55,0.5)"
  }
  ```
  But if the first parameter is a string then the second parameter is parsed
  example:
  ```js
  pen("p").Css("background-color", "rgba(255,255,55,0.5)");
  ```

## attr
  Handles the attributes, takes two parameters
  Like the Css method it takes either for the first parameter an object or string
  if it's a string then the second parameter is optionary.
    if the second parameter is not passed then it'll return the rule that was passed on the first parameter
  if it's an object then it'll parse the values in the object

## Remove
  Handles removing the child from it's parent node

## Append
  Handles appending other elements to the main node.
  Takes x parameters and appends them to the main node

## AppendTo
  Handles appending the main node to another element
  takes one parameter.

## On
  Adds an eventListener to the main node, takes three parameters
  parameter 1: string
  parameter 2: function
  parameter 3: boolean
  read the documentation on addEventListener: [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

## Type
  checks as to what is passed what it is.. since typeof is broken.

## pen.options
  the options for pen:
  auto append
    default is false
    if set to true then it'll automatically append the main node to what is set as normally append to

  to selector
    default is false
    if set to true then it'll change pen's parser to be a selector instead of a creator

  select all
    default is false
    if set to true then if to selector is true then it'll change pen to select all elements from the css selector passed

  debug mode
    default is false
    if set to true then it'll activate debug mode.

  normally append to
    default is 'body'
    if set to 'head' then it'll append to the head
    this can also be changed to a different element
    but that must be an element

## return Element
  returns the element that is being handled
  to allow this to happen:
  ```js
  var p = pen("p").Class("moo").returnElement()
  ```
  NOTE: ONCE THIS IS CALLED IT CANNOT CHAIN

## error
  developmental purposes.

## set Options
  takes two parameters like css and attr
