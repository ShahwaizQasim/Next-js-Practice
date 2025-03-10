import CourseCard from "@/comonents/courseCard";

async function Course() {
  let res = await fetch("http://localhost:3000/api/courses");
  res = await res.json();
  console.log(res);

  return (
    <>
      <h1 className="text-center text-3xl pt-4">Courses</h1>
      {
        res?.courses?.map((data) => {
          return <CourseCard key={data.id} item={data} />
        })
      }
    </>
  );
}

export default Course;
