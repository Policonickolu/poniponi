
# Usage

For setting the program

`npm install`

For running with a input file

`npm start roller_coaster.hard`

# algorithm

I use a cache system to memorize for each group, the number of seats occupied if the group is the first to get on the train.

So, the complexity is only O(n) (the number of ride per day), because for each ride, I already know the earning.