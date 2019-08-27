This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Allows a user to write or copy text into a text area and then highlight it using
different colors. The highlighted portions can be filtered by the user.

## Usage
To start the application execute:

`yarn start`

In a shell inside the root folder.

Copy or write some text into the text area and highlight a portion of it. You can
change the highlighter color by clicking on any of the colors on the top.

After highlighting some text you can see the highlighted portions by toggling
the filters on the second color selection bar.

## Tests
To test the application execute:

`yarn test`

In a shell inside the root folder.

## Notes
Some outstanding questions to which answers were presupposed:
* Can I use a div with contentEditable?
>> I've decided that since the requirements specifically mention a "text area"
   then the challenge was to achieve this using textarea and not a div. Using
   a div would have facilitated the range management since it supports selections.

* What should happen when the text changes?
>> I've decided to clear the highlights which content changes when this happens,
   keeping them on a text that might no longer match the same words and positions
   could be confusing for the user.

* What should happen if two or more highlights overlap?
>> I've decided to keep the original highlights as they're, the last one will
   be visible on top of the others for the overlapping ranges, but the highlight
   data itself will remain unchanged since I don't know what is the expected
   behaviour for this.

* What should happen if the user tries to highlight over an already highlighted area?
>> Since there's no express requirement to be able to modify or erase an existing
   highlight and there's no requirement to allow more than one highlight over the
   same area I've decided to just allow the user to highlight it partially, if the
   range is a strict intersection of the existing highlight's range the system
   keeps the newest highlight, this should be less confusing for the user.

I've also used flow semantics to document properties but didn't include flow at
all because I wasn't sure if that would violate the "no third party libraries" rule.

I've used functional programming whenever possible since I didn't see any requirement
against that.

I didn't fully get what this excerpt from the assignemnt is supposed to mean:

"Additional features like a modal popup on highlighting the text, formatting the text etc."

What is that modal supposed to show? What purpose should it serve? What text should be formatted and why?
Since I couldn't come up with valid answers to those questions I didn't implement anything in that regard. 


## Known issues
The textarea has been set to not resize, this simplifies the management of highlights
otherwise the highlights should have been either removed completely or expanded or
shrinked accordingly.
