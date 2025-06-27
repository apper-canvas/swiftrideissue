import mockMessages from '@/services/mockData/messages.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MessageService {
  constructor() {
    this.messages = [...mockMessages];
  }

  async getAll() {
    await delay(300);
    return [...this.messages];
  }

  async getById(id) {
    await delay(200);
    const message = this.messages.find(m => m.Id === parseInt(id));
    if (!message) {
      throw new Error('Message not found');
    }
    return { ...message };
  }

  async getByRideId(rideId) {
    await delay(250);
    return this.messages.filter(m => m.rideId === parseInt(rideId));
  }

  async create(messageData) {
    await delay(300);
    const newId = Math.max(...this.messages.map(m => m.Id), 0) + 1;
    const newMessage = {
      Id: newId,
      ...messageData
    };
    this.messages.push(newMessage);
    return { ...newMessage };
  }

  async update(id, updateData) {
    await delay(250);
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Message not found');
    }
    this.messages[index] = { ...this.messages[index], ...updateData };
    return { ...this.messages[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Message not found');
    }
    this.messages.splice(index, 1);
    return true;
  }
}

export const messageService = new MessageService();