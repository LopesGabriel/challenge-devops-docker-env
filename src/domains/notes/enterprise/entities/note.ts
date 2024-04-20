import { Entity } from '@core/entities/entity'
import { Optional } from '@core/types/optional'
import { UniqueEntityId } from '@core/entities/unique-entity-id'

export interface NoteProps {
  title: string
  content: string

  createdAt: Date
  updatedAt: Date | null
}

export class Note extends Entity<NoteProps> {
  static create(
    props: Optional<NoteProps, 'updatedAt' | 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    return new Note(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    )
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
