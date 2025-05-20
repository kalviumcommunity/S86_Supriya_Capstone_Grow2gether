const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new student
router.post('/', async (req, res) => {
    try {
        const {
            name,
            email,
            profilePicture,
            skills,
            projects,
            oneLineStatus,
            mood,
            miniGoal,
        } = req.body;

        if (!name || !email ) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student with this email already exists' });
        }

        const newStudent = new Student({
            name,
            email,
            profilePicture,
            skills,
            projects,
            oneLineStatus,
            mood,
            miniGoal,
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





module.exports = router;