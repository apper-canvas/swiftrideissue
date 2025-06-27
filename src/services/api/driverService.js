import mockDrivers from '@/services/mockData/drivers.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DriverService {
  constructor() {
    this.drivers = [...mockDrivers];
  }

  async getAll() {
    await delay(300);
    return [...this.drivers];
  }

  async getById(id) {
    await delay(200);
    const driver = this.drivers.find(d => d.Id === parseInt(id));
    if (!driver) {
      throw new Error('Driver not found');
    }
    return { ...driver };
  }

  async create(driverData) {
    await delay(400);
    const newId = Math.max(...this.drivers.map(d => d.Id), 0) + 1;
    const newDriver = {
      Id: newId,
      ...driverData
    };
    this.drivers.push(newDriver);
    return { ...newDriver };
  }

  async update(id, updateData) {
    await delay(250);
    const index = this.drivers.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Driver not found');
    }
    this.drivers[index] = { ...this.drivers[index], ...updateData };
    return { ...this.drivers[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.drivers.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Driver not found');
    }
    this.drivers.splice(index, 1);
    return true;
  }
}

export const driverService = new DriverService();