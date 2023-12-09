import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password: string;

  @Column({ type: 'timestamptz', nullable: false })
  created: Date;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
}
