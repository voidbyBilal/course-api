let courses = [
  { id: '101', title: 'Node.js Masterclass', categoryId: '1', price: 49.99, instructor: 'John Doe' },
  { id: '102', title: 'Python Bootcamp', categoryId: '2', price: 39.99, instructor: 'Jane Smith' }
];

class CourseModel {
  static getAll() { return courses; }
  static getById(id) { return courses.find(c => c.id === id); }
  static create(data) {
    const newCourse = { id: Date.now().toString(), ...data };
    courses.push(newCourse);
    return newCourse;
  }
  static update(id, data) {
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return null;
    courses[index] = { id, ...data };
    return courses[index];
  }
  static delete(id) {
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return false;
    courses.splice(index, 1);
    return true;
  }
}

module.exports = CourseModel;