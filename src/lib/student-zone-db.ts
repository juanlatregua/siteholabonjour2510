import database from "@/data/student-zone-db.json";

export type StudentRoute = "preparacion-examen" | "conversacion";

export type StudentRecord = {
  id: string;
  name: string;
  email: string;
  route: StudentRoute;
  level: string;
  coach: string;
};

export type StudentMaterial = {
  id: string;
  title: string;
  type: string;
  url: string;
};

export type StudentLesson = {
  id: string;
  studentId: string;
  date: string;
  durationMinutes: number;
  mode: string;
  focus: string;
  notes: string;
  materials: StudentMaterial[];
};

export type StudentDashboard = {
  student: StudentRecord;
  lessons: StudentLesson[];
};

const students = database.students as StudentRecord[];
const lessons = database.lessons as StudentLesson[];

export const listStudents = (): StudentRecord[] => {
  return students;
};

export const getStudentById = (studentId: string): StudentRecord | undefined => {
  return students.find((student) => student.id === studentId);
};

export const getLessonsByStudentId = (studentId: string): StudentLesson[] => {
  return lessons
    .filter((lesson) => lesson.studentId === studentId)
    .sort((a, b) => a.date.localeCompare(b.date));
};

export const getStudentDashboard = (studentId: string): StudentDashboard | null => {
  const student = getStudentById(studentId);

  if (!student) {
    return null;
  }

  return {
    student,
    lessons: getLessonsByStudentId(studentId),
  };
};
