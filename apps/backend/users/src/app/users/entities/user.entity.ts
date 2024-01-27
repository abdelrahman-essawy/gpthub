import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser, UserRole } from '@core';
import * as bcrypt from 'bcrypt';

@Entity('users', {
  name: 'users',
  comment: 'Users table',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class UserEntity extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  birthday?: Date;

  @Column({ enum: UserRole, default: UserRole.USER, type: 'enum' })
  role: UserRole;

  @Column({ nullable: true })
  hashedRefreshToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
