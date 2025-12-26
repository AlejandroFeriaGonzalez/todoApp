import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Still good to have for standard directives if needed, though we use @if/@for
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  toggle = output<string>();
  remove = output<string>();
}
