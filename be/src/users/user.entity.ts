import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // ← ini penting: sesuaikan dengan nama tabel di database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nama: string;

    @Column({ unique: true })
  email: string;


  @Column({ type: 'varbinary', length: 'MAX' }) // untuk MSSQL
  password: Buffer;

  @Column({ type: 'varbinary', length: 'MAX' }) // untuk MSSQL
  passwordsalt: Buffer;


   @Column({ nullable: true })
  level: string;
}
