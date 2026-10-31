let categories = [
  { id: '1', name: 'Web Development', description: 'Frontend and Backend technologies' },
  { id: '2', name: 'Data Science', description: 'Python, Machine Learning & AI' }
];

class CategoryModel {
  static getAll() { return categories; }
  static getById(id) { return categories.find(c => c.id === id); }
  static create(data) {
    const newCat = { id: Date.now().toString(), ...data };
    categories.push(newCat);
    return newCat;
  }
  static update(id, data) {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    categories[index] = { id, ...data };
    return categories[index];
  }
  static delete(id) {
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    categories.splice(index, 1);
    return true;
  }
}

module.exports = CategoryModel;