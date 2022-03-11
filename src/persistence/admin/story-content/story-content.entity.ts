import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Story } from '../story/story.entity';

@Entity({ name: 'story_content' })
export class StoryContent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  storyId: number;

  @Column({ type: 'varchar', nullable: true })
  background: string;

  @Column({ type: 'varchar', nullable: true })
  first_button: string;

  @Column({ type: 'varchar', nullable: true })
  second_button: string;

  @Column({ type: 'varchar', nullable: true })
  first_link: string;

  @Column({ type: 'varchar', nullable: true })
  second_link: string;

  @ManyToOne(() => Story, (story) => story.content)
  story: Story;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
