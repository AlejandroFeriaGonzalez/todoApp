import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Todo, TodoFilter } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly storageKey = 'angular-todo-app-v1';
  private platformId = inject(PLATFORM_ID);

  // State
  private todosSignal = signal<Todo[]>(this.loadTodos());
  filterSignal = signal<TodoFilter>('all');

  // Computed
  todos = computed(() => this.todosSignal());

  filteredTodos = computed(() => {
    const filter = this.filterSignal();
    const todos = this.todosSignal();

    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  });

  activeCount = computed(() =>
    this.todosSignal().filter(t => !t.completed).length
  );

  constructor() {
    effect(() => {
      this.saveTodos(this.todosSignal());
    });
  }

  // Actions
  addTodo(text: string): void {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now()
    };
    this.todosSignal.update(todos => [newTodo, ...todos]);
  }

  toggleTodo(id: string): void {
    this.todosSignal.update(todos =>
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  removeTodo(id: string): void {
    this.todosSignal.update(todos => todos.filter(t => t.id !== id));
  }

  updateFilter(filter: TodoFilter): void {
    this.filterSignal.set(filter);
  }

  clearCompleted(): void {
    this.todosSignal.update(todos => todos.filter(t => !t.completed));
  }

  // Persistence
  private saveTodos(todos: Todo[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(todos));
    }
  }

  private loadTodos(): Todo[] {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }
}
