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
* What should happen when the text changes?
>> I've decided to clear the highlights when this happens, keeping them on a text
   than might no longer match the same words and positions will be confusing for
   the user.

* What should happen if two or more highlights overlap?
>> I've decided to keep the original highlights are they're, the last one will
   be visible on top of the others for the overlapping ranges, but the highlight
   data itself will remain unchanged since I don't know what is the expected
   behaviour for this.

* What should happen if the user tries to highlight over an already highlighted area?
>> Since there's no express requirement to be able to modify or erase an existing
   highlight I've decided to just allow the user to highlight it partially, if the
   range is a strict intersection of the existing highlight's range the system
   keeps the newest highlight.

## Known issues
If the user selects a range that spans more than one line, then the highlight
will be spanning all of those lines completely
