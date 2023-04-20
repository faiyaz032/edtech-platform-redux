export default function sumMarks(marksArray, userId) {
  return marksArray.reduce((acc, curr) => {
    if (curr.student_id === userId) {
      acc = acc + +curr.mark;
    }
    return acc;
  }, 0);
}
