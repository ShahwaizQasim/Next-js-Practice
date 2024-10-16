const course = [
  {
    id: 1,
    title: "Mobile Development",
    duration: "6 months",
  },
  {
    id: 2,
    title: "Web Development",
    duration: "6 months",
  },
  {
    id: 3,
    title: "Graphic Designing",
    duration: "4 month",
  },
];

export async function GET(request) {
  return Response.json({
    courses: course,
    msg: "Course Fetched Successfully",
  });
}
