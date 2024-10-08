// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const learnerResults = [];

  // Course data
  // 1. capture the courseInfo ID in variable
  const courseInfoID = course.id;

  // checking if assignment course id matches with course id.
  try {
    if (ag.course_id != courseInfoID) {
      throw new Error(
        `The assignment id: ${ag.id} does not match with this course's id: ${courseInfoID}`
      );
    }
  } catch (error) {
    console.log(error);
  }

  //Assignments due
  const deliverables = ag.assignments.filter(function (deliverable) {
    if (deliverable.due_at < "2024-09-20") {
      return true;
    }
  });

  // Assignments that are not due
  const deliverableNotDue = ag.assignments.filter(function (deliverable) {
    if (deliverable.due_at > "2024-09-20") {
      return true;
    }
  });

  //Learner data
  // 1. log id(number), assignment id, submission(date, score)
  let learner = 0;

  // tracks Learner each assignment score
  let totalScoreAgOne = 0;
  let totalScoreAgTwo = 0;

  //tracks total Learner combined score
  let totalScore = 0;

  // tracks combined assignment score
  let totalPossibleScore = 0;
  let assignmentsTurnedIn = 0;

  // Iterating through student assignment submissions
  for (i = 0; i < submissions.length; i++) {
    let students = {};

    // tracks individual assignment turned in
    let assignmentScore = 0;
    // tracks individual assignment
    let possibleScore = 0;
    let newAssignmentTurnedIn = false;

    // Checks if Learner id is 0 or empty
    try {
      if (!submissions[i].learner_id) {
        throw Error(`Submission's Learner ID cannot be empty or 0`);
      }
    } catch (error) {
      console.log(error);
    }

    if (submissions[i].learner_id != learner) {
      learner = submissions[i].learner_id;
      totalScoreAgOne = 0;
      totalScoreAgTwo = 0;
      totalScore = 0;
      totalPossibleScore = 0;
      assignmentsTurnedIn = 0;
    }

    // Iterating through assignment ids to match with student submissions and check if the assignments are late.
    for (j = 0; j < deliverables.length; j++) {
      // Checking if assignments have a possible score of 0
      try {
        if (deliverables[j].points_possible === 0) {
          throw Error(
            `Assignment's cannot have a score of 0. Assignment ID: ${deliverables[j].id} points display: ${deliverables[j].points_possible} points.`
          );
        }
      } catch (error) {
        console.log(error);
      }

      // If assignments id matches with learner's submission id, it will add the score to two variables. One for total avg and one for each assignment average
      if (deliverables[j].id === submissions[i].assignment_id) {
        totalScore += checkLateAssignment(
          deliverables[j].due_at,
          deliverables[j].points_possible,
          submissions[i].submission.submitted_at,
          submissions[i].submission.score
        );
        assignmentScore += checkLateAssignment(
          deliverables[j].due_at,
          deliverables[j].points_possible,
          submissions[i].submission.submitted_at,
          submissions[i].submission.score
        );

        possibleScore += deliverables[j].points_possible;
        totalPossibleScore += deliverables[j].points_possible;
        assignmentsTurnedIn++;
        newAssignmentTurnedIn = true;

        // If an assignment is turned in is true, it will log the assignment score avg to the correct variable
        if (newAssignmentTurnedIn) {
          switch (assignmentsTurnedIn) {
            case 1:
              totalScoreAgOne += calcGradeAvg(assignmentScore, possibleScore);
              break;

            case 2:
              totalScoreAgTwo += calcGradeAvg(assignmentScore, possibleScore);
              break;
          }
        }
      }
    }

    //checks a submission matching with an assignment not due, it'll skip to the next loop
    if (submissions[i].assignment_id === deliverableNotDue[0].id) {
      continue;
    }

    if (assignmentsTurnedIn === deliverables.length) {
      // if assignment count matches to amount of assignments due, it'll calculate the avg and log the id, total avg and assignment averages.
      students.id = learner;
      students[deliverables[0].id] = totalScoreAgOne.toFixed(2);
      students[deliverables[1].id] = totalScoreAgTwo.toFixed(2);
      students.avg = calcGradeAvg(totalScore, totalPossibleScore);
      learnerResults.push(students);
    }
  }

  console.log(`This is the data returned from Course number ${courseInfoID}. The total amount of assignments that were due are ${deliverables.length} assignments. Their due dates were Assignment ${deliverables[0].id}: ${deliverables[0].due_at} and Assignment ${deliverables[1].id}: ${deliverables[1].due_at}.
  
  Below are the total learners and their avg grades for each and total assignments.`);
  return learnerResults;
}

// Calling getLearnerData
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

// Math functions
// 1. avg grade for all assignments submitted per student
function calcGradeAvg(learnerPoints, agPoints) {
  let avg = learnerPoints / agPoints;
  return avg;
}

// 2. date calcution for assignment not due or late, deduct 10% from score
function checkLateAssignment(dueDate, agPoints, subDate, score) {
  let lateGrade;
  if (subDate > dueDate) {
    let deductAmount = agPoints * 0.1;
    return (lateGrade = score - deductAmount);
  } else {
    return score;
  }
}
