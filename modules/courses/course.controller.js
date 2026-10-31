const CourseModel = require('./course.model');

const getCourses = (req, res) => {
  try {
    const courses = CourseModel.getAll();
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCourseById = (req, res) => {
  try {
    const course = CourseModel.getById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCourse = (req, res) => {
  try {
    const { title, categoryId, price, instructor } = req.body;

    if (!title || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error: Title and categoryId are required'
      });
    }

    const newCourse = CourseModel.create({
      title,
      categoryId,
      price: price || 0.0,
      instructor: instructor || 'Unknown'
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: newCourse
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCourse = (req, res) => {
  try {
    const { title, categoryId, price, instructor } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Validation Error: Title is required' });
    }
    const updated = CourseModel.update(req.params.id, { title, categoryId, price, instructor });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCourse = (req, res) => {
  try {
    const success = CourseModel.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };