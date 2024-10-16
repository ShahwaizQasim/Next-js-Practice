

export default function CourseCard({ item }) {
  return (
    <center>
    <div className="p-2">
      <h1
        className="font-bold"
        style={{
          fontSize: "1.5rem",
        }}
      >
        {item?.title}
      </h1>
      <h1>{item?.duration}</h1>
    </div>
    </center>
  );
}
