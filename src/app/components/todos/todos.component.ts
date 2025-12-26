import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Use CommonModule if you need pipes like DatePipe or similar, even with @if/@for
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFilter } from '../../models/todo.model';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todos.component.html'
})
export class TodosComponent {
  todoService = inject(TodoService);
  newTodoText = signal('');
  filters: TodoFilter[] = ['all', 'active', 'completed'];

  updateText(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newTodoText.set(input.value);
  }

  addTodo() {
    if (this.newTodoText().trim()) {
      this.todoService.addTodo(this.newTodoText().trim());
      this.newTodoText.set('');
    }
  }

  setFilter(filter: TodoFilter) {
    this.todoService.updateFilter(filter);
  }

  hasCompleted() {
    return this.todoService.todos().some(t => t.completed);
  }
}
