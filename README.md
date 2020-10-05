
# Usage

For setting the program

`npm install`

For running with the first input file

`npm start roller_coaster.hard`

And the second file

`npm start roller_coaster.harder`

# algorithm optimization

I use a cache system to memorize for each group, the number of seats occupied when this group is the first to get on the train.

So, the complexity is only O(n) (the number of ride per day), because for each ride, I already know the earning.

I also check if there is a loop of trains settings, when a group is the first to get on the train for the second time. We assume the earning is the same and doesn't have to be computed again.

# results

For the first input file, we get 8974489271113753 which is the expected result.

For the second input file, we get 89744892599970700, but 89744892714152289 was expected. 
I didn't found what cause this gap