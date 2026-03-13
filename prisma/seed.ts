import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding 50+ python errors...');

  const errors = [
    // --- Syntax & Parsing ---
    {
      errorQuery: "SyntaxError: unexpected EOF while parsing",
      whyItHappens: "You probably forgot to close a parenthesis `(`, bracket `[`, or quote `\"` somewhere in your code.",
      howToAvoid: "Always check your pairs! If you open a `(`, make sure there's a matching `)` before running the code.",
      solutionSteps: "1. Look at the line number mentioned in the error.\n2. Check the line right above it, you might have left an open parenthesis or string quote.\n3. Add the missing closing character and save.",
      command: null,
      youtubeCode: "7jR_pXqP34U"
    },
    {
      errorQuery: 'SyntaxError: unterminated string literal (detected at line X) - print("Hello World',
      whyItHappens: "You started typing a string with a quote `\"` but forgot to put the matching quote at the end.",
      howToAvoid: "Whenever you type a quote to start a string, type the closing quote immediately, then write the text inside.",
      solutionSteps: '1. Go to the line with `print("Hello World`\n2. Add the missing quote and parenthesis: `print("Hello World")`',
      command: null,
      youtubeCode: "k9TUPpGqYTo"
    },
    {
      errorQuery: "SyntaxError: invalid syntax",
      whyItHappens: "Python doesn't understand your code. You might have misspelled a keyword, forgotten a colon `:`, or used an operator incorrectly.",
      howToAvoid: "Use an IDE with syntax highlighting to catch these before you run the code.",
      solutionSteps: "1. Check the line with the `^` pointing to the error.\n2. Ensure all keywords are spelled correctly (e.g., `def`, `while`, `True`).\n3. Check if you missed a colon `:` at the end of an `if` or `for` statement.",
      command: null,
      youtubeCode: "S1Wp6cT4kGg"
    },
    {
      errorQuery: "IndentationError: expected an indented block",
      whyItHappens: "Python relies on spaces (indentation) to figure out which code belongs where. You missed adding spaces after a colon `:`.",
      howToAvoid: "Whenever you type a `:` at the end of a line, the next line must be indented (usually by pressing Tab or 4 spaces).",
      solutionSteps: "1. Find the statement ending with `:` that is right before the error line.\n2. Ensure the next line is indented.\n3. Don't mix tabs and spaces!",
      command: null,
      youtubeCode: "zpwqA8YgD18"
    },
    {
      errorQuery: "IndentationError: unexpected indent",
      whyItHappens: "You added spaces or tabs at the beginning of a line where they don't belong.",
      howToAvoid: "Keep code at the same level of logical execution aligned perfectly vertically.",
      solutionSteps: "1. Look at the line causing the error.\n2. Delete the extra spaces at the start of the line so it aligns with the line above it.",
      command: null,
      youtubeCode: "zpwqA8YgD18"
    },
    {
      errorQuery: "TabError: inconsistent use of tabs and spaces in indentation",
      whyItHappens: "You mixed tabs and spaces in your editor. Python gets confused by this.",
      howToAvoid: "Configure your code editor to 'Insert Spaces' when hitting the Tab key.",
      solutionSteps: "1. Select all your code.\n2. Use your editor's 'Convert Indentation to Spaces' feature.\n3. Retype the indents on the failing lines using only spaces.",
      command: null,
      youtubeCode: "zpwqA8YgD18"
    },

    // --- Name / Variable Errors ---
    {
      errorQuery: "NameError: name is not defined",
      whyItHappens: "You tried to use a variable or function that hasn't been created yet, or maybe you misspelled its name.",
      howToAvoid: "Double-check your spelling. Make sure you declare/assign a value to variables before using them.",
      solutionSteps: "1. Find the exact name that the error points to.\n2. Did you misspell it? (e.g., `Count` vs `count`). Python is case-sensitive.\n3. Did you forget to define it earlier?",
      command: null,
      youtubeCode: "M9tInb6TKhA"
    },
    {
      errorQuery: "UnboundLocalError: local variable referenced before assignment",
      whyItHappens: "You are trying to change a variable inside a function, but Python thinks it's a local variable that you haven't assigned anything to yet within that function.",
      howToAvoid: "If you meant to use a global variable, declare it as global inside the function.",
      solutionSteps: "1. If the variable is defined outside the function, add `global your_variable_name` inside the function before using it.\n2. Otherwise, make sure you assign the variable a value locally before checking or modifying it.",
      command: null,
      youtubeCode: "5q_QW0q1zUo"
    },

    // --- Type Errors ---
    {
      errorQuery: "TypeError: can only concatenate str (not \"int\") to str",
      whyItHappens: "You are trying to combine (concatenate) text (string) and numbers (integer) directly using the `+` operator.",
      howToAvoid: "Before adding a number to a string, convert the number into a string using the `str()` function, or use f-strings.",
      solutionSteps: "1. Find where you are using `+`.\n2. Wrap the number variable with `str()`. For example: `\"Age: \" + str(age)`.\n3. Alternatively, use an f-string: `f\"Age: {age}\"`.",
      command: null,
      youtubeCode: "pXW03f5tKKE"
    },
    {
      errorQuery: "TypeError: unsupported operand type(s) for +: 'int' and 'str'",
      whyItHappens: "You tried to add a string to a number. Python doesn't know if you want math addition or text concatenation.",
      howToAvoid: "Make sure you are doing math with two numbers, or concatenation with two strings.",
      solutionSteps: "1. If you want math, convert the string to an integer: `num + int(text_num)`.\n2. If you want text, convert the integer to a string: `str(num) + text`.",
      command: null,
      youtubeCode: "pXW03f5tKKE"
    },
    {
      errorQuery: "TypeError: 'list' object is not callable",
      whyItHappens: "You used parentheses `()` on a list variable instead of brackets `[]`, making Python think you are trying to call a function.",
      howToAvoid: "Always use square brackets `[]` to access items in a list.",
      solutionSteps: "1. Find the variable that is a list.\n2. Change the parentheses `()` next to it to square brackets `[]`. Example: `my_list[0]` instead of `my_list(0)`.",
      command: null,
      youtubeCode: "W8KRzm-HUcc"
    },
    {
      errorQuery: "TypeError: 'int' object is not iterable",
      whyItHappens: "You tried to loop through or unpack a single number as if it were a list or a string.",
      howToAvoid: "Make sure the variable you are looping over (e.g. in a `for` loop) is a list, string, dictionary, or uses the `range()` function.",
      solutionSteps: "1. If you want to loop a specific number of times, use `for i in range(your_number):`.\n2. Do NOT use `for i in your_number:` if `your_number` is an integer.",
      command: null,
      youtubeCode: "k9TUPpGqYTo"
    },
    {
      errorQuery: "TypeError: list indices must be integers or slices, not str",
      whyItHappens: "You tried to access a list element using a string (like a word) instead of a number.",
      howToAvoid: "Lists are ordered by numbers (0, 1, 2). If you want to look up values using text names, use a Dictionary (`{}`) instead.",
      solutionSteps: "1. Check the square brackets after your list.\n2. Ensure the value inside is a whole number (integer).\n3. If you really need string keys, change your data structure to a dictionary.",
      command: null,
      youtubeCode: "W8KRzm-HUcc"
    },

    // --- Value & Index Errors ---
    {
      errorQuery: "ValueError: invalid literal for int() with base 10",
      whyItHappens: "You tried to convert a string to an integer using `int()`, but the string contained letters or decimal points.",
      howToAvoid: "Only use `int()` on strings that contain whole numbers (like \"42\"). Use `float()` if it has decimals.",
      solutionSteps: "1. Print the string before trying to convert it to see what it actually is.\n2. If it's a decimal like '3.14', use `float(your_var)` instead.\n3. If it contains text, you need to strip the text out first.",
      command: null,
      youtubeCode: "k9TUPpGqYTo"
    },
    {
      errorQuery: "IndexError: list index out of range",
      whyItHappens: "You tried to access an item in a list at a position (index) that doesn't exist. E.g., asking for the 5th item in a list of 3 items.",
      howToAvoid: "Remember that lists start counting at 0. So the last item is at index `len(my_list) - 1`.",
      solutionSteps: "1. Check the length of your list using `len(your_list)`.\n2. Make sure the number inside the brackets is strictly less than the length.\n3. If iterating, check your loop conditions.",
      command: null,
      youtubeCode: "1Ea0r5MrtkI"
    },
    {
      errorQuery: "IndexError: string index out of range",
      whyItHappens: "You tried to get a character from a string at a position that extends past the end of the text.",
      howToAvoid: "Like lists, strings are 0-indexed. Check the string length before accessing specific indices.",
      solutionSteps: "1. Check the length of the string with `len()`.\n2. Ensure the character index you want is between 0 and `length - 1`.",
      command: null,
      youtubeCode: "1Ea0r5MrtkI"
    },
    {
      errorQuery: "KeyError",
      whyItHappens: "You asked a dictionary for the value of a key that does not exist in that dictionary.",
      howToAvoid: "Use the dictionary `.get(key, default_value)` method if you aren't sure a key exists.",
      solutionSteps: "1. Check if you misspelled the key string (remember: case sensitive!).\n2. Use `your_dict.get('your_key')` to return `None` instead of crashing if the key is missing.",
      command: null,
      youtubeCode: "daefaLgNkw0"
    },

    // --- File & Import Errors ---
    {
      errorQuery: "FileNotFoundError: [Errno 2] No such file or directory",
      whyItHappens: "Python couldn't find the file you pushed to `open()` or `read()`. The file either doesn't exist, has a different name, or is in a different folder.",
      howToAvoid: "Ensure the file name perfectly matches (including extensions like .txt or .csv) and verify the folder path.",
      solutionSteps: "1. Check your spelling of the file name.\n2. Put the file in the exact same folder as your `.py` script, or provide the full absolute path to the file (e.g., `C:/Folder/file.txt`).",
      command: null,
      youtubeCode: "uhvq8jEuQcw"
    },
    {
      errorQuery: "ModuleNotFoundError: No module named",
      whyItHappens: "You tried to `import` a library that isn't installed in your Python environment, or you spelled it wrong.",
      howToAvoid: "Make sure external libraries are installed using `pip install` before you try to import them.",
      solutionSteps: "1. Open your terminal/command prompt.\n2. Type `pip install modulo_name` (replace module_name with the one crashing).\n3. Rerun your script.",
      command: null,
      youtubeCode: "1Ea0r5MrtkI"
    },
    {
      errorQuery: "ImportError: cannot import name",
      whyItHappens: "You successfully imported the module, but tried to import a specific function or class from it that doesn't exist.",
      howToAvoid: "Check the documentation for the module to ensure the function name hasn't changed in newer versions.",
      solutionSteps: "1. Check your spelling of the imported function.\n2. Avoid naming your own python files the same as standard libraries (e.g., don't name your file `math.py`).",
      command: null,
      youtubeCode: "1Ea0r5MrtkI"
    },

    // --- Object & Class Errors ---
    {
      errorQuery: "AttributeError: 'NoneType' object has no attribute",
      whyItHappens: "You tried to call a method or property on a variable that is currently empty (`None`). Usually, a previous function failed and returned `None` instead of the object you expected.",
      howToAvoid: "Add an `if your_variable is not None:` check before interacting with the variable.",
      solutionSteps: "1. Find where the variable was supposed to be assigned a value.\n2. Print the variable right before the crash-line to confirm it is `None`.\n3. Fix the function that was supposed to generate the object.",
      command: null,
      youtubeCode: "i0z_2hEDMIM"
    },
    {
      errorQuery: "AttributeError: module has no attribute",
      whyItHappens: "You tried to access a function inside a module that doesn't exist. Often caused by naming your script the same as the module.",
      howToAvoid: "Never name your own files names like `math.py`, `random.py`, or `turtle.py`.",
      solutionSteps: "1. Verify you spelled the function name right (e.g., `math.sqrt`, not `math.sqr`).\n2. Look at your folder. Did you name your own script the same as the module? Rename it and delete the corresponding `.pyc` file.",
      command: null,
      youtubeCode: "i0z_2hEDMIM"
    },
    {
      errorQuery: "AttributeError: 'list' object has no attribute 'append' (or similar)",
      whyItHappens: "Actually, 'list' DOES have 'append'. If you see something like this, you may have reassigned `list` to be something else, or you are trying to use a string method on a list.",
      howToAvoid: "Know what type of data your variable is holding at any given time.",
      solutionSteps: "1. `print(type(your_variable))` before the error line.\n2. Ensure it is actually the data type you think it is.",
      command: null,
      youtubeCode: "i0z_2hEDMIM"
    },

    // --- Math & System Errors ---
    {
      errorQuery: "ZeroDivisionError: division by zero",
      whyItHappens: "You tried to divide a number by `0`, which is mathematically impossible.",
      howToAvoid: "Before performing division, check if the denominator variable equals 0.",
      solutionSteps: "1. Add a check: `if denominator != 0:` to wrap your division math.\n2. Print out the variables used in the division to see why the bottom one became 0.",
      command: null,
      youtubeCode: "1Ea0r5MrtkI"
    },
    {
      errorQuery: "RecursionError: maximum recursion depth exceeded",
      whyItHappens: "You wrote a function that calls itself (recursion), but it never reaches a base case to stop. It spiraled out of control until Python crashed to save memory.",
      howToAvoid: "Always write your 'Base Case' (an `if` statement that returns without calling the function again) FIRST when writing recursive functions.",
      solutionSteps: "1. Look at your recursive function.\n2. Make sure the inputs are actively approaching the base condition with each call.\n3. Make sure the base case `return` works.",
      command: null,
      youtubeCode: "1Ea0r5MrtkI"
    },
    {
      errorQuery: "MemoryError",
      whyItHappens: "Your script tried to use more RAM than your computer has available. Usually happens when loading massive datasets or creating infinite lists.",
      howToAvoid: "Process files in chunks instead of all at once. Be careful with infinite `while` loops.",
      solutionSteps: "1. Are you appending to a list inside an infinite loop? Fix the loop condition.\n2. If reading a giant file, iterate line-by-line using `for line in file:` instead of `file.read()`.",
      command: null,
      youtubeCode: "k9TUPpGqYTo"
    },
    {
      errorQuery: "KeyboardInterrupt",
      whyItHappens: "You or someone pressed Ctrl+C in the terminal. This tells Python to kill the script immediately.",
      howToAvoid: "If this happens unexpectedly, check if your script is hanging in an infinite loop, causing you to have to manually kill it.",
      solutionSteps: "1. No code fix needed if it was intentional.\n2. If you were trapped in an infinite `while` loop, you need to change the loop condition so it eventually turns `False`.",
      command: null,
      youtubeCode: null
    },

    // --- Common Asserts / Logical Misc ---
    {
      errorQuery: "AssertionError",
      whyItHappens: "An `assert` statement in your code tested something, and the result was `False`.",
      howToAvoid: "Asserts are used for testing. Make sure your function actually outputs the data you are asserting it should.",
      solutionSteps: "1. Look at the variable being asserted.\n2. Print its actual value directly above the assert so you can see why the test failed.",
      command: null,
      youtubeCode: "k9TUPpGqYTo"
    },
    {
      errorQuery: "NotImplementedError",
      whyItHappens: "You are calling a function (often in a base class) that hasn't been written yet. It's essentially a placeholder.",
      howToAvoid: "If you inherit from an abstract class or interface, you must write the code for all of its required methods.",
      solutionSteps: "1. Go to the class you created.\n2. Make sure you define the method that the error is complaining about.",
      command: null,
      youtubeCode: null
    },
    {
      errorQuery: "RuntimeError: dictionary changed size during iteration",
      whyItHappens: "You tried to add or delete keys in a dictionary while looping vertically through that exact same dictionary.",
      howToAvoid: "Never modify a collection directly while looping through it.",
      solutionSteps: "1. Loop over a *copy* of the dictionary keys using `for key in list(my_dict.keys()):`.\n2. Then you can safely delete items from `my_dict` inside the loop.",
      command: null,
      youtubeCode: null
    },

    // Generate remaining basic ones to hit ~50 items quickly...
    // (Combining minor sub-variants)
    { errorQuery: "TypeError: 'str' object does not support item assignment", whyItHappens: "Strings are immutable. You cannot change a specific character by doing `my_str[0] = 'H'`.", howToAvoid: "Build a new string entirely.", solutionSteps: "1. Use slicing or string replacement.\n2. `new_str = 'H' + old_str[1:]`", command: null, youtubeCode: null },
    { errorQuery: "EOFError: EOF when reading a line", whyItHappens: "Your script called `input()` but hit the End Of File. Common when testing automated scripts without providing standard input.", howToAvoid: "Provide the input text when running the file, or wrap input in try/except.", solutionSteps: "Wrap `input()` in a try/except block catching EOFError.", command: null, youtubeCode: null },
    { errorQuery: "StopIteration", whyItHappens: "You called `next()` on a generator or iterator that ran out of items.", howToAvoid: "Use `for` loops which handle this automatically.", solutionSteps: "If calling `next()`, provide a default value: `next(iterator, None)`.", command: null, youtubeCode: null },
    { errorQuery: "KeyError: 0", whyItHappens: "You tried to access a dictionary like a list using an integer index [0], but that key does not exist.", howToAvoid: "Remember dictionaries use keys, not position numbers (unless the keys happen to be numbers).", solutionSteps: "1. Use the actual string key name.\n2. Use `list(my_dict.values())[0]` if you must get the first chronological item.", command: null, youtubeCode: null },
    { errorQuery: "ValueError: too many values to unpack", whyItHappens: "You tried to assign a list/tuple to multiple variables, but there are more items than variables. E.g., `a, b = [1, 2, 3]`", howToAvoid: "Ensure the number of variables exactly matches the length of the list.", solutionSteps: "Count variables on left. Count items on right. Make them match. OR use `*` operator: `a, *rest = [1, 2, 3]`.", command: null, youtubeCode: null },
    { errorQuery: "ValueError: not enough values to unpack", whyItHappens: "The opposite of 'too many values'. You tried `a, b, c = [1, 2]`.", howToAvoid: "Check the size of returned tuples from functions.", solutionSteps: "Make sure you aren't expecting 3 variables when the list only gives you 2.", command: null, youtubeCode: null },
    { errorQuery: "TypeError: missing 1 required positional argument", whyItHappens: "You called a function without giving it all the data it asked for.", howToAvoid: "Look at the `def function_name(arg1, arg2):` definition to see what it requires.", solutionSteps: "1. Look at the function signature.\n2. Pass in the missing argument inside the parentheses when you call it.", command: null, youtubeCode: null },
    { errorQuery: "TypeError: takes 1 positional argument but 2 were given", whyItHappens: "You gave a function too much data. It wasn't prepared to receive that many arguments.", howToAvoid: "Update the function definition to accept more arguments, or pass fewer.", solutionSteps: "Check the function call and remove the extra argument.", command: null, youtubeCode: null },
    { errorQuery: "AttributeError: 'tuple' object has no attribute 'append'", whyItHappens: "Tuples `(1, 2)` are entirely locked. You cannot add, remove, or change items in them.", howToAvoid: "If you need to change data, use a List `[1, 2]` instead of a Tuple.", solutionSteps: "1. Change your parentheses `()` around your data to `[]`.\n2. Now `.append()` will work.", command: null, youtubeCode: null },
    { errorQuery: "TypeError: unsupported operand type(s) for +=: 'int' and 'NoneType'", whyItHappens: "You are trying to increment a number (e.g., `count += 1`), but `count` somehow became `None`.", howToAvoid: "Ensure the variable maintains its integer status.", solutionSteps: "Did a function that modifies `count` forget to `return` the new value? By default functions return `None`.", command: null, youtubeCode: null },
    { errorQuery: "TypeError: must be str, not int", whyItHappens: "A function like `write()` for a file expects a string, but you passed a number.", howToAvoid: "Convert numbers to strings before file writing.", solutionSteps: "Use `file.write(str(number))`.", command: null, youtubeCode: null },
    { errorQuery: "ValueError: math domain error", whyItHappens: "You asked the math module to do something impossible via pure math, like a square root of a negative number.", howToAvoid: "Filter negative numbers before calculating square roots or logarithms.", solutionSteps: "Add an `if val < 0:` branch before calling the math function.", command: null, youtubeCode: null },
    { errorQuery: "OSError: [Errno 98] Address already in use", whyItHappens: "You are trying to run a server/app (like Flask or Django) on a port that is already busy.", howToAvoid: "Kill the old server before starting a new one.", solutionSteps: "1. Find the terminal running the previous server and hit Ctrl+C.\n2. Or use your OS task manager to kill python.exe.", command: null, youtubeCode: null },
    { errorQuery: "json.decoder.JSONDecodeError: Expecting value", whyItHappens: "You tried to parse a JSON string using `json.loads()`, but the string was empty or contained incorrectly formatted JSON.", howToAvoid: "Ensure you are feeding it valid JSON format.", solutionSteps: "Print the string explicitly right before parsing it. It might be an HTML error page or empty text.", command: null, youtubeCode: null },
    { errorQuery: "SyntaxError: EOL while scanning string literal", whyItHappens: "Similar to EOF. You missed an end quote on a string, and Python hit the End Of Line.", howToAvoid: "Always close your quotes.", solutionSteps: "Look at the end of the line. Add the missing `'` or `\"`.", command: null, youtubeCode: null },
    { errorQuery: "TypeError: 'float' object cannot be interpreted as an integer", whyItHappens: "You passed a decimal number to a function that requires a whole number, like `range()`.", howToAvoid: "Don't use `/` for division if you need an integer; use `//` for floor division.", solutionSteps: "Convert the float to an integer: `range(int(my_float))` or fix the division.", command: null, youtubeCode: null },
    { errorQuery: "TypeError: string indices must be integers", whyItHappens: "You tried to get a slice of a string using another string", howToAvoid: "Only use ints inside `[ ]` brackets.", solutionSteps: "Change `my_string[\"a\"]` to `my_string.find(\"a\")` or use integers.", command: null, youtubeCode: null },
    { errorQuery: "ValueError: list.remove(x): x not in list", whyItHappens: "You commanded Python to `.remove('apple')` from a list, but 'apple' wasn't actually in the list.", howToAvoid: "Check if the item exists first.", solutionSteps: "Wrap it with: `if 'apple' in my_list: my_list.remove('apple')`.", command: null, youtubeCode: null },
    { errorQuery: "TypeError: 'dict' object is not callable", whyItHappens: "You put `()` next to a dictionary name instead of `[]` to access a key.", howToAvoid: "Dictionaries only use `[]` or `.get()`.", solutionSteps: "Change `my_dict('key')` to `my_dict['key']`.", command: null, youtubeCode: null },
    { errorQuery: "TypeError: '<' not supported between instances of 'str' and 'int'", whyItHappens: "You tried to compare if a word is less than a number.", howToAvoid: "Only compare numbers to numbers, and words to words.", solutionSteps: "Convert the string to int if it holds numeric text.", command: null, youtubeCode: null },
    { errorQuery: "ModuleNotFoundError: No module named 'cv2'", whyItHappens: "OpenCV is not installed.", howToAvoid: "Install OpenCV.", solutionSteps: "`pip install opencv-python` in your terminal.", command: "pip install opencv-python", youtubeCode: null },
    { errorQuery: "ModuleNotFoundError: No module named 'pandas'", whyItHappens: "Pandas is not installed.", howToAvoid: "Install Pandas.", solutionSteps: "`pip install pandas` in your terminal.", command: "pip install pandas", youtubeCode: null },
    { errorQuery: "ModuleNotFoundError: No module named 'numpy'", whyItHappens: "Numpy is not installed.", howToAvoid: "Install Numpy.", solutionSteps: "`pip install numpy` in your terminal.", command: "pip install numpy", youtubeCode: null },
    { errorQuery: "ModuleNotFoundError: No module named 'requests'", whyItHappens: "Requests is not installed.", howToAvoid: "Install Requests.", solutionSteps: "`pip install requests` in your terminal.", command: "pip install requests", youtubeCode: null }
  ];

  for (const e of errors) {
    await prisma.errorEntry.upsert({
      where: { errorQuery: e.errorQuery },
      update: e,
      create: e,
    });
  }
  console.log('Successfully seeded errors.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
