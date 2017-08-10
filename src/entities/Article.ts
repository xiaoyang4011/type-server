import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, IsInt } from "class-validator";

@Entity()
export class Article {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty()
	title: string;

	@Column("text")
	@IsNotEmpty()
	body: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}