import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { BadRequestException } from '@nestjs/common';


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

 async create(customerData: Partial<Customer>): Promise<Customer> {
  // Cek apakah email sudah ada
  const emailExist = await this.repo.findOne({ where: { email: customerData.email } });
  if (emailExist) {
    throw new BadRequestException('Email sudah digunakan.');
  }

  // Cek apakah phone sudah ada
  const phoneExist = await this.repo.findOne({ where: { phone: customerData.phone } });
  if (phoneExist) {
    throw new BadRequestException('Nomor telepon sudah digunakan.');
  }

  // Jika aman, simpan data
  const customer = this.repo.create(customerData);
  return this.repo.save(customer);
}

  async update(id: number, updateData: Partial<Customer>): Promise<Customer> {
  const existingCustomer = await this.findOne(id);

  if (
    updateData.email &&
    updateData.email !== existingCustomer.email
  ) {
    const emailExist = await this.repo.findOne({
      where: { email: updateData.email },
    });
    if (emailExist) {
      throw new BadRequestException("Email sudah digunakan.");
    }
  }

  if (
    updateData.phone &&
    updateData.phone !== existingCustomer.phone
  ) {
    const phoneExist = await this.repo.findOne({
      where: { phone: updateData.phone },
    });
    if (phoneExist) {
      throw new BadRequestException("Nomor telepon sudah digunakan.");
    }
  }

  Object.assign(existingCustomer, updateData);
  return this.repo.save(existingCustomer);
}



  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id);
    await this.repo.remove(customer);
  }
}
