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

  @Column({ nullable: true, default: null })
  avatar?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  birthday?: Date;

  @Column({ enum: UserRole, default: UserRole.USER, type: 'enum' })
  role: UserRole;

  @Column({ default: null, nullable: true })
  hashedRefreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: null, nullable: true })
  lastLogin?: Date;

  @Column({ default: null, nullable: true })
  githubId?: string;

  @Column({ default: null, nullable: true })
  googleId?: string;

  @Column({ default: null, nullable: true })
  bio?: string;

  @BeforeInsert()
  async hashPassword() {
    if (!this.password) return; // Register with social
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  async verifyEmail() {
    if (!this.password) {
      this.verified = true;
    }
  }
}
