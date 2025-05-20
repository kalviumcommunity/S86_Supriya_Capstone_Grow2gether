const Student = require('../models/Student');

// GET all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

// GET a single student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
};

// POST: Create a new student
const createStudent = async (req, res) => {
  try {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newStudent = new Student({ name, email, course });
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
};
