import mockPayments from '@/services/mockData/payments.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PaymentService {
  constructor() {
    this.payments = [...mockPayments];
  }

  async getAll() {
    await delay(300);
    return [...this.payments];
  }

  async getById(id) {
    await delay(200);
    const payment = this.payments.find(p => p.Id === parseInt(id));
    if (!payment) {
      throw new Error('Payment method not found');
    }
    return { ...payment };
  }

  async create(paymentData) {
    await delay(400);
    const newId = Math.max(...this.payments.map(p => p.Id), 0) + 1;
    const newPayment = {
      Id: newId,
      userId: 'user123',
      ...paymentData
    };
    this.payments.push(newPayment);
    return { ...newPayment };
  }

  async update(id, updateData) {
    await delay(250);
    const index = this.payments.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Payment method not found');
    }
    this.payments[index] = { ...this.payments[index], ...updateData };
    return { ...this.payments[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.payments.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Payment method not found');
    }
    this.payments.splice(index, 1);
    return true;
  }
}

export const paymentService = new PaymentService();