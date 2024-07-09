import { useParams } from "react-router-dom";

const Book = () => {
  const { performanceId } = useParams<{ id: string }>();

  console.log(performanceId);

  return <div>Book</div>;
};

export default Book;
