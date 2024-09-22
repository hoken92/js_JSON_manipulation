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

  // AssignmentGroup Data
  // 1. log course id(number)
  // 1. individual assignment
  // 2. log id(number), due dates(string),points(number)
  const deliverables = ag.assignments.filter(function (deliverable) {
    if (deliverable.due_at < "2024-09-20") {
      return true;
    }
  });

  const deliverableNotDue = ag.assignments.filter(function (deliverable) {
    if (deliverable.due_at > "2024-09-20") {
      return true;
    }
  });

  //Learner dataq
  // 1. log id(number), assignment id, submission(date, score)

  let learner = 0;
  let totalScore = 0;
  let possibleScore = 0;
  let assignmentsTurnedIn = 0;

  // Iterating through student assignment submissions
  for (i = 0; i < submissions.length; i++) {
    let students = {};

    if (submissions[i].learner_id === learner) {
    } else {
      learner = submissions[i].learner_id;
      totalScore = 0;
      possibleScore = 0;
      assignmentsTurnedIn = 0;
    }

    // Iterating through assignment ids to match with student submissions and check if the assignments are late.
    for (j = 0; j < deliverables.length; j++) {
      if (deliverables[j].id === submissions[i].assignment_id) {
        totalScore += checkLateAssignment(
          deliverables[j].due_at,
          deliverables[j].points_possible,
          submissions[i].submission.submitted_at,
          submissions[i].submission.score
        );
        possibleScore += deliverables[j].points_possible;
        assignmentsTurnedIn++;
      }
    }

    if (submissions[i].assignment_id === deliverableNotDue[0].id) {
      continue;
    }

    if (assignmentsTurnedIn === deliverables.length) {
      students.id = learner;
      students.avg = calcGradeAvg(totalScore, possibleScore);
      learnerResults.push(students);
    }
    console.log(learner, totalScore);
    console.log(possibleScore);
    console.log(assignmentsTurnedIn);
  }

  //   console.log(students);

  // Math operations
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

  // Error handling
  // 1. possible points being 0
  // 2. assignment group not matching course id
  // 3. etc

  //   const result = [
  //     {
  //       id: 125,
  //       avg: 0.985, // (47 + 150) / (50 + 150)
  //       1: 0.94, // 47 / 50
  //       2: 1.0, // 150 / 150
  //     },
  //     {
  //       id: 132,
  //       avg: 0.82, // (39 + 125) / (50 + 150)
  //       1: 0.78, // 39 / 50
  //       2: 0.833, // late: (140 - 15) / 150
  //     },
  //   ];
  return learnerResults;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

// loops and objects
// array methods - map/reduce/filter

// let studentDeliverables = LearnerSubmissions.map(function (studentGrades) {
//     if (students){
//         students[]
//     } else {
//         if ( )
//     }
//   });
