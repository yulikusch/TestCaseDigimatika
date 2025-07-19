import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.repo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer dengan ID ${id} tidak ditemukan`);
    }
    return customer;
  }

  create(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.repo.create(customerData);
    return this.repo.save(customer);
  }

  async update(id: number, updateData: Partial<Customer>): Promise<Customer> {
    const existingCustomer = await this.findOne(id);
    Object.assign(existingCustomer, updateData);
    return this.repo.save(existingCustomer);
  }

  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id);
    await this.repo.remove(customer);
  }
}
