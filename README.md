# TOP - Project: Etch-A-Sketch

https://www.theodinproject.com/lessons/foundations-etch-a-sketch

## Learnt About:

### Window.getComputedStyle() vs HTMLElement.style

#### What was I trying to do?
Trying to figure out how to "darken" or "lighten" the background colour of the grid squares.

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style

> HTMLElement.style
> 
> The style read-only property returns the *inline style* of an element in the form of a CSSStyleDeclaration object that contains a list of all styles properties for that element with values assigned for the attributes that are defined in the element's *inline style* attribute.

This was causing me issues when trying to get the background colour of squares that had not been painted yet (i.e. their background was still the default of white).

`event.target.style.backgroundColor` was returning an empty string because the default background colour was being set by a css class.

https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

> Window.getComputedStyle()
> 
> The Window.getComputedStyle() method returns an object containing the values of all CSS properties of an element, after applying active stylesheets and resolving any basic computation those values may contain.
> 
> Individual CSS property values are accessed through APIs provided by the object, or by indexing with CSS property names.

https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyValue

> CSSStyleDeclaration.getPropertyValue()
> 
> The CSSStyleDeclaration.getPropertyValue() method interface returns a string containing the value of a specified CSS property.

To get the background colour rgb value I ended up using: 

```JavaScript
let rgb = getComputedStyle(targetElement).getPropertyValue('background-color');
```

Note: ***targetElement*** was just a function parameter I used, the argument was actually ***event.target*** which was whatever square the mouse clicked on or moved over.


As a work around I probably could have set the inline style background colour when generating each square and then used HTMLElement.style, but this seems like the worse option.