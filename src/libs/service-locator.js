/**
 * Instead of having your objects creating a dependency,
 * you can pass the needed dependencies into the object externally.
 * To achieve this, I use a dependency injector (library class ) to pass the dependencies.
 */

class ServiceLocator {
  constructor() {
    this.dependencyMap = {};
    this.dependencyCache = {};
  }

  /**
 * The register method takes in the dependency name and its constructor,
 * then proceeds to add it to the dependencyMap object initialized
 * in your ServiceLocator constructor.
 * @param {string} dependencyName
 * @param {*} constructor
 */
  register(dependencyName, constructor) {
    if (typeof constructor !== 'function') {
      throw new Error(`${dependencyName}: Dependency constructor is not a function`);
    }

    if (!dependencyName) {
      throw new Error('Invalid depdendency name provided');
    }

    this.dependencyMap[dependencyName] = constructor;
  }

  /**
   * The get method retrieves a dependency from the dependencyMap object
   * that matches the name passed in as the function argument.
   * If the requested dependency is not in the cache, it initializes
   * the dependency and adds it to the cache then returns it.
   * @param {string} dependencyName
   * @returns {Object} dependency library
   */
  get(dependencyName) {
    if (this.dependencyMap[dependencyName] === undefined) {
      throw new Error(`${dependencyName}: Attempting to retrieve unknown dependency`);
    }

    if (typeof this.dependencyMap[dependencyName] !== 'function') {
      throw new Error(`${dependencyName}: Dependency constructor is not a function`);
    }

    if (this.dependencyCache[dependencyName] === undefined) {
      const dependencyConstructor = this.dependencyMap[dependencyName];
      const dependency = dependencyConstructor(this);
      if (dependency) {
        this.dependencyCache[dependencyName] = dependency;
      }
    }

    return this.dependencyCache[dependencyName];
  }

  /**
   * The clear method basically just removes all dependencies from the map and from the cache.
   */
  clear() {
    this.dependencyCache = {};
    this.dependencyMap = {};
  }
}

module.exports = new ServiceLocator();
