import mockRides from '@/services/mockData/rides.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class RideService {
  constructor() {
    this.rides = [...mockRides];
  }

  async getAll() {
    await delay(300);
    return [...this.rides];
  }

  async getById(id) {
    await delay(200);
    const ride = this.rides.find(r => r.Id === parseInt(id));
    if (!ride) {
      throw new Error('Ride not found');
    }
    return { ...ride };
  }

  async create(rideData) {
    await delay(400);
    const newId = Math.max(...this.rides.map(r => r.Id), 0) + 1;
    const newRide = {
      Id: newId,
      userId: 'user123',
      driverId: 1,
      status: rideData.status || 'searching',
      type: rideData.type || 'standard',
      pickupLocation: rideData.pickupLocation,
      destination: rideData.destination,
      fare: this.calculateFare(rideData.type),
      distance: this.calculateDistance(),
      duration: this.calculateDuration(),
      timestamp: new Date().toISOString(),
      paymentMethod: 'credit_card',
      rating: null,
      ...rideData
    };
    this.rides.push(newRide);
    return { ...newRide };
  }

  async update(id, updateData) {
    await delay(250);
    const index = this.rides.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Ride not found');
    }
    this.rides[index] = { ...this.rides[index], ...updateData };
    return { ...this.rides[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.rides.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Ride not found');
    }
    this.rides.splice(index, 1);
    return true;
  }

  calculateFare(type) {
    const baseFares = {
      standard: 12.50,
      premium: 22.50,
      carpool: 8.50
    };
    const baseFare = baseFares[type] || baseFares.standard;
    return parseFloat((baseFare + (Math.random() * 10 - 5)).toFixed(2));
  }

  calculateDistance() {
    return parseFloat((Math.random() * 15 + 2).toFixed(1));
  }

  calculateDuration() {
    return Math.floor(Math.random() * 30 + 15);
  }
}

export const rideService = new RideService();