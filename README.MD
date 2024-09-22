<!--
Hey, thanks for using the awesome-readme-template template.
If you have any enhancements, then fork this project and create a pull request
or just open an issue with the label "enhancement".

Don't forget to give this project a star for additional support ;)
Maybe you can mention me or this repo in the acknowledgements too
-->
<div align="center">
  <h1>Data manipulation with Javascript</h1>
  <p>
    This file takes an array object data and will return a specific format. Please read down further to learn more! 
  </p>
</div>

# My Awesome Project

In this project, I use Javascript to handle and manipulate data nested inside an array object. It will take certain formatted data and return the student id, total avg and avg for school assignments.

**Link to project:** https://github.com/hoken92/js_JSON_manipulation

## How It's Made:

This project's data is in the form of three array objects. Each array object has multiple key, value pairs to be read and digested with Javascript. The getLearnerData function processes all the learner submissions against the school assignment's data.

1. It will first compare all assignment course ids to the course id.
2. Next, it will filter out assignments that are currently due and ones that are not due.
3. After, I used a for loop to iterate through the learner's assignments with a .length to count how many iterations.
4. The loop will set the learner's ID if the current iteration ID does not match, along with resetting a couple of score variables.
5. There is another for loop nested inside that will iterate through the due assignments and if an assignment id matches with the submission id. It will check if the assignment is late and will then calculate the avg score + adding the scores to variables.
6. When the assignment count turn in reaches the length of the assignments due, it will then create key, value pairs to the object and push the object into the array.

**Tech used:** JavaScript

## Optimizations

In the future, I would like to optimize the amount of if statements inside the for loop. I feel like I have to many that tries to filter out some of the data and manipulate the data when it is true. I just wasn't sure how to fully utilize the object.map method. I would like to learn how I can better apply it.

## Lessons Learned:

No matter what your experience level, being an engineer means continuously learning. Every time you build something you always have those _whoa this is awesome_ or _wow I actually did it!_ moments. This is where you should share those moments! Recruiters and interviewers love to see that you're self-aware and passionate about growing.

## Contributors:

- Kenneth Ho
